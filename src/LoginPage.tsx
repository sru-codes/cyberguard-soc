import { useEffect, useState } from "react";
import CyberScene from "./CyberScene";

function LoginCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const target = event.target as HTMLElement | null;
      setHovering(
        !!target?.closest("button, a, input, label")
      );
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <div
      className={`login-cursor ${hovering ? "hovering" : ""} ${
        clicking ? "clicking" : ""
      }`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <span className="cursor-ring" />
      <span className="cursor-dot" />
      <span className="cursor-cross horizontal" />
      <span className="cursor-cross vertical" />
      {clicking && <span className="cursor-pulse" />}
    </div>
  );
}

type Props = {
  onLogin: () => void;
};

export default function LoginPage({ onLogin }: Props) {
  const [operator, setOperator] = useState("");
  const [password, setPassword] = useState("");
  const [authenticating, setAuthenticating] = useState(false);

  const handleLogin = () => {
    if (!operator || !password) return;

    setAuthenticating(true);

    setTimeout(() => {
      onLogin();
    }, 900);
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleLogin();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  });

  return (
    <main className="login-page">
      <LoginCursor />

      <div className="login-scene">
        <CyberScene />
      </div>

      <div className="login-overlay" />

      <header className="login-topbar">
        <a href="#" className="login-brand">
          <span className="login-brand-mark">C</span>
          <span>
            <strong>CYBERGUARD</strong>
            <small>SECURITY INTELLIGENCE</small>
          </span>
        </a>

        <div className="login-status">
          <i />
          SECURE CHANNEL
          <span>●</span>
          ENCRYPTED
        </div>
      </header>

      <section className="login-content">
        <div className="login-intro">
          <span className="login-kicker">
            AUTHENTICATION GATEWAY / 01
          </span>

          <h1>
            SECURE YOUR
            <br />
            <em>DIGITAL FRONTIER.</em>
          </h1>

          <p>
            Authenticate to enter the CyberGuard security
            environment and access your command systems.
          </p>

          <div className="login-system-info">
            <div>
              <span>NETWORK</span>
              <strong>PROTECTED</strong>
            </div>

            <div>
              <span>THREAT ENGINE</span>
              <strong>ACTIVE</strong>
            </div>

            <div>
              <span>SECURITY LEVEL</span>
              <strong>MAXIMUM</strong>
            </div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-card-top">
            <div>
              <span className="login-card-label">
                CYBERGUARD ACCESS
              </span>

              <h2>Welcome back.</h2>
            </div>

            <div className="access-icon">
              <span />
            </div>
          </div>

          <p className="login-card-subtitle">
            Enter your operator credentials to continue.
          </p>

          <div className="login-field">
            <label>OPERATOR ID / EMAIL</label>

            <div className="input-wrap">
              <span className="input-symbol">@</span>

              <input
                type="text"
                placeholder="operator@cyberguard.ai"
                value={operator}
                onChange={(event) =>
                  setOperator(event.target.value)
                }
              />

              <span className="input-state">ID</span>
            </div>
          </div>

          <div className="login-field">
            <label>ACCESS KEY</label>

            <div className="input-wrap">
              <span className="input-symbol">◆</span>

              <input
                type="password"
                placeholder="Enter secure access key"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />

              <span className="input-state">•••</span>
            </div>
          </div>

          <div className="login-options">
            <label className="remember">
              <input type="checkbox" />
              <span>Remember this device</span>
            </label>

            <button type="button" className="recovery">
              RECOVER ACCESS
            </button>
          </div>

          <button
            className={`authenticate-button ${
              authenticating ? "authenticating" : ""
            }`}
            onClick={handleLogin}
            disabled={authenticating}
          >
            <span>
              {authenticating
                ? "VERIFYING IDENTITY..."
                : "AUTHENTICATE"}
            </span>

            <b>{authenticating ? "◌" : "↗"}</b>
          </button>

          <div className="login-divider">
            <span />
            <small>SECURE CONNECTION</small>
            <span />
          </div>

          <div className="login-footer-status">
            <i />
            <span>SYSTEM STATUS</span>
            <strong>OPERATIONAL</strong>
            <b>v2.4.1</b>
          </div>
        </div>
      </section>

      <footer className="login-bottom">
        <span>CYBERGUARD INTELLIGENCE SYSTEMS</span>
        <span>ALL CONNECTIONS MONITORED</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
