import loginImg from "./../assets/login/login-img.png";
import logo from "./../assets/login/agteach-logo.svg";
import { Box, Typography } from "@mui/material";

function SideBarImg() {
  return (
    <Box sx={{ position: "relative" }}>
      <Box>
        <Box
          component="img"
          src={loginImg}
          alt="login-img"
          sx={{ width: "100%", height: "100vh", objectFit: "cover", objectPosition: " left " }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "30%",
          zIndex: "tooltip",
        }}
      >
        <img src={logo} alt="logo" />
        <Box width="350px">
          <Typography variant="h1" color="white">
            Teach and Sell
          </Typography>
          <Typography variant="bmdr" color="white">
            aspiring farmers and plant enthusiasts, offering a one-stop solution
            for all needs on agricultural journey
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SideBarImg;
