import {
	Datagrid, DateField,
	EditButton,
	List,
	TextField,

} from "react-admin"

const QuickMessagesList = () => (
	<List>
		<Datagrid>
			<DateField source="created_at" showTime/>
			<TextField source="title"/>
			<DateField source="updated_at" showTime/>
			<EditButton/>
		</Datagrid>
	</List>
)

export default QuickMessagesList