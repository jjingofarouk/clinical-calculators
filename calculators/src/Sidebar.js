import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

const sidebarItems = [
  {
    label: 'General',
    path: '/calculators/General',
    calculators: [
      'BMI Calculator',
      'BMR Calculator',
      'Caloric Needs',
      'Ideal Body Weight',
      'Waist Circumference',
      'Mifflin-St Jeor',
      'Harris-Benedict',
      'Body Fat %',
    ],
  },
  {
    label: 'Cardiovascular',
    path: '/calculators/Cardiovascular',
    calculators: [
      'ASCVD',
      'Framingham',
      'CHA2DS2VASc',
      'HAS-BLED',
      'GRACE',
      'TIMI',
    ],
  },
  {
    label: 'Pulmonary',
    path: '/calculators/Pulmonary',
    calculators: [
      'CURB-65',
      'Wells Score',
      'PSI/PORT',
      'PERC',
      'BODE',
      'ACT',
      'CAT',
      'PEFR',
      'MMRC',
    ],
  },
  {
    label: 'Gastroenterology',
    path: '/calculators/Gastroenterology',
    calculators: [
      'MELD',
      'Child-Pugh',
      'Ranson’s',
      'Rockall',
      'Glasgow Blatchford',
      'BISAP',
      'FIB-4',
    ],
  },
  {
    label: 'Obstetrics',
    path: '/calculators/Obstetrics',
    calculators: [
      'Bishop Score',
      'EDD',
      'Gestational Age',
      'GDM Screening',
      'VBAC Risk',
    ],
  },
  {
    label: 'Neurology',
    path: '/calculators/Neurology',
    calculators: [
      'GCS',
      'NIHSS',
      'PHQ-9',
      'GAD-7',
      'MMSE',
      'MoCA',
      'TBI Score',
      'ABCD2',
      'PHASES',
      'EDSS',
      'Rancho',
      'EQ5D',
    ],
  },
  {
    label: 'Nephrology',
    path: '/calculators/Nephrology',
    calculators: [
      'GFR',
      'CKD-EPI',
      'Creatinine Clearance',
      'Urine Protein:Creatinine',
      'CKD Stage',
      'Electrolyte Imbalance',
      'Uric Acid',
    ],
  },
  {
    label: 'ICU',
    path: '/calculators/ICU',
    calculators: [
      'APACHE II',
      'SOFA',
      'qSOFA',
    ],
  },
];

export default function Sidebar() {
  const [openCategories, setOpenCategories] = useState({});
  const location = useLocation();

  const toggleCategory = (label) => {
    setOpenCategories((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 px-4 py-6 overflow-y-auto">
      <h2 className="text-xl font-bold text-teal-600 mb-6">Calculator Menu</h2>
      <nav>
        {sidebarItems.map(({ label, path, calculators }) => (
          <div key={label} className="mb-2">
            <button
              onClick={() => toggleCategory(label)}
              className="w-full flex items-center justify-between px-2 py-2 text-left font-medium text-gray-700 hover:bg-teal-50 rounded"
            >
              <span>{label}</span>
              {openCategories[label] ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {openCategories[label] && (
              <ul className="pl-4 mt-1 space-y-1">
                <li>
                  <Link
                    to={path}
                    className={`block px-2 py-1 rounded text-sm font-medium hover:bg-teal-100 ${
                      location.pathname === path ? 'bg-teal-100 text-teal-700' : ''
                    }`}
                  >
                    All {label}
                  </Link>
                </li>
                {calculators.map((calc) => (
                  <li key={calc}>
                    <span className="block px-2 py-1 text-sm text-gray-500">{calc}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}