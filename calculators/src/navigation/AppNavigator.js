import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Main screen
import ClinicalCalculators from "../components/calculators/ClinicalCalculators";
import SearchCalculators from "../components/calculators/SearchCalculators";
import FavoritesCalculators from "../components/calculators/FavoritesCalculators";

// Category screens
import GeneralCalculators from "../components/calculators/general/GeneralCalculators";
import GastroenterologyCalculators from "../components/calculators/git/GastroenterologyCalculators";
import ICUCalculators from "../components/calculators/icu/ICUCalculators";
import NephrologyCalculators from "../components/calculators/nephrology/NephrologyCalculators";
import NeurologyCalculators from "../components/calculators/neurology/NeurologyCalculators";
import ObstetricsCalculators from "../components/calculators/obstetrics/ObstetricsCalculators";
import PulmonaryCalculators from "../components/calculators/pulmonary/PulmonaryCalculators";
import OrthopedicsCalculators from "../components/calculators/ortho/OrthopedicsCalculators";
import CardiovascularCalculators from "../components/calculators/cardiovascular/CardiovascularCalculators";

// General calculators
import BMICalculator from "../components/calculators/general/BMICalculator";
import BMRCalculator from "../components/calculators/general/BMRCalculator";
import BodyFatPercentageCalculator from "../components/calculators/general/BodyFatPercentageCalculator";
import CaloricNeedsCalculator from "../components/calculators/general/CaloricNeedsCalculator";
import EnergyExpenditureCalculator from "../components/calculators/general/EnergyExpenditureCalculator";
import HarrisBenedictCalculator from "../components/calculators/general/HarrisBenedictCalculator";
import IdealBodyWeightCalculator from "../components/calculators/general/IdealBodyWeightCalculator";
import MifflinStJeorCalculator from "../components/calculators/general/MifflinStJeorCalculator";
import WaistCircumferenceCalculator from "../components/calculators/general/WaistCircumferenceCalculator";

// Gastroenterology calculators
import AlvaradoScore from "../components/calculators/git/AlvaradoScore";
import BISAPCalculator from "../components/calculators/git/BISAPCalculator";
import BarrettsEsophagusRisk from "../components/calculators/git/BarrettsEsophagusRisk";
import BowelCancerScreening from "../components/calculators/git/BowelCancerScreening";
import BristolStoolChart from "../components/calculators/git/BristolStoolChart";
import ChildPughScore from "../components/calculators/git/ChildPughScore";
import CrohnsDiseaseActivity from "../components/calculators/git/CrohnsDiseaseActivity";
import FIB4Calculator from "../components/calculators/git/FIB4Calculator";
import GERDQualityOfLife from "../components/calculators/git/GERDQualityOfLife";
import GERDSeverityScore from "../components/calculators/git/GERDSeverityScore";
import GIBleedingRisk from "../components/calculators/git/GIBleedingRisk";

// ICU calculators
import APACHE from "../components/calculators/icu/APACHE";
import QSOFAScoreCalculator from "../components/calculators/icu/QSOFAScoreCalculator";
import SOFACalculator from "../components/calculators/icu/SOFACalculator";

// Nephrology calculators
import CKDEpiCalculator from "../components/calculators/nephrology/CKDEpiCalculator";
import ChronicKidneyDiseaseStageCalculator from "../components/calculators/nephrology/ChronicKidneyDiseaseStageCalculator";
import CreatinineClearanceCalculator from "../components/calculators/nephrology/CreatinineClearanceCalculator";
import ElectrolyteImbalanceCalculator from "../components/calculators/nephrology/ElectrolyteImbalanceCalculator";
import GFRCalculator from "../components/calculators/nephrology/GFRCalculator";
import HypertensiveNephropathyRiskScore from "../components/calculators/nephrology/HypertensiveNephropathyRiskScore";
import KidneyStoneRiskAssessment from "../components/calculators/nephrology/KidneyStoneRiskAssessment";
import NephroticSyndromeScore from "../components/calculators/nephrology/NephroticSyndromeScore";
import UricAcidCalculator from "../components/calculators/nephrology/UricAcidCalculator";
import UrineProteinToCreatinineRatio from "../components/calculators/nephrology/UrineProteinToCreatinineRatio";

