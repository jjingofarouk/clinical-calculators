import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// All calculators for favorites
const allCalculators = [
  // General
  { name: "BMR Calculator", category: "General", screen: "BMRCalculator", icon: "calculator" },
  { name: "Body Fat Percentage", category: "General", screen: "BodyFatPercentageCalculator", icon: "calculator" },
  { name: "Caloric Needs", category: "General", screen: "CaloricNeedsCalculator", icon: "calculator" },
  { name: "Energy Expenditure", category: "General", screen: "EnergyExpenditureCalculator", icon: "calculator" },
  { name: "Harris-Benedict", category: "General", screen: "HarrisBenedictCalculator", icon: "calculator" },
  { name: "Ideal Body Weight", category: "General", screen: "IdealBodyWeightCalculator", icon: "calculator" },
  { name: "Mifflin-St Jeor", category: "General", screen: "MifflinStJeorCalculator", icon: "calculator" },
  { name: "Waist Circumference", category: "General", screen: "WaistCircumferenceCalculator", icon: "calculator" },
  // Cardiovascular
  { name: "ASCVD Risk", category: "Cardiovascular", screen: "ASCVDCalculator", icon: "heart-pulse" },
  { name: "CHADSVASC Score", category: "Cardiovascular", screen: "CHADSVASCCalculator", icon: "heart-pulse" },
  { name: "HASBLED Score", category: "Cardiovascular", screen: "HASBLEDCalculator", icon: "heart-pulse" },
  { name: "NYHA Classification", category: "Cardiovascular", screen: "NYHAClassification", icon: "heart-pulse" },
  // Neurology
  { name: "Glasgow Coma Scale", category: "Neurology", screen: "GlasgowComaScale", icon: "brain" },
  { name: "NIH Stroke Scale", category: "Neurology", screen: "NIHStrokeScale", icon: "brain" },
  { name: "Modified Rankin Scale", category: "Neurology", screen: "ModifiedRankinScale", icon: "brain" },
  // Pulmonary
  { name: "Asthma Severity Index", category: "Pulmonary", screen: "AsthmaSeverityIndex", icon: "lungs" },
  { name: "BODE Index", category: "Pulmonary", screen: "BODEIndex", icon: "lungs" },
  { name: "CURB-65 Score", category: "Pulmonary", screen: "CURB65Calculator", icon: "lungs" },
  // Gastroenterology
  { name: "Alvarado Score", category: "Gastroenterology", screen: "AlvaradoScore", icon: "stomach" },
  { name: "Barrett's Esophagus Risk", category: "Gastroenterology", screen: "BarrettsEsophagusRisk", icon: "stomach" },
  { name: "BISAP Score", category: "Gastroenterology", screen: "BISAPCalculator", icon: "stomach" },
  { name: "Bowel Cancer Screening", category: "Gastroenterology", screen: "BowelCancerScreening", icon: "stomach" },
  { name: "Bristol Stool Chart", category: "Gastroenterology", screen: "BristolStoolChart", icon: "stomach" },
  { name: "Child-Pugh Score", category: "Gastroenterology", screen: "ChildPughScore", icon: "stomach" },
  { name: "Crohn's Disease Activity", category: "Gastroenterology", screen: "CrohnsDiseaseActivity", icon: "stomach" },
  { name: "FIB-4 Score", category: "Gastroenterology", screen: "FIB4Calculator", icon: "stomach" },
  // Obstetrics
  { name: "Due Date Calculator", category: "Obstetrics", screen: "DueDateCalculator", icon: "baby-face-outline" },
  { name: "Bishop Score", category: "Obstetrics", screen: "BishopScore", icon: "baby-face-outline" },
  { name: "Apgar Score", category: "Obstetrics", screen: "ApgarScore", icon: "baby-face-outline" },
  // Orthopedics
  { name: "Fracture Risk Assessment", category: "Orthopedics", screen: "FractureRiskAssessment", icon: "bone" },
  { name: "Ottawa Ankle Rules", category: "Orthopedics", screen: "OttawaAnkleRules", icon: "bone" },
  { name: "Knee Injury Score", category: "Orthopedics", screen: "KneeInjuryScore", icon: "bone" },
  // Nephrology
  { name: "eGFR Calculator", category: "Nephrology", screen: "EGFRCalculator", icon: "water" },
  { name: "Creatinine Clearance", category: "Nephrology", screen: "CreatinineClearance", icon: "water" },
  { name: "KDIGO Stage", category: "Nephrology", screen: "KDIGOStage", icon: "water" },
];

const FavoritesCalculators = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoriteData = await AsyncStorage.getItem("favoriteCalculators");
      if (favoriteData) {
        setFavorites(JSON.parse(favoriteData));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
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

  const handleNavigation = (calculator) => {
    navigation.navigate(calculator.screen);
  };

  const favoriteCalculators = allCalculators.filter((calc) => favorites.includes(calc.screen));

  const renderCalculator = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleNavigation(item)}
      accessible
      accessibilityLabel={`${item.name} in ${item.category}`}
    >
      <View style={styles.cardContent}>
        <MaterialCommunityIcons name={item.icon} size={28} color="#2F3542" />
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardCategory}>{item.category}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <MaterialCommunityIcons name="star" size={24} color="#FFD700" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.header}>
        <Text style={styles.title}>Favorite Calculators</Text>
      </View>
      <FlatList
        data={favoriteCalculators}
        renderItem={renderCalculator}
        keyExtractor={(item) => item.screen}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No favorite calculators yet</Text>
        }
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
  },
  container: {
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
     marginBottom: 12,
    backgroundColor: "#FFF",
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
  cardCategory: {
    fontSize: 12,
    color: "#747D8C",
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    color: "#747D8C",
    textAlign: "center",
    marginTop: 20,
  },
});

export default FavoritesCalculators;