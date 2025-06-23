import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const GIBleedingRisk = () => {
  const [hemoglobin, setHemoglobin] = useState('');
  const [bloodUrea, setBloodUrea] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [age, setAge] = useState('');
  const [melena, setMelena] = useState('No');
  const [syncope, setSyncope] = useState('No');

  const calculateGBScore = () => {
    const hgb = parseFloat(hemoglobin);
    const urea = parseFloat(bloodUrea);
    const sbp = parseFloat(systolicBP);
    const patientAge = parseFloat(age);

    if (
      isNaN(hgb) || isNaN(urea) || isNaN(sbp) || isNaN(patientAge) ||
      hgb <= 0 || urea <= 0 || sbp <= 0 || patientAge <= 0
    ) {
      return 'Please enter valid numbers for all inputs.';
    }

    let score = 0;
    if (hgb < 10) score += 6;
    if (hgb >= 10 && hgb < 12) score += 3;
    if (urea > 20) score += 6;
    if (urea > 10 && urea <= 20) score += 3;
    if (sbp < 90) score += 3;
    if (sbp >= 90 && sbp < 100) score += 2;
    if (patientAge > 65) score += 1;
    if (melena === 'Yes') score += 1;
    if (syncope === 'Yes') score += 3;

    return score;
  };

  return (
    <Box className="p-5 bg-white min-h-screen">
      <Typography variant="h4" className="font-bold text-center mb-5">
        Gastrointestinal Bleeding Risk Score
      </Typography>

      <Box className="mb-4">
        <TextField
          label="Hemoglobin (g/dL)"
          type="number"
          value={hemoglobin}
          onChange={(e) => setHemoglobin(e.target.value)}
          className="w-52"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box className="mb-4">
        <TextField
          label="Blood Urea (mmol/L)"
          type="number"
          value={bloodUrea}
          onChange={(e) => setBloodUrea(e.target.value)}
          className="w-52"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box className="mb-4">
        <TextField
          label="Systolic Blood Pressure (mmHg)"
          type="number"
          value={systolicBP}
          onChange={(e) => setSystolicBP(e.target.value)}
          className="w-52"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box className="mb-4">
        <TextField
          label="Age (years)"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-52"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Melena (Black stools)</InputLabel>
          <Select
            value={melena}
            onChange={(e) => setMelena(e.target.value)}
            label="Melena (Black stools)"
          >
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Syncope (Fainting)</InputLabel>
          <Select
            value={syncope}
            onChange={(e) => setSyncope(e.target.value)}
            label="Syncope (Fainting)"
          >
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6" className="font-bold text-green-600 mt-5 text-center">
        Glasgow-Blatchford Score: {calculateGBScore()}
      </Typography>

      <Button
        variant="outlined"
        className="mt-4"
        onClick={() => {
          setHemoglobin('');
          setBloodUrea('');
          setSystolicBP('');
          setAge('');
          setMelena('No');
          setSyncope('No');
        }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default GIBleedingRisk;