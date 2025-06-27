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
  Alert,
} from "@mui/material";
import { ArrowLeft, Search, Calculator, Heart, Brain, Lungs, Stethoscope, Baby, Bone, Droplet, Syringe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const calculatorCategories = [
  { id: "general", label: "General", icon: <Calculator size={24} />, color: "#2ECC71" },
  { id: "cardiovascular", label: "Cardiovascular", icon: <Heart size={24} />, color: "#FF4757" },
  { id: "neurology", label: "Neurology", icon: <Brain size={24} />, color: "#5352ED" },
  { id: "pulmonary", label: "Pulmonary", icon: <Lungs size={24} />, color: "#1E90FF" },
  { id: "gastroenterology", label: "Gastroenterology", icon: <Stethoscope size={24} />, color: "#FF6B6B" },
  { id: "obstetrics", label: "Obstetrics", icon: <Baby size={24} />, color: "#FF9FF3" },
  { id: "orthopedics", label: "Orthopedics", icon: <Bone size={24} />, color: "#FFA502" },
  { id: "nephrology", label: "Nephrology", icon: <Droplet size={24} />, color: "#747D8C" },
  { id: "icu", label: "ICU", icon: <Syringe size={24} />, color: "#E84393" },
];

const SearchCalculators = ({ allCalculators }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCalculators = allCalculators.filter((calc) =>
    calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    calc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIconAndColor = (category) => {
    const cat = calculatorCategories.find((c) => c.label.toLowerCase() === category.toLowerCase());
    return { icon: cat?.icon || <Calculator size={24} />, color: cat?.color || "#2F3542" };
  };

  return (
    <Box className="container max-w-2xl mx-auto p-4">
      {/* Header */}
      <Box className="flex items-center mb-3">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </IconButton>
        <Typography className="header">Search Calculators</Typography>
      </Box>

      {/* Search Input */}
      <Box className="card flex items-center mb-3 p-2">
        <Search size={24} className="text-gray-500 mr-2" />
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search calculators..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{ disableUnderline: true }}
        />
      </Box>

      {/* Calculator List */}
      {filteredCalculators.length === 0 ? (
        <Alert severity="info" className="card text-center p-4">
          No calculators found.
        </Alert>
      ) : (
        <List className="card divide-y divide-gray-200">
          {filteredCalculators.map((item) => {
            const { icon, color } = getIconAndColor(item.category);
            return (
              <ListItem
                key={item.screen}
                button
                onClick={() => navigate(item.screen)}
                className="hover:bg-gray-100 rounded-lg"
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={item.category}
                  sx={{ textAlign: "left" }}
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default SearchCalculators;