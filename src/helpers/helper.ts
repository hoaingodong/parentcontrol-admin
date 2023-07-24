const apiUrl = 'http://localhost:3000/api/v1';
import { httpClient } from "../dataProvider";

export const upload = async (data, value, type) => {
    const fileData = new FormData();

    // Check if we have a single file or an array of files to upload
    const filesToUpload = Array.isArray(data[value]) ? data[value] : [data[value]];

    filesToUpload.forEach((imageValue) => {
        fileData.append('file', imageValue.rawFile);
    });

    let endpoint: string;
    if (type === "audio") {
        endpoint = `${apiUrl}/files/file`;
    } else if (type === "image") {
        endpoint = `${apiUrl}/files/one`;
    } else {
        throw new Error("Invalid type. Supported types are 'audio' and 'image'.");
    }

    const uploadPromises = filesToUpload.map((imageValue) => {
        const formDataCopy = new FormData();
        formDataCopy.append('file', imageValue.rawFile);
        return httpClient(endpoint, {
            method: 'POST',
            body: formDataCopy,
        });
    });

    const responses = await Promise.all(uploadPromises);

    const updatedImageData = {
        ...data,
        [value]: responses.map((response) => response.json.url)
    };

    return updatedImageData;
};
