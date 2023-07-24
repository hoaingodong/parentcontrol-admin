import {Edit, required, SimpleForm, TextInput} from "react-admin"

const QuickMessagesEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="title" fullWidth validate={required()}/>
		</SimpleForm>
	</Edit>
)

export default QuickMessagesEdit