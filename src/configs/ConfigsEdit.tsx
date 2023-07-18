import {Edit, required, SimpleForm, TextInput} from "react-admin"

const ConfigsEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" fullWidth validate={required()}/>
            <TextInput source="value" fullWidth validate={required()}/>
        </SimpleForm>
    </Edit>
);

export default ConfigsEdit