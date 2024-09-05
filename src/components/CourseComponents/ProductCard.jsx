import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ButtonComponent from "../CourseProductComponents/ButtonInBox";
export default function ProductCard({
  src,
  title,
  price,
  onAdd,
  onRemove,
  canAdd,
  canRemove,
}) {
  return (
    <Card sx={{ maxWidth: 218, minHeight: 240, position: "relative", mb: 4 }}>
      {/* Conditionally render the Remove button */}
      {canRemove && (
        <Box sx={{ position: "absolute", top: 1, right: 1, zIndex: 1 }}>
          <IconButton
            sx={{ backgroundColor: "common.white" }}
            onClick={onRemove}
          >
            <ClearIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardActionArea>
        <CardMedia component="img" height="200" image={src} alt={title} />
        <CardContent sx={{ pb: 1.5 }}>
          <Typography gutterBottom variant="blgsm" component="div">
            {title}
          </Typography>
          <Typography variant="bssm" sx={{ color: "text.secondary" }}>
            {price}
          </Typography>
        </CardContent>
        {canAdd && (
          <ButtonComponent
            variant="contained"
            text={"Add"}
            bgcolor={"blue.main"}
            pl={2}
            onClick={onAdd}
          />
        )}
      </CardActionArea>
    </Card>
  );
}
