import React, { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const MifflinStJeorCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [caloricNeeds, setCaloricNeeds] = useState(null);

  const calculateMifflinStJeor = () => {
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    const activityFactor = 1.2;
    setCaloricNeeds((bmr * activityFactor).toFixed(2));
  };

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center p-5">
      <Typography variant="h4" className="font-bold mb-5">
        Mifflin-St Jeor Calculator
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
        onClick={calculateMifflinStJeor}
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

export default MifflinStJeorCalculator;