import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

const FloatingSearch = ({
  searchQuery,
  onSearchChange,
  placeholder = 'Search calculators...',
  className = 'w-full max-w-2xl mx-auto',
}) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen && searchQuery) {
      onSearchChange('');
    }
  };

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Floating Search Button */}
      <button
        onClick={handleSearchToggle}
        className="fixed top-4 right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-md hover:bg-accent hover:text-accent-foreground transition-all duration-200 z-50"
        aria-label="search"
      >
        {searchOpen ? <X size={24} /> : <Search size={24} />}
      </button>

      {/* Collapsible Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-card border-b border-border shadow-sm"
          >
            <div className="relative">
              <input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
                className="w-full bg-card text-card-foreground border border-border rounded-radius py-2 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring font-sans text-sm"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingSearch;