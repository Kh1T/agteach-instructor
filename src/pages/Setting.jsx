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
import { useGetInstructorInfoQuery } from "../store/api/authApi";
import { useForm } from "react-hook-form";
import FormInput from "../components/login-signup/FormInput";
import { CustomAlert } from "../components/CustomAlert";

function SettingPage() {
  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowNewPasswords, setIsShowNewPasswords] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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

  const handleSubmitUpdatePassword = (data) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;

    
  }

  // Cancel update handler
  const handleCancelEdit = (instructorInfo, infoBlock) => {
    const firstInforBlock = {
      firstName: instructorInfo.firstName ,
      lastName: instructorInfo.lastName ,
      bio: instructorInfo.bio || '',
      phone: instructorInfo.phone || '',
      address: instructorInfo.address || '123 Main St',
      city: instructorInfo.city || '',
    }

    const secondInforBlock = {
      email: instructorInfo.email,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }

    let finalBlock = null;

    if(!infoBlock) {
      finalBlock = {
        ...firstInforBlock,
        ...secondInforBlock
      }
    } else if (infoBlock === 1) { 
      finalBlock = firstInforBlock;
    }
    else if (infoBlock === 2) {
      finalBlock = secondInforBlock;
    }
    else {
      return
    }

    reset({
      ...finalBlock
    });
  };

  // fetch data
  const { data, isLoading: isAccountInformationLoading } = useGetInstructorInfoQuery();
  console.log(data);
  const instructorInfo = data?.data.instructors[0];

  useEffect(() => {
    if (data) {
      // set all the fileds with fetched data
      handleCancelEdit(instructorInfo);
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
                {...register("firstName", {
                  required: "Firstname is required",
                  })
                }
              />

              <TextField label="Last Name"
                {...register("lastName", {
                  required: "Lastname is required",
                  })
                }
              />
            </Grid>

            <Grid item size={7} width="100%">
              <TextField 
              multiline 
              rows={4} 
              fullWidth
              label="Bio"
                {...register("bio", {})
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
            {...register("address", {})
            }
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
            {...register("phone", {
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
            onClick={() => handleCancelEdit(instructorInfo, 1)}
          >
            CANCEL
          </CustomButton>
        </Grid>
      </Grid>

      <Divider />

      {/* Acount Security */}
      <form onSubmit={handleSubmit(handleSubmitUpdatePassword)}>
        <Stack container gap={2} sx={{ mb: "80px"}}>
          <Typography variant="h5">Account Security</Typography>

          <Stack gap={2} width={"full"}>
            <TextField 
              disabled
              label="Email"
              {...register("email", {
                required: "Email is required",
                })
              } 
            />
              <Stack gap={2} width={"full"}>
                <FormInput 
                  label="Current Password"
                  type="password"
                  handleClickShowPassword={() => handleShowCurrentPassword(isShowCurrentPassword)}
                  {...register("currentPassword", {
                    required: "Current password is required",
                    })
                  }
                  helperText={errors.currentPassword?.message}
                  error={errors.currentPassword}
                  showPassword={isShowCurrentPassword}
                />

                <FormInput 
                  label="New Password"
                  type="password"
                  handleClickShowPassword={() => handleShowNewPasswords(isShowNewPasswords)}
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "New password must be at least 8 characters long",
                    }
                    })
                  } 
                  helperText={errors.newPassword?.message}
                  error={errors.newPassword}
                  showPassword={isShowNewPasswords}
                />

                <FormInput 
                  label="Confirm New Password"
                  type="password"
                  handleClickShowPassword={() => handleShowNewPasswords(isShowNewPasswords)}
                  {...register("confirmNewPassword", {
                    required: "New password confirmation is required",
                    validate: (value) =>
                      value === watch('newPassword') || "Passwords don't match"
                    })
                  } 
                  helperText={errors.confirmNewPassword?.message}
                  error={errors.confirmNewPassword}
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
              onClick={() => handleCancelEdit(instructorInfo, 2)}
            >
              CANCEL
            </CustomButton>
          </Grid>
          
        </Stack>
      </form>
      

      {/* Alert element */}
    </Grid>
  }

  return (
    <div>
      {content}
    </div>
  );
}

export default SettingPage;
