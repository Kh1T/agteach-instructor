import { Divider, Typography, Box } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import IconWithTitle from "../course-product/IconWithTitle";
import TextSection from "../course-product/TextSection";
import PhotoPreview from "../course-product/PhotoPreview";

/**
 * ProductPhoto component renders a page for instructors to input product photo.
 *
 * It renders the page with the following components:
 *   - IconWithTitle component with title and icon
 *   - Divider component
 *   - TextSection component with title and description
 *   - PhotoPreview component with icon
 *
 * @returns {JSX.Element} a JSX element containing the icon and title
 */
export default function ProductPhoto({
  register,
  unregister,
  errors,
  defaultValue,
  setValue,
  watch,
  editMode
}) {

  return (
    <Box>
      <IconWithTitle
        title={"Product Photo"}
        icon={<InsertPhotoIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title={"Choose a feature image for your product"}
        description={
          "Most customers will decide to buy a product based on an image"
        }
      />
      {/* <PhotoPreview icon={<InsertPhotoIcon />} register={register} errors={errors} setValue={setValue} name={"image"} >
        <Typography color="gray">
          Upload Product image, png, jpg, webp
        </Typography>
      <PhotoPreview
        icon={<InsertPhotoIcon />}
        register={register}
        unregister={unregister}
        errors={errors}
        watch={watch}
        setValue={setValue}
        name={"productCover"}
        defaultValue={defaultValue}
        editMode={editMode}
      >
        <Typography color="gray">Upload Product image, png, jpg</Typography>
        <Typography color="gray">580 x 580 (Limit size: 1 MB)</Typography>
      </PhotoPreview> */}
    </Box>
  );
}
