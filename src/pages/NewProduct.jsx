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
import { CustomAlert } from "../components/CustomAlert";

import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../services/api/productApi";
import { useNavigate, useLocation } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function NewProductPage() {
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product; // Highlighted: Get the product from the state

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const editMode = location.state?.editMode;
  const productId = location.state?.productId;

  const ButtonText = editMode ? "UPDATE PRODUCT" : "CREATE PRODUCT";

  useEffect(() => {
    if (product && editMode) {
      setValue("category", product.categoryId);
      setValue("name", product.name);
      setValue("quantity", product.quantity);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("categoryId", product.categoryId);
      setValue("productCover", product.imageUrl);
    }
  }, [product, setValue, editMode]);

  const [removedImages, setRemovedImages] = useState([]);
  const handleUploadProduct = async (data) => {
    const formData = new FormData();
    console.log("This is the data before appending: ", data);

    formData.append("categoryId", data.categoryId);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);
    formData.append("price", data.price);
    formData.append("removedImages", JSON.stringify(removedImages));

    // Check if productCover exists and append it
    if (data.productCover instanceof File) {
      formData.append("productCover", data.productCover);
    }

    // Append additional product images
    if (data.productImages && data.productImages.length > 0) {
      // Ensure unique images by using a Set
      const uniqueImages = new Set(data.productImages);

      // Append all unique images at once
      uniqueImages.forEach((image) => {
        formData.append("productImages", image);
      });
    }

    console.log("This is the form data", [...formData]);
    try {
      if (editMode) {
        console.log(formData);
        await updateProduct({ productId, productData: formData }).unwrap();
        console.log("Product updated successfully");
      } else {
        await createProduct(formData).unwrap();
        console.log("Product created successfully");
      }
    } catch (error) {
      // Differentiate error messages for better debugging
      if (editMode) {
        console.error("Failed to update product:", error);
      } else {
        console.error("Failed to create product:", error);
      }
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
      <form onSubmit={handleSubmit(handleUploadProduct)}>
        <ProductCategory
          register={register}
          errors={errors}
          defaultValue={product?.categoryId}
        />
        <AboutProduct
          register={register}
          errors={errors}
          setValue={setValue}
          name={watch("name")}
          description={watch("description")}
        />
        <ProductQuantity
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        <ProductPhoto
          register={register}
          unregister={unregister}
          errors={errors}
          setValue={setValue}
          watch={watch}
          defaultValue={product?.imageUrl}
          editMode={editMode}
        />
        <ProductPrice register={register} errors={errors} />
        <AdditionalPhoto
          register={register}
          errors={errors}
          setValue={setValue}
          fileInfo={watch("productImages")}
          productId={product?.productId}
          editMode={editMode}
          setRemovedImages={setRemovedImages}
          watch={watch}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 4, bgcolor: "purple.main" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : ButtonText}
        </Button>
        <CustomAlert
          autoHideDuration={2000}
          label={
            editMode
              ? "Product updated successfully Close here to navigate to product page."
              : "Product created successfully Close here to navigate to product page."
          }
          open={isSubmitSuccessful}
        />
        {isSubmitSuccessful && navigate("/product")}
      </form>
    </Box>
  );
}

export default NewProductPage;
