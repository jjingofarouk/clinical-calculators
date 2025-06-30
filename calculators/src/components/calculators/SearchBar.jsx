// SearchBar.jsx
import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({
  searchQuery,
  onSearchChange,
  placeholder = 'Search calculators...',
  className = 'w-full max-w-2xl mx-auto',
}) => {
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className={`p-4 bg-background ${className}`}>
      <div className="relative z-[60]">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full bg-card text-card-foreground border border-border rounded-radius py-2 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring font-sans text-sm"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;