import React, { useEffect } from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import ProductCard from "../new-course/ProductCard";
import { useDispatch } from "react-redux";
import { setProductId } from "../../features/course/courseSlice";
/**
 * AddedProduct component renders a list of products that have been added to the course.
 *
 * It takes two props: `products` and `onRemoveProduct`.
 *
 * `products` is an array of objects representing the products that have been added to the course.
 * Each object should have the following properties:
 *   - `id`: The ID of the product
 *   - `src`: The URL of the product image
 *   - `title`: The title of the product
 *   - `price`: The price of the product
 *
 * `onRemoveProduct` is a function that will be called when a product is removed from the course.
 * It takes one argument, `productId`, which is the ID of the product being removed.
 *
 * The component renders a Box component with a Typography component and a Stack component.
 * The Typography component displays the text "Added Products :".
 * The Stack component renders a list of ProductCard components, one for each product in the `products` array.
 * The ProductCard component is given the following props:
 *   - `src`: The URL of the product image
 *   - `title`: The title of the product
 *   - `price`: The price of the product
 *   - `canRemove`: A boolean indicating whether the product can be removed
 *   - `onRemove`: A function that will be called when the product is removed
 * The onRemove function is set to the `handleRemoveProduct` function defined in the component.
 *
 * If the `products` array is empty, the component renders a Typography component with the text "No products added yet.".
 */
export default function AddedProduct({ products, onRemoveProduct }) {
  const dispatch = useDispatch();
  const handleRemoveProduct = (productId) => {
    if (onRemoveProduct) {
      onRemoveProduct(productId);
    }
  };

  useEffect(() => {
    const formattedProducts = products.map((product) => ({
      productId: product.id,
    }))
    dispatch(setProductId(formattedProducts));
  }, [products, dispatch]);

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
          <Typography>No products added yet</Typography>
        )}
      </Stack>
      <Divider />
    </Box>
  );
}
