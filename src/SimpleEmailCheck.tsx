import { useEffect, useState } from "react";

export default function SimpleEmailCheck() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<"safe" | "suspicious" | "dangerous" | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");

      if (button?.textContent?.trim().includes("Check Email")) {
        setOpen(true);
        setResult(null);
        setMessage("");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const analyze = () => {
    if (!message.trim() || analyzing) return;

    setAnalyzing(true);
    setResult(null);

    window.setTimeout(() => {
      const text = message.toLowerCase();

      const dangerWords = [
        "urgent",
        "verify your account",
        "click the link",
        "password",
        "otp",
        "suspended",
        "account will be closed",
        "immediately",
        "payment",
      ];

      const matches = dangerWords.filter((word) => text.includes(word)).length;

      setResult(matches >= 3 ? "dangerous" : matches >= 1 ? "suspicious" : "safe");
      setAnalyzing(false);
    }, 1400);
  };

  if (!open) return null;

  return (
    <div className="simple-email-overlay">
      <div className="simple-email-panel">
        <button
          className="simple-email-close"
          onClick={() => setOpen(false)}
        >
          X
        </button>

        <div className="simple-email-kicker">EMAIL SECURITY CHECK</div>

        <h2>Is this message safe?</h2>

        <p className="simple-email-description">
          Paste a suspicious email or message below. CyberGuard will check it
          for common warning signs.
        </p>

        <textarea
          className="simple-email-input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Paste the email or message here..."
        />

        <button
          className="simple-email-analyze"
          onClick={analyze}
          disabled={!message.trim() || analyzing}
        >
          {analyzing ? "CHECKING MESSAGE..." : "CHECK MESSAGE"}
        </button>

        {result && (
          <div className={`simple-email-result ${result}`}>
            <div className="simple-email-result-label">
              {result === "dangerous"
                ? "DANGEROUS"
                : result === "suspicious"
                  ? "SUSPICIOUS"
                  : "SAFE"}
            </div>

            <h3>
              {result === "dangerous"
                ? "This message may be trying to trick you."
                : result === "suspicious"
                  ? "This message has some warning signs."
                  : "No obvious warning signs were found."}
            </h3>

            <p>
              {result === "dangerous"
                ? "Do not click links, share passwords or send sensitive information."
                : result === "suspicious"
                  ? "Be careful before clicking links or replying. Verify the sender first."
                  : "You can still verify the sender if the message is unexpected."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
