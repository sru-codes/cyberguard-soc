import { useState } from "react";

function ThreatIntelligence() {
  const [iocType, setIocType] = useState("IP");
  const [iocValue, setIocValue] = useState("");
  const [status, setStatus] = useState("IDLE");
  const [result, setResult] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const searchIOC = () => {
    if (!iocValue.trim() || status === "SEARCHING") return;

    setStatus("SEARCHING");
    setResult(false);
    setBlocked(false);

    window.setTimeout(() => {
      setStatus("COMPLETE");
      setResult(true);
    }, 1700);
  };

  const resetSearch = () => {
    setIocValue("");
    setStatus("IDLE");
    setResult(false);
    setBlocked(false);
  };

  return (
    <div className="threat-intelligence-page">
      <div className="threat-intelligence-intro">
        <div>
          <span className="section-kicker">
            THREAT INTELLIGENCE / LIVE
          </span>

          <h1>THREAT INTELLIGENCE</h1>

          <p>
            Investigate indicators of compromise and correlate them with
            known threat activity, campaigns and attack techniques.
          </p>
        </div>

        <div className="threat-intelligence-status">
          <i />
          INTELLIGENCE ENGINE ONLINE
        </div>
      </div>

      <section className="intel-search-workspace">
        <div className="intel-type-tabs">
          {["IP", "DOMAIN", "HASH", "IOC"].map((item) => (
            <button
              key={item}
              className={iocType === item ? "active" : ""}
              onClick={() => {
                setIocType(item);
                resetSearch();
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="intel-search-area">
          <label>INDICATOR OF COMPROMISE</label>

          <div className="intel-search-row">
            <input
              value={iocValue}
              onChange={(e) => setIocValue(e.target.value)}
              placeholder={
                iocType === "IP"
                  ? "e.g. 185.72.14.91"
                  : iocType === "DOMAIN"
                  ? "e.g. suspicious-login.example"
                  : iocType === "HASH"
                  ? "Enter SHA-256 / SHA-1 / MD5 hash"
                  : "Enter IOC or threat indicator"
              }
            />

            <button
              onClick={searchIOC}
              disabled={!iocValue.trim() || status === "SEARCHING"}
            >
              {status === "SEARCHING"
                ? "CORRELATING..."
                : "SEARCH INTELLIGENCE"}
            </button>
          </div>

          <div className="intel-search-hint">
            <i />
            Correlates reputation, campaign and attack-pattern intelligence.
          </div>
        </div>
      </section>

      {status === "SEARCHING" && (
        <section className="intel-analysis-state">
          <div className="intel-progress">
            <div />
          </div>

          <span>RUNNING INTELLIGENCE CORRELATION...</span>

          <strong>
            SEARCHING GLOBAL THREAT INDICATORS
          </strong>

          <p>
            Correlating reputation, campaigns, tactics and related indicators.
          </p>
        </section>
      )}

      {result && (
        <section className="intel-result">
          <div className="intel-result-header">
            <div>
              <span>INTELLIGENCE MATCH FOUND</span>
              <h2>THREAT PROFILE</h2>
            </div>

            <div className="intel-risk-badge">
              <i />
              HIGH RISK
            </div>
          </div>

          <div className="intel-profile-grid">
            <div className="intel-score-card">
              <span>THREAT SCORE</span>
              <strong>92</strong>
              <small>/ 100</small>
              <b>HIGH RISK</b>
            </div>

            <div className="intel-findings">
              <div>
                <span>REPUTATION</span>
                <strong className="danger-text">
                  MALICIOUS
                </strong>
              </div>

              <div>
                <span>CONFIDENCE</span>
                <strong>98.4%</strong>
              </div>

              <div>
                <span>THREAT FAMILY</span>
                <strong>PHISHING / CREDENTIAL THEFT</strong>
              </div>

              <div>
                <span>INDICATOR</span>
                <strong className="intel-target">
                  {iocValue}
                </strong>
              </div>
            </div>
          </div>

          <div className="intel-meta-grid">
            <div>
              <span>FIRST SEEN</span>
              <strong>12 DAYS AGO</strong>
            </div>

            <div>
              <span>LAST SEEN</span>
              <strong>4 MINUTES AGO</strong>
            </div>

            <div>
              <span>RELATED CAMPAIGNS</span>
              <strong>7</strong>
            </div>

            <div>
              <span>RELATED INDICATORS</span>
              <strong>34</strong>
            </div>
          </div>

          <div className="intel-techniques">
            <span>MITRE ATT&amp;CK TECHNIQUES</span>

            <div>
              <b>⚠ CREDENTIAL PHISHING</b>
              <b>⚠ VALID ACCOUNTS</b>
              <b>⚠ INITIAL ACCESS</b>
              <b>⚠ COLLECTION</b>
            </div>
          </div>

          <div className="intel-recommendation">
            <div>
              <span>AI THREAT ASSESSMENT</span>

              <strong>
                BLOCK INDICATOR AND INVESTIGATE RELATED ACTIVITY
              </strong>

              <p>
                This indicator is associated with suspicious credential
                activity and should be treated as a high-priority threat.
              </p>
            </div>

            <button
              className={blocked ? "blocked" : ""}
              onClick={() => setBlocked(true)}
              disabled={blocked}
            >
              {blocked ? "IOC BLOCKED" : "BLOCK IOC"}
            </button>
          </div>

          {blocked && (
            <div className="intel-success">
              <i />
              INDICATOR BLOCKED — THREAT INTELLIGENCE ACTION COMPLETE
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default ThreatIntelligence;
