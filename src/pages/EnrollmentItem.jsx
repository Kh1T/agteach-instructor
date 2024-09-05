import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Grid2 as Grid, Typography, Stack } from "@mui/material";
import courseCover from "./../assets/dashboard-enrollment/course-cover.png";

function EnrollmentItem() {
  return (
    <Grid>
      {/* Go Back */}
      <Grid container alignItems="center">
        <ArrowBackIosIcon sx={{ fontSize: 14 }} />
        <Link to="/enrollment">
          <Typography variant="bsr">Go Back</Typography>
        </Link>
      </Grid>

      {/* Course Content */}

      <Grid container>
        <Box component="img" src={courseCover} />
        <Stack>
          <Typography variant="">Course Name</Typography>
          <Typography>Indoor Gardening and Hydroponics</Typography>
          <Stack>
            <Typography>Created at: 23/03/2024</Typography>
            <Typography>Price: $74.99</Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default EnrollmentItem;
