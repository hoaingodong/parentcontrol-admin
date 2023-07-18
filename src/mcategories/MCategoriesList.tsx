import {
    Datagrid, DateField,
    EditButton,
    List,
    TextField,

} from "react-admin"

const MCategoriesList = () => (
    <List>
        <Datagrid>
            <DateField source="created_at" showTime/>
            <TextField source="title"/>
            <TextField source="order"/>
            <DateField source="updated_at" showTime/>
            <EditButton/>
        </Datagrid>
    </List>
);

export default MCategoriesList