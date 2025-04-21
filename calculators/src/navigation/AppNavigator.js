import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabsNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Main screen
import ClinicalCalculators from '../components/calculators/ClinicalCalculators';

// Category screens
import GeneralCalculators from '../components/calculators/general/GeneralCalculators';
import GastroenterologyCalculators from '../components/calculators/git/GastroenterologyCalculators';
import ICUCalculators from '../components/calculators/icu/ICUCalculators';
import NephrologyCalculators from '../components/calculators/nephrology/NephrologyCalculators';
import NeurologyCalculators from '../components/calculators/neurology/NeurologyCalculators';
import ObstetricsCalculators from '../components/calculators/obstetrics/ObstetricsCalculators';
import PulmonaryCalculators from '../components/calculators/pulmonary/PulmonaryCalculators';
import OrthopedicsCalculators from '../components/calculators/ortho/OrthopedicsCalculators';

// General calculators
import BMICalculator from '../components/calculators/general/BMICalculator';
import BMRCalculator from '../components/calculators/general/BMRCalculator';
import BodyFatPercentageCalculator from '../components/calculators/general/BodyFatPercentageCalculator';
import CaloricNeedsCalculator from '../components/calculators/general/CaloricNeedsCalculator';
import EnergyExpenditureCalculator from '../components/calculators/general/EnergyExpenditureCalculator';
import HarrisBenedictCalculator from '../components/calculators/general/HarrisBenedictCalculator';
import IdealBodyWeightCalculator from '../components/calculators/general/IdealBodyWeightCalculator';
import MifflinStJeorCalculator from '../components/calculators/general/MifflinStJeorCalculator';
import WaistCircumferenceCalculator from '../components/calculators/general/WaistCircumferenceCalculator';

// Gastroenterology calculators
import AlvaradoScore from '../components/calculators/git/AlvaradoScore';
import BISAPCalculator from '../components/calculators/git/BISAPCalculator';
import BarrettsEsophagusRisk from '../components/calculators/git/BarrettsEsophagusRisk';
import BowelCancerScreening from '../components/calculators/git/BowelCancerScreening';
import BristolStoolChart from '../components/calculators/git/BristolStoolChart';
import ChildPughScore from '../components/calculators/git/ChildPughScore';
import CrohnsDiseaseActivity from '../components/calculators/git/CrohnsDiseaseActivity';
import FIB4Calculator from '../components/calculators/git/FIB4Calculator';
import GERDQualityOfLife from '../components/calculators/git/GERDQualityOfLife';
import GERDSeverityScore from '../components/calculators/git/GERDSeverityScore';
import GIBleedingRisk from '../components/calculators/git/GIBleedingRisk';

// ICU calculators
import APACHE from '../components/calculators/icu/APACHE';
import QSOFAScoreCalculator from '../components/calculators/icu/QSOFAScoreCalculator';
import SOFACalculator from '../components/calculators/icu/SOFACalculator';

// Nephrology calculators
import CKDEpiCalculator from '../components/calculators/nephrology/CKDEpiCalculator';
import ChronicKidneyDiseaseStageCalculator from '../components/calculators/nephrology/ChronicKidneyDiseaseStageCalculator';
import CreatinineClearanceCalculator from '../components/calculators/nephrology/CreatinineClearanceCalculator';
import ElectrolyteImbalanceCalculator from '../components/calculators/nephrology/ElectrolyteImbalanceCalculator';
import GFRCalculator from '../components/calculators/nephrology/GFRCalculator';
import HypertensiveNephropathyRiskScore from '../components/calculators/nephrology/HypertensiveNephropathyRiskScore';
import KidneyStoneRiskAssessment from '../components/calculators/nephrology/KidneyStoneRiskAssessment';
import NephroticSyndromeScore from '../components/calculators/nephrology/NephroticSyndromeScore';
import UricAcidCalculator from '../components/calculators/nephrology/UricAcidCalculator';
import UrineProteinToCreatinineRatio from '../components/calculators/nephrology/UrineProteinToCreatinineRatio';

