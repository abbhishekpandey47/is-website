"use client";

import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import {
  AlertTriangle,
  Bell,
  CheckCheck,
  ExternalLink,
  Filter,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "../../../Components/ui/badge";
import { Button } from "../../../Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../Components/ui/select";
import { SidebarTrigger } from "../../../Components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { UserProfile } from "../../../Components/UserProfile";
import { getStatusBadge } from "../utils/statusBadge";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function StatusChangesPage() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changes, setChanges] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (!user) window.location.href = "/auth/signin";
    });
    return () => unsub();
  }, []);

  const fetchChanges = useCallback(async () => {
    if (!firebaseUser) return;
    setLoading(true);
    setFetchError(null);
    try {
      const token = await firebaseUser.getIdToken();
      const res = await fetch("/api/reddit/status-changes?limit=200", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) {
        setFetchError(json.error || `API error ${res.status}`);
        return;
      }
      setChanges(json.data || []);
      setUnreadCount(json.unreadCount || 0);
    } catch (e) {
      setFetchError(e.message);
    } finally {
      setLoading(false);
    }
  }, [firebaseUser]);

  useEffect(() => {
    if (firebaseUser) fetchChanges();
  }, [firebaseUser, fetchChanges]);

  const markAllRead = useCallback(async () => {
    if (!firebaseUser) return;
    const token = await firebaseUser.getIdToken();
    await fetch("/api/reddit/status-changes", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    setUnreadCount(0);
    setChanges(prev => prev.map(c => ({ ...c, is_read: true })));
  }, [firebaseUser]);

  const runCheck = useCallback(async () => {
    if (!firebaseUser || checking) return;
    setChecking(true);
    setCheckResult(null);
    try {
      const token = await firebaseUser.getIdToken();
      const res = await fetch("/api/reddit/check-live-status", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setCheckResult({ checked: data.checked || 0, changesCount: (data.changes || []).length });
      await fetchChanges();
    } finally {
      setChecking(false);
    }
  }, [firebaseUser, checking, fetchChanges]);

  const filtered = changes.filter(c => {
    if (filterType !== "all" && c.content_type !== filterType) return false;
    if (filterStatus !== "all" && c.new_status !== filterStatus) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-6 space-y-4 font-geist">
        <div className="animate-pulse h-6 w-48 bg-[rgba(255,255,255,0.04)] rounded-[7px]" />
        <div className="animate-pulse h-10 w-full bg-[rgba(255,255,255,0.04)] rounded-[7px]" />
        <div className="animate-pulse h-10 w-full bg-[rgba(255,255,255,0.04)] rounded-[7px]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-geist">
      {/* Header */}
      <header className="border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-7 w-7 text-[rgba(255,255,255,0.4)] hover:text-[#ededed]" />
            <div>
              <h1 className="text-[16px] font-semibold text-[#ededed]">Reddit Status Changes</h1>
              <p className="text-[13px] text-[rgba(255,255,255,0.4)]">Track removed and deleted posts & comments</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="h-9 px-4 inline-flex items-center gap-2 text-[13px] font-medium text-[rgba(255,255,255,0.5)] hover:text-[#ededed] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.06)] rounded-[7px] transition-colors"
              >
                <CheckCheck className="h-4 w-4" />
                Mark all read ({unreadCount})
              </button>
            )}
            <Button
              onClick={runCheck}
              disabled={checking}
              className="bg-[#ededed] text-[#0a0a0a] font-medium rounded-[7px] hover:bg-[#d4d4d4] text-[13px] h-9 px-4 disabled:opacity-50"
            >
              {checking ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              {checking ? "Checking…" : "Run Status Check"}
            </Button>
            <UserProfile />
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* API error banner */}
        {fetchError && (
          <div className="mb-6 px-4 py-3 rounded-[10px] text-[13px] flex items-start gap-3 bg-[rgba(248,113,113,0.08)] text-[#f87171] border border-[rgba(248,113,113,0.2)]">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Failed to load status changes</p>
              <p className="text-[12px] opacity-80 mt-0.5 font-mono">{fetchError}</p>
              {fetchError.toLowerCase().includes("relation") || fetchError.toLowerCase().includes("does not exist") ? (
                <p className="text-[12px] mt-2 opacity-90">
                  The <code className="bg-[rgba(248,113,113,0.15)] px-1 rounded">reddit_status_changes</code> table is missing.
                  Run the SQL migration from the comment at the top of <code className="bg-[rgba(248,113,113,0.15)] px-1 rounded">src/pages/api/reddit/check-live-status.js</code> in your Supabase SQL editor.
                </p>
              ) : null}
            </div>
          </div>
        )}

        {/* Check result banner */}
        {checkResult && (
          <div className={`mb-6 px-4 py-3 rounded-[10px] text-[13px] flex items-center gap-3 border ${checkResult.changesCount > 0 ? "bg-[rgba(248,113,113,0.08)] text-[#f87171] border-[rgba(248,113,113,0.2)]" : "bg-[rgba(52,211,153,0.06)] text-[#34d399] border-[rgba(52,211,153,0.15)]"}`}>
            {checkResult.changesCount > 0 ? (
              <>
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span><strong>{checkResult.changesCount}</strong> status change{checkResult.changesCount !== 1 ? "s" : ""} detected across <strong>{checkResult.checked}</strong> checked items. Status has been updated automatically.</span>
              </>
            ) : (
              <>
                <CheckCheck className="h-4 w-4 shrink-0" />
                <span>All <strong>{checkResult.checked}</strong> tracked live item{checkResult.checked !== 1 ? "s" : ""} are still live. No changes detected.</span>
              </>
            )}
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Changes", value: changes.length, color: "text-[#ededed]" },
            { label: "Unread", value: unreadCount, color: unreadCount > 0 ? "text-[#f87171]" : "text-[#ededed]" },
            { label: "This Week", value: changes.filter(c => Date.now() - new Date(c.changed_at).getTime() < 7 * 86400 * 1000).length, color: "text-[#ededed]" },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-5 py-4">
              <p className="text-[11px] uppercase tracking-[0.06em] text-[rgba(255,255,255,0.3)] font-medium mb-1">{stat.label}</p>
              <p className={`text-[24px] font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-4 mb-6 flex items-center gap-3">
          <Filter className="h-4 w-4 text-[rgba(255,255,255,0.3)]" />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-36 h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#141414] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              {["all", "post", "comment"].map(v => (
                <SelectItem key={v} value={v} className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed] capitalize">
                  {v === "all" ? "All Types" : v.charAt(0).toUpperCase() + v.slice(1) + "s"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#141414] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              {["all", "removed", "deleted"].map(v => (
                <SelectItem key={v} value={v} className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed] capitalize">
                  {v === "all" ? "All Statuses" : v.charAt(0).toUpperCase() + v.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="text-[12px] text-[rgba(255,255,255,0.3)] ml-auto">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)]">
          <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)]">
            <h2 className="text-[15px] font-semibold text-[#ededed]">Status Change History</h2>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <Bell className="h-10 w-10 text-[rgba(255,255,255,0.06)] mb-4" />
              {changes.length > 0 ? (
                <>
                  <p className="text-[14px] text-[rgba(255,255,255,0.3)]">No results match your filters</p>
                  <p className="text-[12px] text-[rgba(255,255,255,0.2)] mt-1">Try clearing the type/status filters above</p>
                </>
              ) : fetchError ? null : (
                <>
                  <p className="text-[14px] text-[rgba(255,255,255,0.3)]">No status changes recorded yet</p>
                  <p className="text-[12px] text-[rgba(255,255,255,0.2)] mt-1 max-w-sm">
                    Click <strong className="text-[rgba(255,255,255,0.35)]">"Run Status Check"</strong> above to scan all your live posts and comments. Previous records will appear here automatically.
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[rgba(255,255,255,0.06)] hover:bg-transparent">
                    {["", "Title", "Type", "Was", "Now", "Changed", "Link"].map((h, i) => (
                      <TableHead key={i} className="text-[11px] uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)] font-medium">
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((change) => (
                    <TableRow
                      key={change.id}
                      className={`border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors ${!change.is_read ? "bg-[rgba(248,113,113,0.03)]" : ""}`}
                    >
                      <TableCell className="w-6">
                        {!change.is_read && (
                          <span className="inline-block w-2 h-2 rounded-full bg-[#f87171]" />
                        )}
                      </TableCell>
                      <TableCell className="max-w-[220px]">
                        <p className="text-[13px] text-[#ededed] truncate font-medium">
                          {change.content_title || "Untitled"}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize text-[11px] border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.4)]">
                          {change.content_type}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(change.old_status)}</TableCell>
                      <TableCell>{getStatusBadge(change.new_status)}</TableCell>
                      <TableCell className="text-[12px] text-[rgba(255,255,255,0.4)] whitespace-nowrap">
                        {timeAgo(change.changed_at)}
                      </TableCell>
                      <TableCell>
                        <a
                          href={change.posted_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[12px] text-[rgba(255,255,255,0.35)] hover:text-[#60a5fa] transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Reddit
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
