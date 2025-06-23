import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const HepaticEncephalopathySeverity = () => {
  const [mentalState, setMentalState] = useState('');
  const [asterixis, setAsterixis] = useState('');
  const [levelOfConsciousness, setLevelOfConsciousness] = useState('');

  const calculateScore = () => {
    let score = 0;

    if (mentalState === 'Coma') score += 4;
    else if (mentalState === 'Confused') score += 3;
    else if (mentalState === 'Drowsy') score += 2;
    else if (mentalState === 'Normal') score += 0;

    if (asterixis === 'Present') score += 2;
    else if (asterixis === 'Absent') score += 0;

    if (levelOfConsciousness === 'Comatose') score += 4;
    else if (levelOfConsciousness === 'Somnolent') score += 2;
    else if (levelOfConsciousness === 'Alert') score += 0;

    return score;
  };

  return (
    <Box className="p-5 bg-white min-h-screen">
      <Typography variant="h4" className="font-bold text-center mb-5">
        Hepatic Encephalopathy Severity Score
      </Typography>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Mental State</InputLabel>
          <Select
            value={mentalState}
            onChange={(e) => setMentalState(e.target.value)}
            label="Mental State"
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="Drowsy">Drowsy</MenuItem>
            <MenuItem value="Confused">Confused</MenuItem>
            <MenuItem value="Coma">Coma</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Asterixis</InputLabel>
          <Select
            value={asterixis}
            onChange={(e) => setAsterixis(e.target.value)}
            label="Asterixis"
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Absent">Absent</MenuItem>
            <MenuItem value="Present">Present</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Level of Consciousness</InputLabel>
          <Select
            value={levelOfConsciousness}
            onChange={(e) => setLevelOfConsciousness(e.target.value)}
            label="Level of Consciousness"
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Alert">Alert</MenuItem>
            <MenuItem value="Somnolent">Somnolent</MenuItem>
            <MenuItem value="Comatose">Comatose</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6" className="font-bold text-green-600 mt-5 text-center">
        Severity Score: {calculateScore()}
      </Typography>

      <Button
        variant="outlined"
        className="mt-4"
        onClick={() => {
          setMentalState('');
          setAsterixis('');
          setLevelOfConsciousness('');
        }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default HepaticEncephalopathySeverity;