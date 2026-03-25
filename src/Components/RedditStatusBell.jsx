"use client";

import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import {
  AlertTriangle,
  Bell,
  CheckCheck,
  ExternalLink,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const STATUS_COLORS = {
  removed: { dot: "bg-[#f87171]", text: "text-[#f87171]", label: "Removed" },
  deleted: { dot: "bg-[#fb923c]", text: "text-[#fb923c]", label: "Deleted" },
  live:    { dot: "bg-[#34d399]", text: "text-[#34d399]", label: "Live" },
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function StatusPill({ status }) {
  const cfg = STATUS_COLORS[status?.toLowerCase?.()] || { dot: "bg-[rgba(255,255,255,0.25)]", text: "text-[rgba(255,255,255,0.4)]", label: status };
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${cfg.text} capitalize`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export function RedditStatusBell({ companyId }) {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [changes, setChanges] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  const [checkResult, setCheckResult] = useState(null);

  // Refs to avoid stale closures and prevent memory leaks
  const mountedRef = useRef(true);
  const markReadTimerRef = useRef(null);
  const firebaseUserRef = useRef(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (markReadTimerRef.current) clearTimeout(markReadTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      firebaseUserRef.current = user;
      if (mountedRef.current) setFirebaseUser(user);
    });
    return () => unsub();
  }, []);

  const getToken = useCallback(async () => {
    const user = firebaseUserRef.current;
    if (!user) return null;
    try { return await user.getIdToken(); } catch { return null; }
  }, []);

  const fetchChanges = useCallback(async () => {
    const token = await getToken();
    if (!token || !mountedRef.current) return;
    if (mountedRef.current) setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "30" });
      if (companyId) params.set("companyId", companyId);
      const res = await fetch(`/api/reddit/status-changes?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok || !mountedRef.current) return;
      const { data, unreadCount: uc } = await res.json();
      if (mountedRef.current) {
        setChanges(data || []);
        setUnreadCount(uc || 0);
      }
    } catch (e) {
      console.error("[RedditStatusBell] fetchChanges error:", e);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [getToken, companyId]);

  // Poll every 5 minutes — use a ref for fetchChanges to avoid restarting the interval
  const fetchChangesRef = useRef(fetchChanges);
  useEffect(() => { fetchChangesRef.current = fetchChanges; }, [fetchChanges]);

  useEffect(() => {
    if (!firebaseUser) return;
    fetchChangesRef.current();
    const interval = setInterval(() => fetchChangesRef.current(), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [firebaseUser]); // only restart when auth state changes, not on fetchChanges recreate

  const doMarkAllRead = useCallback(async () => {
    const token = await getToken();
    if (!token || !mountedRef.current) return;
    try {
      await fetch("/api/reddit/status-changes", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (mountedRef.current) {
        setUnreadCount(0);
        setChanges(prev => prev.map(c => ({ ...c, is_read: true })));
      }
    } catch (e) {
      console.error("[RedditStatusBell] markAllRead error:", e);
    }
  }, [getToken]);

  // When popover opens: refresh, then mark as read after 1.5s delay
  // When popover closes: cancel the pending mark-read timer
  const handleOpenChange = useCallback(async (val) => {
    setOpen(val);
    if (val) {
      await fetchChanges();
      if (markReadTimerRef.current) clearTimeout(markReadTimerRef.current);
      markReadTimerRef.current = setTimeout(() => {
        if (mountedRef.current) doMarkAllRead();
      }, 1500);
    } else {
      // Popover closed — cancel mark-read if it hasn't fired yet
      if (markReadTimerRef.current) clearTimeout(markReadTimerRef.current);
    }
  }, [fetchChanges, doMarkAllRead]);

  const runCheck = useCallback(async () => {
    const token = await getToken();
    if (!token || checking) return;
    setChecking(true);
    setCheckResult(null);
    try {
      const body = companyId ? { companyId } : {};
      const res = await fetch("/api/reddit/check-live-status", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!mountedRef.current) return;
      const data = await res.json();
      setLastChecked(new Date());
      setCheckResult({ checked: data.checked || 0, changesCount: (data.changes || []).length });
      await fetchChanges();
    } catch (e) {
      console.error("[RedditStatusBell] check error:", e);
    } finally {
      if (mountedRef.current) setChecking(false);
    }
  }, [getToken, checking, companyId, fetchChanges]);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          className="relative h-8 w-8 inline-flex items-center justify-center rounded-[7px] text-[rgba(255,255,255,0.4)] hover:text-[#ededed] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
          aria-label="Reddit status notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 rounded-full bg-[#f87171] text-[#0a0a0a] text-[10px] font-bold flex items-center justify-center px-1 leading-none">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[380px] p-0 bg-[#141414] border border-[rgba(255,255,255,0.08)] shadow-[0_16px_48px_rgba(0,0,0,0.6)] rounded-xl overflow-hidden"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
          <div>
            <p className="text-[13px] font-semibold text-[#ededed]">Reddit Status Alerts</p>
            {lastChecked && (
              <p className="text-[11px] text-[rgba(255,255,255,0.3)] mt-0.5">
                Last checked {timeAgo(lastChecked.toISOString())}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <button
                onClick={doMarkAllRead}
                className="h-7 px-2.5 inline-flex items-center gap-1.5 text-[11px] text-[rgba(255,255,255,0.4)] hover:text-[#ededed] hover:bg-[rgba(255,255,255,0.04)] rounded-[6px] transition-colors"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark read
              </button>
            )}
            <button
              onClick={runCheck}
              disabled={checking}
              className="h-7 px-2.5 inline-flex items-center gap-1.5 text-[11px] text-[rgba(255,255,255,0.4)] hover:text-[#ededed] hover:bg-[rgba(255,255,255,0.04)] rounded-[6px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checking ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
              {checking ? "Checking…" : "Check now"}
            </button>
          </div>
        </div>

        {/* Check result banner */}
        {checkResult && (
          <div className={`mx-3 mt-3 px-3 py-2 rounded-[7px] text-[12px] flex items-center gap-2 ${checkResult.changesCount > 0 ? "bg-[rgba(248,113,113,0.1)] text-[#f87171] border border-[rgba(248,113,113,0.2)]" : "bg-[rgba(52,211,153,0.08)] text-[#34d399] border border-[rgba(52,211,153,0.15)]"}`}>
            {checkResult.changesCount > 0 ? (
              <>
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                {checkResult.changesCount} change{checkResult.changesCount !== 1 ? "s" : ""} detected across {checkResult.checked} items
              </>
            ) : (
              <>
                <CheckCheck className="h-3.5 w-3.5 shrink-0" />
                All {checkResult.checked} posted item{checkResult.checked !== 1 ? "s" : ""} are live
              </>
            )}
          </div>
        )}

        {/* Content */}
        {loading && changes.length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-5 w-5 animate-spin text-[rgba(255,255,255,0.25)]" />
          </div>
        ) : changes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <Bell className="h-8 w-8 text-[rgba(255,255,255,0.1)] mb-3" />
            <p className="text-[13px] text-[rgba(255,255,255,0.4)]">No status changes yet</p>
            <p className="text-[11px] text-[rgba(255,255,255,0.2)] mt-1">Click "Check now" to scan all posted content</p>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[360px]">
            <div className="p-3 space-y-1.5">
              {changes.map((change) => (
                <div
                  key={change.id}
                  className={`relative rounded-[8px] px-3 py-2.5 border transition-colors ${
                    !change.is_read
                      ? "bg-[rgba(248,113,113,0.06)] border-[rgba(248,113,113,0.15)]"
                      : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.04)]"
                  }`}
                >
                  {!change.is_read && (
                    <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#f87171]" />
                  )}
                  <div className="min-w-0 pr-4">
                    <p className="text-[12px] font-medium text-[#ededed] truncate leading-snug">
                      {change.content_title || "Untitled"}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.35)] capitalize py-0">
                        {change.content_type}
                      </Badge>
                      <StatusPill status={change.old_status} />
                      <span className="text-[rgba(255,255,255,0.2)] text-[10px]">→</span>
                      <StatusPill status={change.new_status} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-[rgba(255,255,255,0.25)]">{timeAgo(change.changed_at)}</span>
                    <a
                      href={change.posted_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] text-[rgba(255,255,255,0.3)] hover:text-[#60a5fa] transition-colors"
                    >
                      <ExternalLink className="h-2.5 w-2.5" />
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between">
          <span className="text-[11px] text-[rgba(255,255,255,0.25)]">
            {changes.length > 0 ? `${changes.length} recent change${changes.length !== 1 ? "s" : ""}` : "No changes yet"}
          </span>
          <button
            onClick={() => { setOpen(false); router.push("/threadflow/status-changes"); }}
            className="text-[11px] text-[rgba(255,255,255,0.35)] hover:text-[#60a5fa] transition-colors"
          >
            View all →
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
