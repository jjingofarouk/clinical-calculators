import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

// Calculator categories with metadata
const calculatorCategories = [
  { id: "general", label: "General", icon: "calculator", color: "#2ECC71", description: "BMI, BMR, caloric needs", screen: "General" },
  { id: "cardiovascular", label: "Cardiovascular", icon: "heart-pulse", color: "#FF4757", description: "ASCVD, CHADSVASC, HASBLED", screen: "Cardiovascular" },
  { id: "neurology", label: "Neurology", icon: "brain", color: "#5352ED", description: "GCS, NIHSS, mRS", screen: "Neurology" },
  { id: "pulmonary", label: "Pulmonary", icon: "lungs", color: "#1E90FF", description: "BODE, CURB-65, asthma", screen: "Pulmonary" },
  { id: "gastroenterology", label: "Gastroenterology", icon: "stomach", color: "#FF6B6B", description: "Alvarado, Child-Pugh, FIB-4", screen: "Gastroenterology" },
  { id: "obstetrics", label: "Obstetrics", icon: "baby-face-outline", color: "#FF9FF3", description: "Due date, Bishop, Apgar", screen: "Obstetrics" },
  { id: "orthopedics", label: "Orthopedics", icon: "bone", color: "#FFA502", description: "Fracture risk, Ottawa rules", screen: "Orthopedics" },
  { id: "nephrology", label: "Nephrology", icon: "water", color: "#747D8C", description: "eGFR, creatinine, KDIGO", screen: "Nephrology" },
  { id: "icu", label: "ICU", icon: "medkit", color: "#E84393", description: "APACHE, SOFA, qSOFA", screen: "ICU" },
];

// Custom Header Component
const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Clinical Calculators</Text>
      <View style={styles.headerButtons}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SearchCalculators")}
          style={styles.headerButton}
          accessible
          accessibilityLabel="Search calculators"
        >
          <MaterialCommunityIcons name="magnify" size={24} color="#2F3542" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("FavoritesCalculators")}
          style={styles.headerButton}
          accessible
          accessibilityLabel="Favorite calculators"
        >
          <MaterialCommunityIcons name="star" size={24} color="#FFD700" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ClinicalCalculators = ({ route }) => {
  const { allCalculators } = route.params; // Dynamic list from AppNavigator
  const navigation = useNavigation();
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

      navigation.navigate(isCategory ? "Calculators" : item.screen, {
        screen: isCategory ? item.screen : undefined,
        params: { allCalculators },
      });
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

  const renderItem = ({ item }) => {
    const isCategory = !item.category;
    const category = isCategory
      ? calculatorCategories.find((cat) => cat.id === item.id)
      : calculatorCategories.find((cat) => cat.label.toLowerCase() === item.category.toLowerCase());
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: category.color + "15" }]}
        onPress={() => handleNavigation(item, isCategory)}
      >
        <View style={styles.cardContent}>
          <MaterialCommunityIcons name={category.icon} size={28} color={category.color} />
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
      <CustomHeader />
      <ScrollView contentContainerStyle={styles.container}>
        {favorites.length > 0 &&
          renderSection(
            "Favorites",
            allCalculators.filter((calc) => favorites.includes(calc.screen))
          )}
        {recentCalculators.length > 0 &&
          renderSection(
            "Recent",
            allCalculators.filter((calc) => recentCalculators.includes(calc.screen))
          )}
        {renderSection("Categories", calculatorCategories, true)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F3542",
  },
  headerButtons: {
    flexDirection: "row",
  },
  headerButton: {
    marginLeft: 16,
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