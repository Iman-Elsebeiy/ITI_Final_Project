"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Heart,
  MapPin,
  Star,
  TrendingUp,
  Package,
  Grid3x3,
  List,
} from "lucide-react";
import { getItems, getItemCount } from "@/lib/data/items";
import { toggleFavorite, getFavoriteCount } from "@/lib/data/favorites";
import type { Item, Profile } from "@/lib/types";
import { CATEGORIES, CATEGORY_ICONS, PERIOD_LABELS, CONDITION_LABELS } from "@/lib/types";

export default function BrowsePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [items, setItems] = useState<Item[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    setLoading(true);
    const category = selectedCategory === "All Categories" ? undefined : selectedCategory;
    const search = searchQuery || undefined;
    const [fetchedItems, count, favorites] = await Promise.all([
      getItems({ category, search, sortBy }),
      getItemCount(),
      getFavoriteCount(),
    ]);
    setItems(fetchedItems);
    setItemCount(count);
    setFavCount(favorites);
    setLoading(false);
  }, [selectedCategory, searchQuery, sortBy]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleToggleFavorite = async (itemId: string) => {
    const result = await toggleFavorite(itemId);
    if (result.success) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, is_favorite: result.isFavorite } : item
        )
      );
      setFavCount((prev) => (result.isFavorite ? prev + 1 : prev - 1));
    }
  };

  const categoryOptions = ["All Categories", ...CATEGORIES];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Browse Items</h1>
        <p className="text-[#2C2C2C]/60">Discover tools and equipment from fellow students</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2C2C2C]">{itemCount}</p>
              <p className="text-xs text-[#2C2C2C]/60">Available Items</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2C2C2C]">{items.length}</p>
              <p className="text-xs text-[#2C2C2C]/60">Results</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2C2C2C]">
                {CATEGORIES.indexOf(selectedCategory) >= 0 ? selectedCategory.split(" ")[0] : "All"}
              </p>
              <p className="text-xs text-[#2C2C2C]/60">Category</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1DA5A6]/10 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#1DA5A6]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2C2C2C]">{favCount}</p>
              <p className="text-xs text-[#2C2C2C]/60">Your Favorites</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for items..."
              className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 transition-all"
            />
          </div>
          <div className="md:col-span-4 relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 transition-all appearance-none cursor-pointer"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All Categories" ? cat : `${CATEGORY_ICONS[cat] || ""} ${cat}`}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-12 px-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 transition-all appearance-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          <div className="md:col-span-1 flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-all ${viewMode === "grid" ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white" : "bg-[#F1F3F5] text-[#2C2C2C]/60"}`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-all ${viewMode === "list" ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white" : "bg-[#F1F3F5] text-[#2C2C2C]/60"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-[#1DA5A6] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <Package className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">No Items Found</h3>
          <p className="text-[#2C2C2C]/60 mb-6">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {items.map((item) => {
            const owner = item.owner as unknown as Profile;
            const ownerName = owner?.full_name || "Unknown";
            const ownerInitials = ownerName.split(" ").map((n) => n[0]).join("").toUpperCase();
            const imageUrl = item.image_paths?.[0] || "https://via.placeholder.com/300?text=No+Image";

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer ${viewMode === "list" ? "flex" : ""}`}
                onClick={() => router.push(`/browse`)}
              >
                <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                  <div className="relative">
                    <img src={imageUrl} alt={item.title} className={`w-full object-cover ${viewMode === "grid" ? "h-48" : "h-full"}`} />
                    {!item.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="px-4 py-2 bg-white rounded-lg font-bold text-sm">Not Available</span>
                      </div>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleToggleFavorite(item.id); }}
                      className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Heart className={`w-5 h-5 ${item.is_favorite ? "fill-red-500 text-red-500" : "text-[#2C2C2C]/60"}`} />
                    </button>
                    <span className="absolute top-3 left-3 px-3 py-1 bg-[#1DA5A6] text-white text-xs font-bold rounded-lg">
                      {CONDITION_LABELS[item.condition] || item.condition}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#2C2C2C] mb-1 line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-[#2C2C2C]/60 mb-2">
                        {CATEGORY_ICONS[item.category] || ""} {item.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#2C2C2C]/60 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#2C2C2C]/10">
                    <div>
                      <p className="text-2xl font-bold text-[#1DA5A6]">EGP {item.price}</p>
                      <p className="text-xs text-[#2C2C2C]/60">{PERIOD_LABELS[item.rental_period] || item.rental_period}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {ownerInitials}
                      </div>
                      <span className="text-sm text-[#2C2C2C]/70">{ownerName}</span>
                    </div>
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
