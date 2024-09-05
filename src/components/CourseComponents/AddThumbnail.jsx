import { Divider, Typography, Box } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import WallpaperOutlinedIcon from "@mui/icons-material/WallpaperOutlined";
import IconWithTitle from "../CourseProductComponents/IconWithTitle";
import TextSection from "../CourseProductComponents/TextSection";
import PhotoPreview from "../CourseProductComponents/PhotoPreview";

/**
 * AddThumbnail component for adding thumbnail image of course
 *
 * @returns {React.ReactElement} Box component with children
 *   - IconWithTitle component with title and icon
 *   - Divider component
 *   - TextSection component with title and description
 *   - PhotoPreview component with icon .
 */
export default function AddThumbnail() {
  return (
    <Box>
      <IconWithTitle
        title={"Add Thumbnail"}
        icon={<WallpaperOutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title="Choose a feature image for your course"
        description="Most of customer will decided to buy a course based on an image"
      />
      <PhotoPreview icon={<InsertPhotoIcon />}>
        <Typography color="gray">
          Upload Course thumbnail image, png, jpg, webp
        </Typography>
        <Typography color="gray">580 x 580 (Limit size: 1 MB)</Typography>
      </PhotoPreview>
    </Box>
  );
}
