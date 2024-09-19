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

import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useEffect, React } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function NewProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product; // Get the product from the state

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // Pre-fill form fields if product data exists
  React.useEffect(() => {
    if (product) {
      setValue("category", product.categoryId);
      setValue("name", product.name);
      setValue("quantity", product.quantity);
      setValue("price", product.price);
      // Set other fields as needed...
    }
  }, [product, setValue]);

  const handleCreateProduct = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ width: "100%", pb: 30 }}>
      <Button
        variant="Text"
        startIcon={<ArrowBackIosIcon fontSize="small" color="dark.300" />}
        sx={{ textDecoration: "underline", color: "dark.300" }}
        onClick={() => navigate(-1)}
      >
        <Typography variant="bmdr">Go Back</Typography>
      </Button>
      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <ProductCategory register={register} errors={errors} />
        <AboutProduct register={register} errors={errors} />
        <ProductQuantity
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        <ProductPhoto register={register} errors={errors} setValue={setValue} />
        <ProductPrice register={register} errors={errors} />
        <AdditionalPhoto
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <ButtonComponent
          text="CREATE PRODUCT"
          variant="contained"
          bgcolor="purple.main"
        />
      </form>
    </Box>
  );
}

export default NewProductPage;
