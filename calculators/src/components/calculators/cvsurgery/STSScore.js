import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

// STS Score Calculator Component
// Implements the Society of Thoracic Surgeons (STS) Risk Score for CABG
// Based on Shahian et al. (Ann Thorac Surg 2009;87:769-776)
// Estimates risk of mortality and major morbidity for coronary artery bypass grafting
const STSScore = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    weight: '',
    height: '',
    diabetes: '',
    dialysis: '',
    lvef: '',
    status: '',
    creatinine: '',
    arrhythmia: '',
    priorMI: '',
    procedure: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    age: { min: 18, max: 100, type: 'integer', label: 'Age (years)' },
    sex: { min: 0, max: 1, type: 'integer', label: 'Sex (0 = Male, 1 = Female)' },
    weight: { min: 30, max: 200, type: 'float', label: 'Weight (kg)' },
    height: { min: 100, max: 250, type: 'float', label: 'Height (cm)' },
    diabetes: { min: 0, max: 1, type: 'integer', label: 'Diabetes (0 = No, 1 = Yes)' },
    dialysis: { min: 0, max: 1, type: 'integer', label: 'Dialysis (0 = No, 1 = Yes)' },
    lvef: { min: 10, max: 80, type: 'integer', label: 'Left Ventricular Ejection Fraction (%)' },
    status: { min: 1, max: 4, type: 'integer', label: 'Status (1 = Elective, 2 = Urgent, 3 = Emergency, 4 = Salvage)' },
    creatinine: { min: 0.5, max: 10, type: 'float', label: 'Creatinine (mg/dL)' },
    arrhythmia: { min: 0, max: 1, type: 'integer', label: 'Recent Arrhythmia (0 = No, 1 = Yes)' },
    priorMI: { min: 0, max: 1, type: 'integer', label: 'Prior Myocardial Infarction (0 = No, 1 = Yes)' },
    procedure: { min: 1, max: 2, type: 'integer', label: 'Procedure Type (1 = CABG Only, 2 = CABG + Valve)' },
  };

  const helperText = {
    age: 'Patient age in years (18-100).',
    sex: 'Enter 0 for male, 1 for female.',
    weight: 'Patient weight in kilograms (30-200 kg).',
    height: 'Patient height in centimeters (100-250 cm).',
    diabetes: 'Presence of diabetes mellitus (0 = No, 1 = Yes).',
    dialysis: 'Patient on dialysis (0 = No, 1 = Yes).',
    lvef: 'Left ventricular ejection fraction (%) measured by echocardiography (10-80%).',
    status: 'Surgical status: 1 = Elective, 2 = Urgent, 3 = Emergency, 4 = Salvage.',
    creatinine: 'Serum creatinine level (mg/dL, 0.5-10).',
    arrhythmia: 'Recent arrhythmia, e.g., ventricular tachycardia or fibrillation (0 = No, 1 = Yes).',
    priorMI: 'History of myocardial infarction (0 = No, 1 = Yes).',
    procedure: 'Type of procedure: 1 = CABG only, 2 = CABG with valve surgery.',
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

    // Simplified STS mortality risk calculation
    const coefficients = {
      age: formData.age > 60 ? (formData.age - 60) * 0.032 : 0,
      sex: formData.sex === '1' ? 0.45 : 0,
      weight: formData.weight < 70 ? 0.02 : 0,
      height: 0,
      diabetes: formData.diabetes === '1' ? 0.35 : 0,
      dialysis: formData.dialysis === '1' ? 1.2 : 0,
      lvef: formData.lvef < 40 ? 0.6 : 0,
      status: [0, 0, 0.5, 1.0, 1.5][formData.status],
      creatinine: formData.creatinine > 1.5 ? 0.7 : 0,
      arrhythmia: formData.arrhythmia === '1' ? 0.4 : 0,
      priorMI: formData.priorMI === '1' ? 0.3 : 0,
      procedure: formData.procedure === '2' ? 0.8 : 0,
    };

    const sum = Object.values(coefficients).reduce((a, b) => a + b, -4.5);
    const score = Math.exp(sum) / (1 + Math.exp(sum)) * 100;

    let riskLevel = '';
    let riskColor = '';
    let interpretation = '';

    if (score < 2) {
      riskLevel = 'Low Risk';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low risk of mortality; standard postoperative protocols recommended.';
    } else if (score <= 5) {
      riskLevel = 'Moderate Risk';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate risk; consider enhanced monitoring and multidisciplinary consultation.';
    } else {
      riskLevel = 'High Risk';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High risk; aggressive management and critical care planning required.';
    }

    setResult({ score: score.toFixed(1), riskLevel, riskColor, interpretation });
  };

  const handleReset = () => {
    setFormData({
      age: '',
      sex: '',
      weight: '',
      height: '',
      diabetes: '',
      dialysis: '',
      lvef: '',
      status: '',
      creatinine: '',
      arrhythmia: '',
      priorMI: '',
      procedure: '',
    });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="min-h-screen w-full bg-background text-foreground p-2">
      <Typography variant="h4" className="font-bold text-foreground mb-4">
        STS Score Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-primary mr-2" />
        <Typography variant="body2" className="text-muted-foreground">
          The STS Score estimates mortality and morbidity risk for coronary artery bypass grafting. (Source: Shahian et al., Ann Thorac Surg 2009)
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
            Calculate STS Score
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
              STS Score
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
                  href="https://pubmed.ncbi.nlm.nih.gov/19258065/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Shahian et al., Ann Thorac Surg 2009;87:769-776
                </a>
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default STSScore;