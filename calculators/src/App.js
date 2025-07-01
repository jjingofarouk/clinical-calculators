import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import NotFound from './NotFound';
import AllergyCalculators from './components/calculators/allergy/AllergyCalculators';
import BariatricsCalculators from './components/calculators/bariatrics/BariatricsCalculators';
import AnesthesiologyCalculators from './components/calculators/anesthesiology/AnesthesiologyCalculators';
import GeneralCalculators from './components/calculators/general/GeneralCalculators';
import CardiovascularCalculators from './components/calculators/cardiovascular/CardiovascularCalculators';
import PulmonaryCalculators from './components/calculators/pulmonary/PulmonaryCalculators';
import GastroenterologyCalculators from './components/calculators/git/GastroenterologyCalculators';
import ObstetricsCalculators from './components/calculators/obstetrics/ObstetricsCalculators';
import NeurologyCalculators from './components/calculators/neurology/NeurologyCalculators';
import NephrologyCalculators from './components/calculators/nephrology/NephrologyCalculators';
import OrthopedicsCalculators from './components/calculators/ortho/OrthopedicsCalculators';
import ICUCalculators from './components/calculators/icu/ICUCalculators';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground p-0 m-0">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/calculators/Allergy" element={<AllergyCalculators />} />
            <Route path="/calculators/Allergy/:calculator" element={<AllergyCalculators />} />
            <Route path="/calculators/Anesthesiology" element={<AnesthesiologyCalculators />} />
            <Route path="/calculators/Anesthesiology/:calculator" element={<AnesthesiologyCalculators />} />
            <Route path="/calculators/Bariatrics" element={<BariatricsCalculators />} />
            <Route path="/calculators/Bariatrics/:calculator" element={<BariatricsCalculators />} />
            <Route path="/calculators/General" element={<GeneralCalculators />} />
            <Route path="/calculators/General/:calculator" element={<GeneralCalculators />} />
            <Route path="/calculators/Cardiovascular" element={<CardiovascularCalculators />} />
            <Route path="/calculators/Cardiovascular/:calculator" element={<CardiovascularCalculators />} />
            <Route path="/calculators/Pulmonary" element={<PulmonaryCalculators />} />
            <Route path="/calculators/Pulmonary/:calculator" element={<PulmonaryCalculators />} />
            <Route path="/calculators/Gastroenterology" element={<GastroenterologyCalculators />} />
            <Route path="/calculators/Gastroenterology/:calculator" element={<GastroenterologyCalculators />} />
            <Route path="/calculators/Obstetrics" element={<ObstetricsCalculators />} />
            <Route path="/calculators/Obstetrics/:calculator" element={<ObstetricsCalculators />} />
            <Route path="/calculators/Neurology" element={<NeurologyCalculators />} />
            <Route path="/calculators/Neurology/:calculator" element={<NeurologyCalculators />} />
            <Route path="/calculators/Nephrology" element={<NephrologyCalculators />} />
            <Route path="/calculators/Nephrology/:calculator" element={<NephrologyCalculators />} />
            <Route path="/calculators/Orthopedics" element={<OrthopedicsCalculators />} />
            <Route path="/calculators/Orthopedics/:calculator" element={<OrthopedicsCalculators />} />
            <Route path="/calculators/ICU" element={<ICUCalculators />} />
            <Route path="/calculators/ICU/:calculator" element={<ICUCalculators />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}