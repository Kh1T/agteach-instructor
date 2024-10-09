// import { useState } from "react";
// import { Stack, Box, Typography, Button } from "@mui/material";
// import { useEffect } from "react";
// /**
//  * PhotoPreview component renders a box with a dashed border and a "Choose File"
//  * button. When a file is selected, it renders a preview of the file with its name
//  * and size.
//  *
//  * It takes three props:
//  *   - `sx`: style object for the preview box
//  *   - `icon`: icon to be displayed in the preview box
//  *   - `children`: children elements to be displayed in the preview box
//  *
//  * @param {Object} props - props object
//  * @param {Object} props.sx - style object for the preview box
//  * @param {React.ReactElement} props.icon - icon to be displayed in the preview box
//  * @param {React.ReactElement} props.children - children elements to be displayed in the preview box
//  * @returns {React.ReactElement} the PhotoPreview component
//  */
// export default function PhotoPreview({
//   sx,
//   icon,
//   children,
//   register,
//   errors,
//   name,
//   setValue,
//   defaultValue,
// }) {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [fileInfo, setFileInfo] = useState({ name: "", size: "" });
//   const [fileInputKey, setFileInputKey] = useState(0);

//     useEffect(() => {
//       if (defaultValue) {
//         setSelectedImage(defaultValue);
//         const splittedImageUrl = defaultValue.split("/");
//         const imageName = splittedImageUrl[splittedImageUrl.length - 1];
//         setFileInfo({ name: imageName});
//       }
//     }, [defaultValue]);
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.startsWith("image/")) {

//       const imageUrl = URL.createObjectURL(file);
//       setSelectedImage(imageUrl);
//       setFileInfo({
//         name: file.name,
//         size: (file.size / 1024).toFixed(2) + " KB",
//       });

//       // Update the file in react-hook-form's form state
//       setValue(name, event.target.files);
//       resetFileInput();
//     } else {
//       alert("Please select a valid image file.");
//     }
//   };

//   const resetFileInput = () => {
//     setFileInputKey((prevKey) => prevKey + 1); // Reset file input by changing its key
//   };

//   const handleClick = () => {
//     document.getElementById(`file-input-${fileInputKey}`).click(); // Trigger file input click
//   };

//   return (
//     <>
//       {selectedImage ? (
//         <Stack
//           direction="row"
//           sx={{ width: "100%", textAlign: "start", mb: 2, gap: 2 }}
//         >
//           <Box
//             component="img"
//             src={selectedImage}
//             // src={defaultValue}
//             alt="Selected Product"
//             sx={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
//           />
//           <Stack gap={1}>
//             <Typography variant="bmdsm">{fileInfo.name}</Typography>
//             {fileInfo.size && <Typography variant="bmdr">Size: {fileInfo.size}</Typography>}
//             <Button
//               variant="outlined"
//               sx={{
//                 px: 4,
//                 py: 1,
//                 width: "120px",
//                 border: "2px solid black",
//                 borderRadius: "8px",
//               }}
//               onClick={handleClick}
//             >
//               <Typography variant="bsr">Change</Typography>
//             </Button>
//           </Stack>
//         </Stack>
//       ) : (
//         <Stack
//           sx={{
//             backgroundColor: "grey.300",
//             padding: "32px",
//             border: "2px dashed grey",
//             cursor: "pointer",
//             alignItems: "center",
//             justifyItems: "center",
//             height: "100%",
//             ...sx,
//           }}
//           onClick={handleClick}
//         >
//           {icon}

//           {children}
//         </Stack>
//       )}

//       <input
//         id={`file-input-${fileInputKey}`} // Unique ID for each file input
//         key={fileInputKey}
//         type="file"
//         style={{ display: "none" }}
//         onChange={handleFileChange} // Use custom handleFileChange for file input
//         accept="image/*"
//         // {...register("photoCover", {required: "Photo Cover is required"})}
//       />
//       {errors[name] && (
//         <Typography color="error">
//           {errors[name]?.message || "This field is required"}
//         </Typography>
//       )}
//     </>
//   );
// }

// ck = { handleClick };
//         >
//           {icon}

//           {children}
//         </Stack>
//       )}

//       <input
//         id={`file-input-${fileInputKey}`} // Unique ID for each file input
//         key={fileInputKey}
//         type="file"
//         style={{ display: "none" }}
//         onChange={handleFileChange} // Use custom handleFileChange for file input
//         {...register(name, {required: "Photo Cover is required"})}
//       />
//       {errors[name] && (
//         <Typography color="error">
//           {errors[name]?.message || "This field is required"}
//         </Typography>
//       )}
//     </>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { Stack, Box, Typography, Button, FormHelperText } from "@mui/material";
// import { useFormContext } from "react-hook-form";

export default function PhotoPreview({
  name,
  onFileChange,
  isPreviewVisible,
  file,
  sx,
  icon,
  register,
  errors,
  watch,
  setValue,
  unregister,
  children,
  defaultValue,
  editMode,
}) {
  const [selectedImage, setSelectedImage] = useState(
    file ? URL.createObjectURL(file) : defaultValue || null
  );
  const [fileInfo, setFileInfo] = useState(
    file ? { name: file.name, size: (file.size / 1024).toFixed(2) + " KB" } : {}
  );

  const inputRef = useRef(null);
  const photoFile = watch(name);

  const handleFileUpload = (event) => {
    const newFile = event.target.files[0];

    if (newFile && newFile.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(newFile));
      setFileInfo({
        name: newFile.name,
        size: (newFile.size / 1024).toFixed(2) + " KB",
      });

      setValue(name, newFile);
      onFileChange && onFileChange(newFile);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleChange = () => {
    if (inputRef.current) {
      inputRef.current.click();
    } else {
      console.log("Input ref not found/null");
    }
  };

  useEffect(() => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
      });
    } else if (defaultValue) {
      // If no file, use the defaultValue (for existing image in edit mode)
      setSelectedImage(defaultValue);
    }
  }, [file, defaultValue]);

  return (
    <Box sx={{ my: 2 }}>
      {!isPreviewVisible && !photoFile ? (
        <>
          <Box
            sx={{
              backgroundColor: !!errors[name] ? "red.light" : "gray.300",
              border: `2px dashed ${!!errors[name] ? "red" : "gray"}`,
              cursor: "pointer",
              alignItems: "center",
              justifyItems: "center",
              height: "100%",
              ...sx,
            }}
          >
            <Button
              component="label"
              fullWidth
              startIcon={icon}
              sx={{ padding: "32px" }}
              onClick={handleChange}
            >
              {children || "Upload photo"}
            </Button>
          </Box>
        </>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: "100%", textAlign: "start", mb: 2 }}
        >
          <Box
            component="img"
            src={selectedImage}
            alt="Selected"
            sx={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
          />
          <Stack spacing={1}>
            <Typography variant="bmdsm">Name: {fileInfo.name}</Typography>
            <Typography variant="bmdr">Size: {fileInfo.size}</Typography>
            <Button
              variant="outlined"
              sx={{
                py: 1,
                width: "120px",
                border: `2px solid black`,
                borderRadius: "8px",
              }}
              onClick={handleChange}
            >
              Change
            </Button>
          </Stack>
        </Stack>
      )}
      <input
        type="file"
        hidden
        accept="image/png, image/jpeg, image/jpg"
        {...register(name, { required: "Image is required" })}
        onChange={handleFileUpload}
        ref={inputRef}
      />
      {!photoFile && errors[name] && (
        <FormHelperText sx={{ color: "error.main" }}>
          {errors[name].message}
        </FormHelperText>
      )}
    </Box>
  );
}
