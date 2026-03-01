"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

// ── Icon components (simple SVG circles with letters as fallback) ────────────
function RedditIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#FF4500" />
      <text x="16" y="21" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600" fontFamily="Geist, sans-serif">R</text>
    </svg>
  );
}
function SlackIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#7C3AED" />
      <text x="16" y="21" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600" fontFamily="Geist, sans-serif">S</text>
    </svg>
  );
}
function ResendIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#3B82F6" />
      <text x="16" y="21" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600" fontFamily="Geist, sans-serif">E</text>
    </svg>
  );
}
function SheetsIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#22C55E" />
      <text x="16" y="21" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600" fontFamily="Geist, sans-serif">G</text>
    </svg>
  );
}
function NotionIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#333" />
      <text x="16" y="21" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600" fontFamily="Geist, sans-serif">N</text>
    </svg>
  );
}
function ZapierIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#FF4A00" />
      <text x="16" y="21" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600" fontFamily="Geist, sans-serif">Z</text>
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#ededed" />
      <text x="16" y="21" textAnchor="middle" fill="#0a0a0a" fontSize="14" fontWeight="600" fontFamily="Geist, sans-serif">G</text>
    </svg>
  );
}
function LinearIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#7C3AED" />
      <text x="16" y="21" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600" fontFamily="Geist, sans-serif">L</text>
    </svg>
  );
}
function MakeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#9333EA" />
      <text x="16" y="21" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600" fontFamily="Geist, sans-serif">M</text>
    </svg>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────
const connectedIntegrations = [
  {
    id: "reddit",
    name: "Reddit API",
    icon: RedditIcon,
    description: "Post and comment on Reddit threads. Track engagement and monitor subreddits.",
    lastSynced: "2 hours ago",
    config: {
      accountName: "u/infrasity-bot",
      apiKey: "sk-reddit-••••••••••••••••3f8a",
      rateLimitUsed: 342,
      rateLimitMax: 1000,
    },
  },
  {
    id: "slack",
    name: "Slack",
    icon: SlackIcon,
    description: "Get real-time alerts for engagement status changes and cadence updates.",
    lastSynced: "15 minutes ago",
    config: {
      workspace: "Infrasity HQ",
      defaultChannel: "#threadflow-alerts",
      channels: ["#threadflow-alerts", "#general", "#reddit-ops", "#engineering"],
    },
  },
  {
    id: "email",
    name: "Email via Resend",
    icon: ResendIcon,
    description: "Send monthly reports, cadence alerts, and engagement summaries to clients.",
    lastSynced: "1 day ago",
    config: {
      provider: "Resend",
      fromAddress: "threadflow@infrasity.com",
      replyTo: "team@infrasity.com",
    },
  },
];

const availableIntegrations = [
  {
    id: "sheets",
    name: "Google Sheets",
    icon: SheetsIcon,
    description: "Sync engagement data to Google Sheets for custom reporting and sharing.",
  },
  {
    id: "notion",
    name: "Notion",
    icon: NotionIcon,
    description: "Export engagements and reports directly to Notion databases and pages.",
  },
  {
    id: "zapier",
    name: "Zapier",
    icon: ZapierIcon,
    description: "Connect ThreadFlow to 5,000+ apps with automated workflows and triggers.",
  },
  {
    id: "github",
    name: "GitHub",
    icon: GitHubIcon,
    description: "Link Reddit threads to GitHub issues and track developer engagement.",
  },
  {
    id: "linear",
    name: "Linear",
    icon: LinearIcon,
    description: "Create Linear issues from Reddit threads and track follow-ups automatically.",
  },
  {
    id: "make",
    name: "Make",
    icon: MakeIcon,
    description: "Build complex automation scenarios with visual workflow builder integration.",
  },
];

