interface ProductCardProps {
  title: string;
  price: number;
}

export default function ProductCard({ title, price }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="h-40 bg-gray-300"></div>

      <div className="p-3">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-green-600 font-bold">{price}</p>
      </div>
    </div>
  );
}