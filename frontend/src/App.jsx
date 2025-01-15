import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "./Context/ThemeContext";
import { route } from "./routes/routes";

export default function App() {
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={route} />
      </ThemeProvider>
    </>
  );
}
