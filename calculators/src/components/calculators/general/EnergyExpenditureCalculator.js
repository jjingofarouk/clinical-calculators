import React, { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const EnergyExpenditureCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [totalEnergyExpenditure, setTotalEnergyExpenditure] = useState(null);

  const calculateEnergyExpenditure = () => {
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    setTotalEnergyExpenditure((bmr * activityLevel).toFixed(2));
  };

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center p-5">
      <Typography variant="h4" className="font-bold mb-5">
        Energy Expenditure Calculator
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

      <FormControl fullWidth className="mb-5" sx={{ maxWidth: '400px' }}>
        <InputLabel>Activity Level</InputLabel>
        <Select
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          label="Activity Level"
        >
          <MenuItem value={1.2}>Sedentary</MenuItem>
          <MenuItem value={1.375}>Lightly Active</MenuItem>
          <MenuItem value={1.55}>Moderately Active</MenuItem>
          <MenuItem value={1.725}>Very Active</MenuItem>
          <MenuItem value={1.9}>Extra Active</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={calculateEnergyExpenditure}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Calculate Energy Expenditure
      </Button>

      {totalEnergyExpenditure && (
        <Typography variant="h6" className="mt-5">
          Your Total Energy Expenditure is: {totalEnergyExpenditure} calories/day
        </Typography>
      )}
    </Box>
  );
};

export default EnergyExpenditureCalculator;