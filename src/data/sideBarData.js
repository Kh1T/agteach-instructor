import dashboardIcon from "../assets/dashboard-sidebar-icon.svg";
import courseIcon from "../assets/course-sidebar-icon.svg";
import productIcon from "../assets/product-sidebar-icon.svg";
import purchasedIcon from "../assets/purchased-sidebar-icon.svg";
import enrollmentIcon from "../assets/enrollment-sidebar-icon.svg";
import balanceIcon from "../assets/balance-sidebar-icon.svg";
import settingIcon from "../assets/setting-sidebar-icon.svg";

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

  export default sidebarList;