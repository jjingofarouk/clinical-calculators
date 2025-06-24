import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import { sidebarItems } from './data/sidebarItems';

// Calculator Category Pages
import GeneralCalculators from './components/calculators/general/GeneralCalculators';
import CardiovascularCalculators from './components/calculators/cardiovascular/CardiovascularCalculators';
import PulmonaryCalculators from './components/calculators/pulmonary/PulmonaryCalculators';
import GastroenterologyCalculators from './components/calculators/git/GastroenterologyCalculators';
import ObstetricsCalculators from './components/calculators/obstetrics/ObstetricsCalculators';
import NeurologyCalculators from './components/calculators/neurology/NeurologyCalculators';
import NephrologyCalculators from './components/calculators/nephrology/NephrologyCalculators';
import OrthopedicsCalculators from './components/calculators/ortho/OrthopedicsCalculators';
import ICUCalculators from './components/calculators/icu/ICUCalculators';

// Map sidebar labels to components
const categoryComponents = {
  General: GeneralCalculators,
  Cardiovascular: CardiovascularCalculators,
  Pulmonary: PulmonaryCalculators,
  Gastroenterology: GastroenterologyCalculators,
  Obstetrics: ObstetricsCalculators,
  Neurology: NeurologyCalculators,
  Nephrology: NephrologyCalculators,
  Orthopedics: OrthopedicsCalculators,
  ICU: ICUCalculators,
};

// 404 Fallback Page
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center w-full bg-gray-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
    </div>
  </div>
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
              const path = `/calculators/${item.label.replace(/\s+/g, '')}`;
              return (
                <Route key={item.label} path={path} element={<Component />}>
                  {item.calculators.map(calc => (
                    <Route
                      key={calc}
                      path={`${path}/${calc.replace(/\s+/g, '-')}`}
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