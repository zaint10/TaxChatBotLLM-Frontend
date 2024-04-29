import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";



function App() {
  return (
    <div>
      <Routes>
        <Route element={<AuthOutlet fallbackPath="/login" />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
