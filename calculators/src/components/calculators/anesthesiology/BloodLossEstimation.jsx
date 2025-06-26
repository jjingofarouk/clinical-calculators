// src/calculators/BloodLossEstimation.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const BloodLossEstimation = () => {
  const [formData, setFormData] = useState({
    weight: '',
    initialHct: '',
    finalHct: '',
    bloodVolume: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    weight: { min: 0, max: 200, type: 'float', label: 'Weight (kg)' },
    initialHct: { min: 0, max: 60, type: 'float', label: 'Initial Hematocrit (%)' },
    finalHct: { min: 0, max: 60, type: 'float', label: 'Final Hematocrit (%)' },
    bloodVolume: { min: 0, max: 100, type: 'float', label: 'Estimated Blood Volume (mL/kg)' },
  };

  const helperText = {
    weight: 'Patient weight in kilograms.',
    initialHct: 'Initial hematocrit before surgery (%).',
    finalHct: 'Final hematocrit after surgery (%).',
    bloodVolume: 'Estimated blood volume (mL/kg): Adults ~70 mL/kg, Children ~80 mL/kg, Neonates ~90 mL/kg.',
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
    const initialHct = parseFloat(formData.initialHct);
    const finalHct = parseFloat(formData.finalHct);
    const bloodVolumePerKg = parseFloat(formData.bloodVolume);
    const totalBloodVolume = weight * bloodVolumePerKg;
    const ebl = (totalBloodVolume * (initialHct - finalHct)) / ((initialHct + finalHct) / 2);

    let interpretation = `Estimated blood loss: ${ebl.toFixed(2)} mL. Consider transfusion if significant or if clinical signs of hypovolemia are present.`;

    setResult({ ebl: ebl.toFixed(2), interpretation });
  };

  const handleReset = () => {
    setFormData({ weight: '', initialHct: '', finalHct: '', bloodVolume: '' });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="card w-full max-w-2xl mx-auto p-6">
      <Typography variant="h6" className="header">Blood Loss Estimation Calculator</Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-400 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          Estimates intraoperative blood loss using hematocrit changes and estimated blood volume. (Source: Miller’s Anesthesia, 9th Edition)
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
          Calculate Blood Loss
        </Button>
        <Button variant="outlined" onClick={handleReset} className="w-full py-3">
          Reset
        </Button>
      </Box>

      {result && (
        <Box className="mt-6 pt-4 border-t border-gray-200">
          <Typography variant="h6" className="font-semibold text-gray-800 mb-2">Estimated Blood Loss</Typography>
          <Typography variant="body1" className="font-medium text-gray-900 mb-2">{result.ebl} mL</Typography>
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

export default BloodLossEstimation;