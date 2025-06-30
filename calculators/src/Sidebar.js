import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
  Baby,
  Bone,
  Brain,
  Calculator,
  Droplets,
  Menu,
  Search,
  Stethoscope,
  Wind,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { sidebarItems } from './data/sidebarItems';

export default function Sidebar({ mobileOpen, toggleMobile }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const sidebarRef = useRef(null);

  const toggleExpand = (label) => {
    setExpanded(expanded === label ? '' : label);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && mobileOpen) {
        toggleMobile();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen, toggleMobile]);

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

  useEffect(() => {
    const currentItem = sidebarItems.find(item => location.pathname.startsWith(item.path));
    if (currentItem) {
      setExpanded(currentItem.label);
    } else {
      setExpanded('');
    }
  }, [location.pathname]);

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar fixed inset-y-0 left-0 transform ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 z-50 bg-background flex flex-col w-[250px] lg:w-[250px] md:w-[200px] sm:w-3/4 shadow-lg lg:shadow-none`}
    >
      {/* Header for Mobile */}
      <div className="flex items-center justify-between lg:hidden border-b border-border p-4 bg-background">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-bold text-foreground">Calculators</h2>
        </div>
        <button
          onClick={toggleMobile}
          className="p-1.5 rounded-lg hover:bg-accent transition-colors duration-200"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Header for Desktop */}
      <div className="hidden lg:block p-4 border-b border-border bg-background">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <Calculator className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Calculators</h2>
            <p className="text-xs text-muted-foreground">Clinical tools</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search calculators"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-1.5 pl-8 bg-card text-foreground border border-border rounded-radius focus:outline-none focus:ring-1 focus:ring-ring text-sm"
          />
          <Search className="w-4 h-4 text-muted-foreground absolute left-2 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        {searchQuery ? (
          <ul className="space-y-0.5">
            {filteredCalculators.length > 0 ? (
              filteredCalculators.map(({ calc, path, specialty }) => (
                <li key={calc}>
                  <Link
                    to={path}
                    onClick={toggleMobile}
                    className={`block py-1.5 px-2 text-xs font-medium transition-all duration-200 ${
                      location.pathname === path
                        ? 'text-primary bg-accent rounded-radius'
                        : 'text-foreground hover:text-primary hover:bg-accent'
                    }`}
                  >
                    {calc} <span className="text-xs text-muted-foreground">({specialty})</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="py-1.5 px-2 text-xs text-muted-foreground">No matches found</li>
            )}
          </ul>
        ) : (
          sidebarItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const isOpen = expanded === item.label;
            const Icon = item.icon;

            return (
              <div key={item.label} className="group">
                <div className="flex items-center justify-between px-2 py-2 rounded-radius text-left font-medium transition-all duration-200 group-hover:shadow-sm">
                  <Link
                    to={item.path}
                    onClick={toggleMobile}
                    className={`flex items-center space-x-2 flex-grow ${
                      isActive ? 'text-primary' : 'text-foreground hover:text-foreground'
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-accent text-primary'
                          : 'bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-foreground'
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </Link>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={`p-1.5 rounded-lg transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-foreground'
                    } hover:bg-accent`}
                  >
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                </div>
                {isOpen && (
                  <div className="mt-1 ml-3 pl-4 border-l border-border">
                    <ul className="space-y-0.5">
                      {item.calculators.map((calc) => {
                        const calcPath = `${item.path}/${calc.replace(/\s+/g, '-')}`;
                        return (
                          <li key={calc}>
                            <Link
                              to={calcPath}
                              onClick={toggleMobile}
                              className={`block py-1.5 px-2 text-xs font-medium transition-all duration-200 ${
                                location.pathname === calcPath
                                  ? 'text-primary bg-accent rounded-radius'
                                  : 'text-foreground hover:text-primary hover:bg-accent'
                              }`}
                            >
                              {calc}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })
        )}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-border bg-background">
        <div className="text-center">
          <p className="text-xs text-foreground font-medium">
            {sidebarItems.reduce((total, item) => total + item.calculators.length, 0)} calculators
          </p>
          <div className="mt-1 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-muted rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}