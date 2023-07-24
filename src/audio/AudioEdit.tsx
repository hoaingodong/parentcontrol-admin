import {
	BooleanInput,
	Edit, FileField, FileInput,
	NumberInput, ReferenceInput,
	required,
	SelectInput,
	SimpleForm,
	TextInput
} from "react-admin"

const AudioEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="title" fullWidth validate={required()}/>
			<TextInput source="description" fullWidth/>
			<ReferenceInput source="category" reference="music-categories">
				<SelectInput />
			</ReferenceInput>
			<FileInput source="url" label="Related files" accept="video/mp4" format={
				v => {
					if ( v?.rawFile instanceof File) {
						return v
					}
					return {src: v}
				}
			}>
				<FileField source="src" title="title" />
			</FileInput>
			<NumberInput source="order"/>
			<BooleanInput source="isPremium"/>
		</SimpleForm>
	</Edit>
)

export default AudioEdit