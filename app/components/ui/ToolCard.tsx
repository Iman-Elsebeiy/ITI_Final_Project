import { Star, MapPin } from "lucide-react";

interface ToolCardProps {
  name: string;
  price: number;
  rating: number;
  location: string;
  category: string;
  ownerInitials: string;
}

export default function ToolCard({
  name,
  price,
  rating,
  location,
  category,
  ownerInitials,
}: ToolCardProps) {
  return (
    <div className="floating-card hover:shadow-md hover:border-teal-200 transition-all cursor-pointer">

      {/* Image placeholder */}
      <div className="w-full h-36 rounded-xl bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center mb-3">
        <span className="text-3xl font-bold text-teal-200">{ownerInitials}</span>
      </div>

      {/* Category */}
      <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
        {category}
      </span>

      {/* Name + Price */}
      <div className="flex justify-between items-start mt-2">
        <h3 className="text-sm font-bold text-gray-800 flex-1">{name}</h3>
        <p className="text-sm font-bold text-teal-600 ml-2">${price}<span className="text-gray-400 font-normal">/day</span></p>
      </div>

      {/* Rating + Location */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-gray-600">{rating}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <MapPin size={12} />
          <span className="text-xs">{location}</span>
        </div>
      </div>
    </div>
  );
}