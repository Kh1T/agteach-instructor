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
import ButtonComponent from "../course-product/ButtonInBox";

/**
 * @function ProductCard
 * @description A component to display a product
 * @prop {string} src The source of the product image
 * @prop {string} title The title of the product
 * @prop {string} price The price of the product
 * @prop {function} onAdd The function to add the product to cart
 * @prop {function} onRemove The function to remove the product from cart
 * @prop {boolean} canAdd Whether the product can be added to cart
 * @prop {boolean} canRemove Whether the product can be removed from cart
 * @returns {React.ReactElement} The ProductCard component
 */

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
        <CardContent sx={{ pb: 1.5 }} width={"100%"}>
          <Typography gutterBottom variant="blgsm" component="div">
            {title}
          </Typography>
          <Typography variant="bssm" sx={{ color: "text.secondary" }}>
            ${price}
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
