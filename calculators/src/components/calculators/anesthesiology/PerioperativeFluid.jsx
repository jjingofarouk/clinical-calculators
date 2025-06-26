// src/calculators/PerioperativeFluid.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const PerioperativeFluid = () => {
  const [formData, setFormData] = useState({
    weight: '',
    fastingHours: '',
    surgeryDuration: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    weight: { min: 0, max: 200, type: 'float', label: 'Weight (kg)' },
    fastingHours: { min: 0, max: 24, type: 'float', label: 'Fasting Hours' },
    surgeryDuration: { min: 0, max: 24, type: 'float', label: 'Surgery Duration (hours)' },
  };

  const helperText = {
    weight: 'Patient weight in kilograms.',
    fastingHours: 'Duration of preoperative fasting in hours.',
    surgeryDuration: 'Expected duration of surgery in hours.',
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });

    if (value === '') {
      setErrors({ ...errors, [field]: `${ranges[field].label} is required.` });
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setErrors({ ...errors, [field]: `${ranges[field].label} must be a number.` });
    } else if (numValue < ranges[field].min || numValue > ranges[field].max) {
      setErrors({ ...errors, [field]: `${ranges[field].label} must be between ${ranges[field].min} and ${ranges[field].max}.` });
    } else {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleCalculate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (formData[field] === '') {
        newErrors[field] = `${ranges[field].label} is required.`;
      } else {
        const numValue = parseFloat(formData[field]);
        if (isNaN(numValue) || numValue < ranges[field].min || numValue > ranges[field].max) {
          newErrors[field] = `${ranges[field].label} must be between ${ranges[field].min} and ${ranges[field].max}.`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    const weight = parseFloat(formData.weight);
    const fastingHours = parseFloat(formData.fastingHours);
    const surgeryDuration = parseFloat(formData.surgeryDuration);

    const deficit = weight * fastingHours * 2; // 2 mL/kg/h fasting deficit
    const maintenance = weight * 4; // First 10 kg
    if (weight > 10) maintenance += (weight - 10) * 2; // Next 10 kg
    if (weight > 20) maintenance += (weight - 20) * 1; // Remaining kg
    const intraoperative = weight * surgeryDuration * 5; // 5 mL/kg/h for moderate surgery
    const totalFluid = deficit + maintenance + intraoperative;

    let interpretation = `Total perioperative fluid: ${totalFluid.toFixed(2)} mL. Administer crystalloids (e.g., LR) and monitor urine output and hemodynamics.`;

    setResult({ totalFluid: totalFluid.toFixed(2), interpretation });
  };

  const handleReset = () => {
    setFormData({ weight: '', fastingHours: '', surgeryDuration: '' });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="card w-full max-w-2xl mx-auto p-6">
      <Typography variant="h6" className="header">Perioperative Fluid Calculator</Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-400 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          Calculates perioperative fluid requirements using the 4-2-1 rule and fasting deficit. (Source: Miller’s Anesthesia, 9th Edition)
        </Typography>
      </Box>

      {hasErrors && (
        <Alert severity="warning" className="mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Please correct the errors below before calculating.
        </Alert>
      )}

      {Object.keys(formData).map((field) => (
        <Box key={field} className="mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">{ranges[field].label}</Typography>
          <Tooltip title={helperText[field]}>
            <TextField
              fullWidth
              type="number"
              value={formData[field]}
              onChange={handleChange(field)}
              placeholder={`Range: ${ranges[field].min}-${ranges[field].max}`}
              variant="outlined"
              error={!!errors[field]}
              helperText={errors[field] || helperText[field]}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#d1d5db' },
                  '&:hover fieldset': { borderColor: '#0d9488' },
                  '&.Mui-focused fieldset': { borderColor: '#0d9488' },
                },
              }}
            />
          </Tooltip>
        </Box>
      ))}

      <Box className="flex gap-4">
        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3 btn-primary"
          disabled={hasErrors}
        >
          Calculate Fluid Requirements
        </Button>
        <Button variant="outlined" onClick={handleReset} className="w-full py-3">
          Reset
        </Button>
      </Box>

      {result && (
        <Box className="mt-6 pt-4 border-t border-gray-200">
          <Typography variant="h6" className="font-semibold text-gray-800 mb-2">Total Fluid Requirement</Typography>
          <Typography variant="body1" className="font-medium text-gray-900 mb-2">{result.totalFluid} mL</Typography>
          <Typography variant="body2" className="text-gray-600 mt-2">
            <strong>Interpretation:</strong> {result.interpretation}
          </Typography>
          <Box className="flex items-center mt-2">
            <Info className="w-4 h-4 text-teal-400 mr-1" />
            <Typography variant="body2" className="text-gray-600">
              Source: Miller’s Anesthesia, 9th Edition
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PerioperativeFluid;