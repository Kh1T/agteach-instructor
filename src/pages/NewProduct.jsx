import ProductCategory from "../components/new-product/ProductCategory";
import AboutProduct from "../components/new-product/AboutProduct";
import ProductQuantity from "../components/new-product/ProductQuantity";
import ProductPhoto from "../components/new-product/ProductPhoto";
import AdditionalPhoto from "../components/new-product/AdditionalPhoto";
import ButtonComponent from "../components/course-product/ButtonInBox";

import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ProductPrice from "../components/new-product/ProductPrice";

import { useNavigate } from "react-router-dom";

function NewProductPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", pb: 30 }}>
      <Button
        variant="Text"
        startIcon={<ArrowBackIosIcon fontSize="small" color="dark.300" />}
        sx={{ textDecoration: "underline", color: "dark.300" }}
        onClick={() => navigate(-1)}
      >
        <Typography variant="bsr">Go Back</Typography>
      </Button>
      <ProductCategory />
      <AboutProduct />
      <ProductQuantity />
      <ProductPhoto />
      <ProductPrice />
      <AdditionalPhoto />
      <ButtonComponent
        text="CREATE PRODUCT"
        variant="contained"
        bgcolor="purple.main"
      />
    </Box>
  );
}

export default NewProductPage;
