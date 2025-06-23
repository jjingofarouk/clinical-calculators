import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, Typography } from '@mui/material';

// Pages
import Home from './Home';
import GeneralCalculators from './components/calculators/general/GeneralCalculators';
import CardiovascularCalculators from './components/calculators/cardiovascular/CardiovascularCalculators';
import NeurologyCalculators from './components/calculators/neurology/NeurologyCalculators';
import PulmonaryCalculators from './components/calculators/pulmonary/PulmonaryCalculators';
import GastroenterologyCalculators from './components/calculators/git/GastroenterologyCalculators';
import ObstetricsCalculators from './components/calculators/obstetrics/ObstetricsCalculators';
import OrthopedicsCalculators from './components/calculators/ortho/OrthopedicsCalculators';
import NephrologyCalculators from './components/calculators/nephrology/NephrologyCalculators';
import ICUCalculators from './components/calculators/icu/ICUCalculators';

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <div className="w-full min-h-screen bg-white text-gray-900 px-2 sm:px-4 md:px-6 lg:px-8 font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculators/General" element={<GeneralCalculators />} />
          <Route path="/calculators/Cardiovascular" element={<CardiovascularCalculators />} />
          <Route path="/calculators/Neurology" element={<NeurologyCalculators />} />
          <Route path="/calculators/Pulmonary" element={<PulmonaryCalculators />} />
          <Route path="/calculators/Gastroenterology" element={<GastroenterologyCalculators />} />
          <Route path="/calculators/Obstetrics" element={<ObstetricsCalculators />} />
          <Route path="/calculators/Orthopedics" element={<OrthopedicsCalculators />} />
          <Route path="/calculators/Nephrology" element={<NephrologyCalculators />} />
          <Route path="/calculators/ICU" element={<ICUCalculators />} />
          <Route path="*" element={<Typography variant="h5">404 - Page Not Found</Typography>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}