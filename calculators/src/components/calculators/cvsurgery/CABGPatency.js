import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const CABGPatency = () => {
  const [formData, setFormData] = useState({
    age: '',
    diabetes: '',
    smoking: '',
    graftType: '',
    targetVessel: '',
    antiplatelet: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    age: { min: 18, max: 100, type: 'integer', label: 'Age (years)' },
    diabetes: { min: 0, max: 1, type: 'integer', label: 'Diabetes (0 = No, 1 = Yes)' },
    smoking: { min: 0, max: 1, type: 'integer', label: 'Current Smoking (0 = No, 1 = Yes)' },
    graftType: { min: 1, max: 2, type: 'integer', label: 'Graft Type (1 = Vein, 2 = Arterial)' },
    targetVessel: { min: 1, max: 3, type: 'integer', label: 'Target Vessel (1 = LAD, 2 = RCA, 3 = Circumflex)' },
    antiplatelet: { min: 0, max: 1, type: 'integer', label: 'Antiplatelet Therapy (0 = No, 1 = Yes)' },
  };

  const helperText = {
    age: 'Patient age in years (18-100).',
    diabetes: 'Presence of diabetes mellitus (0 = No, 1 = Yes).',
    smoking: 'Current smoking status (0 = No, 1 = Yes).',
    graftType: 'Type of graft used: 1 = Vein (e.g., saphenous), 2 = Arterial (e.g., internal mammary).',
    targetVessel: 'Target coronary artery: 1 = LAD, 2 = RCA, 3 = Circumflex.',
    antiplatelet: 'Use of antiplatelet therapy (e.g., aspirin; 0 = No, 1 = Yes).',
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
      age: formData.age > 65 ? 0.2 : 0,
      diabetes: formData.diabetes === '1' ? 0.3 : 0,
      smoking: formData.smoking === '1' ? 0.2 : 0,
      graftType: formData.graftType === '1' ? 0.4 : 0,
      targetVessel: [0, 0, 0.1, 0.2][formData.targetVessel],
      antiplatelet: formData.antiplatelet === '0' ? 0.3 : 0,
    };

    const sum = Object.values(coefficients).reduce((a, b) => a + b, -2.5);
    const score = 100 - (Math.exp(sum) / (1 + Math.exp(sum)) * 100);

    let patencyLevel = '';
    let patencyColor = '';
    let interpretation = '';

    if (score >= 90) {
      patencyLevel = 'High Patency';
      patencyColor = 'bg-green-100 text-green-800';
      interpretation = 'High likelihood of graft patency; standard follow-up recommended.';
    } else if (score >= 75) {
      patencyLevel = 'Moderate Patency';
      patencyColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate likelihood of graft patency; consider enhanced monitoring.';
    } else {
      patencyLevel = 'Low Patency';
      patencyColor = 'bg-red-100 text-red-800';
      interpretation = 'Low likelihood of graft patency; plan for potential intervention.';
    }

    setResult({ score: score.toFixed(1), patencyLevel, patencyColor, interpretation });
  };

  const handleReset = () => {
    setFormData({
      age: '',
      diabetes: '',
      smoking: '',
      graftType: '',
      targetVessel: '',
      antiplatelet: '',
    });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="min-h-screen w-full bg-background text-foreground p-2">
      <Typography variant="h4" className="font-bold text-foreground mb-4">
        CABG Patency Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-primary mr-2" />
        <Typography variant="body2" className="text-muted-foreground">
          Estimates likelihood of graft patency after CABG. (Source: Fitzgibbon et al., Circulation 1996)
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
            Calculate CABG Patency
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
              CABG Patency Score
            </Typography>
            <Typography variant="body1" className="font-medium text-card-foreground mb-2">
              {result.score}%
            </Typography>
            <Typography variant="h6" className="font-semibold text-card-foreground mb-2">
              Patency Level
            </Typography>
            <Typography
              variant="body1"
              className={`font-medium p-2 rounded ${result.patencyColor}`}
            >
              {result.patencyLevel}
            </Typography>
            <Typography variant="body2" className="text-muted-foreground mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-primary mr-1" />
              <Typography variant="body2" className="text-muted-foreground">
                Source:{' '}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/8795480/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Fitzgibbon et al., Circulation 1996
                </a>
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CABGPatency;