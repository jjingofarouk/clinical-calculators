import React, { useState } from 'react';
import { Box, Slider, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PainAssessmentScales = () => {
  const [scale, setScale] = useState('NRS');
  const [score, setScore] = useState(0);

  const handleScaleChange = (event) => {
    setScale(event.target.value);
    setScore(0);
  };

  const handleScoreChange = (event, newValue) => {
    setScore(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Pain Assessment Scales</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Assesses pain intensity using Numeric Rating Scale (NRS), Visual Analog Scale (VAS), or Verbal Rating Scale (VRS). Select a scale and input score. Use to guide analgesia.
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Scale Type</InputLabel>
        <Select value={scale} onChange={handleScaleChange}>
          <MenuItem value="NRS">Numeric Rating Scale (NRS)</MenuItem>
          <MenuItem value="VAS">Visual Analog Scale (VAS)</MenuItem>
          <MenuItem value="VRS">Verbal Rating Scale (VRS)</MenuItem>
        </Select>
      </FormControl>
      {scale === 'NRS' && (
        <>
          <Typography>NRS: 0 (no pain) to 10 (worst pain)</Typography>
          <Slider
            value={score}
            onChange={handleScoreChange}
            min={0}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
            sx={{ mt: 2 }}
          />
        </>
      )}
      {scale === 'VAS' && (
        <>
          <Typography>VAS: 0 mm (no pain) to 100 mm (worst pain)</Typography>
          <Slider
            value={score}
            onChange={handleScoreChange}
            min={0}
            max={100}
            step={1}
            valueLabelDisplay="auto"
            sx={{ mt: 2 }}
          />
        </>
      )}
      {scale === 'VRS' && (
        <>
          <Typography>VRS: Select verbal descriptor</Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Verbal Rating</InputLabel>
            <Select value={score} onChange={(e) => setScore(e.target.value)}>
              <MenuItem value={0}>No pain</MenuItem>
              <MenuItem value={1}>Mild pain</MenuItem>
              <MenuItem value={2}>Moderate pain</MenuItem>
              <MenuItem value={3}>Severe pain</MenuItem>
              <MenuItem value={4}>Very severe pain</MenuItem>
            </Select>
          </FormControl>
        </>
      )}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Score: {scale === 'VRS' ? ['No pain', 'Mild pain', 'Moderate pain', 'Severe pain', 'Very severe pain'][score] : score}
      </Typography>
      <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
        Source: Hawker GA, et al. Arthritis Care Res 2011;63(S11):S240-52<br />
        References: Breivik H, et al. Br J Anaesth 2008;101(1):17-24; Jensen MP, et al. J Pain 2003;4(8):407-14
      </Typography>
    </Box>
  );
};

export default PainAssessmentScales;