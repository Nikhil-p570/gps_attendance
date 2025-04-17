import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/Router"; // Ensure correct path

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter> {/* ✅ Only one BrowserRouter here */}
    <AppRouter />
  </BrowserRouter>
);
  