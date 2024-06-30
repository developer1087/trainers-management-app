import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TraineesProvider } from "./context/TraineesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <TraineesProvider>
        <App />
      </TraineesProvider>
    </AuthProvider>
  </React.StrictMode>
);