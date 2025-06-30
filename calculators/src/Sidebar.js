We gave this sidebar too much width import React, { useState, useEffect, useRef } from 'react';
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
      } transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 z-50 shadow-2xl lg:shadow-none backdrop-blur-sm flex flex-col`}
    >
      <div className="flex items-center justify-between lg:hidden border-b border-sidebar-border p-6 bg-sidebar-background">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Calculator className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-sidebar-foreground">Calculators</h2>
        </div>
        <button
          onClick={toggleMobile}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors duration-200"
        >
          <Menu className="w-6 h-6 text-sidebar-foreground" />
        </button>
      </div>
      <div className="hidden lg:block p-6 border-b border-sidebar-border bg-sidebar-background">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-sidebar-primary rounded-xl flex items-center justify-center shadow-lg">
            <Calculator className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-sidebar-foreground">Medical Calculators</h2>
            <p className="text-sm text-sidebar-foreground mt-0.5">Clinical decision tools</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search calculators!"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 bg-card text-foreground border rounded-lg focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
          />
          <Search className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {searchQuery ? (
          <ul className="space-y-1">
            {filteredCalculators.length > 0 ? (
              filteredCalculators.map(({ calc, path, specialty }) => (
                <li key={calc}>
                  <Link
                    to={path}
                    onClick={toggleMobile}
                    className={`block py-2.5 px-3 text-sm font-medium transition-all duration-200 ${
                      location.pathname === path
                        ? 'text-sidebar-primary bg-sidebar-accent'
                        : 'text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent'
                    } rounded-lg`}
                  >
                    {calc} <span className="text-xs text-muted-foreground">({specialty})</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="py-2.5 px-3 text-sm text-muted-foreground">No matches found</li>
            )}
          </ul>
        ) : (
          sidebarItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const isOpen = expanded === item.label;
            const Icon = item.icon;

            return (
              <div key={item.label} className="group">
                <div className="flex items-center justify-between px-4 py-3.5 rounded-xl text-left font-medium transition-all duration-200 group-hover:shadow-sm">
                  <Link
                    to={item.path}
                    onClick={toggleMobile}
                    className={`flex items-center space-x-3 flex-grow ${
                      isActive
                        ? 'text-sidebar-primary'
                        : 'text-sidebar-foreground hover:text-sidebar-foreground'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-primary'
                          : 'bg-muted text-muted-foreground group-hover:bg-sidebar-accent group-hover:text-sidebar-foreground'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </Link>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      isActive ? 'text-sidebar-primary' : 'text-sidebar-foreground'
                    } hover:bg-sidebar-accent`}
                  >
                    {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                </div>
                {isOpen && (
                  <div className="mt-2 ml-4 pl-6 border-l-2 border-sidebar-border">
                    <ul className="space-y-1">
                      {item.calculators.map((calc) => {
                        const calcPath = `${item.path}/${calc.replace(/\s+/g, '-')}`;
                        return (
                          <li key={calc}>
                            <Link
                              to={calcPath}
                              onClick={toggleMobile}
                              className={`block py-2.5 px-3 text-sm font-medium transition-all duration-200 ${
                                location.pathname === calcPath
                                  ? 'text-sidebar-primary bg-sidebar-accent'
                                  : 'text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent'
                              } rounded-lg`}
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
      <div className="mt-auto p-6 border-t border-sidebar-border bg-sidebar-background">
        <div className="text-center">
          <p className="text-xs text-sidebar-foreground font-medium">
            {sidebarItems.reduce((total, item) => total + item.calculators.length, 0)} calculators available
          </p>
          <div className="mt-2 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-muted rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}