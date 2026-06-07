---
name: Inspecting the live Supabase DB
description: How to read the real Supabase project state, and why the executeSql callback is the wrong tool
---

The `executeSql` code-execution callback connects to Replit's built-in Postgres,
which is a DIFFERENT, essentially empty database — NOT the Supabase project the
app uses. Querying app tables there returns `relation ... does not exist`.

**To inspect real Supabase state:** run a short Node script via the bash tool from
the project root (env vars are available there, not in the code_execution sandbox):
`createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)`
then `.from(table).select(...)`. The service role bypasses RLS for reads.

**Limits:** the service-role REST API (PostgREST) cannot run DDL or arbitrary SQL.
Schema migrations must be applied by the user in the Supabase SQL Editor. This
matches the project's manual-migration pattern.

**Live DB drift is real:** `supabase/schema.sql` is NOT guaranteed to match the
live DB. Found case: live DB was missing `conversations`, `conversation_participants`,
and `notifications` entirely, and its `messages` table was a legacy shape with no
`conversation_id` — so chat, notifications, and admin chat view were all dead until
a repair migration was run. Always verify table/column existence against the live
DB before assuming a feature's backing schema exists.
