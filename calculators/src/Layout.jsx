```jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { TextField, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import { sidebarItems } from './data/sidebarItems';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const filteredCalculators = sidebarItems.flatMap(item =>
    item.calculators
      .filter(calc => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return false;
        const calcLower = calc.toLowerCase();
        return calcLower.includes(query);
      })
      .map(calc => ({ calc, path: `${item.path}/${calc.replace(/\s+/g, '-')}`, specialty: item.label }))
  );

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/search', { state: { filteredCalculators } });
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
          <div className="flex-1 mx-4">
            <TextField
              placeholder="Search calculators"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
          </div>
          <div className="w-6" /> {/* Spacer for symmetry */}
        </div>

        {/* Desktop Top Navbar */}
        <div className="hidden lg:flex items-center justify-end border-b border-gray-200 shadow-sm m-0 p-4">
          <div className="w-80">
            <TextField
              placeholder="Search calculators"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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