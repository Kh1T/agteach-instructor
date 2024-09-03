import React from "react";
import TextField from "@mui/material/TextField";

const ChildComponent = ({ register, errors }) => {
  return (
    <div>
      <TextField
        label="Name"
        variant="outlined"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    </div>
  );
};

export default ChildComponent;
