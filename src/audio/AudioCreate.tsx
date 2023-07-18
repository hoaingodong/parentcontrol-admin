import {
    BooleanInput,
    Create,
    ImageField,
    ImageInput,
    NumberInput,
    SelectInput,
    SimpleForm,
    TextInput,
    ReferenceInput, required
} from "react-admin"

const AudioEdit = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" fullWidth validate={required()}/>
            <TextInput source="description" fullWidth/>
            <ReferenceInput source="category" reference="music-categories">
                <SelectInput />
            </ReferenceInput>
            <ImageInput source="related_files" label="Related files" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <NumberInput source="order"/>
            <BooleanInput source="isPremium"/>
        </SimpleForm>
    </Create>
);

export default AudioEdit