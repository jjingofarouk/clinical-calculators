// src/calculators/PONVRisk.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, Alert, Tooltip, Checkbox, FormControlLabel } from '@mui/material';
import Select from 'react-select';
import { AlertCircle, Info } from 'lucide-react';

const PONVRisk = () => {
  const [formData, setFormData] = useState({
    gender: '',
    smoker: false,
    historyPONV: false,
    opioidUse: false,
    age: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    gender: { options: [{ value: 'female', label: 'Female' }, { value: 'male', label: 'Male' }], label: 'Gender' },
    age: { min: 0, max: 120, type: 'integer', label: 'Age (years)' },
  };

  const helperText = {
    gender: 'Female gender is a risk factor for PONV (Apfel Score).',
    smoker: 'Non-smokers are at higher risk for PONV.',
    historyPONV: 'History of PONV or motion sickness increases risk.',
    opioidUse: 'Postoperative opioid use is a risk factor for PONV.',
    age: 'Younger age (<50 years) is associated with higher PONV risk.',
  };

  const handleChange = (field) => (e) => {
    const value = field === 'gender' ? e.value : e.target.value;
    setFormData({ ...formData, [field]: value });

    if (field === 'age') {
      if (value === '') {
        setErrors({ ...errors, age: 'Age is required.' });
      } else {
        const numValue = parseInt(value);
        if (isNaN(numValue)) {
          setErrors({ ...errors, age: 'Age must be a number.' });
        } else if (numValue < ranges.age.min || numValue > ranges.age.max) {
          setErrors({ ...errors, age: `Age must be between ${ranges.age.min} and ${ranges.age.max}.` });
        } else if (!Number.isInteger(numValue)) {
          setErrors({ ...errors, age: 'Age must be an integer.' });
        } else {
          setErrors({ ...errors, age: '' });
        }
      }
    }
  };

  const handleCheckboxChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.checked });
  };

  const handleCalculate = () => {
    const newErrors = {};
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    if (formData.age === '') newErrors.age = 'Age is required.';
    else {
      const ageValue = parseInt(formData.age);
      if (isNaN(ageValue) || ageValue < ranges.age.min || ageValue > ranges.age.max) {
        newErrors.age = `Age must be between ${ranges.age.min} and ${ranges.age.max}.`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    let score = 0;
    if (formData.gender === 'female') score += 1;
    if (!formData.smoker) score += 1;
    if (formData.historyPONV) score += 1;
    if (formData.opioidUse) score += 1;

    let risk = '', riskColor = '', interpretation = '';
    if (score === 0 || score === 1) {
      risk = 'Low';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low risk of PONV; consider standard antiemetic prophylaxis.';
    } else if (score === 2) {
      risk = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate risk of PONV; consider multimodal antiemetic prophylaxis (e.g., ondansetron, dexamethasone).';
    } else {
      risk = 'High';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High risk of PONV; aggressive multimodal prophylaxis and close monitoring recommended.';
    }

    setResult({ score, risk, riskColor, interpretation });
  };

  const handleReset = () => {
    setFormData({ gender: '', smoker: false, historyPONV: false, opioidUse: false, age: '' });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="card w-full max-w-2xl mx-auto p-6">
      <Typography variant="h6" className="header">PONV Risk Calculator</Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-400 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          Calculates the risk of postoperative nausea and vomiting (PONV) using the Apfel Score. (Source: Apfel et al., Anesthesiology 1999;91:693-700)
        </Typography>
      </Box>

      {hasErrors && (
        <Alert severity="warning" className="mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Please correct the errors below before calculating.
        </Alert>
      )}

      <Box className="mb-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">Gender</Typography>
        <Tooltip title={helperText.gender}>
          <Select
            options={ranges.gender.options}
            value={ranges.gender.options.find((opt) => opt.value === formData.gender)}
            onChange={handleChange('gender')}
            placeholder="Select Gender"
            className="w-full"
          />
        </Tooltip>
        {errors.gender && <Typography color="error" variant="caption">{errors.gender}</Typography>}
      </Box>

      <Box className="mb-4">
        <Tooltip title={helperText.smoker}>
          <FormControlLabel
            control={<Checkbox checked={formData.smoker} onChange={handleCheckboxChange('smoker')} />}
            label="Non-smoker"
          />
        </Tooltip>
      </Box>

      <Box className="mb-4">
        <Tooltip title={helperText.historyPONV}>
          <FormControlLabel
            control={<Checkbox checked={formData.historyPONV} onChange={handleCheckboxChange('historyPONV')} />}
            label="History of PONV or Motion Sickness"
          />
        </Tooltip>
      </Box>

      <Box className="mb-4">
        <Tooltip title={helperText.opioidUse}>
          <FormControlLabel
            control={<Checkbox checked={formData.opioidUse} onChange={handleCheckboxChange('opioidUse')} />}
            label="Postoperative Opioid Use"
          />
        </Tooltip>
      </Box>

      <Box className="mb-4">
        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">Age (years)</Typography>
        <Tooltip title={helperText.age}>
          <TextField
            fullWidth
            type="number"
            value={formData.age}
            onChange={handleChange('age')}
            placeholder="Enter age"
            variant="outlined"
            error={!!errors.age}
            helperText={errors.age || helperText.age}
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
          Calculate PONV Risk
        </Button>
        <Button variant="outlined" onClick={handleReset} className="w-full py-3">
          Reset
        </Button>
      </Box>

      {result && (
        <Box className="mt-6 pt-4 border-t border-gray-200">
          <Typography variant="h6" className="font-semibold text-gray-800 mb-2">Apfel Score</Typography>
          <Typography variant="body1" className="font-medium text-gray-900 mb-2">{result.score}</Typography>
          <Typography variant="h6" className="font-semibold text-gray-800 mb-2">Risk Level</Typography>
          <Typography variant="body1" className={`font-medium p-2 rounded ${result.riskColor}`}>
            {result.risk}
          </Typography>
          <Typography variant="body2" className="text-gray-600 mt-2">
            <strong>Interpretation:</strong> {result.interpretation}
          </Typography>
          <Box className="flex items-center mt-2">
            <Info className="w-4 h-4 text-teal-400 mr-1" />
            <Typography variant="body2" className="text-gray-600">
              Source:{' '}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/10475218/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 underline"
              >
                Apfel et al., Anesthesiology 1999;91:693-700
              </a>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PONVRisk;