// Neurology calculators
import ABCD2Score from '../components/calculators/neurology/ABCD2Score';
import AHASAScore from '../components/calculators/neurology/AHASAScore';
import ApacheII from '../components/calculators/neurology/ApacheII';
import CHADSVASc from '../components/calculators/neurology/CHADSVASc';
import CheckBox from '../components/calculators/neurology/CheckBox';
import CheckboxCopy from '../components/calculators/neurology/CheckboxCopy';
import DenverII from '../components/calculators/neurology/DenverII';
import EDSS from '../components/calculators/neurology/EDSS';
import EQ5D from '../components/calculators/neurology/EQ5D';
import EpilepsyRisk from '../components/calculators/neurology/EpilepsyRisk';
import GAD7 from '../components/calculators/neurology/GAD7';
import GCS from '../components/calculators/neurology/GCS';

// Obstetrics calculators
import APGARScore from '../components/calculators/obstetrics/APGARScore';
import AmnioticFluidIndex from '../components/calculators/obstetrics/AmnioticFluidIndex';
import BishopScore from '../components/calculators/obstetrics/BishopScore';
import EstimatedDueDate from '../components/calculators/obstetrics/EstimatedDueDate';
import EstimatedFetalWeight from '../components/calculators/obstetrics/EstimatedFetalWeight';
import GDMScreening from '../components/calculators/obstetrics/GDMScreening';
import GestationalAgeCalculator from '../components/calculators/obstetrics/GestationalAgeCalculator';
import HELLPSyndromeRisk from '../components/calculators/obstetrics/HELLPSyndromeRisk';
import PreeclampsiaRisk from '../components/calculators/obstetrics/PreeclampsiaRisk';
import VBACRiskCalculator from '../components/calculators/obstetrics/VBACRiskCalculator';

// Pulmonary calculators
import ACTCalculator from '../components/calculators/pulmonary/ACTCalculator';
import BODECalculator from '../components/calculators/pulmonary/BODECalculator';
import CATCalculator from '../components/calculators/pulmonary/CATCalculator';
import CURB65 from '../components/calculators/pulmonary/CURB65';
import CalculatorForm from '../components/calculators/pulmonary/CalculatorForm';
import FEV1FVCCalculator from '../components/calculators/pulmonary/FEV1FVC_Calculator';
import LungAgeCalculator from '../components/calculators/pulmonary/LungAgeCalculator';
import MMRCCalculator from '../components/calculators/pulmonary/MMRC_Calculator';
import PEFRCalculator from '../components/calculators/pulmonary/PEFRCalculator';
import PERCCalculator from '../components/calculators/pulmonary/PERCCalculator';
import PSICalculator from '../components/calculators/pulmonary/PSICalculator';

// Orthopedics calculators
import ConstantMurleyScore from '../components/calculators/ortho/ConstantMurleyScore';
import FRAC from '../components/calculators/ortho/FRAC';
import HarrisHipScore from '../components/calculators/ortho/HarrisHipScore';
import JointReplacementRiskCalculator from '../components/calculators/ortho/JointReplacementRiskCalculator';
import OsteoporosisRiskCalculator from '../components/calculators/ortho/OsteoporosisRiskCalculator';
import OswestryDisabilityIndex from '../components/calculators/ortho/OswestryDisabilityIndex';
import WOMACCalculator from '../components/calculators/ortho/WOMACCalculator';

const Stack = createStackNavigator();
const Tab = createBottomTabsNavigator();

