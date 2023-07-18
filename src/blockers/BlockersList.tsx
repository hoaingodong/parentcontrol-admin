import {
    Datagrid, DateField,
    EditButton,
    List,
    TextField, UrlField

} from "react-admin"

const BlockersList = () => (
    <List>
        <Datagrid>
            <DateField source="created_at" showTime/>
            <TextField source="title"/>
            <TextField source="sub_title"/>
            <TextField source="link_name"/>
            <UrlField source="link_url"/>
            <TextField source="order"/>
            <TextField source="background_order"/>
            <DateField source="updated_at" showTime/>
            <EditButton/>
        </Datagrid>
    </List>
);

export default BlockersList