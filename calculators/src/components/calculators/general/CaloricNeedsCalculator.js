import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Select from 'react-select';

const CaloricNeedsCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState({ value: 'male', label: 'Male' });
  const [caloricNeeds, setCaloricNeeds] = useState(null);

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const calculateCaloricNeeds = () => {
    let bmr;
    if (gender.value === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    const activityFactor = 1.2; // Sedentary activity level
    setCaloricNeeds((bmr * activityFactor).toFixed(2));
  };

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center p-5">
      <Typography variant="h4" className="font-bold mb-5">
        Caloric Needs Calculator
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

      <Box className="w-full max-w-[400px] mb-5">
        <Select
          options={genderOptions}
          value={gender}
          onChange={setGender}
          placeholder="Select Gender"
        />
      </Box>

      <Button
        variant="contained"
        onClick={calculateCaloricNeeds}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Calculate Caloric Needs
      </Button>

      {caloricNeeds && (
        <Typography variant="h6" className="mt-5">
          Your caloric needs are: {caloricNeeds} calories/day
        </Typography>
      )}
    </Box>
  );
};

export default CaloricNeedsCalculator;