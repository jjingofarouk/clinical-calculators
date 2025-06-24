// GuptaMICAScore.js
import React, { useState } from 'react';
import { TextField, Typography, Box, FormControlLabel, Checkbox, Select, MenuItem } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const GuptaMICAScore = () => {
  const [age, setAge] = useState('');
  const [historyOfStroke, setHistoryOfStroke] = useState(false);
  const [historyOfMI, setHistoryOfMI] = useState(false);
  const [chf, setChf] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [creatinine, setCreatinine] = useState('');
  const [procedureRisk, setProcedureRisk] = useState('');

  const calculateScore = () => {
    let score = 0;
    if (age >= 60) score += 1;
    if (historyOfStroke) score += 1;
    if (historyOfMI) score += 1;
    if (chf) score += 1;
    if (diabetes) score += 1;
    if (creatinine && parseFloat(creatinine) > 2.0) score += 1;
    if (procedureRisk === 'high') score += 2;
    else if (procedureRisk === 'intermediate') score += 1;

    let risk = '';
    if (score <= 1) risk = '0.7% risk of MACE';
    else if (score === 2) risk = '2.4% risk';
    else if (score === 3) risk = '6.0% risk';
    else if (score === 4) risk = '12.1% risk';
    else risk = '21.5% risk';

    return { score, risk };
  };

  const { score, risk } = calculateScore();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <Info size={20} className="inline mr-2" />
        Gupta Myocardial Infarction or Cardiac Arrest (MICA) Score
      </Typography>
      
      <TextField
        label="Age (years)"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        fullWidth
        margin="normal"
      />
      
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <FormControlLabel
          control={<Checkbox checked={historyOfStroke} onChange={(e) => setHistoryOfStroke(e.target.checked)} />}
          label="History of stroke"
        />
        <FormControlLabel
          control={<Checkbox checked={historyOfMI} onChange={(e) => setHistoryOfMI(e.target.checked)} />}
          label="History of MI"
        />
        <FormControlLabel
          control={<Checkbox checked={chf} onChange={(e) => setChf(e.target.checked)} />}
          label="CHF"
        />
        <FormControlLabel
          control={<Checkbox checked={diabetes} onChange={(e) => setDiabetes(e.target.checked)} />}
          label="Diabetes"
        />
      </Box>

      <TextField
        label="Preoperative creatinine (mg/dL)"
        type="number"
        value={creatinine}
        onChange={(e) => setCreatinine(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Select
        value={procedureRisk}
        onChange={(e) => setProcedureRisk(e.target.value)}
        displayEmpty
        fullWidth
        margin="dense"
        className="mt-4"
      >
        <MenuItem value="">Select procedure risk</MenuItem>
        <MenuItem value="low">Low risk procedure</MenuItem>
        <MenuItem value="intermediate">Intermediate risk procedure</MenuItem>
        <MenuItem value="high">High risk procedure</MenuItem>
      </Select>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          Score: {score}
        </Typography>
        <Typography variant="body1" className="mt-2">
          {risk}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertCircle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          MACE = Major Adverse Cardiac Events (MI or cardiac arrest). Validated for non-cardiac surgery.
        </Typography>
      </Box>
    </Box>
  );
};

export default GuptaMICAScore;