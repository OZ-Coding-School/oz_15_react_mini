import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SupabaseProvider } from "./supabase/index.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  </BrowserRouter>
);