// Tab Navigator for Calculator Categories
function CalculatorsTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'General':
              iconName = 'body';
              break;
            case 'Gastroenterology':
              iconName = 'nutrition';
              break;
            case 'ICU':
              iconName = 'medkit';
              break;
            case 'Nephrology':
              iconName = 'water';
              break;
            case 'Neurology':
              iconName = 'brain';
              break;
            case 'Obstetrics':
              iconName = 'woman';
              break;
            case 'Pulmonary':
              iconName = 'lungs';
              break;
            case 'Orthopedics':
              iconName = 'fitness';
              break;
            default:
              iconName = 'help';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarScrollEnabled: true, // Enable scrolling for many tabs
      })}
    >
      <Tab.Screen name="General" component={GeneralCalculators} options={{ title: 'General' }} />
      <Tab.Screen name="Gastroenterology" component={GastroenterologyCalculators} options={{ title: 'Gastroenterology' }} />
      <Tab.Screen name="ICU" component={ICUCalculators} options={{ title: 'ICU' }} />
      <Tab.Screen name="Nephrology" component={NephrologyCalculators} options={{ title: 'Nephrology' }} />
      <Tab.Screen name="Neurology" component={NeurologyCalculators} options={{ title: 'Neurology' }} />
      <Tab.Screen name="Obstetrics" component={ObstetricsCalculators} options={{ title: 'Obstetrics' }} />
      <Tab.Screen name="Pulmonary" component={PulmonaryCalculators} options={{ title: 'Pulmonary' }} />
      <Tab.Screen name="Orthopedics" component={OrthopedicsCalculators} options={{ title: 'Orthopedics' }} />
    </Tab.Navigator>
  );
}

