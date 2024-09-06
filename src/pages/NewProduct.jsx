import ProductCategory from "../components/ProductComponents/ProductCategory";
import AboutProduct from "../components/ProductComponents/AboutProduct";
import ProductQuantity from "../components/ProductComponents/ProductQuantity";
import ProductPhoto from "../components/ProductComponents/ProductPhoto";
import AdditionalPhoto from "../components/ProductComponents/AdditionalPhoto";
import ButtonComponent from "../components/CourseProductComponents/ButtonInBox";

import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ProductPrice from "../components/ProductComponents/ProductPrice";

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
