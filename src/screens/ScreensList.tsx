import {
    Datagrid,
    EditButton,
    List,
    TextField, BooleanField, DateField, UrlField

} from "react-admin"

const ScreensList = () => (
    <List>
        <Datagrid>
            <DateField source="created_at" showTime/>
            <TextField source="app_name"/>
            <TextField source="app_description"/>
            <UrlField source="app_url"/>
            <BooleanField source="it_self"/>
            <DateField source="updated_at" showTime/>
            <EditButton/>
        </Datagrid>
    </List>
);

export default ScreensList