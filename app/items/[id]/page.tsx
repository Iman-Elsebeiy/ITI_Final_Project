import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";
import { publicEnv } from "@/lib/public-env";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  MapPin,
  Star,
  Tag,
  User,
} from "lucide-react";

type ItemDetailsPageProps = {
  params: {
    id: string;
  };
};

export default async function ItemDetailsPage({ params }: ItemDetailsPageProps) {
  const supabase = await createSupabaseServer();
  const { data: item, error } = await supabase
    .from("items")
    .select("*, profiles(full_name, university)")
    .eq("id", params.id)
    .single();

  if (error || !item) {
    return notFound();
  }

  const imageUrls = (item.image_paths || []).map((path: string) => {
    const { data } = supabase.storage
      .from(publicEnv.NEXT_PUBLIC_SUPABASE_ITEM_IMAGES_BUCKET)
      .getPublicUrl(path);
    return data?.publicUrl || "";
  });

  const ownerName = item.profiles?.full_name || "Unknown Owner";
  const ownerUniversity = item.profiles?.university || "University";
  const ownerInitials = ownerName
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-[#2C2C2C]/70 hover:text-[#2C2C2C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Link>
        <span
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
            item.available
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          <Tag className="w-4 h-4" />
          {item.available ? "Available" : "Not available"}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
            {imageUrls.length > 0 ? (
              <img
                src={imageUrls[0]}
                alt={item.title}
                className="w-full h-[420px] object-cover"
              />
            ) : (
              <div className="w-full h-[420px] bg-[#F1F3F5] flex items-center justify-center text-[#2C2C2C]/60">
                No image available
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-[#2C2C2C]/60">{item.category}</p>
                <h1 className="text-3xl font-bold text-[#2C2C2C] mt-2">
                  {item.title}
                </h1>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#2C2C2C]/60">Per {item.rental_period}</p>
                <p className="text-4xl font-black text-[#1DA5A6] mt-2">
                  EGP {item.price}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-[#F1F3F5] p-5">
                <p className="text-sm text-[#2C2C2C]/60">Condition</p>
                <p className="text-lg font-semibold text-[#2C2C2C] mt-2">
                  {item.condition}
                </p>
              </div>
              <div className="rounded-3xl bg-[#F1F3F5] p-5">
                <p className="text-sm text-[#2C2C2C]/60">Location</p>
                <p className="text-lg font-semibold text-[#2C2C2C] mt-2">
                  {item.location}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <p className="text-sm text-[#2C2C2C]/60">Description</p>
                <p className="mt-3 text-[#2C2C2C] leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#F1F3F5] p-5">
                  <p className="text-sm text-[#2C2C2C]/60">Deposit</p>
                  <p className="text-lg font-semibold text-[#2C2C2C] mt-2">
                    EGP {item.deposit ?? 0}
                  </p>
                </div>
                <div className="rounded-3xl bg-[#F1F3F5] p-5">
                  <p className="text-sm text-[#2C2C2C]/60">Available From</p>
                  <p className="text-lg font-semibold text-[#2C2C2C] mt-2">
                    {new Date(item.availability_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1DA5A6] text-white grid place-items-center text-xl font-bold">
                {ownerInitials}
              </div>
              <div>
                <p className="text-sm text-[#2C2C2C]/60">Listed by</p>
                <p className="text-lg font-semibold text-[#2C2C2C]">
                  {ownerName}
                </p>
                <p className="text-sm text-[#2C2C2C]/60">{ownerUniversity}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-[#2C2C2C]/60">
                <Star className="w-4 h-4 text-yellow-500" />
                Rated 4.8 based on community feedback
              </div>
              <div className="flex items-center gap-2 text-sm text-[#2C2C2C]/60">
                <MapPin className="w-4 h-4" />
                Pickup from {item.location}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[#2C2C2C]/60">Need help?</p>
              <span className="text-sm text-[#1DA5A6]">Contact owner</span>
            </div>
            <div className="space-y-3 text-[#2C2C2C]/70 text-sm">
              <p className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Fast replies from seller
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Flexible rental windows
              </p>
              <p className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Secure pay-on-pickup
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
