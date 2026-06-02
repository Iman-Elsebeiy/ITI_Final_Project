-- Migration: Support / Contact form submissions
-- Run this in the Supabase SQL Editor. Safe to run repeatedly.

CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'support',
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inserts are performed server-side with the service role (which bypasses RLS),
-- so RLS stays enabled with no public policies to keep the table private.
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
