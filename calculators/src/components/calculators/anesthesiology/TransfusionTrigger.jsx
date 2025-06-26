// src/calculators/TransfusionTrigger.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const TransfusionTrigger = () => {
  const [formData, setFormData] = useState({
    hemoglobin: '',
    comorbidities: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    hemoglobin: { min: 0, max: 20, type: 'float', label: 'Hemoglobin (g/dL)' },
    comorbidities: { min: 0, max: 3, type: 'integer', label: 'Comorbidity Score (0-3)' },
  };

  const helperText = {
    hemoglobin: 'Current hemoglobin level in g/dL.',
    comorbidities: 'Score based on presence of cardiovascular disease, renal failure, or other significant comorbidities (0 = none, 1 = mild, 2 = moderate, 3 = severe).',
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
    } else if (field === 'comorbidities' && !Number.isInteger(numValue)) {
      setErrors({ ...errors, comorbidities: 'Comorbidity Score must be an integer.' });
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
        } else if (field === 'comorbidities' && !Number.isInteger(numValue)) {
          newErrors[field] = 'Comorbidity Score must be an integer.';
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    const hemoglobin = parseFloat(formData.hemoglobin);
    const comorbidities = parseInt(formData.comorbidities);
    let trigger, riskColor, interpretation;

    if (hemoglobin >= 10 || (hemoglobin >= 8 && comorbidities === 0)) {
      trigger = 'No Transfusion';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Transfusion not indicated based on hemoglobin and comorbidities.';
    } else if (hemoglobin >= 7 && comorbidities <= 1) {
      trigger = 'Consider Transfusion';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Transfusion may be indicated if clinical signs of anemia are present.';
    } else {
      trigger = 'Transfusion Recommended';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Transfusion recommended due to low hemoglobin and/or significant comorbidities.';
    }

    setResult({ trigger, riskColor, interpretation });
  };

  const handleReset = () => {
    setFormData({ hemoglobin: '', comorbidities: '' });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="card w-full max-w-2xl mx-auto p-6">
      <Typography variant="h6" className="header">Transfusion Trigger Calculator</Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-400 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          Determines need for blood transfusion based on hemoglobin and comorbidities. (Source: ASA Guidelines, 2015)
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
          Calculate Transfusion Trigger
        </Button>
        <Button variant="outlined" onClick={handleReset} className="w-full py-3">
          Reset
        </Button>
      </Box>

      {result && (
        <Box className="mt-6 pt-4 border-t border-gray-200">
          <Typography variant="h6" className="font-semibold text-gray-800 mb-2">Transfusion Recommendation</Typography>
          <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
            {result.trigger}
          </Typography>
          <Typography variant="body2" className="text-gray-600 mt-2">
            <strong>Interpretation:</strong> {result.interpretation}
          </Typography>
          <Box className="flex items-center mt-2">
            <Info className="w-4 h-4 text-teal-400 mr-1" />
            <Typography variant="body2" className="text-gray-600">
              Source: ASA Practice Guidelines for Perioperative Blood Management, 2015
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TransfusionTrigger;