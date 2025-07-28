import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const SYNTAXScore = () => {
  const [formData, setFormData] = useState({
    numberOfLesions: '',
    dominantVessel: '',
    bifurcation: '',
    occlusion: '',
    calcification: '',
    tortuosity: '',
    diffuseDisease: '',
    smallVessel: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    numberOfLesions: { min: 1, max: 10, type: 'integer', label: 'Number of Lesions (1-10)' },
    dominantVessel: { min: 0, max: 1, type: 'integer', label: 'Dominant Vessel Involved (0 = No, 1 = Yes)' },
    bifurcation: { min: 0, max: 1, type: 'integer', label: 'Bifurcation Lesion (0 = No, 1 = Yes)' },
    occlusion: { min: 0, max: 1, type: 'integer', label: 'Total Occlusion (0 = No, 1 = Yes)' },
    calcification: { min: 0, max: 2, type: 'integer', label: 'Calcification (0 = None, 1 = Moderate, 2 = Severe)' },
    tortuosity: { min: 0, max: 2, type: 'integer', label: 'Vessel Tortuosity (0 = None, 1 = Moderate, 2 = Severe)' },
    diffuseDisease: { min: 0, max: 1, type: 'integer', label: 'Diffuse Disease (0 = No, 1 = Yes)' },
    smallVessel: { min: 0, max: 1, type: 'integer', label: 'Small Vessel (<2.5mm) (0 = No, 1 = Yes)' },
  };

  const helperText = {
    numberOfLesions: 'Number of significant coronary lesions (1-10).',
    dominantVessel: 'Involvement of dominant coronary artery (0 = No, 1 = Yes).',
    bifurcation: 'Presence of bifurcation lesion (0 = No, 1 = Yes).',
    occlusion: 'Presence of total occlusion (0 = No, 1 = Yes).',
    calcification: 'Degree of calcification: 0 = None, 1 = Moderate, 2 = Severe.',
    tortuosity: 'Degree of vessel tortuosity: 0 = None, 1 = Moderate, 2 = Severe.',
    diffuseDisease: 'Presence of diffuse disease (0 = No, 1 = Yes).',
    smallVessel: 'Presence of small vessel disease (<2.5mm diameter; 0 = No, 1 = Yes).',
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });

    if (value === '') {
      setErrors({ ...errors, [field]: `${ranges[field].label} is required.` });
      return;
    }

    const numValue = parseInt(value);
    if (isNaN(numValue)) {
      setErrors({ ...errors, [field]: `${ranges[field].label} must be a number.` });
    } else if (numValue < ranges[field].min || numValue > ranges[field].max) {
      setErrors({
        ...errors,
        [field]: `${ranges[field].label} must be between ${ranges[field].min} and ${ranges[field].max}.`,
      });
    } else if (!Number.isInteger(numValue)) {
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
        const numValue = parseInt(formData[field]);
        if (isNaN(numValue)) {
          newErrors[field] = `${ranges[field].label} must be a number.`;
          hasError = true;
        } else if (numValue < ranges[field].min || numValue > ranges[field].max) {
          newErrors[field] = `${ranges[field].label} must be between ${ranges[field].min} and ${ranges[field].max}.`;
          hasError = true;
        } else if (!Number.isInteger(numValue)) {
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
      numberOfLesions: parseInt(formData.numberOfLesions) * 5,
      dominantVessel: formData.dominantVessel === '1' ? 5 : 0,
      bifurcation: formData.bifurcation === '1' ? 2 : 0,
      occlusion: formData.occlusion === '1' ? 5 : 0,
      calcification: parseInt(formData.calcification) * 2,
      tortuosity: parseInt(formData.tortuosity) * 2,
      diffuseDisease: formData.diffuseDisease === '1' ? 3 : 0,
      smallVessel: formData.smallVessel === '1' ? 2 : 0,
    };

    const score = Object.values(coefficients).reduce((a, b) => a + b, 0);

    let riskLevel = '';
    let riskColor = '';
    let interpretation = '';

    if (score <= 22) {
      riskLevel = 'Low SYNTAX Score';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low anatomical complexity; PCI may be preferred over CABG.';
    } else if (score <= 33) {
      riskLevel = 'Intermediate SYNTAX Score';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate anatomical complexity; consider CABG or PCI based on clinical factors.';
    } else {
      riskLevel = 'High SYNTAX Score';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High anatomical complexity; CABG is generally recommended.';
    }

    setResult({ score, riskLevel, riskColor, interpretation });
  };

  const handleReset = () => {
    setFormData({
      numberOfLesions: '',
      dominantVessel: '',
      bifurcation: '',
      occlusion: '',
      calcification: '',
      tortuosity: '',
      diffuseDisease: '',
      smallVessel: '',
    });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="min-h-screen w-full bg-background text-foreground p-2">
      <Typography variant="h4" className="font-bold text-foreground mb-4">
        SYNTAX Score Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-primary mr-2" />
        <Typography variant="body2" className="text-muted-foreground">
          Calculates SYNTAX score for coronary artery disease complexity. (Source: Sianos et al., EuroIntervention 2005)
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
            Calculate SYNTAX Score
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
              SYNTAX Score
            </Typography>
            <Typography variant="body1" className="font-medium text-card-foreground mb-2">
              {result.score}
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
                  href="https://pubmed.ncbi.nlm.nih.gov/16159818/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Sianos et al., EuroIntervention 2005
                </a>
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SYNTAXScore;