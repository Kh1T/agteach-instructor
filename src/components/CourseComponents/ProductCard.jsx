import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  IconButton,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ButtonComponent from "../CourseProductComponents/ButtonInBox";
export default function ProductCard({ src, title, price }) {
  return (
    <Card sx={{ maxWidth: 345, minHeight: 240, position: "relative", mb: 4 }}>
      {/* Box for positioning the Remove button */}
      <Box sx={{ position: "absolute", top: 1, right: 1, zIndex: 1 }}>
        <IconButton sx={{ backgroundColor: "common.white" }}>
          <ClearIcon color="error" />
        </IconButton>
      </Box>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={src}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="blgsm" component="div">
            {title}
          </Typography>
          <Typography variant="bssm" sx={{ color: "text.secondary" }}>
            {price}
          </Typography>
        </CardContent>
        <ButtonComponent
          variant="contained"
          text={"Add"}
          bgcolor={"blue.main"}
          pl={2}
        />
      </CardActionArea>
    </Card>
  );
}
