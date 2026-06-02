---
name: rentals table legacy columns
description: The live Supabase rentals table diverges from supabase/schema.sql — it carries legacy NOT NULL columns that every insert must satisfy.
---

# Rentals table: legacy `renter_id` / `owner_id` columns

The live Supabase DB's `rentals` table has BOTH the current `borrower_id` / `lender_id`
columns AND legacy `renter_id` / `owner_id` columns (the latter are NOT in
`supabase/schema.sql`'s CREATE statement). Confirmed by querying the REST API:
`select=renter_id` returns rows; the legacy columns exist and are populated.

**Why:** the table predates a rename. `schema.sql` was rewritten to the new names
but the live DB was never dropped/recreated, so the old columns linger and are
(almost certainly) still NOT NULL.

**How to apply:** any code that INSERTs into `rentals` (Stripe webhook + confirm
routes) must set `renter_id` AND `owner_id` in addition to `borrower_id` /
`lender_id`, or the insert fails on the live DB. Do not remove the legacy fields
from inserts. PostgREST joins to `profiles` need explicit FK disambiguation
(`profiles!rentals_borrower_id_fkey`, `profiles!rentals_lender_id_fkey`) because
two columns reference `profiles`.

# Schema migrations are manual

Schema changes (new columns like `transaction_type`, `platform_fee`,
`stripe_session_id`, or `items.listing_type`) live in `supabase/migrations/*.sql`
and must be run by the user in the Supabase SQL Editor — there is no automated
migration runner. New code referencing those columns silently fails (PostgREST
`42703 column does not exist`) until the user runs the migration.
