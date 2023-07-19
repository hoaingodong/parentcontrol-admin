import {
    BooleanInput,
    Edit,
    ImageField,
    ImageInput,
    NumberInput, ReferenceInput,
    required,
    SelectInput,
    SimpleForm,
    TextInput
} from "react-admin"

const AudioEdit = () => (
    <Edit>
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
    </Edit>
);

export default AudioEdit