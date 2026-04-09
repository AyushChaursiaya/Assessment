const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-xl mx-auto mt-6">
      <input
        type="text"
        placeholder="Search GitHub users..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-xl border shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;