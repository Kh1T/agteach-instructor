import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HdrAutoOutlinedIcon from "@mui/icons-material/HdrAutoOutlined";

export const SIDEBARROUTE = [
  {
    title: "Dashboard",
    Icon: DashboardCustomizeOutlinedIcon,
    route: "/",
    description: "Overview instructor dashboard",
  },
  {
    title: "Course",
    Icon: HdrAutoOutlinedIcon,
    route: "/course",
    description: "View or List more courses",
  },
  {
    title: "Product",
    Icon: FilterNoneOutlinedIcon,
    route: "/product",
    description: "View or List more products",
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
];
 