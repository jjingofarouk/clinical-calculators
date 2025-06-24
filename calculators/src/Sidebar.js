import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';

const sidebarItems = [
  {
    label: 'General',
    path: '/calculators/General',
    calculators: [
      'BMI',
      'BMR',
      'Ideal Body Weight',
      'Caloric Needs',
      'Waist Circumference',
      'Body Fat %',
    ],
  },
  {
    label: 'Cardiovascular',
    path: '/calculators/Cardiovascular',
    calculators: ['ASCVD', 'Framingham', 'CHA2DS2VASc', 'HAS-BLED', 'GRACE', 'TIMI'],
  },
  {
    label: 'Neurology',
    path: '/calculators/Neurology',
    calculators: ['GCS', 'NIHSS', 'MMSE', 'MoCA', 'PHQ9', 'GAD7', 'TBI Severity'],
  },
  {
    label: 'Pulmonary',
    path: '/calculators/Pulmonary',
    calculators: ['BODE', 'CURB-65', 'PSI', 'PERC', 'ACT', 'CAT', 'PEFR'],
  },
  {
    label: 'Gastroenterology',
    path: '/calculators/Gastroenterology',
    calculators: ['MELD', 'Child-Pugh', 'Ranson', 'Rockall', 'BISAP', 'FIB-4'],
  },
  {
    label: 'Obstetrics',
    path: '/calculators/Obstetrics',
    calculators: ['EDD', 'Bishop Score', 'GDM Screening', 'VBAC Risk'],
  },
  {
    label: 'Orthopedics',
    path: '/calculators/Orthopedics',
    calculators: ['Wells Score', 'Harris Hip Score', 'WOMAC', 'Oswestry'],
  },
  {
    label: 'Nephrology',
    path: '/calculators/Nephrology',
    calculators: ['GFR', 'CKD-EPI', 'Creatinine Clearance', 'Uric Acid', 'Electrolytes'],
  },
  {
    label: 'ICU',
    path: '/calculators/ICU',
    calculators: ['SOFA', 'APACHE II', 'qSOFA'],
  },
];

export default function Sidebar({ mobileOpen, toggleMobile }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState('');

  const toggleExpand = (label) => {
    setExpanded(expanded === label ? '' : label);
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 h-full overflow-y-auto
        fixed inset-y-0 left-0 transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0 w-64 lg:w-72 max-w-full z-50 shadow-lg`}
    >
      <div className="flex items-center justify-between lg:hidden border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-teal-600">Menu</h2>
        <button onClick={toggleMobile}>
          <Menu />
        </button>
      </div>
      <nav className="p-4 w-full">
        {sidebarItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const isOpen = expanded === item.label;

          return (
            <div key={item.label} className="mb-2 w-full">
              <button
                onClick={() => toggleExpand(item.label)}
                className={`w-full flex justify-between items-center px-2 py-2 rounded-md text-left text-sm font-medium ${
                  isActive ? 'bg-teal-100 text-teal-700' : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span>{item.label}</span>
                {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
              {isOpen && (
                <ul className="mt-1 pl-4 text-sm text-gray-700 w-full">
                  {item.calculators.map((calc) => (
                    <li key={calc}>
                      <Link
                        to={item.path}
                        onClick={toggleMobile}
                        className="block py-1 hover:text-teal-600 w-full"
                      >
                        {calc}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}