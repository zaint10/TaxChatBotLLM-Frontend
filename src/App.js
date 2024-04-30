import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import ChatPage from "./pages/Chat";
import AllChatsPage from './pages/AllChatsPage';
import Layout from "./pages/Layout";
import withSplashScreen from "./with/withSplashScreen";


function withLayout(children) {
  return <Layout>{children}</Layout>;
}

function App() {
  return (
    <div>
      <Routes>
        <Route element={<AuthOutlet fallbackPath="/login" />}>
          <Route path="/" element={withLayout(<HomePage />)} />
          <Route path="/chats" element={withLayout(<AllChatsPage />)} />
          <Route path="/chat/:w2formId" element={withLayout(<ChatPage />)} />
        </Route>

        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default withSplashScreen(App);