// ── Slide-out Configure Panel ────────────────────────────────────────────────
function ConfigPanel({ integration, onClose }) {
  const [testSent, setTestSent] = useState(false);

  useEffect(() => {
    if (testSent) {
      const t = setTimeout(() => setTestSent(false), 2000);
      return () => clearTimeout(t);
    }
  }, [testSent]);

  if (!integration) return null;

  const { config } = integration;

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 7,
    padding: "8px 12px",
    color: "#ededed",
    fontSize: 13,
    fontFamily: "'Geist', -apple-system, sans-serif",
    outline: "none",
    transition: "border-color 0.15s",
  };

  const labelStyle = {
    fontSize: 10,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.4)",
    marginBottom: 6,
    display: "block",
  };

  const fieldGroup = { marginBottom: 20 };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: 420,
        background: "#0f0f0f",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        animation: "slideInRight 0.2s ease-out",
        boxShadow: "-8px 0 32px rgba(0,0,0,0.4)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <integration.icon />
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#ededed" }}>{integration.name}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Configuration</div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 7,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.4)",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.color = "#ededed";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "rgba(255,255,255,0.4)";
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
        {/* Reddit config */}
        {integration.id === "reddit" && (
          <>
            <div style={fieldGroup}>
              <label style={labelStyle}>Account Name</label>
              <input style={inputStyle} defaultValue={config.accountName} readOnly
                onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>API Key</label>
              <input style={{ ...inputStyle, fontFamily: "monospace", fontSize: 12, letterSpacing: "0.02em" }} defaultValue={config.apiKey} readOnly
                onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>Rate Limit Usage</label>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "#ededed", fontVariantNumeric: "tabular-nums" }}>
                  {config.rateLimitUsed} / {config.rateLimitMax}
                </span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontVariantNumeric: "tabular-nums" }}>
                  {Math.round((config.rateLimitUsed / config.rateLimitMax) * 100)}%
                </span>
              </div>
              <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${(config.rateLimitUsed / config.rateLimitMax) * 100}%`,
                    height: "100%",
                    background: config.rateLimitUsed / config.rateLimitMax > 0.8 ? "#f87171" : "#34d399",
                    borderRadius: 3,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
          </>
        )}

        {/* Slack config */}
        {integration.id === "slack" && (
          <>
            <div style={fieldGroup}>
              <label style={labelStyle}>Workspace</label>
              <input style={inputStyle} defaultValue={config.workspace} readOnly
                onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>Default Channel</label>
              <select
                defaultValue={config.defaultChannel}
                style={{
                  ...inputStyle,
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  paddingRight: 36,
                  cursor: "pointer",
                }}
                onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              >
                {config.channels.map((ch) => (
                  <option key={ch} value={ch} style={{ background: "#161616", color: "#ededed" }}>{ch}</option>
                ))}
              </select>
            </div>
            <div style={fieldGroup}>
              <button
                onClick={() => setTestSent(true)}
                style={{
                  width: "100%",
                  padding: "9px 16px",
                  background: testSent ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${testSent ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 7,
                  color: testSent ? "#34d399" : "rgba(255,255,255,0.6)",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!testSent) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.color = "#ededed";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!testSent) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  }
                }}
              >
                {testSent ? "Test message sent!" : "Send Test Message"}
              </button>
            </div>
          </>
        )}

        {/* Email config */}
        {integration.id === "email" && (
          <>
            <div style={fieldGroup}>
              <label style={labelStyle}>Provider</label>
              <input style={inputStyle} defaultValue={config.provider} readOnly
                onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>From Address</label>
              <input style={inputStyle} defaultValue={config.fromAddress}
                onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
            <div style={fieldGroup}>
              <label style={labelStyle}>Reply-To Address</label>
              <input style={inputStyle} defaultValue={config.replyTo}
                onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </div>
            <div style={fieldGroup}>
              <button
                onClick={() => setTestSent(true)}
                style={{
                  width: "100%",
                  padding: "9px 16px",
                  background: testSent ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${testSent ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 7,
                  color: testSent ? "#34d399" : "rgba(255,255,255,0.6)",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!testSent) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.color = "#ededed";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!testSent) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  }
                }}
              >
                {testSent ? "Test email sent!" : "Send Test Email"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          gap: 10,
        }}
      >
        <button
          style={{
            flex: 1,
            padding: "9px 16px",
            background: "#ededed",
            border: "none",
            borderRadius: 7,
            color: "#0a0a0a",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "'Geist', -apple-system, sans-serif",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ededed")}
        >
          Save Changes
        </button>
        <button
          style={{
            padding: "9px 16px",
            background: "rgba(248,113,113,0.1)",
            border: "1px solid rgba(248,113,113,0.2)",
            borderRadius: 7,
            color: "#f87171",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "'Geist', -apple-system, sans-serif",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(248,113,113,0.15)";
            e.currentTarget.style.borderColor = "rgba(248,113,113,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(248,113,113,0.1)";
            e.currentTarget.style.borderColor = "rgba(248,113,113,0.2)";
          }}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}

// ── Integration Card ─────────────────────────────────────────────────────────
function IntegrationCard({ integration, connected, onConfigure, onConnect, animDelay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
        borderLeft: connected ? `2px solid ${hovered ? "rgba(52,211,153,0.5)" : "rgba(52,211,153,0.3)"}` : undefined,
        borderRadius: 10,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "all 0.15s ease",
        animation: `fadeUp 0.3s ease-out ${animDelay}ms both`,
        cursor: "default",
      }}
    >
      {/* Top: icon + name + desc */}
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ flexShrink: 0, marginTop: 2 }}>
          <integration.icon />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "#ededed", marginBottom: 4 }}>
            {integration.name}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              lineHeight: "1.5",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {integration.description}
          </div>
        </div>
      </div>

      {/* Bottom: status + action */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: connected ? "#34d399" : "rgba(255,255,255,0.2)",
              flexShrink: 0,
            }}
          />
          {connected ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, color: "#34d399", fontWeight: 500 }}>Connected</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>·</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
                Last synced: {integration.lastSynced}
              </span>
            </div>
          ) : (
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Not Connected</span>
          )}
        </div>

        {connected ? (
          <ConfigureButton onClick={() => onConfigure(integration)} />
        ) : (
          <ConnectButton onClick={() => onConnect(integration)} />
        )}
      </div>
    </div>
  );
}

// ── Button Components ────────────────────────────────────────────────────────
function ConfigureButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "6px 14px",
        background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 7,
        color: hovered ? "#ededed" : "rgba(255,255,255,0.6)",
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "'Geist', -apple-system, sans-serif",
        transition: "all 0.15s",
      }}
    >
      Configure
    </button>
  );
}

function ConnectButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "6px 14px",
        background: hovered ? "#fff" : "#ededed",
        border: "none",
        borderRadius: 7,
        color: "#0a0a0a",
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "'Geist', -apple-system, sans-serif",
        transition: "all 0.15s",
      }}
    >
      Connect
    </button>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function IntegrationsPage() {
  const [configuring, setConfiguring] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const openConfig = (integration) => {
    setConfiguring(integration);
    setOverlayVisible(true);
  };

  const closeConfig = () => {
    setOverlayVisible(false);
    setTimeout(() => setConfiguring(null), 200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        fontFamily: "'Geist', -apple-system, sans-serif",
        color: "#ededed",
        position: "relative",
      }}
    >
      {/* Inline keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(20px); }
        }
      `}</style>

      {/* Page content */}
      <div style={{ padding: "28px 32px", maxWidth: 960 }}>
        {/* Header */}
        <div style={{ marginBottom: 36, animation: "fadeUp 0.3s ease-out both" }}>
          <h1
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#ededed",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Integrations
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              margin: "6px 0 0 0",
            }}
          >
            Connect your tools to automate workflows
          </p>
        </div>

        {/* Connected Section */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
              animation: "fadeUp 0.3s ease-out 50ms both",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Connected
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "rgba(52,211,153,0.8)",
                background: "rgba(52,211,153,0.1)",
                padding: "2px 8px",
                borderRadius: 20,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {connectedIntegrations.length}
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
            }}
          >
            {connectedIntegrations.map((int, i) => (
              <IntegrationCard
                key={int.id}
                integration={int}
                connected
                onConfigure={openConfig}
                onConnect={() => {}}
                animDelay={100 + i * 60}
              />
            ))}
          </div>
        </div>

        {/* Available Section */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
              animation: "fadeUp 0.3s ease-out 300ms both",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Available
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.04)",
                padding: "2px 8px",
                borderRadius: 20,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {availableIntegrations.length}
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
            }}
          >
            {availableIntegrations.map((int, i) => (
              <IntegrationCard
                key={int.id}
                integration={int}
                connected={false}
                onConfigure={() => {}}
                onConnect={() => {}}
                animDelay={350 + i * 60}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Overlay + Config Panel */}
      {configuring && (
        <>
          <div
            onClick={closeConfig}
            style={{
              position: "fixed",
              inset: 0,
              background: overlayVisible ? "rgba(0,0,0,0.5)" : "transparent",
              zIndex: 40,
              transition: "background 0.2s",
              cursor: "pointer",
            }}
          />
          <ConfigPanel integration={configuring} onClose={closeConfig} />
        </>
      )}
    </div>
  );
}
