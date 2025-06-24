import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 m-0 p-0">
      {/* Sidebar (Responsive) */}
      <Sidebar mobileOpen={mobileOpen} toggleMobile={toggleMobile} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full max-w-full m-0 p-0">
        {/* Mobile Top Navbar */}
        <div className="lg:hidden flex items-center justify-between border-b border-gray-200 shadow-sm m-0 p-4">
          <button onClick={toggleMobile}>
            <Menu className="text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-teal-600">Clinical Calculators</h1>
          <div className="w-6" /> {/* Spacer for symmetry */}
        </div>

        {/* Page Content */}
        <main className="flex-1 w-full max-w-full overflow-x-hidden overflow-y-auto m-0 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;