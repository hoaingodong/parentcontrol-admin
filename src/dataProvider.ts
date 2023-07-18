import { DataProvider, fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = 'http://localhost:3000/api/v1';

const httpClient = (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const { token }: { token: string } = JSON.parse(localStorage.getItem('auth'));
    options.headers.set('Authorization', `${token}`);
    return fetchUtils.fetchJson(url, options);
};

export const dataProvider: DataProvider = {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field} = params.sort;
        const query = {
            sort: field,
            limit: perPage,
            page: page,
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => (
            {
            data: json.data,
            total: json.total,
        }));
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`)
            .then(({ json }) => {
                const convertObject = {...json.data}
                convertObject['id'] = convertObject['_id']
                delete convertObject['_id']
                return {
                    data: convertObject,
                }
            }),

    getMany: (resource, params) => {
        const { ids } = params;

        const promises = ids.map((id) =>
            httpClient(`${apiUrl}/${resource}/${id}`).then(({ json }) => {
                const convertObject = {...json.data}
                convertObject['id'] = convertObject['_id']
                delete convertObject['_id']
                return {
                    data: convertObject,
                }
            })
        )

        return Promise.all(promises).then((responses) => (
            {data: responses.map(response => response.data),
        }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field} = params.sort;
        const query = {
            sort: field,
            limit: perPage,
            page: page,
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.data,
            total: json.total
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
        }).then(({ json }) => {
            const convertObject = {...json.data}
            convertObject['id'] = convertObject['_id']
            delete convertObject['_id']
            return {
                data: convertObject,
            };
        }),

    create: (resource, params) => {
        if (resource === 'meals' && params.data.photos) {
            const fileData = new FormData();
            fileData.append('file', params.data.photos.rawFile);

            return httpClient(`${apiUrl}/files/one`, {
                method: 'POST',
                body: fileData,
            })
                .then(({ json }) => {
                    const imageData = {
                        ...params.data,
                        photos: json.url,
                    };

                    return httpClient(`${apiUrl}/${resource}`, {
                        method: 'POST',
                        body: JSON.stringify(imageData),
                    })
                        .then(({ json }) => ({
                            data: { ...imageData, id: json.id },
                        }));
                });
        }

        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        })
            .then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const deleteItemPromises = params.ids.map((id) => {
            const url = `${apiUrl}/${resource}/${id}`;
            return httpClient(url, { method: "DELETE" }).then(({ json }) => json);
        });

        return Promise.all(deleteItemPromises).then(() => ({ data: params.ids }));
    },
};