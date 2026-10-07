import { useState } from "react";

function ImpersonationDetection() {
  const [identityType, setIdentityType] = useState("PERSON");
  const [claimedIdentity, setClaimedIdentity] = useState("");
  const [source, setSource] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("IDLE");
  const [result, setResult] = useState(false);
  const [verified, setVerified] = useState(false);

  const analyzeIdentity = () => {
    if (!claimedIdentity.trim() || !message.trim() || status === "ANALYZING") {
      return;
    }

    setStatus("ANALYZING");
    setResult(false);
    setVerified(false);

    window.setTimeout(() => {
      setStatus("COMPLETE");
      setResult(true);
    }, 1700);
  };

  const resetAnalysis = () => {
    setStatus("IDLE");
    setResult(false);
    setVerified(false);
  };

  return (
    <div className="impersonation-page">
      <div className="impersonation-intro">
        <div>
          <span className="section-kicker">
            IDENTITY SECURITY / ACTIVE
          </span>

          <h1>IMPERSONATION</h1>

          <p>
            Detect fake identities, executive impersonation and
            suspicious communication patterns.
          </p>
        </div>

        <div className="impersonation-engine-status">
          <i />
          IDENTITY ANALYSIS ENGINE ONLINE
        </div>
      </div>

      <section className="impersonation-workspace">
        <div className="impersonation-type-tabs">
          {["PERSON", "EXECUTIVE", "BRAND"].map((item) => (
            <button
              key={item}
              className={identityType === item ? "active" : ""}
              onClick={() => {
                setIdentityType(item);
                resetAnalysis();
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="impersonation-form">
          <div className="impersonation-field">
            <label>CLAIMED IDENTITY</label>

            <input
              value={claimedIdentity}
              onChange={(e) => setClaimedIdentity(e.target.value)}
              placeholder={
                identityType === "EXECUTIVE"
                  ? "e.g. Chief Financial Officer"
                  : identityType === "BRAND"
                  ? "e.g. CyberGuard Security"
                  : "e.g. John Smith"
              }
            />
          </div>

          <div className="impersonation-field">
            <label>SOURCE / CONTACT</label>

            <input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="email, phone number, social profile or domain"
            />
          </div>

          <div className="impersonation-field">
            <label>COMMUNICATION TO ANALYZE</label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Paste the suspicious message or communication here..."
            />
          </div>

          <div className="impersonation-action-row">
            <div className="impersonation-hint">
              <i />
              Comparing identity signals, communication patterns and source indicators.
            </div>

            <button
              className="impersonation-analyze-btn"
              onClick={analyzeIdentity}
              disabled={
                !claimedIdentity.trim() ||
                !message.trim() ||
                status === "ANALYZING"
              }
            >
              {status === "ANALYZING"
                ? "ANALYZING..."
                : "ANALYZE IDENTITY"}
            </button>
          </div>
        </div>
      </section>

      {status === "ANALYZING" && (
        <section className="impersonation-analysis-state">
          <div className="impersonation-progress">
            <div />
          </div>

          <span>RUNNING IDENTITY ANALYSIS...</span>

          <strong>
            CORRELATING IDENTITY AND BEHAVIOURAL SIGNALS
          </strong>

          <p>
            Checking source consistency, communication patterns,
            identity claims and impersonation indicators.
          </p>
        </section>
      )}

      {result && (
        <section className="impersonation-result">
          <div className="impersonation-result-header">
            <div>
              <span>ANALYSIS COMPLETE</span>
              <h2>IDENTITY THREAT ASSESSMENT</h2>
            </div>

            <div className="impersonation-risk-badge">
              <i />
              HIGH RISK
            </div>
          </div>

          <div className="impersonation-result-grid">
            <div className="impersonation-score-card">
              <span>IMPERSONATION RISK</span>
              <strong>91</strong>
              <small>/ 100</small>
              <b>HIGH RISK</b>
            </div>

            <div className="impersonation-findings">
              <div>
                <span>IDENTITY VERDICT</span>
                <strong className="danger-text">
                  LIKELY IMPERSONATION
                </strong>
              </div>

              <div>
                <span>CONFIDENCE</span>
                <strong>96.1%</strong>
              </div>

              <div>
                <span>IDENTITY TYPE</span>
                <strong>{identityType}</strong>
              </div>

              <div>
                <span>CLAIMED IDENTITY</span>
                <strong className="impersonation-target">
                  {claimedIdentity}
                </strong>
              </div>
            </div>
          </div>

          <div className="impersonation-indicators">
            <span>DETECTED INDICATORS</span>

            <div>
              <b>⚠ IDENTITY MISMATCH</b>
              <b>⚠ UNVERIFIED SOURCE</b>
              <b>⚠ COMMUNICATION ANOMALY</b>
              <b>⚠ URGENCY SIGNAL</b>
            </div>
          </div>

          <div className="impersonation-recommendation">
            <div>
              <span>AI RECOMMENDATION</span>

              <strong>
                VERIFY IDENTITY THROUGH AN INDEPENDENT CHANNEL
              </strong>

              <p>
                Do not trust the claimed identity until the source
                is independently verified.
              </p>
            </div>

            <button
              className={verified ? "verified" : ""}
              onClick={() => setVerified(true)}
              disabled={verified}
            >
              {verified ? "IDENTITY FLAGGED" : "FLAG IDENTITY"}
            </button>
          </div>

          {verified && (
            <div className="impersonation-success">
              <i />
              IMPERSONATION THREAT FLAGGED FOR INVESTIGATION
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default ImpersonationDetection;
