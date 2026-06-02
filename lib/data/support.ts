"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

type SupportTicketInput = {
  name: string;
  email: string;
  message: string;
  subject?: string;
  category?: string;
  source?: "support" | "contact";
};

export async function createSupportTicket(input: SupportTicketInput) {
  try {
    if (!input.name?.trim() || !input.email?.trim() || !input.message?.trim()) {
      return { error: "Please fill in your name, email, and message." };
    }

    // Attach the user id when the sender is signed in (optional).
    let userId: string | null = null;
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      userId = user?.id ?? null;
    } catch {
      userId = null;
    }

    const admin = createAdminClient();
    const { error } = await admin.from("support_tickets").insert({
      user_id: userId,
      name: input.name.trim(),
      email: input.email.trim(),
      category: input.category?.trim() || null,
      subject: input.subject?.trim() || null,
      message: input.message.trim(),
      source: input.source ?? "support",
    });

    if (error) {
      console.error("Support ticket insert error:", error);
      return { error: "Couldn't send your message. Please try again." };
    }

    return { success: true };
  } catch {
    return { error: "An unexpected error occurred. Please try again." };
  }
}
