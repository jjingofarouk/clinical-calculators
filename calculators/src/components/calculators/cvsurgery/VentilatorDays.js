import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const VentilatorDays = () => {
  const [formData, setFormData] = useState({
    age: '',
    fev1: '',
    copd: '',
    surgeryType: '',
    ef: '',
    renalFunction: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    age: { min: 18, max: 100, type: 'integer', label: 'Age (years)' },
    fev1: { min: 20, max: 120, type: 'float', label: 'FEV1 (% predicted)' },
    copd: { min: 0, max: 1, type: 'integer', label: 'COPD (0 = No, 1 = Yes)' },
    surgeryType: { min: 1, max: 3, type: 'integer', label: 'Surgery Type (1 = CABG, 2 = Valve, 3 = Lung)' },
    ef: { min: 10, max: 80, type: 'integer', label: 'Ejection Fraction (%)' },
    renalFunction: { min: 0, max: 1, type: 'integer', label: 'Renal Dysfunction (0 = No, 1 = Yes)' },
  };

  const helperText = {
    age: 'Patient age in years (18-100).',
    fev1: 'Forced expiratory volume in 1 second, % predicted (20-120%).',
    copd: 'Presence of chronic obstructive pulmonary disease (0 = No, 1 = Yes).',
    surgeryType: 'Type of surgery: 1 = CABG, 2 = Valve, 3 = Lung.',
    ef: 'Left ventricular ejection fraction (%) measured by echocardiography (10-80%).',
    renalFunction: 'Presence of renal dysfunction (e.g., creatinine > 2 mg/dL; 0 = No, 1 = Yes).',
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
      age: formData.age > 65 ? 0.3 : 0,
      fev1: formData.fev1 < 60 ? 0.4 : 0,
      copd: formData.copd === '1' ? 0.5 : 0,
      surgeryType: [0, 0, 0.2, 0.6][formData.surgeryType],
      ef: formData.ef < 50 ? 0.3 : 0,
      renalFunction: formData.renalFunction === '1' ? 0.4 : 0,
    };

    const sum = Object.values(coefficients).reduce((a, b) => a + b, 0);
    const days = Math.round(1 + sum * 2);

    let riskLevel = '';
    let riskColor = '';
    let interpretation = '';

    if (days <= 2) {
      riskLevel = 'Short Duration';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Short expected ventilator duration; standard care recommended.';
    } else if (days <= 5) {
      riskLevel = 'Moderate Duration';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate ventilator duration; plan for extended respiratory support.';
    } else {
      riskLevel = 'Prolonged Duration';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Prolonged ventilator duration; prepare for ICU management.';
    }

    setResult({ days, riskLevel, riskColor, interpretation });
  };

  const handleReset = () => {
    setFormData({
      age: '',
      fev1: '',
      copd: '',
      surgeryType: '',
      ef: '',
      renalFunction: '',
    });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="min-h-screen w-full bg-background text-foreground p-2">
      <Typography variant="h4" className="font-bold text-foreground mb-4">
        Ventilator Days Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-primary mr-2" />
        <Typography variant="body2" className="text-muted-foreground">
          Estimates duration of postoperative ventilator use. (Source: Fernandez-Zamora et al., J Cardiothorac Vasc Anesth 2018)
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
            Calculate Ventilator Days
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
              Estimated Ventilator Days
            </Typography>
            <Typography variant="body1" className="font-medium text-card-foreground mb-2">
              {result.days} days
            </Typography>
            <Typography variant="h6" className="font-semibold text-card-foreground mb-2">
              Duration Level
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
                  href="https://pubmed.ncbi.nlm.nih.gov/29735392/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Fernandez-Zamora et al., J Cardiothorac Vasc Anesth 2018
                </a>
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VentilatorDays;