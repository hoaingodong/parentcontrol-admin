import {Create, required, SimpleForm, TextInput} from "react-admin"

const PornsEdit = () => (
	<Create>
		<SimpleForm>
			<TextInput source="name" fullWidth validate={required()} />
		</SimpleForm>
	</Create>
)

export default PornsEdit