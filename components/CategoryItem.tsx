export default function CategoryItem({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 bg-gray-200  rounded-lg">
        {icon}
      </div>
      <p className="text-sm mt-2">{title}</p>
    </div>
  );
}