import React, { useState } from 'react';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const UlcerativeColitisActivity = () => {
  const [stoolFrequency, setStoolFrequency] = useState(0);
  const [bloodInStool, setBloodInStool] = useState('None');
  const [generalCondition, setGeneralCondition] = useState('Good');

  const calculateUCAI = () => {
    let score = 0;

    if (stoolFrequency >= 1 && stoolFrequency <= 3) score += 1;
    if (stoolFrequency >= 4 && stoolFrequency <= 6) score += 2;
    if (stoolFrequency >= 7 && stoolFrequency <= 9) score += 3;
    if (stoolFrequency >= 10) score += 4;

    if (bloodInStool === 'Occasional') score += 2;
    if (bloodInStool === 'Severe') score += 4;

    if (generalCondition === 'Fair') score += 2;
    if (generalCondition === 'Poor') score += 4;

    return score;
  };

  const resetValues = () => {
    setStoolFrequency(0);
    setBloodInStool('None');
    setGeneralCondition('Good');
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Typography variant="h4" className="text-center text-blue-600 mb-4">
        Ulcerative Colitis Activity Index
      </Typography>

      {/* Stool Frequency */}
      <div className="mb-4">
        <TextField
          label="Stool Frequency (per day)"
          variant="outlined"
          type="number"
          value={stoolFrequency}
          onChange={(e) => setStoolFrequency(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Blood in Stool */}
      <FormControl fullWidth className="mb-4">
        <InputLabel>Blood in Stool</InputLabel>
        <Select
          value={bloodInStool}
          onChange={(e) => setBloodInStool(e.target.value)}
        >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Occasional">Occasional</MenuItem>
          <MenuItem value="Severe">Severe</MenuItem>
        </Select>
      </FormControl>

      {/* General Condition */}
      <FormControl fullWidth className="mb-4">
        <InputLabel>General Condition</InputLabel>
        <Select
          value={generalCondition}
          onChange={(e) => setGeneralCondition(e.target.value)}
        >
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Fair">Fair</MenuItem>
          <MenuItem value="Poor">Poor</MenuItem>
        </Select>
      </FormControl>

      {/* Display calculated UCAI score */}
      <Typography variant="h6" className="text-center text-green-600 mb-4">
        UCAI Score: {calculateUCAI()}
      </Typography>

      {/* Reset Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={resetValues}
        className="w-full"
      >
        Reset
      </Button>
    </div>
  );
};

export default UlcerativeColitisActivity;