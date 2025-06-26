// src/calculators/TIVADosing.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import Select from 'react-select';
import { AlertCircle, Info } from 'lucide-react';

const TIVADosing = () => {
  const [formData, setFormData] = useState({
    weight: '',
    drug: '',
    infusionRate: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const drugs = [
    { value: 'propofol', label: 'Propofol (3-6 µg/kg/min)' },
    { value: 'dexmedetomidine', label: 'Dexmedetomidine (0.2-0.7 µg/kg/h)' },
    { value: 'remifentanil', label: 'Remifentanil (0.05-0.2 µg/kg/min)' },
  ];

  const ranges = {
    weight: { min: 0, max: 200, type: 'float', label: 'Weight (kg)' },
    infusionRate: { min: 0, max: 10, type: 'float', label: 'Infusion Rate' },
  };

  const helperText = {
    weight: 'Patient weight in kilograms for dosing calculation.',
    drug: 'Select the TIVA drug to calculate the appropriate infusion rate.',
    infusionRate: 'Desired infusion rate (adjust based on clinical context).',
  };

  const handleChange = (field) => (e) => {
    const value = field === 'drug' ? e.value : e.target.value;
    setFormData({ ...formData, [field]: value });

    if (field !== 'drug') {
      if (value === '') {
        setErrors({ ...errors, [field]: `${ranges[field].label} is required.` });
      } else {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
          setErrors({ ...errors, [field]: `${ranges[field].label} must be a number.` });
        } else if (numValue < ranges[field].min || numValue > ranges[field].max) {
          setErrors({ ...errors, [field]: `${ranges[field].label} must be between ${ranges[field].min} and ${ranges[field].max}.` });
        } else {
          setErrors({ ...errors, [field]: '' });
        }
      }
    }
  };

  const handleCalculate = () => {
    const newErrors = {};
    if (!formData.drug) newErrors.drug = 'Drug selection is required.';
    if (formData.weight === '') newErrors.weight = 'Weight is required.';
    else {
      const weightValue = parseFloat(formData.weight);
      if (isNaN(weightValue) || weightValue < ranges.weight.min || weightValue > ranges.weight.max) {
        newErrors.weight = `Weight must be between ${ranges.weight.min} and ${ranges.weight.max}.`;
      }
    }
    if (formData.infusionRate === '') newErrors.infusionRate = 'Infusion rate is required.';
    else {
      const rateValue = parseFloat(formData.infusionRate);
      if (isNaN(rateValue) || rateValue < ranges.infusionRate.min || rateValue > ranges.infusionRate.max) {
        newErrors.infusionRate = `Infusion rate must be between ${ranges.infusionRate.min} and ${ranges.infusionRate.max}.`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    const weight = parseFloat(formData.weight);
    const rate = parseFloat(formData.infusionRate);
    let dose, unit, interpretation;

    if (formData.drug === 'propofol') {
      dose = weight * rate * 60 / 1000; // mg/h
      unit = 'mg/h';
      interpretation = `Propofol infusion at ${rate} µg/kg/min results in ${dose.toFixed(2)} mg/h. Monitor for respiratory depression and hypotension.`;
    } else if (formData.drug === 'dexmedetomidine') {
      dose = weight * rate; // µg/h
      unit = 'µg/h';
      interpretation = `Dexmedetomidine infusion at ${rate} µg/kg/h results in ${dose.toFixed(2)} µg/h. Monitor for bradycardia and hypotension.`;
    } else {
      dose = weight * rate * 60 / 1000; // mg/h
      unit = 'mg/h';
      interpretation = `Remifentanil infusion at ${rate} µg/kg/min results in ${dose.toFixed(2)} mg/h. Monitor for respiratory depression and rapid offset.`;
    }

    setResult({ dose: dose.toFixed(2), unit, interpretation });
  };

  const handleReset = () => {
    setFormData({ weight: '', drug: '', infusionRate: '' });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="card w-full max-w-2xl mx-auto p-6">
      <Typography variant="h6" className="header">TIVA Dosing Calculator</Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-400 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          Calculates total intravenous anesthesia (TIVA) dosing for propofol, dexmedetomidine, or remifentanil. (Source: Miller’s Anesthesia, 9th Edition)
        </Typography>
      </Box>

      {hasErrors && (
        <Alert severity="warning" className="mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Please correct the errors below before calculating.
        </Alert>
      )}

      <Box className="mb-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">Drug</Typography>
        <Tooltip title={helperText.drug}>
          <Select
            options={drugs}
            value={drugs.find((opt) => opt.value === formData.drug)}
            onChange={handleChange('drug')}
            placeholder="Select Drug"
            className="w-full"
          />
        </Tooltip>
        {errors.drug && <Typography color="error" variant="caption">{errors.drug}</Typography>}
      </Box>

      <Box className="mb-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">Weight (kg)</Typography>
        <Tooltip title={helperText.weight}>
          <TextField
            fullWidth
            type="number"
            value={formData.weight}
            onChange={handleChange('weight')}
            placeholder="Enter weight"
            variant="outlined"
            error={!!errors.weight}
            helperText={errors.weight || helperText.weight}
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

      <Box className="mb-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">Infusion Rate</Typography>
        <Tooltip title={helperText.infusionRate}>
          <TextField
            fullWidth
            type="number"
            value={formData.infusionRate}
            onChange={handleChange('infusionRate')}
            placeholder="Enter infusion rate"
            variant="outlined"
            error={!!errors.infusionRate}
            helperText={errors.infusionRate || helperText.infusionRate}
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

      <Box className="flex gap-4">
        <Button
          variant="contained"
          onClick={handleCalculate}
          className="w-full py-3 btn-primary"
          disabled={hasErrors}
        >
          Calculate Dose
        </Button>
        <Button variant="outlined" onClick={handleReset} className="w-full py-3">
          Reset
        </Button>
      </Box>

      {result && (
        <Box className="mt-6 pt-4 border-t border-gray-200">
          <Typography variant="h6" className="font-semibold text-gray-800 mb-2">Dose</Typography>
          <Typography variant="body1" className="font-medium text-gray-900 mb-2">
            {result.dose} {result.unit}
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

export default TIVADosing;