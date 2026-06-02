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

export async function GET(request: Request) {
  const admin = await checkAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get("id");

  // Return full message thread for a single conversation
  if (conversationId) {
    const { data: messages, error } = await admin
      .from("messages")
      .select("id, content, created_at, sender_id, profiles(full_name, email)")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const mapped = messages?.map((m) => ({
      ...m,
      sender: Array.isArray(m.profiles) ? m.profiles[0] : m.profiles,
    }));

    return NextResponse.json({ messages: mapped });
  }

  // Return list of all conversations with participants + last message
  const { data: conversations, error } = await admin
    .from("conversations")
    .select("id, created_at, updated_at, conversation_participants(user_id, profiles(full_name, email))")
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const withMeta = await Promise.all(
    (conversations || []).map(async (c) => {
      const { data: lastMsg } = await admin
        .from("messages")
        .select("content, created_at")
        .eq("conversation_id", c.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const participants = (c.conversation_participants || []).map((p: any) => {
        const prof = Array.isArray(p.profiles) ? p.profiles[0] : p.profiles;
        return { user_id: p.user_id, full_name: prof?.full_name || null, email: prof?.email || null };
      });

      return {
        id: c.id,
        created_at: c.created_at,
        updated_at: c.updated_at,
        participants,
        last_message: lastMsg?.content || null,
        last_message_at: lastMsg?.created_at || null,
      };
    })
  );

  return NextResponse.json({ conversations: withMeta });
}
