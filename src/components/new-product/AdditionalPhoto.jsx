import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import IconWithTitle from "../course-product/IconWithTitle";
import TextSection from "../course-product/TextSection";
import AddManyPhoto from "../course-product/AddManyPhoto";
import { useGetProductsImagesQuery } from "../../services/api/productApi";

/**
 * AdditionalPhotos component renders a box with a title, icon, description, and AddManyPhoto component.
 * It is used to add additional photos to a product.
 *
 * @returns {React.ReactElement} A JSX element containing the AdditionalPhotos component
 */
export default function AdditionalPhotos({ register, errors, setValue , productId }) {
 
  const { data } = useGetProductsImagesQuery(productId);
  return (
    <Box>
      <IconWithTitle
        title="Additional Photos"
        icon={<AddPhotoAlternateIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title="Help customers see the product better"
        description="Adding more images can help customers have a better overview of your product."
      />
      <AddManyPhoto  register={register} errors={errors} setValue={setValue} name={"productImages"} />
      <Divider sx={{ my: 2 }} />
      <Typography component="ul">
        <Typography variant="bsr" color="dark.300" paddingY={1} component="li">
          Please verify your course information before submitting.
        </Typography>
        <Typography variant="bsr" color="dark.300" component="li">
          By clicking <strong>CREATE PRODUCT</strong>, you ensure that all the
          provided course information above is following AgTeach Terms and
          Policy.
        </Typography>
      </Typography>
    </Box>
  );
}
