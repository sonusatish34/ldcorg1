export default function SearchBar() {
  return (
    <div className="relative w-full max-w-xl mx-auto mt-6">
      <input
        type="text"
        placeholder="Search Your Next Destination"
        className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <svg
        className="absolute left-3 top-3 w-6 h-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
    </div>
  );
}
