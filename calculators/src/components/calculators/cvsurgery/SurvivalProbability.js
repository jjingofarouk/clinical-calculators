import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const SurvivalProbability = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    ef: '',
    comorbidity: '',
    surgeryType: '',
    performanceStatus: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    age: { min: 18, max: 100, type: 'integer', label: 'Age (years)' },
    sex: { min: 0, max: 1, type: 'integer', label: 'Sex (0 = Male, 1 = Female)' },
    ef: { min: 10, max: 80, type: 'integer', label: 'Ejection Fraction (%)' },
    comorbidity: { min: 0, max: 3, type: 'integer', label: 'Comorbidity Count (0-3)' },
    surgeryType: { min: 1, max: 3, type: 'integer', label: 'Surgery Type (1 = CABG, 2 = Valve, 3 = Combined)' },
    performanceStatus: { min: 0, max: 4, type: 'integer', label: 'Zubrod Performance Status (0-4)' },
  };

  const helperText = {
    age: 'Patient age in years (18-100).',
    sex: 'Enter 0 for male, 1 for female.',
    ef: 'Left ventricular ejection fraction (%) measured by echocardiography (10-80%).',
    comorbidity: 'Number of major comorbidities (e.g., diabetes, COPD, heart disease; 0-3).',
    surgeryType: 'Type of surgery: 1 = CABG, 2 = Valve, 3 = Combined.',
    performanceStatus: 'Zubrod performance status (0 = fully active, 4 = completely disabled).',
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
      age: formData.age > 65 ? -0.3 : 0,
      sex: formData.sex === '1' ? -0.2 : 0,
      ef: formData.ef < 50 ? -0.4 : 0,
      comorbidity: formData.comorbidity * -0.2,
      surgeryType: [0, 0, -0.3, -0.5][formData.surgeryType],
      performanceStatus: formData.performanceStatus * -0.2,
    };

    const sum = Object.values(coefficients).reduce((a, b) => a + b, 2.5);
    const score = 100 - (Math.exp(sum) / (1 + Math.exp(sum)) * 100);

    let survivalLevel = '';
    let survivalColor = '';
    let interpretation = '';

    if (score >= 90) {
      survivalLevel = 'High Survival';
      survivalColor = 'bg-green-100 text-green-800';
      interpretation = 'High probability of survival; standard follow-up recommended.';
    } else if (score >= 75) {
      survivalLevel = 'Moderate Survival';
      survivalColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate probability of survival; enhanced monitoring advised.';
    } else {
      survivalLevel = 'Low Survival';
      survivalColor = 'bg-red-100 text-red-800';
      interpretation = 'Low probability of survival; comprehensive care planning required.';
    }

    setResult({ score: score.toFixed(1), survivalLevel, survivalColor, interpretation });
  };

  const handleReset = () => {
    setFormData({
      age: '',
      sex: '',
      ef: '',
      comorbidity: '',
      surgeryType: '',
      performanceStatus: '',
    });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="min-h-screen w-full bg-background text-foreground p-2">
      <Typography variant="h4" className="font-bold text-foreground mb-4">
        Survival Probability Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-primary mr-2" />
        <Typography variant="body2" className="text-muted-foreground">
          Estimates probability of survival after cardiothoracic surgery. (Source: Roques et al., Eur Heart J 2003)
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
          <Box key={field) className="mb-4">
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
            Calculate Survival Probability
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
              Survival Probability Score
            </Typography>
            <Typography variant="body1" className="font-medium text-card-foreground mb-2">
              {result.score}%
            </Typography>
            <Typography variant="h6" className="font-semibold text-card-foreground mb-2">
              Survival Level
            </Typography>
            <Typography
              variant="body1"
              className={`font-medium p-2 rounded ${result.survivalColor}`}
            >
              {result.survivalLevel}
            </Typography>
            <Typography variant="body2" className="text-muted-foreground mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-primary mr-1" />
              <Typography variant="body2" className="text-muted-foreground">
                Source:{' '}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/12607666/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Roques et al., Eur Heart J 2003
                </a>
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SurvivalProbability;