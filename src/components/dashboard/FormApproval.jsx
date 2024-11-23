import { Stack, Button, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFormApprovalMutation } from "../../services/api/approvalApi";
import { CustomAlert } from "../CustomAlert";

export default function FormApproval() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [approval] = useFormApprovalMutation();

  const [touchedFields, setTouchedFields] = useState({
    targetCourse: false,
    targetProduct: false,
    profileBackground: false,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  })

  const wordCount = (text) => {
    return text?.trim() ? text?.trim().split(/\s+/).length : 0;
  };

  const profileBackground = watch("profileBackground");
  const targetCourse = watch("targetCourse");
  const targetProduct = watch("targetProduct");

  const wordCountError = (identifier) => {
    if (wordCount(identifier) > 500) {
      return { error: true, helperText: "Please enter less than 500 words" };
    } else if (wordCount(identifier) < 150) {
      return { error: true, helperText: "Please enter more than 150 words" };
    }
    return { error: false };
  };

  const handleSubmission = async (data) => {
    console.log(data);
    try {
      const res = await approval(data).unwrap();
      setSnackbar({
        open: true,
        message: res.message,
        severity: "success",
      })
      console.log("res", res);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.data.message,
        severity: "error",
      })
    }
  };

  return (
    <Box bgcolor="common.white" sx={{ backdrop: "10" }} p={4} width={"65%"}>
      <CustomAlert 
        open={snackbar.open}
        label={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
      <Stack
        component={"form"}
        spacing={4}
        onSubmit={handleSubmit(handleSubmission)}
      >
        <Typography variant="h4" pb={2} sx={{ color: "primary.main" }}>
          Verification Form
        </Typography>
        <Stack spacing={2}>
          <Typography variant="bmdr" color="grey">
            National ID Card Number
          </Typography>
          <TextField
            variant="outlined"
            label="ID Number"
            fullWidth
            inputProps={{ maxLength: 11 }}
            slotProps={{
              input: {
                inputMode: "numeric",
              },
            }}
            {...register("nationalId", {
              required: "Please enter an ID number",
              validate: {
                exactLength: (value) =>
                  value.replace(/\s/g, "").length === 9 ||
                  "ID number must be 9 digits",
              },
            })}
            error={!!errors.nationalId}
            helperText={errors.nationalId?.message}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\s/g, "");
              if (/^\d{0,9}$/.test(rawValue)) {
                const formattedValue = rawValue.replace(
                  /(\d{3})(?=\d)/g,
                  "$1 "
                );
                setValue("nationalId", formattedValue.trim(), {
                  shouldValidate: true,
                });
              }
            }}
          />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="bmdr" color="grey">
            Tell us, what inspires you to sell courses ?
          </Typography>

          <TextField
            variant="outlined"
            label={`Description ${targetCourse ? `: ${wordCount(targetCourse)} / 500 word` : ""}`}
            multiline
            minRows={4}
            fullWidth
            {...register("targetCourse", {
              required: "Please enter a description",
              onBlur: () =>
                setTouchedFields((prev) => ({ ...prev, targetCourse: true })),
            })}
            error={
              !!errors.targetCourse ||
              (touchedFields.targetCourse && wordCountError(targetCourse).error)
            }
            helperText={
              errors.targetCourse?.message ||
              (touchedFields.targetCourse &&
                wordCountError(targetCourse).error &&
                wordCountError(targetCourse).helperText)
            }
          />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="bmdr" color="grey">
            Describe what product you will be selling on AgTeach Platform?
          </Typography>

          <TextField
            variant="outlined"
            label={`Description ${targetProduct ? `: ${wordCount(targetProduct)} / 500 word` : ""}`}
            multiline
            minRows={4}
            fullWidth
            {...register("targetProduct", {
              required: "Please enter a description",
              onBlur: () =>
                setTouchedFields((prev) => ({ ...prev, targetProduct: true })),
            })}
            error={
              !!errors.targetProduct ||
              (touchedFields.targetProduct &&
                wordCountError(targetProduct).error)
            }
            helperText={
              errors.targetProduct?.message ||
              (touchedFields.targetProduct &&
                wordCountError(targetProduct).error &&
                wordCountError(targetProduct).helperText)
            }
          />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="bmdr" color="grey">
            Describe who you are
          </Typography>
          <TextField
            variant="outlined"
            label={`Description ${profileBackground ? `: ${wordCount(profileBackground)} / 500 word` : ""}`}
            multiline
            minRows={4}
            fullWidth
            {...register("profileBackground", {
              required: "Please enter a description",
              onBlur: () =>
                setTouchedFields((prev) => ({
                  ...prev,
                  profileBackground: true,
                })),
            })}
            error={
              !!errors.profileBackground ||
              (touchedFields.profileBackground &&
                wordCountError(profileBackground).error)
            }
            helperText={
              errors.profileBackground?.message ||
              (touchedFields.profileBackground &&
                wordCountError(profileBackground).error &&
                wordCountError(profileBackground).helperText)
            }
          />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="bmdr" color="grey">
            Bank Card Number (PAN)
          </Typography>
          <TextField
            variant="outlined"
            label="Bank Number"
            fullWidth
            inputProps={{ maxLength: 11 }}
            {...register("bankNumber", {
              required: "Please enter a bank number",
              validate: {
                exactLength: (value) =>
                  value.replace(/\s/g, "").length === 9 ||
                  "Bank number must be 9 digits",
              },
            })}
            error={!!errors.bankNumber}
            helperText={errors.bankNumber?.message}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\s/g, "");
              if (/^\d{0,9}$/.test(rawValue)) {
                const formattedValue = rawValue.replace(
                  /(\d{3})(?=\d)/g,
                  "$1 "
                );
                setValue("bankNumber", formattedValue.trim(), {
                  shouldValidate: true,
                });
              }
            }}
          />
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "110px", height: "50px", bgcolor: "blue.main" }}
          >
            SUBMIT
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
