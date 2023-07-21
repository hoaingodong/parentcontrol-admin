const apiUrl = 'http://localhost:3000/api/v1';
import { httpClient } from "../dataProvider";

export const upload = async (data, value, type) => {

        const fileData = new FormData();
        fileData.append('file', data[value].rawFile);

        let endpoint;
        if (type === "audio") {
            endpoint = `${apiUrl}/files/file`;
        } else if (type === "image") {
            endpoint = `${apiUrl}/files/one`;
        } else {
            throw new Error("Invalid type. Supported types are 'audio' and 'image'.");
        }

        const {json} = await httpClient(endpoint, {
            method: 'POST',
            body: fileData,
        });
        const updatedImageData = {
            ...data,
            [value]: json.url
        }

        return updatedImageData;
};