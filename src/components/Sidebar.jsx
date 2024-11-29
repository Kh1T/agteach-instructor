import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Container,
  Link,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInstructorVerificationStatus } from "../features/user/approvalSlice";

import logoIcon from "../assets/logo.svg";
import logoutIcon from "../assets/red-circle-logout.png";

import { SIDEBARROUTE } from "../constants/sideBarConstant";
import { useLogoutMutation } from "../services/api/authApi";
import { useGetInstructorInfoQuery } from "../services/api/authApi";

/**
 * A custom sidebar component that renders the app bar and the drawer.
 * @param {object} children The content of the page.
 * @returns {React.ReactElement} The custom sidebar component.
 */
export default function Sidebar({ children }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { data, isLoading: isDataLoading } = useGetInstructorInfoQuery();
  const { isApprovalLoading } = useSelector((state) => state.approval);

  const appBarHeader = SIDEBARROUTE.find((element) => {
    if (element.route.includes("id")) {
      const dynamicPath = `/${pathname.split("/")[1]}/id`;
      if (element.route === dynamicPath) {
        return element.route === dynamicPath;
      }
    }
    return element.route === pathname;
  });

  const description = appBarHeader && appBarHeader.description;
  const headerTitle = appBarHeader && appBarHeader.title;

  let bgColor;
  let sideBarList = !data ? [] : SIDEBARROUTE;

  console.log(data);

  if (data) {
    const { isApproved, isRejected, isFormSubmitted } = data?.data?.instructor;
    dispatch(
      setInstructorVerificationStatus({
        IsApproved: isApproved,
        IsRejected: isRejected,
        IsFormSubmitted: isFormSubmitted,
        IsApprovalLoading: isDataLoading,
      })
    );
    isApproved ? (bgColor = "common.white") : (bgColor = "grey.100");
    !isApproved &&
      (sideBarList = SIDEBARROUTE.filter((element) => {
        return element.route === "/" || element.route === "/setting";
      }));
  }

  const drawerWidth = 250;

  let profileImage =
    data?.data?.instructor?.imageUrl + `?${new Date().getTime()}`;

  const [logout, { isLoading: isLogoutLoading, isSuccess }] =
    useLogoutMutation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // State to control dialog visibility

  const handleLogout = async () => {
    await logout();
    if (isSuccess || !isLogoutLoading) {
      window.location.reload();
      navigate("/auth/login");
    }
  };

  const handleClickOpen = () => {
    setOpen(true); // Open the confirmation dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the confirmation dialog
  };

  const handleNavigateSetting = () => {
    navigate("/setting");
  };
  const getActiveStyle = (route, pathname) => {
    // Special case for the dashboard route "/"
    if (route === "/") {
      return pathname === "/";
    }
    // Highlight routes that match the start of the pathname
    return pathname.startsWith(route);
  };

  const drawerContent = (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "0.5px dashed ",
          borderColor: "grey.400",
          px: "20px",
          py: 5,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Stack
        direction="column"
        sx={{
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <List>
          <Link component={RouterLink} to="/">
            <Box
              component="img"
              sx={{
                ml: 2,
                height: 48,
                width: 38,
              }}
              alt="logo"
              src={logoIcon}
            />
          </Link>
          <Toolbar />
          {sideBarList.map(
            ({ title, Icon, route }) =>
              Icon && (
                <Link
                  component={RouterLink}
                  to={route}
                  key={title}
                  underline="none"
                  sx={{
                    "& .MuiListItem-root": {
                      backgroundColor: getActiveStyle(route, pathname)
                        ? "purple.main"
                        : "common.white",

                      borderRadius: 1,
                    },
                    "& .MuiTypography-root": {
                      color: getActiveStyle(route, pathname)
                        ? "common.white"
                        : "dark.300",
                    },
                  }}
                >
                  <ListItem key={title} disablePadding>
                    <ListItemButton>
                      <Icon
                        sx={{
                          color: getActiveStyle(route, pathname)
                            ? "common.white"
                            : "dark.300",
                          mr: "20px",
                        }}
                      />
                      <Typography variant="bmdr" sx={{ color: "dark.300" }}>
                        {title}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                </Link>
              )
          )}
        </List>
      </Stack>

      <Box>
        {/* Button that triggers the confirmation dialog */}
        <ListItemButton onClick={handleClickOpen}>
          <LogoutOutlinedIcon sx={{ color: "dark.300", mr: "20px" }} />
          <Typography variant="bmdr" sx={{ color: "dark.300" }}>
            Logout
          </Typography>
        </ListItemButton>

        {/* Confirmation dialog for logout */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            fullWidth
            sx={{
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={logoutIcon}
              height={100}
              width={100}
              m={5}
            />
            <DialogContentText
              id="alert-dialog-title"
              color="dark.500"
              variant="bmdsm"
              px={4}
            >
              Are you sure you want to logout?
            </DialogContentText>
          </DialogContent>

          <DialogActions
            fullWidth
            sx={{ justifyContent: "center", gap: "12px", pb: "16px" }}
          >
            <Button
              onClick={() => {
                handleLogout(); // Perform logout
                handleClose(); // Close dialog after confirming
              }}
              variant="contained"
              color="error"
              autoFocus
            >
              LOGOUT
            </Button>
            <Button onClick={handleClose} variant="contained" color="grey.500">
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Drawer>
  );

  const appBarContent = (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        backgroundColor: bgColor || "common.white",
        pt: 5,
        ml: `${drawerWidth}px`,
        color: "common.black",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            maxWidth: 1300,
            borderBottom: 1,
            borderBottomStyle: "dashed",
            borderColor: "grey.300",
          }}
        >
          <Stack
            direction="row"
            sx={{
              width: "100%",
              pb: 2,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="column" spacing="2">
              <Typography variant="h3">{headerTitle && headerTitle}</Typography>
              <Typography variant="bsr" sx={{ color: "dark.300" }}>
                {description}
              </Typography>
            </Stack>
            <Button
              onClick={handleNavigateSetting}
              sx={(theme) => ({
                minWidth: "auto",
                p: 0.5,
                bgcolor: "common.white",
                width: "hug-content",
                borderRadius: "100%",
                border: "2px solid transparent",
                background: `linear-gradient(${theme.palette.common.white}, ${theme.palette.common.white}) padding-box, 
                 linear-gradient(to right, ${theme.palette.teal.main}, ${theme.palette.blue.main}) border-box`,
                backgroundClip: "padding-box, border-box",
              })}
            >
              <Avatar src={profileImage} sx={{ width: 35, height: 35 }} />
            </Button>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );

  const childContent = (
    <Container
      maxWidth="1300px"
      sx={{
        mt: 20,
        maxWidth: "1300px",
      }}
    >
      {children}
    </Container>
  );

  if (isApprovalLoading) {
    return (
      <Box
        height="100vh"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const sideBarContent = (
    <Box
      sx={{ display: "flex", backgroundColor: bgColor || "common.white" }}
      minHeight={"100vh"}
    >
      {appBarContent}
      {drawerContent}
      {childContent}
    </Box>
  );

  return sideBarContent;
}
