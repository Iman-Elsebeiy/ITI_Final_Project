export default function Topbar() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-200">Good morning 👋</p>
        <h2 className="text-xl font-bold text-white">Welcome back!</h2>
      </div>

      <div className="bg-white p-2 rounded-full">🔔</div>
    </div>
  );
}