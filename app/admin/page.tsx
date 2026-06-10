"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Package,
  ShieldCheck,
  LogOut,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  TrendingUp,
  Wallet,
  ShoppingBag,
  MessageSquare,
  LifeBuoy,
  RotateCcw,
  X,
} from "lucide-react";
import { logout } from "@/app/auth/actions";

type UserRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  university: string | null;
  faculty: string | null;
  role: string;
  created_at: string;
};

type ItemRow = {
  id: string;
  title: string;
  category: string;
  price: number;
  available: boolean;
  created_at: string;
  owner?: { full_name: string | null; email: string | null };
};

type OrderRow = {
  id: string;
  total_price: number;
  platform_fee: number | null;
  transaction_type: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  item?: { title: string | null; available?: boolean };
  borrower?: { full_name: string | null; email: string | null };
  lender?: { full_name: string | null; email: string | null };
};

type SupportTicket = {
  id: string;
  user_id: string | null;
  name: string | null;
  email: string | null;
  category: string | null;
  subject: string | null;
  message: string | null;
  source: string | null;
  status: string | null;
  created_at: string;
};

type ConversationRow = {
  id: string;
  created_at: string;
  updated_at: string;
  participants: { user_id: string; full_name: string | null; email: string | null }[];
  last_message: string | null;
  last_message_at: string | null;
};

type ChatMessage = {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  sender?: { full_name: string | null; email: string | null };
};

