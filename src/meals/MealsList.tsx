import {
	Datagrid, DateField,
	EditButton,
	List,
	TextField,

} from "react-admin"

const MealsList = () => (
	<List>
		<Datagrid>
			<DateField source="created_at" showTime/>
			<TextField source="name"/>
			<TextField source="audience_type"/>
			<TextField source="order"/>
			<DateField source="updated_at" showTime/>
			<EditButton/>
		</Datagrid>
	</List>
)

export default MealsList