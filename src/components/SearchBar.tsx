import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BallTriangle } from "react-loader-spinner";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="w-full px-4 py-2 rounded-md border bg-transparent text-white font-semibold"
      />
      {isLoading ? (
        <BallTriangle
          height={40}
          width={40}
          radius={5}
          color="white"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass="absolute right-0 top-0"
          visible={true}
        />
      ) : (
        <button
          onClick={() => onSearch(query)}
          className="absolute right-3 mt-1"
        >
          <CiSearch className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
