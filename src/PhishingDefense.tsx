import { useState } from "react";

function PhishingDefense() {
  const [mode, setMode] = useState("EMAIL");
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("IDLE");
  const [result, setResult] = useState(false);
  const [quarantined, setQuarantined] = useState(false);

  const analyzeThreat = () => {
    if (!message.trim() || status === "ANALYZING") return;

    setStatus("ANALYZING");
    setResult(false);

    window.setTimeout(() => {
      setStatus("COMPLETE");
      setResult(true);
    }, 1600);
  };

  const resetAnalysis = () => {
    setStatus("IDLE");
    setResult(false);
  };

  return (
    <div className="phishing-defense-page">
      <div className="phishing-intro">
        <div>
          <span className="section-kicker">EMAIL SECURITY / ACTIVE</span>
          <h1>PHISHING DEFENSE</h1>
          <p>
            Analyze suspicious emails, messages and links before they reach
            the user.
          </p>
        </div>

        <div className="phishing-engine-status">
          <i />
          AI ANALYSIS ENGINE ONLINE
        </div>
      </div>

      <section className="phishing-workspace">
        <div className="phishing-mode-tabs">
          {["EMAIL", "MESSAGE", "URL"].map((item) => (
            <button
              key={item}
              className={mode === item ? "active" : ""}
              onClick={() => {
                setMode(item);
                resetAnalysis();
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="phishing-form">
          <div className="phishing-field">
            <label>
              {mode === "URL" ? "TARGET URL" : "SENDER / SOURCE"}
            </label>
            <input
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder={
                mode === "URL"
                  ? "https://suspicious-example.com/login"
                  : "security-alert@example.com"
              }
            />
          </div>

          {mode !== "URL" && (
            <div className="phishing-field">
              <label>SUBJECT</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Urgent: Verify your account"
              />
            </div>
          )}

          <div className="phishing-field">
            <label>
              {mode === "URL" ? "URL / CONTENT TO ANALYZE" : "MESSAGE CONTENT"}
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                mode === "URL"
                  ? "Paste suspicious URL or related content here..."
                  : "Paste the suspicious email or message content here..."
              }
            />
          </div>

          <div className="phishing-action-row">
            <div className="phishing-hint">
              <i />
              Analysis uses sender, content and behavioral indicators.
            </div>

            <button
              className="phishing-analyze-btn"
              onClick={analyzeThreat}
              disabled={!message.trim() || status === "ANALYZING"}
            >
              {status === "ANALYZING"
                ? "ANALYZING..."
                : "ANALYZE THREAT"}
            </button>
          </div>
        </div>
      </section>

      {status === "ANALYZING" && (
        <section className="phishing-analysis-state">
          <div className="phishing-progress">
            <div />
          </div>

          <span>RUNNING PHISHING ANALYSIS...</span>
          <strong>CORRELATING THREAT INDICATORS</strong>
          <p>
            Checking sender behavior, urgency patterns, link indicators and
            impersonation signals.
          </p>
        </section>
      )}

      {result && (
        <>
          <section className="phishing-result">
            <div className="phishing-result-header">
              <div>
                <span>ANALYSIS COMPLETE</span>
                <h2>PHISHING THREAT ASSESSMENT</h2>
              </div>

              <div className="phishing-verdict-badge">
                <i />
                HIGH RISK
              </div>
            </div>

            <div className="phishing-result-grid">
              <div className="phishing-score-card">
                <span>PHISHING RISK</span>
                <strong>87</strong>
                <small>/ 100</small>
                <b>HIGH RISK</b>
              </div>

              <div className="phishing-findings">
                <div>
                  <span>VERDICT</span>
                  <strong className="danger-text">
                    LIKELY PHISHING ATTEMPT
                  </strong>
                </div>

                <div>
                  <span>CONFIDENCE</span>
                  <strong>94.2%</strong>
                </div>

                <div>
                  <span>DETECTED SIGNALS</span>
                  <strong>4 HIGH-RISK INDICATORS</strong>
                </div>

                <div>
                  <span>SOURCE</span>
                  <strong className="phishing-target">
                    {sender || "USER-SUBMITTED CONTENT"}
                  </strong>
                </div>
              </div>
            </div>

            <div className="phishing-indicators">
              <span>DETECTED INDICATORS</span>

              <div>
                <b>⚠ CREDENTIAL REQUEST</b>
                <b>⚠ URGENCY LANGUAGE</b>
                <b>⚠ SUSPICIOUS LINK</b>
                <b>⚠ BRAND IMPERSONATION</b>
              </div>
            </div>

            <div className="phishing-recommendation">
              <div>
                <span>AI RECOMMENDATION</span>
                <strong>
                  QUARANTINE AND BLOCK RELATED INDICATORS
                </strong>
                <p>
                  Do not open links or provide credentials until the source
                  has been independently verified.
                </p>
              </div>

              <button
                className={quarantined ? "quarantine-btn quarantined" : "quarantine-btn"}
                onClick={() => setQuarantined(true)}
                disabled={quarantined}
              >
                {quarantined ? "QUARANTINED" : "QUARANTINE"}
              </button>
              {quarantined && (
                <div className="quarantine-success">
                  <i />
                  THREAT SUCCESSFULLY ISOLATED
                </div>
              )}
            </div>
          </section>

          <section className="phishing-history">
            <div className="panel-header">
              <div>
                <span>RECENT ACTIVITY</span>
                <h3>PHISHING DETECTIONS</h3>
              </div>
              <small>LAST 24 HOURS</small>
            </div>

            <div className="phishing-history-row">
              <span className="history-risk critical">CRITICAL</span>
              <strong>Credential verification campaign</strong>
              <code>login-security-alert.com</code>
              <small>4m ago</small>
            </div>

            <div className="phishing-history-row">
              <span className="history-risk high">HIGH</span>
              <strong>Fake account suspension notice</strong>
              <code>account-review-mail.net</code>
              <small>18m ago</small>
            </div>

            <div className="phishing-history-row">
              <span className="history-risk medium">MEDIUM</span>
              <strong>Suspicious password reset request</strong>
              <code>secure-auth-check.org</code>
              <small>42m ago</small>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default PhishingDefense;

