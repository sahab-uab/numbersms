import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import HomeLayout from "../Layout/HomeLayout";
import ServicesPage from "../pages/ServicesPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import PrivateRoute from "../utils/PrivateRoute";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import UserLayout from "../Layout/UserLayout";
import UserDashboardPage from "../pages/UserPages/UserDashboardPage";
import UserCreditCardPage from "../pages/UserPages/UserCreditCardPage";
import UserVerifactionPage from "../pages/UserPages/UserVerifactionPage";
import UserSettingsPage from "../pages/UserPages/UserSettingsPage";
import AdminLayout from "../Layout/AdminLayout";
import AdminDashboardPage from "../pages/AdminPages/AdminDashboardPage";
import AdminAddCaditToUserPage from "../pages/AdminPages/AdminAddCaditToUserPage";
import AdminAllTransationPage from "../pages/AdminPages/AdminAllTransationPage";
import AdminSettingsPage from "../pages/AdminPages/AdminSettingsPage";
import AdminUserMennage from "../pages/AdminPages/AdminUserMennage";
import AdminMessageUsages from "../pages/AdminPages/AdminMessageUsages";
import UserSmsHistoryPage from "../pages/UserPages/UserSmsHistoryPage";
import AdminServiceImage from "../pages/AdminPages/AdminServiceImage";
import AdminAccountSettingsPage from "../pages/AdminPages/AdminAccountSettingsPage";
import AdminServicePage from "../pages/AdminPages/AdminServicePage";
import AdminDiscountPage from "../pages/AdminPages/AdminDiscountPage";
import UserShareCredirtPage from "../pages/UserPages/UserShareCredirtPage";
import FAQ from "../pages/FAQ";
import Terms from "../pages/Terms";

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
            <ServicesPage />
          </Suspense>
        ),
      },
      {
        path: "/faq",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FAQ />
          </Suspense>
        ),
      },
      {
        path: "/terms-and-conditions",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Terms />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <PrivateRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <RegistrationPage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PrivateRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <LoginPage />
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
            <UserDashboardPage />
          </Suspense>
        ),
      },
      {
        path: "/user/credit",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserCreditCardPage />
          </Suspense>
        ),
      },
      {
        path: "/user/verification",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserVerifactionPage />
          </Suspense>
        ),
      },
      {
        path: "/user/settings",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserSettingsPage />
          </Suspense>
        ),
      },
      {
        path: "/user/sms-history",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserSmsHistoryPage />
          </Suspense>
        ),
      },
      {
        path: "/user/share-credit",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserShareCredirtPage />
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
            <AdminDashboardPage />
          </Suspense>
        ),
      },
      {
        path: "/admin/user/add/cadit",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminAddCaditToUserPage />
          </Suspense>
        ),
      },
      {
        path: "/admin/transations",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminAllTransationPage />
          </Suspense>
        ),
      },
      {
        path: "/admin/service-image",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminServiceImage />
          </Suspense>
        ),
      },
      {
        path: "/admin/settings",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminSettingsPage />
          </Suspense>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUserMennage />
          </Suspense>
        ),
      },
      {
        path: "/admin/smsusages",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminMessageUsages />
          </Suspense>
        ),
      },
      {
        path: "/admin/allservice",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminServicePage />
          </Suspense>
        ),
      },
      {
        path: "/admin/accout/settings",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminAccountSettingsPage />
          </Suspense>
        ),
      },
      {
        path: "/admin/add-discount",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminDiscountPage />
          </Suspense>
        ),
      },
    ],
  },
]);
