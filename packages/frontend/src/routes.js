import Team from "views/Team/Team.js";
import Profile from "views/Profile/Profile.js";
import Register from "views/Auth/Register.js";
import Login from "views/Auth/Login.js";
import Tasks from "views/Tasks/Tasks.js";

export const authRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];

export const adminRoutes = [
  {
    path: "/team",
    name: "Team",
    icon: "ni ni-user-run text-primary",
    component: Team,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tasks",
    name: "Tasks",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tasks,
    layout: "/admin",
  },
];
