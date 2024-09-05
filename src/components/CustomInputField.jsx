import { FormControl, TextField } from "@mui/material";
import CustomPasswordField from "./CustomPasswordField";

function CustomInputField({
  fieldName = "Password",
  fieldType = "text",
  register,
  errors,
  ...props
}) {
  const nameLowerCase = fieldName.toLowerCase();

  const registerField = register
    ? register(nameLowerCase, { required: `${fieldName} is required` })
    : {};
  const errorState = errors ? !!errors[nameLowerCase] : false;
  const helperText = errors ? errors[nameLowerCase]?.message : "";

  return (
    <FormControl variant="outlined" fullWidth>
      {fieldType === "password" ? (
        <CustomPasswordField register={register} errors={errors} />
      ) : (
        <TextField
          fullWidth
          label={fieldName}
          {...registerField}
          error={errorState} // Error state
          helperText={helperText}
          {...props}
        />
      )}
    </FormControl>
  );
}

export default CustomInputField;
