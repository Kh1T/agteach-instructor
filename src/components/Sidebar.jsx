import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, Link as RouterLink } from "react-router-dom";

import logoIcon from "../assets/logo.svg";
import dashboardIcon from "../assets/dashboard-sidebar-icon.svg";
import courseIcon from "../assets/course-sidebar-icon.svg";
import productIcon from "../assets/product-sidebar-icon.svg";
import purchasedIcon from "../assets/purchased-sidebar-icon.svg";
import enrollmentIcon from "../assets/enrollment-sidebar-icon.svg";
import balanceIcon from "../assets/balance-sidebar-icon.svg";
import settingIcon from "../assets/setting-sidebar-icon.svg";
import avtarChip from "../assets/avatar-chip.png";
import logoutIcon from "../assets/logout-sidebar-icon.svg";
import { Avatar, Chip, Link, Stack } from "@mui/material";

export default function Sidebar({ children }) {
  const sidebarList = [
    {
      title: "Dashboard",
      icon: dashboardIcon,
      route: "/",
      description: "Overview intructor dashboard",
    },
    {
      title: "Course",
      icon: courseIcon,
      route: "/course",
      description: "View or List more courses",
    },
    {
      title: "Product",
      icon: productIcon,
      route: "/product",
      description: "View or List more products",
    },
    {
      title: "Purchased",
      icon: purchasedIcon,
      route: "/purchased",
      description: "View purchased history",
    },
    {
      title: "Enrollment",
      icon: enrollmentIcon,
      route: "/enrollment",
      description: "View enrolled history",
    },
    {
      title: "Balance",
      icon: balanceIcon,
      route: "/balance",
      description: "View your buisness progress",
    },
    {
      title: "Setting",
      icon: settingIcon,
      route: "/setting",
      description: "Make change to your profile",
    },
  ];
  const { pathname } = useLocation();
  const drawerWidth = 250;
  const sideBarContent = (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          // pl: 15,
          pt: 5,
          ml: `${drawerWidth}px`,
          backgroundColor: "common.white",
          color: "common.black",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            px: 0,
            "@media (min-width: 0px)": { paddingRight: 0, paddingLeft: 0 },
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
              // borderStyle: "dashed",
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
                <Typography variant="h3">
                  {
                    sidebarList.find((element) => element.route === pathname)
                      .title
                  }
                </Typography>
                <Typography variant="bsr" sx={{ color: "dark.300" }}>
                  {
                    sidebarList.find((element) => element.route === pathname)
                      .description
                  }
                </Typography>
              </Stack>
              <Chip
                avatar={<Avatar src={avtarChip} label="Avatar" />}
                label="Jack Ma"
                sx={{
                  height: "40px",
                  borderRadius: "63px",
                  // mb: "30px",
                  backgroundColor: "common.black",
                  "& .MuiChip-label": {
                    color: "common.white",
                    fontSize: 18,
                  },
                }}
              />
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
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
            <Toolbar />
            {sidebarList.map(({ title, icon, route }, index) => (
              <Link
                component={RouterLink}
                to={route}
                key={title}
                underline="none"
                sx={{
                  "& .MuiListItem-root": {
                    backgroundColor:
                      route === pathname ? "purple.main" : "common.white",
                    borderRadius: 1,
                  },
                  "& .MuiTypography-root": {
                    color: route === pathname ? "common.white" : "dark.300",
                  },
                }}
              >
                <ListItem
                  key={title}
                  // sx={{display:"flex", flexDirection:"column", }}
                  disablePadding
                  // selected={route === pathname}
                >
                  <ListItemButton>
                    <Box
                      component="img"
                      sx={{
                        height: 25,
                        width: 25,
                        pr: "15px",
                      }}
                      alt={title}
                      src={icon}
                    />
                    {/* <img src={icon} /> */}
                    {/* <ListItemText primary={title} sx={{ color: "dark.300" }} /> */}
                    <Typography variant="bmdr" sx={{ color: "dark.300" }}>
                      {title}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Stack>

        <Box>
          <ListItemButton>
            <Box
              component="img"
              src={logoutIcon}
              sx={{
                height: 25,
                width: 25,
                pr: "15px",
              }}
            />
            <Typography variant="bmdr" sx={{ color: "dark.300" }}>
              Logout
            </Typography>
          </ListItemButton>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "center",
          // flexGrow: 1,
          width: "100%",
          justifyContent: "center",
          mt: 20,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1300,
            display: "flex",
            flexDirection: "row",

            justifyContent: "center",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
  return sideBarContent;
}
