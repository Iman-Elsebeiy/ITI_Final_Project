"use server";

import { createClient } from "@/lib/supabase/server";

export async function getConversations() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data: participantRows } = await supabase
      .from("conversation_participants")
      .select("conversation_id")
      .eq("user_id", user.id);

    if (!participantRows || participantRows.length === 0) return [];

    const convIds = participantRows.map((p: { conversation_id: string }) => p.conversation_id);

    const { data: conversations } = await supabase
      .from("conversations")
      .select("*")
      .in("id", convIds)
      .order("updated_at", { ascending: false });

    if (!conversations) return [];

    const result = await Promise.all(
      conversations.map(async (conv: { id: string; created_at: string; updated_at: string }) => {
        const { data: participants } = await supabase
          .from("conversation_participants")
          .select("user_id, profiles:profiles!user_id(id, full_name, avatar_url)")
          .eq("conversation_id", conv.id);

        const otherParticipant = (participants || []).find(
          (p: { user_id: string }) => p.user_id !== user.id
        );

        const { data: messages } = await supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", conv.id)
          .order("created_at", { ascending: false })
          .limit(1);

        const { count: unreadCount } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("conversation_id", conv.id)
          .neq("sender_id", user.id)
          .neq("status", "read");

        return {
          ...conv,
          other_user: otherParticipant?.profiles || null,
          last_message: messages?.[0] || null,
          unread_count: unreadCount || 0,
        };
      })
    );

    return result;
  } catch {
    return [];
  }
}

export async function getMessages(conversationId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { messages: [], currentUserId: "" };

    const { data } = await supabase
      .from("messages")
      .select("*, sender:profiles!sender_id(id, full_name, avatar_url)")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    await supabase
      .from("messages")
      .update({ status: "read" })
      .eq("conversation_id", conversationId)
      .neq("sender_id", user.id)
      .neq("status", "read");

    return { messages: data || [], currentUserId: user.id };
  } catch {
    return { messages: [], currentUserId: "" };
  }
}

export async function sendMessage(conversationId: string, content: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content,
      })
      .select("*, sender:profiles!sender_id(id, full_name, avatar_url)")
      .single();

    if (error) return { error: error.message };

    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId);

    return { success: true, data };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}

export async function getUnreadMessageCount(): Promise<number> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const { data: participantRows } = await supabase
      .from("conversation_participants")
      .select("conversation_id")
      .eq("user_id", user.id);

    if (!participantRows || participantRows.length === 0) return 0;

    const convIds = participantRows.map((p: { conversation_id: string }) => p.conversation_id);

    const { count } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .in("conversation_id", convIds)
      .neq("sender_id", user.id)
      .neq("status", "read");

    return count || 0;
  } catch {
    return 0;
  }
}
