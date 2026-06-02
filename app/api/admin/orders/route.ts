import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function checkAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const admin = createAdminClient();
  const { data: profile } = await admin.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return null;
  return admin;
}

export async function GET() {
  const admin = await checkAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: orders, error } = await admin
    .from("rentals")
    .select("id, total_price, platform_fee, transaction_type, status, start_date, end_date, created_at, item_id, borrower_id, lender_id, items(title), borrower:profiles!rentals_borrower_id_fkey(full_name, email), lender:profiles!rentals_lender_id_fkey(full_name, email)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const mapped = orders?.map((o) => ({
    ...o,
    item: Array.isArray(o.items) ? o.items[0] : o.items,
    borrower: Array.isArray(o.borrower) ? o.borrower[0] : o.borrower,
    lender: Array.isArray(o.lender) ? o.lender[0] : o.lender,
  }));

  return NextResponse.json({ orders: mapped });
}