type Stats = {
  totalUsers: number;
  totalItems: number;
  availableItems: number;
  platformBalance: number;
  totalTransactions: number;
};

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"users" | "items" | "orders" | "chats" | "support">("users");
  const [users, setUsers] = useState<UserRow[]>([]);
  const [items, setItems] = useState<ItemRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [conversations, setConversations] = useState<ConversationRow[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalItems: 0,
    availableItems: 0,
    platformBalance: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openChat, setOpenChat] = useState<ConversationRow | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [uRes, iRes, oRes, cRes, tRes] = await Promise.all([
      fetch("/api/admin/users"),
      fetch("/api/admin/items"),
      fetch("/api/admin/orders"),
      fetch("/api/admin/conversations"),
      fetch("/api/admin/tickets"),
    ]);
    const uData = await uRes.json();
    const iData = await iRes.json();
    const oData = await oRes.json();
    const cData = await cRes.json();
    const tData = await tRes.json();

    if (uData.error || iData.error) {
      router.push("/login");
      return;
    }

    const ordersList: OrderRow[] = oData.orders || [];
    const platformBalance = ordersList.reduce((sum, o) => sum + (o.platform_fee || 0), 0);

    setUsers(uData.users || []);
    setItems(iData.items || []);
    setOrders(ordersList);
    setTickets(tData.tickets || []);
    setConversations(cData.conversations || []);
    setStats({
      totalUsers: uData.users?.length || 0,
      totalItems: iData.items?.length || 0,
      availableItems: iData.items?.filter((i: ItemRow) => i.available).length || 0,
      platformBalance,
      totalTransactions: ordersList.length,
    });
    setLoading(false);
  }

  async function openConversation(conv: ConversationRow) {
    setOpenChat(conv);
    setChatLoading(true);
    setChatMessages([]);
    const res = await fetch(`/api/admin/conversations?id=${conv.id}`);
    const data = await res.json();
    setChatMessages(data.messages || []);
    setChatLoading(false);
  }

  async function deleteUser(id: string) {
    if (!confirm("Delete this user?")) return;
    await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    loadData();
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/admin/items?id=${id}`, { method: "DELETE" });
    loadData();
  }

  async function toggleItem(id: string, available: boolean) {
    await fetch(`/api/admin/items`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, available: !available }),
    });
    loadData();
  }

  async function approveCancellation(rentalId: string) {
    await fetch(`/api/admin/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "approve_cancellation", id: rentalId }),
    });
    loadData();
  }

  async function resolveTicket(id: string, status: "open" | "resolved") {
    await fetch(`/api/admin/tickets`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    loadData();
  }

  const filteredUsers = users.filter(
    (u) =>
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.university?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredItems = items.filter(
    (i) =>
      i.title?.toLowerCase().includes(search.toLowerCase()) ||
      i.category?.toLowerCase().includes(search.toLowerCase()) ||
      i.owner?.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredOrders = orders.filter(
    (o) =>
      o.item?.title?.toLowerCase().includes(search.toLowerCase()) ||
      o.borrower?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.lender?.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTickets = tickets.filter(
    (t) =>
      t.subject?.toLowerCase().includes(search.toLowerCase()) ||
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.email?.toLowerCase().includes(search.toLowerCase()) ||
      t.category?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredConversations = conversations.filter((c) =>
    c.participants.some(
      (p) =>
        p.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        p.email?.toLowerCase().includes(search.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F3F5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1DA5A6] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#2C2C2C]/60">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#2C2C2C]">
                <span className="text-[#1DA5A6]">Uni</span>Tool Admin
              </h1>
              <p className="text-xs text-[#2C2C2C]/50">Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 text-sm text-[#2C2C2C]/60 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-2xl p-6 shadow-sm text-white">
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="w-6 h-6" />
              <p className="text-sm font-medium opacity-90">Platform Balance</p>
            </div>
            <p className="text-3xl font-bold">EGP {stats.platformBalance.toFixed(2)}</p>
            <p className="text-xs opacity-80 mt-1">10% commission earned</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2C2C2C]">{stats.totalTransactions}</p>
              <p className="text-sm text-[#2C2C2C]/60">Transactions</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2C2C2C]">{stats.totalUsers}</p>
              <p className="text-sm text-[#2C2C2C]/60">Total Users</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-[#1DA5A6]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2C2C2C]">{stats.totalItems}</p>
              <p className="text-sm text-[#2C2C2C]/60">Total Items</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2C2C2C]">{stats.availableItems}</p>
              <p className="text-sm text-[#2C2C2C]/60">Available</p>
            </div>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex bg-white rounded-xl p-1 shadow-sm flex-wrap">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeTab === "users"
                  ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white shadow"
                  : "text-[#2C2C2C]/60 hover:text-[#2C2C2C]"
              }`}
            >
              <Users className="w-4 h-4" />
              Users
            </button>
            <button
              onClick={() => setActiveTab("items")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeTab === "items"
                  ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white shadow"
                  : "text-[#2C2C2C]/60 hover:text-[#2C2C2C]"
              }`}
            >
              <Package className="w-4 h-4" />
              Items
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeTab === "orders"
                  ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white shadow"
                  : "text-[#2C2C2C]/60 hover:text-[#2C2C2C]"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab("chats")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeTab === "chats"
                  ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white shadow"
                  : "text-[#2C2C2C]/60 hover:text-[#2C2C2C]"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Chats
            </button>
            <button
              onClick={() => setActiveTab("support")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeTab === "support"
                  ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white shadow"
                  : "text-[#2C2C2C]/60 hover:text-[#2C2C2C]"
              }`}
            >
              <LifeBuoy className="w-4 h-4" />
              Support
              {tickets.some((t) => t.status !== "resolved") && (
                <span className="ml-1 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {tickets.filter((t) => t.status !== "resolved").length}
                </span>
              )}
            </button>
          </div>

          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C2C2C]/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${activeTab}...`}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-sm border border-[#2C2C2C]/10 focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30"
            />
          </div>
        </div>

        {/* Users Table */}
        {activeTab === "users" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#F1F3F5] text-xs text-[#2C2C2C]/60 uppercase tracking-wide">
                <tr>
                  <th className="text-left px-6 py-4">Name</th>
                  <th className="text-left px-6 py-4">Email</th>
                  <th className="text-left px-6 py-4">University</th>
                  <th className="text-left px-6 py-4">Role</th>
                  <th className="text-left px-6 py-4">Joined</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F3F5]">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#2C2C2C]/40">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#F1F3F5]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            {user.full_name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                          <span className="font-semibold text-sm text-[#2C2C2C]">
                            {user.full_name || "—"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2C2C2C]/70">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-[#2C2C2C]/70">{user.university || "—"}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-teal-50 text-[#1DA5A6]"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2C2C2C]/50">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {user.role !== "admin" && (
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Items Table */}
        {activeTab === "items" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#F1F3F5] text-xs text-[#2C2C2C]/60 uppercase tracking-wide">
                <tr>
                  <th className="text-left px-6 py-4">Item</th>
                  <th className="text-left px-6 py-4">Category</th>
                  <th className="text-left px-6 py-4">Price</th>
                  <th className="text-left px-6 py-4">Owner</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F3F5]">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#2C2C2C]/40">
                      No items found
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F1F3F5]/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-sm text-[#2C2C2C]">{item.title}</td>
                      <td className="px-6 py-4 text-sm text-[#2C2C2C]/70">{item.category}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#1DA5A6]">EGP {item.price}</td>
                      <td className="px-6 py-4 text-sm text-[#2C2C2C]/70">
                        {item.owner?.full_name || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleItem(item.id, item.available)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            item.available
                              ? "bg-green-50 text-green-700 hover:bg-green-100"
                              : "bg-red-50 text-red-700 hover:bg-red-100"
                          }`}
                        >
                          {item.available ? (
                            <><CheckCircle className="w-3.5 h-3.5" /> Available</>
                          ) : (
                            <><XCircle className="w-3.5 h-3.5" /> Unavailable</>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Orders Table */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#F1F3F5] text-xs text-[#2C2C2C]/60 uppercase tracking-wide">
                <tr>
                  <th className="text-left px-6 py-4">Item</th>
                  <th className="text-left px-6 py-4">Type</th>
                  <th className="text-left px-6 py-4">Buyer / Renter</th>
                  <th className="text-left px-6 py-4">Seller / Owner</th>
                  <th className="text-left px-6 py-4">Total</th>
                  <th className="text-left px-6 py-4">Commission</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-left px-6 py-4">Date</th>
                  <th className="text-left px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F3F5]">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-[#2C2C2C]/40">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#F1F3F5]/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-sm text-[#2C2C2C]">{o.item?.title || "—"}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            o.transaction_type === "sale"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-teal-50 text-[#1DA5A6]"
                          }`}
                        >
                          {o.transaction_type === "sale" ? "Sale" : "Rental"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2C2C2C]/70">{o.borrower?.full_name || "—"}</td>
                      <td className="px-6 py-4 text-sm text-[#2C2C2C]/70">{o.lender?.full_name || "—"}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#2C2C2C]">EGP {o.total_price}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">EGP {(o.platform_fee || 0).toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F1F3F5] text-[#2C2C2C]/70 capitalize">
                          {o.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2C2C2C]/50">
                        {new Date(o.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {o.status === "cancelled" && o.item && o.item.available === false ? (
                          <button
                            onClick={() => approveCancellation(o.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1DA5A6]/10 text-[#1DA5A6] hover:bg-[#1DA5A6]/20 transition-all"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Approve &amp; restore
                          </button>
                        ) : o.status === "cancelled" ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600">
                            <CheckCircle className="w-3.5 h-3.5" /> Restored
                          </span>
                        ) : (
                          <span className="text-xs text-[#2C2C2C]/30">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Chats */}
        {activeTab === "chats" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-[#F1F3F5]">
            {filteredConversations.length === 0 ? (
              <div className="px-6 py-12 text-center text-[#2C2C2C]/40">No conversations found</div>
            ) : (
              filteredConversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => openConversation(c)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 hover:bg-[#F1F3F5]/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-[#2C2C2C] truncate">
                        {c.participants.map((p) => p.full_name || "Unknown").join("  ↔  ") || "Conversation"}
                      </p>
                      <p className="text-xs text-[#2C2C2C]/50 truncate">
                        {c.last_message || "No messages yet"}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[#2C2C2C]/40 flex-shrink-0">
                    {c.last_message_at ? new Date(c.last_message_at).toLocaleDateString() : ""}
                  </span>
                </button>
              ))
            )}
          </div>
        )}

        {/* Support Tickets */}
        {activeTab === "support" && (
          <div className="space-y-4">
            {filteredTickets.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm px-6 py-12 text-center text-[#2C2C2C]/40">
                No support tickets
              </div>
            ) : (
              filteredTickets.map((t) => {
                const resolved = t.status === "resolved";
                return (
                  <div key={t.id} className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-[#2C2C2C]">{t.subject || "(No subject)"}</h3>
                          {t.category && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-[#1DA5A6] capitalize">
                              {t.category}
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                              resolved ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {t.status || "open"}
                          </span>
                        </div>
                        <p className="text-xs text-[#2C2C2C]/50 mb-3">
                          {t.name || "Unknown"} · {t.email || "—"} · {new Date(t.created_at).toLocaleString()}
                        </p>
                        <p className="text-sm text-[#2C2C2C]/80 whitespace-pre-wrap">{t.message}</p>
                      </div>
                      <button
                        onClick={() => resolveTicket(t.id, resolved ? "open" : "resolved")}
                        className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                          resolved
                            ? "bg-[#F1F3F5] text-[#2C2C2C]/60 hover:bg-[#2C2C2C]/10"
                            : "bg-[#1DA5A6]/10 text-[#1DA5A6] hover:bg-[#1DA5A6]/20"
                        }`}
                      >
                        {resolved ? (
                          <><RotateCcw className="w-3.5 h-3.5" /> Reopen</>
                        ) : (
                          <><CheckCircle className="w-3.5 h-3.5" /> Mark resolved</>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>

      {/* Chat thread modal */}
      {openChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setOpenChat(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F3F5]">
              <div>
                <h3 className="font-bold text-[#2C2C2C]">Conversation</h3>
                <p className="text-xs text-[#2C2C2C]/50">
                  {openChat.participants.map((p) => p.full_name || "Unknown").join("  ↔  ")}
                </p>
              </div>
              <button onClick={() => setOpenChat(null)} className="text-[#2C2C2C]/40 hover:text-[#2C2C2C] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {chatLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-6 h-6 border-2 border-[#1DA5A6] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : chatMessages.length === 0 ? (
                <p className="text-center text-sm text-[#2C2C2C]/40 py-8">No messages in this conversation</p>
              ) : (
                chatMessages.map((m) => (
                  <div key={m.id} className="bg-[#F1F3F5] rounded-xl px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#1DA5A6]">{m.sender?.full_name || "Unknown"}</span>
                      <span className="text-xs text-[#2C2C2C]/40">{new Date(m.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-[#2C2C2C]">{m.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
