import { useState } from "react";

function BehaviouralThreats() {
  const [entityType, setEntityType] = useState("USER");
  const [entityId, setEntityId] = useState("");
  const [status, setStatus] = useState("IDLE");
  const [result, setResult] = useState(false);
  const [contained, setContained] = useState(false);

  const analyzeBehaviour = () => {
    if (!entityId.trim() || status === "ANALYZING") return;

    setStatus("ANALYZING");
    setResult(false);
    setContained(false);

    window.setTimeout(() => {
      setStatus("COMPLETE");
      setResult(true);
    }, 1700);
  };

  const resetAnalysis = () => {
    setEntityId("");
    setStatus("IDLE");
    setResult(false);
    setContained(false);
  };

  return (
    <div className="behavioural-page">
      <div className="behavioural-intro">
        <div>
          <span className="section-kicker">
            BEHAVIOUR ANALYTICS / ACTIVE
          </span>

          <h1>BEHAVIOURAL THREATS</h1>

          <p>
            Detect unusual user and endpoint activity before it becomes a
            security incident.
          </p>
        </div>

        <div className="behavioural-engine-status">
          <i />
          BEHAVIOUR ANALYSIS ENGINE ONLINE
        </div>
      </div>

      <section className="behavioural-workspace">
        <div className="behavioural-type-tabs">
          {["USER", "ENDPOINT"].map((item) => (
            <button
              key={item}
              className={entityType === item ? "active" : ""}
              onClick={() => {
                setEntityType(item);
                resetAnalysis();
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="behavioural-form">
          <div className="behavioural-field">
            <label>
              {entityType === "USER" ? "USER IDENTITY" : "ENDPOINT IDENTITY"}
            </label>

            <input
              value={entityId}
              onChange={(e) => setEntityId(e.target.value)}
              placeholder={
                entityType === "USER"
                  ? "e.g. USER-0184"
                  : "e.g. ENDPOINT-042"
              }
            />
          </div>

          <div className="behavioural-signal-preview">
            <div>
              <span>LOGIN PATTERN</span>
              <strong>ANOMALOUS</strong>
            </div>

            <div>
              <span>DEVICE STATE</span>
              <strong>NEW DEVICE</strong>
            </div>

            <div>
              <span>LOCATION</span>
              <strong>UNUSUAL</strong>
            </div>

            <div>
              <span>ACCESS VOLUME</span>
              <strong>ELEVATED</strong>
            </div>
          </div>

          <div className="behavioural-action-row">
            <div className="behavioural-hint">
              <i />
              Compare current activity against established behaviour patterns.
            </div>

            <button
              className="behavioural-analyze-btn"
              onClick={analyzeBehaviour}
              disabled={!entityId.trim() || status === "ANALYZING"}
            >
              {status === "ANALYZING"
                ? "ANALYZING..."
                : "ANALYZE BEHAVIOUR"}
            </button>
          </div>
        </div>
      </section>

      {status === "ANALYZING" && (
        <section className="behavioural-analysis-state">
          <div className="behavioural-progress">
            <div />
          </div>

          <span>RUNNING BEHAVIOURAL ANALYSIS...</span>

          <strong>
            CORRELATING USER AND ENDPOINT ACTIVITY
          </strong>

          <p>
            Comparing authentication, device, location and access patterns.
          </p>
        </section>
      )}

      {result && (
        <section className="behavioural-result">
          <div className="behavioural-result-header">
            <div>
              <span>ANALYSIS COMPLETE</span>
              <h2>BEHAVIOURAL THREAT ASSESSMENT</h2>
            </div>

            <div className="behavioural-risk-badge">
              <i />
              CRITICAL RISK
            </div>
          </div>

          <div className="behavioural-result-grid">
            <div className="behavioural-score-card">
              <span>BEHAVIOURAL RISK</span>
              <strong>94</strong>
              <small>/ 100</small>
              <b>CRITICAL</b>
            </div>

            <div className="behavioural-findings">
              <div>
                <span>THREAT VERDICT</span>
                <strong className="danger-text">
                  HIGHLY ANOMALOUS BEHAVIOUR
                </strong>
              </div>

              <div>
                <span>CONFIDENCE</span>
                <strong>97.2%</strong>
              </div>

              <div>
                <span>ENTITY TYPE</span>
                <strong>{entityType}</strong>
              </div>

              <div>
                <span>MONITORED ENTITY</span>
                <strong className="behavioural-target">
                  {entityId}
                </strong>
              </div>
            </div>
          </div>

          <div className="behavioural-indicators">
            <span>BEHAVIOURAL ANOMALIES</span>

            <div>
              <b>⚠ UNUSUAL LOGIN TIME</b>
              <b>⚠ NEW DEVICE</b>
              <b>⚠ LOCATION ANOMALY</b>
              <b>⚠ EXCESSIVE DATA ACCESS</b>
              <b>⚠ FAILED AUTHENTICATIONS</b>
            </div>
          </div>

          <div className="behavioural-activity-grid">
            <div>
              <span>LAST LOGIN</span>
              <strong>03:42 AM</strong>
            </div>

            <div>
              <span>LOCATION</span>
              <strong>NEW DELHI</strong>
            </div>

            <div>
              <span>FAILED LOGINS</span>
              <strong>7 ATTEMPTS</strong>
            </div>

            <div>
              <span>DATA ACCESS</span>
              <strong>2.8 GB</strong>
            </div>
          </div>

          <div className="behavioural-recommendation">
            <div>
              <span>AI RECOMMENDATION</span>

              <strong>
                CONTAIN ENTITY AND BEGIN INVESTIGATION
              </strong>

              <p>
                Restrict suspicious activity while the security team
                investigates the behavioural anomaly.
              </p>
            </div>

            <button
              className={contained ? "contained" : ""}
              onClick={() => setContained(true)}
              disabled={contained}
            >
              {contained ? "ENDPOINT CONTAINED" : "CONTAIN ENTITY"}
            </button>
          </div>

          {contained && (
            <div className="behavioural-success">
              <i />
              ENTITY CONTAINED — INVESTIGATION CREATED
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default BehaviouralThreats;
