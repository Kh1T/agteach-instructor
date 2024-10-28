import { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Button,
  IconButton,
  FormHelperText,
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ClearIcon from "@mui/icons-material/Clear";

import { UploadedPhotoStyle } from "../../theme/CourseProductStyle";

/**
 * AddManyPhotos component renders an upload area for multiple photos
 *
 * It renders a button with a label "Add Photos" and a count of the number of photos uploaded
 * When the button is clicked, it opens a modal with a drag and drop area and a file input
 *
 * When a file is selected, it is added to the uploadedPhotos array and the file input is reset
 * If the number of photos exceeds 5, an error message is displayed
 *
 * When a photo is removed, it is removed from the uploadedPhotos array
 *
 * @returns A JSX element containing the AddManyPhotos component
 */
export default function AddManyPhotos({
  setValue,
  name = "productImages",
  register,
  errors,
  watch,
  defaultValue,
  setRemovedImages,
  mode = "create", // 'create' or 'edit'
}) {
  const [existingUrls, setExistingUrls] = useState([]);
  const watchProductImages = watch(name);
  const [validated, setValidated] = useState(true);

  useEffect(() => {
    if (defaultValue && defaultValue.images && defaultValue.images.length > 0) {
      const imageUrls = defaultValue.images.map((image) => image.imageUrl);
      setExistingUrls(imageUrls);
      setValue(name, imageUrls, { shouldValidate: true });
      if (imageUrls) {
        setValidated(true);
      }
    }
  }, [defaultValue, name, setValue]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);

    const existingFiles =
      watchProductImages instanceof FileList
        ? Array.from(watchProductImages)
        : [];
    let combinedFiles = [...existingFiles, ...newFiles];

    if (combinedFiles.length + existingUrls.length > 4) {
      combinedFiles = combinedFiles.slice(0, 4 - existingUrls.length);
    }

    const dataTransfer = new DataTransfer();
    combinedFiles.forEach((file) => {
      dataTransfer.items.add(file);
    });

    setValue(name, dataTransfer.files, { shouldValidate: true });
  };

  const handleRemovePhoto = (index, isUrl = false) => {
    if (isUrl) {
      const removedUrl = existingUrls[index];
      const newUrls = existingUrls.filter((_, i) => i !== index);
      setExistingUrls(newUrls);
      if (newUrls.length === 0) {
        setValidated(false);
      }
      if (setRemovedImages) {
        setRemovedImages((prev) => [...prev, removedUrl]);
      }
    } else {
      if (!watchProductImages || !(watchProductImages instanceof FileList))
        return;

      const files = Array.from(watchProductImages);
      const newFiles = files.filter((_, i) => i !== index);

      const dataTransfer = new DataTransfer();
      newFiles.forEach((file) => {
        dataTransfer.items.add(file);
      });

      setValue(name, newFiles.length > 0 ? dataTransfer.files : null, {
        shouldValidate: true,
      });
    }
  };

  const getTotalPhotos = () => {
    const fileCount =
      watchProductImages instanceof FileList ? watchProductImages.length : 0;
    return fileCount + existingUrls.length;
  };

  const renderPreview = () => {
    return (
      <Stack direction="row" flexWrap="wrap">
        {existingUrls.map((url, index) => (
          <Box key={`url-${index}`} sx={UploadedPhotoStyle}>
            <img src={url} alt={`Existing ${index + 1}`} />
            <IconButton
              onClick={() => handleRemovePhoto(index, true)}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                height: "32px",
                width: "32px",
                backgroundColor: "white",
                opacity: 0.5,
                "&:hover": { backgroundColor: "white", opacity: 1 },
              }}
            >
              <ClearIcon color="error" />
            </IconButton>
          </Box>
        ))}

        {watchProductImages instanceof FileList &&
          Array.from(watchProductImages).map((file, index) => (
            <Box key={`file-${index}`} sx={UploadedPhotoStyle}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
              />
              <IconButton
                onClick={() => handleRemovePhoto(index)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  height: "32px",
                  width: "32px",
                  backgroundColor: "white",
                  opacity: 0.5,
                  "&:hover": { backgroundColor: "white", opacity: 1 },
                }}
              >
                <ClearIcon color="error" />
              </IconButton>
            </Box>
          ))}
      </Stack>
    );
  };

  return (
    <Stack paddingY={2} spacing={2}>
      <input
        id="file-input"
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg"
        style={{ display: "none" }}
        {...register(name, {
          validate: {
            required: (files) => {
              const fileCount = files instanceof FileList ? files.length : 0;
              const totalImages = fileCount + existingUrls.length;

              if (mode === "create" && totalImages === 0) {
                return "At least one image is required";
              }

              if (mode === "edit" && totalImages === 0 && !validated) {
                return "Cannot remove all images. At least one image is required";
              }
              return true;
            },
            lessThan4: (files) => {
              const fileCount = files instanceof FileList ? files.length : 0;
              return (
                fileCount + existingUrls.length <= 4 ||
                "Maximum 4 photos allowed"
              );
            },
            acceptedFormats: (files) =>
              !files ||
              !(files instanceof FileList) ||
              Array.from(files).every((file) =>
                ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
              ) ||
              "Only PNG , JPG and JPEG formats are allowed",
          },
        })}
        onChange={handleFileChange}
      />

      {getTotalPhotos() === 0 ? (
        <Stack
          onClick={() => document.getElementById("file-input").click()}
          sx={{
            maxWidth: "200px",
            padding: "64px",
            paddingX: "12px",
            cursor: "pointer",
            alignItems: "center",
            justifyItems: "center",
            mb: 2,
            backgroundColor: !!errors.productCover ? "red.light" : "gray.300",
            border: `2px dashed ${!!errors.productCover ? "red" : "gray"}`,
          }}
        >
          <InsertPhotoIcon />
          <Typography variant="bxsmd">Upload up to 4 photos</Typography>
          <Typography variant="btr">(PNG, JPG - 580x580, max 1MB)</Typography>
        </Stack>
      ) : (
        renderPreview()
      )}

      {errors[name] && (
        <FormHelperText error>{errors[name].message}</FormHelperText>
      )}

      <Button
        variant={getTotalPhotos() === 4 ? "contained" : "outlined"}
        color={getTotalPhotos() === 4 ? "success" : "primary"}
        onClick={() => document.getElementById("file-input").click()}
        disabled={getTotalPhotos() >= 4}
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: "8px",
          maxWidth: "200px",
        }}
      >
        Add Photos ({getTotalPhotos()}/4)
      </Button>
    </Stack>
  );
}
