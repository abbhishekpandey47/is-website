"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  User,
  Users,
  MessageSquare,
  Bell,
  Clock,
  Eye,
  EyeOff,
  X,
  Plus,
  Minus,
  ChevronDown,
  Save,
  Send,
} from "lucide-react";

const FONT = "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const TABULAR = "tabular-nums";

const COLORS = {
  bg: "#0a0a0a",
  surface: "rgba(255,255,255,0.02)",
  border: "rgba(255,255,255,0.06)",
  borderHover: "rgba(255,255,255,0.12)",
  textPrimary: "#ededed",
  textSecondary: "rgba(255,255,255,0.6)",
  textTertiary: "rgba(255,255,255,0.4)",
  textMuted: "rgba(255,255,255,0.25)",
  inputBg: "rgba(255,255,255,0.04)",
  inputBorder: "rgba(255,255,255,0.08)",
  inputFocus: "rgba(255,255,255,0.2)",
  toggleOn: "#34d399",
  toggleOff: "rgba(255,255,255,0.1)",
  tabActiveBg: "rgba(255,255,255,0.06)",
  tabHoverBg: "rgba(255,255,255,0.03)",
  danger: "#f87171",
  blue: "#60a5fa",
};

/* ─── tiny reusable pieces ──────────────────────────────────── */

function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontFamily: FONT,
        fontSize: 15,
        fontWeight: 600,
        color: COLORS.textPrimary,
        margin: 0,
        marginBottom: 20,
      }}
    >
      {children}
    </h2>
  );
}

function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: "block",
        fontFamily: FONT,
        fontSize: 13,
        fontWeight: 500,
        color: COLORS.textSecondary,
        marginBottom: 6,
      }}
    >
      {children}
    </label>
  );
}

function TextInput({ id, type = "text", value, onChange, placeholder, readOnly, onKeyDown, style: extra }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      onKeyDown={onKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        fontFamily: FONT,
        fontSize: 13,
        fontVariantNumeric: TABULAR,
        color: COLORS.textPrimary,
        backgroundColor: readOnly ? COLORS.inputBg : COLORS.inputBg,
        border: `1px solid ${focused ? COLORS.inputFocus : COLORS.inputBorder}`,
        borderRadius: 7,
        height: 36,
        padding: "0 12px",
        width: "100%",
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.15s",
        ...(readOnly
          ? { cursor: "default", opacity: 0.7, fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace" }
          : {}),
        ...extra,
      }}
    />
  );
}

function TextArea({ id, value, onChange, placeholder, rows = 4 }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        fontFamily: FONT,
        fontSize: 13,
        color: COLORS.textPrimary,
        backgroundColor: COLORS.inputBg,
        border: `1px solid ${focused ? COLORS.inputFocus : COLORS.inputBorder}`,
        borderRadius: 7,
        padding: "8px 12px",
        width: "100%",
        outline: "none",
        boxSizing: "border-box",
        resize: "none",
        transition: "border-color 0.15s",
        lineHeight: 1.5,
      }}
    />
  );
}

function PrimaryButton({ children, onClick, style: extra }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: FONT,
        fontSize: 13,
        fontWeight: 600,
        color: COLORS.bg,
        backgroundColor: hovered ? "#ffffff" : COLORS.textPrimary,
        border: "none",
        borderRadius: 7,
        height: 36,
        padding: "0 16px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "background-color 0.15s",
        ...extra,
      }}
    >
      {children}
    </button>
  );
}

function Toggle({ value, onChange }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => onChange(!value)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 36,
        height: 20,
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        backgroundColor: value ? COLORS.toggleOn : COLORS.toggleOff,
        position: "relative",
        transition: "background-color 0.15s",
        flexShrink: 0,
        padding: 0,
        outline: hovered ? `1px solid ${COLORS.borderHover}` : "none",
        outlineOffset: 1,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: value ? 18 : 2,
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          transition: "left 0.15s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
}

function RoleSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const roles = ["Admin", "Editor", "Viewer"];

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", minWidth: 100 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          fontFamily: FONT,
          fontSize: 12,
          color: COLORS.textPrimary,
          backgroundColor: COLORS.inputBg,
          border: `1px solid ${open ? COLORS.inputFocus : COLORS.inputBorder}`,
          borderRadius: 6,
          height: 30,
          padding: "0 8px",
          width: "100%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          transition: "border-color 0.15s",
          outline: "none",
        }}
      >
        <span>{value}</span>
        <ChevronDown size={12} style={{ opacity: 0.4 }} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 4,
            backgroundColor: "#1a1a1a",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 7,
            overflow: "hidden",
            zIndex: 50,
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          {roles.map((r) => (
            <div
              key={r}
              onClick={() => {
                onChange(r);
                setOpen(false);
              }}
              style={{
                fontFamily: FONT,
                fontSize: 12,
                padding: "6px 10px",
                cursor: "pointer",
                color: r === value ? COLORS.textPrimary : COLORS.textSecondary,
                backgroundColor: r === value ? COLORS.tabActiveBg : "transparent",
                transition: "background-color 0.1s",
              }}
              onMouseEnter={(e) => {
                if (r !== value) e.currentTarget.style.backgroundColor = COLORS.tabHoverBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = r === value ? COLORS.tabActiveBg : "transparent";
              }}
            >
              {r}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── TAB: Profile ──────────────────────────────────────────── */

function ProfileTab() {
  const [name, setName] = useState("Jamie Rodriguez");
  const [email, setEmail] = useState("jamie@infrasity.com");

  return (
    <div>
      <SectionTitle>Profile</SectionTitle>

      {/* Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: 20,
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            JR
          </span>
        </div>
        <div>
          <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 500, color: COLORS.textPrimary }}>
            {name || "Your Name"}
          </div>
          <div style={{ fontFamily: FONT, fontSize: 12, color: COLORS.textTertiary, marginTop: 2 }}>
            {email || "your@email.com"}
          </div>
        </div>
      </div>

      {/* Form fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 420 }}>
        <div>
          <Label htmlFor="profile-name">Full Name</Label>
          <TextInput
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div>
          <Label htmlFor="profile-email">Email Address</Label>
          <TextInput
            id="profile-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <Label htmlFor="profile-admin">Admin ID</Label>
          <TextInput
            id="profile-admin"
            value="ADM-0041"
            readOnly
            onChange={() => {}}
            style={{
              backgroundColor: COLORS.inputBg,
              borderColor: "rgba(255,255,255,0.06)",
            }}
          />
        </div>

        <div style={{ marginTop: 4 }}>
          <PrimaryButton>
            <Save size={14} />
            Save Changes
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

/* ─── TAB: Team ─────────────────────────────────────────────── */

function TeamTab() {
  const [members, setMembers] = useState([
    { id: 1, name: "Jamie Rodriguez", email: "jamie@infrasity.com", role: "Admin", lastActive: "Today" },
    { id: 2, name: "Alex Chen", email: "alex@infrasity.com", role: "Editor", lastActive: "2 days ago" },
    { id: 3, name: "Sam Patel", email: "sam@infrasity.com", role: "Viewer", lastActive: "1 week ago" },
    { id: 4, name: "Jordan Lee", email: "jordan@infrasity.com", role: "Editor", lastActive: "3 days ago" },
  ]);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Editor");
  const [hoveredRemove, setHoveredRemove] = useState(null);

  const removeMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const sendInvite = () => {
    if (!inviteEmail.trim()) return;
    const newMember = {
      id: Date.now(),
      name: inviteEmail.split("@")[0],
      email: inviteEmail.trim(),
      role: inviteRole,
      lastActive: "Invited",
    };
    setMembers((prev) => [...prev, newMember]);
    setInviteEmail("");
    setInviteRole("Editor");
    setShowInvite(false);
  };

  const cellStyle = {
    fontFamily: FONT,
    fontSize: 13,
    padding: "10px 12px",
    borderBottom: `1px solid ${COLORS.border}`,
    fontVariantNumeric: TABULAR,
  };

  const headerCell = {
    ...cellStyle,
    color: COLORS.textTertiary,
    fontWeight: 500,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  return (
    <div>
      <SectionTitle>Team Members</SectionTitle>

      {/* Table */}
      <div
        style={{
          border: `1px solid ${COLORS.border}`,
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: COLORS.surface }}>
              <th style={{ ...headerCell, textAlign: "left" }}>Name</th>
              <th style={{ ...headerCell, textAlign: "left" }}>Email</th>
              <th style={{ ...headerCell, textAlign: "left" }}>Role</th>
              <th style={{ ...headerCell, textAlign: "left" }}>Last Active</th>
              <th style={{ ...headerCell, textAlign: "center", width: 60 }}>Remove</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td style={{ ...cellStyle, color: COLORS.textPrimary, fontWeight: 500 }}>{m.name}</td>
                <td style={{ ...cellStyle, color: COLORS.textSecondary }}>{m.email}</td>
                <td style={{ ...cellStyle }}>
                  <RoleSelect
                    value={m.role}
                    onChange={(newRole) =>
                      setMembers((prev) =>
                        prev.map((x) => (x.id === m.id ? { ...x, role: newRole } : x))
                      )
                    }
                  />
                </td>
                <td style={{ ...cellStyle, color: COLORS.textTertiary }}>{m.lastActive}</td>
                <td style={{ ...cellStyle, textAlign: "center" }}>
                  <button
                    onClick={() => removeMember(m.id)}
                    onMouseEnter={() => setHoveredRemove(m.id)}
                    onMouseLeave={() => setHoveredRemove(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 4,
                      borderRadius: 4,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: hoveredRemove === m.id ? COLORS.danger : COLORS.textTertiary,
                      transition: "color 0.15s",
                    }}
                  >
                    <X size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite button / form */}
      {!showInvite ? (
        <PrimaryButton onClick={() => setShowInvite(true)}>
          <Plus size={14} />
          Invite Member
        </PrimaryButton>
      ) : (
        <div
          style={{
            overflow: "hidden",
            animation: "slideDown 0.2s ease-out",
          }}
        >
          <style>{`
            @keyframes slideDown {
              from { opacity: 0; max-height: 0; transform: translateY(-8px); }
              to { opacity: 1; max-height: 200px; transform: translateY(0); }
            }
          `}</style>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 10,
              padding: 16,
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
            }}
          >
            <div style={{ flex: 1 }}>
              <Label htmlFor="invite-email">Email Address</Label>
              <TextInput
                id="invite-email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="colleague@company.com"
              />
            </div>
            <div style={{ width: 130 }}>
              <Label>Role</Label>
              <RoleSelect value={inviteRole} onChange={setInviteRole} />
            </div>
            <PrimaryButton onClick={sendInvite} style={{ height: 36 }}>
              <Send size={13} />
              Send Invite
            </PrimaryButton>
            <button
              onClick={() => {
                setShowInvite(false);
                setInviteEmail("");
              }}
              style={{
                background: "none",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 7,
                height: 36,
                width: 36,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLORS.textTertiary,
                flexShrink: 0,
              }}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── TAB: Reddit ───────────────────────────────────────────── */

function RedditTab() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("sk-reddit-a7b2c9d4e1f03f8a");
  const [subreddits, setSubreddits] = useState([
    "r/programming",
    "r/webdev",
    "r/startups",
    "r/SaaS",
    "r/devops",
  ]);
  const [newSub, setNewSub] = useState("");
  const [guidelines, setGuidelines] = useState("");

  const maskedKey = "sk-reddit-" + "\u2022".repeat(10) + apiKey.slice(-4);

  const addSub = () => {
    const val = newSub.trim();
    if (!val) return;
    const formatted = val.startsWith("r/") ? val : `r/${val}`;
    if (!subreddits.includes(formatted)) {
      setSubreddits((prev) => [...prev, formatted]);
    }
    setNewSub("");
  };

  const removeSub = (sub) => {
    setSubreddits((prev) => prev.filter((s) => s !== sub));
  };

  return (
    <div>
      <SectionTitle>Reddit Configuration</SectionTitle>

      {/* Connection status */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          backgroundColor: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: COLORS.toggleOn,
            flexShrink: 0,
            boxShadow: `0 0 6px ${COLORS.toggleOn}`,
          }}
        />
        <span
          style={{
            fontFamily: FONT,
            fontSize: 12,
            fontWeight: 600,
            color: COLORS.toggleOn,
            backgroundColor: "rgba(52,211,153,0.1)",
            padding: "2px 8px",
            borderRadius: 4,
          }}
        >
          Connected
        </span>
        <span style={{ fontFamily: FONT, fontSize: 13, color: COLORS.textSecondary }}>
          u/infrasity-bot
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 480 }}>
        {/* API Key */}
        <div>
          <Label htmlFor="api-key">API Key</Label>
          <div style={{ position: "relative" }}>
            <TextInput
              id="api-key"
              value={showApiKey ? apiKey : maskedKey}
              onChange={(e) => {
                if (showApiKey) setApiKey(e.target.value);
              }}
              readOnly={!showApiKey}
              style={{ paddingRight: 40 }}
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: COLORS.textTertiary,
                padding: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {/* Default Subreddits */}
        <div>
          <Label>Default Subreddits</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
            {subreddits.map((sub) => (
              <span
                key={sub}
                style={{
                  fontFamily: FONT,
                  fontSize: 12,
                  color: COLORS.textPrimary,
                  backgroundColor: "rgba(255,255,255,0.06)",
                  padding: "4px 8px",
                  borderRadius: 5,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {sub}
                <button
                  onClick={() => removeSub(sub)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: COLORS.textTertiary,
                    padding: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    lineHeight: 1,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.danger)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textTertiary)}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <TextInput
              value={newSub}
              onChange={(e) => setNewSub(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addSub();
              }}
              placeholder="Add subreddit..."
              style={{ maxWidth: 200 }}
            />
            <button
              onClick={addSub}
              style={{
                fontFamily: FONT,
                fontSize: 12,
                color: COLORS.textSecondary,
                backgroundColor: COLORS.inputBg,
                border: `1px solid ${COLORS.inputBorder}`,
                borderRadius: 6,
                height: 36,
                padding: "0 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Plus size={12} />
              Add
            </button>
          </div>
        </div>

        {/* Posting Guidelines */}
        <div>
          <Label htmlFor="guidelines">Posting Guidelines</Label>
          <TextArea
            id="guidelines"
            value={guidelines}
            onChange={(e) => setGuidelines(e.target.value)}
            placeholder="Enter any posting guidelines or rules to follow..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── TAB: Notifications ────────────────────────────────────── */

function NotificationsTab() {
  const [toggles, setToggles] = useState({
    slack: true,
    dailyEmail: false,
    weekly: true,
    removal: true,
    targetHit: false,
  });

  const items = [
    {
      key: "slack",
      label: "Slack alerts",
      desc: "Get notified when cadence drops below threshold",
    },
    {
      key: "dailyEmail",
      label: "Daily email digest",
      desc: "Receive a summary of all activity each morning",
    },
    {
      key: "weekly",
      label: "Weekly summary",
      desc: "End-of-week report sent every Friday",
    },
    {
      key: "removal",
      label: "Removal alerts",
      desc: "Immediate notification when a Reddit post is removed",
    },
    {
      key: "targetHit",
      label: "Target hit alerts",
      desc: "Celebrate when a client reaches their monthly target",
    },
  ];

  return (
    <div>
      <SectionTitle>Notifications</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 480 }}>
        {items.map((item, i) => (
          <div
            key={item.key}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 0",
              borderBottom: i < items.length - 1 ? `1px solid ${COLORS.border}` : "none",
            }}
          >
            <div style={{ flex: 1, marginRight: 16 }}>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 13,
                  fontWeight: 500,
                  color: COLORS.textPrimary,
                  marginBottom: 2,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 12,
                  color: COLORS.textTertiary,
                  lineHeight: 1.4,
                }}
              >
                {item.desc}
              </div>
            </div>
            <Toggle
              value={toggles[item.key]}
              onChange={(val) => setToggles((prev) => ({ ...prev, [item.key]: val }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── TAB: Cadence Defaults ─────────────────────────────────── */

function CadenceDefaultsTab() {
  const [monthlyLimit, setMonthlyLimit] = useState(8);
  const [threshold, setThreshold] = useState(75);
  const [distribution, setDistribution] = useState("even");
  const sliderRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const updateThresholdFromEvent = useCallback(
    (clientX) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const pct = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
      setThreshold(Math.round(pct));
    },
    []
  );

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      e.preventDefault();
      updateThresholdFromEvent(e.clientX);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, updateThresholdFromEvent]);

  const distributions = [
    { key: "even", label: "Even", bars: [1, 1, 1, 1] },
    { key: "front", label: "Front-loaded", bars: [1, 0.75, 0.45, 0.2] },
    { key: "back", label: "Back-loaded", bars: [0.2, 0.45, 0.75, 1] },
  ];

  return (
    <div>
      <SectionTitle>Cadence Defaults</SectionTitle>

      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 480 }}>
        {/* Monthly limit */}
        <div>
          <Label>Default Monthly Limit</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <button
              onClick={() => setMonthlyLimit((v) => Math.max(0, v - 1))}
              style={{
                width: 36,
                height: 36,
                border: `1px solid ${COLORS.inputBorder}`,
                borderRadius: "7px 0 0 7px",
                backgroundColor: COLORS.inputBg,
                color: COLORS.textSecondary,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Minus size={14} />
            </button>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 600,
                fontVariantNumeric: TABULAR,
                color: COLORS.textPrimary,
                backgroundColor: COLORS.inputBg,
                borderTop: `1px solid ${COLORS.inputBorder}`,
                borderBottom: `1px solid ${COLORS.inputBorder}`,
                height: 36,
                minWidth: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                userSelect: "none",
              }}
            >
              {monthlyLimit}
            </div>
            <button
              onClick={() => setMonthlyLimit((v) => v + 1)}
              style={{
                width: 36,
                height: 36,
                border: `1px solid ${COLORS.inputBorder}`,
                borderRadius: "0 7px 7px 0",
                backgroundColor: COLORS.inputBg,
                color: COLORS.textSecondary,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Plus size={14} />
            </button>
            <span
              style={{
                fontFamily: FONT,
                fontSize: 12,
                color: COLORS.textTertiary,
                marginLeft: 10,
              }}
            >
              posts / month
            </span>
          </div>
        </div>

        {/* Alert threshold slider */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <Label>Alert Threshold</Label>
            <span
              style={{
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 600,
                fontVariantNumeric: TABULAR,
                color: COLORS.toggleOn,
              }}
            >
              {threshold}%
            </span>
          </div>
          <div
            ref={sliderRef}
            onClick={(e) => updateThresholdFromEvent(e.clientX)}
            style={{
              position: "relative",
              height: 6,
              backgroundColor: COLORS.toggleOff,
              borderRadius: 3,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {/* Filled track */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${threshold}%`,
                backgroundColor: COLORS.toggleOn,
                borderRadius: 3,
                transition: dragging ? "none" : "width 0.1s",
              }}
            />
            {/* Thumb */}
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: `${threshold}%`,
                transform: "translate(-50%, -50%)",
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                cursor: "grab",
                transition: dragging ? "none" : "left 0.1s",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            <span style={{ fontFamily: FONT, fontSize: 11, color: COLORS.textMuted, fontVariantNumeric: TABULAR }}>
              0%
            </span>
            <span style={{ fontFamily: FONT, fontSize: 11, color: COLORS.textMuted, fontVariantNumeric: TABULAR }}>
              100%
            </span>
          </div>
        </div>

        {/* Weekly distribution */}
        <div>
          <Label>Weekly Distribution</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            {distributions.map((d) => (
              <label
                key={d.key}
                onClick={() => setDistribution(d.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: `1px solid ${distribution === d.key ? "rgba(255,255,255,0.12)" : COLORS.border}`,
                  backgroundColor: distribution === d.key ? COLORS.tabActiveBg : "transparent",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {/* Radio circle */}
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: `2px solid ${distribution === d.key ? COLORS.blue : COLORS.textTertiary}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "border-color 0.15s",
                  }}
                >
                  {distribution === d.key && (
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: COLORS.blue,
                      }}
                    />
                  )}
                </span>

                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 13,
                    color: distribution === d.key ? COLORS.textPrimary : COLORS.textSecondary,
                    fontWeight: distribution === d.key ? 500 : 400,
                    minWidth: 100,
                  }}
                >
                  {d.label}
                </span>

                {/* Preview bars */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 3,
                    height: 30,
                    marginLeft: "auto",
                  }}
                >
                  {d.bars.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: 8,
                        height: Math.max(4, h * 30),
                        backgroundColor: distribution === d.key ? COLORS.blue : "rgba(96,165,250,0.3)",
                        borderRadius: 2,
                        transition: "background-color 0.15s, height 0.15s",
                      }}
                    />
                  ))}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────── */

const TABS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "team", label: "Team", icon: Users },
  { key: "reddit", label: "Reddit", icon: MessageSquare },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "cadence", label: "Cadence Defaults", icon: Clock },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [hoveredTab, setHoveredTab] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "team":
        return <TeamTab />;
      case "reddit":
        return <RedditTab />;
      case "notifications":
        return <NotificationsTab />;
      case "cadence":
        return <CadenceDefaultsTab />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: COLORS.bg,
        fontFamily: FONT,
        color: COLORS.textPrimary,
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: `1px solid ${COLORS.border}`,
          padding: "16px 24px",
        }}
      >
        <h1
          style={{
            fontFamily: FONT,
            fontSize: 16,
            fontWeight: 600,
            color: COLORS.textPrimary,
            margin: 0,
          }}
        >
          Settings
        </h1>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 13,
            color: COLORS.textTertiary,
            margin: "4px 0 0 0",
          }}
        >
          Manage your workspace, team, and integrations
        </p>
      </div>

      {/* Body: sidebar + content */}
      <div
        style={{
          display: "flex",
          padding: 24,
          gap: 32,
          maxWidth: 960,
        }}
      >
        {/* Left tab nav */}
        <nav
          style={{
            width: 200,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            const isHovered = hoveredTab === tab.key;
            const IconComp = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                onMouseEnter={() => setHoveredTab(tab.key)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{
                  fontFamily: FONT,
                  fontSize: 13,
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "#ffffff" : COLORS.textTertiary,
                  backgroundColor: isActive
                    ? COLORS.tabActiveBg
                    : isHovered
                    ? COLORS.tabHoverBg
                    : "transparent",
                  border: "none",
                  borderRadius: 7,
                  padding: "8px 12px",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.12s",
                }}
              >
                <IconComp size={14} style={{ opacity: isActive ? 0.9 : 0.5 }} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right content */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: "4px 0",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
