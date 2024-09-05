import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HdrAutoOutlinedIcon from "@mui/icons-material/HdrAutoOutlined";

const sidebarList = [
  {
    title: "Dashboard",
    Icon: DashboardCustomizeOutlinedIcon,
    route: "/",
    description: "Overview intructor dashboard",
  },
  {
    title: "Course",
    Icon: HdrAutoOutlinedIcon,
    route: "/course",
    description: "View or List more courses",
  },
  {
    title: "Create Course",
    Icon: null,
    route: "/course/new",
    description: "Create new courses for your portfolio",
  },
  {
    title: "Edit Course",
    Icon: null,
    route: "/course/id/edit",
    description: "Edit courses for your portfolio",
  },
  {
    title: "Product",
    Icon: FilterNoneOutlinedIcon,
    route: "/product",
    description: "View or List more products",
  },
  {
    title: "Create Product",
    Icon: null,
    route: "/product/new",
    description: "Create new product for your porfolio",
  },
  {
    title: "Edit Product",
    Icon: null,
    route: "/product/abc/edit",
    description: "Edit product for your porfolio",
  },
  {
    title: "Purchased",
    Icon: CollectionsBookmarkOutlinedIcon,
    route: "/purchased",
    description: "View purchased history",
  },
  {
    title: "Enrollment",
    Icon: SchoolOutlinedIcon,
    route: "/enrollment",
    description: "View enrolled history",
  },
  {
    title: "Balance",
    Icon: PaidOutlinedIcon,
    route: "/balance",
    description: "View your buisness progress",
  },
  {
    title: "Setting",
    Icon: SettingsApplicationsOutlinedIcon,
    route: "/setting",
    description: "Make change to your profile",
  },

  {
    title: "Login",
    Icon: null,
    route: "/login",
    description: "Login to your account",
  },
];

export default sidebarList;
