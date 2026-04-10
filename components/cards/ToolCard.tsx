import { MapPin } from 'lucide-react';

interface ToolCardProps {
  title: string;
  price: string;
  image?: string;
  category: string;
}

export const ToolCard = ({ title, price, category }: ToolCardProps) => {
  return (
    <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
      <div className="aspect-square bg-gray-100 rounded-2xl mb-4 overflow-hidden relative">
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-teal-700 uppercase">
          {category}
        </div>
      </div>
      <h3 className="font-bold text-gray-800 group-hover:text-teal-600 transition-colors">{title}</h3>
      <div className="flex justify-between items-center mt-2">
        <p className="text-teal-600 font-black">{price} <span className="text-[10px] text-gray-400">/day</span></p>
        <div className="flex items-center text-gray-400 text-[10px]">
          <MapPin size={10} /> ITI Hub
        </div>
      </div>
    </div>
  );
};