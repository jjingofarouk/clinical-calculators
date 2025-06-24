import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { sidebarItems } from './data/sidebarItems';
import { Calculator } from 'lucide-react';

export default function Sidebar({ mobileOpen, toggleMobile }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState('');

  const toggleExpand = (label) => {
    setExpanded(expanded === label ? '' : label);
  };

  return (
    <aside
      className={`bg-gray-900 border-r border-gray-800 h-full overflow-y-auto
        fixed inset-y-0 left-0 transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-out
        lg:translate-x-0 lg:static lg:inset-0 w-72 lg:w-80 max-w-full z-50 
        shadow-2xl lg:shadow-none backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between lg:hidden border-b border-gray-800 p-6 bg-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Calculators</h2>
        </div>
        <button 
          onClick={toggleMobile}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          <Menu className="w-6 h-6 text-gray-300" />
        </button>
      </div>

      <div className="hidden lg:block p-6 border-b border-gray-800 bg-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Medical Calculators</h2>
            <p className="text-sm text-gray-400 mt-0.5">Clinical decision tools</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isOpen = expanded === item.label;
          const Icon = item.icon;

          return (
            <div key={item.label} className="group">
              <button
                onClick={() => toggleExpand(item.label)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left font-medium transition-all duration-200 group-hover:shadow-sm ${
                  isActive 
                    ? 'bg-teal-900 text-teal-300 border border-teal-800 shadow-sm' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'bg-teal-800 text-teal-400' 
                      : 'bg-gray-800 text-gray-400 group-hover:bg-gray-700 group-hover:text-gray-300'
                  }`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
                <div className={`transition-transform duration-200 ${
                  isActive ? 'text-teal-400' : 'text-gray-500'
                }`}>
                  {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
              </button>
              
              {isOpen && (
                <div className="mt-2 ml-4 pl-6 border-l-2 border-gray-700">
                  <ul className="space-y-1">
                    {item.calculators.map((calc) => (
                      <li key={calc}>
                        <Link
                          to={`${item.path}/${calc.replace(/\s+/g, '-')}`}
                          onClick={toggleMobile}
                          className="block py-2.5 px-3 text-sm text-gray-400 hover:text-teal-400 hover:bg-teal-900 rounded-lg transition-all duration-200 font-medium"
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
        })}
      </nav>

      <div className="mt-auto p-6 border-t border-gray-800 bg-gray-800">
        <div className="text-center">
          <p className="text-xs text-gray-400 font-medium">
            {sidebarItems.reduce((total, item) => total + item.calculators.length, 0)} calculators available
          </p>
          <div className="mt-2 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}