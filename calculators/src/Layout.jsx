import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Menu, Moon, Sun } from 'lucide-react';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground m-0 p-0">
      <Sidebar mobileOpen={mobileOpen} toggleMobile={toggleMobile} />
      <div className="flex-1 flex flex-col w-full max-w-full m-0 p-0">
        <div className="lg:hidden flex items-center justify-between border-b border-border shadow-sm m-0 p-4 bg-secondary">
          <button onClick={toggleMobile}>
            <Menu className="text-muted-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-primary">Clinical Calculators</h1>
          <button onClick={toggleTheme}>
            {isDarkMode ? (
              <Sun className="text-muted-foreground" />
            ) : (
              <Moon className="text-muted-foreground" />
            )}
          </button>
        </div>
        <div className="hidden lg:flex justify-end p-4 border-b border-border bg-secondary">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-radius hover:bg-muted transition-colors duration-200"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
        <main className="flex-1 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;