import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const BarrettsEsophagusRisk = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [refluxSymptoms, setRefluxSymptoms] = useState('No');
  const [familyHistory, setFamilyHistory] = useState('No');

  const calculateRisk = () => {
    const patientAge = parseInt(age, 10);
    let riskScore = 0;

    if (isNaN(patientAge) || patientAge <= 0) {
      return 'Please enter a valid age.';
    }

    if (patientAge > 50) {
      riskScore += 2;
    } else if (patientAge >= 40) {
      riskScore += 1;
    }

    if (gender === 'Male') {
      riskScore += 2;
    }

    if (refluxSymptoms === 'Yes') {
      riskScore += 2;
    }

    if (familyHistory === 'Yes') {
      riskScore += 2;
    }

    return `Risk Score: ${riskScore}`;
  };

  return (
    <Box className="p-5 bg-white min-h-screen">
      <Typography variant="h4" className="font-bold text-center mb-5">
        Barrett's Esophagus Risk Calculator
      </Typography>

      <Box className="mb-4">
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-52"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            label="Gender"
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Reflux Symptoms</InputLabel>
          <Select
            value={refluxSymptoms}
            onChange={(e) => setRefluxSymptoms(e.target.value)}
            label="Reflux Symptoms"
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Family History</InputLabel>
          <Select
            value={familyHistory}
            onChange={(e) => setFamilyHistory(e.target.value)}
            label="Family History"
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6" className="font-bold text-green-600 mt-5 text-center">
        {calculateRisk()}
      </Typography>

      <Button
        variant="outlined"
        className="mt-4"
        onClick={() => {
          setAge('');
          setGender('Male');
          setRefluxSymptoms('No');
          setFamilyHistory('No');
        }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default BarrettsEsophagusRisk;