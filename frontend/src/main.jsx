import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { ThemeProvider } from "./Context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
