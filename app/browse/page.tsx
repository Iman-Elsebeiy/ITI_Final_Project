"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Heart,
  MapPin,
  Star,
  TrendingUp,
  Clock,
  DollarSign,
  Package,
  Grid3x3,
  List,
} from "lucide-react";

type Item = {
  id: string;
  title: string;
  category: string;
  price: number;
  period: string;
  image: string;
  owner: string;
  ownerAvatar: string;
  rating: number;
  reviews: number;
  location: string;
  condition: string;
  available: boolean;
  isFavorite: boolean;
};

const mockItems: Item[] = [
  {
    id: "1",
    title: "Scientific Calculator TI-84 Plus",
    category: "📚 Books & Textbooks",
    price: 50,
    period: "Per Week",
    image: "https://via.placeholder.com/300",
    owner: "Ahmed Hassan",
    ownerAvatar: "AH",
    rating: 4.8,
    reviews: 24,
    location: "Main Campus",
    condition: "Excellent",
    available: true,
    isFavorite: false,
  },
  {
    id: "2",
    title: "Canon EOS M50 Digital Camera",
    category: "📷 Photography Equipment",
    price: 200,
    period: "Per Day",
    image: "https://via.placeholder.com/300",
    owner: "Sara Mohamed",
    ownerAvatar: "SM",
    rating: 5.0,
    reviews: 15,
    location: "Arts Building",
    condition: "Like New",
    available: true,
    isFavorite: true,
  },
  {
    id: "3",
    title: "Engineering Drawing Set Complete",
    category: "📐 Engineering Tools",
    price: 30,
    period: "Per Week",
    image: "https://via.placeholder.com/300",
    owner: "Omar Khaled",
    ownerAvatar: "OK",
    rating: 4.5,
    reviews: 32,
    location: "Engineering Block",
    condition: "Good",
    available: true,
    isFavorite: false,
  },
  {
    id: "4",
    title: "MacBook Pro 2020 M1",
    category: "💻 Electronics & Gadgets",
    price: 500,
    period: "Per Week",
    image: "https://via.placeholder.com/300",
    owner: "Layla Ibrahim",
    ownerAvatar: "LI",
    rating: 4.9,
    reviews: 18,
    location: "Library",
    condition: "Excellent",
    available: false,
    isFavorite: false,
  },
  {
    id: "5",
    title: "Organic Chemistry Textbook",
    category: "📚 Books & Textbooks",
    price: 40,
    period: "Per Month",
    image: "https://via.placeholder.com/300",
    owner: "Mona Ali",
    ownerAvatar: "MA",
    rating: 4.7,
    reviews: 41,
    location: "Science Building",
    condition: "Good",
    available: true,
    isFavorite: true,
  },
  {
    id: "6",
    title: "Arduino Starter Kit",
    category: "🔬 Lab Equipment",
    price: 80,
    period: "Per Week",
    image: "https://via.placeholder.com/300",
    owner: "Youssef Gamal",
    ownerAvatar: "YG",
    rating: 4.6,
    reviews: 28,
    location: "Lab Building",
    condition: "Excellent",
    available: true,
    isFavorite: false,
  },
];

const categories = [
  "All Categories",
  "📚 Books & Textbooks",
  "💻 Electronics & Gadgets",
  "🔬 Lab Equipment",
  "📐 Engineering Tools",
  "🎨 Art Supplies",
  "📷 Photography Equipment",
  "⚽ Sports Equipment",
  "🎵 Musical Instruments",
];

export default function BrowsePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [favorites, setFavorites] = useState<string[]>(
    mockItems.filter((item) => item.isFavorite).map((item) => item.id)
  );

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredItems = mockItems.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">
          Browse Items
        </h1>
        <p className="text-[#2C2C2C]/60">
          Discover tools and equipment from fellow students
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2C2C2C]">{mockItems.length}</p>
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
              <p className="text-2xl font-bold text-[#2C2C2C]">245</p>
              <p className="text-xs text-[#2C2C2C]/60">Active Lenders</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2C2C2C]">4.8</p>
              <p className="text-xs text-[#2C2C2C]/60">Avg Rating</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1DA5A6]/10 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#1DA5A6]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#2C2C2C]">{favorites.length}</p>
              <p className="text-xs text-[#2C2C2C]/60">Your Favorites</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search */}
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

          {/* Category */}
          <div className="md:col-span-4 relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 transition-all appearance-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-12 px-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 transition-all appearance-none cursor-pointer"
            >
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="md:col-span-1 flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-all ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white"
                  : "bg-[#F1F3F5] text-[#2C2C2C]/60"
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-all ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white"
                  : "bg-[#F1F3F5] text-[#2C2C2C]/60"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <Package className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">
            No Items Found
          </h3>
          <p className="text-[#2C2C2C]/60 mb-6">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer ${
                viewMode === "list" ? "flex" : ""
              }`}
              onClick={() => router.push(`/items/${item.id}`)}
            >
              {/* Item Image */}
              <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full object-cover ${
                      viewMode === "grid" ? "h-48" : "h-full"
                    }`}
                  />
                  {!item.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="px-4 py-2 bg-white rounded-lg font-bold text-sm">
                        Not Available
                      </span>
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(item.id)
                          ? "fill-red-500 text-red-500"
                          : "text-[#2C2C2C]/60"
                      }`}
                    />
                  </button>
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#1DA5A6] text-white text-xs font-bold rounded-lg">
                    {item.condition}
                  </span>
                </div>
              </div>

              {/* Item Details */}
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#2C2C2C] mb-1 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#2C2C2C]/60 mb-2">
                      {item.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FFC83D] text-[#FFC83D]" />
                    <span className="text-sm font-semibold text-[#2C2C2C]">
                      {item.rating}
                    </span>
                  </div>
                  <span className="text-xs text-[#2C2C2C]/60">
                    ({item.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#2C2C2C]/60 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#2C2C2C]/10">
                  <div>
                    <p className="text-2xl font-bold text-[#1DA5A6]">
                      EGP {item.price}
                    </p>
                    <p className="text-xs text-[#2C2C2C]/60">{item.period}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {item.ownerAvatar}
                    </div>
                    <span className="text-sm text-[#2C2C2C]/70">
                      {item.owner}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}