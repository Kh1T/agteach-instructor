import {
  Grid2,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";

import { useForm } from "react-hook-form";

import InputField from "../components/InputField";
import SideBarImg from "../components/SideBarImg";
import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid2 container alignItems="center" spacing={10} columns={12}>
      <Grid2>
        <SideBarImg />
      </Grid2>
      <Grid2>
        <Stack>
          <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            gap="20px"
          >
            <Typography variant="h1">Welcome back Instructor</Typography>
            <Typography color="dark.300">
              Please login to continue to your account.
            </Typography>
          </Box>
          <Box>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <InputField
                fieldName="Email"
                register={register}
                errors={errors}
              />
              <InputField
                fieldName="Password"
                fieldType="password"
                register={register}
                errors={errors}
              />

              <FormControlLabel
                control={<Checkbox value="remember" />}
                label="Keep me logged in"
              />
              <Link to="forgot">Forgot Password ?</Link>
              <CustomButton>Login</CustomButton>
              <Typography>
                Need an account ? <Link href="#">Create one</Link>
              </Typography>
            </form>
          </Box>
        </Stack>
      </Grid2>
    </Grid2>
  );
}

export default LoginPage;
