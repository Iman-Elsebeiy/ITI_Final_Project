export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  university: string | null;
  faculty: string | null;
  role: "borrower" | "lender" | "both";
  student_id_path: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Item = {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  category: string;
  price: number;
  rental_period: "hourly" | "daily" | "weekly" | "monthly" | "semester";
  condition: "new" | "like-new" | "excellent" | "good" | "fair";
  location: string | null;
  deposit: number;
  available: boolean;
  image_paths: string[];
  availability_date: string | null;
  created_at: string;
  updated_at: string;
  owner?: Profile;
  is_favorite?: boolean;
  avg_rating?: number;
  review_count?: number;
};

export type Rental = {
  id: string;
  item_id: string;
  borrower_id: string;
  lender_id: string;
  status: "active" | "pending" | "completed" | "cancelled";
  total_price: number;
  start_date: string;
  end_date: string;
  pickup_location: string | null;
  created_at: string;
  updated_at: string;
  item?: Item;
  borrower?: Profile;
  lender?: Profile;
};

export type Favorite = {
  id: string;
  user_id: string;
  item_id: string;
  created_at: string;
  item?: Item;
};

export type Conversation = {
  id: string;
  created_at: string;
  updated_at: string;
  participants?: Profile[];
  last_message?: Message;
  unread_count?: number;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  status: "sent" | "delivered" | "read";
  created_at: string;
  sender?: Profile;
};

export type Review = {
  id: string;
  rental_id: string;
  reviewer_id: string;
  reviewed_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  reviewer?: Profile;
};

export type Notification = {
  id: string;
  user_id: string;
  type: "rental" | "review" | "message" | "return" | "system";
  actor_id: string | null;
  item_id: string | null;
  rental_id: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
  actor?: Profile;
  item?: Item;
};

export type UserSettings = {
  id: string;
  email_notifications: boolean;
  push_notifications: boolean;
  sms_notifications: boolean;
  rental_updates: boolean;
  message_alerts: boolean;
  promotions: boolean;
  weekly_digest: boolean;
  profile_visibility: "public" | "students" | "private";
  show_email: boolean;
  show_phone: boolean;
  show_location: boolean;
  language: string;
  currency: string;
  theme: string;
  created_at: string;
  updated_at: string;
};

export const PERIOD_LABELS: Record<string, string> = {
  hourly: "Per Hour",
  daily: "Per Day",
  weekly: "Per Week",
  monthly: "Per Month",
  semester: "Per Semester",
};

export const CONDITION_LABELS: Record<string, string> = {
  new: "Brand New",
  "like-new": "Like New",
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
};

export const CATEGORIES = [
  "Books & Textbooks",
  "Electronics & Gadgets",
  "Lab Equipment",
  "Engineering Tools",
  "Art Supplies",
  "Photography Equipment",
  "Sports Equipment",
  "Musical Instruments",
  "Power Tools",
  "Mobile Accessories",
  "Printers & Scanners",
  "Gaming Consoles",
  "Other",
];

export const CATEGORY_ICONS: Record<string, string> = {
  "Books & Textbooks": "📚",
  "Electronics & Gadgets": "💻",
  "Lab Equipment": "🔬",
  "Engineering Tools": "📐",
  "Art Supplies": "🎨",
  "Photography Equipment": "📷",
  "Sports Equipment": "⚽",
  "Musical Instruments": "🎵",
  "Power Tools": "🔧",
  "Mobile Accessories": "📱",
  "Printers & Scanners": "🖨️",
  "Gaming Consoles": "🎮",
  "Other": "📦",
};
