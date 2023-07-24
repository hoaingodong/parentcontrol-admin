import {Edit, NumberInput, required, SimpleForm, TextInput} from "react-admin"

const FaqsEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="question" fullWidth validate={required()}/>
			<TextInput source="answer" fullWidth validate={required()}/>
			<NumberInput source="order"/>
		</SimpleForm>
	</Edit>
)

export default FaqsEdit