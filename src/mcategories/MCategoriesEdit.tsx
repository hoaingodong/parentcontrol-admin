import {Edit, ImageField, ImageInput, NumberInput, required, SimpleForm, TextInput} from "react-admin"

const MCategoriesEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" fullWidth validate={required()}/>
            <ImageInput source="background_url" label="Background Url" accept="image/*" format={
                v => {
                    if ( v?.rawFile instanceof File) {
                        return v
                    }
                    return {src: v}
                }
            }
            >
                <ImageField source="src" title="title" />
            </ImageInput>
            <NumberInput source="background_order" />
            <NumberInput source="order" />
        </SimpleForm>
    </Edit>
);

export default MCategoriesEdit