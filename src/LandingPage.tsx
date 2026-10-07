import { useEffect, useState } from "react";
import CyberScene from "./CyberScene";

type Props = {
  onEnter: () => void;
};

function CyberCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let tx = -100, ty = -100, cx = -100, cy = -100, frame = 0;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setVisible(true);

      const el = e.target as HTMLElement;
      setHovering(!!el?.closest("button,a"));
    };

    const leave = () => setVisible(false);

    const click = () => {
      setClicking(true);
      setTimeout(() => setClicking(false), 420);
    };

    const animate = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      setPosition({ x: cx, y: cy });
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", click);

    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", click);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={`cyber-cursor ${visible ? "is-visible" : ""} ${hovering ? "is-hovering" : ""} ${clicking ? "is-clicking" : ""}`}
      style={{
        left: position.x,
        top: position.y,
      } as React.CSSProperties}
    >
      <div className="cursor-core"><span /></div>
      <div className="cursor-ring cursor-ring-outer" />
      <div className="cursor-ring cursor-ring-inner" />
      <div className="cursor-node node-1">+</div>
      <div className="cursor-node node-2">◇</div>
      <div className="cursor-node node-3">·</div>
      <div className="cursor-crosshair horizontal" />
      <div className="cursor-crosshair vertical" />
      <div className="cursor-scan">SCAN</div>
    </div>
  );
}

