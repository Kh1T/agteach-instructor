import {
  Stack,
  Box,
  Typography,
  Button,
  FormControl,
  Grid2,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm } from "react-hook-form";

import InputField from "../components/InputField";
import SideBarImg from "../components/SideBarImg";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid2 container spacing={15} alignItems={"center"}>
      <SideBarImg />
      <Stack gap="20px">
        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          gap="10px"
        >
          <Typography variant="h1">Create Account</Typography>
          <Typography color="dark.300">
            Get your account now to explore further on AgTeach.
          </Typography>
        </Box>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <InputField
            fieldName="Username"
            register={register}
            errors={errors}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Date of Birth" />
          </LocalizationProvider>
          <InputField fieldName="Email" register={register} errors={errors} />
          <InputField
            fieldName="Password"
            fieldType="password"
            register={register}
            errors={errors}
          />
          <CustomButton>Create Account</CustomButton>
        </form>
        <Typography textAlign="center">
          Already have an account?
          <Link to="/login">Go Back</Link>
        </Typography>
      </Stack>
    </Grid2>
  );
}

export default Signup;
