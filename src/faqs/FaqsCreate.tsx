import {Create, NumberInput, required, SimpleForm, TextInput} from "react-admin"

const FaqsEdit = () => (
    <Create>
        <SimpleForm>
            <TextInput source="question" fullWidth validate={required()}/>
            <TextInput source="answer" fullWidth validate={required()}/>
            <NumberInput source="order" fullWidth/>
        </SimpleForm>
    </Create>
);

export default FaqsEdit