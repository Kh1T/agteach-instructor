import { Divider, Box, TextField, Typography, InputLabel } from "@mui/material";

import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import IconWithTitle from "../course-product/IconWithTitle";
import TextSection from "../course-product/TextSection";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect } from "react";

/**
 * CoursePrice component renders a page for instructors to input course price.
 *
 * It renders the page with the following components:
 *   - IconWithTitle component with title and icon
 *   - Divider component
 *   - TextSection component with title and description
 *   - TextField component for inputting price
 *   - Typography component with two notes:
 *     - AgTeach will deduct 20% from the total sale
 *     - Example, if the product is $100 we will deduct $20 from your sale
 *
 * @returns {JSX.Element} Box component with children
 */
export default function CoursePrice() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const course = useSelector((state) => state.course.courseData);

  useEffect(() => {
    if (course) {
      const { price } = course;

      setValue("coursePrice", price);
    }
  }, [course, setValue]);

  return (
    <Box className="container">
      <IconWithTitle
        title={"COURSE PRICE"}
        icon={<AttachMoneyOutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title="Tell us about your Course price (USD)"
        description="Choosing a correct price strategy will help engage more customer"
      />
      <TextField
        fullWidth
        sx={{ my: 2 }}
        id="outlined-controlled"
        label="Price"
        slotProps={{
          inputLabel: {
            shrink: (course && !!course.price) || !!watch("coursePrice"),
          },
          htmlInput: { step: "0.01" },
        }}
        type="number"
        {...register("coursePrice", {
          required: "Price is required",
          min: { value: 1, message: "Price must be greater than $0" },
          max: { value: 1000, message: "Price must be less than $1000" },
        })}
        error={!!errors.coursePrice}
        helperText={errors.coursePrice?.message}
      />
      <Typography component={"ul"}>
        <Typography
          variant="bsr"
          color="dark.300"
          paddingY={1}
          component={"li"}
        >
          NOTE: AgTeach will deduct 20% from your total sale
        </Typography>
        <Typography variant="bsr" color="dark.300" component={"li"}>
          Example, if the product is $100 we will deduct $20 from your sale
        </Typography>
      </Typography>
    </Box>
  );
}
