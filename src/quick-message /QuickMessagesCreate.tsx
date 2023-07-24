import {Create, required, SimpleForm, TextInput} from "react-admin"

const QuickMessagesEdit = () => (
	<Create>
		<SimpleForm>
			<TextInput source="title" fullWidth validate={required()}/>
		</SimpleForm>
	</Create>
)

export default QuickMessagesEdit