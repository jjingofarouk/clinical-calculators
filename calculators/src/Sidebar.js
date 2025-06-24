import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, Calculator, Stethoscope, Brain, Wind, Activity, Baby, Bone, Droplets, Monitor } from 'lucide-react';

const sidebarItems = [
  {
    label: 'General',
    path: '/calculators/General',
    icon: Calculator,
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
    icon: Activity,
    calculators: ['ASCVD', 'Framingham', 'CHA2DS2VASc', 'HAS-BLED', 'GRACE', 'TIMI'],
  },
  {
    label: 'Neurology',
    path: '/calculators/Neurology',
    icon: Brain,
    calculators: ['GCS', 'NIHSS', 'MMSE', 'MoCA', 'PHQ9', 'GAD7', 'TBI Severity'],
  },
  {
    label: 'Pulmonary',
    path: '/calculators/Pulmonary',
    icon: Wind,
    calculators: ['BODE', 'CURB-65', 'PSI', 'PERC', 'ACT', 'CAT', 'PEFR'],
  },
  {
    label: 'Gastroenterology',
    path: '/calculators/Gastroenterology',
    icon: Stethoscope,
    calculators: ['MELD', 'Child-Pugh', 'Ranson', 'Rockall', 'BISAP', 'FIB-4'],
  },
  {
    label: 'Obstetrics',
    path: '/calculators/Obstetrics',
    icon: Baby,
    calculators: ['EDD', 'Bishop Score', 'GDM Screening', 'VBAC Risk'],
  },
  {
    label: 'Orthopedics',
    path: '/calculators/Orthopedics',
    icon: Bone,
    calculators: ['Wells Score', 'Harris Hip Score', 'WOMAC', 'Oswestry'],
  },
  {
    label: 'Nephrology',
    path: '/calculators/Nephrology',
    icon: Droplets,
    calculators: ['GFR', 'CKD-EPI', 'Creatinine Clearance', 'Uric Acid', 'Electrolytes'],
  },
  {
    label: 'ICU',
    path: '/calculators/ICU',
    icon: Monitor,
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
      className={`bg-white border-r border-gray-100 h-full overflow-y-auto
        fixed inset-y-0 left-0 transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-out
        lg:translate-x-0 lg:static lg:inset-0 w-72 lg:w-80 max-w-full z-50 
        shadow-2xl lg:shadow-none backdrop-blur-sm`}
    >
      {/* Mobile Header */}
      <div className="flex items-center justify-between lg:hidden border-b border-gray-100 p-6 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Calculators</h2>
        </div>
        <button 
          onClick={toggleMobile}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block p-6 border-b border-gray-100 bg-gray-50">
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

      {/* Navigation */}
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
                    ? 'bg-teal-50 text-teal-700 border border-teal-100 shadow-sm' 
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
                <div className="mt-2 ml-4 pl-6 border-l-2 border-gray-100">
                  <ul className="space-y-1">
                    {item.calculators.map((calc) => (
                      <li key={calc}>
                        <Link
                          to={item.path}
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
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-6 border-t border-gray-100 bg-gray-50">
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