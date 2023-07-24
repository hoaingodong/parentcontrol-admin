import { Create, SimpleForm, TextInput, SelectInput, ImageInput, ImageField, NumberInput, required } from "react-admin"

const MealsCreate = () => (
	<Create>
		<SimpleForm>
			<TextInput source="name" fullWidth validate={required()} />
			<TextInput source="description" fullWidth />
			<TextInput source="ingredients" fullWidth />
			<TextInput source="instructions" fullWidth />
			<TextInput source="video" fullWidth />
			<SelectInput source="audience_type" choices={[
				{ id: "FREE", name: "Free" },
				{ id: "PREMIUM", name: "Premium" },
			]} />
			<ImageInput source="photos" label="Photo" accept="image/*" multiple={true}>
				<ImageField source="src" title="title" />
			</ImageInput>
			<NumberInput source="order" />
		</SimpleForm>
	</Create>
)

export default MealsCreate