// Neurology calculators
import ABCD2Score from "../components/calculators/neurology/ABCD2Score";
import AHASAScore from "../components/calculators/neurology/AHASAScore";
import ApacheII from "../components/calculators/neurology/ApacheII";
import CHADSVASc from "../components/calculators/neurology/CHADSVASc";
import CheckBox from "../components/calculators/neurology/CheckBox";
import DenverII from "../components/calculators/neurology/DenverII";
import EDSS from "../components/calculators/neurology/EDSS";
import EQ5D from "../components/calculators/neurology/EQ5D";
import EpilepsyRisk from "../components/calculators/neurology/EpilepsyRisk";
import GAD7 from "../components/calculators/neurology/GAD7";
import GlasgowComaScale from "../components/calculators/neurology/GCS";

// Obstetrics calculators
import APGARScore from "../components/calculators/obstetrics/APGARScore";
import AmnioticFluidIndex from "../components/calculators/obstetrics/AmnioticFluidIndex";
import BishopScore from "../components/calculators/obstetrics/BishopScore";
import EstimatedDueDate from "../components/calculators/obstetrics/EstimatedDueDate";
import EstimatedFetalWeight from "../components/calculators/obstetrics/EstimatedFetalWeight";
import GDMScreening from "../components/calculators/obstetrics/GDMScreening";
import GestationalAgeCalculator from "../components/calculators/obstetrics/GestationalAgeCalculator";
import HELLPSyndromeRisk from "../components/calculators/obstetrics/HELLPSyndromeRisk";
import PreeclampsiaRisk from "../components/calculators/obstetrics/PreeclampsiaRisk";
import VBACRiskCalculator from "../components/calculators/obstetrics/VBACRiskCalculator";

// Pulmonary calculators
import ACTCalculator from "../components/calculators/pulmonary/ACTCalculator";
import BODECalculator from "../components/calculators/pulmonary/BODECalculator";
import CATCalculator from "../components/calculators/pulmonary/CATCalculator";
import CURB65 from "../components/calculators/pulmonary/CURB65";
import CalculatorForm from "../components/calculators/pulmonary/CalculatorForm";
import FEV1FVCCalculator from "../components/calculators/pulmonary/FEV1FVC_Calculator";
import LungAgeCalculator from "../components/calculators/pulmonary/LungAgeCalculator";
import MMRCCalculator from "../components/calculators/pulmonary/MMRC_Calculator";
import PEFRCalculator from "../components/calculators/pulmonary/PEFRCalculator";
import PERCCalculator from "../components/calculators/pulmonary/PERCCalculator";
import PSICalculator from "../components/calculators/pulmonary/PSICalculator";

// Orthopedics calculators
import ConstantMurleyScore from "../components/calculators/ortho/ConstantMurleyScore";
import FRAC from "../components/calculators/ortho/FRAC";
import HarrisHipScore from "../components/calculators/ortho/HarrisHipScore";
import JointReplacementRiskCalculator from "../components/calculators/ortho/JointReplacementRiskCalculator";
import OsteoporosisRiskCalculator from "../components/calculators/ortho/OsteoporosisRiskCalculator";
import OswestryDisabilityIndex from "../components/calculators/ortho/OswestryDisabilityIndex";
import WOMACCalculator from "../components/calculators/ortho/WOMACCalculator";

