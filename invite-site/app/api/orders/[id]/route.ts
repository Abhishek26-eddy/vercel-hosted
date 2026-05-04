import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase.from("orders").select("*").eq("id", id).single();
    if (error) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ order: data });
  } catch {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const body = await req.json();
    const supabase = getServiceClient();

    const updates: Record<string, string | null> = {};
    if (body.orderStatus) updates.order_status = body.orderStatus;
    if (body.paymentStatus) updates.payment_status = body.paymentStatus;
    if (body.paymentReference) updates.payment_reference = body.paymentReference;
    if (body.inviteUrl) updates.invite_url = body.inviteUrl;
    if (body.adminNotes !== undefined) updates.admin_notes = body.adminNotes;
    if (body.orderStatus === "delivered") updates.delivered_at = new Date().toISOString();

    const { data, error } = await supabase.from("orders").update(updates).eq("id", id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ order: data });
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
