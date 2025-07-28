import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

// EuroSCORE Calculator Component
// Implements the European System for Cardiac Operative Risk Evaluation (EuroSCORE II)
// Based on Nashef et al. (European Journal of Cardio-Thoracic Surgery, 2012;41:734-744)
// Estimates risk of in-hospital mortality for cardiac surgery
const EuroSCORE = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    nyha: '',
    ccs: '',
    lvef: '',
    creatinine: '',
    endocarditis: '',
    critical: '',
    diabetes: '',
    pulmonary: '',
    urgency: '',
    procedure: '',
    surgeryType: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    age: { min: 18, max: 100, type: 'integer', label: 'Age (years)' },
    sex: { min: 0, max: 1, type: 'integer', label: 'Sex (0 = Male, 1 = Female)' },
    nyha: { min: 1, max: 4, type: 'integer', label: 'NYHA Class (1-4)' },
    ccs: { min: 0, max: 4, type: 'integer', label: 'CCS Angina Class (0-4)' },
    lvef: { min: 10, max: 80, type: 'integer', label: 'Left Ventricular Ejection Fraction (%)' },
    creatinine: { min: 0.5, max: 10, type: 'float', label: 'Creatinine (mg/dL)' },
    endocarditis: { min: 0, max: 1, type: 'integer', label: 'Active Endocarditis (0 = No, 1 = Yes)' },
    critical: { min: 0, max: 1, type: 'integer', label: 'Critical Preoperative State (0 = No, 1 = Yes)' },
    diabetes: { min: 0, max: 1, type: 'integer', label: 'Diabetes on Insulin (0 = No, 1 = Yes)' },
    pulmonary: { min: 0, max: 1, type: 'integer', label: 'Pulmonary Disease (0 = No, 1 = Yes)' },
    urgency: { min: 1, max: 4, type: 'integer', label: 'Urgency (1 = Elective, 2 = Urgent, 3 = Emergency, 4 = Salvage)' },
    procedure: { min: 1, max: 3, type: 'integer', label: 'Procedure Type (1 = CABG, 2 = Valve, 3 = Other)' },
    surgeryType: { min: 1, max: 3, type: 'integer', label: 'Surgery Type (1 = Isolated CABG, 2 = Single Non-CABG, 3 = Two or More)' },
  };

  const helperText = {
    age: 'Patient age in years (18-100).',
    sex: 'Enter 0 for male, 1 for female.',
    nyha: 'New York Heart Association class (1-4) based on functional status.',
    ccs: 'Canadian Cardiovascular Society angina class (0-4).',
    lvef: 'Left ventricular ejection fraction (%) measured by echocardiography (10-80%).',
    creatinine: 'Serum creatinine level (mg/dL, 0.5-10).',
    endocarditis: 'Presence of active endocarditis (0 = No, 1 = Yes).',
    critical: 'Critical preoperative state, e.g., ventricular tachycardia, shock (0 = No, 1 = Yes).',
    diabetes: 'Insulin-dependent diabetes mellitus (0 = No, 1 = Yes).',
    pulmonary: 'Chronic pulmonary disease, e.g., COPD (0 = No, 1 = Yes).',
    urgency: 'Surgical urgency: 1 = Elective, 2 = Urgent, 3 = Emergency, 4 = Salvage.',
    procedure: 'Type of procedure: 1 = CABG, 2 = Valve, 3 = Other major cardiac surgery.',
    surgeryType: 'Surgery complexity: 1 = Isolated CABG, 2 = Single non-CABG, 3 = Two or more procedures.',
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

    // Simplified EuroSCORE II calculation (coefficients from Nashef et al.)
    const coefficients = {
      age: formData.age > 60 ? (formData.age - 60) * 0.0285181 : 0,
      sex: formData.sex === '1' ? 0.2196434 : 0,
      nyha: [0, 0, 0.1675006, 0.3153955, 0.616649][formData.nyha],
      ccs: formData.ccs === '4' ? 0.2226147 : 0,
      lvef: formData.lvef < 50 ? (formData.lvef < 30 ? 0.808794 : 0.3150652) : 0,
      creatinine: formData.creatinine > 2 ? 0.8592256 : 0,
      endocarditis: formData.endocarditis === '1' ? 0.793 : 0,
      critical: formData.critical === '1' ? 1.159 : 0,
      diabetes: formData.diabetes === '1' ? 0.3542749 : 0,
      pulmonary: formData.pulmonary === '1' ? 0.1886564 : 0,
      urgency: [0, 0, 0.317467, 0.7039121, 1.450098][formData.urgency],
      procedure: [0, 0, 0.0062118, 0.552124][formData.procedure],
      surgeryType: [0, 0, 0.0661261, 0.6551285][formData.surgeryType],
    };

    const sum = Object.values(coefficients).reduce((a, b) => a + b, -5.324537);
    const score = Math.exp(sum) / (1 + Math.exp(sum)) * 100;

    let riskLevel = '';
    let riskColor = '';
    let interpretation = '';

    if (score < 2) {
      riskLevel = 'Low Risk';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low risk of in-hospital mortality; standard postoperative care recommended.';
    } else if (score <= 6) {
      riskLevel = 'Moderate Risk';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate risk; consider enhanced monitoring and tailored interventions.';
    } else {
      riskLevel = 'High Risk';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High risk; multidisciplinary consultation and aggressive management required.';
    }

    setResult({ score: score.toFixed(1), riskLevel, riskColor, interpretation });
  };

  const handleReset = () => {
    setFormData({
      age: '',
      sex: '',
      nyha: '',
      ccs: '',
      lvef: '',
      creatinine: '',
      endocarditis: '',
      critical: '',
      diabetes: '',
      pulmonary: '',
      urgency: '',
      procedure: '',
      surgeryType: '',
    });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="min-h-screen w-full bg-background text-foreground p-2">
      <Typography variant="h4" className="font-bold text-foreground mb-4">
        EuroSCORE II Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-primary mr-2" />
        <Typography variant="body2" className="text-muted-foreground">
          EuroSCORE II estimates the risk of in-hospital mortality for patients undergoing cardiac surgery. (Source: Nashef et al., Eur J Cardiothorac Surg 2012)
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
            Calculate EuroSCORE II
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
              EuroSCORE II
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
                  href="https://pubmed.ncbi.nlm.nih.gov/22378855/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Nashef et al., Eur J Cardiothorac Surg 2012;41:734-744
                </a>
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EuroSCORE;