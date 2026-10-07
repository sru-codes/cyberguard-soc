import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SimpleAlerts({ open, onClose }: Props) {
  const [safeIds, setSafeIds] = useState<string[]>([]);

  const alerts = [
    {
      id: "ALT-2841",
      level: "CRITICAL",
      title: "Suspicious account message",
      message:
        "A message is asking you to verify your account using an unusual link.",
      action: "Do not open the link. Verify the sender first.",
      time: "2 min ago",
    },
    {
      id: "ALT-2839",
      level: "WARNING",
      title: "Unusual login detected",
      message:
        "A login was detected from a device you do not normally use.",
      action: "If this was not you, change your password.",
      time: "18 min ago",
    },
    {
      id: "ALT-2837",
      level: "WARNING",
      title: "Suspicious website activity",
      message:
        "A website you visited showed signs commonly linked with unsafe pages.",
      action:
        "Close the page and avoid entering personal information.",
      time: "42 min ago",
    },
  ];

  if (!open) return null;

  const visibleAlerts = alerts.filter(
    (alert) => !safeIds.includes(alert.id)
  );

  return (
    <div className="simple-alert-overlay">
      <div className="simple-alert-modal">

        <button
          type="button"
          className="simple-alert-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="simple-alert-kicker">
          SECURITY ALERTS
        </div>

        <h2>Is there anything you should know?</h2>

        <p className="simple-alert-subtitle">
          CyberGuard found these events that may need your attention.
        </p>

        <div className="simple-alert-summary">
          <div>
            <strong>{visibleAlerts.length}</strong>
            <span>Alerts to review</span>
          </div>

          <div>
            <strong>
              {visibleAlerts.filter(
                (alert) => alert.level === "CRITICAL"
              ).length}
            </strong>
            <span>Need attention</span>
          </div>
        </div>

        <div className="simple-alert-list">
          {visibleAlerts.length === 0 ? (
            <div className="simple-alert-empty">
              <div className="simple-alert-empty-icon">✓</div>
              <h3>You're all caught up.</h3>
              <p>No active security alerts need your attention.</p>
            </div>
          ) : (
            visibleAlerts.map((alert) => (
              <div
                className={`simple-alert-card ${alert.level.toLowerCase()}`}
                key={alert.id}
              >
                <div className="simple-alert-card-top">
                  <span className="simple-alert-level">
                    {alert.level}
                  </span>

                  <span className="simple-alert-time">
                    {alert.time}
                  </span>
                </div>

                <h3>{alert.title}</h3>

                <p>{alert.message}</p>

                <div className="simple-alert-action">
                  <span>WHAT TO DO</span>
                  {alert.action}
                </div>

                <div className="simple-alert-buttons">
                  <button type="button">
                    REVIEW ALERT
                  </button>

                  <button
                    type="button"
                    className="simple-alert-safe"
                    onClick={() =>
                      setSafeIds((current) => [
                        ...current,
                        alert.id,
                      ])
                    }
                  >
                    MARK AS SAFE
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
