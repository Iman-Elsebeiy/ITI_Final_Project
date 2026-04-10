"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Upload,
  X,
  Package,
  DollarSign,
  Calendar,
  Tag,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react";

type ListItemFormData = {
  title: string;
  category: string;
  description: string;
  condition: string;
  price: number;
  rentalPeriod: string;
  availability: string;
  location: string;
  deposit: number;
  images: FileList;
};

const categories = [
  "📚 Books & Textbooks",
  "💻 Electronics & Gadgets",
  "🔬 Lab Equipment",
  "📐 Engineering Tools",
  "🎨 Art Supplies",
  "📷 Photography Equipment",
  "⚽ Sports Equipment",
  "🎵 Musical Instruments",
  "🔧 Power Tools",
  "📱 Mobile Accessories",
  "🖨️ Printers & Scanners",
  "🎮 Gaming Consoles",
  "Other",
];

const conditions = [
  { value: "new", label: "Brand New", emoji: "✨" },
  { value: "like-new", label: "Like New", emoji: "🌟" },
  { value: "excellent", label: "Excellent", emoji: "👍" },
  { value: "good", label: "Good", emoji: "👌" },
  { value: "fair", label: "Fair", emoji: "🆗" },
];

const rentalPeriods = [
  { value: "hourly", label: "Per Hour", icon: "⏰" },
  { value: "daily", label: "Per Day", icon: "📅" },
  { value: "weekly", label: "Per Week", icon: "📆" },
  { value: "monthly", label: "Per Month", icon: "🗓️" },
  { value: "semester", label: "Per Semester", icon: "📚" },
];

