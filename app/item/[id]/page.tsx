"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Calendar,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShoppingCart,
  Package,
  Tag,
  Clock,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import { getItemById } from "@/lib/data/items";
import { toggleFavorite } from "@/lib/data/favorites";
import { getOrCreateConversation } from "@/lib/data/messages";
import { createRental } from "@/lib/data/rentals";
import { getCurrentProfile } from "@/lib/data/profile";
import { PERIOD_LABELS, CONDITION_LABELS, CATEGORY_ICONS } from "@/lib/types";
import type { Item, Profile } from "@/lib/types";

const CONDITION_COLORS: Record<string, string> = {
  new: "bg-green-100 text-green-700",
  "like-new": "bg-teal-100 text-teal-700",
  excellent: "bg-blue-100 text-blue-700",
  good: "bg-yellow-100 text-yellow-700",
  fair: "bg-orange-100 text-orange-700",
};

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [item, setItem] = useState<Item | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [rentLoading, setRentLoading] = useState(false);
  const [rentError, setRentError] = useState("");
  const [rentSuccess, setRentSuccess] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    async function load() {
      const [itemData, profile] = await Promise.all([
        getItemById(id),
        getCurrentProfile(),
      ]);
      setItem(itemData);
      setCurrentUserId(profile?.id || null);
      setIsFavorite(itemData?.is_favorite || false);
      setLoading(false);
    }
    load();
  }, [id]);

  const owner = item?.owner as unknown as Profile | undefined;
  const isOwner = currentUserId && item && currentUserId === item.owner_id;
  const images = item?.image_paths?.length ? item.image_paths : [""];

  const calcTotal = () => {
    if (!startDate || !endDate || !item) return null;
    const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return null;
    const multiplier: Record<string, number> = { hourly: days * 24, daily: days, weekly: Math.ceil(days / 7), monthly: Math.ceil(days / 30), semester: 1 };
    return item.price * (multiplier[item.rental_period] || days);
  };

  const handleFavorite = async () => {
    if (!item) return;
    const prev = isFavorite;
    setIsFavorite(!prev);
    await toggleFavorite(item.id);
  };

  const handleContact = async () => {
    if (!owner) return;
    setContactLoading(true);
    const result = await getOrCreateConversation(owner.id);
    setContactLoading(false);
    if (result.conversationId) {
      router.push(`/messages?conv=${result.conversationId}`);
    }
  };

  const handleRent = async () => {
    if (!item || !startDate || !endDate) return;
    const total = calcTotal();
    if (!total) return;
    setRentLoading(true);
    setRentError("");
    const result = await createRental({
      item_id: item.id,
      lender_id: item.owner_id,
      total_price: total,
      start_date: startDate,
      end_date: endDate,
      pickup_location: item.location || undefined,
    });
    setRentLoading(false);
    if (result.error) {
      setRentError(result.error);
    } else {
      setRentSuccess(true);
      setTimeout(() => {
        setShowRentModal(false);
        setRentSuccess(false);
        router.push("/rentals");
      }, 1500);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#1DA5A6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <Package className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Item Not Found</h2>
        <p className="text-[#2C2C2C]/60 mb-6">This item may have been removed.</p>
        <button onClick={() => router.push("/browse")} className="px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold">
          Browse Items
        </button>
      </div>
    );
  }

  const total = calcTotal();

  return (
    <div className="max-w-5xl mx-auto">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-[#2C2C2C]/60 hover:text-[#2C2C2C] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-3">
          <div className="relative bg-[#F1F3F5] rounded-2xl overflow-hidden aspect-[4/3]">
            {images[0] ? (
              <img src={images[activeImage]} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-20 h-20 text-[#2C2C2C]/20" />
              </div>
            )}

            {!item.available && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="px-6 py-3 bg-white rounded-xl font-bold text-lg text-[#2C2C2C]">Not Available</span>
              </div>
            )}

            {images.length > 1 && (
              <>
                <button onClick={() => setActiveImage((p) => (p - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                  <ChevronLeft className="w-5 h-5 text-[#2C2C2C]" />
                </button>
                <button onClick={() => setActiveImage((p) => (p + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                  <ChevronRight className="w-5 h-5 text-[#2C2C2C]" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setActiveImage(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? "bg-white w-4" : "bg-white/50"}`} />
                  ))}
                </div>
              </>
            )}

            <button onClick={handleFavorite}
              className="absolute top-3 right-3 w-11 h-11 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-[#2C2C2C]/60"}`} />
            </button>

            <span className={`absolute top-3 left-3 px-3 py-1.5 rounded-lg text-xs font-bold ${CONDITION_COLORS[item.condition] || "bg-gray-100 text-gray-700"}`}>
              {CONDITION_LABELS[item.condition] || item.condition}
            </span>
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === activeImage ? "border-[#1DA5A6]" : "border-transparent"}`}>
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Item Info */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-[#2C2C2C]/60">{CATEGORY_ICONS[item.category] || ""} {item.category}</span>
            </div>
            <h1 className="text-2xl font-bold text-[#2C2C2C] mb-3">{item.title}</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#1DA5A6]">EGP {item.price}</span>
              <span className="text-[#2C2C2C]/60">{PERIOD_LABELS[item.rental_period]}</span>
            </div>
            {item.deposit > 0 && (
              <p className="text-sm text-[#2C2C2C]/60 mt-1 flex items-center gap-1">
                <Shield className="w-4 h-4" /> Security deposit: EGP {item.deposit}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {item.location && (
              <div className="flex items-center gap-2 p-3 bg-[#F1F3F5] rounded-xl">
                <MapPin className="w-4 h-4 text-[#1DA5A6] flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#2C2C2C]/60">Location</p>
                  <p className="text-sm font-semibold text-[#2C2C2C] truncate">{item.location}</p>
                </div>
              </div>
            )}
            {item.availability_date && (
              <div className="flex items-center gap-2 p-3 bg-[#F1F3F5] rounded-xl">
                <Calendar className="w-4 h-4 text-[#1DA5A6] flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#2C2C2C]/60">Available From</p>
                  <p className="text-sm font-semibold text-[#2C2C2C]">{new Date(item.availability_date).toLocaleDateString()}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 p-3 bg-[#F1F3F5] rounded-xl">
              <Tag className="w-4 h-4 text-[#1DA5A6] flex-shrink-0" />
              <div>
                <p className="text-xs text-[#2C2C2C]/60">Condition</p>
                <p className="text-sm font-semibold text-[#2C2C2C]">{CONDITION_LABELS[item.condition]}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-[#F1F3F5] rounded-xl">
              <Clock className="w-4 h-4 text-[#1DA5A6] flex-shrink-0" />
              <div>
                <p className="text-xs text-[#2C2C2C]/60">Rental Period</p>
                <p className="text-sm font-semibold text-[#2C2C2C]">{PERIOD_LABELS[item.rental_period]}</p>
              </div>
            </div>
          </div>

          {item.description && (
            <div className="p-4 bg-[#F1F3F5] rounded-xl">
              <h3 className="font-semibold text-[#2C2C2C] mb-2">Description</h3>
              <p className="text-sm text-[#2C2C2C]/70 leading-relaxed">{item.description}</p>
            </div>
          )}

          {/* Owner */}
          {owner && (
            <div className="flex items-center gap-3 p-4 bg-[#F1F3F5] rounded-xl">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                {owner.avatar_url ? (
                  <img src={owner.avatar_url} alt={owner.full_name || ""} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1DA5A6] to-[#194774] flex items-center justify-center text-white font-bold">
                    {(owner.full_name || "?").split(" ").map((n) => n[0]).join("").toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#2C2C2C] truncate">{owner.full_name || "Unknown"}</p>
                {owner.university && <p className="text-sm text-[#2C2C2C]/60 truncate">{owner.university}</p>}
              </div>
              {!isOwner && (
                <div className="flex items-center gap-1 text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>Owner</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {isOwner ? (
            <div className="flex gap-3">
              <Link href="/list-item" className="flex-1 h-14 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                <Package className="w-5 h-5" /> Edit Item
              </Link>
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={() => setShowRentModal(true)} disabled={!item.available}
                className="flex-1 h-14 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <ShoppingCart className="w-5 h-5" />
                {item.available ? "Rent Now" : "Not Available"}
              </button>
              <button onClick={handleContact} disabled={contactLoading}
                className="flex-1 h-14 bg-white border-2 border-[#1DA5A6] text-[#1DA5A6] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#1DA5A6]/5 transition-all disabled:opacity-50">
                {contactLoading ? (
                  <div className="w-5 h-5 border-2 border-[#1DA5A6] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <MessageCircle className="w-5 h-5" />
                )}
                Contact Owner
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Rent Modal */}
      {showRentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowRentModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <button onClick={() => setShowRentModal(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F1F3F5] transition-colors">
              <X className="w-5 h-5 text-[#2C2C2C]/60" />
            </button>

            {rentSuccess ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">Rental Request Sent!</h3>
                <p className="text-[#2C2C2C]/60">Redirecting to your rentals...</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-1">Rent This Item</h3>
                <p className="text-sm text-[#2C2C2C]/60 mb-6">{item.title}</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Start Date</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full h-12 px-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">End Date</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || new Date().toISOString().split("T")[0]}
                      className="w-full h-12 px-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30" />
                  </div>

                  {total !== null && (
                    <div className="p-4 bg-[#1DA5A6]/5 border border-[#1DA5A6]/20 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#2C2C2C]/70">Estimated Total</span>
                        <span className="text-xl font-bold text-[#1DA5A6]">EGP {total.toFixed(2)}</span>
                      </div>
                      {item.deposit > 0 && (
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-[#2C2C2C]/60">+ Security Deposit</span>
                          <span className="text-sm font-semibold text-[#2C2C2C]/70">EGP {item.deposit}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {rentError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {rentError}
                    </div>
                  )}

                  <button onClick={handleRent} disabled={!startDate || !endDate || !total || rentLoading}
                    className="w-full h-14 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {rentLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Confirm Rental{total ? ` — EGP ${total.toFixed(2)}` : ""}
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
