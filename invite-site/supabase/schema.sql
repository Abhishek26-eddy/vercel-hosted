-- ═══════════════════════════════════════════════════════════
-- THE DIGITAL INVITERS — Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- ═══════════════════════════════════════════════════════════

-- 1. Orders — core order table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Customer contact
  customer_phone TEXT,
  customer_email TEXT,

  -- Wedding details
  groom_name TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  wedding_date DATE,
  venue TEXT,
  venue_address TEXT,
  city TEXT,
  groom_family TEXT,
  bride_family TEXT,
  dress_code TEXT,
  music_preference TEXT,
  rsvp_contact TEXT,
  love_story TEXT,
  message TEXT,

  -- Events (JSON array of {name, date, time, venue})
  events JSONB DEFAULT '[]'::jsonb,

  -- Design selection
  theme_slug TEXT NOT NULL,
  theme_name TEXT,
  tier TEXT NOT NULL CHECK (tier IN ('basic', 'luxe', 'signature')),

  -- Add-ons
  video_addon BOOLEAN DEFAULT FALSE,

  -- Pricing (in INR paise-free integers)
  base_price_inr INTEGER NOT NULL,
  addon_price_inr INTEGER DEFAULT 0,
  total_price_inr INTEGER NOT NULL,

  -- Payment
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'verified', 'refunded')),
  payment_method TEXT DEFAULT 'upi',
  payment_reference TEXT,

  -- Delivery
  order_status TEXT DEFAULT 'new' CHECK (order_status IN ('new', 'in_progress', 'review', 'delivered', 'cancelled')),
  invite_url TEXT,
  delivered_at TIMESTAMPTZ,

  -- Admin
  admin_notes TEXT,
  assigned_to UUID REFERENCES auth.users(id)
);

-- 2. Order Assets — photos, videos linked to orders
CREATE TABLE IF NOT EXISTS order_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('photo', 'video_preview', 'video_final', 'other')),
  file_url TEXT NOT NULL,
  file_name TEXT,
  file_size INTEGER,
  storage_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Video Jobs — track video generation tasks
CREATE TABLE IF NOT EXISTS video_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  job_type TEXT DEFAULT 'preview' CHECK (job_type IN ('preview', 'final')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  theme_slug TEXT NOT NULL,
  input_data JSONB,
  output_url TEXT,
  duration_seconds INTEGER,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMPTZ
);

-- 4. Admin Profiles — link auth.users to admin roles
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ═══ Indexes ═══
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_assets_order ON order_assets(order_id);
CREATE INDEX IF NOT EXISTS idx_video_jobs_order ON video_jobs(order_id);
CREATE INDEX IF NOT EXISTS idx_video_jobs_status ON video_jobs(status);

-- ═══ Auto-update updated_at ═══
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ═══ Row Level Security ═══
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY admin_orders ON orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY admin_assets ON order_assets
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY admin_video_jobs ON video_jobs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY admin_profiles_self ON admin_profiles
  FOR ALL USING (id = auth.uid());

-- Service role (API routes) can insert orders (anon users placing orders)
CREATE POLICY service_insert_orders ON orders
  FOR INSERT WITH CHECK (true);

-- ═══ Storage Buckets ═══
-- Run these separately if needed:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('order-assets', 'order-assets', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('video-outputs', 'video-outputs', false);
