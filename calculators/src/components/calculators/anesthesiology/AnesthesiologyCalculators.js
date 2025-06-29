```jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tabs, Tab, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import ASAPhysicalStatus from './ASAPhysicalStatus';
import MallampatiScore from './MallampatiScore';
import CormackLehane from './CormackLehane';
import ApfelScore from './ApfelScore';
import RCRI from './RCRI';
import STOPBANG from './STOPBANG';
import LaryngealMaskSize from './LaryngealMaskSize';
import EpiduralDosing from './EpiduralDosing';
import LocalAnestheticMaxDose from './LocalAnestheticMaxDose';
import PainAssessmentScales from './PainAssessmentScales';
import BispectralIndex from './BispectralIndex';
import MACValues from './MACValues';
import OpioidConversion from './OpioidConversion';
import PCADosing from './PCADosing';
import SedationScales from './SedationScales';
import CAMICU from './CAMICU';
import PONVRisk from './PONVRisk';
import AnestheticGasFlow from './AnestheticGasFlow';
import TIVADosing from './TIVADosing';
import BloodLossEstimation from './BloodLossEstimation';
import PerioperativeFluid from './PerioperativeFluid';
import TransfusionTrigger from './TransfusionTrigger';
import TEGInterpretation from './TEGInterpretation';
import ROTEMInterpretation from './ROTEMInterpretation';
import NerveBlockVolume from './NerveBlockVolume';
import SpinalAnesthesiaDosing from './SpinalAnesthesiaDosing';
import EpiduralTestDose from './EpiduralTestDose';
import OxygenationAssessment from './OxygenationAssessment';
import AldreteScore from './AldreteScore';
import PACUDischarge from './PACUDischarge';
import MalignantHyperthermia from './MalignantHyperthermia';
import IntubationDifficulty from './IntubationDifficulty';
import WilsonScore from './WilsonScore';
import ElGanzouriRisk from './ElGanzouriRisk';
import GuptaPerioperativeRisk from './GuptaPerioperativeRisk';
import ARISCATScore from './ARISCATScore';
import PREDELIRIC from './PREDELIRIC';
import NutritionRiskScreening from './NutritionRiskScreening';
import ClinicalFrailtyScale from './ClinicalFrailtyScale';
import BroselowTape from './BroselowTape';
import EndTidalCO2 from './EndTidalCO2';
import AlveolarGasEquation from './AlveolarGasEquation';
import AnionGap from './AnionGap';
import OsmolalGap from './OsmolalGap';
import CreatinineClearance from './CreatinineClearance';
import EGFR from './EGFR';
import MELDScore from './MELDScore';
import ChildPughScore from './ChildPughScore';
import APACHEII from './APACHEII';
import SOFAScore from './SOFAScore';
import QSOFA from './QSOFA';
import SAPSII from './SAPSII';
import CardiacOutputMonitoring from './CardiacOutputMonitoring';
import StrokeVolumeVariation from './StrokeVolumeVariation';
import PulsePressureVariation from './PulsePressureVariation';
import CentralVenousPressure from './CentralVenousPressure';
import PulmonaryArteryCatheter from './PulmonaryArteryCatheter';
import TEEHemodynamic from './TEEHemodynamic';
import NeuromuscularBlockade from './NeuromuscularBlockade';
import EntropyMonitoring from './EntropyMonitoring';
import NarcotrendIndex from './NarcotrendIndex';
import CerebralOximetry from './CerebralOximetry';
import LactateLevels from './LactateLevels';
import BaseDeficitExcess from './BaseDeficitExcess';
import StrongIonDifference from './StrongIonDifference';
import AllergicReactionRisk from './AllergicReactionRisk';
import LatexAllergyRisk from './LatexAllergyRisk';
import MalignantHyperthermiaSusceptibility from './MalignantHyperthermiaSusceptibility';
import SickleCellConsiderations from './SickleCellConsiderations';
import BerlinQuestionnaire from './BerlinQuestionnaire';
import GERDRisk from './GERDRisk';
import AspirationRisk from './AspirationRisk';
import ASADifficultAirway from './ASADifficultAirway';
import CICOAlgorithm from './CICOAlgorithm';
import RSIDrugDosing from './RSIDrugDosing';
import PreoxygenationTechniques from './PreoxygenationTechniques';
import ApneicOxygenation from './ApneicOxygenation';
import HFNO from './HFNO';
import NIVSettings from './NIVSettings';
import ECMOBasics from './ECMOBasics';
import IABP from './IABP';
import VADs from './VADs';
import POCUS from './POCUS';
import LungUltrasound from './LungUltrasound';
import CardiacUltrasound from './CardiacUltrasound';
import NerveIdentification from './NerveIdentification';
import VascularAccessUltrasound from './VascularAccessUltrasound';
import POCDRisk from './POCDRisk';
import ERASProtocols from './ERASProtocols';
import PerioperativeCardiacArrest from './PerioperativeCardiacArrest';
import ImplantedDevices from './ImplantedDevices';

const calculators = [
  { label: 'ASA Physical Status Classification', component: <ASAPhysicalStatus /> },
  { label: 'Mallampati Score', component: <MallampatiScore /> },
  { label: 'Cormack-Lehane Classification', component: <CormackLehane /> },
  { label: 'Apfel Score (for PONV)', component: <ApfelScore /> },
  { label: 'Revised Cardiac Risk Index (RCRI)', component: <RCRI /> },
  { label: 'STOP-BANG Questionnaire (for OSA)', component: <STOPBANG /> },
  { label: 'Laryngeal Mask Size Guidelines', component: <LaryngealMaskSize /> },
  { label: 'Epidural Dosing Calculators', component: <EpiduralDosing /> },
  { label: 'Local Anesthetic Maximum Dose Calculators', component: <LocalAnestheticMaxDose /> },
  { label: 'Pain Assessment Scales (VAS, NRS, etc.)', component: <PainAssessmentScales /> },
  { label: 'Bispectral Index (BIS) for Depth of Anesthesia', component: <BispectralIndex /> },
  { label: 'Minimum Alveolar Concentration (MAC) Values', component: <MACValues /> },
  { label: 'Opioid Conversion Calculators', component: <OpioidConversion /> },
  { label: 'Patient-Controlled Analgesia (PCA) Dosing Guidelines', component: <PCADosing /> },
  { label: 'Sedation Scales (Ramsay, RASS, etc.)', component: <SedationScales /> },
  { label: 'Confusion Assessment Method for ICU (CAM-ICU)', component: <CAMICU /> },
  { label: 'Postoperative Nausea and Vomiting (PONV) Risk Scores', component: <PONVRisk /> },
  { label: 'Anesthetic Gas Flow Rate Calculators', component: <AnestheticGasFlow /> },
  { label: 'Total Intravenous Anesthesia (TIVA) Dosing Calculators', component: <TIVADosing /> },
  { label: 'Blood Loss Estimation Methods', component: <BloodLossEstimation /> },
  { label: 'Perioperative Fluid Management Calculators', component: <PerioperativeFluid /> },
  { label: 'Transfusion Trigger Guidelines', component: <TransfusionTrigger /> },
  { label: 'Thromboelastography Interpretation', component: <TEGInterpretation /> },
  { label: 'Rotational Thromboelastometry (ROTEM) Interpretation', component: <ROTEMInterpretation /> },
  { label: 'Nerve Block Volume Calculators', component: <NerveBlockVolume /> },
  { label: 'Spinal Anesthesia Dosing Guidelines', component: <SpinalAnesthesiaDosing /> },
  { label: 'Epidural Test Dose', component: <EpiduralTestDose /> },
  { label: 'Oxygenation Assessment (PaO2/FiO2, etc.)', component: <OxygenationAssessment /> },
  { label: 'Aldrete Score for Post-Anesthesia Recovery', component: <AldreteScore /> },
  { label: 'Post-Anesthesia Care Unit (PACU) Discharge Criteria', component: <PACUDischarge /> },
  { label: 'Malignant Hyperthermia Clinical Grading Scale', component: <MalignantHyperthermia /> },
  { label: 'Intubation Difficulty Scale (IDS)', component: <IntubationDifficulty /> },
  { label: 'Wilson Score for Difficult Intubation', component: <WilsonScore /> },
  { label: 'El-Ganzouri Risk Index for Difficult Tracheal Intubation', component: <ElGanzouriRisk /> },
  { label: 'Gupta Perioperative Risk Calculator', component: <GuptaPerioperativeRisk /> },
  { label: 'ARISCAT Score for Postoperative Pulmonary Complications', component: <ARISCATScore /> },
  { label: 'PRE-DELIRIC for Delirium Risk', component: <PREDELIRIC /> },
  { label: 'Nutrition Risk Screening (NRS 2002)', component: <NutritionRiskScreening /> },
  { label: 'Clinical Frailty Scale', component: <ClinicalFrailtyScale /> },
  { label: 'Broselow Tape for Pediatric Dosing', component: <BroselowTape /> },
  { label: 'End-Tidal CO2 Interpretation', component: <EndTidalCO2 /> },
  { label: 'Alveolar Gas Equation', component: <AlveolarGasEquation /> },
  { label: 'Anion Gap', component: <AnionGap /> },
  { label: 'Osmolal Gap', component: <OsmolalGap /> },
  { label: 'Creatinine Clearance (Cockcroft-Gault)', component: <CreatinineClearance /> },
  { label: 'Glomerular Filtration Rate (eGFR)', component: <EGFR /> },
  { label: 'Model for End-Stage Liver Disease (MELD) Score', component: <MELDScore /> },
  { label: 'Child-Pugh Score', component: <ChildPughScore /> },
  { label: 'Acute Physiology and Chronic Health Evaluation II (APACHE II)', component: <APACHEII /> },
  { label: 'Sequential Organ Failure Assessment (SOFA) Score', component: <SOFAScore /> },
  { label: 'quick Sequential Organ Failure Assessment (qSOFA)', component: <QSOFA /> },
  { label: 'Simplified Acute Physiology Score (SAPS II)', component: <SAPSII /> },
  { label: 'Cardiac Output Monitoring Techniques', component: <CardiacOutputMonitoring /> },
  { label: 'Stroke Volume Variation', component: <StrokeVolumeVariation /> },
  { label: 'Pulse Pressure Variation', component: <PulsePressureVariation /> },
  { label: 'Central Venous Pressure Interpretation', component: <CentralVenousPressure /> },
  { label: 'Pulmonary Artery Catheter Data Interpretation', component: <PulmonaryArteryCatheter /> },
  { label: 'Transesophageal Echocardiography (TEE) for Hemodynamic Monitoring', component: <TEEHemodynamic /> },
  { label: 'Neuromuscular Blockade Monitoring (Train-of-Four, etc.)', component: <NeuromuscularBlockade /> },
  { label: 'Entropy Monitoring for Depth of Anesthesia', component: <EntropyMonitoring /> },
  { label: 'Narcotrend Index', component: <NarcotrendIndex /> },
  { label: 'Cerebral Oximetry (NIRS)', component: <CerebralOximetry /> },
  { label: 'Lactate Levels', component: <LactateLevels /> },
  { label: 'Base Deficit/Base Excess', component: <BaseDeficitExcess /> },
  { label: 'Strong Ion Difference (SID)', component: <StrongIonDifference /> },
  { label: 'Allergic Reaction Risk Assessment', component: <AllergicReactionRisk /> },
  { label: 'Latex Allergy Risk', component: <LatexAllergyRisk /> },
  { label: 'Malignant Hyperthermia Susceptibility Assessment', component: <MalignantHyperthermiaSusceptibility /> },
  { label: 'Sickle Cell Disease Considerations', component: <SickleCellConsiderations /> },
  { label: 'Obstructive Sleep Apnea Risk (Berlin Questionnaire)', component: <BerlinQuestionnaire /> },
  { label: 'Gastroesophageal Reflux Disease (GERD) Risk for Aspiration', component: <GERDRisk /> },
  { label: 'Aspiration Risk Assessment', component: <AspirationRisk /> },
  { label: 'American Society of Anesthesiologists (ASA) Difficult Airway Algorithm', component: <ASADifficultAirway /> },
  { label: 'Cannot Intubate, Cannot Oxygenate (CICO) Algorithm', component: <CICOAlgorithm /> },
  { label: 'Rapid Sequence Intubation (RSI) Drug Dosing', component: <RSIDrugDosing /> },
  { label: 'Preoxygenation Techniques', component: <PreoxygenationTechniques /> },
  { label: 'Apneic Oxygenation', component: <ApneicOxygenation /> },
  { label: 'High-Flow Nasal Oxygen (HFNO) for Preoxygenation', component: <HFNO /> },
  { label: 'Non-Invasive Ventilation (NIV) Settings', component: <NIVSettings /> },
  { label: 'Extracorporeal Membrane Oxygenation (ECMO) Basics', component: <ECMOBasics /> },
  { label: 'Intra-Aortic Balloon Pump (IABP) for Cardiac Support', component: <IABP /> },
  { label: 'Ventricular Assist Devices (VADs)', component: <VADs /> },
  { label: 'Point-of-Care Ultrasound (POCUS) for Anesthesiologists', component: <POCUS /> },
  { label: 'Lung Ultrasound', component: <LungUltrasound /> },
  { label: 'Cardiac Ultrasound', component: <CardiacUltrasound /> },
  { label: 'Nerve Identification for Regional Blocks', component: <NerveIdentification /> },
  { label: 'Vascular Access Ultrasound', component: <VascularAccessUltrasound /> },
  { label: 'Postoperative Cognitive Dysfunction (POCD) Risk Assessment', component: <POCDRisk /> },
  { label: 'Enhanced Recovery After Surgery (ERAS) Protocols', component: <ERASProtocols /> },
  { label: 'Perioperative Cardiac Arrest Risk', component: <PerioperativeCardiacArrest /> },
  { label: 'Anesthesia for Patients with Implanted Devices', component: <ImplantedDevices /> }
];

const AnesthesiologyCalculators = () => {
  const { calculator } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (calculator) {
      const calcName = calculator.replace(/-/g, ' ');
      const index = calculators.findIndex(c => c.label.toLowerCase() === calcName.toLowerCase());
      if (index !== -1) {
        setSelectedTab(index);
      } else {
        setSelectedTab(0);
      }
    } else {
      setSelectedTab(0);
    }
  }, [calculator]);

  const handleTabChange = (_, newIndex) => {
    setSelectedTab(newIndex);
  };

  return (
    <motion.div
      className="h-full w-full max-w-full flex flex-col bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
          {calculators.map((calc) => (
            <Tab key={calc.label} label={calc.label} />
          ))}
        </Tabs>
      </Box>

      <Box className="flex-1 overflow-y-auto p-4 bg-white w-full max-w-full">
        {calculators[selectedTab]?.component || (
          <Typography variant="body1" className="text-gray-500 text-center mt-8">
            No calculator selected.
          </Typography>
        )}
      </Box>
    </motion.div>
  );
};

export default AnesthesiologyCalculators;