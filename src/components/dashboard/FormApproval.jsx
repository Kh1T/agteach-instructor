import { Stack, Button, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFormApprovalMutation } from "../../services/api/approvalApi";

export default function FormApproval() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [approval] = useFormApprovalMutation();

  const wordCount = (text) => {
    return text?.trim() ? text?.trim().split(/\s+/).length : 0;
  };

  const profileBackground = watch("profileBackground");
  const targetCourse = watch("targetCourse");
  const targetProduct = watch("targetProduct");

  const profileBackgroundWordCount = wordCount(profileBackground);
  const targetCourseWordCount = wordCount(targetCourse);
  const targetProductWordCount = wordCount(targetProduct);

  const wordCountError = (identifier) => {
    if (wordCount(identifier) > 500) {
      return {error: true, helperText: "Please enter less than 500 words"};
    } else if (wordCount(identifier) < 150) {
      return {error: true, helperText: "Please enter more than 150 words"};
    }
  }

//   const buttonDisabled = !(
//     profileBackgroundWordCount > 500 ||
//     targetCourseWordCount > 500 ||
//     targetProductWordCount > 500
//   );

  const handleSubmission = async (data) => {
    console.log(data);
    try {
      const res = await approval(data).unwrap();
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack
      component={"form"}
      spacing={4}
      bgcolor="common.white"
      onSubmit={handleSubmit(handleSubmission)}
    >
      <Typography variant="h4" sx={{ color: "dark.400" }}>
        Additional Information
      </Typography>

      <Stack spacing={2}>
        <Typography variant="bmdr" color="grey">
          National ID Card Number
        </Typography>
        <TextField
          variant="outlined"
          label="ID Number"
          size="small"
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
              const formattedValue = rawValue.replace(/(\d{3})(?=\d)/g, "$1 ");
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
          label={`Description ${targetCourse ? `: ${targetCourseWordCount} / 500 word` : ""}`}
          multiline
          minRows={4}
          size="small"
          fullWidth
          {...register("targetCourse", {
            required: "Please enter a description",
          })}
          error={!!errors.targetCourse || wordCountError(targetCourse).error}
          helperText={
            errors.targetCourse?.message ||
            (wordCountError(targetCourse).error && wordCountError(targetCourse).helperText)
          }
        />

      </Stack>

      <Stack spacing={2}>
        <Typography variant="bmdr" color="grey">
          Tell us, what inspires you to sell products ?
        </Typography>

        <TextField
          variant="outlined"
          label={`Description ${targetProduct ? `: ${targetProductWordCount} / 500 word` : ""}`}
          multiline
          minRows={4}
          size="small"
          fullWidth
          {...register("targetProduct", {
            required: "Please enter a description",
          })}
          error={!!errors.targetProduct || targetProductWordCount > 500}
          helperText={
            errors.targetProduct?.message ||
            (wordCount(targetProduct) > 500 &&
              "Description must be less than 500 words")
          }
        />
      </Stack>

      <Stack spacing={2}>
        <Typography variant="bmdr" color="grey">
          Describe who you are
        </Typography>
        <TextField
          variant="outlined"
          label={`Description ${profileBackground ? `: ${profileBackgroundWordCount} / 500 word` : ""}`}
          multiline
          minRows={4}
          size="small"
          fullWidth
          {...register("profileBackground", {
            required: "Please enter a description",
          })}
          error={!!errors.profileBackground || profileBackgroundWordCount > 500}
          helperText={
            errors.profileBackground?.message ||
            (wordCount(profileBackground) > 500 &&
              "Description must be less than 500 words")
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
          size="small"
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
              const formattedValue = rawValue.replace(/(\d{3})(?=\d)/g, "$1 ");
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
          size="small"
        //   disabled={!buttonDisabled}
          sx={{
            bgcolor: "blue.main",
            width: "100px",
            height: "40px",
            typography: "bmdr",
          }}
        >
          Submit
        </Button>
      </Box>
    </Stack>
  );
}
