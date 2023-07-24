import {BooleanInput, Create, ImageField, ImageInput, NumberInput, SimpleForm, TextInput} from "react-admin"

const ScreensCreate = () => (
	<Create>
		<SimpleForm>
			<TextInput source="app_name" fullWidth/>
			<TextInput source="app_description" fullWidth/>
			<TextInput source="app_url" fullWidth/>
			<BooleanInput source="it_self" label="It self" />
			<ImageInput source="app_icon" label="App icon" accept="image/*">
				<ImageField source="src" title="title" />
			</ImageInput>
			<ImageInput source="app_banner" label="App banner" accept="image/*">
				<ImageField source="src" title="title" />
			</ImageInput>
			<NumberInput source="order" />
		</SimpleForm>
	</Create>
)

export default ScreensCreate