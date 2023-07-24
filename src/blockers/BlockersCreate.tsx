import {Create, NumberInput, SelectInput, SimpleForm, TextInput} from "react-admin"

const FaqsEdit = () => (
	<Create>
		<SimpleForm>
			<TextInput source="title" fullWidth/>
			<TextInput source="sub_title" fullWidth/>
			<TextInput source="link_name" fullWidth/>
			<TextInput source="link_url" fullWidth/>
			<NumberInput source="order" />
			<NumberInput source="background_order" />
			<SelectInput source="category" choices={[
				{ id: "porn_blocker", name: "Porn Blocker" },
				{ id: "web_blocker", name: "Web Blocker" },
			]} />

		</SimpleForm>
	</Create>
)

export default FaqsEdit