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
import ANATiter from './ANATiter';
import AntiDsDNA from './AntiDsDNA';
import C3C4Levels from './C3C4Levels';
import LupusActivityIndex from './LupusActivityIndex';
import BILAG from './BILAG';
import RALatexTest from './RALatexTest';
import CCPAntibody from './CCPAntibody';
import RFTiter from './RFTiter';
import HLAB27 from './HLAB27';
import ASASCriteria from './ASASCriteria';
import ASCA from './ASCA';
import pANCA from './pANCA';
import EosinophilCount from './EosinophilCount';
import BasophilActivation from './BasophilActivation';
import PatchTestScore from './PatchTestScore';
import SkinPrickTest from './SkinPrickTest';
import TotalIgG from './TotalIgG';
import IgGSubclass from './IgGSubclass';
import IgADeficiency from './IgADeficiency';
import C1Inhibitor from './C1Inhibitor';
import CH50 from './CH50';
import AH50 from './AH50';
import MannoseBindingLectin from './MannoseBindingLectin';
import NKCellActivity from './NKCellActivity';
import ImmunoglobulinRatio from './ImmunoglobulinRatio';
import VaccineResponse from './VaccineResponse';
import AllergySeverityScore from './AllergySeverityScore';

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
  { label: 'ANA Titer', component: <ANATiter /> },
  { label: 'Anti-dsDNA', component: <AntiDsDNA /> },
  { label: 'C3/C4 Levels', component: <C3C4Levels /> },
  { label: 'Lupus Activity Index', component: <LupusActivityIndex /> },
  { label: 'BILAG', component: <BILAG /> },
  { label: 'RA Latex Test', component: <RALatexTest /> },
  { label: 'CCP Antibody', component: <CCPAntibody /> },
  { label: 'RF Titer', component: <RFTiter /> },
  { label: 'HLA-B27', component: <HLAB27 /> },
  { label: 'ASAS Criteria', component: <ASASCriteria /> },
  { label: 'ASCA', component: <ASCA /> },
  { label: 'pANCA', component: <pANCA /> },
  { label: 'Eosinophil Count', component: <EosinophilCount /> },
  { label: 'Basophil Activation', component: <BasophilActivation /> },
  { label: 'Patch Test Score', component: <PatchTestScore /> },
  { label: 'Skin Prick Test', component: <SkinPrickTest /> },
  { label: 'Total IgG', component: <TotalIgG /> },
  { label: 'IgG Subclass', component: <IgGSubclass /> },
  { label: 'IgA Deficiency', component: <IgADeficiency /> },
  { label: 'C1 Inhibitor', component: <C1Inhibitor /> },
  { label: 'CH50', component: <CH50 /> },
  { label: 'AH50', component: <AH50 /> },
  { label: 'Mannose-Binding Lectin', component: <MannoseBindingLectin /> },
  { label: 'NK Cell Activity', component: <NKCellActivity /> },
  { label: 'Immunoglobulin Ratio', component: <ImmunoglobulinRatio /> },
  { label: 'Vaccine Response', component: <VaccineResponse /> },
  { label: 'Allergy Severity Score', component: <AllergySeverityScore /> }
];

const AllergyCalculators = () => {
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

export default AllergyCalculators;