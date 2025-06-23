import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const HepaticEncephalopathy = () => {
  const [grade, setGrade] = useState('0');

  const calculateScore = () => {
    switch (grade) {
      case '0':
        return "Grade 0: No encephalopathy";
      case '1':
        return "Grade 1: Mild confusion, disorientation, or altered sleep pattern";
      case '2':
        return "Grade 2: More marked confusion, lethargy, or personality changes";
      case '3':
        return "Grade 3: Severe confusion, stupor, or inability to follow commands";
      case '4':
        return "Grade 4: Coma";
      default:
        return "Select a grade";
    }
  };

  return (
    <Box className="p-5 bg-white min-h-screen">
      <Typography variant="h4" className="font-bold text-center mb-5">
        Hepatic Encephalopathy Grading Scale
      </Typography>

      <Box className="mb-4">
        <FormControl className="w-52">
          <InputLabel>Grade of Encephalopathy</InputLabel>
          <Select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            label="Grade of Encephalopathy"
          >
            <MenuItem value="0">Grade 0</MenuItem>
            <MenuItem value="1">Grade 1</MenuItem>
            <MenuItem value="2">Grade 2</MenuItem>
            <MenuItem value="3">Grade 3</MenuItem>
            <MenuItem value="4">Grade 4</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6" className="font-bold text-green-600 mt-5 text-center">
        {calculateScore()}
      </Typography>
    </Box>
  );
};

export default HepaticEncephalopathy;