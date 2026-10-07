import { useState } from "react";

function DeepfakeDetection() {
  const [mediaType, setMediaType] = useState("IMAGE");
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("IDLE");
  const [result, setResult] = useState(false);
  const [flagged, setFlagged] = useState(false);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
    setStatus("IDLE");
    setResult(false);
    setFlagged(false);
  };

  const analyzeMedia = () => {
    if (!fileName || status === "ANALYZING") return;

    setStatus("ANALYZING");
    setResult(false);
    setFlagged(false);

    window.setTimeout(() => {
      setStatus("COMPLETE");
      setResult(true);
    }, 1800);
  };

  const resetAnalysis = () => {
    setFileName("");
    setStatus("IDLE");
    setResult(false);
    setFlagged(false);
  };

  return (
    <div className="deepfake-page">
      <div className="deepfake-intro">
        <div>
          <span className="section-kicker">
            MEDIA FORENSICS / ACTIVE
          </span>

          <h1>DEEPFAKE DETECTION</h1>

          <p>
            Detect manipulated images, synthetic video and AI-generated
            audio using forensic media signals.
          </p>
        </div>

        <div className="deepfake-engine-status">
          <i />
          MEDIA FORENSICS ENGINE ONLINE
        </div>
      </div>

      <section className="deepfake-workspace">
        <div className="deepfake-type-tabs">
          {["IMAGE", "VIDEO", "AUDIO"].map((item) => (
            <button
              key={item}
              className={mediaType === item ? "active" : ""}
              onClick={() => {
                setMediaType(item);
                resetAnalysis();
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="deepfake-upload-area">
          <div className="deepfake-upload-icon">
            ◈
          </div>

          <span className="deepfake-upload-label">
            MEDIA EVIDENCE
          </span>

          <h2>
            {fileName ? fileName : `UPLOAD ${mediaType.toLowerCase()} FOR ANALYSIS`}
          </h2>

          <p>
            {mediaType === "IMAGE"
              ? "Supported formats: JPG, PNG, WEBP"
              : mediaType === "VIDEO"
              ? "Supported formats: MP4, MOV, WEBM"
              : "Supported formats: MP3, WAV, M4A"}
          </p>

          <label className="deepfake-upload-btn">
            SELECT MEDIA
            <input
              type="file"
              accept={
                mediaType === "IMAGE"
                  ? "image/*"
                  : mediaType === "VIDEO"
                  ? "video/*"
                  : "audio/*"
              }
              onChange={handleFile}
            />
          </label>

          {fileName && (
            <button
              className="deepfake-reset-btn"
              onClick={resetAnalysis}
            >
              REMOVE FILE
            </button>
          )}
        </div>

        <div className="deepfake-action-row">
          <div className="deepfake-hint">
            <i />
            Media is analyzed for synthetic generation and manipulation signals.
          </div>

          <button
            className="deepfake-analyze-btn"
            onClick={analyzeMedia}
            disabled={!fileName || status === "ANALYZING"}
          >
            {status === "ANALYZING"
              ? "ANALYZING..."
              : "ANALYZE MEDIA"}
          </button>
        </div>
      </section>

      {status === "ANALYZING" && (
        <section className="deepfake-analysis-state">
          <div className="deepfake-progress">
            <div />
          </div>

          <span>RUNNING MEDIA FORENSIC ANALYSIS...</span>

          <strong>
            EXAMINING SYNTHETIC MEDIA SIGNALS
          </strong>

          <p>
            Checking visual consistency, compression artifacts,
            temporal patterns and generation indicators.
          </p>
        </section>
      )}

      {result && (
        <section className="deepfake-result">
          <div className="deepfake-result-header">
            <div>
              <span>ANALYSIS COMPLETE</span>
              <h2>DEEPFAKE THREAT ASSESSMENT</h2>
            </div>

            <div className="deepfake-risk-badge">
              <i />
              HIGH RISK
            </div>
          </div>

          <div className="deepfake-result-grid">
            <div className="deepfake-score-card">
              <span>MANIPULATION RISK</span>
              <strong>89</strong>
              <small>/ 100</small>
              <b>HIGH RISK</b>
            </div>

            <div className="deepfake-findings">
              <div>
                <span>AI VERDICT</span>
                <strong className="danger-text">
                  LIKELY SYNTHETIC MEDIA
                </strong>
              </div>

              <div>
                <span>CONFIDENCE</span>
                <strong>93.7%</strong>
              </div>

              <div>
                <span>MEDIA TYPE</span>
                <strong>{mediaType}</strong>
              </div>

              <div>
                <span>ANALYZED FILE</span>
                <strong className="deepfake-target">
                  {fileName}
                </strong>
              </div>
            </div>
          </div>

          <div className="deepfake-indicators">
            <span>FORENSIC INDICATORS</span>

            <div>
              <b>⚠ SYNTHETIC PATTERN</b>
              <b>⚠ FRAME INCONSISTENCY</b>
              <b>⚠ GENERATION ARTIFACT</b>
              <b>⚠ METADATA ANOMALY</b>
            </div>
          </div>

          <div className="deepfake-recommendation">
            <div>
              <span>AI RECOMMENDATION</span>

              <strong>
                TREAT MEDIA AS POTENTIALLY MANIPULATED
              </strong>

              <p>
                Preserve the original evidence and verify the source
                before using the media for operational decisions.
              </p>
            </div>

            <button
              className={flagged ? "flagged" : ""}
              onClick={() => setFlagged(true)}
              disabled={flagged}
            >
              {flagged ? "EVIDENCE FLAGGED" : "FLAG EVIDENCE"}
            </button>
          </div>

          {flagged && (
            <div className="deepfake-success">
              <i />
              MEDIA EVIDENCE FLAGGED FOR FORENSIC INVESTIGATION
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default DeepfakeDetection;
