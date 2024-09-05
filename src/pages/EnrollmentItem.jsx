import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Grid2 as Grid, Typography, Stack, Divider } from "@mui/material";
import courseCover from "./../assets/dashboard-enrollment/course-cover.png";
import tableImg from "./../assets/dashboard-enrollment//student-img.png";
import CustomTable from "./../components/CustomTable";

const itemData = [
  {
    Photos: <Box component="img" src={tableImg} />,
    "Student Name": "$74.99",
    Email: 1,
    Phone: "23/03/2024",
    "Enrolled at": "24 / 08 / 2924",
  },
];

function EnrollmentItem() {
  return (
    <Grid container direction="column" gap={6}>
      {/* Go Back */}
      <Grid container alignItems="center">
        <ArrowBackIosIcon sx={{ fontSize: 14 }} />
        <Link to="/enrollment">
          <Typography variant="bsr">Go Back</Typography>
        </Link>
      </Grid>

      {/* Course Content */}

      <Grid container alignItems="center" gap={2}>
        <Box component="img" src={courseCover} />
        <Stack gap={1}>
          <Typography variant="bxsmd">Course Name</Typography>
          <Typography variant="blgr">
            Indoor Gardening and Hydroponics
          </Typography>
          <Stack>
            <Typography variant="bxsmd">
              <Box component="strong">Created at</Box>: 23/03/2024
            </Typography>
            <Typography variant="bxsmd">
              <Box component="strong">Price</Box>: $74.99
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      <Divider sx={{ borderStyle: "dashed" }} />
      {/* Students Info */}

      <Grid container direction="column" gap={1}>
        <Typography variant="blgsm">Students</Typography>
        <Typography variant="bxsmd">Found (1) Student</Typography>
        <CustomTable data={itemData} />
      </Grid>
    </Grid>
  );
}

export default EnrollmentItem;
