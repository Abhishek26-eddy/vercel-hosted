/* ═══════════════════════════════════════════════════════════
   Database types matching supabase/schema.sql
   ═══════════════════════════════════════════════════════════ */

export type OrderStatus = "new" | "in_progress" | "review" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "verified" | "refunded";
export type Tier = "basic" | "luxe" | "signature";
export type AssetType = "photo" | "video_preview" | "video_final" | "other";
export type VideoJobStatus = "pending" | "processing" | "completed" | "failed";
export type VideoJobType = "preview" | "final";
export type AdminRole = "admin" | "super_admin";

export interface OrderEvent {
  name: string;
  date: string;
  time: string;
  venue: string;
}

export interface Order {
  id: string;
  created_at: string;
  updated_at: string;
  customer_phone: string | null;
  customer_email: string | null;
  groom_name: string;
  bride_name: string;
  wedding_date: string | null;
  venue: string | null;
  venue_address: string | null;
  city: string | null;
  groom_family: string | null;
  bride_family: string | null;
  dress_code: string | null;
  music_preference: string | null;
  rsvp_contact: string | null;
  love_story: string | null;
  message: string | null;
  events: OrderEvent[];
  theme_slug: string;
  theme_name: string | null;
  tier: Tier;
  video_addon: boolean;
  base_price_inr: number;
  addon_price_inr: number;
  total_price_inr: number;
  payment_status: PaymentStatus;
  payment_method: string;
  payment_reference: string | null;
  order_status: OrderStatus;
  invite_url: string | null;
  delivered_at: string | null;
  admin_notes: string | null;
  assigned_to: string | null;
}

export interface OrderAsset {
  id: string;
  order_id: string;
  asset_type: AssetType;
  file_url: string;
  file_name: string | null;
  file_size: number | null;
  storage_path: string | null;
  created_at: string;
}

export interface VideoJob {
  id: string;
  order_id: string;
  job_type: VideoJobType;
  status: VideoJobStatus;
  theme_slug: string;
  input_data: Record<string, unknown> | null;
  output_url: string | null;
  duration_seconds: number | null;
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface AdminProfile {
  id: string;
  email: string;
  display_name: string | null;
  role: AdminRole;
  created_at: string;
}

/* Supabase client generic type */
export interface Database {
  public: {
    Tables: {
      orders: { Row: Order; Insert: Partial<Order> & Pick<Order, "groom_name" | "bride_name" | "theme_slug" | "tier" | "base_price_inr" | "total_price_inr">; Update: Partial<Order> };
      order_assets: { Row: OrderAsset; Insert: Omit<OrderAsset, "id" | "created_at">; Update: Partial<OrderAsset> };
      video_jobs: { Row: VideoJob; Insert: Omit<VideoJob, "id" | "created_at">; Update: Partial<VideoJob> };
      admin_profiles: { Row: AdminProfile; Insert: Omit<AdminProfile, "created_at">; Update: Partial<AdminProfile> };
    };
  };
}
