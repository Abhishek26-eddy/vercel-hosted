"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Order } from "@/lib/database.types";
import {
  LogOut, RefreshCw, Package, Clock, CheckCircle2,
  Truck, XCircle, Eye, Film, Search, Filter,
} from "lucide-react";

const STATUS_BADGES: Record<string, { label: string; bg: string; color: string }> = {
  new: { label: "New", bg: "#dbeafe", color: "#1d4ed8" },
  in_progress: { label: "In Progress", bg: "#fef3c7", color: "#b45309" },
  review: { label: "Review", bg: "#e0e7ff", color: "#4338ca" },
  delivered: { label: "Delivered", bg: "#dcfce7", color: "#16a34a" },
  cancelled: { label: "Cancelled", bg: "#fee2e2", color: "#dc2626" },
};

const PAYMENT_BADGES: Record<string, { label: string; bg: string; color: string }> = {
  pending: { label: "Pending", bg: "#fef3c7", color: "#b45309" },
  paid: { label: "Paid", bg: "#dbeafe", color: "#1d4ed8" },
  verified: { label: "Verified", bg: "#dcfce7", color: "#16a34a" },
  refunded: { label: "Refunded", bg: "#fee2e2", color: "#dc2626" },
};

const STATUS_ICONS: Record<string, typeof Package> = {
  new: Package, in_progress: Clock, review: Eye, delivered: Truck, cancelled: XCircle,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [authChecked, setAuthChecked] = useState(false);

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) { router.push("/admin/login"); return; }
      supabase.from("admin_profiles").select("role").eq("id", data.session.user.id).single()
        .then(({ data: profile }) => {
          if (!profile) { router.push("/admin/login"); return; }
          setAuthChecked(true);
        });
    });
  }, [router]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders${statusFilter !== "all" ? `?status=${statusFilter}` : ""}`);
      const json = await res.json();
      setOrders(json.orders || []);
    } catch (err) { console.error(err); }
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => { if (authChecked) fetchOrders(); }, [authChecked, fetchOrders]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const filtered = orders.filter((o) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      o.groom_name.toLowerCase().includes(q) ||
      o.bride_name.toLowerCase().includes(q) ||
      o.theme_name?.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q) ||
      o.customer_phone?.toLowerCase().includes(q) ||
      o.customer_email?.toLowerCase().includes(q)
    );
  });

  const stats = {
    total: orders.length,
    new: orders.filter((o) => o.order_status === "new").length,
    inProgress: orders.filter((o) => o.order_status === "in_progress").length,
    delivered: orders.filter((o) => o.order_status === "delivered").length,
  };

  if (!authChecked) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: "#faf8f4" }}>
      <RefreshCw size={20} className="animate-spin" style={{ color: "#9c7f54" }} />
    </div>;
  }

  return (
    <div className="min-h-screen" style={{ background: "#f4f0ea" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 backdrop-blur-xl" style={{ background: "#faf8f4E8", borderBottom: "1px solid #e0d6c4" }}>
        <div>
          <h1 className="font-serif text-lg" style={{ color: "#1a1816" }}>Admin Dashboard</h1>
          <p className="text-[10px]" style={{ color: "#9a9189" }}>The Digital Inviters</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchOrders} className="flex items-center gap-1 rounded-lg px-3 py-2 text-[11px] font-medium" style={{ background: "#eae5dc", color: "#57504a" }}>
            <RefreshCw size={12} /> Refresh
          </button>
          <button onClick={handleLogout} className="flex items-center gap-1 rounded-lg px-3 py-2 text-[11px] font-medium" style={{ background: "#fee2e2", color: "#dc2626" }}>
            <LogOut size={12} /> Logout
          </button>
        </div>
      </header>

      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Orders", value: stats.total, icon: Package, color: "#9c7f54" },
            { label: "New", value: stats.new, icon: Package, color: "#1d4ed8" },
            { label: "In Progress", value: stats.inProgress, icon: Clock, color: "#b45309" },
            { label: "Delivered", value: stats.delivered, icon: CheckCircle2, color: "#16a34a" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-4" style={{ background: "#fffdfb", border: "1px solid #e0d6c4" }}>
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={14} style={{ color: s.color }} />
                <span className="text-[10px] font-medium uppercase tracking-wide" style={{ color: "#9a9189" }}>{s.label}</span>
              </div>
              <span className="font-serif text-2xl" style={{ color: "#1a1816" }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9a9189" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border pl-9 pr-4 py-2.5 text-[13px] outline-none focus:border-[#9c7f54]"
              style={{ borderColor: "#e0d6c4", background: "#fffdfb", color: "#1a1816" }}
              placeholder="Search by name, phone, email, or order ID..."
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter size={12} style={{ color: "#9a9189" }} />
            {["all", "new", "in_progress", "review", "delivered", "cancelled"].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className="rounded-full px-3 py-1.5 text-[10px] font-medium capitalize transition-colors"
                style={{
                  background: statusFilter === s ? "#1a1816" : "#eae5dc",
                  color: statusFilter === s ? "#faf8f4" : "#57504a",
                }}
              >{s.replace("_", " ")}</button>
            ))}
          </div>
        </div>

        {/* Orders table */}
        {loading ? (
          <div className="py-20 text-center">
            <RefreshCw size={20} className="mx-auto animate-spin" style={{ color: "#9c7f54" }} />
            <p className="mt-3 text-[12px]" style={{ color: "#9a9189" }}>Loading orders...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center rounded-xl" style={{ background: "#fffdfb", border: "1px solid #e0d6c4" }}>
            <Package size={28} className="mx-auto mb-3" style={{ color: "#e0d6c4" }} />
            <p className="text-[13px]" style={{ color: "#9a9189" }}>No orders found</p>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden" style={{ background: "#fffdfb", border: "1px solid #e0d6c4" }}>
            {/* Header row */}
            <div className="hidden sm:grid grid-cols-[1fr_1fr_100px_100px_80px_80px_60px] gap-3 px-4 py-3 text-[9px] font-bold uppercase tracking-[0.15em]" style={{ background: "#f4f0ea", color: "#9a9189", borderBottom: "1px solid #e0d6c4" }}>
              <span>Couple</span><span>Theme</span><span>Tier</span><span>Total</span><span>Payment</span><span>Status</span><span></span>
            </div>

            {filtered.map((order) => {
              const sb = STATUS_BADGES[order.order_status] || STATUS_BADGES.new;
              const pb = PAYMENT_BADGES[order.payment_status] || PAYMENT_BADGES.pending;
              const StatusIcon = STATUS_ICONS[order.order_status] || Package;
              return (
                <Link key={order.id} href={`/admin/orders/${order.id}`}
                  className="block sm:grid sm:grid-cols-[1fr_1fr_100px_100px_80px_80px_60px] gap-3 px-4 py-3.5 transition-colors hover:bg-[#f4f0ea]"
                  style={{ borderBottom: "1px solid #f4f0ea" }}
                >
                  {/* Couple */}
                  <div>
                    <p className="text-[13px] font-medium" style={{ color: "#1a1816" }}>{order.groom_name} & {order.bride_name}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "#9a9189" }}>
                      {new Date(order.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  {/* Theme */}
                  <div className="flex items-center gap-2 mt-1 sm:mt-0">
                    <span className="text-[12px] truncate" style={{ color: "#57504a" }}>{order.theme_name || order.theme_slug}</span>
                    {order.video_addon && <Film size={12} style={{ color: "#9c7f54" }} />}
                  </div>

                  {/* Tier */}
                  <div className="mt-1 sm:mt-0">
                    <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide" style={{ background: order.tier === "luxe" ? "#1a181610" : "#f4f0ea", color: order.tier === "luxe" ? "#9c7f54" : "#9a9189" }}>
                      {order.tier}
                    </span>
                  </div>

                  {/* Total */}
                  <span className="text-[13px] font-medium mt-1 sm:mt-0" style={{ color: "#1a1816" }}>₹{order.total_price_inr}</span>

                  {/* Payment */}
                  <div className="mt-1 sm:mt-0">
                    <span className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase" style={{ background: pb.bg, color: pb.color }}>{pb.label}</span>
                  </div>

                  {/* Status */}
                  <div className="mt-1 sm:mt-0 flex items-center gap-1">
                    <StatusIcon size={10} style={{ color: sb.color }} />
                    <span className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase" style={{ background: sb.bg, color: sb.color }}>{sb.label}</span>
                  </div>

                  {/* Arrow */}
                  <div className="hidden sm:flex items-center justify-end">
                    <Eye size={14} style={{ color: "#9a9189" }} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
