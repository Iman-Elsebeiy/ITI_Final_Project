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
    .select("id, total_price, platform_fee, transaction_type, status, start_date, end_date, created_at, item_id, borrower_id, lender_id, items(title, available), borrower:profiles!rentals_borrower_id_fkey(full_name, email), lender:profiles!rentals_lender_id_fkey(full_name, email)")
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

// Admin approves a cancelled order: the item is put back into circulation
// (marked available again) so it can be rented or sold to someone else.
export async function POST(request: Request) {
  const admin = await checkAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { id, action } = body as { id?: string; action?: string };

  if (action !== "approve_cancellation" || !id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { data: rental, error: rentalError } = await admin
    .from("rentals")
    .select("id, item_id, status")
    .eq("id", id)
    .single();

  if (rentalError || !rental) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (rental.status !== "cancelled") {
    return NextResponse.json({ error: "Only cancelled orders can be approved" }, { status: 400 });
  }

  if (rental.item_id) {
    const { error: itemError } = await admin
      .from("items")
      .update({ available: true })
      .eq("id", rental.item_id);
    if (itemError) return NextResponse.json({ error: itemError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
