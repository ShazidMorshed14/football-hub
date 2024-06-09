import React from "react";
import ReactDOM from "react-dom/client";
import App from "./apps/App.jsx";

import { createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <App />
  </React.StrictMode>
);
