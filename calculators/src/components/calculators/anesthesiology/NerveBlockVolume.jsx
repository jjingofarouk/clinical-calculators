// src/calculators/NerveBlockVolume.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import Select from 'react-select';
import { AlertCircle, Info } from 'lucide-react';

const NerveBlockVolume = () => {
  const [formData, setFormData] = useState({
    blockType: '',
    weight: '',
    concentration: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const blockTypes = [
    { value: 'femoral', label: 'Femoral Nerve Block (20-30 mL)' },
    { value: 'sciatic', label: 'Sciatic Nerve Block (20-30 mL)' },
    { value: 'interscalene', label: 'Interscalene Block (15-20 mL)' },
  ];

  const ranges = {
    weight: { min: 0, max: 200, type: 'float', label: 'Weight (kg)' },
    concentration: { min: 0.1, max: 0.5, type: 'float', label: 'Local Anesthetic Concentration (%)' },
  };

  const helperText = {
    blockType: 'Select the type of peripheral nerve block.',
    weight: 'Patient weight in kilograms for safe dosing.',
    concentration: 'Concentration of local anesthetic (e.g., bupivacaine or ropivacaine) in percentage.',
  };

  const handleChange = (field) => (e) => {
    const value = field === 'blockType' ? e.value : e.target.value;
    setFormData({ ...formData, [field]: value });

    if (field !== 'blockType') {
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
    if (!formData.blockType) newErrors.blockType = 'Block type is required.';
    if (formData.weight === '') newErrors.weight = 'Weight is required.';
    else {
      const weightValue = parseFloat(formData.weight);
      if (isNaN(weightValue) || weightValue < ranges.weight.min || weightValue > ranges.weight.max) {
        newErrors.weight = `Weight must be between ${ranges.weight.min} and ${ranges.weight.max}.`;
      }
    }
    if (formData.concentration === '') newErrors.concentration = 'Concentration is required.';
    else {
      const concValue = parseFloat(formData.concentration);
      if (isNaN(concValue) || concValue < ranges.concentration.min || concValue > ranges.concentration.max) {
        newErrors.concentration = `Concentration must be between ${ranges.concentration.min} and ${ranges.concentration.max}.`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    const weight = parseFloat(formData.weight);
    const concentration = parseFloat(formData.concentration);
    let volume, maxDose;

    if (formData.blockType === 'interscalene') {
      volume = 15; // Typical volume
      maxDose = weight * 2 / (concentration / 100); // 2 mg/kg for bupivacaine
    } else {
      volume = 20; // Typical for femoral/sciatic
      maxDose = weight * 2 / (concentration / 100);
    }

    let interpretation = `Recommended volume: ${volume} mL. Maximum safe volume: ${maxDose.toFixed(2)} mL to avoid toxicity. Confirm with ultrasound guidance.`;

    setResult({ volume, maxDose: maxDose.toFixed(2), interpretation });
  };

  const handleReset = () => {
    setFormData({ blockType: '', weight: '', concentration: '' });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="card w-full max-w-2xl mx-auto p-6">
      <Typography variant="h6" className="header">Nerve Block Volume Calculator</Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-400 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          Calculates local anesthetic volume for peripheral nerve blocks. (Source: Hadzic’s Textbook of Regional Anesthesia, 2nd Edition)
        </Typography>
      </Box>

      {hasErrors && (
        <Alert severity="warning" className="mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Please correct the errors below before calculating.
        </Alert>
      )}

      <Box className="mb-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">Block Type</Typography>
        <Tooltip title={helperText.blockType}>
          <Select
            options={blockTypes}
            value={blockTypes.find((opt) => opt.value === formData.blockType)}
            onChange={handleChange('blockType')}
            placeholder="Select Block Type"
            className="w-full"
          />
        </Tooltip>
        {errors.blockType && <Typography color="error" variant="caption">{errors.blockType}</Typography>}
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
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">Local Anesthetic Concentration (%)</Typography>
        <Tooltip title={helperText.concentration}>
          <TextField
            fullWidth
            type="number"
            value={formData.concentration}
            onChange={handleChange('concentration')}
            placeholder="Enter concentration"
            variant="outlined"
            error={!!errors.concentration}
            helperText={errors.concentration || helperText.concentration}
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
          Calculate Volume
        </Button>
        <Button variant="outlined" onClick={handleReset} className="w-full py-3">
          Reset
        </Button>
      </Box>

      {result && (
        <Box className="mt-6 pt-4 border-t border-gray-200">
          <Typography variant="h6" className="font-semibold text-gray-800 mb-2">Results</Typography>
          <Typography variant="body1" className="font-medium text-gray-900 mb-2">
            Recommended Volume: {result.volume} mL
          </Typography>
          <Typography variant="body1" className="font-medium text-gray-900 mb-2">
            Maximum Safe Volume: {result.maxDose} mL
          </Typography>
          <Typography variant="body2" className="text-gray-600 mt-2">
            <strong>Interpretation:</strong> {result.interpretation}
          </Typography>
          <Box className="flex items-center mt-2">
            <Info className="w-4 h-4 text-teal-400 mr-1" />
            <Typography variant="body2" className="text-gray-600">
              Source: Hadzic’s Textbook of Regional Anesthesia, 2nd Edition
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NerveBlockVolume;