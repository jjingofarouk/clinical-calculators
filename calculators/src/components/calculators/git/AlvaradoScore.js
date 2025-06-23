import React, { useState } from 'react';
import Select from 'react-select';
import { TextField, Typography, Box, FormControl, InputLabel } from '@mui/material';

const AlvaradoScore = () => {
  const [painLocation, setPainLocation] = useState('');
  const [anorexia, setAnorexia] = useState('No');
  const [nausea, setNausea] = useState('No');
  const [reboundTenderness, setReboundTenderness] = useState('No');
  const [temperature, setTemperature] = useState('');
  const [leucocytosis, setLeucocytosis] = useState('No');

  const calculateAlvaradoScore = () => {
    let score = 0;
    if (painLocation === 'Right lower quadrant') score += 2;
    if (anorexia === 'Yes') score += 1;
    if (nausea === 'Yes') score += 1;
    if (reboundTenderness === 'Yes') score += 1;
    if (parseFloat(temperature) > 37.3) score += 1;
    if (leucocytosis === 'Yes') score += 2;
    return score;
  };

  const painOptions = [
    { value: '', label: 'Select Location' },
    { value: 'Right lower quadrant', label: 'Right lower quadrant' },
    { value: 'Other', label: 'Other' },
  ];

  const yesNoOptions = [
    { value: 'No', label: 'No' },
    { value: 'Yes', label: 'Yes' },
  ];

  return (
    <Box className="p-5 bg-white min-h-screen">
      <Typography variant="h4" className="font-bold text-center mb-5">
        Alvarado Score for Appendicitis
      </Typography>

      <Box className="mb-4">
        <FormControl fullWidth>
          <InputLabel shrink>Pain Location</InputLabel>
          <Select
            value={painOptions.find(option => option.value === painLocation)}
            onChange={option => setPainLocation(option.value)}
            options={painOptions}
            className="w-52 mt-2"
          />
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl fullWidth>
          <InputLabel shrink>Anorexia</InputLabel>
          <Select
            value={yesNoOptions.find(option => option.value === anorexia)}
            onChange={option => setAnorexia(option.value)}
            options={yesNoOptions}
            className="w-52 mt-2"
          />
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl fullWidth>
          <InputLabel shrink>Nausea</InputLabel>
          <Select
            value={yesNoOptions.find(option => option.value === nausea)}
            onChange={option => setNausea(option.value)}
            options={yesNoOptions}
            className="w-52 mt-2"
          />
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl fullWidth>
          <InputLabel shrink>Rebound Tenderness</InputLabel>
          <Select
            value={yesNoOptions.find(option => option.value === reboundTenderness)}
            onChange={option => setReboundTenderness(option.value)}
            options={yesNoOptions}
            className="w-52 mt-2"
          />
        </FormControl>
      </Box>

      <Box className="mb-4">
        <TextField
          label="Temperature (°C)"
          type="number"
          value={temperature}
          onChange={e => setTemperature(e.target.value)}
          className="w-52"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box className="mb-4">
        <FormControl fullWidth>
          <InputLabel shrink>Leucocytosis</InputLabel>
          <Select
            value={yesNoOptions.find(option => option.value === leucocytosis)}
            onChange={option => setLeucocytosis(option.value)}
            options={yesNoOptions}
            className="w-52 mt-2"
          />
        </FormControl>
      </Box>

      <Typography variant="h6" className="font-bold text-green-600 mt-5 text-center">
        Alvarado Score: {calculateAlvaradoScore()} (Lower score suggests less likelihood of appendicitis)
      </Typography>
    </Box>
  );
};

export default AlvaradoScore;