import {
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  FormControl,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

function InputField({
  fieldName = "Password",
  fieldType = "text",
  register,
  errors,
}) {
  const nameLowerCase = fieldName.toLowerCase();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const preventDefault = (event) => {
    event.preventDefault();
  };

  const registerField = register
    ? register(nameLowerCase, { required: `${fieldName} is required` })
    : {};
  const errorState = errors ? !!errors[nameLowerCase] : false;
  const helperText = errors ? errors[nameLowerCase]?.message : "";

  return (
    <FormControl variant="outlined">
      {fieldType === "password" ? (
        <>
          <InputLabel error={errorState}>{fieldName}</InputLabel>
          <OutlinedInput
            {...registerField}
            error={errorState} // Error state
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            label={fieldName}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={preventDefault}
                  onMouseUp={preventDefault}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </>
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

export default InputField;
