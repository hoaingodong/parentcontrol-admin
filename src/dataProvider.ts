import {DataProvider, fetchUtils} from "react-admin";
import {stringify} from "query-string";

const apiUrl = 'http://localhost:3000/api/v1';

const httpClient = (url: string, options: any = {}) => {
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
        const uploadImageAndCreateResource = (imageData, imageValue) => {
            const fileData = new FormData();
            fileData.append('file', imageData[imageValue].rawFile);

            return httpClient(`${apiUrl}/files/one`, {
                method: 'POST',
                body: fileData,
            })
                .then(({json}) => {
                    const updatedImageData = {
                        ...imageData,
                        [imageValue]: json.url,
                    };

                    return httpClient(`${apiUrl}/${resource}`, {
                        method: 'POST',
                        body: JSON.stringify(updatedImageData),
                    })
                        .then(({json}) => ({
                            data: {...updatedImageData, id: json.id},
                        }));
                });
        };

        const uploadVideoAndCreateResource = (videoData, videoValue) => {
            const fileData = new FormData();
            fileData.append('file', videoData[videoValue].rawFile);

            return httpClient(`${apiUrl}/files/file`, {
                method: 'POST',
                body: fileData,
            })
                .then(({json}) => {
                    const updatedImageData = {
                        ...videoData,
                        [videoValue]: json.url,
                    };

                    return httpClient(`${apiUrl}/${resource}`, {
                        method: 'POST',
                        body: JSON.stringify(updatedImageData),
                    })
                        .then(({json}) => ({
                            data: {...updatedImageData, id: json.id},
                        }));
                });
        };

        const uploadTwoImagesAndCreateResource = (imageData, valueImage1, valueImage2) => {
            const fileData = new FormData();
            let updatedImageData = {...imageData};

            fileData.append('file', imageData[valueImage1].rawFile);
            return httpClient(`${apiUrl}/files/one`, {
                method: 'POST',
                body: fileData,
            })
                .then(({json}) => {
                    updatedImageData = {
                        ...updatedImageData,
                        [valueImage1]: json.url,
                    };

                    fileData.delete('file');
                    fileData.append('file', imageData[valueImage2].rawFile);
                    return httpClient(`${apiUrl}/files/one`, {
                        method: 'POST',
                        body: fileData,
                    });
                })
                .then(({json}) => {
                    updatedImageData = {
                        ...updatedImageData,
                        [valueImage2]: json.url,
                    };

                    return httpClient(`${apiUrl}/${resource}`, {
                        method: 'POST',
                        body: JSON.stringify(updatedImageData),
                    });
                })
                .then(({json}) => ({
                    data: {...updatedImageData, id: json.id},
                }));
        };

        const uploadMultipleImagesAndCreateResources = (imageData, imageValues) => {
            const uploadPromises = imageData[imageValues].map((imageValue) => {
                const fileData = new FormData();
                fileData.append('file', imageValue.rawFile);

                return httpClient(`${apiUrl}/files/one`, {
                    method: 'POST',
                    body: fileData,
                }).then(({json}) => json.url);
            });

            return Promise.all(uploadPromises).then((urls) => {
                const updatedImageData = {
                    ...imageData,
                    [imageValues]: urls,
                };

                return httpClient(`${apiUrl}/${resource}`, {
                    method: 'POST',
                    body: JSON.stringify(updatedImageData),
                })
                    .then(({json}) => ({
                        data: {...updatedImageData, id: json.id},
                    }));
            });
        };

        if (resource === 'meals' && params.data.photos) {
            return uploadMultipleImagesAndCreateResources(params.data, 'photos');
        }

        if (resource === 'music-categories' && params.data.background_url) {
            return uploadImageAndCreateResource(params.data, 'background_url');
        }

        if (resource === 'audio' && params.data.url) {
            return uploadVideoAndCreateResource(params.data, 'url');
        }

        if (resource === 'screens' && params.data.app_icon && params.data.app_banner) {
            return uploadTwoImagesAndCreateResource(params.data, 'app_icon', 'app_banner');
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
        const uploadImageAndUpdateResource = (imageData, imageValue) => {
            if (imageData[imageValue]?.rawFile) {
                // If the file exists, proceed with image upload and resource update
                const fileData = new FormData();
                fileData.append('file', imageData[imageValue].rawFile);

                return httpClient(`${apiUrl}/files/one`, {
                    method: 'POST',
                    body: fileData,
                })
                    .then(({json}) => {
                        const updatedData = {
                            ...imageData,
                            [imageValue]: json.url,
                        };

                        return httpClient(`${apiUrl}/${resource}/${imageData.id}`, {
                            method: 'PATCH',
                            body: JSON.stringify(updatedData),
                        })
                            .then(() => ({
                                data: updatedData,
                            }));
                    });
            } else {
                // If the file doesn't exist, return the original imageData without any modifications
                return httpClient(`${apiUrl}/${resource}/${imageData.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(imageData),
                })
                    .then(() => ({
                        data: imageData,
                    }));
            }
        };

        const uploadVideoAndUpdateResource = (videoData, videoValue) => {
            if (videoData[videoValue]?.rawFile) {
                // If the file exists, proceed with image upload and resource update
                const fileData = new FormData();
                fileData.append('file', videoData[videoValue].rawFile);

                return httpClient(`${apiUrl}/files/file`, {
                    method: 'POST',
                    body: fileData,
                })
                    .then(({json}) => {
                        const updatedData = {
                            ...videoData,
                            [videoValue]: json.url,
                        };

                        return httpClient(`${apiUrl}/${resource}/${videoData.id}`, {
                            method: 'PATCH',
                            body: JSON.stringify(updatedData),
                        })
                            .then(() => ({
                                data: updatedData,
                            }));
                    });
            } else {
                // If the file doesn't exist, return the original imageData without any modifications
                return httpClient(`${apiUrl}/${resource}/${videoData.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(videoData),
                })
                    .then(() => ({
                        data: videoData,
                    }));
            }
        };

        const uploadTwoImagesAndUpdateResource = (imageData, valueImage1, valueImage2) => {
            const fileData = new FormData();
            let updatedImageData = {...imageData};

            fileData.append('file', imageData[valueImage1].rawFile);
            return httpClient(`${apiUrl}/files/one`, {
                method: 'POST',
                body: fileData,
            })
                .then(({json}) => {
                    updatedImageData = {
                        ...updatedImageData,
                        [valueImage1]: json.url,
                    };

                    fileData.delete('file');
                    fileData.append('file', imageData[valueImage2].rawFile);
                    return httpClient(`${apiUrl}/files/one`, {
                        method: 'POST',
                        body: fileData,
                    });
                })
                .then(({json}) => {
                    updatedImageData = {
                        ...updatedImageData,
                        [valueImage2]: json.url,
                    };

                    return httpClient(`${apiUrl}/${resource}/${imageData.id}`, {
                        method: 'PATCH',
                        body: JSON.stringify(updatedImageData),
                    })
                        .then(() => ({
                            data: updatedImageData,
                        }));
                })
        };

        const uploadMultipleImagesAndUpdateResources = (imageData, imageValues) => {

            const newPictures = imageData[imageValues].filter(
                p => p.rawFile instanceof File
            );
            const formerPictures = imageData[imageValues].filter(
                p => !(p.rawFile instanceof File)
            );

            const uploadPromises = newPictures.map((imageValue) => {
                const fileData = new FormData();
                fileData.append('file', imageValue.rawFile);

                return httpClient(`${apiUrl}/files/one`, {
                    method: 'POST',
                    body: fileData,
                }).then(({json}) => json.url);
            });

            return Promise.all(uploadPromises).then((urls) => {
                const updatedImageData = {
                    ...imageData,
                    [imageValues]: [
                        ...urls,
                        ...formerPictures,
                    ],
                };

                return httpClient(`${apiUrl}/${resource}/${imageData.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(updatedImageData),
                })
                    .then(() => ({
                        data: updatedImageData,
                    }));
            });
        };

        if (resource === 'meals' && params.data.photos) {
            return uploadMultipleImagesAndUpdateResources(params.data, 'photos');
        }

        if (resource === 'music-categories' && params.data.background_url) {
            return uploadImageAndUpdateResource(params.data, 'background_url');
        }

        if (resource === 'audio' && params.data.url) {
            return uploadVideoAndUpdateResource(params.data, 'url');
        }

        if (resource === 'screens' && params.data.app_icon && params.data.app_banner) {
            return uploadTwoImagesAndUpdateResource(params.data, 'app_icon', 'app_banner');
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