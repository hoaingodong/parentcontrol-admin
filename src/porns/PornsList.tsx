import {
	Datagrid, DateField,
	EditButton,
	List,
	TextField,

} from "react-admin"

const PornsList = () => (
	<List>
		<Datagrid>
			<DateField source="created_at" showTime/>
			<TextField source="name"/>
			<DateField source="updated_at" showTime/>
			<EditButton/>
		</Datagrid>
	</List>
)

export default PornsList