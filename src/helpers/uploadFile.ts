const apiUrl = 'http://localhost:3000/api/v1';
import { httpClient } from "../dataProvider";

export const upload = async (data, values, type) => {
    const fileData = new FormData();

    // Check if we have a single file or an array of files to upload
    const filesToUpload = Array.isArray(data[values]) ? data[values] : [data[values]];

    filesToUpload.forEach((value) => {
        fileData.append('file', value.rawFile);
    });

    let endpoint: string;
    if (type === "audio") {
        endpoint = `${apiUrl}/files/file`;
    } else if (type === "image") {
        endpoint = `${apiUrl}/files/one`;
    } else {
        throw new Error("Invalid type. Supported types are 'audio' and 'image'.");
    }

    const uploadPromises = filesToUpload.map((value) => {
        const formDataCopy = new FormData();
        formDataCopy.append('file', value.rawFile);
        return httpClient(endpoint, {
            method: 'POST',
            body: formDataCopy,
        });
    });

    const responses = await Promise.all(uploadPromises);

    const updatedImageData = {
        ...data,
        [values]: responses.map((response) => response.json.url)
    };

    return updatedImageData;
};
