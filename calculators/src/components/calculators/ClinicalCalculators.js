import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Calculator categories with metadata
const calculatorCategories = [
  {
    id: "general",
    label: "General",
    icon: "calculator",
    color: "#2ECC71",
    description: "BMI, BMR, caloric needs",
    screen: "GeneralCalculators",
  },
  {
    id: "cardiovascular",
    label: "Cardiovascular",
    icon: "heart-pulse",
    color: "#FF4757",
    description: "ASCVD, CHADSVASC, HASBLED",
    screen: "CardiovascularCalculators",
  },
  {
    id: "neurology",
    label: "Neurology",
    icon: "brain",
    color: "#5352ED",
    description: "GCS, NIHSS, mRS",
    screen: "NeurologyCalculators",
  },
  {
    id: "pulmonary",
    label: "Pulmonary",
    icon: "lungs",
    color: "#1E90FF",
    description: "BODE, CURB-65, asthma",
    screen: "PulmonaryCalculators",
  },
  {
    id: "gastrointestinal",
    label: "Gastroenterology",
    icon: "stomach",
    color: "#FF6B6B",
    description: "Alvarado, Child-Pugh, FIB-4",
    screen: "GastroenterologyCalculators",
  },
  {
    id: "obstetrics",
    label: "Obstetrics",
    icon: "baby-face-outline",
    color: "#FF9FF3",
    description: "Due date, Bishop, Apgar",
    screen: "ObstetricsCalculators",
  },
  {
    id: "orthopedics",
    label: "Orthopedics",
    icon: "bone",
    color: "#FFA502",
    description: "Fracture risk, Ottawa rules",
    screen: "OrthopedicsCalculators",
  },
  {
    id: "nephrology",
    label: "Nephrology",
    icon: "water",
    color: "#747D8C",
    description: "eGFR, creatinine, KDIGO",
    screen: "NephrologyCalculators",
  },
];

// All calculators for search
const allCalculators = [
  // General
  { name: "BMR Calculator", category: "General", screen: "BMRCalculator" },
  { name: "Body Fat Percentage", category: "General", screen: "BodyFatPercentageCalculator" },
  { name: "Caloric Needs", category: "General", screen: "CaloricNeedsCalculator" },
  { name: "Energy Expenditure", category: "General", screen: "EnergyExpenditureCalculator" },
  { name: "Harris-Benedict", category: "General", screen: "HarrisBenedictCalculator" },
  { name: "Ideal Body Weight", category: "General", screen: "IdealBodyWeightCalculator" },
  { name: "Mifflin-St Jeor", category: "General", screen: "MifflinStJeorCalculator" },
  { name: "Waist Circumference", category: "General", screen: "WaistCircumferenceCalculator" },
  // Cardiovascular
  { name: "ASCVD Risk", category: "Cardiovascular", screen: "ASCVDCalculator" },
  { name: "CHADSVASC Score", category: "Cardiovascular", screen: "CHADSVASCCalculator" },
  { name: "HASBLED Score", category: "Cardiovascular", screen: "HASBLEDCalculator" },
  { name: "NYHA Classification", category: "Cardiovascular", screen: "NYHAClassification" },
  // Neurology
  { name: "Glasgow Coma Scale", category: "Neurology", screen: "GlasgowComaScale" },
  { name: "NIH Stroke Scale", category: "Neurology", screen: "NIHStrokeScale" },
  { name: "Modified Rankin Scale", category: "Neurology", screen: "ModifiedRankinScale" },
  // Pulmonary
  { name: "Asthma Severity Index", category: "Pulmonary", screen: "AsthmaSeverityIndex" },
  { name: "BODE Index", category: "Pulmonary", screen: "BODEIndex" },
  { name: "CURB-65 Score", category: "Pulmonary", screen: "CURB65Calculator" },
  // Gastroenterology
  { name: "Alvarado Score", category: "Gastroenterology", screen: "AlvaradoScore" },
  { name: "Barrett's Esophagus Risk", category: "Gastroenterology", screen: "BarrettsEsophagusRisk" },
  { name: "BISAP Score", category: "Gastroenterology", screen: "BISAPCalculator" },
  { name: "Bowel Cancer Screening", category: "Gastroenterology", screen: "BowelCancerScreening" },
  { name: "Bristol Stool Chart", category: "Gastroenterology", screen: "BristolStoolChart" },
  { name: "Child-Pugh Score", category: "Gastroenterology", screen: "ChildPughScore" },
  { name: "Crohn's Disease Activity", category: "Gastroenterology", screen: "CrohnsDiseaseActivity" },
  { name: "FIB-4 Score", category: "Gastroenterology", screen: "FIB4Calculator" },
  // Obstetrics
  { name: "Due Date Calculator", category: "Obstetrics", screen: "DueDateCalculator" },
  { name: "Bishop Score", category: "Obstetrics", screen: "BishopScore" },
  { name: "Apgar Score", category: "Obstetrics", screen: "ApgarScore" },
  // Orthopedics
  { name: "Fracture Risk Assessment", category: "Orthopedics", screen: "FractureRiskAssessment" },
  { name: "Ottawa Ankle Rules", category: "Orthopedics", screen: "OttawaAnkleRules" },
  { name: "Knee Injury Score", category: "Orthopedics", screen: "KneeInjuryScore" },
  // Nephrology
  { name: "eGFR Calculator", category: "Nephrology", screen: "EGFRCalculator" },
  { name: "Creatinine Clearance", category: "Nephrology", screen: "CreatinineClearance" },
  { name: "KDIGO Stage", category: "Nephrology", screen: "KDIGOStage" },
];

