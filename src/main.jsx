import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import MovieDetail from "./components/MovieDetail.jsx";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { SupabaseProvider } from "./supabase";

createRoot(document.getElementById('root')).render(
  <SupabaseProvider>
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />} >
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<MovieDetail />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
      </Route>
    </Routes>
  </BrowserRouter>
  </SupabaseProvider>
);