// Main Stack Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ClinicalCalculators">
        {/* Main Screen */}
        <Stack.Screen name="ClinicalCalculators" component={ClinicalCalculators} options={{ title: 'Clinical Calculators' }} />
        {/* Tab Navigator for Categories */}
        <Stack.Screen name="Calculators" component={CalculatorsTabNavigator} options={{ title: 'Calculators', headerShown: false }} />
        {/* General Calculators */}
        <Stack.Screen name="BMICalculator" component={BMICalculator} options={{ title: 'BMI Calculator' }} />
        <Stack.Screen name="BMRCalculator" component={BMRCalculator} options={{ title: 'BMR Calculator' }} />
        <Stack.Screen name="BodyFatPercentageCalculator" component={BodyFatPercentageCalculator} options={{ title: 'Body Fat Percentage' }} />
        <Stack.Screen name="CaloricNeedsCalculator" component={CaloricNeedsCalculator} options={{ title: 'Caloric Needs' }} />
        <Stack.Screen name="EnergyExpenditureCalculator" component={EnergyExpenditureCalculator} options={{ title: 'Energy Expenditure' }} />
        <Stack.Screen name="HarrisBenedictCalculator" component={HarrisBenedictCalculator} options={{ title: 'Harris-Benedict' }} />
        <Stack.Screen name="IdealBodyWeightCalculator" component={IdealBodyWeightCalculator} options={{ title: 'Ideal Body Weight' }} />
        <Stack.Screen name="MifflinStJeorCalculator" component={MifflinStJeorCalculator} options={{ title: 'Mifflin-St Jeor' }} />
        <Stack.Screen name="WaistCircumferenceCalculator" component={WaistCircumferenceCalculator} options={{ title: 'Waist Circumference' }} />
        {/* Gastroenterology Calculators */}
        <Stack.Screen name="AlvaradoScore" component={AlvaradoScore} options={{ title: 'Alvarado Score' }} />
        <Stack.Screen name="BISAPCalculator" component={BISAPCalculator} options={{ title: 'BISAP Score' }} />
        <Stack.Screen name="BarrettsEsophagusRisk" component={BarrettsEsophagusRisk} options={{ title: "Barrett's Esophagus Risk" }} />
        <Stack.Screen name="BowelCancerScreening" component={BowelCancerScreening} options={{ title: 'Bowel Cancer Screening' }} />
        <Stack.Screen name="BristolStoolChart" component={BristolStoolChart} options={{ title: 'Bristol Stool Chart' }} />
        <Stack.Screen name="ChildPughScore" component={ChildPughScore} options={{ title: 'Child-Pugh Score' }} />
        <Stack.Screen name="CrohnsDiseaseActivity" component={CrohnsDiseaseActivity} options={{ title: "Crohn's Disease Activity" }} />
        <Stack.Screen name="FIB4Calculator" component={FIB4Calculator} options={{ title: 'FIB-4 Score' }} />
        <Stack.Screen name="GERDQualityOfLife" component={GERDQualityOfLife} options={{ title: 'GERD Quality of Life' }} />
        <Stack.Screen name="GERDSeverityScore" component={GERDSeverityScore} options={{ title: 'GERD Severity Score' }} />
        <Stack.Screen name="GIBleedingRisk" component={GIBleedingRisk} options={{ title: 'GI Bleeding Risk' }} />
        {/* ICU Calculators */}
        <Stack.Screen name="APACHE" component={APACHE} options={{ title: 'APACHE Score' }} />
        <Stack.Screen name="QSOFAScoreCalculator" component={QSOFAScoreCalculator} options={{ title: 'qSOFA Score' }} />
        <Stack.Screen name="SOFACalculator" component={SOFACalculator} options={{ title: 'SOFA Score' }} />
        {/* Nephrology Calculators */}
        <Stack.Screen name="CKDEpiCalculator" component={CKDEpiCalculator} options={{ title: 'CKD-EPI Calculator' }} />
        <Stack.Screen name="ChronicKidneyDiseaseStageCalculator" component={ChronicKidneyDiseaseStageCalculator} options={{ title: 'CKD Stage' }} />
        <Stack.Screen name="CreatinineClearanceCalculator" component={CreatinineClearanceCalculator} options={{ title: 'Creatinine Clearance' }} />
        <Stack.Screen name="ElectrolyteImbalanceCalculator" component={ElectrolyteImbalanceCalculator} options={{ title: 'Electrolyte Imbalance' }} />
        <Stack.Screen name="GFRCalculator" component={GFRCalculator} options={{ title: 'GFR Calculator' }} />
        <Stack.Screen name="HypertensiveNephropathyRiskScore" component={HypertensiveNephropathyRiskScore} options={{ title: 'Hypertensive Nephropathy Risk' }} />
        <Stack.Screen name="KidneyStoneRiskAssessment" component={KidneyStoneRiskAssessment} options={{ title: 'Kidney Stone Risk' }} />
        <Stack.Screen name="NephroticSyndromeScore" component={NephroticSyndromeScore} options={{ title: 'Nephrotic Syndrome Score' }} />
        <Stack.Screen name="UricAcidCalculator" component={UricAcidCalculator} options={{ title: 'Uric Acid Calculator' }} />
        <Stack.Screen name="UrineProteinToCreatinineRatio" component={UrineProteinToCreatinineRatio} options={{ title: 'Urine Protein to Creatinine Ratio' }} />
        {/* Neurology Calculators */}
        <Stack.Screen name="ABCD2Score" component={ABCD2Score} options={{ title: 'ABCD2 Score' }} />
        <Stack.Screen name="AHASAScore" component={AHASAScore} options={{ title: 'AHASA Score' }} />
        <Stack.Screen name="ApacheII" component={ApacheII} options={{ title: 'Apache II Score' }} />
        <Stack.Screen name="CHADSVASc" component={CHADSVASc} options={{ title: 'CHA2DS2-VASc Score' }} />
        <Stack.Screen name="CheckBox" component={CheckBox} options={{ title: 'CheckBox' }} />
        <Stack.Screen name="CheckboxCopy" component={CheckboxCopy} options={{ title: 'Checkbox Copy' }} />
        <Stack.Screen name="DenverII" component={DenverII} options={{ title: 'Denver II' }} />
        <Stack.Screen name="EDSS" component={EDSS} options={{ title: 'EDSS Score' }} />
        <Stack.Screen name="EQ5D" component={EQ5D} options={{ title: 'EQ-5D Score' }} />
        <Stack.Screen name="EpilepsyRisk" component={EpilepsyRisk} options={{ title: 'Epilepsy Risk' }} />
        <Stack.Screen name="GAD7" component={GAD7} options={{ title: 'GAD-7 Score' }} />
        <Stack.Screen name="GCS" component={GCS} options={{ title: 'Glasgow Coma Scale' }} />
        {/* Obstetrics Calculators */}
        <Stack.Screen name="APGARScore" component={APGARScore} options={{ title: 'APGAR Score' }} />
        <Stack.Screen name="AmnioticFluidIndex" component={AmnioticFluidIndex} options={{ title: 'Amniotic Fluid Index' }} />
        <Stack.Screen name="BishopScore" component={BishopScore} options={{ title: 'Bishop Score' }} />
        <Stack.Screen name="EstimatedDueDate" component={EstimatedDueDate} options={{ title: 'Estimated Due Date' }} />
        <Stack.Screen name="EstimatedFetalWeight" component={EstimatedFetalWeight} options={{ title: 'Estimated Fetal Weight' }} />
        <Stack.Screen name="GDMScreening" component={GDMScreening} options={{ title: 'GDM Screening' }} />
        <Stack.Screen name="GestationalAgeCalculator" component={GestationalAgeCalculator} options={{ title: 'Gestational Age' }} />
        <Stack.Screen name="HELLPSyndromeRisk" component={HELLPSyndromeRisk} options={{ title: 'HELLP Syndrome Risk' }} />
        <Stack.Screen name="PreeclampsiaRisk" component={PreeclampsiaRisk} options={{ title: 'Preeclampsia Risk' }} />
        <Stack.Screen name="VBACRiskCalculator" component={VBACRiskCalculator} options={{ title: 'VBAC Risk Calculator' }} />
        {/* Pulmonary Calculators */}
        <Stack.Screen name="ACTCalculator" component={ACTCalculator} options={{ title: 'ACT Calculator' }} />
        <Stack.Screen name="BODECalculator" component={BODECalculator} options={{ title: 'BODE Index' }} />
        <Stack.Screen name="CATCalculator" component={CATCalculator} options={{ title: 'CAT Calculator' }} />
        <Stack.Screen name="CURB65" component={CURB65} options={{ title: 'CURB-65 Score' }} />
        <Stack.Screen name="CalculatorForm" component={CalculatorForm} options={{ title: 'Calculator Form' }} />
        <Stack.Screen name="FEV1FVCCalculator" component={FEV1FVCCalculator} options={{ title: 'FEV1/FVC Calculator' }} />
        <Stack.Screen name="LungAgeCalculator" component={LungAgeCalculator} options={{ title: 'Lung Age Calculator' }} />
        <Stack.Screen name="MMRCCalculator" component={MMRCCalculator} options={{ title: 'mMRC Calculator' }} />
        <Stack.Screen name="PEFRCalculator" component={PEFRCalculator} options={{ title: 'PEFR Calculator' }} />
        <Stack.Screen name="PERCCalculator" component={PERCCalculator} options={{ title: 'PERC Calculator' }} />
        <Stack.Screen name="PSICalculator" component={PSICalculator} options={{ title: 'PSI Calculator' }} />
        {/* Orthopedics Calculators */}
        <Stack.Screen name="ConstantMurleyScore" component={ConstantMurleyScore} options={{ title: 'Constant-Murley Score' }} />
        <Stack.Screen name="FRAC" component={FRAC} options={{ title: 'FRAC Score' }} />
        <Stack.Screen name="HarrisHipScore" component={HarrisHipScore} options={{ title: 'Harris Hip Score' }} />
        <Stack.Screen name="JointReplacementRiskCalculator" component={JointReplacementRiskCalculator} options={{ title: 'Joint Replacement Risk' }} />
        <Stack.Screen name="OsteoporosisRiskCalculator" component={OsteoporosisRiskCalculator} options={{ title: 'Osteoporosis Risk' }} />
        <Stack.Screen name="OswestryDisabilityIndex" component={OswestryDisabilityIndex} options={{ title: 'Oswestry Disability Index' }} />
        <Stack.Screen name="WOMACCalculator" component={WOMACCalculator} options={{ title: 'WOMAC Calculator' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}