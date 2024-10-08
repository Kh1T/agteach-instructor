import {
  Avatar,
  Grid2 as Grid,
  Typography,
  Stack,
  MenuItem,
  Divider,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import CustomFileUpload from "../components/CustomFileUpload";
import {
  useGetInstructorInfoQuery,
  useUpdateInstructorInfoMutation,
  useUpdateInstructorPasswordMutation,
} from "../services/api/authApi";
import { useForm } from "react-hook-form";
import FormInput from "../components/login-signup/FormInput";
import { CustomAlert } from "../components/CustomAlert";

function SettingPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPasswords, setShowNewPasswords] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const [profileImg, setProfileImg] = useState("");

  const [updateInstructorPassword] =
    useUpdateInstructorPasswordMutation();

    const [updateInfo, { isLoading, isError, isSuccess, error }] = useUpdateInstructorInfoMutation();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setProfileImg(URL.createObjectURL(file));

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setIsImageUploaded(true); 
    }
    const formData = new FormData();
    formData.append("photo", file);
    try {
      await updateInfo(formData).unwrap();
      setIsImageUploaded(true);

      // await refetch();
      refetch();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const {
    register: basicInfoRegister,
    handleSubmit: handleBasicInfoSubmit,
    formState: { errors: basicInfoErrors },
    reset: basicInfoReset,
  } = useForm();

  const {
    register: securityRegister,
    handleSubmit: handleSecuritySubmit,
    formState: { errors: securityErrors },
    watch,
    reset: securityReset,
  } = useForm();

  const handleBasicInfoReset = (instructorInfo) => {
    basicInfoReset({
      firstName: instructorInfo.firstName,
      lastName: instructorInfo.lastName,
      bio: instructorInfo.bio || "",
      phone: instructorInfo.phone || "",
      address: instructorInfo.address || "",
      location: instructorInfo.location_id || "",
      city: instructorInfo.city || "",
    });
  };

  const handleSecurityReset = (instructorInfo) => {
    securityReset({
      email: instructorInfo.email,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const { data, isLoading: isAccountInformationLoading, refetch} =
    useGetInstructorInfoQuery();
  let instructorInfo = {};

  console.log("instructorInfo00000", instructorInfo.imageUrl);

  useEffect(() => {
    if (data) {
      instructorInfo = data.data.instructor;
      console.log(instructorInfo);
      handleBasicInfoReset(instructorInfo);
      handleSecurityReset(instructorInfo);

      setProfileImg(instructorInfo.imageUrl);
    }
  }, [data]);

  const handleSubmitUpdatePassword = async (data) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;

    try {
      const response = await updateInstructorPassword({
        passwordCurrent: currentPassword,
        password: newPassword,
        passwordConfirm: confirmNewPassword,
      }).unwrap();
      if (response?.status === "success") {
        setSnackbarSeverity("success");
        setSnackbarMessage("Password was updated successfully");
        securityReset();
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Something went wrong");
      }
    } catch (err) {
      setSnackbarSeverity("error");
      setSnackbarMessage(err.data?.message);
    } finally {
      setSnackbarOpen(true);
    }
  };

  let content = (
    <Stack
      sx={{
        width: "100%",
        height: "calc(100vh - 160px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Loading...
    </Stack>
  );

  if (!isAccountInformationLoading) {
    content = (
      <Grid container direction="column" gap={5} pb={4}>
        {/* Profile Section */}
        <Grid container direction="column" gap={2} alignContent="start">
          <Typography variant="h5">Profile</Typography>
          <Avatar
            sx={{ width: "140px", height: "140px" }}
            src={profileImg}
            variant="square"
          />
          <CustomButton
            sx={{ borderColor: "blue.main", color: "blue.main" }}
            variant="outlined"
            onClick={() => {
              setOpen(true);
              setIsImageUploaded(false); // Reset state to allow changing the image
            }}
          >
            {isLoading ? 'CHANGING...' : 'CHANGE'}
          </CustomButton>
          {!isImageUploaded && (
            <CustomFileUpload
              open={open}
              handleClose={() => setOpen(false)}
              onChange={handleImageUpload}
            />
          )}
        </Grid>

        {/* Information Section */}
        <Grid container direction="column" gap={5}>
          <Stack spacing={2}>
            <Typography variant="h5">Personal Information</Typography>
            <Stack direction="row" gap={2}>
              <Grid item container size={4} gap={2}>
                <TextField
                  label="First Name"
                  fullWidth
                  {...basicInfoRegister("firstName", {
                    required: "Firstname is required",
                  })}
                  helperText={basicInfoErrors.firstName?.message}
                  error={basicInfoErrors.firstName}
                />

                <TextField
                  label="Last Name"
                  fullWidth
                  {...basicInfoRegister("lastName", {
                    required: "Lastname is required",
                  })}
                  helperText={basicInfoErrors.lastName?.message}
                  error={basicInfoErrors.lastName}
                />
              </Grid>

              <Grid item size={7} width="100%">
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  label="Bio"
                  {...basicInfoRegister("bio", {})}
                />
              </Grid>
            </Stack>
          </Stack>

          {/* Address Information Section */}

          <Stack gap={2}>
            <Typography variant="h5">Address Information</Typography>
            <TextField
              label="Address"
              {...basicInfoRegister("address", {
                required: "address is required",
              })}
              helperText={basicInfoErrors.address?.message}
              error={basicInfoErrors.address}
            />

            <TextField label="Location" noValidate autoComplete="off" select>
              <MenuItem value="Phnom Penh">Phnom Penh</MenuItem>
            </TextField>
          </Stack>

          {/* Contact Information Section */}
          <Stack gap={2}>
            <Typography variant="h5">Contact Information</Typography>
            <TextField
              label="Phone Number"
              disabled
              {...basicInfoRegister("phone", {
                required: "phone is required",
                maxLength: 13,
                minLength: 11,
              })}
            />
          </Stack>

          {/* Button */}

          <Grid container gap={2} justifyContent="end">
            <CustomButton
              sx={{ backgroundColor: "blue.main" }}
              variant="contained"
              size="large"
            >
              SAVE CHANGES
            </CustomButton>
            <CustomButton
              sx={{ borderColor: "blue.main", color: "blue.main" }}
              variant="outlined"
              size="large"
              onClick={() => handleSecurityReset(instructorInfo)}
            >
              CANCEL
            </CustomButton>
          </Grid>
        </Grid>

        <Divider />

        {/* Acount Security */}
        <form onSubmit={handleSecuritySubmit(handleSubmitUpdatePassword)}>
          <Stack container gap={2} sx={{ mb: "80px" }}>
            <Typography variant="h5">Account Security</Typography>

            <Stack gap={2} width={"full"}>
              <TextField
                disabled
                label="Email"
                {...securityRegister("email", {
                  required: "Email is required",
                })}
              />

              <Stack gap={2} width={"full"}>
                <FormInput
                  label="Current Password"
                  type="password"
                  handleClickShowPassword={() =>
                    setShowCurrentPassword(!showCurrentPassword)
                  }
                  {...securityRegister("currentPassword", {
                    required: "Current password is required",
                  })}
                  helperText={securityErrors.currentPassword?.message}
                  error={securityErrors.currentPassword}
                  showPassword={showCurrentPassword}
                />

                <FormInput
                  label="New Password"
                  type="password"
                  handleClickShowPassword={() =>
                    setShowNewPasswords(!showNewPasswords)
                  }
                  {...securityRegister("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message:
                        "New password must be at least 8 characters long",
                    },
                  })}
                  helperText={securityErrors.newPassword?.message}
                  error={securityErrors.newPassword}
                  showPassword={showNewPasswords}
                />

                <FormInput
                  label="Confirm New Password"
                  type="password"
                  handleClickShowPassword={() =>
                    setShowNewPasswords(!showNewPasswords)
                  }
                  {...securityRegister("confirmNewPassword", {
                    required: "New password confirmation is required",
                    validate: (value) =>
                      value === watch("newPassword") || "Passwords don't match",
                  })}
                  helperText={securityErrors.confirmNewPassword?.message}
                  error={securityErrors.confirmNewPassword}
                  showPassword={showNewPasswords}
                />
              </Stack>
            </Stack>
            <Grid
              container
              width="100%"
              gap={2}
              direction="row"
              justifyContent="end"
            >
              <CustomButton
                type="submit"
                sx={{ backgroundColor: "blue.main" }}
                variant="contained"
                size="large"
              >
                SAVE CHANGES
              </CustomButton>
              <CustomButton
                sx={{ borderColor: "blue.main", color: "blue.main" }}
                variant="outlined"
                size="large"
                onClick={() => handleSecurityReset(instructorInfo)}
              >
                CANCEL
              </CustomButton>
            </Grid>
          </Stack>
        </form>

        {/* Snackbar for displaying messages */}
        <CustomAlert
          label={snackbarMessage}
          open={snackbarOpen}
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        />
      </Grid>
    );
  }

  return <div>{content}</div>;
}

export default SettingPage;
