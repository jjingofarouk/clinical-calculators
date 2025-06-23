import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, TextField, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';
import MELDScore from "./MELD";
import ChildPughScore from "./ChildPughScore";
import RansonsCriteria from "./RansonsCriteria";
import RockallScore from "./RockallScore";
import GlasgowBlatchfordScore from "./GlasgowBlatchfordScore";
import BISAPCalculator from "./BISAPCalculator";
import FIB4Calculator from "./FIB4Calculator";

const CALCULATORS = [
  "MELD Score",
  "Child-Pugh Score",
  "Ranson's Criteria",
  "Rockall Score",
  "Glasgow Blatchford Score",
  "BISAP Calculator",
  "FIB4 Calculator",
];

const GastroenterologyCalculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState("MELD Score");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCalculators, setFilteredCalculators] = useState(CALCULATORS);

  useEffect(() => {
    const filtered = CALCULATORS.filter(calculator =>
      calculator.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCalculators(filtered);
  }, [searchQuery]);

  const handleCalculatorSelect = (event, newValue) => {
    setSelectedCalculator(newValue);
  };

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case "MELD Score":
        return <MELDScore />;
      case "Child-Pugh Score":
        return <ChildPughScore />;
      case "Ranson's Criteria":
        return <RansonsCriteria />;
      case "Rockall Score":
        return <RockallScore />;
      case "Glasgow Blatchford Score":
        return <GlasgowBlatchfordScore />;
      case "BISAP Calculator":
        return <BISAPCalculator />;
      case "FIB4 Calculator":
        return <FIB4Calculator />;
      default:
        return <Typography className="text-center mt-5 text-gray-600">Select a calculator to get started</Typography>;
    }
  };

  return (
    <Box className="bg-gray-100 min-h-screen">
      <Box className="p-4 bg-white">
        <TextField
          placeholder="Search calculators..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} className="text-gray-500" />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Box>

      <Tabs
        value={selectedCalculator}
        onChange={handleCalculatorSelect}
        variant="scrollable"
        scrollButtons="auto"
        className="bg-white border-b border-gray-200"
      >
        {filteredCalculators.map((calculator) => (
          <Tab
            key={calculator}
            label={calculator}
            value={calculator}
            className="text-gray-700"
            sx={{
              '&.Mui-selected': {
                color: '#27C7B8',
                fontWeight: '600',
              },
            }}
          />
        ))}
      </Tabs>

      <Box className="p-4">
        {filteredCalculators.length === 0 ? (
          <Typography className="text-center mt-5 text-gray-600">
            No calculators found matching "{searchQuery}"
          </Typography>
        ) : (
          renderCalculator()
        )}
      </Box>
    </Box>
  );
};

export default GastroenterologyCalculators;