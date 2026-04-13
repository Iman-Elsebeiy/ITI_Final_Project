"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  MapPin,
  Star,
  Package,
  Trash2,
  ShoppingCart,
} from "lucide-react";
import { getUserFavorites, toggleFavorite } from "@/lib/data/favorites";
import type { Item, Profile } from "@/lib/types";
import { PERIOD_LABELS, CONDITION_LABELS } from "@/lib/types";

type FavoriteItem = Item & { favorite_id: string; added_at: string };

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getUserFavorites();
      setFavorites(data as FavoriteItem[]);
      setLoading(false);
    }
    load();
  }, []);

  const removeFavorite = async (itemId: string) => {
    const result = await toggleFavorite(itemId);
    if (result.success) {
      setFavorites(favorites.filter((item) => item.id !== itemId));
    }
  };

  const removeSelected = async () => {
    for (const id of selectedItems) {
      await toggleFavorite(id);
    }
    setFavorites(favorites.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  function getTimeAgo(dateStr: string): string {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week(s) ago`;
    return `${Math.floor(diffDays / 30)} month(s) ago`;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#1DA5A6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">My Favorites</h1>
        <p className="text-[#2C2C2C]/60">Items you&apos;ve saved for later ({favorites.length})</p>
      </div>

      {favorites.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={selectedItems.length === favorites.length}
                onChange={(e) => setSelectedItems(e.target.checked ? favorites.map((item) => item.id) : [])}
                className="w-5 h-5 rounded border-2 border-[#2C2C2C]/20 text-[#1DA5A6] focus:ring-2 focus:ring-[#1DA5A6]/30 cursor-pointer" />
              <span className="text-sm font-semibold text-[#2C2C2C]">{selectedItems.length > 0 ? `${selectedItems.length} selected` : "Select all"}</span>
            </div>
            {selectedItems.length > 0 && (
              <button onClick={removeSelected} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-500/20 transition-all">
                <Trash2 className="w-4 h-4" />Remove Selected
              </button>
            )}
          </div>
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <Heart className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">No Favorites Yet</h3>
          <p className="text-[#2C2C2C]/60 mb-6">Start adding items you like to your favorites</p>
          <button onClick={() => router.push("/browse")} className="px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            Browse Items
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => {
            const owner = item.owner as unknown as Profile;
            const imageUrl = item.image_paths?.[0] || "https://via.placeholder.com/300?text=No+Image";

            return (
              <div key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden">
                <div className="p-3 border-b border-[#2C2C2C]/5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4 rounded border-2 border-[#2C2C2C]/20 text-[#1DA5A6] focus:ring-2 focus:ring-[#1DA5A6]/30 cursor-pointer" />
                    <span className="text-xs text-[#2C2C2C]/60">Added {getTimeAgo(item.added_at)}</span>
                  </label>
                </div>
                <div className="relative">
                  <img src={imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                  {!item.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="px-4 py-2 bg-white rounded-lg font-bold text-sm">Not Available</span>
                    </div>
                  )}
                  <button onClick={() => removeFavorite(item.id)} className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#1DA5A6] text-white text-xs font-bold rounded-lg">
                    {CONDITION_LABELS[item.condition] || item.condition}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#2C2C2C] mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-[#2C2C2C]/60 mb-2">{item.category}</p>
                  <div className="flex items-center gap-2 text-sm text-[#2C2C2C]/60 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#2C2C2C]/10">
                    <div>
                      <p className="text-2xl font-bold text-[#1DA5A6]">EGP {item.price}</p>
                      <p className="text-xs text-[#2C2C2C]/60">{PERIOD_LABELS[item.rental_period] || item.rental_period}</p>
                    </div>
                    <button onClick={() => router.push(`/browse`)} disabled={!item.available}
                      className="px-4 py-2 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />Rent Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
