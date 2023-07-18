import {Create, required, SimpleForm, TextInput} from "react-admin"

const ConfigsEdit = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" fullWidth validate={required()}/>
            <TextInput source="value" fullWidth validate={required()}/>
        </SimpleForm>
    </Create>
);

export default ConfigsEdit