export default function LandingPage({ onEnter }: Props) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <main className="landing">
      <CyberCursor />

      <div className="scene">
        <CyberScene />
      </div>

      <div className="noise" />

      <header className="landing-nav">
        <a href="#" className="logo logo-link">
          <div className="logo-mark">C</div>
          <div>
            <strong>CYBERGUARD</strong>
            <span>SOC COMMAND CENTER</span>
          </div>
        </a>

        <nav>
          <a href="#platform">Platform</a>
          <a href="#intelligence">Intelligence</a>
          <a href="#security">Security</a>
        </nav>

        <button className="nav-button" onClick={onEnter}>
          ENTER SOC
          <span>↗</span>
        </button>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="pulse" />
            AUTONOMOUS SECURITY OPERATIONS
          </div>

          <h1>
            DEFEND
            <br />
            YOUR DIGITAL
            <br />
            <em>FRONTIER.</em>
          </h1>

          <p>
            A next-generation security operations center that
            detects threats, understands attacks and responds
            before they become incidents.
          </p>

          <div className="hero-actions">
            <button className="primary-button" onClick={onEnter}>
              <span>OPEN COMMAND CENTER</span>
              <b>→</b>
            </button>

            <a className="ghost-button" href="#platform">
              EXPLORE PLATFORM
            </a>
          </div>
        </div>

        <div
          className="floating-status"
          style={{
            transform: `translate3d(${mouse.x * 12}px, ${mouse.y * 8}px, 0)`,
          }}
        >
          <div className="status-top">
            <span>LIVE NETWORK</span>
            <i />
          </div>

          <strong>99.97%</strong>
          <small>THREAT VISIBILITY</small>

          <div className="mini-bars">
            {[45, 70, 52, 86, 63, 94, 77, 88].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </section>

      <div className="bottom-meta">
        <div>
          <span>01</span>
          THREAT DETECTION
        </div>

        <div>
          <span>02</span>
          AI INTELLIGENCE
        </div>

        <div>
          <span>03</span>
          INCIDENT RESPONSE
        </div>

        <a className="scroll-hint" href="#platform">
          SCROLL TO EXPLORE
          <b>↓</b>
        </a>
      </div>

      <section id="platform" className="cyber-info-section">
        <div className="section-content">
          <div className="section-copy">
            <span className="section-number">01 / PLATFORM</span>

            <h2>
              ONE PLATFORM.
              <br />
              TOTAL VISIBILITY.
            </h2>

            <p>
              CyberGuard brings security monitoring, threat detection,
              incident response and intelligence into one unified
              security operations environment.
            </p>

            <div className="feature-list">
              <div>
                <span>01</span>
                <strong>Unified Security Operations</strong>
              </div>
              <div>
                <span>02</span>
                <strong>Real-Time Threat Monitoring</strong>
              </div>
              <div>
                <span>03</span>
                <strong>Centralized Command Center</strong>
              </div>
            </div>
          </div>

          <div className="section-visual">
            <div className="platform-orbit">
              <div className="platform-ring ring-a" />
              <div className="platform-ring ring-b" />
              <div className="platform-ring ring-c" />

              <div className="platform-core">
                <span>CG</span>
                <small>CORE</small>
              </div>

              <i className="platform-node pn-a" />
              <i className="platform-node pn-b" />
              <i className="platform-node pn-c" />
              <i className="platform-node pn-d" />
            </div>

            <span className="visual-caption">
              PLATFORM CORE / ACTIVE
            </span>
          </div>
        </div>
      </section>

      <section id="intelligence" className="cyber-info-section intelligence-section">
        <div className="section-content reverse">
          <div className="section-visual">
            <div className="intelligence-console">
              <div className="console-header">
                <span>THREAT INTELLIGENCE</span>
                <b>● LIVE</b>
              </div>

              <div className="intel-grid">
                <div className="intel-line" />
                <div className="intel-line line-2" />
                <div className="intel-line line-3" />

                <div className="intel-node node-a" />
                <div className="intel-node node-b" />
                <div className="intel-node node-c" />
                <div className="intel-node node-d" />

                <div className="intel-connection connection-a" />
                <div className="intel-connection connection-b" />
                <div className="intel-connection connection-c" />
              </div>

              <div className="intel-bottom">
                <strong>8.4K</strong>
                <span>GLOBAL IOCs TRACKED</span>
              </div>
            </div>
          </div>

          <div className="section-copy">
            <span className="section-number">02 / INTELLIGENCE</span>

            <h2>
              SEE THE THREAT
              <br />
              BEFORE IT MOVES.
            </h2>

            <p>
              Turn raw security signals into actionable intelligence.
              CyberGuard connects indicators, attack patterns and
              behavioural signals to help security teams understand
              what is happening.
            </p>

            <div className="intel-tags">
              <span>IOC CORRELATION</span>
              <span>THREAT ANALYSIS</span>
              <span>ATTACK PATTERNS</span>
              <span>AI REASONING</span>
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="cyber-info-section security-section">
        <div className="section-content">
          <div className="section-copy">
            <span className="section-number">03 / SECURITY</span>

            <h2>
              DETECT.
              <br />
              RESPOND.
              <br />
              CONTAIN.
            </h2>

            <p>
              From phishing and impersonation to suspicious behaviour
              and active incidents, CyberGuard gives security teams
              the tools to detect and respond faster.
            </p>

            <div className="security-stats">
              <div>
                <strong>411</strong>
                <span>THREATS DETECTED</span>
              </div>

              <div>
                <strong>27</strong>
                <span>ACTIVE ALERTS</span>
              </div>

              <div>
                <strong>143</strong>
                <span>CONTAINED TODAY</span>
              </div>

              <div>
                <strong>99.97%</strong>
                <span>VISIBILITY</span>
              </div>
            </div>
          </div>

          <div className="section-visual">
            <div className="security-radar">
              <div className="radar-sweep" />
              <div className="radar-circle radar-one" />
              <div className="radar-circle radar-two" />
              <div className="radar-circle radar-three" />

              <i className="radar-target target-one" />
              <i className="radar-target target-two" />
              <i className="radar-target target-three" />

              <div className="radar-center">
                <span>SECURE</span>
                <small>SYSTEM ACTIVE</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cyber-end-section">
        <span className="section-number">CYBERGUARD SOC</span>

        <h2>
          READY TO TAKE
          <br />
          CONTROL?
        </h2>

        <p>
          Enter the command center and begin monitoring your
          digital frontier.
        </p>

        <button className="section-enter-button" onClick={onEnter}>
          ENTER COMMAND CENTER
          <span>↗</span>
        </button>
      </section>
    </main>
  );
}
