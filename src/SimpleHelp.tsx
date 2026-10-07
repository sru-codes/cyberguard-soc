type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SimpleHelp({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="simple-help-overlay">
      <div className="simple-help-modal">

        <button
          type="button"
          className="simple-help-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="simple-help-kicker">
          CYBERGUARD HELP CENTER
        </div>

        <h2>How can we help you?</h2>

        <p className="simple-help-subtitle">
          Simple guidance for keeping yourself safe online.
        </p>

        <div className="simple-help-grid">

          <div className="simple-help-card">
            <span>01</span>
            <strong>CHECK EMAIL</strong>
            <p>
              Got a strange email or message?
              Use Check Email to look for suspicious
              words, links and requests.
            </p>
          </div>

          <div className="simple-help-card">
            <span>02</span>
            <strong>CHECK WEBSITE</strong>
            <p>
              Not sure about a website or link?
              Check it before entering your password,
              payment details or personal information.
            </p>
          </div>

          <div className="simple-help-card">
            <span>03</span>
            <strong>CHECK PERSON</strong>
            <p>
              Someone asking for money, OTP or
              confidential information? Check the
              person before responding.
            </p>
          </div>

          <div className="simple-help-card">
            <span>04</span>
            <strong>CHECK MEDIA</strong>
            <p>
              Worried that an image, video or audio
              file may be fake? Use Check Media
              for a quick safety check.
            </p>
          </div>

        </div>

        <div className="simple-help-alert-box">
          <div className="simple-help-alert-icon">!</div>

          <div>
            <strong>WHEN YOU SEE AN ALERT</strong>
            <p>
              Do not panic. Read what CyberGuard found,
              follow the recommended action and avoid
              clicking suspicious links.
            </p>
          </div>
        </div>

        <div className="simple-help-safety">

          <div className="simple-help-section-title">
            <span>SECURITY BASICS</span>
            <h3>STAY SAFE ONLINE</h3>
          </div>

          <div className="simple-help-tips">
            <div>
              <span>✓</span>
              <p>Never share your OTP or password.</p>
            </div>

            <div>
              <span>✓</span>
              <p>Check links before opening them.</p>
            </div>

            <div>
              <span>✓</span>
              <p>Do not send money because of an urgent message.</p>
            </div>

            <div>
              <span>✓</span>
              <p>When unsure, stop and verify first.</p>
            </div>
          </div>

        </div>

        <button
          type="button"
          className="simple-help-done"
          onClick={onClose}
        >
          GOT IT
        </button>

      </div>
    </div>
  );
}
