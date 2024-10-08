// import { useState } from "react";
// import {
//   Stack,
//   Box,
//   Typography,
//   Button,
//   FormHelperText,
// } from "@mui/material";
// import { useFormContext } from "react-hook-form";

// export default function PhotoPreview({ sx, icon, children, name }) {
//   const { register, setValue, clearErrors, formState: { errors }, watch } = useFormContext();
//   const photo = watch(name);
//   console.log(photo, "photo");
//   console.log(name, "photo name");
//   console.log(errors[name], "errors");

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [fileInfo, setFileInfo] = useState({ name: "", size: "" });
//   const [fileInputKey, setFileInputKey] = useState(0);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.startsWith("image/")) {
//       const imageUrl = URL.createObjectURL(file);
//       setSelectedImage(imageUrl);
//       setFileInfo({
//         name: file.name,
//         size: (file.size / 1024).toFixed(2) + " KB",
//       });

//       setValue(name, file);
//       clearErrors(name);
//       resetFileInput();
//     } else {
//       alert("Please select a valid image file.");
//     }
//   };

//   const resetFileInput = () => {
//     setFileInputKey((prevKey) => prevKey + 1);
//   };

//   const handleClick = () => {
//     document.getElementById(`file-input-${fileInputKey}`).click();
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
//             alt="Selected Product"
//             sx={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
//           />
//           <Stack gap={1}>
//             <Typography variant="bmdsm">{fileInfo.name}</Typography>
//             <Typography variant="bmdr">Size: {fileInfo.size}</Typography>
//             <Button
//               variant="outlined"
//               sx={{
//                 px: 4,
//                 py: 1,
//                 width: "120px",
//                 border: `2px solid black`,
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
//             backgroundColor: `${!!errors[name] ? "red.light" : "grey.300"}`,
//             padding: "32px",
//             border: `2px dashed ${!!errors[name] ? "red" : "grey"}`,
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
//         id={`file-input-${fileInputKey}`}
//         key={fileInputKey}
//         type="file"
//         style={{ display: "none" }}
//         {...register(name, { required: "Photo is required" })}
//         onChange={handleFileChange}
//       />
//       {errors[name] && (
//         <FormHelperText sx={{ pl: 2, mt: 1 }} error={!!errors[name]}>
//           {errors[name]?.message || "This field is required"}
//         </FormHelperText>
//       )}
//     </>
//   );
// }

import { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Button,
  FormHelperText,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PhotoPreview({ sx, icon, children, name }) {
  const { register, setValue, clearErrors, formState: { errors }, watch } = useFormContext();
  const photo = watch(name);

  const [selectedImage, setSelectedImage] = useState(null);
  const [fileInfo, setFileInfo] = useState({ name: "", size: "" });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
      });

      setValue(name, file); // Store the file in form data
      // clearErrors(name);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleClick = () => {
    document.getElementById(`file-input-${name}`).click(); // Use name to avoid key mismatch
  };

  return (
    <>
      {selectedImage ? (
        <Stack
          direction="row"
          sx={{ width: "100%", textAlign: "start", mb: 2, gap: 2 }}
        >
          <Box
            component="img"
            src={selectedImage}
            alt="Selected Product"
            sx={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
          />
          <Stack gap={1}>
            <Typography variant="bmdsm">{fileInfo.name}</Typography>
            <Typography variant="bmdr">Size: {fileInfo.size}</Typography>
            <Button
              variant="outlined"
              sx={{
                px: 4,
                py: 1,
                width: "120px",
                border: `2px solid black`,
                borderRadius: "8px",
              }}
              onClick={handleClick}
            >
              <Typography variant="bsr">Change</Typography>
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack
          sx={{
            backgroundColor: `${!!errors[name] ? "red.light" : "grey.300"}`,
            padding: "32px",
            border: `2px dashed ${!!errors[name] ? "red" : "grey"}`,
            cursor: "pointer",
            alignItems: "center",
            justifyItems: "center",
            height: "100%",
            ...sx,
          }}
          onClick={handleClick}
        >
          {icon}
          {children}
        </Stack>
      )}

      <input
        id={`file-input-${name}`} // Use `name` instead of `fileInputKey`
        type="file"
        style={{ display: "none" }}
        {...register(name, { required: "Photo is required" })}
        onChange={handleFileChange}
      />
      {errors[name] && (
        <FormHelperText sx={{ pl: 2, mt: 1 }} error={!!errors[name]}>
          {errors[name]?.message || "This field is required"}
        </FormHelperText>
      )}
    </>
  );
}




// export default function PhotoPreview({ sx, icon, children, name }) {
//   const { register, setValue, clearErrors, formState: { errors }, watch } = useFormContext();
//   const photo = watch(name);

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [fileInfo, setFileInfo] = useState({ name: "", size: "" });
//   const [fileInputKey, setFileInputKey] = useState(0);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     console.log("Event:", event);  // Log entire event to see what's coming in
//     console.log("Selected file:", file);  // Log the selected file
//     if (file && file.type.startsWith("image/")) {
//       const imageUrl = URL.createObjectURL(file);
//       setSelectedImage(imageUrl);
//       setFileInfo({
//         name: file.name,
//         size: (file.size / 1024).toFixed(2) + " KB",
//       });

//       setValue(name, file);  // Register the file in form state
//       clearErrors(name);
//       resetFileInput();
//       console.log("Selected filee: ", file);  // Log file
//     } else {
//       alert("Please select a valid image file.");
//     }
//   };

//   const resetFileInput = () => {
//     setFileInputKey((prevKey) => prevKey + 1);
//   };

//   const handleClick = () => {
//     document.getElementById(`file-input-${fileInputKey}-${name}`).click();
//   };

//   return (
//     <>
//       {selectedImage ? (
//         <Stack direction="row" sx={{ width: "100%", textAlign: "start", mb: 2, gap: 2 }}>
//           <Box
//             component="img"
//             src={selectedImage}
//             alt="Selected Product"
//             sx={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
//           />
//           <Stack gap={1}>
//             <Typography variant="bmdsm">{fileInfo.name}</Typography>
//             <Typography variant="bmdr">Size: {fileInfo.size}</Typography>
//             <Button
//               variant="outlined"
//               sx={{ px: 4, py: 1, width: "120px", border: `2px solid black`, borderRadius: "8px" }}
//               onClick={handleClick}
//             >
//               <Typography variant="bsr">Change</Typography>
//             </Button>
//           </Stack>
//         </Stack>
//       ) : (
//         <Stack
//           sx={{
//             backgroundColor: !!errors[name] ? "red.light" : "grey.300",
//             padding: "32px",
//             border: `2px dashed ${!!errors[name] ? "red" : "grey"}`,
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
//         id={`file-input-${fileInputKey}-${name}`}  // Ensure unique input key
//         key={fileInputKey}
//         type="file"
//         style={{ display: "none" }}
//         {...register(name, { required: "Photo is required" })}  // Register file input
//         onChange={handleFileChange}
//       />
//       {errors[name] && (
//         <FormHelperText sx={{ pl: 2, mt: 1 }} error={!!errors[name]}>
//           {errors[name]?.message || "This field is required"}
//         </FormHelperText>
//       )}
//     </>
//   );
// }



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
