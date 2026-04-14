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
  Activity,
  TrendingUp,
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

type Stats = {
  totalUsers: number;
  totalItems: number;
  availableItems: number;
};

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"users" | "items">("users");
  const [users, setUsers] = useState<UserRow[]>([]);
  const [items, setItems] = useState<ItemRow[]>([]);
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalItems: 0, availableItems: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [uRes, iRes] = await Promise.all([
      fetch("/api/admin/users"),
      fetch("/api/admin/items"),
    ]);
    const uData = await uRes.json();
    const iData = await iRes.json();

    if (uData.error || iData.error) {
      router.push("/login");
      return;
    }

    setUsers(uData.users || []);
    setItems(iData.items || []);
    setStats({
      totalUsers: uData.users?.length || 0,
      totalItems: iData.items?.length || 0,
      availableItems: iData.items?.filter((i: ItemRow) => i.available).length || 0,
    });
    setLoading(false);
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
        <div className="grid grid-cols-3 gap-4 mb-8">
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
              <p className="text-sm text-[#2C2C2C]/60">Available Items</p>
            </div>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex bg-white rounded-xl p-1 shadow-sm">
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
      </main>
    </div>
  );
}