export default function ListItemPage() {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ListItemFormData>();

  const selectedCategory = watch("category");
  const selectedCondition = watch("condition");
  const selectedPeriod = watch("rentalPeriod");

  const onSubmit = async (data: ListItemFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Item data:", {
      ...data,
      images: uploadedImages,
    });

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Redirect after success
    setTimeout(() => {
      router.push("/home");
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedImages((prev) => [...prev, ...filesArray].slice(0, 5)); // Max 5 images
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center animate-scale-in">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-4">
            Item Listed Successfully! 🎉
          </h1>
          <p className="text-[#2C2C2C]/60 mb-8">
            Your item is now live and visible to other students. You'll receive
            notifications when someone is interested.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push("/home")}
              className="px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white border-2 border-[#2C2C2C]/10 text-[#2C2C2C] rounded-xl font-semibold hover:border-[#1DA5A6]/30 transition-all"
            >
              List Another Item
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#2C2C2C]/60 hover:text-[#2C2C2C] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">
          List a New Item
        </h1>
        <p className="text-[#2C2C2C]/60">
          Share your tools and start earning money
        </p>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <p className="font-semibold mb-1">Tips for a great listing:</p>
          <ul className="list-disc list-inside space-y-1 text-blue-700">
            <li>Use clear, high-quality photos</li>
            <li>Describe the item's condition honestly</li>
            <li>Set competitive rental prices</li>
            <li>Be responsive to messages</li>
          </ul>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Images Upload */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#1DA5A6]" />
            Item Photos
          </h2>

          <div className="space-y-4">
            {/* Upload Area */}
            <div className="relative border-2 border-dashed border-[#2C2C2C]/20 rounded-xl p-8 hover:border-[#1DA5A6]/50 transition-all">
              <input
                type="file"
                {...register("images", {
                  required: uploadedImages.length === 0 && "At least one photo is required",
                })}
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <Upload className="w-12 h-12 text-[#2C2C2C]/40 mx-auto mb-4" />
                <p className="text-sm font-semibold text-[#2C2C2C] mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-[#2C2C2C]/60">
                  PNG, JPG up to 10MB (Max 5 photos)
                </p>
              </div>
            </div>

            {/* Image Preview */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {uploadedImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 bg-[#1DA5A6] text-white text-xs px-2 py-0.5 rounded">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images.message}</p>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#1DA5A6]" />
            Basic Information
          </h2>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Item Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters",
                  },
                })}
                placeholder="e.g., Scientific Calculator TI-84 Plus"
                className={`w-full h-12 px-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                  errors.title ? "ring-2 ring-red-500" : "focus:ring-[#1DA5A6]/30"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                <select
                  {...register("category", { required: "Category is required" })}
                  className={`w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                    errors.category
                      ? "ring-2 ring-red-500"
                      : "focus:ring-[#1DA5A6]/30"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message: "Description must be at least 20 characters",
                  },
                })}
                rows={4}
                placeholder="Describe your item, its features, and any important details..."
                className={`w-full px-4 py-3 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.description
                    ? "ring-2 ring-red-500"
                    : "focus:ring-[#1DA5A6]/30"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Condition <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {conditions.map((cond) => (
                  <label
                    key={cond.value}
                    className={`p-3 border-2 rounded-xl cursor-pointer transition-all text-center ${
                      selectedCondition === cond.value
                        ? "border-[#1DA5A6] bg-[#1DA5A6]/5"
                        : "border-[#2C2C2C]/10 hover:border-[#1DA5A6]/30"
                    }`}
                  >
                    <input
                      type="radio"
                      value={cond.value}
                      {...register("condition", { required: "Condition is required" })}
                      className="sr-only"
                    />
                    <div className="text-2xl mb-1">{cond.emoji}</div>
                    <p className="text-xs font-semibold text-[#2C2C2C]">
                      {cond.label}
                    </p>
                  </label>
                ))}
              </div>
              {errors.condition && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.condition.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pricing & Rental */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#1DA5A6]" />
            Pricing & Rental Period
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Rental Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#2C2C2C]/60">
                  EGP
                </span>
                <input
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be at least 1 EGP" },
                  })}
                  placeholder="50"
                  className={`w-full h-12 pl-16 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                    errors.price
                      ? "ring-2 ring-red-500"
                      : "focus:ring-[#1DA5A6]/30"
                  }`}
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
              )}
            </div>

            {/* Deposit */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Security Deposit <span className="text-[#2C2C2C]/40">(Optional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#2C2C2C]/60">
                  EGP
                </span>
                <input
                  type="number"
                  {...register("deposit", { min: 0 })}
                  placeholder="100"
                  className="w-full h-12 pl-16 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Rental Period */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
              Rental Period <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {rentalPeriods.map((period) => (
                <label
                  key={period.value}
                  className={`p-3 border-2 rounded-xl cursor-pointer transition-all text-center ${
                    selectedPeriod === period.value
                      ? "border-[#1DA5A6] bg-[#1DA5A6]/5"
                      : "border-[#2C2C2C]/10 hover:border-[#1DA5A6]/30"
                  }`}
                >
                  <input
                    type="radio"
                    value={period.value}
                    {...register("rentalPeriod", {
                      required: "Rental period is required",
                    })}
                    className="sr-only"
                  />
                  <div className="text-2xl mb-1">{period.icon}</div>
                  <p className="text-xs font-semibold text-[#2C2C2C]">
                    {period.label}
                  </p>
                </label>
              ))}
            </div>
            {errors.rentalPeriod && (
              <p className="text-red-500 text-xs mt-1">
                {errors.rentalPeriod.message}
              </p>
            )}
          </div>
        </div>

        {/* Availability & Location */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#1DA5A6]" />
            Availability & Location
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Availability */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Available From <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("availability", { required: "Availability is required" })}
                className={`w-full h-12 px-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 transition-all ${
                  errors.availability
                    ? "ring-2 ring-red-500"
                    : "focus:ring-[#1DA5A6]/30"
                }`}
              />
              {errors.availability && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.availability.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Pickup Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                <input
                  type="text"
                  {...register("location", { required: "Location is required" })}
                  placeholder="e.g., Main Campus, Building 5"
                  className={`w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                    errors.location
                      ? "ring-2 ring-red-500"
                      : "focus:ring-[#1DA5A6]/30"
                  }`}
                />
              </div>
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 h-14 bg-white border-2 border-[#2C2C2C]/10 text-[#2C2C2C] font-semibold rounded-xl hover:border-[#1DA5A6]/30 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 h-14 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Publishing...
              </span>
            ) : (
              "Publish Item"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}