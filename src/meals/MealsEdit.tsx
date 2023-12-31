import { Edit, ImageField, ImageInput, NumberInput, required, SelectInput, SimpleForm, TextInput } from "react-admin";

const MealsEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" fullWidth validate={required()} />
            <TextInput source="description" fullWidth />
            <TextInput source="ingredients" fullWidth />
            <TextInput source="instructions" fullWidth />
            <TextInput source="video" fullWidth />
            <SelectInput
                source="audience_type"
                choices={[
                    { id: 'FREE', name: 'Free' },
                    { id: 'PREMIUM', name: 'Premium' },
                ]}
            />
            <ImageInput
                source="photos"
                label="Photos"
                accept="image/*"
                multiple={true}
                format={(v) =>
                {
                    return v.map((item) => {
                        if (item?.rawFile instanceof File) {
                            return item;
                        }
                        else if (typeof item === "object"){
                            return item
                        }
                        else return { src: item };
                    });
                }}
            >
                <ImageField source="src" title="title" />
            </ImageInput>
            <NumberInput source="order" />
        </SimpleForm>
    </Edit>
);

export default MealsEdit