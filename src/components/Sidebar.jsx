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
import { useLocation } from "react-router-dom";

import logoIcon from "../assets/logo.svg";
import dashboardIcon from "../assets/dashboard-sidebar-icon.svg";
import courseIcon from "../assets/course-sidebar-icon.svg";
import productIcon from "../assets/product-sidebar-icon.svg";
import purchasedIcon from "../assets/purchased-sidebar-icon.svg";
import enrollmentIcon from "../assets/enrollment-sidebar-icon.svg";
import balanceIcon from "../assets/balance-sidebar-icon.svg";
import settingIcon from "../assets/setting-sidebar-icon.svg";

export default function Sidebar() {
  const sidebarList = [
    { title: "Dashboard", icon: dashboardIcon, route: "/" },
    { title: "Course", icon: courseIcon, route: "/course" },
    { title: "Product", icon: productIcon, route: "/product" },
    { title: "Purchased", icon: purchasedIcon, route: "/purchased" },
    { title: "Enrollment", icon: enrollmentIcon, route: "/enrollment" },
    { title: "Balance", icon: balanceIcon, route: "/balance" },
    { title: "Setting", icon: settingIcon, route: "/setting" },
  ];
  const { pathname } = useLocation();
  const drawerWidth = 240;
  const sideBarContent = (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
        
          component="img"
          sx={{
            mt: 5,
            ml: 2,
            height: 48,
            width: 38,
          }}
          alt="logo"
          src={logoIcon}
        />
        <Toolbar />
        <List>
          {sidebarList.map(({ title, icon, route }, index) => (
            <ListItem key={title} disablePadding selected={route === pathname}>
              <ListItemButton>
                <ListItemIcon>
                  <Box
                    component="img"
                    sx={{
                      height: 25,
                      width: 25,
                    }}
                    alt={title}
                    src={icon}
                  />
                  {/* <img src={icon} /> */}
                </ListItemIcon>
                <ListItemText primary={title} sx={{ color: "dark.300" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
  return sideBarContent;
}
