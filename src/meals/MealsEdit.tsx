import {Edit, ImageField, ImageInput, NumberInput, required, SelectInput, SimpleForm, TextInput} from "react-admin"

const MealsEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" fullWidth validate={required()}/>
            <TextInput source="description" fullWidth/>
            <TextInput source="ingredients" fullWidth/>
            <TextInput source="instructionS" fullWidth/>
            <TextInput source="video" fullWidth/>
            <SelectInput source="audience_type" choices={[
                { id: 'FREE', name: 'Free' },
                { id: 'PREMIUM', name: 'Premium' },
            ]} />
            <ImageInput source="photos" label="Photo" accept="image/*" format={
                v => {
                    if ( v?.rawFile instanceof File) {
                        return v[0]
                    }
                    return {src: v[0]}
                }
            }>
                <ImageField source="src" title="title" />
            </ImageInput>
            <NumberInput source="order"/>
        </SimpleForm>
    </Edit>
);

export default MealsEdit