import ProductCategory from "../components/ProductComponents/ProductCategory";
import AboutProduct from "../components/ProductComponents/AboutProduct";
import ProductQuantity from "../components/ProductComponents/ProductQuantity";
import ProductPhoto from "../components/ProductComponents/ProductPhoto";
import AdditionalPhoto from "../components/ProductComponents/AdditionalPhoto";

import { Box } from "@mui/material";
import ProductPrice from "../components/ProductComponents/ProductPrice";

function NewProductPage() {
  return (
    <Box sx={{ width: "100%" }}>
      {/* <Typography variant="h2">New Product</Typography> */}
      <ProductCategory />
      <AboutProduct />
      <ProductQuantity />
      <ProductPhoto />
      <ProductPrice />
      <AdditionalPhoto />
    </Box>
  );
}

export default NewProductPage;
