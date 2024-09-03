import { TextField, Box, Divider, Typography, Stack } from "@mui/material";
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
      <Stack gap={1}>
        <Typography variant="blgsm">Let’s craft a course title</Typography>
        <Typography variant="bsr">
          Crafted a good title would help your content engage more students.
        </Typography>
      </Stack>
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
        <Stack gap={1}>
          <Typography variant="blgsm">
            Tell us more about your course
          </Typography>
          <Typography variant="bsr">
            Crafted a good title would help your content engage more students.
          </Typography>
        </Stack>
        <TextField
          sx={{ my: 2 }}
          fullWidth
          id="outlined-controlled"
          label="Enter your course description"
        />
      </Box>

      <Stack gap={1} mt={4}>
        <Typography variant="blgsm">
          What student will learn in this course?
        </Typography>
        <Typography variant="bsr">
          Describe the learning objective of this course that learner expect to
          achieve after completing this course
        </Typography>
        <TextField
          sx={{ my: 2 }}
          fullWidth
          id="outlined-controlled"
          label="What  they will learn in this course: "
        />
      </Stack>
    </Box>
  );
}
