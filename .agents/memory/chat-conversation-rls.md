---
name: Chat conversation creation requires admin client
description: Live Supabase blocks user-scoped inserts on conversations; create via service role.
---
Live Supabase policy drift: the RLS INSERT policy on `conversations`/`conversation_participants` blocks regular user-scoped inserts on the live DB, even though `supabase/migrations/repair-chat-notifications.sql` declares `WITH CHECK (true)`. The migration's policy section was never fully applied to live, and DDL can't be run from this environment (only PostgREST via service-role key; no SQL Editor / direct PG).

**Why:** This silently broke every UI path that creates a chat — only Stripe fulfillment (admin client) ever succeeded in creating conversations.

**How to apply:** Server actions that CREATE conversations/participants must authenticate the user with the normal server client, then do the inserts with `createAdminClient()` (service role). Reads stay under user RLS — they work because the `is_conversation_participant()` SECURITY DEFINER helper + SELECT policies ARE present on live. Messaging an arbitrary valid user is intended (marketplace "Contact seller"), so do NOT gate creation on a shared rental. Proper long-term fix is to repair the live INSERT policy. To reproduce real user RLS from bash: mint a session via `admin.auth.admin.generateLink({type:'magiclink'})` + `verifyOtp` on an anon client (env vars exist only in bash, not the code_execution sandbox).
