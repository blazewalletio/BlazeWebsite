-- =============================================
-- BLAZE Website Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- Table: waitlist
-- Stores email signups for presale notifications
-- =============================================
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT DEFAULT 'presale_countdown',
  ip_address TEXT,
  user_agent TEXT
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

-- =============================================
-- Table: contact_messages
-- Stores messages from contact/support form
-- =============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'resolved')),
  read_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_messages(created_at DESC);

-- =============================================
-- Table: site_settings
-- Stores configurable site settings
-- =============================================
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
  ('presale_date', '"2026-02-01T12:00:00Z"'),
  ('waitlist_offset', '2847'),
  ('maintenance_mode', 'false')
ON CONFLICT (key) DO NOTHING;

-- =============================================
-- Table: admin_logs
-- Audit trail for admin actions
-- =============================================
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for user activity lookups
CREATE INDEX IF NOT EXISTS idx_admin_logs_user ON admin_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON admin_logs(created_at DESC);

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS on all tables
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Waitlist policies
-- Anyone can insert (signup)
CREATE POLICY "Anyone can signup to waitlist" ON waitlist
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view
CREATE POLICY "Authenticated users can view waitlist" ON waitlist
  FOR SELECT TO authenticated
  USING (true);

-- Only authenticated users can delete
CREATE POLICY "Authenticated users can delete from waitlist" ON waitlist
  FOR DELETE TO authenticated
  USING (true);

-- Contact messages policies
-- Anyone can insert (submit form)
CREATE POLICY "Anyone can submit contact form" ON contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view
CREATE POLICY "Authenticated users can view messages" ON contact_messages
  FOR SELECT TO authenticated
  USING (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update messages" ON contact_messages
  FOR UPDATE TO authenticated
  USING (true);

-- Only authenticated users can delete
CREATE POLICY "Authenticated users can delete messages" ON contact_messages
  FOR DELETE TO authenticated
  USING (true);

-- Site settings policies
-- Anyone can read settings (for frontend)
CREATE POLICY "Anyone can read settings" ON site_settings
  FOR SELECT TO anon, authenticated
  USING (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update settings" ON site_settings
  FOR UPDATE TO authenticated
  USING (true);

-- Admin logs policies
-- Only authenticated users can view logs
CREATE POLICY "Authenticated users can view logs" ON admin_logs
  FOR SELECT TO authenticated
  USING (true);

-- Only authenticated users can insert logs
CREATE POLICY "Authenticated users can insert logs" ON admin_logs
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- =============================================
-- Helper Functions
-- =============================================

-- Function to get waitlist count
CREATE OR REPLACE FUNCTION get_waitlist_count()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM waitlist;
$$ LANGUAGE SQL SECURITY DEFINER;

-- Function to get waitlist stats
CREATE OR REPLACE FUNCTION get_waitlist_stats()
RETURNS JSON AS $$
  SELECT json_build_object(
    'total', (SELECT COUNT(*) FROM waitlist),
    'today', (SELECT COUNT(*) FROM waitlist WHERE created_at >= CURRENT_DATE),
    'this_week', (SELECT COUNT(*) FROM waitlist WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'),
    'this_month', (SELECT COUNT(*) FROM waitlist WHERE created_at >= CURRENT_DATE - INTERVAL '30 days')
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- Function to get unread messages count
CREATE OR REPLACE FUNCTION get_unread_messages_count()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM contact_messages WHERE status = 'new';
$$ LANGUAGE SQL SECURITY DEFINER;

