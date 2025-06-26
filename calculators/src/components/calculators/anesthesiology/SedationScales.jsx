import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

const SedationScales = () => {
  const [scale, setScale] = useState('RASS');
  const [score, setScore] = useState('');

  const rassOptions = [
    { value: 4, label: '+4: Combative' },
    { value: 3, label: '+3: Very agitated' },
    { value: 2, label: '+2: Agitated' },
    { value: 1, label: '+1: Restless' },
    { value: 0, label: '0: Alert and calm' },
    { value: -1, label: '-1: Drowsy' },
    { value: -2, label: '-2: Light sedation' },
    { value: -3, label: '-3: Moderate sedation' },
    { value: -4, label: '-4: Deep sedation' },
    { value: -5, label: '-5: Unarousable' }
  ];

  const ramsayOptions = [
    { value: 1, label: '1: Anxious, agitated, restless' },
    { value: 2, label: '2: Cooperative, oriented, tranquil' },
    { value: 3, label: '3: Responds to commands only' },
    { value: 4, label: '4: Brisk response to light glabellar tap' },
    { value: 5, label: '5: Sluggish response to light glabellar tap' },
    { value: 6, label: '6: No response' }
  ];

  const handleScaleChange = (event) => {
    setScale(event.target.value);
    setScore('');
  };

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Sedation Scales (RASS, Ramsay)</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Assesses sedation level in ICU or procedural settings. RASS (Richmond Agitation-Sedation Scale) or Ramsay Scale guides titration of sedatives to achieve target sedation.
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Scale Type</InputLabel>
        <Select value={scale} onChange={handleScaleChange}>
          <MenuItem value="RASS">Richmond Agitation-Sedation Scale (RASS)</MenuItem>
          <MenuItem value="Ramsay">Ramsay Sedation Scale</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Score</InputLabel>
        <Select value={score} onChange={handleScoreChange}>
          {(scale === 'RASS' ? rassOptions : ramsayOptions).map(option => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="body2">
        Selected: {score ? (scale === 'RASS' ? rassOptions.find(o => o.value === score).label : ramsayOptions.find(o => o.value === score).label) : 'Select a score'}
      </Typography>
      <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
        Source: Sessler CN, et al. Am J Respir Crit Care Med 2002;166(10):1338-44 (RASS); Ramsay MA, et al. BMJ 1974;2(5920):656-9<br />
        References: Barr J, et al. Crit Care Med 2013;41(9):263-306
      </Typography>
    </Box>
  );
};

export default SedationScales;