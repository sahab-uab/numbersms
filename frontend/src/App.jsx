import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { route } from "./routes/Routes";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;
