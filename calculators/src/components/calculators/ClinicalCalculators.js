import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star } from 'lucide-react';
import { TextField, IconButton, Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { Calculator, Heart, Brain, Wind, Stethoscope, Baby, Bone, Droplet, Activity } from 'lucide-react';

// Icon map for dynamic rendering
const iconMap = {
  Calculator,
  Heart,
  Brain,
  Wind,
  Stethoscope,
  Baby,
  Bone,
  Droplet,
  Activity,
};

const calculatorCategories = [
  { id: 'general', label: 'General', icon: 'Calculator', color: '#2ECC71', description: 'BMI, BMR, caloric needs', screen: 'General' },
  { id: 'cardiovascular', label: 'Cardiovascular', icon: 'Heart', color: '#FF4757', description: 'ASCVD, CHADSVASC, HASBLED', screen: 'Cardiovascular' },
  { id: 'neurology', label: 'Neurology', icon: 'Brain', color: '#5352ED', description: 'GCS, NIHSS, mRS', screen: 'Neurology' },
  { id: 'pulmonary', label: 'Pulmonary', icon: 'Wind', color: '#1E90FF', description: 'BODE, CURB-65, asthma', screen: 'Pulmonary' },
  { id: 'gastroenterology', label: 'Gastroenterology', icon: 'Stethoscope', color: '#FF6B6B', description: 'Alvarado, Child-Pugh, FIB-4', screen: 'Gastroenterology' },
  { id: 'obstetrics', label: 'Obstetrics', icon: 'Baby', color: '#FF9FF3', description: 'Due date, Bishop, Apgar', screen: 'Obstetrics' },
  { id: 'orthopedics', label: 'Orthopedics', icon: 'Bone', color: '#FFA502', description: 'Fracture risk, Ottawa rules', screen: 'Orthopedics' },
  { id: 'nephrology', label: 'Nephrology', icon: 'Droplet', color: '#747D8C', description: 'eGFR, creatinine, KDIGO', screen: 'Nephrology' },
  { id: 'icu', label: 'ICU', icon: 'Activity', color: '#E84393', description: 'APACHE, SOFA, qSOFA', screen: 'ICU' },
];

const CustomHeader = () => {
  const navigate = useNavigate();

  return (
    <Box className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <Typography variant="h5" className="font-bold text-gray-800">
        Clinical Calculators
      </Typography>
      <Box className="flex gap-4">
        <IconButton onClick={() => navigate('/search-calculators')} aria-label="Search calculators">
          <Search size={24} className="text-gray-800" />
        </IconButton>
        <IconButton onClick={() => navigate('/favorites-calculators')} aria-label="Favorite calculators">
          <Star size={24} className="text-yellow-400" />
        </IconButton>
      </Box>
    </Box>
  );
};

const ClinicalCalculators = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentCategories, setRecentCategories] = useState([]);
  const [favoriteCategories, setFavoriteCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(calculatorCategories);

  useEffect(() => {
    loadRecentsAndFavorites();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = calculatorCategories.filter((cat) =>
        cat.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(calculatorCategories);
    }
  }, [searchQuery]);

  const loadRecentsAndFavorites = async () => {
    try {
      const recentData = localStorage.getItem('recentCategories');
      const favoriteData = localStorage.getItem('favoriteCategories');
      if (recentData) setRecentCategories(JSON.parse(recentData));
      if (favoriteData) setFavoriteCategories(JSON.parse(favoriteData));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleNavigation = async (category) => {
    try {
      const updatedRecents = [
        category.id,
        ...recentCategories.filter((id) => id !== category.id),
      ].slice(0, 5);
      localStorage.setItem('recentCategories', JSON.stringify(updatedRecents));
      setRecentCategories(updatedRecents);
      navigate(`/calculators/${category.screen}`);
    } catch (error) {
      console.error('Error navigating:', error);
    }
  };

  const toggleFavorite = async (category) => {
    try {
      const updatedFavorites = favoriteCategories.includes(category.id)
        ? favoriteCategories.filter((id) => id !== category.id)
        : [...favoriteCategories, category.id];
      localStorage.setItem('favoriteCategories', JSON.stringify(updatedFavorites));
      setFavoriteCategories(updatedFavorites);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const renderCategoryCard = (category) => {
    const IconComponent = iconMap[category.icon] || Calculator;

    return (
      <Card
        key={category.id}
        className="mb-3 cursor-pointer hover:shadow-md transition-shadow"
        sx={{ backgroundColor: `${category.color}15`, borderRadius: 3 }}
        onClick={() => handleNavigation(category)}
      >
        <CardContent className="flex items-center justify-between">
          <Box className="flex items-center gap-3">
            <IconComponent size={28} style={{ color: category.color }} />
            <Box>
              <Typography variant="subtitle1" className="font-semibold text-gray-800">
                {category.label}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                {category.description}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(category);
            }}
          >
            <Star
              size={24}
              className={favoriteCategories.includes(category.id) ? 'text-yellow-400' : 'text-gray-400'}
              fill={favoriteCategories.includes(category.id) ? '#FFD700' : 'none'}
            />
          </IconButton>
        </CardContent>
      </Card>
    );
  };

  const renderSection = (title, data) => (
    <Box className="mb-5">
      <Typography variant="h6" className="font-semibold text-gray-800 mb-3">
        {title}
      </Typography>
      <Grid container spacing={2}>
        {data.map((category) => (
          <Grid item xs={12} key={category.id}>
            {renderCategoryCard(category)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Box className="min-h-screen bg-white">
      <CustomHeader />
      <Box className="p-4">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search calculator groups..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
          sx={{ backgroundColor: '#F1F2F6', borderRadius: 2 }}
        />
        {searchQuery ? (
          renderSection('Search Results', filteredCategories)
        ) : (
          <>
            {favoriteCategories.length > 0 &&
              renderSection(
                'Favorite Categories',
                calculatorCategories.filter((cat) => favoriteCategories.includes(cat.id))
              )}
            {recentCategories.length > 0 &&
              renderSection(
                'Recent Categories',
                calculatorCategories.filter((cat) => recentCategories.includes(cat.id))
              )}
            {renderSection('All Categories', calculatorCategories)}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ClinicalCalculators;