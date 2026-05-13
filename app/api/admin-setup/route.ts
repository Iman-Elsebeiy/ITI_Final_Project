import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const admin = createAdminClient();

    // 1. Fix role constraint to allow 'admin'
    await admin.rpc("exec_sql" as never, {
      sql: "ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check; ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('borrower', 'lender', 'both', 'student', 'admin'));",
    });

    // 2. Check if admin user exists
    const { data: users } = await admin.auth.admin.listUsers();
    const existingAdmin = users?.users?.find(u => u.email === "admin@unitool.com");

    let adminId: string;

    if (existingAdmin) {
      adminId = existingAdmin.id;
    } else {
      // Create admin auth user
      const { data: newUser, error: createError } = await admin.auth.admin.createUser({
        email: "admin@unitool.com",
        password: "Admin@UniTool2025",
        email_confirm: true,
        user_metadata: { full_name: "UniTool Admin" },
      });
      if (createError) return NextResponse.json({ error: createError.message }, { status: 500 });
      adminId = newUser.user.id;
    }

    // 3. Upsert admin profile with role = admin
    const { error: profileError } = await admin.from("profiles").upsert({
      id: adminId,
      email: "admin@unitool.com",
      full_name: "UniTool Admin",
      university: "UniTool",
      faculty: "Administration",
      role: "admin",
    });
    if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 });

    // 4. Upsert user_settings
    await admin.from("user_settings").upsert({ id: adminId });

    return NextResponse.json({
      success: true,
      adminId,
      email: "admin@unitool.com",
      password: "Admin@UniTool2025",
      message: "Admin user ready!",
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
