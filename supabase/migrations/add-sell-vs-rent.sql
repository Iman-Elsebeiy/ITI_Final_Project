-- Migration: Add "Sell vs Rent" listing type + platform commission
-- Run this in the Supabase SQL Editor against your existing database.

-- 1. Items: each item is EITHER rent OR sale
ALTER TABLE public.items
  ADD COLUMN IF NOT EXISTS listing_type TEXT NOT NULL DEFAULT 'rent'
  CHECK (listing_type IN ('rent', 'sale'));

-- 2. Rentals (used for both rentals and sales): transaction type + platform fee
ALTER TABLE public.rentals
  ADD COLUMN IF NOT EXISTS transaction_type TEXT NOT NULL DEFAULT 'rent'
  CHECK (transaction_type IN ('rent', 'sale'));

ALTER TABLE public.rentals
  ADD COLUMN IF NOT EXISTS platform_fee NUMERIC(10,2) NOT NULL DEFAULT 0;

-- 3. Sales have no rental window — relax NOT NULL on dates
ALTER TABLE public.rentals ALTER COLUMN start_date DROP NOT NULL;
ALTER TABLE public.rentals ALTER COLUMN end_date DROP NOT NULL;

-- 4. Idempotency for Stripe fulfillment — one record per checkout session
ALTER TABLE public.rentals
  ADD COLUMN IF NOT EXISTS stripe_session_id TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_rentals_stripe_session
  ON public.rentals(stripe_session_id)
  WHERE stripe_session_id IS NOT NULL;

-- 5. Reviews: one review per rental per reviewer (DB-level guard against races)
CREATE UNIQUE INDEX IF NOT EXISTS idx_reviews_rental_reviewer
  ON public.reviews(rental_id, reviewer_id);

-- 6. Realtime: broadcast new chat messages so the Messages page updates live
--    without a page refresh. Safe to run repeatedly.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
  END IF;
END $$;
