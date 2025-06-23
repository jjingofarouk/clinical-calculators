import React, { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const BMRCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [bmr, setBmr] = useState(null);

  const calculateBMR = () => {
    let bmrValue;
    if (gender === 'male') {
      bmrValue = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmrValue = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    setBmr(bmrValue.toFixed(2));
  };

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center p-5">
      <Typography variant="h4" className="font-bold mb-5">
        BMR Calculator
      </Typography>

      <TextField
        fullWidth
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
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

      <TextField
        fullWidth
        type="number"
        placeholder="Age (years)"
        value={age}
        onChange={(e) => setAge(e.target.value)}
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
        onClick={calculateBMR}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Calculate BMR
      </Button>

      {bmr && (
        <Typography variant="h6" className="mt-5">
          Your BMR is: {bmr} calories/day
        </Typography>
      )}
    </Box>
  );
};

export default BMRCalculator;