import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { ArrowBack, Star, StarBorder } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

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

const FavoritesCalculators = ({ allCalculators }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const favoriteData = localStorage.getItem("favoriteCalculators");
    if (favoriteData) {
      setFavorites(JSON.parse(favoriteData));
    }
  };

  const toggleFavorite = (calculator) => {
    const updatedFavorites = favorites.includes(calculator.screen)
      ? favorites.filter((fav) => fav !== calculator.screen)
      : [...favorites, calculator.screen];
    localStorage.setItem("favoriteCalculators", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const handleNavigation = (calculator) => {
    navigate(calculator.screen);
  };

  const favoriteCalculators = allCalculators.filter((calc) => favorites.includes(calc.screen));

  const getIconAndColor = (category) => {
    const cat = calculatorCategories.find((c) => c.label.toLowerCase() === category.toLowerCase());
    return {
      icon: cat ? cat.icon : "calculator",
      color: cat ? cat.color : "#2F3542",
    };
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Favorite Calculators
        </Typography>
      </Box>

      {favoriteCalculators.length === 0 ? (
        <Alert severity="info" sx={{ textAlign: "center" }}>
          No favorite calculators yet.
        </Alert>
      ) : (
        <List>
          {favoriteCalculators.map((item) => {
            const { icon, color } = getIconAndColor(item.category);
            return (
              <React.Fragment key={item.screen}>
                <ListItem
                  button
                  onClick={() => handleNavigation(item)}
                  sx={{ borderRadius: 2, mb: 2 }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={item.category}
                    sx={{ flexGrow: 1, textAlign: "left" }}
                  />
                  <IconButton onClick={() => toggleFavorite(item)}>
                    {favorites.includes(item.screen) ? <Star /> : <StarBorder />}
                  </IconButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default FavoritesCalculators;