import {DataProvider, fetchUtils} from "react-admin";
import {stringify} from "query-string";
import {upload} from "./helpers/uploadFile"

const apiUrl = 'http://localhost:3000/api/v1';

export const httpClient = (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }
    const {token}: { token: string } = JSON.parse(localStorage.getItem('auth'));
    options.headers.set('Authorization', `${token}`);
    return fetchUtils.fetchJson(url, options);
};

export const dataProvider: DataProvider = {
    getList: (resource, params) => {
        const {page, perPage} = params.pagination;
        let {field, order} = params.sort;

        if (order === "DESC") {
            field = `-${field}`
        }

        const query = {
            sort: field,
            limit: perPage,
            page: page,
        };

        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({headers, json}) => (
            {
                data: json.data,
                total: json.total,
            }));
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`)
            .then(({json}) => {
                const convertObject = {...json.data}
                convertObject['id'] = convertObject['_id']
                delete convertObject['_id']
                return {
                    data: convertObject,
                }
            }),

    getMany: (resource, params) => {
        const {ids} = params;

        const promises = ids.map((id) =>
            httpClient(`${apiUrl}/${resource}/${id}`).then(({json}) => {
                const convertObject = {...json.data}
                convertObject['id'] = convertObject['_id']
                delete convertObject['_id']
                return {
                    data: convertObject,
                }
            })
        )

        return Promise.all(promises).then((responses) => (
            {
                data: responses.map(response => response.data),
            }));
    },

    getManyReference: (resource, params) => {
        const {page, perPage} = params.pagination;
        const {field} = params.sort;
        const query = {
            sort: field,
            limit: perPage,
            page: page,
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({headers, json}) => ({
            data: json.data,
            total: json.total
        }));
    },

    create: (resource, params) => {
        const uploadAndCreateResource = async (data, value, type) => {
            const updatedImageData = await upload(data, value, type)
            const {json: json_1} = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(updatedImageData),
            });
            return ({
                data: {...updatedImageData, id: json_1.id},
            });
        };

        const uploadTwoImagesAndCreateResource = async (imageData, valueImage1, valueImage2, type) => {
            const updatedImageData = await upload(imageData, valueImage1, type)
            const updatedImageData2 = await upload(updatedImageData, valueImage2, type)

            const {json: json_2} = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(updatedImageData2),
            });
            return ({
                data: {...updatedImageData, id: json_2.id},
            });
        };

        const uploadMultipleImagesAndCreateResources = async (imageData, imageValues, type) => {
            const updatedImageData = await upload(imageData, imageValues, type)
            const {json: json_1} = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(updatedImageData),
            });
            return ({
                data: {...updatedImageData, id: json_1.id},
            });
        };

        if (resource === 'meals' && params.data.photos) {
            return uploadMultipleImagesAndCreateResources(params.data, 'photos', 'image');
        }

        if (resource === 'music-categories' && params.data.background_url) {
            return uploadAndCreateResource(params.data, 'background_url', 'image');
        }

        if (resource === 'audio' && params.data.url) {
            return uploadAndCreateResource(params.data, 'url','audio');
        }

        if (resource === 'screens') {
            if (!params.data.app_banner) {
                return uploadAndCreateResource(params.data, 'app_icon', 'image')
            } else if (!params.data.app_icon) {
                return uploadAndCreateResource(params.data, 'app_banner', 'image')
            } else {
                return uploadTwoImagesAndCreateResource(params.data, 'app_icon', 'app_banner', 'image')
            }
        }

        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        })
            .then(({json}) => ({
                data: {...params.data, id: json.id},
            }));
    },

    update: (resource, params) => {
        const uploadAndUpdateResource = async (data, value, type) => {
            if (data[value]?.rawFile) {
                const updatedData = await upload(data, value, type)
                await httpClient(`${apiUrl}/${resource}/${data.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(updatedData),
                });
                return ({
                    data: updatedData,
                });
            } else {
                await httpClient(`${apiUrl}/${resource}/${data.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(data),
                });
                return ({
                    data: data,
                });
            }
        };

        const uploadTwoImagesAndUpdateResource = async (imageData, valueImage1, valueImage2, type) => {
            const updatedImageData = await upload(imageData, valueImage1, type)
            const updatedImageData2 = await upload(updatedImageData, valueImage2, type)
            await httpClient(`${apiUrl}/${resource}/${imageData.id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedImageData2),
            });
            return ({
                data: updatedImageData,
            });
        };

        const uploadMultipleImagesAndUpdateResources = async (imageData, imageValues, type) => {
            const newPictures = imageData[imageValues].filter(
                p => p?.rawFile instanceof File
            );
            let formerPictures = imageData[imageValues].filter(
                p => !(p?.rawFile instanceof File)
            );

            let arrayOfStrings = formerPictures;

            if (typeof formerPictures[0] === "object") {
                arrayOfStrings = formerPictures.map((obj) => obj.src);
            }

            // cause images data sent is changeable, if we don't change images, the formerPictures is array contain string (each photo)
            // if we add more images, remove images, the imageData is array contain object (has field src contain link of each photo

            const uploadPromises = newPictures.map((imageValue) => {
                return upload({ [imageValues]: imageValue }, imageValues, type);
            });

            const uploadedImages = await Promise.all(uploadPromises);

            const urls = uploadedImages.map((uploadedImage) => uploadedImage[imageValues]);

            const updatedImageData = {
                ...imageData,
                [imageValues]: [
                    ...urls,
                    ...arrayOfStrings,
                ],
            };

            await httpClient(`${apiUrl}/${resource}/${imageData.id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedImageData),
            });

            return {
                data: updatedImageData,
            };
        };


        if (resource === 'meals' && params.data.photos) {
            return uploadMultipleImagesAndUpdateResources(params.data, 'photos', 'image');
        }

        if (resource === 'music-categories' && params.data.background_url) {
            return uploadAndUpdateResource(params.data, 'background_url', 'image');
        }

        if (resource === 'audio' && params.data.url) {
            return uploadAndUpdateResource(params.data, 'url', 'audio');
        }

        if (resource === 'screens') {
            if (!params.data.app_banner) {
                return uploadAndUpdateResource(params.data, 'app_icon', 'image')
            } else if (!params.data.app_icon) {
                return uploadAndUpdateResource(params.data, 'app_banner', 'image')
            } else {
                return uploadTwoImagesAndUpdateResource(params.data, 'app_icon', 'app_banner', 'image')
            }
        }

        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
        })
            .then(() => {
                return {
                    data: params.data,
                };
            });
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({json}) => ({data: json})),

    deleteMany: (resource, params) => {
        const deleteItemPromises = params.ids.map((id) => {
            const url = `${apiUrl}/${resource}/${id}`;
            return httpClient(url, {method: "DELETE"}).then(({json}) => json);
        });

        return Promise.all(deleteItemPromises).then(() => ({data: params.ids}));
    },
};