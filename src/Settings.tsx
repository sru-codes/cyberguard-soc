import { useState } from "react";

export default function Settings() {
  const [aiDefense, setAiDefense] = useState(true);
  const [autoResponse, setAutoResponse] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [sensitivity, setSensitivity] = useState("HIGH");
  const [confidence, setConfidence] = useState(85);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [saved, setSaved] = useState(false);

  const saveConfiguration = () => {
    setSaved(false);

    window.setTimeout(() => {
      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 2500);
    }, 700);
  };

  return (
    <div className="settings-page">

      <section className="settings-hero">
        <div>
          <span className="settings-eyebrow">
            SYSTEM CONFIGURATION / LIVE
          </span>

          <h1>SECURITY SETTINGS</h1>

          <p>
            Configure CyberGuard detection, AI defense and security
            response preferences for the command environment.
          </p>
        </div>

        <div className="settings-status">
          <span />
          CONFIGURATION ENGINE ONLINE
        </div>
      </section>

      <div className="settings-layout">

        <section className="settings-panel">
          <div className="settings-panel-header">
            <div>
              <span>AI DEFENSE</span>
              <h2>AI DEFENSE ENGINE</h2>
            </div>

            <div className={aiDefense ? "settings-state active" : "settings-state"}>
              {aiDefense ? "ACTIVE" : "DISABLED"}
            </div>
          </div>

          <div className="settings-option">
            <div>
              <strong>Continuous AI Monitoring</strong>
              <span>
                Continuously analyse security events and correlate suspicious
                activity across the environment.
              </span>
            </div>

            <button
              className={`settings-toggle ${aiDefense ? "on" : ""}`}
              onClick={() => setAiDefense(!aiDefense)}
              aria-label="Toggle AI Defense"
            >
              <span />
            </button>
          </div>

          <div className="settings-option">
            <div>
              <strong>Autonomous Response</strong>
              <span>
                Allow the defense engine to recommend containment actions
                when high-risk activity is detected.
              </span>
            </div>

            <button
              className={`settings-toggle ${autoResponse ? "on" : ""}`}
              onClick={() => setAutoResponse(!autoResponse)}
              aria-label="Toggle Autonomous Response"
            >
              <span />
            </button>
          </div>
        </section>

        <section className="settings-panel">
          <div className="settings-panel-header">
            <div>
              <span>THREAT DETECTION</span>
              <h2>DETECTION POLICY</h2>
            </div>
          </div>

          <div className="settings-field">
            <label>DETECTION SENSITIVITY</label>

            <div className="settings-segmented">
              {["LOW", "MEDIUM", "HIGH"].map((level) => (
                <button
                  key={level}
                  className={sensitivity === level ? "active" : ""}
                  onClick={() => setSensitivity(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-field">
            <div className="settings-range-head">
              <label>AI CONFIDENCE THRESHOLD</label>
              <strong>{confidence}%</strong>
            </div>

            <input
              type="range"
              min="50"
              max="99"
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
            />

            <div className="settings-range-labels">
              <span>50% LOWER</span>
              <span>99% STRICT</span>
            </div>
          </div>
        </section>

        <section className="settings-panel">
          <div className="settings-panel-header">
            <div>
              <span>ALERT MANAGEMENT</span>
              <h2>NOTIFICATIONS</h2>
            </div>

            <div className={notifications ? "settings-state active" : "settings-state"}>
              {notifications ? "ENABLED" : "DISABLED"}
            </div>
          </div>

          <div className="settings-option">
            <div>
              <strong>Security Alerts</strong>
              <span>
                Receive notifications when critical or high-risk threats
                require operator attention.
              </span>
            </div>

            <button
              className={`settings-toggle ${notifications ? "on" : ""}`}
              onClick={() => setNotifications(!notifications)}
              aria-label="Toggle Notifications"
            >
              <span />
            </button>
          </div>

          <div className="settings-mini-grid">
            <div>
              <span>CRITICAL ALERTS</span>
              <strong>IMMEDIATE</strong>
            </div>

            <div>
              <span>HIGH RISK</span>
              <strong>IMMEDIATE</strong>
            </div>

            <div>
              <span>MEDIUM RISK</span>
              <strong>SUMMARY</strong>
            </div>
          </div>
        </section>

        <section className="settings-panel">
          <div className="settings-panel-header">
            <div>
              <span>ACCESS CONTROL</span>
              <h2>SESSION SECURITY</h2>
            </div>
          </div>

          <div className="settings-field">
            <label>SESSION TIMEOUT</label>

            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
            >
              <option value="15">15 MINUTES</option>
              <option value="30">30 MINUTES</option>
              <option value="60">60 MINUTES</option>
              <option value="120">120 MINUTES</option>
            </select>
          </div>

          <div className="settings-security-row">
            <div>
              <span>ACCESS MODE</span>
              <strong>OPERATOR AUTHENTICATION</strong>
            </div>

            <div>
              <span>SESSION STATUS</span>
              <strong className="green-text">SECURE</strong>
            </div>
          </div>
        </section>

      </div>

      <section className="settings-system-panel">
        <div>
          <span>SYSTEM HEALTH</span>
          <h2>CYBERGUARD DEFENSE STATUS</h2>
        </div>

        <div className="settings-health-grid">
          <div>
            <i />
            <span>AI DEFENSE ENGINE</span>
            <strong>{aiDefense ? "OPERATIONAL" : "DISABLED"}</strong>
          </div>

          <div>
            <i />
            <span>THREAT DETECTION</span>
            <strong>OPERATIONAL</strong>
          </div>

          <div>
            <i />
            <span>INCIDENT RESPONSE</span>
            <strong>OPERATIONAL</strong>
          </div>

          <div>
            <i />
            <span>TELEMETRY PIPELINE</span>
            <strong>MONITORING</strong>
          </div>
        </div>
      </section>

      <div className="settings-save-row">
        {saved && (
          <div className="settings-success">
            ✓ CONFIGURATION SAVED — SECURITY POLICIES UPDATED
          </div>
        )}

        <button className="settings-save-button" onClick={saveConfiguration}>
          {saved ? "CONFIGURATION SAVED" : "SAVE CONFIGURATION"}
          <span>↗</span>
        </button>
      </div>

    </div>
  );
}