const ClinicalCalculators = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentCalculators, setRecentCalculators] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadRecentsAndFavorites();
  }, []);

  const loadRecentsAndFavorites = async () => {
    try {
      const recentData = await AsyncStorage.getItem("recentCalculators");
      const favoriteData = await AsyncStorage.getItem("favoriteCalculators");
      if (recentData) setRecentCalculators(JSON.parse(recentData));
      if (favoriteData) setFavorites(JSON.parse(favoriteData));
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleNavigation = async (item, isCategory) => {
    try {
      const id = isCategory ? item.id : item.screen;
      const updatedRecents = [
        id,
        ...recentCalculators.filter((calc) => calc !== id),
      ].slice(0, 5);
      await AsyncStorage.setItem("recentCalculators", JSON.stringify(updatedRecents));
      setRecentCalculators(updatedRecents);

      navigation.navigate(isCategory ? item.screen : item.screen);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  const toggleFavorite = async (calculator) => {
    try {
      const updatedFavorites = favorites.includes(calculator.screen)
        ? favorites.filter((fav) => fav !== calculator.screen)
        : [...favorites, calculator.screen];
      await AsyncStorage.setItem("favoriteCalculators", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const filteredItems = searchQuery
    ? allCalculators.filter(
        (calc) =>
          calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          calc.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : calculatorCategories;

  const renderItem = ({ item }) => {
    const isCategory = !item.category;
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: item.color + "15" }]}
        onPress={() => handleNavigation(item, isCategory)}
      >
        <View style={styles.cardContent}>
          <MaterialCommunityIcons name={item.icon} size={28} color={item.color} />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{isCategory ? item.label : item.name}</Text>
            <Text style={styles.cardDescription}>
              {isCategory ? item.description : item.category}
            </Text>
          </View>
          {!isCategory && (
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <MaterialCommunityIcons
                name={favorites.includes(item.screen) ? "star" : "star-outline"}
                size={24}
                color={favorites.includes(item.screen) ? "#FFD700" : "#747D8C"}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderSection = (title, data, showAll = false) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={showAll ? data : data.slice(0, 5)}
        renderItem={renderItem}
        keyExtractor={(item) => (item.id || item.screen)}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.header}>
        <Text style={styles.title}>Clinical Calculators</Text>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color="#747D8C"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search calculators..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessible
            accessibilityLabel="Search calculators"
          />
        </View>
      </View>
      <FlatList
        data={[{ id: "main" }]}
        renderItem={() =>
          searchQuery ? (
            renderSection("Search Results", filteredItems, true)
          ) : (
            <>
              {favorites.length > 0 &&
                renderSection(
                  "Favorites",
                  allCalculators.filter((calc) => favorites.includes(calc.screen))
                )}
              {recentCalculators.length > 0 &&
                renderSection(
                  "Recent",
                  allCalculators.filter((calc) =>
                    recentCalculators.includes(calc.screen)
                  )
                )}
              {renderSection("Categories", calculatorCategories, true)}
            </>
          )
        }
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F3542",
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F2F6",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#2F3542",
  },
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2F3542",
    marginBottom: 12,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardText: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2F3542",
  },
  cardDescription: {
    fontSize: 12,
    color: "#747D8C",
    marginTop: 4,
  },
});

export default ClinicalCalculators;