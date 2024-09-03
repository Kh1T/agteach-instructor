// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
  isError = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined">
      {fieldType === "password" ? (
        <>
          <InputLabel>{fieldName}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={fieldName}
          />
        </>
      ) : (
        <TextField label={fieldName} error={isError} />
      )}
    </FormControl>
  );
}

export default InputField;
