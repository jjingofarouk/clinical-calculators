// LeesRevisedCardiacRiskIndex.js
import React, { useState } from 'react';
import { TextField, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';

const LeesRevisedCardiacRiskIndex = () => {
  const [highRiskSurgery, setHighRiskSurgery] = useState(false);
  const [ischemicHeartDisease, setIschemicHeartDisease] = useState(false);
  const [congestiveHeartFailure, setCongestiveHeartFailure] = useState(false);
  const [cerebrovascularDisease, setCerebrovascularDisease] = useState(false);
  const [preoperativeInsulin, setPreoperativeInsulin] = useState(false);
  const [preoperativeCreatinine, setPreoperativeCreatinine] = useState('');

  const calculateRisk = () => {
    let score = 0;
    if (highRiskSurgery) score += 1;
    if (ischemicHeartDisease) score += 1;
    if (congestiveHeartFailure) score += 1;
    if (cerebrovascularDisease) score += 1;
    if (preoperativeInsulin) score += 1;
    if (preoperativeCreatinine && parseFloat(preoperativeCreatinine) > 2.0) score += 1;
    
    let risk = '';
    if (score === 0) risk = '0.4% risk of major cardiac complications';
    else if (score === 1) risk = '0.9% risk';
    else if (score === 2) risk = '7% risk';
    else risk = '11% risk';
    
    return { score, risk };
  };

  const { score, risk } = calculateRisk();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Lee's Revised Cardiac Risk Index
      </Typography>
      <FormControlLabel
        control={<Checkbox checked={highRiskSurgery} onChange={(e) => setHighRiskSurgery(e.target.checked)} />}
        label="High-risk surgery (intraperitoneal, intrathoracic, or suprainguinal vascular)"
      />
      <FormControlLabel
        control={<Checkbox checked={ischemicHeartDisease} onChange={(e) => setIschemicHeartDisease(e.target.checked)} />}
        label="History of ischemic heart disease"
      />
      <FormControlLabel
        control={<Checkbox checked={congestiveHeartFailure} onChange={(e) => setCongestiveHeartFailure(e.target.checked)} />}
        label="History of congestive heart failure"
      />
      <FormControlLabel
        control={<Checkbox checked={cerebrovascularDisease} onChange={(e) => setCerebrovascularDisease(e.target.checked)} />}
        label="History of cerebrovascular disease"
      />
      <FormControlLabel
        control={<Checkbox checked={preoperativeInsulin} onChange={(e) => setPreoperativeInsulin(e.target.checked)} />}
        label="Preoperative insulin therapy"
      />
      <TextField
        label="Preoperative creatinine (mg/dL)"
        type="number"
        value={preoperativeCreatinine}
        onChange={(e) => setPreoperativeCreatinine(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Score: {score}
      </Typography>
      <Typography variant="h6" sx={{ mt: 1 }}>
        {risk}
      </Typography>
    </Box>
  );
};

export default LeesRevisedCardiacRiskIndex;