// Cardiovascular calculators
import ASCVD from "../components/calculators/cardiovascular/ASCVD";
import CHA2DS2VASc from "../components/calculators/cardiovascular/CHA2DS2VASc";
import Framingham from "../components/calculators/cardiovascular/Framingham";
import GRACE from "../components/calculators/cardiovascular/GRACE";
import HASBLED from "../components/calculators/cardiovascular/HASBLED";
import TIMI from "../components/calculators/cardiovascular/TIMI";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define calculator metadata with categories
const calculatorMetadata = [
  // General
  { screen: "BMICalculator", name: "BMI Calculator", category: "General" },
  { screen: "BMRCalculator", name: "BMR Calculator", category: "General" },
  { screen: "BodyFatPercentageCalculator", name: "Body Fat Percentage", category: "General" },
  { screen: "CaloricNeedsCalculator", name: "Caloric Needs", category: "General" },
  { screen: "EnergyExpenditureCalculator", name: "Energy Expenditure", category: "General" },
  { screen: "HarrisBenedictCalculator", name: "Harris-Benedict", category: "General" },
  { screen: "IdealBodyWeightCalculator", name: "Ideal Body Weight", category: "General" },
  { screen: "MifflinStJeorCalculator", name: "Mifflin-St Jeor", category: "General" },
  { screen: "WaistCircumferenceCalculator", name: "Waist Circumference", category: "General" },
  // Gastroenterology
  { screen: "AlvaradoScore", name: "Alvarado Score", category: "Gastroenterology" },
  { screen: "BISAPCalculator", name: "BISAP Score", category: "Gastroenterology" },
  { screen: "BarrettsEsophagusRisk", name: "Barrett's Esophagus Risk", category: "Gastroenterology" },
  { screen: "BowelCancerScreening", name: "Bowel Cancer Screening", category: "Gastroenterology" },
  { screen: "BristolStoolChart", name: "Bristol Stool Chart", category: "Gastroenterology" },
  { screen: "ChildPughScore", name: "Child-Pugh Score", category: "Gastroenterology" },
  { screen: "CrohnsDiseaseActivity", name: "Crohn's Disease Activity", category: "Gastroenterology" },
  { screen: "FIB4Calculator", name: "FIB-4 Score", category: "Gastroenterology" },
  { screen: "GERDQualityOfLife", name: "GERD Quality of Life", category: "Gastroenterology" },
  { screen: "GERDSeverityScore", name: "GERD Severity Score", category: "Gastroenterology" },
  { screen: "GIBleedingRisk", name: "GI Bleeding Risk", category: "Gastroenterology" },
  // ICU
  { screen: "APACHE", name: "APACHE Score", category: "ICU" },
  { screen: "QSOFAScoreCalculator", name: "qSOFA Score", category: "ICU" },
  { screen: "SOFACalculator", name: "SOFA Score", category: "ICU" },
  // Nephrology
  { screen: "CKDEpiCalculator", name: "CKD-EPI Calculator", category: "Nephrology" },
  { screen: "ChronicKidneyDiseaseStageCalculator", name: "CKD Stage", category: "Nephrology" },
  { screen: "CreatinineClearanceCalculator", name: "Creatinine Clearance", category: "Nephrology" },
  { screen: "ElectrolyteImbalanceCalculator", name: "Electrolyte Imbalance", category: "Nephrology" },
  { screen: "GFRCalculator", name: "GFR Calculator", category: "Nephrology" },
  { screen: "HypertensiveNephropathyRiskScore", name: "Hypertensive Nephropathy Risk", category: "Nephrology" },
  { screen: "KidneyStoneRiskAssessment", name: "Kidney Stone Risk", category: "Nephrology" },
  { screen: "NephroticSyndromeScore", name: "Nephrotic Syndrome Score", category: "Nephrology" },
  { screen: "UricAcidCalculator", name: "Uric Acid Calculator", category: "Nephrology" },
  { screen: "UrineProteinToCreatinineRatio", name: "Urine Protein to Creatinine Ratio", category: "Nephrology" },
  // Neurology
  { screen: "ABCD2Score", name: "ABCD2 Score", category: "Neurology" },
  { screen: "AHASAScore", name: "AHASA Score", category: "Neurology" },
  { screen: "ApacheII", name: "Apache II Score", category: "Neurology" },
  { screen: "CHADSVASc", name: "CHA2DS2-VASc Score", category: "Neurology" },
  { screen: "CheckBox", name: "CheckBox", category: "Neurology" },
  { screen: "DenverII", name: "Denver II", category: "Neurology" },
  { screen: "EDSS", name: "EDSS Score", category: "Neurology" },
  { screen: "EQ5D", name: "EQ-5D Score", category: "Neurology" },
  { screen: "EpilepsyRisk", name: "Epilepsy Risk", category: "Neurology" },
  { screen: "GAD7", name: "GAD-7 Score", category: "Neurology" },
  { screen: "GCS", name: "Glasgow Coma Scale", category: "Neurology" },
  // Obstetrics
  { screen: "APGARScore", name: "APGAR Score", category: "Obstetrics" },
  { screen: "AmnioticFluidIndex", name: "Amniotic Fluid Index", category: "Obstetrics" },
  { screen: "BishopScore", name: "Bishop Score", category: "Obstetrics" },
  { screen: "EstimatedDueDate", name: "Estimated Due Date", category: "Obstetrics" },
  { screen: "EstimatedFetalWeight", name: "Estimated Fetal Weight", category: "Obstetrics" },
  { screen: "GDMScreening", name: "GDM Screening", category: "Obstetrics" },
  { screen: "GestationalAgeCalculator", name: "Gestational Age", category: "Obstetrics" },
  { screen: "HELLPSyndromeRisk", name: "HELLP Syndrome Risk", category: "Obstetrics" },
  { screen: "PreeclampsiaRisk", name: "Preeclampsia Risk", category: "Obstetrics" },
  { screen: "VBACRiskCalculator", name: "VBAC Risk Calculator", category: "Obstetrics" },
  // Pulmonary
  { screen: "ACTCalculator", name: "ACT Calculator", category: "Pulmonary" },
  { screen: "BODECalculator", name: "BODE Index", category: "Pulmonary" },
  { screen: "CATCalculator", name: "CAT Calculator", category: "Pulmonary" },
  { screen: "CURB65", name: "CURB-65 Score", category: "Pulmonary" },
  { screen: "CalculatorForm", name: "Calculator Form", category: "Pulmonary" },
  { screen: "FEV1FVCCalculator", name: "FEV1/FVC Calculator", category: "Pulmonary" },
  { screen: "LungAgeCalculator", name: "Lung Age Calculator", category: "Pulmonary" },
  { screen: "MMRCCalculator", name: "mMRC Calculator", category: "Pulmonary" },
  { screen: "PEFRCalculator", name: "PEFR Calculator", category: "Pulmonary" },
  { screen: "PERCCalculator", name: "PERC Calculator", category: "Pulmonary" },
  { screen: "PSICalculator", name: "PSI Calculator", category: "Pulmonary" },
  // Orthopedics
  { screen: "ConstantMurleyScore", name: "Constant-Murley Score", category: "Orthopedics" },
  { screen: "FRAC", name: "FRAC Score", category: "Orthopedics" },
  { screen: "HarrisHipScore", name: "Harris Hip Score", category: "Orthopedics" },
  { screen: "JointReplacementRiskCalculator", name: "Joint Replacement Risk", category: "Orthopedics" },
  { screen: "OsteoporosisRiskCalculator", name: "Osteoporosis Risk", category: "Orthopedics" },
  { screen: "OswestryDisabilityIndex", name: "Oswestry Disability Index", category: "Orthopedics" },
  { screen: "WOMACCalculator", name: "WOMAC Calculator", category: "Orthopedics" },
  // Cardiovascular
  { screen: "ASCVD", name: "ASCVD Risk", category: "Cardiovascular" },
  { screen: "CHA2DS2VASc", name: "CHA2DS2-VASc Score", category: "Cardiovascular" },
  { screen: "Framingham", name: "Framingham Risk", category: "Cardiovascular" },
  { screen: "GRACE", name: "GRACE Score", category: "Cardiovascular" },
  { screen: "HASBLED", name: "HAS-BLED Score", category: "Cardiovascular" },
  { screen: "TIMI", name: "TIMI Score", category: "Cardiovascular" },
];

