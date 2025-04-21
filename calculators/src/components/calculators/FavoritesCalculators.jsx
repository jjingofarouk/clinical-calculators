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
  { id: "general", label: "General", icon: "calculator", color: "#2ECC71" },
  { id: "cardiovascular", label: "Cardiovascular", icon: "heart-pulse", color: "#FF4757" },
  { id: "neurology", label: "Neurology", icon: "brain", color: "#5352ED" },
  { id: "pulmonary", label: "Pulmonary", icon: "lungs", color: "#1E90FF" },
  { id: "gastroenterology", label: "Gastroenterology", icon: "stomach", color: "#FF6B6B" },
  { id: "obstetrics", label: "Obstetrics", icon: "baby-face-outline", color: "#FF9FF3" },
  { id: "orthopedics", label: "Orthopedics", icon: "bone", color: "#FFA502" },
  { id: "nephrology", label: "Nephrology", icon: "water", color: "#747D8C" },
  { id: "icu", label: "ICU", icon: "medkit", color: "#E84393" },
];

// Custom Header Component
const CustomHeader = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const getHeaderTitle = () => {
    return route.name === "FavoritesCalculators" ? "Favorite Calculators" : route.name.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#2F3542" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
    </View>
  );
};

const FavoritesCalculators = ({ route }) => {
  const { allCalculators } = route.params; // Passed from AppNavigator
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

  const getIconAndColor = (category) => {
    const cat = calculatorCategories.find((c) => c.label.toLowerCase() === category.toLowerCase());
    return {
      icon: cat ? cat.icon : "calculator",
      color: cat ? cat.color : "#2F3542",
    };
  };

  const renderCalculator = ({ item }) => {
    const { icon, color } = getIconAndColor(item.category);
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleNavigation(item)}
        accessible
        accessibilityLabel={`${item.name} in ${item.category}`}
      >
        <View style={styles.cardContent}>
          <MaterialCommunityIcons name={icon} size={28} color={color} />
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
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <CustomHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={favoriteCalculators}
          renderItem={renderCalculator}
          keyExtractor={(item) => item.screen}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No favorite calculators yet</Text>
          }
        />
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
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6",
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F3542",
    flex: 1,
  },
  container: {
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
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