import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const BristolStoolChart = () => {
  const [stoolType, setStoolType] = useState('1');

  const getStoolDescription = () => {
    switch (stoolType) {
      case '1':
        return "Type 1: Separate hard lumps, like nuts (difficult to pass)";
      case '2':
        return "Type 2: Sausage-shaped but lumpy";
      case '3':
        return "Type 3: Like a sausage but with cracks on the surface";
      case '4':
        return "Type 4: Like a sausage or snake, smooth and soft";
      case '5':
        return "Type 5: Soft blobs with clear-cut edges (passed easily)";
      case '6':
        return "Type 6: Fluffy pieces with ragged edges, a mushy stool";
      case '7':
        return "Type 7: Watery, no solid pieces (entirely liquid)";
      default:
        return "Select a stool type";
    }
  };

  return (
    <Box className="p-5 bg-white min-h-screen">
      <Typography variant="h4" className="font-bold text-center mb-5">
        Bristol Stool Chart
      </Typography>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Select Stool Type</InputLabel>
          <Select
            value={stoolType}
            onChange={(e) => setStoolType(e.target.value)}
            label="Select Stool Type"
          >
            <MenuItem value="1">Type 1</MenuItem>
            <MenuItem value="2">Type 2</MenuItem>
            <MenuItem value="3">Type 3</MenuItem>
            <MenuItem value="4">Type 4</MenuItem>
            <MenuItem value="5">Type 5</MenuItem>
            <MenuItem value="6">Type 6</MenuItem>
            <MenuItem value="7">Type 7</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6" className="font-bold text-green-600 mt-5 text-center">
        {getStoolDescription()}
      </Typography>
    </Box>
  );
};

export default BristolStoolChart;