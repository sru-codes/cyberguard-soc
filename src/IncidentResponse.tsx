import { useState } from "react";

function IncidentResponse() {
  const [incidentId] = useState("INC-2841");
  const [status, setStatus] = useState("ACTIVE");
  const [action, setAction] = useState("");

  const runAction = (nextAction: string) => {
    setAction(nextAction);

    window.setTimeout(() => {
      if (nextAction === "RESOLVE") {
        setStatus("RESOLVED");
      }
    }, 900);
  };

  return (
    <div className="incident-response-page">
      <div className="incident-response-intro">
        <div>
          <span className="section-kicker">
            INCIDENT OPERATIONS / ACTIVE
          </span>

          <h1>INCIDENT RESPONSE</h1>

          <p>
            Investigate, contain and resolve active security incidents
            through a structured response workflow.
          </p>
        </div>

        <div className="incident-engine-status">
          <i />
          RESPONSE OPERATIONS ONLINE
        </div>
      </div>

      <section className="incident-overview">
        <div className="incident-overview-header">
          <div>
            <span>ACTIVE SECURITY INCIDENT</span>
            <h2>{incidentId}</h2>
          </div>

          <div className={`incident-status ${status === "RESOLVED" ? "resolved" : ""}`}>
            <i />
            {status}
          </div>
        </div>

        <div className="incident-summary-grid">
          <div>
            <span>INCIDENT TYPE</span>
            <strong>CREDENTIAL THEFT</strong>
          </div>

          <div>
            <span>SEVERITY</span>
            <strong className="incident-critical">CRITICAL</strong>
          </div>

          <div>
            <span>AFFECTED ASSETS</span>
            <strong>3 ENDPOINTS</strong>
          </div>

          <div>
            <span>DETECTED</span>
            <strong>2 MINUTES AGO</strong>
          </div>
        </div>
      </section>

      <section className="incident-workspace">
        <div className="incident-timeline">
          <div className="incident-panel-title">
            <span>RESPONSE TIMELINE</span>
            <strong>LIVE INCIDENT ACTIVITY</strong>
          </div>

          <div className="incident-timeline-item complete">
            <div className="incident-timeline-dot" />
            <div>
              <span>14:02:11</span>
              <strong>THREAT DETECTED</strong>
              <p>
                Credential harvesting activity detected from a suspicious
                external source.
              </p>
            </div>
          </div>

          <div className="incident-timeline-item complete">
            <div className="incident-timeline-dot" />
            <div>
              <span>14:02:43</span>
              <strong>INDICATORS CORRELATED</strong>
              <p>
                Related authentication events and malicious indicators
                were correlated.
              </p>
            </div>
          </div>

          <div className={`incident-timeline-item ${action === "CONTAIN" || status === "RESOLVED" ? "complete" : ""}`}>
            <div className="incident-timeline-dot" />
            <div>
              <span>14:03:08</span>
              <strong>CONTAINMENT</strong>
              <p>
                Isolate affected endpoints and restrict suspicious access.
              </p>
            </div>
          </div>

          <div className={`incident-timeline-item ${action === "REMEDIATE" || status === "RESOLVED" ? "complete" : ""}`}>
            <div className="incident-timeline-dot" />
            <div>
              <span>14:04:26</span>
              <strong>REMEDIATION</strong>
              <p>
                Remove malicious indicators and restore affected systems.
              </p>
            </div>
          </div>

          <div className={`incident-timeline-item ${status === "RESOLVED" ? "complete" : ""}`}>
            <div className="incident-timeline-dot" />
            <div>
              <span>14:05:00</span>
              <strong>RESOLUTION</strong>
              <p>
                Close the incident after verification and investigation.
              </p>
            </div>
          </div>
        </div>

        <div className="incident-actions-panel">
          <div className="incident-panel-title">
            <span>RESPONSE ACTIONS</span>
            <strong>SECURITY PLAYBOOK</strong>
          </div>

          <button
            className={action === "INVESTIGATE" ? "active" : ""}
            onClick={() => runAction("INVESTIGATE")}
          >
            <b>01</b>
            <div>
              <strong>INVESTIGATE</strong>
              <span>Review evidence and attack indicators</span>
            </div>
          </button>

          <button
            className={action === "CONTAIN" ? "active" : ""}
            onClick={() => runAction("CONTAIN")}
          >
            <b>02</b>
            <div>
              <strong>CONTAIN</strong>
              <span>Isolate affected endpoints</span>
            </div>
          </button>

          <button
            className={action === "REMEDIATE" ? "active" : ""}
            onClick={() => runAction("REMEDIATE")}
          >
            <b>03</b>
            <div>
              <strong>REMEDIATE</strong>
              <span>Remove threats and restore systems</span>
            </div>
          </button>

          <button
            className={status === "RESOLVED" ? "resolved-action" : ""}
            onClick={() => runAction("RESOLVE")}
            disabled={status === "RESOLVED"}
          >
            <b>04</b>
            <div>
              <strong>
                {status === "RESOLVED" ? "INCIDENT RESOLVED" : "RESOLVE INCIDENT"}
              </strong>
              <span>Close incident after verification</span>
            </div>
          </button>

          {action && (
            <div className="incident-action-status">
              <i />
              {status === "RESOLVED"
                ? "INCIDENT RESOLVED — RESPONSE WORKFLOW COMPLETE"
                : `${action} ACTION INITIATED`}
            </div>
          )}
        </div>
      </section>

      <section className="incident-assets">
        <div className="incident-panel-title">
          <span>AFFECTED ASSETS</span>
          <strong>INCIDENT SCOPE</strong>
        </div>

        <div className="incident-asset-grid">
          <div>
            <span>ENDPOINT</span>
            <strong>ENDPOINT-042</strong>
            <small>HIGH RISK</small>
          </div>

          <div>
            <span>ENDPOINT</span>
            <strong>ENDPOINT-018</strong>
            <small>HIGH RISK</small>
          </div>

          <div>
            <span>USER ACCOUNT</span>
            <strong>USER-0184</strong>
            <small>COMPROMISED</small>
          </div>
        </div>
      </section>
    </div>
  );
}

export default IncidentResponse;