// Tab Navigator for Calculator Categories
function CalculatorsTabNavigator({ route }) {
  const { allCalculators } = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "General":
              iconName = "body";
              break;
            case "Gastroenterology":
              iconName = "nutrition";
              break;
            case "ICU":
              iconName = "medkit";
              break;
            case "Nephrology":
              iconName = "water";
              break;
            case "Neurology":
              iconName = "brain";
              break;
            case "Obstetrics":
              iconName = "woman";
              break;
            case "Pulmonary":
              iconName = "lungs";
              break;
            case "Orthopedics":
              iconName = "fitness";
              break;
            case "Cardiovascular":
              iconName = "heart";
              break;
            default:
              iconName = "help";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarScrollEnabled: true,
      })}
    >
      <Tab.Screen
        name="General"
        component={GeneralCalculators}
        initialParams={{ allCalculators }}
        options={{ title: "General" }}
      />
      <Tab.Screen
        name="Gastroenterology"
        component={GastroenterologyCalculators}
        initialParams={{ allCalculators }}
        options={{ title: "Gastroenterology" }}
      />
      <Tab.Screen
        name="ICU"
        component={ICUCalculators}
        initialParams={{ allCalculators }}
        options={{ title: "ICU" }}
      />
      <Tab.Screen
        name="Nephrology"
        component={NephrologyCalculators}
        initialParams={{ allCalculators }}
        options={{ title: "Nephrology" }}
      />
      <Tab.Screen
        name="Neurology"
        component={NeurologyCalculators}
        initialParams={{ allCalculators }}
        options={{ title: "Neurology" }}
      />
      <Tab.Screen
        name="Obstetrics"
        component={ObstetricsCalculators}
        initialParams={{ allCalculators }}
        options={{ title: "Obstetrics" }}
      />
      <Tab.Screen
        name="Pulmonary"
        component={PulmonaryCalculators}
        initialParams={{ allCalculators }}
        options={{ title: "Pulmonary" }}
      />
      <Tab.Screen
        name="Orthopedics"
        component={OrthopedicsCalculators}
        initialParams={{ allCalculators }}
        options={{ title: "Orthopedics" }}
      />
      <Tab.Screen
        name="Cardiovascular"
        component={CardiovascularCalculators}
        initialParams={{ allCalculators }}
        options={{ title: "Cardiovascular" }}
      />
    </Tab.Navigator>
  );
}

