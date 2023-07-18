import React, { useState } from "react";
import { Create, ImageField, ImageInput, SelectInput, SimpleForm, TextInput, NumberInput, required } from "react-admin";
import { dataProvider } from "../dataProvider";

const MealsCreate = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    const handleImageUpload = (file) => {
        const formData = new FormData();
        formData.append("file", file);

        fetch("http://localhost:3000/api/v1/files/one", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                const imageUrl = data.url;
                setUploadedImageUrl(imageUrl);
            })
            .catch((error) => {
                console.error("Error uploading image:", error);
            });
    };

    const handleSave = (values) => {
        const mealData = { ...values };
        mealData.photos = uploadedImageUrl;

        dataProvider.create("meals", { data: mealData })
            .then(() => {
                // Handle successful creation
            })
            .catch((error) => {
                // Handle creation error
                console.error("Error creating meal:", error);
            });
    };

    return (
        <Create>
            <SimpleForm save={handleSave}>
                <TextInput source="name" fullWidth validate={required()} />
                <TextInput source="description" fullWidth />
                <TextInput source="ingredients" fullWidth />
                <TextInput source="instructions" fullWidth />
                <TextInput source="video" fullWidth />
                <SelectInput
                    source="audience_type"
                    choices={[
                        { id: 'FREE', name: 'Free' },
                        { id: 'PREMIUM', name: 'Premium' },
                    ]}
                />
                <ImageInput
                    source="photos"
                    label="Photo"
                    accept="image/*"
                    onDrop={handleImageUpload}
                >
                    <ImageField source="src" title="title" />
                </ImageInput>
                <NumberInput source="order" />
            </SimpleForm>
        </Create>
    );
};

export default MealsCreate;
