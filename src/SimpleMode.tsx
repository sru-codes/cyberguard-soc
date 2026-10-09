import SimpleHelp from "./SimpleHelp";
import SimpleMediaCheck from "./SimpleMediaCheck";
import SimpleAlerts from "./SimpleAlerts";
import SimplePersonCheck from "./SimplePersonCheck";
import SimpleWebsiteCheck from "./SimpleWebsiteCheck";
import { useEffect, useState } from "react";
import SimpleEmailCheck from "./SimpleEmailCheck";
import AIDefense from "./AIDefense";

type Props = {
  onSwitchToExpert?: () => void;
};


function SimpleCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const target = event.target as HTMLElement | null;
      setHovering(!!target?.closest("button, a, input, [role='button']"));
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return (
    ) => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <div
      className={`simple-cursor ${hovering ? "is-hovering" : ""} ${clicking ? "is-clicking" : ""}`}
      style={{ left: position.x, top: position.y }}
    >
      <div className="simple-cursor-core"><span /></div>
      <div className="simple-cursor-ring simple-cursor-ring-outer" />
      <div className="simple-cursor-ring simple-cursor-ring-inner" />
      <div className="simple-cursor-cross horizontal" />
      <div className="simple-cursor-cross vertical" />
      <div className="simple-cursor-node simple-node-1">+</div>
      <div className="simple-cursor-node simple-node-2"></div>
    </div>
  );
}
export default function SimpleMode({ onSwitchToExpert }: Props) {
  const [helpOpen, setHelpOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [activePage, setActivePage] = useState<"home" | "ai-defense">("home");
  return (
    <>
      <SimpleCursor />        <SimpleEmailCheck />        <SimpleWebsiteCheck />
        <SimplePersonCheck />
        <SimpleMediaCheck />
      <SimpleAlerts open={alertsOpen} onClose={() => setAlertsOpen(false)} />
      <SimpleHelp open={helpOpen} onClose={() => setHelpOpen(false)} />
    <main className="simple-mode">

      {/* SIDEBAR */}
      <aside className="simple-sidebar">

        <div className="simple-brand">
          <div className="simple-brand-mark">C</div>

          <div>
            <strong>CYBERGUARD</strong>
            <span>SECURITY INTELLIGENCE</span>
          </div>
        </div>

        <nav className="simple-nav">

          <button
            type="button"
            className={`simple-nav-item ${activePage === "home" ? "active" : ""}`}
            onClick={() => setActivePage("home")}
          >
            <span></span>
            <strong>Home</strong>
          </button>

          <button className="simple-nav-item">
            <span></span>
            <strong>Check Email</strong>
          </button>

          <button className="simple-nav-item">
            <span></span>
            <strong>Check Website</strong>
          </button>

          <button className="simple-nav-item">
            <span></span>
            <strong>Check Person</strong>
          </button>

          <button className="simple-nav-item">
            <span></span>
            <strong>Check Media</strong>
          </button>

          <button
            type="button"
            className="simple-nav-item"
            onClick={() => setAlertsOpen(true)}
          >
            <span>!</span>
            <strong>Alerts</strong>
          </button>

          <button
            type="button"
            className="simple-nav-item"
            onClick={() => setHelpOpen(true)}
          >
            <span>?</span>
            <strong>Help</strong>
          </button>

          <button
            type="button"
            className={`simple-nav-item ${activePage === "ai-defense" ? "active" : ""}`}
            onClick={() => setActivePage("ai-defense")}
          >
            <span>AI</span>
            <strong>AI Defense</strong>
          </button>

        </nav>

        <div className="simple-sidebar-footer">
          <span className="simple-status-dot" />
          <div>
            <strong>PROTECTION ACTIVE</strong>
            <span>CYBERGUARD IS MONITORING</span>
          </div>
        </div>

      </aside>


      {/* MAIN */}
      <section className="simple-main">

        {/* TOP BAR */}
        <header className="simple-topbar">

          <div>
            <span>CYBERGUARD</span>
            <strong>SIMPLE MODE</strong>
          </div>

          <div className="simple-mode-switch">

            <button className="simple-mode-active">
              SIMPLE MODE
            </button>

            <button onClick={onSwitchToExpert}>
              EXPERT MODE
            </button>

          </div>

          <div className="simple-system-status">
            <i />
            SYSTEM PROTECTED
          </div>

        </header>

        <nav className="simple-mobile-nav" aria-label="Simple Mode pages">
          <button
            type="button"
            className={activePage === "home" ? "active" : ""}
            aria-current={activePage === "home" ? "page" : undefined}
            onClick={() => setActivePage("home")}
          >
            Home
          </button>
          <button
            type="button"
            className={activePage === "ai-defense" ? "active" : ""}
            aria-current={activePage === "ai-defense" ? "page" : undefined}
            onClick={() => setActivePage("ai-defense")}
          >
            Ask CyberGuard
          </button>
        </nav>

        {/* CONTENT */}
        <div className="simple-content" hidden={activePage === "ai-defense"}>

          <div className="simple-page-eyebrow">
            SECURITY CHECK / LIVE
          </div>

          <h1>
            YOUR SECURITY
            <br />
            <em>IS PROTECTED.</em>
          </h1>

          <p className="simple-intro">
            CyberGuard is watching for suspicious activity and
            helping keep your digital environment safe.
          </p>


          {/* STATUS CARD */}
          <section className="simple-security-status">

            <div className="simple-status-icon">OK</div>

            <div>
              <span>SECURITY STATUS</span>
              <h2>Everything looks good.</h2>
              <p>
                No serious security problems need your attention right now.
              </p>
            </div>

            <div className="simple-status-badge">
              PROTECTED
            </div>

          </section>


          {/* PLACEHOLDER GRID */}
          <section className="simple-section-heading">
            <span>YOUR SECURITY</span>
            <h2>WHAT CAN YOU DO?</h2>
          </section>

          <div className="simple-placeholder-grid">

            <div className="simple-placeholder-card">
              <span>01</span>
              <strong>Check something suspicious</strong>
              <p>
                Check an email, website, person or media file.
              </p>
            </div>

            <div className="simple-placeholder-card">
              <span>02</span>
              <strong>Review your alerts</strong>
              <p>
                See anything that may need your attention.
              </p>
            </div>

            <div className="simple-placeholder-card">
              <span>03</span>
              <strong>Need help?</strong>
              <p>
                Get a simple explanation of a security warning.
              </p>
            </div>

          </div>

        </div>

        <div hidden={activePage !== "ai-defense"}>
          <AIDefense mode="simple" />
        </div>

      </section>

    </main>
  </>
  );
}
