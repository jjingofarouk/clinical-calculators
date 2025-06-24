import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import NotFound from './components/NotFound';
import { sidebarItems } from './data/sidebarItems';

// Dynamically import calculator category pages
const calculatorCategories = [
  'AllergyAndImmunology',
  'Anesthesiology',
  'BariatricSurgery',
  'Cardiology',
  'CardiothoracicSurgery',
  'ColorectalSurgery',
  'CriticalCare',
  'Dermatology',
  'EmergencyMedicine',
  'Endocrinology',
  'ENT',
  'FamilyMedicine',
  'Gastroenterology',
  'GeneralSurgery',
  'Geriatrics',
  'Hematology',
  'Hepatology',
  'InfectiousDisease',
  'InternalMedicine',
  'MedicalGenetics',
  'Nephrology',
  'Neurology',
  'Neurosurgery',
  'Obstetrics',
  'Oncology',
  'Ophthalmology',
  'Orthopedics',
  'PainMedicine',
  'PalliativeCare',
  'Pathology',
  'Pediatrics',
  'PhysicalMedicine',
  'PlasticSurgery',
  'Psychiatry',
  'Pulmonary',
  'RadiationOncology',
  'Rheumatology',
  'SportsMedicine',
  'Toxicology',
  'TransplantMedicine',
  'TraumaSurgery',
  'Urology',
  'VascularSurgery',
];

// Create a mapping of category components
const categoryComponents = Object.fromEntries(
  calculatorCategories.map(category => [
    category,
    React.lazy(() => import(`./components/calculators/${category.toLowerCase()}/${category}Calculators`))
  ])
);

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-0 m-0">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {sidebarItems.map(item => {
              const Component = categoryComponents[item.label.replace(/\s+/g, '')] || NotFound;
              return (
                <Route
                  key={item.label}
                  path={`/calculators/${item.label.replace(/\s+/g, '')}`}
                  element={<Component />}
                >
                  {item.calculators.map(calc => (
                    <Route
                      key={calc}
                      path={`/calculators/${item.label.replace(/\s+/g, '')}/${calc.replace(/\s+/g, '-')}`}
                      element={<Component />}
                    />
                  ))}
                </Route>
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}