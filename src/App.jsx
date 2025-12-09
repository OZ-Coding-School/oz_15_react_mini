import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PageHome from "./pages/PageHome";
import PageDetail from "./pages/PageDetail"; 
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import {AuthProvider} from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<PageHome />} />
          <Route path="details/:id" element={<PageDetail />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
