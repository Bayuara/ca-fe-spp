import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./presentation/components/context/AuthProvider.tsx";
import { LayoutProvider } from "./presentation/components/context/LayoutProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <LayoutProvider>
        <App />
      </LayoutProvider>
    </AuthProvider>
  </React.StrictMode>,
);
