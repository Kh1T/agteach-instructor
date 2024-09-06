import { Divider, Typography, Box } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import TextSection from "../CourseProductComponents/TextSection";
import PhotoPreview from "../CourseProductComponents/PhotoPreview";

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
export default function ProductPhoto() {

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
      <PhotoPreview icon={<InsertPhotoIcon />}>
        <Typography color="gray">
          Upload Product image, png, jpg, webp
        </Typography>
        <Typography color="gray">580 x 580 (Limit size: 1 MB)</Typography>
      </PhotoPreview>
    </Box>
  );
}

