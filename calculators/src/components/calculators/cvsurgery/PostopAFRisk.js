import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

// Postop AF Risk Calculator Component
// Estimates risk of postoperative atrial fibrillation after cardiac surgery
// Based on Mathew et al. (JAMA 2004;291:1720-1729)
const PostopAFRisk = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    hypertension: '',
    diabetes: '',
    priorAF: '',
    valveSurgery: '',
    copd: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    age: { min: 18, max: 100, type: 'integer', label: 'Age (years)' },
    sex: { min: 0, max: 1, type: 'integer', label: 'Sex (0 = Male, 1 = Female)' },
    hypertension: { min: 0, max: 1, type: 'integer', label: 'Hypertension (0 = No, 1 = Yes)' },
    diabetes: { min: 0, max: 1, type: 'integer', label: 'Diabetes (0 = No, 1 = Yes)' },
    priorAF: { min: 0, max: 1, type: 'integer', label: 'Prior Atrial Fibrillation (0 = No, 1 = Yes)' },
    valveSurgery: { min: 0, max: 1, type: 'integer', label: 'Valve Surgery Performed (0 = No, 1 = Yes)' },
    copd: { min: 0, max: 1, type: 'integer', label: 'Chronic Obstructive Pulmonary Disease (0 = No, 1 = Yes)' },
  };

  const helperText = {
    age: 'Patient age in years (18-100).',
    sex: 'Enter 0 for male, 1 for female.',
    hypertension: 'History of hypertension (0 = No, 1 = Yes).',
    diabetes: 'Presence of diabetes mellitus (0 = No, 1 = Yes).',
    priorAF: 'History of atrial fibrillation prior to surgery (0 = No, 1 = Yes).',
    valveSurgery: 'Valve surgery performed during procedure (0 = No, 1 = Yes).',
    copd: 'Chronic obstructive pulmonary disease (0 = No, 1 = Yes).',
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });

    if (value === '') {
      setErrors({ ...errors, [field]: `${ranges[field].label} is required.` });
      return;
    }

    const numValue = ranges[field].type === 'float' ? parseFloat(value) : parseInt(value);
    if (isNaN(numValue)) {
      setErrors({ ...errors, [field]: `${ranges[field].label} must be a number.` });
    } else if (numValue < ranges[field].min || numValue > ranges[field].max) {
      setErrors({
        ...errors,
        [field]: `${ranges[field].label} must be between ${ranges[field].min} and ${ranges[field].max}.`,
      });
    } else if (ranges[field].type === 'integer' && !Number.isInteger(numValue)) {
      setErrors({ ...errors, [field]: `${ranges[field].label} must be an integer.` });
    } else {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleCalculate = () => {
    const newErrors = {};
    let hasError = false;
    Object.keys(formData).forEach((field) => {
      if (formData[field] === '') {
        newErrors[field] = `${ranges[field].label} is required.`;
        hasError = true;
      } else {
        const numValue = ranges[field].type === 'float' ? parseFloat(formData[field]) : parseInt(formData[field]);
        if (isNaN(numValue)) {
          newErrors[field] = `${ranges[field].label} must be a number.`;
          hasError = true;
        } else if (numValue < ranges[field].min || numValue > ranges[field].max) {
          newErrors[field] = `${ranges[field].label} must be between ${ranges[field].min} and ${ranges[field].max}.`;
          hasError = true;
        } else if (ranges[field].type === 'integer' && !Number.isInteger(numValue)) {
          newErrors[field] = `${ranges[field].label} must be an integer.`;
          hasError = true;
        }
      }
    });

    if (hasError) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    const coefficients = {
      age: formData.age > 65 ? (formData.age - 65) * 0.05 : 0,
      sex: formData.sex === '1' ? 0.2 : 0,
      hypertension: formData.hypertension === '1' ? 0.3 : 0,
      diabetes: formData.diabetes === '1' ? 0.2 : 0,
      priorAF: formData.priorAF === '1' ? 0.6 : 0,
      valveSurgery: formData.valveSurgery === '1' ? 0.4 : 0,
      copd: formData.copd === '1' ? 0.3 : 0,
    };

    const sum = Object.values(coefficients).reduce((a, b) => a + b, -2.8);
    const score = Math.exp(sum) / (1 + Math.exp(sum)) * 100;

    let riskLevel = '';
    let riskColor = '';
    let interpretation = '';

    if (score < 20) {
      riskLevel = 'Low Risk';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low risk of postoperative atrial fibrillation; routine monitoring sufficient.';
    } else if (score <= 40) {
      riskLevel = 'Moderate Risk';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate risk; consider prophylactic beta-blockers or amiodarone.';
    } else {
      riskLevel = 'High Risk';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High risk; aggressive prophylaxis and close monitoring recommended.';
    }

    setResult({ score: score.toFixed(1), riskLevel, riskColor, interpretation });
  };

  const handleReset = () => {
    setFormData({
      age: '',
      sex: '',
      hypertension: '',
      diabetes: '',
      priorAF: '',
      valveSurgery: '',
      copd: '',
    });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="min-h-screen w-full bg-background text-foreground p-2">
      <Typography variant="h4" className="font-bold text-foreground mb-4">
        Postoperative AF Risk Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-primary mr-2" />
        <Typography variant="body2" className="text-muted-foreground">
          Estimates risk of atrial fibrillation following cardiac surgery. (Source: Mathew et al., JAMA 2004)
        </Typography>
      </Box>

      <Box className="card w-full max-w-2xl mx-auto p-4 bg-card text-card-foreground shadow-lg rounded-radius">
        {hasErrors && (
          <Alert severity="warning" className="mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Please correct the errors below before calculating.
          </Alert>
        )}

        {Object.keys(formData).map((field) => (
          <Box key={field} className="mb-4">
            <Typography variant="subtitle1" className="font-semibold text-card-foreground mb-2">
              {ranges[field].label}
            </Typography>
            <Tooltip title={helperText[field]} placement="top">
              <TextField
                fullWidth
                type="number"
                value={formData[field]}
                onChange={handleChange(field)}
                placeholder={`Range: ${ranges[field].min}-${ranges[field].max}`}
                variant="outlined"
                error={!!errors[field]}
                helperText={errors[field] || helperText[field]}
                aria-label={ranges[field].label}
                sx={{
                  backgroundColor: 'hsl(var(--card))',
                  borderRadius: 'var(--radius)',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'hsl(var(--border))' },
                    '&:hover fieldset': { borderColor: 'hsl(var(--primary))' },
                    '&.Mui-focused fieldset': { borderColor: 'hsl(var(--primary))' },
                  },
                  '& .MuiInputBase-input': { color: 'hsl(var(--card-foreground))' },
                  '& .MuiFormHelperText-root': { color: 'hsl(var(--muted-foreground))' },
                }}
              />
            </Tooltip>
          </Box>
        ))}

        <Box className="flex gap-4">
          <Button
            variant="contained"
            onClick={handleCalculate}
            className="w-full py-3 bg-primary text-primary-foreground"
            disabled={hasErrors}
            sx={{
              backgroundColor: 'hsl(var(--primary))',
              '&:hover': { backgroundColor: 'hsl(var(--primary) / 0.9)' },
              textTransform: 'none',
              fontWeight: '600',
              borderRadius: 'var(--radius)',
            }}
          >
            Calculate Postop AF Risk
          </Button>
          <Button
            variant="outlined"
            onClick={handleReset}
            className="w-full py-3 border-border text-card-foreground"
            sx={{
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--card-foreground))',
              textTransform: 'none',
              fontWeight: '600',
              borderRadius: 'var(--radius)',
              '&:hover': { borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))' },
            }}
          >
            Reset
          </Button>
        </Box>

        {result && (
          <Box className="mt-6 pt-4 border-t border-border">
            <Typography variant="h6" className="font-semibold text-card-foreground mb-2">
              Postop AF Risk Score
            </Typography>
            <Typography variant="body1" className="font-medium text-card-foreground mb-2">
              {result.score}%
            </Typography>
            <Typography variant="h6" className="font-semibold text-card-foreground mb-2">
              Risk Level
            </Typography>
            <Typography
              variant="body1"
              className={`font-medium p-2 rounded ${result.riskColor}`}
            >
              {result.riskLevel}
            </Typography>
            <Typography variant="body2" className="text-muted-foreground mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-primary mr-1" />
              <Typography variant="body2" className="text-muted-foreground">
                Source:{' '}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/15078961/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Mathew et al., JAMA 2004;291:1720-1729
                </a>
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PostopAFRisk;