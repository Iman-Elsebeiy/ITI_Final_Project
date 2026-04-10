export default function Topbar() {
  return (
    <div className="flex justify-between items-center bg-white border-b border-gray-100 px-8 py-4">
      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider italic">
        UniTool Dashboard
      </p>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
          <span className="text-xs font-bold text-gray-800">Ahmed Fawzy</span>
          <span className="text-[10px] text-gray-400">1,250 Pts</span>
        </div>
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
          AF
        </div>
      </div>
    </div>
  );
}