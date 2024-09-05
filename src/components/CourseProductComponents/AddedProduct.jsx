import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import ProductCard from "../CourseComponents/ProductCard";
export default function AddedProduct({ products, onRemoveProduct }) {
  const handleRemoveProduct = (productId) => {
    if (onRemoveProduct) {
      onRemoveProduct(productId);
    }
  };
  return (
    <Box>
      <Typography variant="blgsm" sx={{ paddingBottom: 2 }}>
        Added Products :
      </Typography>

      <Stack direction="row" gap={1} paddingY={2} flexWrap="wrap">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              src={product.src}
              title={product.title}
              price={product.price}
              canRemove={true} // Ensure the Remove button is shown
              onRemove={() => handleRemoveProduct(product.id)}
            />
          ))
        ) : (
          <Typography>No products added yet.</Typography>
        )}
      </Stack>
      <Divider />
    </Box>
  );
}
