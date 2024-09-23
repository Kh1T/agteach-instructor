import {
  Avatar,
  Grid2 as Grid,
  Typography,
  Stack,
  MenuItem,
  Divider,
  Box,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import AvatarImg from "../assets/dashboard-setting/profile-img.png";
import CustomButton from "../components/CustomButton";
import CustomFileUpload from "../components/CustomFileUpload";
import { useGetInstructorInfoQuery, useUpdateInstructorPasswordMutation } from "../store/api/authApi";
import { useForm } from "react-hook-form";
import FormInput from "../components/login-signup/FormInput";
import { CustomAlert } from "../components/CustomAlert";

function SettingPage() {
  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowNewPasswords, setIsShowNewPasswords] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register: basicInfoRegister, handleSubmit: handleBasicInfoSubmit, formState: { errors: basicInfoErrors }, reset: basicInfoReset } = useForm();
  const { register: securityRegister, handleSubmit: handleSecuritySubmit, formState: { errors: securityErrors }, watch, reset: securityReset } = useForm();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [updateInstructorPassword] = useUpdateInstructorPasswordMutation();

  // Function to close snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // State to hold the uploaded image URL
  const [profileImg, setProfileImg] = useState(AvatarImg);

  //functions to handle show current password
  const handleShowCurrentPassword = (current) => {
    setIsShowCurrentPassword(!current);
  }

  //functions to handle show new passworda
  const handleShowNewPasswords = (current) => {
    setIsShowNewPasswords(!current);
  }

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl); // Update state with the new image URL
    }
  };

  // Form submit handlers
  const handleSubmitUpdateBasicInfo = (data) => {
    
  }

  const handleSubmitUpdatePassword = async (data) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;

    try {
      const response = await updateInstructorPassword({ passwordCurrent: currentPassword, password: newPassword, passwordConfirm: confirmNewPassword }).unwrap();
      console.log(response)
      if (response?.status ==='success') {
        setSnackbarSeverity('success');
        setSnackbarMessage("Password was updaed successfully");
        securityReset();
      }
      else {
        setSnackbarSeverity('error');
        setSnackbarMessage("Something went wrong");
      }
    } catch (err) {
      setSnackbarSeverity('error');
      setSnackbarMessage(err.data?.message);
      console.log("Err: ", err)
    } finally {
      setSnackbarOpen(true)
    }
  }


  // Cancel update handler
  const handleBasicInfoReset = (instructorInfo) => {

    basicInfoReset({
      firstName: instructorInfo.firstName ,
      lastName: instructorInfo.lastName ,
      bio: instructorInfo.bio || '',
      phone: instructorInfo.phone || '',
      address: instructorInfo.address || '123 Main St',
      location: instructorInfo.location_id || '',
      city: instructorInfo.city || '',
    });
  };

  const handleSecurityReset = (instructorInfo) => {

    securityReset({
      email: instructorInfo.email,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
  };

  // fetch data
  const { data, isLoading: isAccountInformationLoading } = useGetInstructorInfoQuery();
  const instructorInfo = data?.data.instructors[0];

  useEffect(() => {
    if (data) {
      // set all the fileds with fetched data
      handleBasicInfoReset(instructorInfo);
      handleSecurityReset(instructorInfo);
    }
  }, [data])

  let content = <Stack sx={{width: "100%", height: "calc(100vh - 160px)", display: "flex", justifyContent: "center", alignItems: "center"}}>Loading...</Stack>;

  if (!isAccountInformationLoading) {
    content = 
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
          onClick={handleOpen}
        >
          CHANGE
        </CustomButton>
        <CustomFileUpload
          open={open}
          handleClose={handleClose}
          onChange={handleImageUpload}
        />
      </Grid>

      {/* Information Section */}
      <Grid container direction="column" gap={5}>
        <Box gap={2}>
          <Typography variant="h5">Personal Information</Typography>
          <Stack direction="row" gap={2}>
            <Grid item container size={4} gap={2}>
              <TextField label="First Name"
                {...basicInfoRegister("firstName", {
                  required: "Firstname is required",
                  })
                }
                helperText={basicInfoErrors.firstName?.message}
                error={basicInfoErrors.firstName}
              />

              <TextField label="Last Name"
                {...basicInfoRegister("lastName", {
                  required: "Lastname is required",
                  })
                }
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
                {...basicInfoRegister("bio", {})
                }
              />
            </Grid>
          </Stack>
        </Box>

        {/* Address Information Section */}

        <Stack gap={2}>
          <Typography variant="h5">Address Information</Typography>
          <TextField 
            label="Address"
            {...basicInfoRegister("address", {
              required: "address is required",
            })
            }
            helperText={basicInfoErrors.address?.message}
            error={basicInfoErrors.address}
          />
          
          <TextField
            label="Location"
            noValidate
            autoComplete="off"
            select
          >
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
              minLength: 11
              })
            }
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
        <Stack container gap={2} sx={{ mb: "80px"}}>
          <Typography variant="h5">Account Security</Typography>

          <Stack gap={2} width={"full"}>
            <TextField 
              disabled
              label="Email"
              {...securityRegister("email", {
                required: "Email is required",
                })
              } 
            />
              <Stack gap={2} width={"full"}>
                <FormInput 
                  label="Current Password"
                  type="password"
                  handleClickShowPassword={() => handleShowCurrentPassword(isShowCurrentPassword)}
                  {...securityRegister("currentPassword", {
                    required: "Current password is required",
                    })
                  }
                  helperText={securityErrors.currentPassword?.message}
                  error={securityErrors.currentPassword}
                  showPassword={isShowCurrentPassword}
                />

                <FormInput 
                  label="New Password"
                  type="password"
                  handleClickShowPassword={() => handleShowNewPasswords(isShowNewPasswords)}
                  {...securityRegister("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "New password must be at least 8 characters long",
                    }
                    })
                  } 
                  helperText={securityErrors.newPassword?.message}
                  error={securityErrors.newPassword}
                  showPassword={isShowNewPasswords}
                />

                <FormInput 
                  label="Confirm New Password"
                  type="password"
                  handleClickShowPassword={() => handleShowNewPasswords(isShowNewPasswords)}
                  {...securityRegister("confirmNewPassword", {
                    required: "New password confirmation is required",
                    validate: (value) =>
                      value === watch('newPassword') || "Passwords don't match"
                    })
                  } 
                  helperText={securityErrors.confirmNewPassword?.message}
                  error={securityErrors.confirmNewPassword}
                  showPassword={isShowNewPasswords}
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
      <CustomAlert label={snackbarMessage} open={snackbarOpen} onClose={handleCloseSnackbar} severity={snackbarSeverity} />
    </Grid>
  }

  return (
    <div>
      {content}
    </div>
  );
}

export default SettingPage;
