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
import CustomButton from "../components/CustomButton";
import Logo from "../assets/agteach.png";
import { useForm, Controller } from "react-hook-form";
import {
  useAdditionalInfoMutation,
  useGetLocationsQuery,
} from "../services/api/authApi";
import FormInput from "../components/login-signup/FormInput";
import { useSelector } from "react-redux";

/**
 * AdditionalInformation is a component that displays the second step of the
 * registration process. It consists of a form with fields for the user's name,
 * address, and contact information. The form is validated using the
 * react-hook-form library. The `onSubmit` function is called when the form is
 * submitted, and it makes a request to the API to add the user's information.
 * If the request is successful, the user is redirected to the verification page.
 * If the request fails, an error message is displayed.
 *
 * @return {React.ReactElement} A JSX element containing the AdditionalInformation
 * component
 */
function AdditionalInformation() {
  const navigate = useNavigate();
  const { dob } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [addPerosnalInfo, { isLoading }] = useAdditionalInfoMutation();
  const { data: locationData, isLoading: isLoadingLocation } =
    useGetLocationsQuery();

  const onSubmit = async (data) => {
    try {
      const { firstName, lastName, phone, address, locationId } = data;
      await addPerosnalInfo({
        firstName,
        lastName,
        phone,
        address,
        locationId: locationId.value, // Now correctly accessing the locationId
        dateOfBirth: dob,
      }).unwrap();
      navigate("/auth/signup/verification");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validatePhone = (value) => {
    const phonePattern = /^[0-9]+$/;
    if (!value) return true;
    if (value.length > 15) return "Phone number cannot exceed 15 digits";
    if (value?.length < 8)
      return "A Valid phone number should contains atleast 8 digits";
    return phonePattern.test(value) || "Please enter a valid phone number";
  };

  return (
    <Grid2 container justifyContent="center" direction="column" my={12} gap={5}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src={Logo} alt="Logo" />
      </Box>
      <Grid2 container justifyContent="center" alignItems="center" gap={12}>
        <Stack textAlign="center" gap={2}>
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
              <FormInput
                label="First Name"
                placeholder="e.g. Jane"
                {...register("firstName", {
                  required: "First name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "First name can only contain letters",
                  },
                  validate: (value) => {
                    if (value.length < 2) return "First name must be at least 2 characters";
                    if (value.length > 25) return "First name must be at most 25 characters";
                    return true;
                  }
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
                  validate: (value) => {
                    if (value.length < 2) return "Last name must be at least 2 characters";
                    if (value.length > 25) return "Last name must be at most 25 characters";
                    return true;
                  }
                })}
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
              />
            </Stack>
            <Controller
              name="locationId"
              control={control}
              rules={{ required: "City is required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Autocomplete
                  id="location-select"
                  options={
                    isLoadingLocation
                      ? []
                      : locationData.data.map((location) => ({
                          label: location.name,
                          value: location.locationId,
                        }))
                  }
                  value={value}
                  onChange={(_, newValue) => {
                    onChange(newValue);
                  }}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value?.value
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
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
                placeholder="e.g. 0123456789"
                {...register("phone", {
                  validate: validatePhone,
                })}
                error={!!errors.phone}
                helperText={errors?.phone?.message}
              />
            </Stack>
            <CustomButton
              color="primary"
              disabled={isLoading}
              variant="contained"
              type="submit"
            >
              {isLoading ? "Submitting..." : "Continue"}
            </CustomButton>
          </Stack>
        </form>
      </Grid2>
    </Grid2>
  );
}

export default AdditionalInformation;
