import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

const PCADosing = () => {
  const [drug, setDrug] = useState('');
  const [weight, setWeight] = useState('');
  const [dose, setDose] = useState('');

  const calculatePCADose = (drug, w) => {
    const weight = parseFloat(w);
    if (isNaN(weight)) return '';
    if (drug === 'morphine') return `Bolus: ${(weight * 0.02).toFixed(2)} mg, Lockout: 6-10 min, 4h limit: ${(weight * 0.1).toFixed(2)} mg`;
    if (drug === 'hydromorphone') return `Bolus: ${(weight * 0.004).toFixed(2)} mg, Lockout: 6-10 min, 4h limit: ${(weight * 0.02).toFixed(2)} mg`;
    if (drug === 'fentanyl') return `Bolus: ${(weight * 0.2).toFixed(2)} µg, Lockout: 5-8 min, 4h limit: ${(weight * 1).toFixed(2)} µg`;
    return '';
  };

  const handleDrugChange = (event) => {
    const value = event.target.value;
    setDrug(value);
    setDose(calculatePCADose(value, weight));
  };

  const handleWeightChange = (event) => {
    const value = event.target.value;
    setWeight(value);
    setDose(calculatePCADose(drug, value));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Patient-Controlled Analgesia (PCA) Dosing Guidelines</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Provides initial PCA dosing for IV opioids based on patient weight. Adjust lockout interval and bolus dose based on pain control and side effects (e.g., respiratory depression).
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Opioid</InputLabel>
        <Select value={drug} onChange={handleDrugChange}>
          <MenuItem value="morphine">Morphine</MenuItem>
          <MenuItem value="hydromorphone">Hydromorphone</MenuItem>
          <MenuItem value="fentanyl">Fentanyl</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Patient Weight (kg)"
        type="number"
        value={weight}
        onChange={handleWeightChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Typography variant="body2">
        PCA Settings: {dose || 'Select drug and enter weight'}
      </Typography>
      <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
        Source: Macintyre PE. Br J Anaesth 2001;87(1):36-46<br />
        References: Grass JA. J Pain Symptom Manage 2005;29(5S):S47-58; American Pain Society Guidelines, 2016
      </Typography>
    </Box>
  );
};

export default PCADosing;