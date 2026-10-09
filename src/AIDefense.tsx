import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "ai";
  text: string;
};

type AIDefenseProps = {
  mode?: "simple" | "expert";
  onBack?: () => void;
};

export default function AIDefense({
  mode = "expert",
}: AIDefenseProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const requestInProgress = useRef(false);

  const isSimple = mode === "simple";

  const examples = isSimple
    ? [
        "Is this email a scam?",
        "What should I do if I clicked a suspicious link?",
        "Why is this alert dangerous?",
      ]
    : [
        "Analyze this phishing incident.",
        "Why is this alert critical?",
        "What should the SOC do next?",
        "Explain the attack indicators.",
      ];

  async function sendMessage(text?: string) {
    const message = (text ?? input).trim();

    if (!message || requestInProgress.current) return;

    requestInProgress.current = true;

    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", text: message },
    ]);

    setLoading(true);

    const controller = new AbortController();
    let didTimeout = false;
    const timeoutId = window.setTimeout(() => {
      didTimeout = true;
      controller.abort();
    }, 60_000);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
          body: JSON.stringify({
            message,
            mode,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`AI service returned HTTP ${response.status}. Please try again.`);
      }

      const data: unknown = await response.json();
      const answer =
        typeof data === "object" && data !== null && "response" in data &&
        typeof data.response === "object" && data.response !== null && "answer" in data.response &&
        typeof data.response.answer === "string"
          ? data.response.answer.trim()
          : "";

      if (!answer) {
        throw new Error("CyberGuard AI returned an empty response. Please try again.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: answer,
        },
      ]);
    } catch (error) {
      const errorMessage = didTimeout
        ? "CyberGuard AI took too long to respond. Please try again."
        : error instanceof Error &&
            (error.message.startsWith("AI service returned HTTP") ||
              error.message.startsWith("CyberGuard AI returned an empty response"))
          ? error.message
          : "Could not connect to CyberGuard AI. Check that the backend is running and try again.";

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: errorMessage,
        },
      ]);
    } finally {
      window.clearTimeout(timeoutId);
      requestInProgress.current = false;
      setLoading(false);
    }
  }

  return (
    <div className="ai-defense-page">
      <div className="ai-defense-header">
        <div>
          <div className="ai-defense-kicker">
            CYBERGUARD AI
          </div>

          <h1>AI Defense</h1>

          <p>
            {isSimple
              ? "Your security assistant. Ask anything about a suspicious message, website or alert."
              : "Intelligent security analysis and conversational threat reasoning."}
          </p>
        </div>

        <div className="ai-defense-status">
          <span className="ai-status-dot" />
          AI ENGINE ONLINE
        </div>
      </div>

      <div className="ai-defense-shell">
        {messages.length === 0 ? (
          <div className="ai-defense-welcome">
            <div className="ai-orb">
              <div className="ai-orb-core">AI</div>
            </div>

            <div className="ai-welcome-title">
              {isSimple
                ? "How can I help protect you?"
                : "Your intelligent security analyst"}
            </div>

            <div className="ai-welcome-text">
              {isSimple
                ? "Ask CyberGuard about an email, website, message, person or security alert."
                : "Ask CyberGuard to investigate, explain, correlate or recommend a response to a security event."}
            </div>

            <div className="ai-example-grid">
              {examples.map((example) => (
                <button
                  key={example}
                  className="ai-example"
                  onClick={() => sendMessage(example)}
                >
                  <span>↗</span>
                  {example}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="ai-chat">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`ai-message ${
                  message.role === "user"
                    ? "ai-message-user"
                    : "ai-message-assistant"
                }`}
              >
                <div className="ai-message-label">
                  {message.role === "user"
                    ? "YOU"
                    : "CYBERGUARD AI"}
                </div>

                <div className="ai-message-text">
                  {message.role === "ai" ? (
                    <ReactMarkdown skipHtml>{message.text}</ReactMarkdown>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="ai-message ai-message-assistant">
                <div className="ai-message-label">
                  CYBERGUARD AI
                </div>

                <div className="ai-thinking">
                  <span />
                  <span />
                  <span />
                  ANALYZING SECURITY CONTEXT...
                </div>
              </div>
            )}
          </div>
        )}

        <div className="ai-input-area">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
              }
            }}
            placeholder={
              isSimple
                ? "Ask CyberGuard anything..."
                : "Ask CyberGuard to analyze a threat, alert or incident..."
            }
            rows={1}
          />

          <button
            className="ai-send"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
          >
            {loading ? "..." : "➤"}
          </button>
        </div>

        <div className="ai-input-footer">
          <span>
            {isSimple
              ? "CyberGuard AI • Simple security guidance"
              : "CyberGuard AI • Security intelligence engine"}
          </span>

          <span>
            SHIFT + ENTER for new line
          </span>
        </div>
      </div>
    </div>
  );
}
