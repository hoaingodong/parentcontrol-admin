import {
    BooleanInput,
    Create,
    NumberInput,
    SelectInput,
    SimpleForm,
    TextInput,
    ReferenceInput, required, FileInput, FileField
} from "react-admin"

const AudioEdit = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" fullWidth validate={required()}/>
            <TextInput source="description" fullWidth/>
            <ReferenceInput source="category" reference="music-categories">
                <SelectInput />
            </ReferenceInput>
            <FileInput source="url" label="Related files" accept="video/mp4" >
                <FileField source="src" title="video" />
            </FileInput>
            <NumberInput source="order"/>
            <BooleanInput source="isPremium"/>
        </SimpleForm>
    </Create>
);

export default AudioEdit