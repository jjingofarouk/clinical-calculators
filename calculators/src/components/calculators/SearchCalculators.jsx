import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

// Calculator categories with metadata (used for icons and categories)
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
    return route.name === "SearchCalculators" ? "Search Calculators" : route.name.replace(/([A-Z])/g, " $1").trim();
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

// List of all calculator screens (derived dynamically in AppNavigator)
const SearchCalculators = ({ route }) => {
  const { allCalculators } = route.params; // Passed from AppNavigator
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCalculators = allCalculators.filter(
    (calc) =>
      calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigation = (calculator) => {
    navigation.navigate(calculator.screen);
  };

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
            </View>
            </TouchableOpacity>
      );
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <CustomHeader />
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
          autoFocus
          accessible
          accessibilityLabel="Search calculators input"
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={filteredCalculators}
          renderItem={renderCalculator}
          keyExtractor={(item) => item.screen}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No calculators found</Text>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F2F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 12,
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

export default SearchCalculators;