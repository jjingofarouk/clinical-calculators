import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { sidebarItems } from './data/sidebarItems';
import { Calculator } from 'lucide-react';

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
        const queryWords = searchQuery.toLowerCase().split(/\s+/).filter(word => word.length > 0);
        const calcWords = calc.toLowerCase().split(/\s+/);
        return queryWords.every(queryWord => 
          calcWords.some(calcWord => calcWord.startsWith(queryWord))
        );
      })
      .map(calc => ({ calc, path: `${item.path}/${calc.replace(/\s+/g, '-')}`, specialty: item.label }))
  );

  return (
    <aside
      ref={sidebarRef}
      className={`border-r border-gray-200 h-full fixed inset-y-0 left-0 transform ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 w-64 lg:w-72 max-w-full shadow-2xl lg:shadow-none backdrop-blur-sm flex flex-col`}
    >
      <div className="flex items-center justify-between lg:hidden border-b border-gray-200 p-6 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Calculators</h2>
        </div>
        <button 
          onClick={toggleMobile}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="hidden lg:block p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Medical Calculators</h2>
            <p className="text-sm text-gray-500 mt-0.5">Clinical decision tools</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search calculators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 bg-white text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {searchQuery ? (
          <ul className="space-y-1">
            {filteredCalculators.map(({ calc, path, specialty }) => (
              <li key={calc}>
                <Link
                  to={path}
                  onClick={toggleMobile}
                  className="block py-2.5 px-3 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-200 font-medium"
                >
                  {calc} <span className="text-xs text-gray-500">({specialty})</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isOpen = expanded === item.label;
            const Icon = item.icon;

            return (
              <div key={item.label} className="group">
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left font-medium transition-all duration-200 group-hover:shadow-sm ${
                    isActive 
                      ? 'bg-teal-50 text-teal-600 border border-teal-100 shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg transition-colors duration-200 ${
                      isActive 
                        ? 'bg-teal-100 text-teal-600' 
                        : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-600'
                    }`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  <div className={`transition-transform duration-200 ${
                    isActive ? 'text-teal-600' : 'text-gray-400'
                  }`}>
                    {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                </button>
                
                {isOpen && (
                  <div className="mt-2 ml-4 pl-6 border-l-2 border-gray-200">
                    <ul className="space-y-1">
                      {item.calculators.map((calc) => (
                        <li key={calc}>
                          <Link
                            to={`${item.path}/${calc.replace(/\s+/g, '-')}`}
                            onClick={toggleMobile}
                            className="block py-2.5 px-3 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-200 font-medium"
                          >
                            {calc}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })
        )}
      </nav>

      <div className="p-6 border-t border-gray-200 bg-white">
        <div className="text-center">
          <p className="text-xs text-gray-500 font-medium">
            {sidebarItems.reduce((total, item) => total + item.calculators.length, 0)} calculators available
          </p>
          <div className="mt-2 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}