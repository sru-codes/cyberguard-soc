import { useEffect, useState } from "react";

export default function SimplePersonCheck() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<"safe" | "suspicious" | "impersonation" | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");

      if (button?.textContent?.trim().includes("Check Person")) {
        setOpen(true);
        setResult(null);
        setName("");
        setDetails("");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const checkPerson = () => {
    if (!name.trim() || !details.trim() || checking) return;

    setChecking(true);
    setResult(null);

    window.setTimeout(() => {
      const text = (name + " " + details).toLowerCase();

      const strongSignals = [
        "send money",
        "transfer money",
        "gift card",
        "otp",
        "password",
        "urgent",
        "do not call",
        "keep this secret",
        "confidential",
        "bank details",
        "crypto",
        "wire transfer"
      ];

      const softSignals = [
        "new number",
        "new account",
        "help me",
        "emergency",
        "immediately",
        "click"
      ];

      const strongCount = strongSignals.filter((s) => text.includes(s)).length;
      const softCount = softSignals.filter((s) => text.includes(s)).length;

      if (strongCount >= 2 || (strongCount >= 1 && softCount >= 2)) {
        setResult("impersonation");
      } else if (strongCount >= 1 || softCount >= 1) {
        setResult("suspicious");
      } else {
        setResult("safe");
      }

      setChecking(false);
    }, 1400);
  };

  if (!open) return null;

  return (
    <div className="simple-person-overlay">
      <div className="simple-person-panel">
        <button
          className="simple-person-close"
          onClick={() => setOpen(false)}
        >
          X
        </button>

        <div className="simple-person-kicker">IDENTITY SECURITY CHECK</div>

        <h2>Is this person really who they say they are?</h2>

        <p className="simple-person-description">
          Enter the person's name and describe the message or contact you received.
          CyberGuard will look for common impersonation warning signs.
        </p>

        <label className="simple-person-label">PERSON NAME</label>

        <input
          className="simple-person-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Example: Your bank manager"
        />

        <label className="simple-person-label">
          MESSAGE OR CONTACT DETAILS
        </label>

        <textarea
          className="simple-person-textarea"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          placeholder="Example: They contacted me from a new number and asked me to send money urgently..."
        />

        <button
          className="simple-person-check"
          onClick={checkPerson}
          disabled={!name.trim() || !details.trim() || checking}
        >
          {checking ? "CHECKING IDENTITY..." : "CHECK PERSON"}
        </button>

        {result && (
          <div className={"simple-person-result " + result}>
            <div className="simple-person-result-label">
              {result === "impersonation"
                ? "LIKELY IMPERSONATION"
                : result === "suspicious"
                  ? "SUSPICIOUS"
                  : "LOW RISK"}
            </div>

            <h3>
              {result === "impersonation"
                ? "This person may not be who they claim to be."
                : result === "suspicious"
                  ? "There are some warning signs."
                  : "No obvious impersonation signs were found."}
            </h3>

            <p>
              {result === "impersonation"
                ? "Do not send money, OTPs, passwords or private information. Verify the person's identity using a trusted contact method."
                : result === "suspicious"
                  ? "Verify the person's identity independently before taking any action."
                  : "The information provided does not show obvious warning signs in this prototype check."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
