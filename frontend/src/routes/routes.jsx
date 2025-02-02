import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import { Suspense, lazy } from "react";
import UserLayout from "../Layout/UserLayout";
import UserDashboard from "../pages/user/UserDashboard";
import UserCreditCard from "../pages/user/UserCreditCard";
import UserVerifaction from "../pages/user/UserVerifaction";
import UserSettings from "../pages/user/UserSettings";
import AdminLayout from "../Layout/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminUser from "../pages/Admin/AdminUser";
import AdminSettings from "../pages/Admin/AdminSettings";
import AdminAddCaditToUser from "../pages/Admin/AdminAddCaditToUser";
import AdminAllTransation from "../pages/Admin/AdminAllTransation";
import PrivateRoute from "../utils/PrivateRoute";
import AdminAllUser from "../pages/Admin/AdminAllUser";

const HomePage = lazy(() => import("../pages/HomePage"));
const Services = lazy(() => import("../pages/Services"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Registration = lazy(() => import("../pages/Registion"));
const Login = lazy(() => import("../pages/Login"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const Price = lazy(() => import("../pages/Price"));

export const route = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/services",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/price",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Price />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <PrivateRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Registration />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PrivateRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "/user/dashboard",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserDashboard />
          </Suspense>
        ),
      },
      {
        path: "/user/credit",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserCreditCard />
          </Suspense>
        ),
      },
      {
        path: "/user/verification",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserVerifaction />
          </Suspense>
        ),
      },
      {
        path: "/user/settings",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserSettings />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "/admin/user/add/cadit",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminAddCaditToUser />
          </Suspense>
        ),
      },
      {
        path: "/admin/transations",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminAllTransation />
          </Suspense>
        ),
      },
      {
        path: "/admin/user",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUser />
          </Suspense>
        ),
      },
      {
        path: "/admin/settings",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminSettings />
          </Suspense>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminAllUser />
          </Suspense>
        ),
      },
    ],
  },
]);
