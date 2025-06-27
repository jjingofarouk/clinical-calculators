import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';

import SCORAD from './SCORAD';
import EASI from './EASI';
import IgELevel from './IgELevel';
import RASTScore from './RASTScore';
import DLQI from './DLQI';
import AsthmaControlTest from './AsthmaControlTest';
import FeNO from './FeNO';
import AllergicRhinitisScore from './AllergicRhinitisScore';
import AnaphylaxisRisk from './AnaphylaxisRisk';
import DrugAllergyProbability from './DrugAllergyProbability';
import FoodAllergyScore from './FoodAllergyScore';
import AtopyRisk from './AtopyRisk';
import EczemaSeverityIndex from './EczemaSeverityIndex';
import UrticariaActivityScore from './UrticariaActivityScore';
import AngioedemaScore from './AngioedemaScore';
import MastocytosisScore from './MastocytosisScore';
import HereditaryAngioedema from './HereditaryAngioedema';
import ImmunodeficiencyRisk from './ImmunodeficiencyRisk';
import ComplementDeficiency from './ComplementDeficiency';
import SLEDAI from './SLEDAI';
import LupusActivityIndex from './LupusActivityIndex';
import BILAG from './BILAG';
import ASASCriteria from './ASASCriteria';
import PatchTestScore from './PatchTestScore';

const calculators = [
  { label: 'SCORAD', component: <SCORAD /> },
  { label: 'EASI', component: <EASI /> },
  { label: 'IgE Level', component: <IgELevel /> },
  { label: 'RAST Score', component: <RASTScore /> },
  { label: 'DLQI', component: <DLQI /> },
  { label: 'Asthma Control Test', component: <AsthmaControlTest /> },
  { label: 'FeNO', component: <FeNO /> },
  { label: 'Allergic Rhinitis Score', component: <AllergicRhinitisScore /> },
  { label: 'Anaphylaxis Risk', component: <AnaphylaxisRisk /> },
  { label: 'Drug Allergy Probability', component: <DrugAllergyProbability /> },
  { label: 'Food Allergy Score', component: <FoodAllergyScore /> },
  { label: 'Atopy Risk', component: <AtopyRisk /> },
  { label: 'Eczema Severity Index', component: <EczemaSeverityIndex /> },
  { label: 'Urticaria Activity Score', component: <UrticariaActivityScore /> },
  { label: 'Angioedema Score', component: <AngioedemaScore /> },
  { label: 'Mastocytosis Score', component: <MastocytosisScore /> },
  { label: 'Hereditary Angioedema', component: <HereditaryAngioedema /> },
  { label: 'Immunodeficiency Risk', component: <ImmunodeficiencyRisk /> },
  { label: 'Complement Deficiency', component: <ComplementDeficiency /> },
  { label: 'SLEDAI', component: <SLEDAI /> },
  { label: 'Lupus Activity Index', component: <LupusActivityIndex /> },
  { label: 'BILAG', component: <BILAG /> },
  { label: 'ASAS Criteria', component: <ASASCriteria /> },
  { label: 'Patch Test Score', component: <PatchTestScore /> }
];

const AllergyCalculators = () => {
  const { calculator } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredCalculators = calculators.filter(c =>
    c.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (calculator) {
      const calcName = calculator.replace(/-/g, ' ');
      const index = calculators.findIndex(c => c.label.toLowerCase() === calcName.toLowerCase());
      if (index !== -1) {
        setSearchQuery(''); // Reset search to show all calculators
        setSelectedTab(index);
      } else {
        setSelectedTab(0); // Fallback to first tab if calculator not found
      }
    } else {
      setSelectedTab(0); // Default to first tab if no calculator parameter
    }
  }, [calculator]);

  const handleTabChange = (_, newIndex) => {
    setSelectedTab(newIndex);
  };

  return (
    <Box className="h-full w-full max-w-full flex flex-col bg-white">
      <Box className="p-4 border-b border-gray-200 bg-white w-full">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search calculators..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedTab(0);
          }}
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#d1d5db' },
              '&:hover fieldset': { borderColor: '#0d9488' },
              '&.Mui-focused fieldset': { borderColor: '#0d9488' },
            },
            input: {
              fontFamily: 'Inter, sans-serif',
              color: '#1F2937'
            },
            width: '100%',
            maxWidth: '100%'
          }}
        />
      </Box>

      <Box className="calculator-tabs" sx={{ borderBottom: 1, borderColor: '#E5E7EB', px: 2, bgcolor: '#F9FAFB', overflowX: 'auto' }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={isMobile ? 'auto' : false}
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-flexContainer': {
              flexWrap: 'nowrap'
            },
            '& .MuiTab-root': {
              borderRadius: 3,
              m: 0.5,
              bgcolor: '#fff',
              border: '1px solid #E5E7EB',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              textTransform: 'none',
              color: '#1F2937',
              px: 2,
              py: 1,
              boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
              flexShrink: 0,
              minWidth: 'auto'
            },
            '& .Mui-selected': {
              bgcolor: '#0d9488',
              color: '#fff',
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(39,199,184,0.2)'
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#0d9488'
            },
            '& .MuiTabs-scroller': {
              overflowX: 'auto !important',
              scrollbarWidth: 'thin',
              scrollbarColor: '#d1d5db transparent',
              '&::-webkit-scrollbar': {
                height: '8px'
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#d1d5db',
                borderRadius: '4px'
              }
            }
          }}
        >
          {filteredCalculators.map((calc) => (
            <Tab key={calc.label} label={calc.label} />
          ))}
        </Tabs>
      </Box>

      <Box className="flex-1 overflow-y-auto p-4 bg-white w-full max-w-full">
        {filteredCalculators.length > 0 ? (
          filteredCalculators[selectedTab]?.component
        ) : (
          <Typography variant="body1" className="text-gray-500 text-center mt-8">
            No calculators match your search.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AllergyCalculators;