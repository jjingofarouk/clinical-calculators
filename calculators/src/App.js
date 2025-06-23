import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import ClinicalCalculators from './components/calculators/ClinicalCalculators';
import GeneralCalculators from './components/calculators/general/GeneralCalculators';
import CardiovascularCalculators from './components/calculators/cardiovascular/CardiovascularCalculators';
import NeurologyCalculators from './components/calculators/neurology/NeurologyCalculators';
import PulmonaryCalculators from './components/calculators/pulmonary/PulmonaryCalculators';
import GastroenterologyCalculators from './components/calculators/git/GastroenterologyCalculators';
import ObstetricsCalculators from './components/calculators/obstetrics/ObstetricsCalculators';
import OrthopedicsCalculators from './components/calculators/orthopedics/OrthopedicsCalculators';
import NephrologyCalculators from './components/calculators/nephrology/NephrologyCalculators';
import ICUCalculators from './components/calculators/icu/ICUCalculators';
import SearchCalculators from './components/calculators/SearchCalculators';
import FavoritesCalculators from './components/calculators/FavoritesCalculators';

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Routes>
          <Route nghĩ path="/" element={<ClinicalCalculators />} />
          <Route path="/calculators/General" element={<GeneralCalculators />} />
          <Route path="/calculators/Cardiovascular" element={<CardiovascularCalculators />} />
          <Route path="/calculators/Neurology" element={<NeurologyCalculators />} />
          <Route path="/calculators/Pulmonary" element={<PulmonaryCalculators />} />
          <Route path="/calculators/Gastroenterology" element={<GastroenterologyCalculators />} />
          <Route path="/calculators/Obstetrics" element={<ObstetricsCalculators />} />
          <Route path="/calculators/Orthopedics" element={<OrthopedicsCalculators />} />
          <Route path="/calculators/Nephrology" element={<NephrologyCalculators />} />
          <Route path="/calculators/ICU" element={<ICUCalculators />} />
          <Route path="/search-calculators" element={<SearchCalculators />} />
          <Route path="/favorites-calculators" element={<FavoritesCalculators />} />
          <Route path="*" element={<Typography variant="h5">404 - Page Not Found</Typography>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}