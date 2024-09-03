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

  return (
    <FormControl variant="outlined">
      {fieldType === "password" ? (
        <>
          <InputLabel error={!!errors[nameLowerCase]}>{fieldName}</InputLabel>
          <OutlinedInput
            {...register(nameLowerCase, {
              required: `${fieldName} is required`,
            })}
            error={!!errors[nameLowerCase]} // Error state
            // helperText={errors[nameLowerCase]?.message}
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
          {...register(nameLowerCase, { required: `${fieldName} is required` })}
          error={!!errors[nameLowerCase]} // Error state
          helperText={errors[nameLowerCase]?.message}
        />
      )}
    </FormControl>
  );
}

export default InputField;
