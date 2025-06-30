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
      } transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 z-50 shadow-2xl lg:shadow-none backdrop-blur-sm flex flex-col w-64`}
    >
      <div className="flex items-center justify-between lg:hidden border-b border-sidebar-border p-3 bg-sidebar-background">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-sidebar-primary rounded-md flex items-center justify-center">
            <Calculator className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          <h2 className="text-lg font-bold text-sidebar-foreground">Calculators</h2>
        </div>
        <button
          onClick={toggleMobile}
          className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors duration-200"
        >
          <Menu className="w-5 h-5 text-sidebar-foreground" />
        </button>
      </div>
      <div className="hidden lg:block p-3 border-b border-sidebar-border bg-sidebar-background">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center shadow-md">
            <Calculator className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h2 className="text-base font-bold text-sidebar-foreground">Medical Calculators</h2>
            <p className="text-xs text-sidebar-foreground mt-0.5">Clinical decision tools</p>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search calculators"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-8 bg-card text-foreground border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
          />
          <Search className="w-4 h-4 text-muted-foreground absolute left-2.5 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
        {searchQuery ? (
          <ul className="space-y-0.5">
            {filteredCalculators.length > 0 ? (
              filteredCalculators.map(({ calc, path, specialty }) => (
                <li key={calc}>
                  <Link
                    to={path}
                    onClick={toggleMobile}
                    className={`block py-2 px-2.5 text-sm font-medium transition-all duration-200 ${
                      location.pathname === path
                        ? 'text-sidebar-primary bg-sidebar-accent'
                        : 'text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent'
                    } rounded-md`}
                  >
                    <div className="truncate">{calc}</div>
                    <div className="text-xs text-muted-foreground truncate">({specialty})</div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="py-2 px-2.5 text-sm text-muted-foreground">No matches found</li>
            )}
          </ul>
        ) : (
          sidebarItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const isOpen = expanded === item.label;
            const Icon = item.icon;

            return (
              <div key={item.label} className="group">
                <div className="flex items-center justify-between px-2 py-2.5 rounded-lg text-left font-medium transition-all duration-200 group-hover:shadow-sm">
                  <Link
                    to={item.path}
                    onClick={toggleMobile}
                    className={`flex items-center space-x-2 flex-grow min-w-0 ${
                      isActive
                        ? 'text-sidebar-primary'
                        : 'text-sidebar-foreground hover:text-sidebar-foreground'
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-md transition-colors duration-200 flex-shrink-0 ${
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-primary'
                          : 'bg-muted text-muted-foreground group-hover:bg-sidebar-accent group-hover:text-sidebar-foreground'
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <span className="text-sm font-semibold truncate">{item.label}</span>
                  </Link>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={`p-1 rounded-md transition-colors duration-200 flex-shrink-0 ${
                      isActive ? 'text-sidebar-primary' : 'text-sidebar-foreground'
                    } hover:bg-sidebar-accent`}
                  >
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                </div>
                {isOpen && (
                  <div className="mt-1 ml-2 pl-4 border-l-2 border-sidebar-border">
                    <ul className="space-y-0.5">
                      {item.calculators.map((calc) => {
                        const calcPath = `${item.path}/${calc.replace(/\s+/g, '-')}`;
                        return (
                          <li key={calc}>
                            <Link
                              to={calcPath}
                              onClick={toggleMobile}
                              className={`block py-2 px-2.5 text-sm font-medium transition-all duration-200 ${
                                location.pathname === calcPath
                                  ? 'text-sidebar-primary bg-sidebar-accent'
                                  : 'text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent'
                              } rounded-md`}
                            >
                              <div className="truncate">{calc}</div>
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
      <div className="mt-auto p-3 border-t border-sidebar-border bg-sidebar-background">
        <div className="text-center">
          <p className="text-xs text-sidebar-foreground font-medium">
            {sidebarItems.reduce((total, item) => total + item.calculators.length, 0)} calculators
          </p>
          <div className="mt-1.5 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-muted rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}