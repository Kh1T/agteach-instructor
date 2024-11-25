import { FormControl, TextField } from "@mui/material";
import CustomPasswordField from "./CustomPasswordField";

/**
 * CustomInputField component renders a form input field based on the provided type.
 *
 * It conditionally renders a `CustomPasswordField` or a `TextField`, depending on the `fieldType`.
 * The component uses `register` for form handling and displays error states and messages if available.
 *
 * @param {string} [fieldName="Password"] - The name of the field, used for labeling and error messages.
 * @param {string} [fieldType="text"] - The type of the input field, determines the component to render.
 * @param {function} register - Function to register input fields for form handling.
 * @param {object} errors - Object containing validation errors.
 * @param {object} props - Additional props to pass to the input component.
 * @returns {ReactElement} A form input component wrapped in a FormControl.
 */
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