// Main Stack Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ClinicalCalculators"
        screenOptions={{ headerShown: false }} // Disable default header
      >
        {/* Main Screen */}
        <Stack.Screen
          name="ClinicalCalculators"
          component={ClinicalCalculators}
          initialParams={{ allCalculators: calculatorMetadata }}
        />
        <Stack.Screen
          name="SearchCalculators"
          component={SearchCalculators}
          initialParams={{ allCalculators: calculatorMetadata }}
        />
        <Stack.Screen
          name="FavoritesCalculators"
          component={FavoritesCalculators}
          initialParams={{ allCalculators: calculatorMetadata }}
        />
        {/* Tab Navigator for Categories */}
        <Stack.Screen
          name="Calculators"
          component={CalculatorsTabNavigator}
          initialParams={{ allCalculators: calculatorMetadata }}
        />
        {/* General Calculators */}
        <Stack.Screen name="BMICalculator" component={BMICalculator} />
        <Stack.Screen name="BMRCalculator" component={BMRCalculator} />
        <Stack.Screen name="BodyFatPercentageCalculator" component={BodyFatPercentageCalculator} />
        <Stack.Screen name="CaloricNeedsCalculator" component={CaloricNeedsCalculator} />
        <Stack.Screen name="EnergyExpenditureCalculator" component={EnergyExpenditureCalculator} />
        <Stack.Screen name="HarrisBenedictCalculator" component={HarrisBenedictCalculator} />
        <Stack.Screen name="IdealBodyWeightCalculator" component={IdealBodyWeightCalculator} />
        <Stack.Screen name="MifflinStJeorCalculator" component={MifflinStJeorCalculator} />
        <Stack.Screen name="WaistCircumferenceCalculator" component={WaistCircumferenceCalculator} />
        {/* Gastroenterology Calculators */}
        <Stack.Screen name="AlvaradoScore" component={AlvaradoScore} />
        <Stack.Screen name="BISAPCalculator" component={BISAPCalculator} />
        <Stack.Screen name="BarrettsEsophagusRisk" component={BarrettsEsophagusRisk} />
        <Stack.Screen name="BowelCancerScreening" component={BowelCancerScreening} />
        <Stack.Screen name="BristolStoolChart" component={BristolStoolChart} />
        <Stack.Screen name="ChildPughScore" component={ChildPughScore} />
        <Stack.Screen name="CrohnsDiseaseActivity" component={CrohnsDiseaseActivity} />
        <Stack.Screen name="FIB4Calculator" component={FIB4Calculator} />
        <Stack.Screen name="GERDQualityOfLife" component={GERDQualityOfLife} />
        <Stack.Screen name="GERDSeverityScore" component={GERDSeverityScore} />
        <Stack.Screen name="GIBleedingRisk" component={GIBleedingRisk} />
        {/* ICU Calculators */}
        <Stack.Screen name="APACHE" component={APACHE} />
        <Stack.Screen name="QSOFAScoreCalculator" component={QSOFAScoreCalculator} />
        <Stack.Screen name="SOFACalculator" component={SOFACalculator} />
        {/* Nephrology Calculators */}
        <Stack.Screen name="CKDEpiCalculator" component={CKDEpiCalculator} />
        <Stack.Screen name="ChronicKidneyDiseaseStageCalculator" component={ChronicKidneyDiseaseStageCalculator} />
        <Stack.Screen name="CreatinineClearanceCalculator" component={CreatinineClearanceCalculator} />
        <Stack.Screen name="ElectrolyteImbalanceCalculator" component={ElectrolyteImbalanceCalculator} />
        <Stack.Screen name="GFRCalculator" component={GFRCalculator} />
        <Stack.Screen name="HypertensiveNephropathyRiskScore" component={HypertensiveNephropathyRiskScore} />
        <Stack.Screen name="KidneyStoneRiskAssessment" component={KidneyStoneRiskAssessment} />
        <Stack.Screen name="NephroticSyndromeScore" component={NephroticSyndromeScore} />
        <Stack.Screen name="UricAcidCalculator" component={UricAcidCalculator} />
        <Stack.Screen name="UrineProteinToCreatinineRatio" component={UrineProteinToCreatinineRatio} />
        {/* Neurology Calculators */}
        <Stack.Screen name="ABCD2Score" component={ABCD2Score} />
        <Stack.Screen name="AHASAScore" component={AHASAScore} />
        <Stack.Screen name="ApacheII" component={ApacheII} />
        <Stack.Screen name="CHADSVASc" component={CHADSVASc} />
        <Stack.Screen name="CheckBox" component={CheckBox} />
        <Stack.Screen name="DenverII" component={DenverII} />
        <Stack.Screen name="EDSS" component={EDSS} />
        <Stack.Screen name="EQ5D" component={EQ5D} />
        <Stack.Screen name="EpilepsyRisk" component={EpilepsyRisk} />
        <Stack.Screen name="GAD7" component={GAD7} />
        <Stack.Screen name="GCS" component={GlasgowComaScale} />
        {/* Obstetrics Calculators */}
        <Stack.Screen name="APGARScore" component={APGARScore} />
        <Stack.Screen name="AmnioticFluidIndex" component={AmnioticFluidIndex} />
        <Stack.Screen name="BishopScore" component={BishopScore} />
        <Stack.Screen name="EstimatedDueDate" component={EstimatedDueDate} />
        <Stack.Screen name="EstimatedFetalWeight" component={EstimatedFetalWeight} />
        <Stack.Screen name="GDMScreening" component={GDMScreening} />
        <Stack.Screen name="GestationalAgeCalculator" component={GestationalAgeCalculator} />
        <Stack.Screen name="HELLPSyndromeRisk" component={HELLPSyndromeRisk} />
        <Stack.Screen name="PreeclampsiaRisk" component={PreeclampsiaRisk} />
        <Stack.Screen name="VBACRiskCalculator" component={VBACRiskCalculator} />
        {/* Pulmonary Calculators */}
        <Stack.Screen name="ACTCalculator" component={ACTCalculator} />
        <Stack.Screen name="BODECalculator" component={BODECalculator} />
        <Stack.Screen name="CATCalculator" component={CATCalculator} />
        <Stack.Screen name="CURB65" component={CURB65} />
        <Stack.Screen name="CalculatorForm" component={CalculatorForm} />
        <Stack.Screen name="FEV1FVCCalculator" component={FEV1FVCCalculator} />
        <Stack.Screen name="LungAgeCalculator" component={LungAgeCalculator} />
        <Stack.Screen name="MMRCCalculator" component={MMRCCalculator} />
        <Stack.Screen name="PEFRCalculator" component={PEFRCalculator} />
        <Stack.Screen name="PERCCalculator" component={PERCCalculator} />
        <Stack.Screen name="PSICalculator" component={PSICalculator} />
        {/* Orthopedics Calculators */}
        <Stack.Screen name="ConstantMurleyScore" component={ConstantMurleyScore} />
        <Stack.Screen name="FRAC" component={FRAC} />
        <Stack.Screen name="HarrisHipScore" component={HarrisHipScore} />
        <Stack.Screen name="JointReplacementRiskCalculator" component={JointReplacementRiskCalculator} />
        <Stack.Screen name="OsteoporosisRiskCalculator" component={OsteoporosisRiskCalculator} />
        <Stack.Screen name="OswestryDisabilityIndex" component={OswestryDisabilityIndex} />
        <Stack.Screen name="WOMACCalculator" component={WOMACCalculator} />
        {/* Cardiovascular Calculators */}
        <Stack.Screen name="ASCVD" component={ASCVD} />
        <Stack.Screen name="CHA2DS2VASc" component={CHA2DS2VASc} />
        <Stack.Screen name="Framingham" component={Framingham} />
        <Stack.Screen name="GRACE" component={GRACE} />
        <Stack.Screen name="HASBLED" component={HASBLED} />
        <Stack.Screen name="TIMI" component={TIMI} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}