import {
  Autocomplete,
  Box,
  Divider,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomInputField from "../components/CustomInputField"; // custom component
import CustomButton from "../components/CustomButton"; // custom component
import logo from "./../assets/logo.svg";
import { useForm } from "react-hook-form";
import { useAdditionalInfoMutation } from "../store/api/authApi";
import FormInput from "../components/login-signup/FormInput";
import { useSelector } from "react-redux";

function AdditionalInformation() {
  const navigate = useNavigate();
  const { dob } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      address: "",
    },
  });
  const [addPerosnalInfo] = useAdditionalInfoMutation();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await addPerosnalInfo({
        ...data,
        dateOfBirth: dob,
      }).unwrap();
      console.log("Success:", response);
      navigate("/auth/signup/verification");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Grid2 container justifyContent="center" direction="column" mt={12} gap={15}>
      {/* Container for the entire form */}
      <Box component="img" src={logo} alt="Logo" />
      {/* Add alt text for accessibility */}
      <Grid2 container justifyContent="center" alignItems="center" gap={12}>
        {/* Container for the main content area */}
        <Stack textAlign="center" gap={2}>
          {/* Stack for the header and description */}
          <Box
            width={500}
            height={500}
            border="none"
            component="iframe"
            src="https://lottie.host/embed/7e3e9b9a-bfc5-43b9-83b8-f9865bff7bf6/OkwRtcwUA1.json"
            alt="Interactive animation"
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack flexDirection="column" gap={2}>
            <Typography variant="blgsm">Name & Address</Typography>
            <Stack flexDirection="row" gap={2}>
              {/* Stack for the name fields */}
              <FormInput
                label="First Name"
                placeholder="e.g. Jane"
                {...register("firstName", {
                  required: "First name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "First name can only contain letters",
                  },
                })}
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
              />
              <FormInput
                label="Last Name"
                placeholder="e.g. Smith"
                {...register("lastName", {
                  required: "Last name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Last name can only contain letters",
                  },
                })}
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
              />
            </Stack>

            {/* Address Field */}
            <Autocomplete
              id="country-select-demo"
              fullWidth
              options={city}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  slotProps={{
                    htmlInput: {
                      ...params.inputProps,
                    },
                  }}
                  {...register("city", { required: "City is required" })}
                  error={!!errors.city}
                  helperText={errors?.city?.message}
                />
              )}
            />

            <FormInput
              label="Address"
              placeholder="e.g. 1234 Main St"
              {...register("address", {
                required: "Address is required",
              })}
              error={!!errors.address}
              helperText={errors?.address?.message}
            />

            <Divider />

            <Typography variant="blgsm">Contact Information</Typography>
            <Stack flexDirection="row" gap={2}>
              <FormInput
                label="Phone number"
                placeholder="e.g. +855 123456789"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+\d{1,3}\s*\d{1,4}(\s*\d{1,4}){1,4}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                error={!!errors.phone}
                helperText={errors?.phone?.message}
              />
            </Stack>
            <CustomButton color="primary" variant="contained">
              Continue
            </CustomButton>
          </Stack>
        </form>
      </Grid2>
    </Grid2>
  );
}

export default AdditionalInformation;

const city = [
  { label: "Phnom Penh" },
  { label: "Siem Reap" },
  { label: "Battambang" },
  { label: "Sihanoukville" },
  { label: "Kampot" },
  { label: "Kratie" },
  { label: "Pursat" },
  { label: "Koh Kong" },
];
