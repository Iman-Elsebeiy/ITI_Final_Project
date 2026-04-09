import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import SearchBar from "@/components/SearchBar";
import RecommendedCard from "@/components/RecommendedCard";
import CategoryItem from "@/components/CategoryItem";
import ProductCard from "@/components/ProductCard";
import {BookOpenIcon, CameraIcon, } from "@heroicons/react/24/outline";
export default function Home() {
  return (
    <>
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 pb-20 rounded-xl w-full relative">
          <Topbar />
          <SearchBar />
        </div>

        <RecommendedCard />

        {/* Categories */}
        <div className="mt-20 -mb-10">
          <h1 className="text-xl font-bold mb-4">Categories</h1>
          <div className="flex gap-4">
            <CategoryItem icon={<BookOpenIcon className="w-6 h-6 text-green-300 mx-auto mt-2"/>} title="Calculators" />
            <CategoryItem icon={<CameraIcon className="w-6 h-6 text-blue-500 mx-auto mt-2"/>} title="Books" />
            <CategoryItem icon={<BookOpenIcon className="w-6 h-6 text-red-500 mx-auto mt-2"/>} title="Lab Tools" />
            <CategoryItem icon={<BookOpenIcon className="w-6 h-6 text-green-500 mx-auto mt-2"/>} title="Calculators" />
            <CategoryItem icon={<CameraIcon className="w-6 h-6 text-blue-500 mx-auto mt-2"/>} title="Books" />
            <CategoryItem icon={<BookOpenIcon className="w-6 h-6 text-teal-500 mx-auto mt-2"/>} title="Lab Tools" />
          </div>
        </div>

        {/* Products near you */}
        <div className="mt-20">
          <h1 className="text-xl font-bold mb-4">Products Near You</h1>
          <div className="grid grid-cols-4 gap-4">
            <ProductCard title="Arduino Kit" price={3} />
            <ProductCard title="Chemistry Set" price={45} />
          </div>
        </div>


                {/*  trendy Products */}
        <div className="mt-20">
          <h1 className="text-xl font-bold mb-4">Trending tools</h1>
          <div className="grid grid-cols-4 gap-4">
            <ProductCard title="Arduino Kit" price={3} />
            <ProductCard title="Chemistry Set" price={45} />
          </div>
        </div>
    </>
  );
}