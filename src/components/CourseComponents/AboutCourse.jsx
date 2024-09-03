import { TextField, Box, Divider, Typography } from "@mui/material";
import IconWithTitle from "../IconWithTitle";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
export default function AboutCourse() {
  return (
    <Box className="container">
      <IconWithTitle
        title="About Course"
        icon={<NewspaperOutlinedIcon sx={{ color: "common.white" }} />}
      />
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" fontWeight={"bold"}>
        Let’s craft a course title
      </Typography>
      <Typography variant="subtitle2">
        Crafted a good title would help your content engage more students.
      </Typography>
      <TextField
        sx={{ my: 2 }}
        fullWidth
        id="outlined-controlled"
        label="Enter your course title"
      />
      <Typography variant="subtitle2" sx={{ mt: 2 }}>
        eg: How to plant an indoor tomatoes 100% edible
      </Typography>

      <Box mt={4}>
        <Typography variant="h6" fontWeight={"bold"}>
          Tell us more about your course
        </Typography>
        <Typography variant="subtitle2">
          Crafted a good title would help your content engage more students.
        </Typography>
        <TextField
          sx={{ my: 2 }}
          fullWidth
          id="outlined-controlled"
          label="Enter your course description"
        />
      </Box>

      <Box mt={4}>
        <Typography variant="h6" fontWeight={"bold"}>
          What student will learn in this course?
        </Typography>
        <Typography variant="subtitle2">
          Describe the learning objective of this course that learner expect to
          achieve after completing this course
        </Typography>
        <TextField
          sx={{ my: 2 }}
          fullWidth
          id="outlined-controlled"
          label="What  they will learn in this course: "
        />
      </Box>
    </Box>
  );
}
