import ProductCategory from "../components/new-product/ProductCategory";
import AboutProduct from "../components/new-product/AboutProduct";
import ProductQuantity from "../components/new-product/ProductQuantity";
import ProductPhoto from "../components/new-product/ProductPhoto";
import AdditionalPhoto from "../components/new-product/AdditionalPhoto";
import ButtonComponent from "../components/course-product/ButtonInBox";

import { Box, Button, Typography, FormHelperText } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ProductPrice from "../components/new-product/ProductPrice";

import { useAddProductMutation } from "../store/api/productApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";

function NewProductPage() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [addProduct, { isLoading: isSubmitting }] = useAddProductMutation();
  const navigate = useNavigate();
  const {
    isLoading = false,
    error = null,
    success = false,
  } = useSelector((state) => state.products || {});
  // State for form inputs
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setProductQuantity] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [price, setPrice] = useState(0);
  const [additionalPhoto, setAdditionalPhoto] = useState(null);

  const onSubmit = async (data) => {
    const productData = {
      category,
      name,
      description,
      quantity,
      price,
      photo,
      additionalPhoto,
    };
    try {
      await addProduct(productData).unwrap();
    } catch (err) {
      console.error("Failed to create product: ", err);
    }
  };

  console.log(category);
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

      <Controller
        name="category"
        control={control}
        rules={{ required: "Category is required" }}
        render={() => (
          <>
            <ProductCategory
              setCategory={setCategory}
              error={Boolean(errors.category)}
            />
            {errors.category && (
              <FormHelperText error>{errors.category.message}</FormHelperText>
            )}
          </>
        )}
      />

      <Controller
        name="about"
        control={control}
        rules={{ required: "Product name is required" }}
        render={() => (
          <>
            <AboutProduct
              setName={setName}
              setDescription={setDescription}
              error={Boolean(errors.category)}
            />
            {errors.category && (
              <FormHelperText error>{errors.category.message}</FormHelperText>
            )}
          </>
        )}
      />

      <ProductQuantity setProductQuantity={setProductQuantity} />
      <ProductPhoto onChange={(e) => setPhoto(e.target.files[0])} />
      <ProductPrice setPrice={setPrice} />
      <AdditionalPhoto
        onChange={(e) => setAdditionalPhoto(e.target.files[0])}
      />
      <ButtonComponent
        text={isSubmitting ? "CREATING..." : "CREATE PRODUCT"}
        variant="contained"
        bgcolor="purple.main"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting} // Disable button during loading
      />
    </Box>
  );
}

export default NewProductPage;
