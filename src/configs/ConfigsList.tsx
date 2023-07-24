import {
	Datagrid, DateField,
	EditButton,
	List,
	TextField,

} from "react-admin"

const ConfigsList = () => (
	<List>
		<Datagrid>
			<DateField source="created_at" showTime/>
			<TextField source="name"/>
			<TextField source="value"/>
			<DateField source="updated_at" showTime/>
			<EditButton/>
		</Datagrid>
	</List>
)

export default ConfigsList