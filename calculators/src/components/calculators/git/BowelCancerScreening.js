import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const BowelCancerScreening = () => {
  const [age, setAge] = useState('');
  const [familyHistory, setFamilyHistory] = useState('No');
  const [diet, setDiet] = useState('Unhealthy');
  const [smoking, setSmoking] = useState('No');
  const [symptoms, setSymptoms] = useState('No');
  const [screeningRecommendation, setScreeningRecommendation] = useState('');

  const calculateRisk = () => {
    let riskScore = 0;

    if (age >= 50 && age <= 74) {
      riskScore += 1;
    } else if (age > 74) {
      riskScore += 2;
    }

    if (familyHistory === 'Yes') {
      riskScore += 2;
    }

    if (diet === 'Unhealthy') {
      riskScore += 1;
    }

    if (smoking === 'Yes') {
      riskScore += 1;
    }

    if (symptoms === 'Yes') {
      riskScore += 2;
    }

    return riskScore;
  };

  const getScreeningRecommendation = () => {
    const score = calculateRisk();
    if (score >= 5) {
      return 'High Risk: Immediate referral for screening is recommended.';
    } else if (score >= 3) {
      return 'Moderate Risk: Screening is recommended within the next 1-2 years.';
    } else {
      return 'Low Risk: Screening is recommended at the usual intervals or based on physician advice.';
    }
  };

  const handleSubmit = () => {
    setScreeningRecommendation(getScreeningRecommendation());
  };

  return (
    <Box className="p-5 bg-white min-h-screen">
      <Typography variant="h4" className="font-bold text-center mb-5">
        Bowel Cancer Screening Tool
      </Typography>

      <Box className="mb-4">
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-52"
          InputLabelProps={{ shrink: true }}
          placeholder="Enter your age"
        />
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Family History of Bowel Cancer</InputLabel>
          <Select
            value={familyHistory}
            onChange={(e) => setFamilyHistory(e.target.value)}
            label="Family History of Bowel Cancer"
          >
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Diet</InputLabel>
          <Select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            label="Diet"
          >
            <MenuItem value="Unhealthy">Unhealthy</MenuItem>
            <MenuItem value="Healthy">Healthy</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Smoking</InputLabel>
          <Select
            value={smoking}
            onChange={(e) => setSmoking(e.target.value)}
            label="Smoking"
          >
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Bowel-Related Symptoms</InputLabel>
          <Select
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            label="Bowel-Related Symptoms"
          >
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        className="bg-blue-600 hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Get Screening Recommendation
      </Button>

      {screeningRecommendation && (
        <Typography variant="h6" className="font-bold text-green-600 mt-5 text-center">
          {screeningRecommendation}
        </Typography>
      )}
    </Box>
  );
};

export default BowelCancerScreening;