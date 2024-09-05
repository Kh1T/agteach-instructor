import {
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";

import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function CustomPasswordField({ register, fieldName = "Password", errors }) {
  const [showPassword, setShowPassword] = useState(false);
  const nameLowerCase = fieldName.toLowerCase();
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
  );
}

export default CustomPasswordField;
