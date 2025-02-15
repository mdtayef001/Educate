import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Page404 from "../pages/404/Page404";
import Scholarship from "../pages/Scholarship/Scholarship";
import ScholarshipDetails from "../pages/Scholarship/ScholarshipDetails";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import Payment from "../pages/payment/Payment";
import DashboardLayout from "../layout/DashboardLayout";
import Profile from "../pages/Dashboard/Common/Profile";
import MyApplication from "../pages/Dashboard/User/MyApplication";
import MyReviews from "../pages/Dashboard/User/MyReviews";
import AppliedScholarship from "../pages/Dashboard/Moderator/AppliedScholarship";
import AddScholarship from "../pages/Dashboard/Moderator/AddScholarship";
import ModeratorRoute from "./ModeratorRoute";
import AllReview from "../pages/Dashboard/Moderator/AllReview";
import MangeAllScholarship from "../pages/Dashboard/Admin/MangeAllScholarship";
import AdminRoute from "./AdminRoute";
import ManageUser from "../pages/Dashboard/Admin/ManageUser";
import AnalyticsChart from "../pages/Dashboard/Admin/AnalyticsChart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Page404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/scholarship",
        element: (
          <PrivateRoute>
            <Scholarship />
          </PrivateRoute>
        ),
      },
      {
        path: "/scholarship-details/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      // users routs
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-application",
        element: (
          <PrivateRoute>
            <MyApplication />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      // moderator and admin

      {
        path: "/dashboard/all-reviews",
        element: (
          <ModeratorRoute>
            <AllReview />
          </ModeratorRoute>
        ),
      },
      {
        path: "/dashboard/applied-scholarship",
        element: (
          <ModeratorRoute>
            <AppliedScholarship />
          </ModeratorRoute>
        ),
      },
      {
        path: "/dashboard/add-scholarship",
        element: (
          <ModeratorRoute>
            <AddScholarship />
          </ModeratorRoute>
        ),
      },
      {
        path: "/dashboard/manage-all-scholarships",
        element: (
          <ModeratorRoute>
            <MangeAllScholarship />
          </ModeratorRoute>
        ),
      },
      // admin
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/analytics-chart",
        element: (
          <AdminRoute>
            <AnalyticsChart />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
