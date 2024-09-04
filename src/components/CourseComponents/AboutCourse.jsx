import { TextField, Box, Divider, Typography, Stack } from "@mui/material";
import IconWithTitle from "../IconWithTitle";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import TextSection from "../TextSection";
export default function AboutCourse() {
  return (
    <Box className="container">
      <IconWithTitle
        title="About Course"
        icon={<NewspaperOutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <TextSection
        title="Let’s craft a course title"
        description="Crafted a good title would help your content engage more students."
      />
      <TextField
        sx={{ my: 2 }}
        fullWidth
        id="outlined-controlled"
        label="Enter your course title"
      />
      <Typography variant="bsr" sx={{ mt: 2 }}>
        eg: How to plant an indoor tomatoes 100% edible
      </Typography>

      <Box mt={4}>
        <TextSection
          title="Tell us more about your course"
          description="Crafted a good title would help your content engage more students."
        />
        <TextField
          sx={{ my: 2 }}
          fullWidth
          id="outlined-controlled"
          label="Enter your course description"
        />
      </Box>
      <TextSection
        title="What student will learn in this course?"
        description="Describe the learning objective of this course that learner expect to
          achieve after completing this course"
      />
      <TextField
        sx={{ my: 2 }}
        fullWidth
        id="outlined-controlled"
        label="What  they will learn in this course: "
      />
    </Box>
  );
}
