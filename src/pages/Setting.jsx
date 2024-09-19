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

function SettingPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();

  // State to hold the uploaded image URL
  const [profileImg, setProfileImg] = useState(AvatarImg);

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl); // Update state with the new image URL
    }
  };

  const { data, isLoading: isAccountInformationLoading } = useGetInstructorInfoQuery();
  console.log(data);
  const instructorInfo = data?.data.instructors[0];

  // Cancel handler
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

    let finallyBlock = null;

    if(!infoBlock) {
      finallyBlock = {
        ...firstInforBlock,
        ...secondInforBlock
      }
    } else if (infoBlock === 1) { 
      finallyBlock = firstInforBlock;
    }
    else if (infoBlock === 2) {
      finallyBlock = secondInforBlock;
    }
    else {
      return
    }

    reset({
      ...finallyBlock
    });
  };

  useEffect(() => {
    if (data) {
      handleCancelEdit(instructorInfo);
    }
  }, [data])


  const handleUserSubmit = (data) => {
    console.log(data)
  }

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

          <TextField 
            label="Current Password"
            {...register("currentPassword", {
              required: "Current is required",
              })
            } 
          />

          <TextField 
            label="New Password"
            {...register("newPassword", {
              required: "New is required",
              })
            } 
          />

          <TextField 
            label="Confirm New Password"
            {...register("confirmNewPassword", {
              required: "New password confirmation is required",
              })
            } 
          />

        </Stack>
        <Grid
          container
          width="100%"
          gap={2}
          direction="row"
          justifyContent="end"
        >
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
            onClick={() => handleCancelEdit(instructorInfo, 2)}
          >
            CANCEL
          </CustomButton>
        </Grid>
      </Stack>
    </Grid>
  }

  return (
    <div>
      {content}
    </div>
  );
}

export default SettingPage;
