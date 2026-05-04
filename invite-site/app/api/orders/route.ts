import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = getServiceClient();

    const { data, error } = await supabase
      .from("orders")
      .insert({
        groom_name: body.groomName,
        bride_name: body.brideName,
        wedding_date: body.weddingDate || null,
        venue: body.venue || null,
        venue_address: body.venueAddress || null,
        city: body.city || null,
        groom_family: body.groomFamily || null,
        bride_family: body.brideFamily || null,
        dress_code: body.dressCode || null,
        music_preference: body.musicPreference || null,
        rsvp_contact: body.rsvpContact || null,
        love_story: body.loveStory || null,
        message: body.message || null,
        events: body.events || [],
        customer_phone: body.phone || null,
        customer_email: body.email || null,
        theme_slug: body.themeSlug,
        theme_name: body.themeName || null,
        tier: body.tier,
        video_addon: body.videoAddon || false,
        base_price_inr: body.basePriceInr,
        addon_price_inr: body.addonPriceInr || 0,
        total_price_inr: body.totalPriceInr,
        payment_status: "pending",
        order_status: "new",
      })
      .select()
      .single();

    if (error) {
      console.error("Order insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ order: data }, { status: 201 });
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = getServiceClient();
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const limit = parseInt(url.searchParams.get("limit") || "50");

    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq("order_status", status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ orders: data });
  } catch (err) {
    console.error("Orders GET error:", err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
