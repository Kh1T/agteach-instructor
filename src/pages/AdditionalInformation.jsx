import {
  Box,
  Divider,
  Grid2 as Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import InputField from "../components/InputField"; // custom component
import CustomButton from "../components/CustomButton"; // custom component
import logo from "./../assets/logo.svg";
import { useForm } from "react-hook-form";

/**
 * Renders a form to collect additional user information.
 *
 * @returns {JSX.Element} The AdditionalInformation component
 */
function AdditionalInformation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Grid container justifyContent="center" direction="column" mt={12} gap={15}>
      {/* Container for the entire form */}
      <Box component="img" src={logo} alt="Logo" />{" "}
      {/* Add alt text for accessibility */}
      <Grid container justifyContent="center" alignItems="center" gap={12}>
        {/* Container for the main content area */}
        <Stack textAlign="center" gap={2}>
          {/* Stack for the header and description */}
          <Box
            width={500}
            height={500}
            border="none"
            component="iframe"
            src="https://lottie.host/embed/288044aa-d34d-480e-a0a5-90f2169ad2a9/3QIerLarqo.json"
            alt="Interactive animation" // Add alt text for accessibility
          />

          <Typography variant="h3">Almost There</Typography>

          <Typography
            color="dark.200"
            sx={{ width: "300px", margin: "0 auto" }}
            textAlign="center"
          >
            Just one more step. Add your personal information and contact to
            continue
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Stack flexDirection="column" gap={2}>
            {/* Stack for the form fields */}
            <Typography variant="blgsm">Name & Address</Typography>
            <Stack flexDirection="row" gap={2}>
              {/* Stack for the name fields */}
              <InputField
                fieldName="First name"
                errors={errors}
                register={register}
                // Add props for validation and error handling (if applicable)
              />
              <InputField
                fieldName="Last name"
                errors={errors}
                register={register}
                // Add props for validation and error handling (if applicable)
              />
            </Stack>

            {/* Address Field */}

            <TextField label="Address" noValidate autoComplete="off" select>
              <MenuItem value="Phnom Penh">Phnom Penh</MenuItem>
            </TextField>

            <InputField
              fieldName="Address 1"
              errors={errors}
              register={register}
              // Add props for validation and error handling (if applicable)
            />

            <Divider />

            <Typography variant="blgsm">Email & Phone</Typography>
            <Stack flexDirection="row" gap={2}>
              {/* Stack for the email and phone fields */}
              <InputField
                fieldName="Email"
                errors={errors}
                register={register}
                // Add props for validation (e.g., email format)
              />
              <InputField
                fieldName="Phone Number"
                errors={errors}
                register={register}
                // Add props for validation (e.g., phone number format)
              />
            </Stack>
            <CustomButton>Continue</CustomButton>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
}

export default AdditionalInformation;
