import { useState } from "react";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import CommandCenter from "./CommandCenter";
import "./index.css";

type Screen = "landing" | "login" | "command";

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");

  if (screen === "landing") {
    return <LandingPage onEnter={() => setScreen("login")} />;
  }

  if (screen === "login") {
    return <LoginPage onLogin={() => setScreen("command")} />;
  }

  return <CommandCenter onLogout={() => setScreen("landing")} />;
}
