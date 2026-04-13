export default function SearchBar() {
  return (
    <input
    className="w-full bg-white p-3 rounded-xl mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="text"
      placeholder="Search tools, books, equipment..."
    />
  );
}