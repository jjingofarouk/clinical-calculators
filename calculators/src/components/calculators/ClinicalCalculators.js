import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LucideIcon, Search, Star } from "lucide-react";
import { TextField, IconButton, Box, Typography, Card, CardContent, Grid } from "@mui/material";

const calculatorCategories = [
  { id: "general", label: "General", icon: "Calculator", color: "#2ECC71", description: "BMI, BMR, caloric needs", screen: "General" },
  { id: "cardiovascular", label: "Cardiovascular", icon: "Heart", color: "#FF4757", description: "ASCVD, CHADSVASC, HASBLED", screen: "Cardiovascular" },
  { id: "neurology", label: "Neurology", icon: "Brain", color: "#5352ED", description: "GCS, NIHSS, mRS", screen: "Neurology" },
  { id: "pulmonary", label: "Pulmonary", icon: "Wind", color: "#1E90FF", description: "BODE, CURB-65, asthma", screen: "Pulmonary" },
  { id: "gastroenterology", label: "Gastroenterology", icon: "Stethoscope", color: "#FF6B6B", description: "Alvarado, Child-Pugh, FIB-4", screen: "Gastroenterology" },
  { id: "obstetrics", label: "Obstetrics", icon: "Baby", color: "#FF9FF3", description: "Due date, Bishop, Apgar", screen: "Obstetrics" },
  { id: "orthopedics", label: "Orthopedics", icon: "Bone", color: "#FFA502", description: "Fracture risk, Ottawa rules", screen: "Orthopedics" },
  { id: "nephrology", label: "Nephrology", icon: "Droplet", color: "#747D8C", description: "eGFR, creatinine, KDIGO", screen: "Nephrology" },
  { id: "icu", label: "ICU", icon: "Activity", color: "#E84393", description: "APACHE, SOFA, qSOFA", screen: "ICU" },
];

const CustomHeader = () => {
  const navigate = useNavigate();

  return (
    <Box className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <Typography variant="h5" className="font-bold text-gray-800">
        Clinical Calculators
      </Typography>
      <Box className="flex gap-4">
        <IconButton
          onClick={() => navigate("/search-calculators")}
          aria-label="Search calculators"
        >
          <Search size={24} className="text-gray-800" />
        </IconButton>
        <IconButton
          onClick={() => navigate("/favorites-calculators")}
          aria-label="Favorite calculators"
        >
          <Star size={24} className="text-yellow-400" />
        </IconButton>
      </Box>
    </Box>
  );
};

const ClinicalCalculators = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const allCalculators = location.state?.allCalculators || [];
  const [recentCalculators, setRecentCalculators] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCalculators, setFilteredCalculators] = useState([]);

  useEffect(() => {
    loadRecentsAndFavorites();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = allCalculators.filter((calc) =>
        calc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCalculators(filtered);
    } else {
      setFilteredCalculators([]);
    }
  }, [searchQuery, allCalculators]);

  const loadRecentsAndFavorites = async () => {
    try {
      const recentData = localStorage.getItem("recentCalculators");
      const favoriteData = localStorage.getItem("favoriteCalculators");
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
      localStorage.setItem("recentCalculators", JSON.stringify(updatedRecents));
      setRecentCalculators(updatedRecents);

      navigate(isCategory ? `/calculators/${item.screen}` : `/${item.screen}`, {
        state: { allCalculators },
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
      localStorage.setItem("favoriteCalculators", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const renderItem = (item) => {
    const isCategory = !item.category;
    const category = isCategory
      ? calculatorCategories.find((cat) => cat.id === item.id)
      : calculatorCategories.find((cat) => cat.label.toLowerCase() === item.category.toLowerCase());
    const IconComponent = LucideIcon[category.icon] || LucideIcon.Calculator;

    return (
      <Card
        className="mb-3 cursor-pointer hover:shadow-md transition-shadow"
        sx={{ backgroundColor: `${category.color}15`, borderRadius: 3 }}
        onClick={() => handleNavigation(item, isCategory)}
      >
        <CardContent className="flex items-center justify-between">
          <Box className="flex items-center gap-3">
            <IconComponent size={28} style={{ color: category.color }} />
            <Box>
              <Typography variant="subtitle1" className="font-semibold text-gray-800">
                {isCategory ? item.label : item.name}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                {isCategory ? item.description : item.category}
              </Typography>
            </Box>
          </Box>
          {!isCategory && (
            <IconButton onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}>
              <Star
                size={24}
                className={favorites.includes(item.screen) ? "text-yellow-400" : "text-gray-400"}
                fill={favorites.includes(item.screen) ? "#FFD700" : "none"}
              />
            </IconButton>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderSection = (title, data, showAll = false) => (
    <Box className="mb-5">
      <Typography variant="h6" className="font-semibold text-gray-800 mb-3">
        {title}
      </Typography>
      <Grid container spacing={2}>
        {(showAll ? data : data.slice(0, 5)).map((item) => (
          <Grid item xs={12} key={item.id || item.screen}>
            {renderItem(item)}
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
          placeholder="Search calculators..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
          sx={{ backgroundColor: "#F1F2F6", borderRadius: 2 }}
        />
        {searchQuery ? (
          renderSection("Search Results", filteredCalculators, true)
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
                allCalculators.filter((calc) => recentCalculators.includes(calc.screen))
              )}
            {renderSection("Categories", calculatorCategories, true)}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ClinicalCalculators;