import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const GERDSeverityScore = () => {
  const [frequency, setFrequency] = useState('None');
  const [duration, setDuration] = useState('None');
  const [impact, setImpact] = useState('None');
  const [heartburn, setHeartburn] = useState('No');
  const [regurgitation, setRegurgitation] = useState('No');

  const calculateGERDScore = () => {
    let score = 0;
    if (frequency === 'Occasional') score += 1;
    if (frequency === 'Frequent') score += 2;
    if (frequency === 'Constant') score += 3;
    if (duration === 'Days') score += 1;
    if (duration === 'Weeks') score += 2;
    if (duration === 'Months') score += 3;
    if (impact === 'Mild') score += 1;
    if (impact === 'Moderate') score += 2;
    if (impact === 'Severe') score += 3;
    if (heartburn === 'Yes') score += 2;
    if (regurgitation === 'Yes') score += 2;
    return score;
  };

  return (
    <Box className="p-5 bg-white min-h-screen">
      <Typography variant="h4" className="font-bold text-center mb-5">
        GERD Severity Score
      </Typography>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Frequency of Symptoms</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            label="Frequency of Symptoms"
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Occasional">Occasional</MenuItem>
            <MenuItem value="Frequent">Frequent</MenuItem>
            <MenuItem value="Constant">Constant</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Duration of Symptoms</InputLabel>
          <Select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            label="Duration of Symptoms"
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Days">Days</MenuItem>
            <MenuItem value="Weeks">Weeks</MenuItem>
            <MenuItem value="Months">Months</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Impact on Daily Life</InputLabel>
          <Select
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
            label="Impact on Daily Life"
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Mild">Mild</MenuItem>
            <MenuItem value="Moderate">Moderate</MenuItem>
            <MenuItem value="Severe">Severe</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Heartburn</InputLabel>
          <Select
            value={heartburn}
            onChange={(e) => setHeartburn(e.target.value)}
            label="Heartburn"
          >
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Regurgitation</InputLabel>
          <Select
            value={regurgitation}
            onChange={(e) => setRegurgitation(e.target.value)}
            label="Regurgitation"
          >
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6" className="font-bold text-green-600 mt-5 text-center">
        GERD Severity Score: {calculateGERDScore()} (Higher score indicates more severe symptoms)
      </Typography>
    </Box>
  );
};

export default GERDSeverityScore;