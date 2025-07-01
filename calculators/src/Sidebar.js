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
      className={`bg-card text-card-foreground h-full fixed inset-y-0 left-0 transform ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 w-64 lg:w-72 max-w-full z-50 shadow-2xl lg:shadow-none flex flex-col border-r border-border rounded-r-radius`}
    >
      <div className="flex items-center justify-between lg:hidden border-b border-border p-6 bg-secondary">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-radius flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Calculators</h2>
        </div>
        <button
          onClick={toggleMobile}
          className="p-2 rounded-radius hover:bg-muted transition-colors duration-200"
        >
          <Menu className="w-6 h-6 text-muted-foreground" />
        </button>
      </div>

      <div className="hidden lg:block p-6 border-b border-border bg-secondary">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-radius flex items-center justify-center shadow-lg">
            <Calculator className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Medical Calculators</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Clinical decision tools</p>
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
            className="w-full p-2 pl-10 bg-card text-foreground border border-input rounded-radius focus:outline-none focus:ring-2 focus:ring-ring"
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
                        ? 'text-primary bg-accent'
                        : 'text-foreground hover:text-primary hover:bg-accent'
                    } rounded-radius`}
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
                <div className="flex items-center justify-between px-4 py-3.5 rounded-radius text-left font-medium transition-all duration-200 group-hover:shadow-sm">
                  <Link
                    to={item.path}
                    onClick={toggleMobile}
                    className={`flex items-center space-x-3 flex-grow ${
                      isActive
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-radius transition-colors duration-200 ${
                        isActive
                          ? 'bg-accent text-primary'
                          : 'bg-secondary text-muted-foreground group-hover:bg-muted group-hover:text-foreground'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </Link>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={`p-2 rounded-radius transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    } hover:bg-muted`}
                  >
                    {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                </div>

                {isOpen && (
                  <div className="mt-2 ml-4 pl-6 border-l-2 border-border">
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
                                  ? 'text-primary bg-accent'
                                  : 'text-foreground hover:text-primary hover:bg-accent'
                              } rounded-radius`}
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

      <div className="mt-auto p-6 border-t border-border bg-secondary">
        <div className="text-center">
          <p className="text-xs text-muted-foreground font-medium">
            {sidebarItems.reduce((total, item) => total + item.calculators.length, 0)} calculators available
          </p>
          <div className="mt-2 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}