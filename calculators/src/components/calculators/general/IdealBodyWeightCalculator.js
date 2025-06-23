import React, { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const IdealBodyWeightCalculator = () => {
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [idealWeight, setIdealWeight] = useState(null);

  const calculateIdealWeight = () => {
    let idealWeightValue;
    if (gender === 'male') {
      idealWeightValue = 50 + 2.3 * ((height / 2.54) - 60);
    } else {
      idealWeightValue = 45.5 + 2.3 * ((height / 2.54) - 60);
    }
    setIdealWeight(idealWeightValue.toFixed(2));
  };

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center p-5 bg-gray-100">
      <Typography variant="h4" className="font-bold mb-5 text-gray-900">
        Ideal Body Weight Calculator
      </Typography>

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
        onClick={calculateIdealWeight}
        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded"
      >
        Calculate Ideal Weight
      </Button>

      {idealWeight && (
        <Typography variant="h6" className="mt-5 font-bold text-teal-500">
          Your Ideal Body Weight is: {idealWeight} kg
        </Typography>
      )}
    </Box>
  );
};

export default IdealBodyWeightCalculator;