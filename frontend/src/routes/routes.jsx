import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import { Suspense, lazy } from "react";
import Price from "../pages/Price";

// Lazy imports for the pages
const HomePage = lazy(() => import("../pages/HomePage"));
const Services = lazy(() => import("../pages/Services"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Registration = lazy(() => import("../pages/Registion"));
const Login = lazy(() => import("../pages/Login"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

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
        path: "/register",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Registration />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
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
]);
