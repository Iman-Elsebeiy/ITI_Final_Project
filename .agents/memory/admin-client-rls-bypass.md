---
name: Admin client bypasses RLS — guard writes manually
description: When a data-access function uses the Supabase service-role (admin) client instead of the RLS-scoped client, RLS no longer protects the table; you must reimplement the protections in code.
---

When a `lib/data/*` server action switches from the RLS-scoped client (`createClient`) to the service-role admin client (`createAdminClient`), Row Level Security is fully bypassed. Anything RLS used to enforce must be re-added explicitly in the function body.

**Why:** `updateItem` was moved to the admin client to fix a write that RLS was blocking. With RLS gone, accepting a raw `Partial<Item>` let a crafted call mutate protected columns (owner_id, available, timestamps), and a scoped-but-unverified update reported success even when zero rows matched (wrong/non-owned id) — showing a false "updated" to the UI.

**How to apply:** For any admin-client write that represents a user action:
1. Allowlist the editable columns server-side (build a `safeUpdates` object from a fixed field list); never spread the caller's object straight into `.update()`/`.insert()`.
2. Keep ownership scoping (`.eq("owner_id", user.id)`).
3. Verify the write actually hit a row — use `.select("id")` and treat an empty result as an error — so invalid/non-owned ids don't report false success.
