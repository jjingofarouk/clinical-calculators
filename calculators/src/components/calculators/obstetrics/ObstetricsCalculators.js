import React, { useState } from "react";
import { Box, Tab, Tabs, TextField, Typography, Alert } from "@mui/material";
import BishopScore from "./BishopScore";
import EstimatedDueDate from "./EstimatedDueDate";
import GestationalAgeCalculator from "./GestationalAgeCalculator";
import GDMScreening from "./GDMScreening";
import VBACRiskCalculator from "./VBACRiskCalculator";

const ObstetricsCalculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const calculators = [
    { label: "Bishop Score", component: <BishopScore /> },
    { label: "Estimated Due Date (EDD)", component: <EstimatedDueDate /> },
    { label: "Gestational Age Calculator", component: <GestationalAgeCalculator /> },
    { label: "GDM Screening", component: <GDMScreening /> },
    { label: "VBAC Risk Calculator", component: <VBACRiskCalculator /> },
  ];

  const filteredCalculators = calculators.filter(calculator =>
    calculator.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabChange = (event, newValue) => {
    setSelectedCalculator(newValue);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      {/* Search Bar */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search calculators..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ bgcolor: "background.paper" }}
        />
      </Box>

      {/* Tabs for Calculator Selection */}
      {filteredCalculators.length > 0 ? (
        <>
          <Tabs
            value={selectedCalculator}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 2 }}
          >
            {filteredCalculators.map((calculator, index) => (
              <Tab key={index} label={calculator.label} />
            ))}
          </Tabs>

          {/* Calculator Body */}
          <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
            {filteredCalculators[selectedCalculator]?.component || (
              <Typography align="center" variant="body1" sx={{ color: "text.secondary" }}>
                Select a calculator to get started
              </Typography>
            )}
          </Box>
        </>
      ) : (
        <Alert severity="info">No calculators match your search query.</Alert>
      )}
    </Box>
  );
};

export default ObstetricsCalculators;