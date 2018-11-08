import TestPage from "../views/Test/Test.jsx";
import Dashboard from "../views/Dashboard/Dashboard.jsx";

const privateRoutes = [
  {
    path: "/dashboard",
    component: Dashboard
  },
  {
    path: "/test",
    component: TestPage
  },
  { redirect: true, path: "/", to: "/login"}
];

export default privateRoutes;
