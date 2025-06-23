import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CrohnsDiseaseActivity = () => {
  const [abdominalPain, setAbdominalPain] = useState(0);
  const [stoolFrequency, setStoolFrequency] = useState(0);
  const [wellBeing, setWellBeing] = useState(0);
  const [complications, setComplications] = useState('None');
  const [extraintestinalManifestations, setExtraintestinalManifestations] = useState('None');

  const calculateCDAI = () => {
    let score = 0;
    score += abdominalPain;
    score += stoolFrequency * 5;
    score += wellBeing * 7;
    if (complications === 'Fistulas') score += 50;
    if (complications === 'Abscesses') score += 50;
    if (extraintestinalManifestations === 'Arthritis') score += 10;
    if (extraintestinalManifestations === 'Erythema Nodosum') score += 10;
    return score;
  };

  return (
    <Box className="p-5 bg-white min-h-screen">
      <Typography variant="h4" className="font-bold text-center mb-5">
        Crohn's Disease Activity Index (CDAI)
      </Typography>

      <Box className="mb-4">
        <TextField
          label="Abdominal Pain (0 to 3)"
          type="number"
          value={abdominalPain}
          onChange={(e) => setAbdominalPain(Number(e.target.value))}
          className="w-52"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box className="mb-4">
        <TextField
          label="Stool Frequency (per day)"
          type="number"
          value={stoolFrequency}
          onChange={(e) => setStoolFrequency(Number(e.target.value))}
          className="w-52"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box className="mb-4">
        <TextField
          label="Well-being (0 to 3)"
          type="number"
          value={wellBeing}
          onChange={(e) => setWellBeing(Number(e.target.value))}
          className="w-52"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Complications</InputLabel>
          <Select
            value={complications}
            onChange={(e) => setComplications(e.target.value)}
            label="Complications"
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Fistulas">Fistulas</MenuItem>
            <MenuItem value="Abscesses">Abscesses</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Extra-intestinal Manifestations</InputLabel>
          <Select
            value={extraintestinalManifestations}
            onChange={(e) => setExtraintestinalManifestations(e.target.value)}
            label="Extra-intestinal Manifestations"
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Arthritis">Arthritis</MenuItem>
            <MenuItem value="Erythema Nodosum">Erythema Nodosum</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6" className="font-bold text-green-600 mt-5 text-center">
        CDAI Score: {calculateCDAI()}
      </Typography>

      <Button
        variant="outlined"
        className="mt-4"
        onClick={() => {
          setAbdominalPain(0);
          setStoolFrequency(0);
          setWellBeing(0);
          setComplications('None');
          setExtraintestinalManifestations('None');
        }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default CrohnsDiseaseActivity;