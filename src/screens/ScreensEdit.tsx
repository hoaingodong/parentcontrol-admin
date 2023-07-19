import {BooleanInput, Edit, ImageField, ImageInput, NumberInput, SimpleForm, TextInput} from "react-admin"

const ScreensEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="app_name" fullWidth/>
            <TextInput source="app_description" fullWidth/>
            <TextInput source="app_url" fullWidth/>
            <BooleanInput source="it_self" label="It self" />
            <ImageInput source="app_icon" label="App icon" accept="image/*" format={
                v => {
                    if ( v?.rawFile instanceof File) {
                        return v
                    }
                    return {src: v}
                }
            }>
                <ImageField source="src" title="title" />
            </ImageInput>
            <ImageInput source="app_banner" label="App banner" accept="image/*" format={
                v => {
                    if ( v?.rawFile instanceof File) {
                        return v
                    }
                    return {src: v}
                }
            }>
                <ImageField source="src" title="title" />
            </ImageInput>
            <NumberInput source="order" />
        </SimpleForm>
    </Edit>
);

export default ScreensEdit