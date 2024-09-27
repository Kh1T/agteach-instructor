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

import { useEffect } from "react";
function NewProductPage() {
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const location = useLocation();
  const product = location.state?.product;
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

  const handleUploadProduct = async (data) => {
    console.log(productId);

    const formData = new FormData();

    formData.append("categoryId", data.categoryId);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);
    formData.append("price", data.price);

    // Check if productCover exists and append it
    if (data.productCover && data.productCover.length > 0) {
      formData.append("productCover", data.productCover[0]);
    }

    // Append additional product images
    if (data.productImages && data.productImages.length > 0) {
      for (let i = 0; i < data.productImages.length; i++) {
        formData.append("productImages", data.productImages[i]);
      }
    }

   console.log([...formData])
    try {
      if (editMode) {
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

  if (isSubmitSuccessful) {
    navigate("/product"); 
    window.location.reload(); 
  }

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
        <AboutProduct register={register} errors={errors} />
        <ProductQuantity
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        <ProductPhoto
          register={register}
          errors={errors}
          setValue={setValue}
          defaultValue={product?.imageUrl}
        />
        <ProductPrice register={register} errors={errors} />
        <AdditionalPhoto
          register={register}
          errors={errors}
          setValue={setValue}
          productId={product?.productId}
          editMode={editMode}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 4, bgcolor: "purple.main" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : ButtonText}
        </Button>
      </form>
    </Box>
  );
}

export default NewProductPage;
