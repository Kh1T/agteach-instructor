import { TextField, Box, Divider, Typography } from "@mui/material";
import IconWithTitle from "../course-product/IconWithTitle";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import TextSection from "../course-product/TextSection";

import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

/**
 * AboutCourse component renders a page for instructors to input course title,
 * course description, and learning objective of the course.
 *
 * It uses the TextSection component to render each section.
 *
 * @returns a JSX element containing the AboutCourse component.
 */

export default function AboutCourse() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const course = useSelector((state) => state.course.courseData);

  useEffect(() => {
    if (course) {
      const { name, description, courseObjective } = course;

      setValue("courseName", name);
      setValue("description", description);
      setValue("courseObjective", courseObjective);
    }
  }, [course, setValue]);

  return (
    <Box className="container">
      <IconWithTitle
        title="About Course"
        icon={<NewspaperOutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title="Let's craft a course title"
        description="Crafted a good title would help your content engage more students."
      />
      <TextField
        sx={{ my: 2 }}
        fullWidth
        id="courseName"
        // slotProps={{
        //   inputLabel: { shrink: course && !!course.name },
        // }}
        label="Enter your course title"
        {...register("courseName", {
          required: "Title is required",
          maxLength: {
            value: 70,
            message: "Title cannot be exceed 70 characters",
          },
        })}
        error={!!errors.courseName}
        helperText={errors.courseName?.message}
      />
      <Typography variant="bsr" color="dark.300" sx={{ mt: 2 }}>
        eg: How to plant an indoor tomatoes 100% edible
      </Typography>

      <Box mt={4}>
        <TextSection
          title="Tell us more about your course"
          description="Crafted a good title would help your content engage more students."
        />
        <TextField
          id="description"
          // slotProps={{
          //   input: { sx: { alignItems: "flex-start", minHeight: "150px" } },
          //   inputLabel: { shrink: course && !!course.description },
          // }}
          sx={{ my: 2 }}
          fullWidth
          multiline
          label="Enter your course description"
          {...register("description", { required: "Description is required" })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </Box>
      <TextSection
        title="What student will learn in this course?"
        description="Describe the learning objective of this course that learner expect to
          achieve after completing this course"
      />
      <TextField
        // slotProps={{
        //   input: { sx: { alignItems: "flex-start", maxHeight: "150px" } },
        //   inputLabel: { shrink: course && !!course.courseObjective },
        // }}
        sx={{ my: 2 }}
        fullWidth
        multiline
        id="courseObjective"
        label="What they will learn in this course: "
        // InputLabelProps={{ shrink: true }}
        {...register("courseObjective", { required: "Objective is required" })}
        error={!!errors.courseObjective}
        helperText={errors.courseObjective?.message}
      />
    </Box>
  );
}
