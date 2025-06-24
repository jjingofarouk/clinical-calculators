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
import ASCVDCalculator from './ASCVD';
import ADHERE from './ADHERE';
import FraminghamRiskCalculator from './Framingham';
import CHA2DS2VASc from './CHA2DS2VASc';
import HASBLED from './HASBLED';
import GRACECalculator from './GRACE';
import TIMICalculator from './TIMI';
import CHADSScore from './CHADSScore';
import CHA2DS2VAScore from './CHA2DS2VAScore';
import HEMORR2HAGES from './HEMORR2HAGES';
import ORBITScore from './ORBITScore';
import H2FPEFScore from './H2FPEFScore';
import MAGGICRiskScore from './MAGGICRiskScore';
import SeattleHeartFailureModel from './SeattleHeartFailureModel';
import WATCHDMScore from './WATCHDMScore';
import OttawaHeartFailureRisk from './OttawaHeartFailureRisk';
import BAGADHFScore from './BAGADHFScore';
import SgarbossaCriteria from './SgarbossaCriteria';
import ModifiedSgarbossaCriteria from './ModifiedSgarbossaCriteria';
import INTERCHESTScore from './INTERCHESTScore';
import ReynoldsRiskScore from './ReynoldsRiskScore';
import QRISK3 from './QRISK3';
import HeartScore from './HeartScore';
import JBS3 from './JBS3';
import MAPCalculator from './MAPCalculator';
import PulsePressure from './PulsePressure';
import SVRCalculator from './SVRCalculator';
import CardiacOutputIndex from './CardiacOutputIndex';
import PVRCalculator from './PVRCalculator';
import GorlinEquation from './GorlinEquation';
import BazettsFormula from './BazettsFormula';
import FridericiasFormula from './FridericiasFormula';
import FraminghamFormula from './FraminghamFormula';
import LeesRevisedCardiacRiskIndex from './LeesRevisedCardiacRiskIndex';
import GuptaMICAScore from './GuptaMICAScore';
import EUROScoreII from './EUROScoreII';
import ModifiedDukeCriteria from './ModifiedDukeCriteria';
import EmbolicRiskScore from './EmbolicRiskScore';
import AorticValveCalciumScore from './AorticValveCalciumScore';
import PVRIndex from './PVRIndex';
import LVMassIndex from './LVMassIndex';
import TeichholzFormula from './TeichholzFormula';
import StrokeVolumeIndex from './StrokeVolumeIndex';
import EARatio from './EARatio';
import ShockIndex from './ShockIndex';
import ROSI from './ROSI';
import PEWS from './PEWS';
import FickCardiacOutput from './FickCardiacOutput';
import LVStrokeWorkIndex from './LVStrokeWorkIndex';
import BloodPressurePercentiles from './BloodPressurePercentiles';

const calculators = [
  { label: 'ASCVD', component: <ASCVDCalculator /> },
  { label: 'Framingham', component: <FraminghamRiskCalculator /> },
  { label: 'ADHERE', component: <ADHERE /> },
  { label: 'CHA2DS2-VASc', component: <CHA2DS2VASc /> },
  { label: 'HAS-BLED', component: <HASBLED /> },
  { label: 'GRACE', component: <GRACECalculator /> },
  { label: 'TIMI', component: <TIMICalculator /> },
  { label: 'CHADS₂', component: <CHADSScore /> },
  { label: 'CHA₂DS₂-VA', component: <CHA2DS2VAScore /> },
  { label: 'HEMORR₂HAGES', component: <HEMORR2HAGES /> },
  { label: 'ORBIT', component: <ORBITScore /> },
  { label: 'H₂FPEF', component: <H2FPEFScore /> },
  { label: 'MAGGIC', component: <MAGGICRiskScore /> },
  { label: 'Seattle Heart Failure', component: <SeattleHeartFailureModel /> },
  { label: 'WATCH-DM', component: <WATCHDMScore /> },
  { label: 'Ottawa Heart Failure', component: <OttawaHeartFailureRisk /> },
  { label: 'BAG-ADHF', component: <BAGADHFScore /> },
  { label: 'Sgarbossa Criteria', component: <SgarbossaCriteria /> },
  { label: 'Modified Sgarbossa', component: <ModifiedSgarbossaCriteria /> },
  { label: 'INTERCHEST', component: <INTERCHESTScore /> },
  { label: 'Reynolds Risk', component: <ReynoldsRiskScore /> },
  { label: 'QRISK3', component: <QRISK3 /> },
  { label: 'HeartScore', component: <HeartScore /> },
  { label: 'JBS3', component: <JBS3 /> },
  { label: 'MAP', component: <MAPCalculator /> },
  { label: 'Pulse Pressure', component: <PulsePressure /> },
  { label: 'SVR', component: <SVRCalculator /> },
  { label: 'Cardiac Output/Index', component: <CardiacOutputIndex /> },
  { label: 'PVR', component: <PVRCalculator /> },
  { label: 'Gorlin Equation', component: <GorlinEquation /> },
  { label: 'Bazett’s Formula', component: <BazettsFormula /> },
  { label: 'Fridericia’s Formula', component: <FridericiasFormula /> },
  { label: 'Framingham Formula', component: <FraminghamFormula /> },
  { label: 'Lee’s Revised Cardiac Risk', component: <LeesRevisedCardiacRiskIndex /> },
  { label: 'Gupta MICA', component: <GuptaMICAScore /> },
  { label: 'EuroScore II', component: <EUROScoreII /> },
  { label: 'Modified Duke Criteria', component: <ModifiedDukeCriteria /> },
  { label: 'Embolic Risk Score', component: <EmbolicRiskScore /> },
  { label: 'Aortic Valve Calcium', component: <AorticValveCalciumScore /> },
  { label: 'PVR Index', component: <PVRIndex /> },
  { label: 'LV Mass Index', component: <LVMassIndex /> },
  { label: 'Teichholz Formula', component: <TeichholzFormula /> },
  { label: 'Stroke Volume Index', component: <StrokeVolumeIndex /> },
  { label: 'E/A Ratio', component: <EARatio /> },
  { label: 'Shock Index', component: <ShockIndex /> },
  { label: 'ROSI', component: <ROSI /> },
  { label: 'PEWS', component: <PEWS /> },
  { label: 'Fick Cardiac Output', component: <FickCardiacOutput /> },
  { label: 'LV Stroke Work Index', component: <LVStrokeWorkIndex /> },
  { label: 'Blood Pressure Percentiles', component: <BloodPressurePercentiles /> }
];

const CardiovascularCalculators = () => {
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
          {filteredCalculators.map((calc, index) => (
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

export default CardiovascularCalculators;