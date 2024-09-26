import ProductCategory from "../components/new-product/ProductCategory";
import AboutProduct from "../components/new-product/AboutProduct";
import ProductQuantity from "../components/new-product/ProductQuantity";
import ProductPhoto from "../components/new-product/ProductPhoto";
import AdditionalPhoto from "../components/new-product/AdditionalPhoto";
import ButtonComponent from "../components/course-product/ButtonInBox";
import { CircularProgress } from "@mui/material";

import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ProductPrice from "../components/new-product/ProductPrice";

import { useCreateProductMutation } from "../services/api/productApi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useEffect, React } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller } from "react-hook-form";

function NewProductPage() {
  const [createProduct] = useCreateProductMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting , isSubmitSuccessful},
  } = useForm();

  const handleCreateProduct = async (data) => {
    console.log(data);

    const formData = new FormData();

    formData.append("categoryId", data.categoryId);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);
    formData.append("price", data.price);
    formData.append("productCover", data.productCover[0]);
    formData.append("productImages", data.productImages);

    console.log(formData);
    try {
      await createProduct(formData).unwrap();
      console.log("Product created successfully");
    } catch (error) {
      console.error("Failed to create product:", error);
    }
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
        <Button type="submit" variant="contained" sx={{ mt:4, bgcolor: "purple.main" }} disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : "CREATE PRODUCT"}
          {isSubmitSuccessful && navigate("/product")}
        </Button>
      </form>
    </Box>
  );
}

export default NewProductPage;
