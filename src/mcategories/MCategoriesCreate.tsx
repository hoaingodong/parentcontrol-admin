import {Create, ImageField, ImageInput, NumberInput, required, SimpleForm, TextInput} from "react-admin"

const MCategoriesCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" fullWidth validate={required()}/>
            <ImageInput source="background_url" label="Background Url" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <NumberInput source="background_order" />
            <NumberInput source="order" />
        </SimpleForm>
    </Create>
);

export default MCategoriesCreate