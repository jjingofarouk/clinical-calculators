import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Alert,
} from "@mui/material";
import { ArrowBack, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

const SearchCalculators = ({ allCalculators }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCalculators = allCalculators.filter(
    (calc) =>
      calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigation = (calculator) => {
    navigate(calculator.screen);
  };

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
          Search Calculators
        </Typography>
      </Box>

      {/* Search Input */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, bgcolor: "#F1F2F6", borderRadius: 2, p: 2 }}>
        <Search sx={{ mr: 2 }} />
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search calculators..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {/* Calculator List */}
      {filteredCalculators.length === 0 ? (
        <Alert severity="info" sx={{ textAlign: "center" }}>
          No calculators found.
        </Alert>
      ) : (
        <List>
          {filteredCalculators.map((item) => {
            const { icon, color } = getIconAndColor(item.category);
            return (
              <React.Fragment key={item.screen}>
                <ListItem button onClick={() => handleNavigation(item)} sx={{ borderRadius: 2, mb: 2 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={item.category}
                    sx={{ flexGrow: 1, textAlign: "left" }}
                  />
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

export default SearchCalculators;