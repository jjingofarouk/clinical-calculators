import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingSearch from '../FloatingSearch';
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
import MELDScore from './MELDScore';
import ChildPughScore from './ChildPughScore';
import APACHEII from './APACHEII';
import SOFAScore from './SOFAScore';
import QSOFA from './QSOFA';
import SAPSII from './SAPSII';
import StrokeVolumeVariation from './StrokeVolumeVariation';
import PulsePressureVariation from './PulsePressureVariation';
import RSIDrugDosing from './RSIDrugDosing';

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
  { label: 'Model for End-Stage Liver Disease (MELD) Score', component: <MELDScore /> },
  { label: 'Child-Pugh Score', component: <ChildPughScore /> },
  { label: 'Acute Physiology and Chronic Health Evaluation II (APACHE II)', component: <APACHEII /> },
  { label: 'Sequential Organ Failure Assessment (SOFA) Score', component: <SOFAScore /> },
  { label: 'quick Sequential Organ Failure Assessment (qSOFA)', component: <QSOFA /> },
  { label: 'Simplified Acute Physiology Score (SAPS II)', component: <SAPSII /> },
  { label: 'Stroke Volume Variation', component: <StrokeVolumeVariation /> },
  { label: 'Pulse Pressure Variation', component: <PulsePressureVariation /> },
  { label: 'Rapid Sequence Intubation (RSI) Drug Dosing', component: <RSIDrugDosing /> },
];

const AnesthesiologyCalculators = () => {
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
      <div className="sticky top-0 z-10 p-4 bg-background">
        <FloatingSearch
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          placeholder="Search anesthesiology calculators..."
          className="w-full max-w-2xl mx-auto"
        />
      </div>

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

export default AnesthesiologyCalculators;