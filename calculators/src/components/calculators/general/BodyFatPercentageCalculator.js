import React, { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const BodyFatPercentageCalculator = () => {
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [bodyFatPercentage, setBodyFatPercentage] = useState(null);

  const calculateBodyFatPercentage = () => {
    let bodyFat;
    if (gender === 'male') {
      bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
      bodyFat = 163.205 * Math.log10(waist - neck) - 97.684 * Math.log10(height) - 78.387;
    }
    setBodyFatPercentage(bodyFat.toFixed(2));
  };

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center p-5 bg-gray-100">
      <Typography variant="h4" className="font-bold mb-5 text-gray-900">
        Body Fat Percentage Calculator
      </Typography>

      <TextField
        fullWidth
        type="number"
        placeholder="Waist (cm)"
        value={waist}
        onChange={(e) => setWaist(e.target.value)}
        variant="outlined"
        className="mb-5"
        sx={{ maxWidth: '400px', backgroundColor: '#fff', borderRadius: 1 }}
      />

      <TextField
        fullWidth
        type="number"
        placeholder="Neck (cm)"
        value={neck}
        onChange={(e) => setNeck(e.target.value)}
        variant="outlined"
        className="mb-5"
        sx={{ maxWidth: '400px', backgroundColor: '#fff', borderRadius: 1 }}
      />

      <TextField
        fullWidth
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        variant="outlined"
        className="mb-5"
        sx={{ maxWidth: '400px', backgroundColor: '#fff', borderRadius: 1 }}
      />

      <FormControl fullWidth className="mb-5" sx={{ maxWidth: '400px' }}>
        <InputLabel>Gender</InputLabel>
        <Select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          label="Gender"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={calculateBodyFatPercentage}
        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded"
      >
        Calculate Body Fat Percentage
      </Button>

      {bodyFatPercentage && (
        <Typography variant="h6" className="mt-5 font-bold text-teal-500">
          Your Body Fat Percentage is: {bodyFatPercentage}%
        </Typography>
      )}
    </Box>
  );
};

export default BodyFatPercentageCalculator;