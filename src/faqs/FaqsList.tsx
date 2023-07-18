import {
    Datagrid, DateField,
    EditButton,
    List,
    TextField,

} from "react-admin"

const FaqsList = () => (
    <List>
        <Datagrid>
            <DateField source="created_at" showTime/>
            <TextField source="question"/>
            <TextField source="answer"/>
            <TextField source="order"/>
            <DateField source="updated_at" showTime/>
            <EditButton/>
        </Datagrid>
    </List>
);

export default FaqsList