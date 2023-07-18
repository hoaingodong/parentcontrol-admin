import {
    Datagrid, DateField,
    EditButton,
    List,
    TextField,
    BooleanField, ReferenceField

} from "react-admin"

const AudioList = () => (
    <List>
        <Datagrid>
            <DateField source="created_at" showTime/>
            <ReferenceField source="category" reference="music-categories"></ReferenceField>
            <TextField source="title"/>
            <TextField source="order"/>
            <BooleanField source="isPremium"/>
            <DateField source="updated_at" showTime/>
            <EditButton/>
        </Datagrid>
    </List>
);

export default AudioList