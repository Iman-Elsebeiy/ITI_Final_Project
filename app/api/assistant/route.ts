import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { openai, ASSISTANT_MODEL } from "@/lib/ai/client";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES, PERIOD_LABELS } from "@/lib/types";

export const runtime = "nodejs";

type ClientMsg = { role: "user" | "assistant"; content: string };

type SearchArgs = {
  query?: string;
  category?: string;
  listing_type?: "rent" | "sale";
  max_price?: number;
};

// Simple in-memory per-IP rate limiter to protect the LLM endpoint from abuse.
const RATE_LIMIT = 20;
const WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

// Strip characters that have special meaning inside a PostgREST `.or()` ilike
// filter (commas/parentheses separate conditions) so user input can't break the query.
function sanitizeTerm(input: string): string {
  return input
    .replace(/[,()%*\\:]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

type ItemCard = {
  id: string;
  title: string;
  category: string;
  price: number;
  listing_type: "rent" | "sale";
  rental_period: string;
  condition: string;
  location: string | null;
  image: string | null;
};

async function searchItems(args: SearchArgs): Promise<ItemCard[]> {
  const supabase = await createClient();
  let q = supabase
    .from("items")
    .select(
      "id, title, description, category, price, listing_type, rental_period, condition, location, image_paths"
    )
    .eq("available", true)
    .limit(8);

  if (args.category) q = q.eq("category", args.category);
  if (args.listing_type) q = q.eq("listing_type", args.listing_type);
  if (typeof args.max_price === "number") q = q.lte("price", args.max_price);
  if (args.query) {
    const clean = sanitizeTerm(args.query);
    if (clean) {
      const term = `%${clean}%`;
      q = q.or(`title.ilike.${term},description.ilike.${term},category.ilike.${term}`);
    }
  }

  const { data } = await q.order("price", { ascending: true });
  if (!data) return [];

  return data.map((it: Record<string, unknown>) => ({
    id: it.id as string,
    title: it.title as string,
    category: it.category as string,
    price: Number(it.price),
    listing_type: it.listing_type as "rent" | "sale",
    rental_period: it.rental_period as string,
    condition: it.condition as string,
    location: (it.location as string) ?? null,
    image: Array.isArray(it.image_paths) && it.image_paths.length ? (it.image_paths[0] as string) : null,
  }));
}

const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "search_items",
      description:
        "Search the UniTool student marketplace for items that are available to rent or buy. Always call this before claiming any item exists or stating prices.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description:
              "Keywords describing the item the user wants, e.g. 'laptop', 'scientific calculator', 'physics textbook'.",
          },
          category: {
            type: "string",
            enum: CATEGORIES,
            description: "Optional category filter, only if it clearly matches one of the listed categories.",
          },
          listing_type: {
            type: "string",
            enum: ["rent", "sale"],
            description: "Use 'rent' if the user wants to rent/borrow, 'sale' if they want to buy.",
          },
          max_price: {
            type: "number",
            description: "Optional maximum price in EGP the user is willing to pay.",
          },
        },
      },
    },
  },
];

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { reply: "You're sending messages too quickly. Please wait a moment and try again.", items: [] },
        { status: 200 }
      );
    }

    const body = await req.json();
    const clientMessages: ClientMsg[] = Array.isArray(body?.messages) ? body.messages : [];

    if (!process.env.AI_INTEGRATIONS_OPENAI_API_KEY) {
      return NextResponse.json(
        { reply: "The assistant is not configured yet. Please try again later.", items: [] },
        { status: 200 }
      );
    }

    // Personalization: pull the signed-in user's profile if available.
    let userContext = "";
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, university, faculty, role")
          .eq("id", user.id)
          .maybeSingle();
        if (profile) {
          const parts: string[] = [];
          if (profile.full_name) parts.push(`name: ${profile.full_name}`);
          if (profile.university) parts.push(`university: ${profile.university}`);
          if (profile.faculty) parts.push(`faculty: ${profile.faculty}`);
          if (profile.role) parts.push(`role: ${profile.role}`);
          if (parts.length) {
            userContext = ` The current student's profile — ${parts.join(
              ", "
            )}. Use this to tailor suggestions (e.g. relevant to their faculty), but never expose private data.`;
          }
        }
      }
    } catch {
      // ignore personalization failures
    }

    const periodHint = Object.entries(PERIOD_LABELS)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ");

    const systemPrompt =
      "You are UniTool's friendly shopping assistant for a university student marketplace. " +
      "Students can rent or buy academic tools, electronics, books and equipment. " +
      "Help the user find items. You must NEVER state that an item exists, is available, or mention any price unless that information came from a search_items result in THIS turn. " +
      "Whenever the user asks about, looks for, or expresses interest in any product, you MUST call the search_items tool first — never answer from memory or assumption. " +
      "Prices are in Egyptian Pounds (EGP). For rentals the price is per period (" +
      periodHint +
      "). " +
      "Reply in the SAME language the user writes in (reply in Arabic if they write Arabic). " +
      "Keep replies short, warm and helpful. After searching, briefly summarize the best matches and their prices; the UI will show clickable item cards below your message, so do not paste raw URLs. " +
      "If nothing matches, say so honestly and suggest a related search or category." +
      userContext;

    const convo: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...clientMessages
        .filter((m) => m && typeof m.content === "string" && (m.role === "user" || m.role === "assistant"))
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content })),
    ];

    const first = await openai.chat.completions.create({
      model: ASSISTANT_MODEL,
      messages: convo,
      tools,
      tool_choice: "auto",
    });

    const choice = first.choices[0]?.message;
    let items: ItemCard[] = [];

    if (choice?.tool_calls?.length) {
      convo.push(choice);
      const seen = new Set<string>();
      for (const tc of choice.tool_calls) {
        if (tc.type !== "function" || tc.function.name !== "search_items") {
          convo.push({ role: "tool", tool_call_id: tc.id, content: "[]" });
          continue;
        }
        let args: SearchArgs = {};
        try {
          args = JSON.parse(tc.function.arguments || "{}");
        } catch {
          args = {};
        }
        const found = await searchItems(args);
        for (const it of found) {
          if (!seen.has(it.id)) {
            seen.add(it.id);
            items.push(it);
          }
        }
        convo.push({
          role: "tool",
          tool_call_id: tc.id,
          content: JSON.stringify(
            found.map((it) => ({
              id: it.id,
              title: it.title,
              category: it.category,
              price: it.price,
              listing_type: it.listing_type,
              rental_period: it.rental_period,
              condition: it.condition,
              location: it.location,
            }))
          ),
        });
      }

      const second = await openai.chat.completions.create({
        model: ASSISTANT_MODEL,
        messages: convo,
      });
      const reply = second.choices[0]?.message?.content || "";
      return NextResponse.json({ reply, items: items.slice(0, 6) });
    }

    return NextResponse.json({ reply: choice?.content || "", items: [] });
  } catch (e) {
    console.error("assistant route error:", e);
    return NextResponse.json(
      { reply: "Sorry, something went wrong. Please try again.", items: [] },
      { status: 200 }
    );
  }
}
