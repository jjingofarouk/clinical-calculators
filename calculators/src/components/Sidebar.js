// src/components/Sidebar.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export default function Sidebar({ navigation, activeRoute = 'Main' }) {
  const insets = useSafeAreaInsets();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    {
      title: 'Calculators',
      icon: 'calculator',
      items: [
        {
          href: 'Gastroenterology',
          label: 'Gastroenterology',
          icon: 'nutrition',
          category: 'Gastroenterology',
        },
        {
          href: 'ICU',
          label: 'ICU',
          icon: 'medkit',
          category: 'ICU',
        },
        {
          href: 'Pulmonary',
          label: 'Pulmonary',
          icon: 'lungs',
          category: 'Pulmonary',
        },
        {
          href: 'Orthopedics',
          label: 'Orthopedics',
          icon: 'fitness',
          category: 'Orthopedics',
        },
      ],
    },
  ];

  const handlePress = (href) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Main', { screen: 'Calculators', params: { screen: href } });
  };

  const renderNavItem = (item, isChild = false) => {
    const isActive = activeRoute === item.href;
    const isHovered = hoveredItem === item.href;

    return (
      <TouchableOpacity
        key={item.href}
        style={[
          styles.navItem,
          isChild && styles.childNavItem,
          isActive && styles.activeNavItem,
          isHovered && styles.hoveredNavItem,
        ]}
        onPress={() => handlePress(item.href)}
        onPressIn={() => setHoveredItem(item.href)}
        onPressOut={() => setHoveredItem(null)}
      >
        <Animated.View
          style={[
            styles.iconContainer,
            isActive && styles.activeIconContainer,
          ]}
        >
          <Icon
            name={item.icon}
            size={22}
            color={isActive ? '#FFFFFF' : '#94A3B8'}
          />
        </Animated.View>
        <Text
          style={[
            styles.navItemText,
            isActive && styles.activeNavItemText,
          ]}
        >
          {item.label}
        </Text>
        {isActive && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {renderNavItem({
          href: 'Main',
          label: 'Home',
          icon: 'home-variant',
        })}

        {navItems.map((section, index) => (
          <View key={index} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name={section.icon} size={18} color="#64748B" />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            {section.items.map((item) => renderNavItem(item, true))}
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="cog-outline" size={22} color="#94A3B8" />
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004d4d',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
    width: 280,
    overflow: 'hidden',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 4,
    position: 'relative',
  },
  childNavItem: {
    marginLeft: 8,
  },
  activeNavItem: {
    backgroundColor: 'rgba(52, 216, 200, 0.2)',
  },
  hoveredNavItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeIconContainer: {
    backgroundColor: '#34d8c8',
  },
  navItemText: {
    fontSize: 14,
    color: '#f1f5f9',
    fontWeight: '500',
  },
  activeNavItemText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -2 }],
    width: 4,
    height: 16,
    backgroundColor: '#34d8c8',
    borderRadius: 2,
  },
  bottomActions: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingsText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});