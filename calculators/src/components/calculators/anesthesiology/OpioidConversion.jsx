import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

const OpioidConversion = () => {
  const [fromDrug, setFromDrug] = useState('');
  const [toDrug, setToDrug] = useState('');
  const [dose, setDose] = useState('');
  const [convertedDose, setConvertedDose] = useState('');

  const conversionFactors = {
    morphine: { iv: 1, oral: 3 },
    hydromorphone: { iv: 5, oral: 15 },
    fentanyl: { iv: 100, oral: 0 },
    oxycodone: { iv: 0, oral: 1.5 }
  };

  const calculateConversion = (from, to, dose) => {
    const d = parseFloat(dose);
    if (isNaN(d) || !from || !to) return '';
    const morphineIV = from.includes('oral') ? d / conversionFactors[from.replace('_oral', '')].oral : d / conversionFactors[from].iv;
    const converted = to.includes('oral') ? morphineIV * conversionFactors[to.replace('_oral', '')].oral : morphineIV * conversionFactors[to].iv;
    return `${converted.toFixed(2)} mg ${to.includes('oral') ? '(oral)' : '(IV)'}`;
  };

  const handleFromDrugChange = (event) => {
    setFromDrug(event.target.value);
    setConvertedDose(calculateConversion(event.target.value, toDrug, dose));
  };

  const handleToDrugChange = (event) => {
    setToDrug(event.target.value);
    setConvertedDose(calculateConversion(fromDrug, event.target.value, dose));
  };

  const handleDoseChange = (event) => {
    const value = event.target.value;
    setDose(value);
    setConvertedDose(calculateConversion(fromDrug, toDrug, value));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Opioid Conversion Calculator</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Converts opioid doses to equivalent doses of another opioid (IV or oral). Use with caution and adjust for patient factors (e.g., tolerance, renal function).
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>From Drug</InputLabel>
        <Select value={fromDrug} onChange={handleFromDrugChange}>
          <MenuItem value="morphine">Morphine IV</MenuItem>
          <MenuItem value="morphine_oral">Morphine Oral</MenuItem>
          <MenuItem value="hydromorphone">Hydromorphone IV</MenuItem>
          <MenuItem value="hydromorphone_oral">Hydromorphone Oral</MenuItem>
          <MenuItem value="fentanyl">Fentanyl IV</MenuItem>
          <MenuItem value="oxycodone_oral">Oxycodone Oral</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>To Drug</InputLabel>
        <Select value={toDrug} onChange={handleToDrugChange}>
          <MenuItem value="morphine">Morphine IV</MenuItem>
          <MenuItem value="morphine_oral">Morphine Oral</MenuItem>
          <MenuItem value="hydromorphone">Hydromorphone IV</MenuItem>
          <MenuItem value="hydromorphone_oral">Hydromorphone Oral</MenuItem>
          <MenuItem value="fentanyl">Fentanyl IV</MenuItem>
          <MenuItem value="oxycodone_oral">Oxycodone Oral</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Dose (mg)"
        type="number"
        value={dose}
        onChange={handleDoseChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Typography variant="body2">
        Converted Dose: {convertedDose || 'Select drugs and enter dose'}
      </Typography>
      <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
        Source: McPherson ML. Demystifying Opioid Conversion Calculations, 2nd ed., 2018<br />
        References: Pereira J, et al. J Pain Symptom Manage 2001;22(2):672-87; Shaheen PE, et al. J Pain Symptom Manage 2009;38(3):409-16
      </Typography>
    </Box>
  );
};

export default OpioidConversion;