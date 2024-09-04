import ProductCategory from "../components/ProductComponents/ProductCategory";
import AboutProduct from "../components/ProductComponents/AboutProduct";
import ProductQuantity from "../components/ProductComponents/ProductQuantity";
import ProductPhoto from "../components/ProductComponents/ProductPhoto";
import AdditionalPhoto from "../components/ProductComponents/AdditionalPhoto";
import ButtonComponent from "../components/CourseProductComponents/ButtonInBox";

import { Box  } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ProductPrice from "../components/ProductComponents/ProductPrice";

function NewProductPage() {
  return (
    <Box sx={{ width: "100%", paddingBottom:30 }}>
      <ButtonComponent
        text="Go Back"
        variant="text"
        color="black"
        startIcon={<ArrowBackIosIcon fontSize="small" color="gray" />}
      />

      <ProductCategory />
      <AboutProduct />
      <ProductQuantity />
      <ProductPhoto />
      <ProductPrice />
      <AdditionalPhoto />
      <ButtonComponent
        text={"CREATE PRODUCT"}
        variant={"contained"}
        bgcolor={"purple.main"}
      />
    </Box>
  );
}

export default NewProductPage;
