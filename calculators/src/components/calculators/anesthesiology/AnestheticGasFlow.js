// src/calculators/AnestheticGasFlow.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const AnestheticGasFlow = () => {
  const [formData, setFormData] = useState({
    minuteVentilation: '',
    concentration: '',
    freshGasFlow: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    minuteVentilation: { min: 0, max: 20, type: 'float', label: 'Minute Ventilation (L/min)' },
    concentration: { min: 0, max: 8, type: 'float', label: 'Anesthetic Concentration (%)' },
    freshGasFlow: { min: 0, max: 15, type: 'float', label: 'Fresh Gas Flow (L/min)' },
  };

  const helperText = {
    minuteVentilation: 'Minute ventilation (tidal volume × respiratory rate) in liters per minute.',
    concentration: 'Desired concentration of volatile anesthetic (e.g., sevoflurane, isoflurane) in percentage.',
    freshGasFlow: 'Total fresh gas flow delivered to the anesthesia circuit in liters per minute.',
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
        if (isNaN(numValue)) {
          newErrors[field] = `${ranges[field].label} must be a number.`;
        } else if (numValue < ranges[field].min || numValue > ranges[field].max) {
          newErrors[field] = `${ranges[field].label} must be between ${ranges[field].min} and ${ranges[field].max}.`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    const mv = parseFloat(formData.minuteVentilation);
    const conc = parseFloat(formData.concentration) / 100;
    const fgf = parseFloat(formData.freshGasFlow);
    const vaporizerFlow = (mv * conc) / (1 - conc);
    const totalFlow = vaporizerFlow + fgf;

    let interpretation = `Required vaporizer flow: ${vaporizerFlow.toFixed(2)} L/min. Total flow with fresh gas: ${totalFlow.toFixed(2)} L/min. Adjust vaporizer settings accordingly.`;

    setResult({ vaporizerFlow: vaporizerFlow.toFixed(2), totalFlow: totalFlow.toFixed(2), interpretation });
  };

  const handleReset = () => {
    setFormData({ minuteVentilation: '', concentration: '', freshGasFlow: '' });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="card w-full max-w-2xl mx-auto p-6">
      <Typography variant="h6" className="header">Anesthetic Gas Flow Calculator</Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-400 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          Calculates the required vaporizer flow for volatile anesthetics based on minute ventilation and desired concentration. (Source: Miller’s Anesthesia, 9th Edition)
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
          Calculate Gas Flow
        </Button>
        <Button variant="outlined" onClick={handleReset} className="w-full py-3">
          Reset
        </Button>
      </Box>

      {result && (
        <Box className="mt-6 pt-4 border-t border-gray-200">
          <Typography variant="h6" className="font-semibold text-gray-800 mb-2">Results</Typography>
          <Typography variant="body1" className="font-medium text-gray-900 mb-2">
            Vaporizer Flow: {result.vaporizerFlow} L/min
          </Typography>
          <Typography variant="body1" className="font-medium text-gray-900 mb-2">
            Total Flow: {result.totalFlow} L/min
          </Typography>
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

export default AnestheticGasFlow;