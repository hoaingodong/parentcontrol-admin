import {Edit, required, SimpleForm, TextInput} from "react-admin"

const PornsEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="name" fullWidth validate={required()}/>
		</SimpleForm>
	</Edit>
)

export default PornsEdit