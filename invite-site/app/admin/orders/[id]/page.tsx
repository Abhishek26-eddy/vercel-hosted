"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Order, OrderEvent } from "@/lib/database.types";
import { PORTFOLIO_THEMES } from "@/lib/portfolioThemes";
import VideoPreview from "@/components/video/VideoPreview";
import {
  ArrowLeft, RefreshCw, CheckCircle2, Clock, Truck,
  Package, XCircle, Film, MapPin, Calendar, MessageCircle,
  Save, Eye, CreditCard, Download,
} from "lucide-react";

const STATUS_OPTIONS = ["new", "in_progress", "review", "delivered", "cancelled"];
const PAYMENT_OPTIONS = ["pending", "paid", "verified", "refunded"];

export default function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editStatus, setEditStatus] = useState("");
  const [editPayment, setEditPayment] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editInviteUrl, setEditInviteUrl] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) { router.push("/admin/login"); return; }
      fetchOrder();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrder = async () => {
    setLoading(true);
    const res = await fetch(`/api/orders/${id}`);
    const json = await res.json();
    if (json.order) {
      setOrder(json.order);
      setEditStatus(json.order.order_status);
      setEditPayment(json.order.payment_status);
      setEditNotes(json.order.admin_notes || "");
      setEditInviteUrl(json.order.invite_url || "");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderStatus: editStatus,
        paymentStatus: editPayment,
        adminNotes: editNotes,
        inviteUrl: editInviteUrl,
      }),
    });
    await fetchOrder();
    setSaving(false);
  };

  const theme = order ? PORTFOLIO_THEMES.find((t) => t.slug === order.theme_slug) : null;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#faf8f4" }}>
      <RefreshCw size={20} className="animate-spin" style={{ color: "#9c7f54" }} />
    </div>
  );

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#faf8f4" }}>
      <p style={{ color: "#9a9189" }}>Order not found</p>
    </div>
  );

  const events: OrderEvent[] = Array.isArray(order.events) ? order.events : [];

  return (
    <div className="min-h-screen" style={{ background: "#f4f0ea" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 backdrop-blur-xl" style={{ background: "#faf8f4E8", borderBottom: "1px solid #e0d6c4" }}>
        <Link href="/admin/dashboard" className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: "#9a9189" }}>
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[12px] font-semibold transition-colors disabled:opacity-50"
          style={{ background: "#1a1816", color: "#faf8f4" }}
        >
          <Save size={12} /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </header>

      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          {/* Main content */}
          <div className="space-y-5">
            {/* Order header */}
            <div className="rounded-xl p-5" style={{ background: "#fffdfb", border: "1px solid #e0d6c4" }}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: "#9c7f54" }}>Order</p>
                  <h2 className="mt-1 font-serif text-xl" style={{ color: "#1a1816" }}>{order.groom_name} & {order.bride_name}</h2>
                  <p className="mt-1 text-[11px]" style={{ color: "#9a9189" }}>ID: {order.id}</p>
                  <p className="text-[11px]" style={{ color: "#9a9189" }}>
                    Created: {new Date(order.created_at).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-2xl" style={{ color: "#1a1816" }}>₹{order.total_price_inr}</p>
                  <p className="text-[10px]" style={{ color: "#9a9189" }}>
                    {order.tier.toUpperCase()}{order.video_addon ? " + Video" : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Wedding details */}
            <div className="rounded-xl p-5" style={{ background: "#fffdfb", border: "1px solid #e0d6c4" }}>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#9c7f54" }}>Wedding Details</p>
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <div><span style={{ color: "#9a9189" }}>Groom:</span> <strong style={{ color: "#1a1816" }}>{order.groom_name}</strong></div>
                <div><span style={{ color: "#9a9189" }}>Bride:</span> <strong style={{ color: "#1a1816" }}>{order.bride_name}</strong></div>
                {order.wedding_date && <div><span style={{ color: "#9a9189" }}>Date:</span> <strong style={{ color: "#1a1816" }}>{new Date(order.wedding_date).toLocaleDateString("en-IN", { weekday: "short", year: "numeric", month: "long", day: "numeric" })}</strong></div>}
                {order.venue && <div className="flex items-start gap-1"><MapPin size={11} style={{ color: "#9a9189", marginTop: 2 }} /><span style={{ color: "#1a1816" }}>{order.venue}{order.city ? `, ${order.city}` : ""}</span></div>}
                {order.groom_family && <div><span style={{ color: "#9a9189" }}>Groom Family:</span> <span style={{ color: "#1a1816" }}>{order.groom_family}</span></div>}
                {order.bride_family && <div><span style={{ color: "#9a9189" }}>Bride Family:</span> <span style={{ color: "#1a1816" }}>{order.bride_family}</span></div>}
                {order.dress_code && <div><span style={{ color: "#9a9189" }}>Dress Code:</span> <span style={{ color: "#1a1816" }}>{order.dress_code}</span></div>}
                {order.music_preference && <div><span style={{ color: "#9a9189" }}>Music:</span> <span style={{ color: "#1a1816" }}>{order.music_preference}</span></div>}
                {order.customer_phone && <div><span style={{ color: "#9a9189" }}>Phone:</span> <span style={{ color: "#1a1816" }}>{order.customer_phone}</span></div>}
                {order.customer_email && <div><span style={{ color: "#9a9189" }}>Email:</span> <span style={{ color: "#1a1816" }}>{order.customer_email}</span></div>}
              </div>

              {order.love_story && (
                <div className="mt-4 p-3 rounded-lg" style={{ background: "#f4f0ea" }}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: "#9c7f54" }}>Love Story</p>
                  <p className="text-[12px] italic leading-relaxed" style={{ color: "#57504a" }}>&ldquo;{order.love_story}&rdquo;</p>
                </div>
              )}
            </div>

            {/* Events */}
            {events.length > 0 && (
              <div className="rounded-xl p-5" style={{ background: "#fffdfb", border: "1px solid #e0d6c4" }}>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#9c7f54" }}>Events</p>
                <div className="space-y-2">
                  {events.map((e, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg text-[12px]" style={{ background: "#f4f0ea" }}>
                      <Calendar size={12} style={{ color: "#9c7f54" }} />
                      <span className="font-medium" style={{ color: "#1a1816" }}>{e.name}</span>
                      {e.date && <span style={{ color: "#9a9189" }}>{new Date(e.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>}
                      {e.time && <span style={{ color: "#9a9189" }}>{e.time}</span>}
                      {e.venue && <span style={{ color: "#9a9189" }}>{e.venue}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin controls */}
            <div className="rounded-xl p-5" style={{ background: "#fffdfb", border: "1px solid #e0d6c4" }}>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#9c7f54" }}>Admin Controls</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-[0.1em] mb-1.5" style={{ color: "#9a9189" }}>Order Status</label>
                  <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2.5 text-[13px] outline-none capitalize"
                    style={{ borderColor: "#e0d6c4", background: "#fffdfb", color: "#1a1816" }}
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-[0.1em] mb-1.5" style={{ color: "#9a9189" }}>Payment Status</label>
                  <select value={editPayment} onChange={(e) => setEditPayment(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2.5 text-[13px] outline-none capitalize"
                    style={{ borderColor: "#e0d6c4", background: "#fffdfb", color: "#1a1816" }}
                  >
                    {PAYMENT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-medium uppercase tracking-[0.1em] mb-1.5" style={{ color: "#9a9189" }}>Invite URL (delivery link)</label>
                  <input value={editInviteUrl} onChange={(e) => setEditInviteUrl(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2.5 text-[13px] outline-none"
                    style={{ borderColor: "#e0d6c4", background: "#fffdfb", color: "#1a1816" }}
                    placeholder="https://..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-medium uppercase tracking-[0.1em] mb-1.5" style={{ color: "#9a9189" }}>Admin Notes</label>
                  <textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} rows={3}
                    className="w-full rounded-lg border px-3 py-2.5 text-[13px] outline-none resize-none"
                    style={{ borderColor: "#e0d6c4", background: "#fffdfb", color: "#1a1816" }}
                    placeholder="Internal notes..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Theme preview */}
            {theme && (
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #e0d6c4" }}>
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${theme.image})` }} />
                <div className="p-4" style={{ background: "#fffdfb" }}>
                  <p className="font-serif text-[15px]" style={{ color: "#1a1816" }}>{theme.name}</p>
                  <p className="text-[10px] italic" style={{ color: "#9a9189" }}>{theme.tagline}</p>
                  <Link href={`/preview/${theme.slug}`} target="_blank"
                    className="mt-3 flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "#9c7f54" }}
                  >
                    <Eye size={12} /> View Full Preview
                  </Link>
                </div>
              </div>
            )}

            {/* Video preview */}
            {order.video_addon && theme && (
              <div className="rounded-xl p-4" style={{ background: "#fffdfb", border: "1px solid #e0d6c4" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Film size={14} style={{ color: "#9c7f54" }} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "#9c7f54" }}>Video Preview</p>
                </div>
                <VideoPreview theme={theme} groomName={order.groom_name} brideName={order.bride_name}
                  weddingDate={order.wedding_date || undefined} venue={order.venue || undefined}
                />
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] font-medium" style={{ background: "#f4f0ea", color: "#57504a" }}>
                    <Download size={11} /> Download
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] font-medium" style={{ background: "#1a1816", color: "#faf8f4" }}>
                    <Film size={11} /> Generate Full
                  </button>
                </div>
              </div>
            )}

            {/* Quick actions */}
            <div className="rounded-xl p-4" style={{ background: "#fffdfb", border: "1px solid #e0d6c4" }}>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#9c7f54" }}>Quick Actions</p>
              <div className="space-y-2">
                <button onClick={() => { setEditStatus("in_progress"); handleSave(); }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-medium transition-colors hover:bg-[#f4f0ea]"
                  style={{ color: "#57504a" }}
                ><Clock size={12} style={{ color: "#b45309" }} /> Mark In Progress</button>

                <button onClick={() => { setEditPayment("verified"); handleSave(); }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-medium transition-colors hover:bg-[#f4f0ea]"
                  style={{ color: "#57504a" }}
                ><CreditCard size={12} style={{ color: "#16a34a" }} /> Verify Payment</button>

                <button onClick={() => { setEditStatus("delivered"); handleSave(); }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-medium transition-colors hover:bg-[#f4f0ea]"
                  style={{ color: "#57504a" }}
                ><Truck size={12} style={{ color: "#16a34a" }} /> Mark Delivered</button>

                {order.customer_phone && (
                  <a href={`https://wa.me/${order.customer_phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-medium transition-colors hover:bg-[#f4f0ea]"
                    style={{ color: "#57504a" }}
                  ><MessageCircle size={12} style={{ color: "#25d366" }} /> WhatsApp Customer</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
