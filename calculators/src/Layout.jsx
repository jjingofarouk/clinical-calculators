import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { TextField, InputAdornment, List, ListItem, ListItemText, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { sidebarItems } from './data/sidebarItems';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  // Filter calculators based on search query with exact matching
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const queryWords = query.split(/\s+/).filter(word => word.length > 0);

    const filtered = sidebarItems.flatMap(item =>
      item.calculators
        .filter(calc => {
          const calcLower = calc.toLowerCase();
          // For single-word or letter queries, check if the calculator name contains the query
          if (queryWords.length === 1) {
            return calcLower.includes(query);
          }
          // For multi-word queries, ensure all words appear in order
          let lastIndex = -1;
          return queryWords.every(word => {
            const index = calcLower.indexOf(word, lastIndex + 1);
            if (index > lastIndex) {
              lastIndex = index;
              return true;
            }
            return false;
          });
        })
        .map(calc => ({
          calc,
          path: `${item.path}/${calc.replace(/\s+/g, '-')}`,
          specialty: item.label
        }))
    );

    setSearchResults(filtered);
    setIsSearchOpen(true);
  }, [searchQuery]);

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search result selection
  const handleResultClick = (path) => {
    setSearchQuery('');
    setIsSearchOpen(false);
    navigate(path);
  };

  // Handle Enter key to navigate to first result
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      handleResultClick(searchResults[0].path);
    }
  };

  return (
    <motion.div
      className="flex min-h-screen w-full bg-gray-50 m-0 p-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sidebar (Responsive) */}
      <Sidebar mobileOpen={mobileOpen} toggleMobile={toggleMobile} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full max-w-full m-0 p-0">
        {/* Mobile Top Navbar */}
        <div className="lg:hidden flex items-center justify-between border-b border-gray-200 shadow-sm m-0 p-4">
          <button onClick={toggleMobile} className="p-2 rounded-lg hover:bg-gray-200">
            <Menu className="text-gray-700 w-6 h-6" />
          </button>
          <div className="flex-1 mx-4 relative" ref={searchRef}>
            <TextField
              placeholder="Search calculators"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="w-5 h-5 text-gray-500" />
                  </InputAdornment>
                ),
                className: 'text-gray-900',
              }}
              className="card rounded-lg"
              variant="outlined"
              size="small"
            />
            {isSearchOpen && (
              <Box
                className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-80 overflow-y-auto"
                sx={{ scrollbarWidth: 'thin', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { background: '#d1d5db', borderRadius: '4px' } }}
              >
                <List>
                  {searchResults.length > 0 ? (
                    searchResults.map(({ calc, path, specialty }) => (
                      <ListItem
                        key={calc}
                        button
                        onClick={() => handleResultClick(path)}
                        className="hover:bg-teal-50"
                      >
                        <ListItemText
                          primary={calc}
                          secondary={specialty}
                          primaryTypographyProps={{ className: 'text-sm font-medium text-gray-900' }}
                          secondaryTypographyProps={{ className: 'text-xs text-gray-500' }}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText
                        primary="No matches found"
                        primaryTypographyProps={{ className: 'text-sm text-gray-500 text-center' }}
                      />
                    </ListItem>
                  )}
                </List>
              </Box>
            )}
          </div>
          <div className="w-6" /> {/* Spacer for symmetry */}
        </div>

        {/* Desktop Top Navbar */}
        <div className="hidden lg:flex items-center justify-end border-b border-gray-200 shadow-sm m-0 p-4">
          <div className="w-80 relative" ref={searchRef}>
            <TextField
              placeholder="Search calculators"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="w-5 h-5 text-gray-500" />
                  </InputAdornment>
                ),
                className: 'text-gray-900',
              }}
              className="card rounded-lg"
              variant="outlined"
              size="small"
            />
            {isSearchOpen && (
              <Box
                className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-80 overflow-y-auto"
                sx={{ scrollbarWidth: 'thin', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { background: '#d1d5db', borderRadius: '4px' } }}
              >
                <List>
                  {searchResults.length > 0 ? (
                    searchResults.map(({ calc, path, specialty }) => (
                      <ListItem
                        key={calc}
                        button
                        onClick={() => handleResultClick(path)}
                        className="hover:bg-teal-50"
                      >
                        <ListItemText
                          primary={calc}
                          secondary={specialty}
                          primaryTypographyProps={{ className: 'text-sm font-medium text-gray-900' }}
                          secondaryTypographyProps={{ className: 'text-xs text-gray-500' }}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText
                        primary="No matches found"
                        primaryTypographyProps={{ className: 'text-sm text-gray-500 text-center' }}
                      />
                    </ListItem>
                  )}
                </List>
              </Box>
            )}
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 w-full max-w-full overflow-x-hidden overflow-y-auto m-0 p-0">
          <Outlet />
        </main>
      </div>
    </motion.div>
  );
};

export default Layout;