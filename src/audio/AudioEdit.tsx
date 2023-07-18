import {
    BooleanInput,
    Edit,
    ImageField,
    ImageInput,
    NumberInput,
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
            <SelectInput source="category" choices={[
                { id: 'porn_blocker', name: 'Porn Blocker' },
                { id: 'web_blocker', name: 'Web Blocker' },
            ]} />
            <ImageInput source="related_files" label="Related files" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <NumberInput source="order"/>
            <BooleanInput source="isPremium"/>
        </SimpleForm>
    </Edit>
);

export default AudioEdit