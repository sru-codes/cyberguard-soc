import { useEffect, useState } from "react";

export default function SimpleWebsiteCheck() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<"safe" | "suspicious" | "dangerous" | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");

      if (button?.textContent?.trim().includes("Check Website")) {
        setOpen(true);
        setResult(null);
        setUrl("");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const checkWebsite = () => {
    if (!url.trim() || checking) return;

    setChecking(true);
    setResult(null);

    window.setTimeout(() => {
      const value = url.toLowerCase();

      const dangerSignals = [
        "verify",
        "login",
        "secure-account",
        "account",
        "password",
        "payment",
        "signin",
        "wallet",
        "bank",
        "free-gift",
      ];

      const suspiciousTld = [".xyz", ".top", ".click", ".zip", ".work"];

      const signalCount =
        dangerSignals.filter((signal) => value.includes(signal)).length +
        suspiciousTld.filter((tld) => value.includes(tld)).length;

      if (signalCount >= 3) {
        setResult("dangerous");
      } else if (signalCount >= 1) {
        setResult("suspicious");
      } else {
        setResult("safe");
      }

      setChecking(false);
    }, 1400);
  };

  if (!open) return null;

  return (
    <div className="simple-website-overlay">
      <div className="simple-website-panel">
        <button
          className="simple-website-close"
          onClick={() => setOpen(false)}
        >
          X
        </button>

        <div className="simple-website-kicker">WEBSITE SECURITY CHECK</div>

        <h2>Is this website safe?</h2>

        <p className="simple-website-description">
          Paste a website link you are unsure about. CyberGuard will check it
          for common warning signs.
        </p>

        <input
          className="simple-website-input"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          type="text"
        />

        <button
          className="simple-website-check"
          onClick={checkWebsite}
          disabled={!url.trim() || checking}
        >
          {checking ? "CHECKING WEBSITE..." : "CHECK WEBSITE"}
        </button>

        {result && (
          <div className={`simple-website-result ${result}`}>
            <div className="simple-website-result-label">
              {result === "dangerous"
                ? "DANGEROUS"
                : result === "suspicious"
                  ? "SUSPICIOUS"
                  : "SAFE"}
            </div>

            <h3>
              {result === "dangerous"
                ? "This website may not be safe."
                : result === "suspicious"
                  ? "This website has some warning signs."
                  : "No obvious warning signs were found."}
            </h3>

            <p>
              {result === "dangerous"
                ? "Do not enter passwords, OTPs, card details or other sensitive information."
                : result === "suspicious"
                  ? "Be careful. Verify the website address before signing in or sharing information."
                  : "The address does not show obvious warning signs in this prototype check."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
