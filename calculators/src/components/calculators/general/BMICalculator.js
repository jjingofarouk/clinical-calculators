import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
  };

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center p-5">
      <Typography variant="h4" className="font-bold mb-5">
        BMI Calculator
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

      <Button
        variant="contained"
        onClick={calculateBMI}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Calculate BMI
      </Button>

      {bmi && (
        <Typography variant="h6" className="mt-5">
          Your BMI is: {bmi}
        </Typography>
      )}
    </Box>
  );
};

export default BMICalculator;