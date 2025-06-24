import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout with responsive sidebar
import Layout from './Layout';

// Pages
import Home from './Home';

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

// 404 Fallback Page
const NotFound = () => (
  <div className="flex items-center justify-center h-screen bg-white">
    <h1 className="text-3xl font-bold text-gray-500">404 – Page Not Found</h1>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-white">
      <Router>
        <Routes>
          {/* All pages wrapped in Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/calculators/General" element={<GeneralCalculators />} />
            <Route path="/calculators/Cardiovascular" element={<CardiovascularCalculators />} />
            <Route path="/calculators/Pulmonary" element={<PulmonaryCalculators />} />
            <Route path="/calculators/Gastroenterology" element={<GastroenterologyCalculators />} />
            <Route path="/calculators/Obstetrics" element={<ObstetricsCalculators />} />
            <Route path="/calculators/Neurology" element={<NeurologyCalculators />} />
            <Route path="/calculators/Nephrology" element={<NephrologyCalculators />} />
            <Route path="/calculators/Orthopedics" element={<OrthopedicsCalculators />} />
            <Route path="/calculators/ICU" element={<ICUCalculators />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}