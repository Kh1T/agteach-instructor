import { FormControl, TextField } from "@mui/material";
import CustomPasswordField from "./CustomPasswordField";

function CustomInputField({
  fieldName = "Password",
  fieldType = "text",
  register,
  errors,
}) {
  const nameLowerCase = fieldName.toLowerCase();

  const registerField = register
    ? register(nameLowerCase, { required: `${fieldName} is required` })
    : {};
  const errorState = errors ? !!errors[nameLowerCase] : false;
  const helperText = errors ? errors[nameLowerCase]?.message : "";

  return (
    <FormControl variant="outlined">
      {fieldType === "password" ? (
        <CustomPasswordField register={register} errors={errors} />
      ) : (
        <TextField
          label={fieldName}
          {...registerField}
          error={errorState} // Error state
          helperText={helperText}
        />
      )}
    </FormControl>
  );
}

export default CustomInputField;
