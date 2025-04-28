import React, { useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, Text, View, StyleSheet, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import Category Screens
import CardiovascularCalculators from './src/components/calculators/cardiovascular/CardiovascularCalculators';
import NeurologyCalculators from './src/components/calculators/neurology/NeurologyCalculators';
import OrthopedicsCalculators from './src/components/calculators/ortho/OrthopedicsCalculators';
import ObstetricsCalculators from './src/components/calculators/obstetrics/ObstetricsCalculators';
import GastroenterologyCalculators from './src/components/calculators/git/GastroenterologyCalculators';
import PulmonaryCalculators from './src/components/calculators/pulmonary/PulmonaryCalculators';
import ICUCalculators from './src/components/calculators/icu/ICUCalculators';
import GeneralCalculators from './src/components/calculators/general/GeneralCalculators';
import NephrologyCalculators from './src/components/calculators/nephrology/NephrologyCalculators';

const calculatorCategories = [
  { id: 'general', label: 'General', icon: 'calculator', color: '#2ECC71', component: GeneralCalculators },
  { id: 'cardiovascular', label: 'Cardiovascular', icon: 'heart-pulse', color: '#FF4757', component: CardiovascularCalculators },
  { id: 'neurology', label: 'Neurology', icon: 'brain', color: '#5352ED', component: NeurologyCalculators },
  { id: 'pulmonary', label: 'Pulmonary', icon: 'lungs', color: '#1E90FF', component: PulmonaryCalculators },
  { id: 'gastroenterology', label: 'Gastroenterology', icon: 'stomach', color: '#FF6B6B', component: GastroenterologyCalculators },
  { id: 'obstetrics', label: 'Obstetrics', icon: 'baby-face-outline', color: '#FF9FF3', component: ObstetricsCalculators },
  { id: 'orthopedics', label: 'Orthopedics', icon: 'bone', color: '#FFA502', component: OrthopedicsCalculators },
  { id: 'nephrology', label: 'Nephrology', icon: 'water', color: '#747D8C', component: NephrologyCalculators },
  { id: 'icu', label: 'ICU', icon: 'medkit', color: '#E74C3C', component: ICUCalculators },
];

const ClinicalCalculators = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color + '15' }]}
      onPress={() => setSelectedCategory(item)}
    >
      <MaterialCommunityIcons name={item.icon} size={32} color={item.color} />
      <Text style={styles.cardTitle}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Clinical Calculators</Text>
      </View>
      {selectedCategory ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedCategory(null)}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#2F3542" />
            <Text style={styles.backButtonText}>Back to Categories</Text>
          </TouchableOpacity>
          <selectedCategory.component />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <FlatList
            data={calculatorCategories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.grid}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F2F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F3542',
  },
  container: {
    padding: 16,
  },
  grid: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F3542',
    marginTop: 8,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2F3542',
    marginLeft: 8,
  },
});

export default ClinicalCalculators;