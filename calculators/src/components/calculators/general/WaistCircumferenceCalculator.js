import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const WaistCircumferenceCalculator = () => {
  const [waistCircumference, setWaistCircumference] = useState('');
  const [risk, setRisk] = useState('');

  const calculateRisk = () => {
    if (waistCircumference) {
      if (waistCircumference > 94) {
        setRisk('Increased risk of metabolic complications.');
      } else {
        setRisk('Normal risk.');
      }
    }
  };

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center p-5">
      <Typography variant="h4" className="font-bold mb-5">
        Waist Circumference Calculator
      </Typography>

      <TextField
        fullWidth
        type="number"
        placeholder="Waist Circumference (cm)"
        value={waistCircumference}
        onChange={(e) => setWaistCircumference(e.target.value)}
        variant="outlined"
        className="mb-5"
        sx={{ maxWidth: '400px', backgroundColor: '#fff', borderRadius: 1 }}
      />

      <Button
        variant="contained"
        onClick={calculateRisk}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Calculate Risk
      </Button>

      {risk && (
        <Typography variant="h6" className="mt-5">
          {risk}
        </Typography>
      )}
    </Box>
  );
};

export default WaistCircumferenceCalculator;