import ProductCategory from "../components/new-product/ProductCategory";
import AboutProduct from "../components/new-product/AboutProduct";
import ProductQuantity from "../components/new-product/ProductQuantity";
import ProductPhoto from "../components/new-product/ProductPhoto";
import AdditionalPhoto from "../components/new-product/AdditionalPhoto";
import ButtonComponent from "../components/course-product/ButtonInBox";

import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ProductPrice from "../components/new-product/ProductPrice";
import { useAddProductMutation } from "../store/api/productApi";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function NewProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, success } = useSelector((state) => state.products);

  // State for form inputs
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [price, setPrice] = useState(0);
  const [additionalPhoto, setAdditionalPhoto] = useState(null);
  const HandleSubmit = () => {
    const productData = {
      category,
      about,
      quantity,
      price,
      photo,
      additionalPhoto,
    };

    // Dispatch the useAddProductMutation action
    dispatch(useAddProductMutation(productData));
  };

  // Navigate back after successful creation
  if (success) {
    navigate(-1);
  }

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
      <ProductCategory
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <AboutProduct value={about} onChange={(e) => setAbout(e.target.value)} />
      <ProductQuantity
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <ProductPhoto onChange={(e) => setPhoto(e.target.files[0])} />
      <ProductPrice value={price} onChange={(e) => setPrice(e.target.value)} />
      <AdditionalPhoto
        onChange={(e) => setAdditionalPhoto(e.target.files[0])}
      />
      <ButtonComponent
        text={isLoading ? "CREATING..." : "CREATE PRODUCT"}
        variant="contained"
        bgcolor="purple.main"
        onClick={HandleSubmit}
        disabled={isLoading} // Disable button during loading
      />
    </Box>
  );
}

export default NewProductPage;
