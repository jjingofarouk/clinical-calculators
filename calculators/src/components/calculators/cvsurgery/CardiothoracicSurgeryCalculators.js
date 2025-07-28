import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';

// Existing imports
import EuroSCORE from './EuroSCORE';
import STSScore from './STSScore';
import CABGRisk from './CABGRisk';
import ValveSurgeryRisk from './ValveSurgeryRisk';
import AorticSurgeryRisk from './AorticSurgeryRisk';
import LungResectionRisk from './LungResectionRisk';
import PneumonectomyRisk from './PneumonectomyRisk';
import EsophagectomyRisk from './EsophagectomyRisk';
import TamponadeRisk from './TamponadeRisk';
import PostopAFRisk from './PostopAFRisk';

// Missing imports - add these
import BleedingRisk from './BleedingRisk';
import ReoperationRisk from './ReoperationRisk';
import SternalInfection from './SternalInfection';
import VentilatorDays from './VentilatorDays';
import ICUStay from './ICUStay';
import MortalityRisk from './MortalityRisk';
import CABGPatency from './CABGPatency';
import GraftFailureRisk from './GraftFailureRisk';
import PostopComplication from './PostopComplication';
import SurvivalProbability from './SurvivalProbability';
import SYNTAXScore from './SYNTAXScore';

const calculators = [
  { label: 'EuroSCORE', component: <EuroSCORE /> },
  { label: 'STS Score', component: <STSScore /> },
  { label: 'CABG Risk', component: <CABGRisk /> },
  { label: 'Valve Surgery Risk', component: <ValveSurgeryRisk /> },
  { label: 'Aortic Surgery Risk', component: <AorticSurgeryRisk /> },
  { label: 'Lung Resection Risk', component: <LungResectionRisk /> },
  { label: 'Pneumonectomy Risk', component: <PneumonectomyRisk /> },
  { label: 'Esophagectomy Risk', component: <EsophagectomyRisk /> },
  { label: 'Tamponade Risk', component: <TamponadeRisk /> },
  { label: 'Postop AF Risk', component: <PostopAFRisk /> },
  // Add the missing calculators
  { label: 'Bleeding Risk', component: <BleedingRisk /> },
  { label: 'Reoperation Risk', component: <ReoperationRisk /> },
  { label: 'Sternal Infection', component: <SternalInfection /> },
  { label: 'Ventilator Days', component: <VentilatorDays /> },
  { label: 'ICU Stay', component: <ICUStay /> },
  { label: 'Mortality Risk', component: <MortalityRisk /> },
  { label: 'CABG Patency', component: <CABGPatency /> },
  { label: 'Graft Failure Risk', component: <GraftFailureRisk /> },
  { label: 'Postop Complication', component: <PostopComplication /> },
  { label: 'Survival Probability', component: <SurvivalProbability /> },
  { label: 'SYNTAX Score', component: <SYNTAXScore /> },
];

const CardiothoracicSurgeryCalculators = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredCalculators = calculators.filter(c =>
    c.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabChange = (_, newIndex) => {
    setSelectedTab(newIndex);
  };

  return (
    <Box className="h-full w-full max-w-full flex flex-col bg-background text-foreground">
      <Box className="p-2 border-b border-border bg-card w-full">
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
            backgroundColor: 'hsl(var(--card))',
            borderRadius: 'var(--radius)',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'hsl(var(--border))' },
              '&:hover fieldset': { borderColor: 'hsl(var(--primary))' },
              '&.Mui-focused fieldset': { borderColor: 'hsl(var(--primary))' },
            },
            input: {
              fontFamily: 'Inter, sans-serif',
              color: 'hsl(var(--card-foreground))'
            },
            width: '100%',
            maxWidth: '100%'
          }}
        />
      </Box>

      <Box className="calculator-tabs" sx={{ borderBottom: 1, borderColor: 'hsl(var(--border))', px: 1, bgcolor: 'hsl(var(--secondary))', overflowX: 'auto' }}>
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
              borderRadius: 'var(--radius)',
              m: 0.5,
              bgcolor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              textTransform: 'none',
              color: 'hsl(var(--card-foreground))',
              px: 2,
              py: 1,
              boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
              flexShrink: 0,
              minWidth: 'auto'
            },
            '& .Mui-selected': {
              bgcolor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(39,199,184,0.2)'
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'hsl(var(--primary))'
            },
            '& .MuiTabs-scroller': {
              overflowX: 'auto !important',
              scrollbarWidth: 'thin',
              scrollbarColor: 'hsl(var(--border)) transparent',
              '&::-webkit-scrollbar': {
                height: '8px'
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'hsl(var(--border))',
                borderRadius: '4px'
              }
            }
          }}
        >
          {filteredCalculators.map((calc, index) => (
            <Tab key={calc.label} label={calc.label} />
          ))}
        </Tabs>
      </Box>

      <Box className="flex-1 overflow-y-auto p-2 bg-background w-full max-w-full">
        {filteredCalculators.length > 0 ? (
          filteredCalculators[selectedTab]?.component
        ) : (
          <Typography variant="body1" className="text-muted-foreground text-center mt-8">
            No calculators match your search.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CardiothoracicSurgeryCalculators;