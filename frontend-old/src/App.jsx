import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import { route } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ThemeProvider>
        {/* Toastify Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <RouterProvider router={route} />
      </ThemeProvider>
    </>
  );
}
