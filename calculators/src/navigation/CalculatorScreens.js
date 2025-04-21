// src/navigation/CalculatorScreens.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Calculators from '../components/calculators';

const Stack = createStackNavigator();

const calculatorComponents = {
  BMICalculator: Calculators.BMICalculator,
  BMRCalculator: Calculators.BMRCalculator,
  BodyFatPercentageCalculator: Calculators.BodyFatPercentageCalculator,
  CaloricNeedsCalculator: Calculators.CaloricNeedsCalculator,
  EnergyExpenditureCalculator: Calculators.EnergyExpenditureCalculator,
  HarrisBenedictCalculator: Calculators.HarrisBenedictCalculator,
  IdealBodyWeightCalculator: Calculators.IdealBodyWeightCalculator,
  MifflinStJeorCalculator: Calculators.MifflinStJeorCalculator,
  WaistCircumferenceCalculator: Calculators.WaistCircumferenceCalculator,
  AlvaradoScore: Calculators.AlvaradoScore,
  BISAPCalculator: Calculators.BISAPCalculator,
  BarrettsEsophagusRisk: Calculators.BarrettsEsophagusRisk,
  BowelCancerScreening: Calculators.BowelCancerScreening,
  BristolStoolChart: Calculators.BristolStoolChart,
  ChildPughScore: Calculators.ChildPughScore,
  CrohnsDiseaseActivity: Calculators.CrohnsDiseaseActivity,
  FIB4Calculator: Calculators.FIB4Calculator,
  GERDQualityOfLife: Calculators.GERDQualityOfLife,
  GERDSeverityScore: Calculators.GERDSeverityScore,
  GIBleedingRisk: Calculators.GIBleedingRisk,
  APACHE: Calculators.APACHE,
  QSOFAScoreCalculator: Calculators.QSOFAScoreCalculator,
  SOFACalculator: Calculators.SOFACalculator,
  CKDEpiCalculator: Calculators.CKDEpiCalculator,
  ChronicKidneyDiseaseStageCalculator: Calculators.ChronicKidneyDiseaseStageCalculator,
  CreatinineClearanceCalculator: Calculators.CreatinineClearanceCalculator,
  ElectrolyteImbalanceCalculator: Calculators.ElectrolyteImbalanceCalculator,
  GFRCalculator: Calculators.GFRCalculator,
  HypertensiveNephropathyRiskScore: Calculators.HypertensiveNephropathyRiskScore,
  KidneyStoneRiskAssessment: Calculators.KidneyStoneRiskAssessment,
  NephroticSyndromeScore: Calculators.NephroticSyndromeScore,
  UricAcidCalculator: Calculators.UricAcidCalculator,
  UrineProteinToCreatinineRatio: Calculators.UrineProteinToCreatinineRatio,
  ABCD2Score: Calculators.ABCD2Score,
  AHASAScore: Calculators.AHASAScore,
  ApacheII: Calculators.ApacheII,
  CHADSVASc: Calculators.CHADSVASc,
  CheckBox: Calculators.CheckBox,
  DenverII: Calculators.DenverII,
  EDSS: Calculators.EDSS,
  EQ5D: Calculators.EQ5D,
  EpilepsyRisk: Calculators.EpilepsyRisk,
  GAD7: Calculators.GAD7,
  GCS: Calculators.GlasgowComaScale,
  APGARScore: Calculators.APGARScore,
  AmnioticFluidIndex: Calculators.AmnioticFluidIndex,
  BishopScore: Calculators.BishopScore,
  EstimatedDueDate: Calculators.EstimatedDueDate,
  EstimatedFetalWeight: Calculators.EstimatedFetalWeight,
  GDMScreening: Calculators.GDMScreening,
  GestationalAgeCalculator: Calculators.GestationalAgeCalculator,
  HELLPSyndromeRisk: Calculators.HELLPSyndromeRisk,
  PreeclampsiaRisk: Calculators.PreeclampsiaRisk,
  VBACRiskCalculator: Calculators.VBACRiskCalculator,
  ACTCalculator: Calculators.ACTCalculator,
  BODECalculator: Calculators.BODECalculator,
  CATCalculator: Calculators.CATCalculator,
  CURB65: Calculators.CURB65,
  CalculatorForm: Calculators.CalculatorForm,
  FEV1FVCCalculator: Calculators.FEV1FVCCalculator,
  LungAgeCalculator: Calculators.LungAgeCalculator,
  MMRCCalculator: Calculators.MMRCCalculator,
  PEFRCalculator: Calculators.PEFRCalculator,
  PERCCalculator: Calculators.PERCCalculator,
  PSICalculator: Calculators.PSICalculator,
  ConstantMurleyScore: Calculators.ConstantMurleyScore,
  FRAC: Calculators.FRAC,
  HarrisHipScore: Calculators.HarrisHipScore,
  JointReplacementRiskCalculator: Calculators.JointReplacementRiskCalculator,
  OsteoporosisRiskCalculator: Calculators.OsteoporosisRiskCalculator,
  OswestryDisabilityIndex: Calculators.OswestryDisabilityIndex,
  WOMACCalculator: Calculators.WOMACCalculator,
  ASCVD: Calculators.ASCVD,
  CHA2DS2VASc: Calculators.CHA2DS2VASc,
  Framingham: Calculators.Framingham,
  GRACE: Calculators.GRACE,
  HASBLED: Calculators.HASBLED,
  TIMI: Calculators.TIMI,
};

export default function CalculatorScreens() {
  return (
    <>
      {Object.entries(calculatorComponents).map(([name, component]) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </>
  );
}