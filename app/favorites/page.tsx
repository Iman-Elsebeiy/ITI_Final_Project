"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  MapPin,
  Star,
  DollarSign,
  Package,
  Trash2,
  ShoppingCart,
} from "lucide-react";

type FavoriteItem = {
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
  addedDate: string;
};

const mockFavorites: FavoriteItem[] = [
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
    addedDate: "2 days ago",
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
    addedDate: "1 week ago",
  },
  {
    id: "3",
    title: "MacBook Pro 2020 M1",
    category: "💻 Electronics & Gadgets",
    price: 500,
    period: "Per Week",
    image: "https://via.placeholder.com/300",
    owner: "Omar Khaled",
    ownerAvatar: "OK",
    rating: 4.9,
    reviews: 18,
    location: "Library",
    condition: "Excellent",
    available: false,
    addedDate: "3 weeks ago",
  },
];

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteItem[]>(mockFavorites);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const removeSelected = () => {
    setFavorites(favorites.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">My Favorites</h1>
        <p className="text-[#2C2C2C]/60">
          Items you've saved for later ({favorites.length})
        </p>
      </div>

      {/* Actions Bar */}
      {favorites.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedItems.length === favorites.length}
                onChange={(e) =>
                  setSelectedItems(
                    e.target.checked ? favorites.map((item) => item.id) : []
                  )
                }
                className="w-5 h-5 rounded border-2 border-[#2C2C2C]/20 text-[#1DA5A6] focus:ring-2 focus:ring-[#1DA5A6]/30 cursor-pointer"
              />
              <span className="text-sm font-semibold text-[#2C2C2C]">
                {selectedItems.length > 0
                  ? `${selectedItems.length} selected`
                  : "Select all"}
              </span>
            </div>

            {selectedItems.length > 0 && (
              <button
                onClick={removeSelected}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-500/20 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Remove Selected
              </button>
            )}
          </div>
        </div>
      )}

      {/* Favorites Grid */}
      {favorites.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <Heart className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">
            No Favorites Yet
          </h3>
          <p className="text-[#2C2C2C]/60 mb-6">
            Start adding items you like to your favorites
          </p>
          <button
            onClick={() => router.push("/browse")}
            className="px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Browse Items
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Selection Checkbox */}
              <div className="p-3 border-b border-[#2C2C2C]/5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="w-4 h-4 rounded border-2 border-[#2C2C2C]/20 text-[#1DA5A6] focus:ring-2 focus:ring-[#1DA5A6]/30 cursor-pointer"
                  />
                  <span className="text-xs text-[#2C2C2C]/60">
                    Added {item.addedDate}
                  </span>
                </label>
              </div>

              {/* Item Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                {!item.available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-4 py-2 bg-white rounded-lg font-bold text-sm">
                      Not Available
                    </span>
                  </div>
                )}
                <button
                  onClick={() => removeFavorite(item.id)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#1DA5A6] text-white text-xs font-bold rounded-lg">
                  {item.condition}
                </span>
              </div>

              {/* Item Details */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#2C2C2C] mb-1 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#2C2C2C]/60 mb-2">{item.category}</p>

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

                <div className="flex items-center gap-2 text-sm text-[#2C2C2C]/60 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#2C2C2C]/10">
                  <div>
                    <p className="text-2xl font-bold text-[#1DA5A6]">
                      EGP {item.price}
                    </p>
                    <p className="text-xs text-[#2C2C2C]/60">{item.period}</p>
                  </div>
                  <button
                    onClick={() => router.push(`/items/${item.id}`)}
                    disabled={!item.available}
                    className="px-4 py-2 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}