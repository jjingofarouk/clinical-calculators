import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../SearchBar';

import MBSAQIPRiskCalculator from './MBSAQIPRiskCalculator';
import BariatricSurgeryOutcomeScore from './BariatricSurgeryOutcomeScore';
import BariatricRiskScore from './BariatricRiskScore';
import ABCDScore from './ABCDScore';
import DiaRemScore from './DiaRemScore';
import DiaBetterScore from './DiaBetterScore';
import AdDiaRemScore from './AdDiaremScore';
import OSMRSCalculator from './OSMRSCalculator';
import PostDischargeVTECalculator from './PostDischargeVTECalculator';
import SLEEVEPASSScore from './SLEEVEPASSScore';
import MBSAQIPLeakRiskCalculator from './MBSAQIPLeakRiskCalculator';
import POWERScore from './POWERScore';
import EBMILPredictor from './EBMILPredictor';
import BariatricReadmissionCalculator from './BariatricReadmissionCalculator';

const calculators = [
  { label: 'MBSAQIP Risk Calculator', component: <MBSAQIPRiskCalculator /> },
  { label: 'Bariatric Surgery Outcome Score', component: <BariatricSurgeryOutcomeScore /> },
  { label: 'Bariatric Risk Score', component: <BariatricRiskScore /> },
  { label: 'ABCD Score', component: <ABCDScore /> },
  { label: 'DiaRem Score', component: <DiaRemScore /> },
  { label: 'DiaBetter Score', component: <DiaBetterScore /> },
  { label: 'Ad-DiaRem Score', component: <AdDiaRemScore /> },
  { label: 'OS-MRS Calculator', component: <OSMRSCalculator /> },
  { label: 'Post-Discharge VTE Risk Calculator', component: <PostDischargeVTECalculator /> },
  { label: 'SLEEVEPASS Score', component: <SLEEVEPASSScore /> },
  { label: 'MBSAQIP Leak Risk Calculator', component: <MBSAQIPLeakRiskCalculator /> },
  { label: 'POWER Score', component: <POWERScore /> },
  { label: '%EBMIL Predictor', component: <EBMILPredictor /> },
  { label: 'Bariatric Readmission Calculator', component: <BariatricReadmissionCalculator /> },
];

const BariatricsCalculators = () => {
  const { calculator } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalculators = calculators.filter(c =>
    c.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (calculator) {
      const calcName = calculator.replace(/-/g, ' ');
      const index = calculators.findIndex(c => c.label.toLowerCase() === calcName.toLowerCase());
      if (index !== -1) {
        setSearchQuery('');
        setSelectedTab(index);
      } else {
        setSelectedTab(0);
      }
    } else {
      setSelectedTab(0);
    }
  }, [calculator]);

  const handleTabChange = (newIndex) => {
    setSelectedTab(newIndex);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSelectedTab(0);
  };

  return (
    <motion.div
      className="min-h-screen w-full bg-background text-foreground flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        placeholder="Search bariatric surgery calculators..."
      />

      <div className="px-4 py-2 border-b border-border bg-secondary overflow-x-auto">
        <div className="flex space-x-2 max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          {filteredCalculators.map((calc, index) => (
            <button
              key={calc.label}
              onClick={() => handleTabChange(index)}
              className={`px-4 py-2 rounded-radius text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${selectedTab === index
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground'}`}
            >
              {calc.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 bg-background">
        {filteredCalculators.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            {filteredCalculators[selectedTab]?.component}
          </div>
        ) : (
          <p className="text-muted-foreground text-center mt-8">
            No calculators match your search.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default BariatricsCalculators;