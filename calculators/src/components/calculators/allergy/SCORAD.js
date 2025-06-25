import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

// SCORAD Calculator Component
// Implements SCORing Atopic Dermatitis (SCORAD) to assess eczema severity
// Based on Dr. Amanda Oakley’s description (2009) and European Task Force on Atopic Dermatitis (Dermatology 1993;186:23-31)
// Formula: A/5 + 7B/2 + C
// A: Extent (% body surface affected, max 100)
// B: Intensity (sum of 6 signs, each 0-3, max 18)
// C: Subjective symptoms (pruritus + sleep loss, each 0-10, max 20)
const SCORAD = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    extent: '',
    erythema: '',
    edema: '',
    oozing: '',
    excoriation: '',
    lichenification: '',
    dryness: '',
    pruritus: '',
    sleepLoss: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  // Input ranges and labels per SCORAD methodology
  const ranges = {
    extent: { min: 0, max: 100, type: 'float', label: 'Extent (% body surface)' },
    erythema: { min: 0, max: 3, type: 'integer', label: 'Redness (Erythema)' },
    edema: { min: 0, max: 3, type: 'integer', label: 'Swelling (Edema/Papulation)' },
    oozing: { min: 0, max: 3, type: 'integer', label: 'Oozing/Crusting' },
    excoriation: { min: 0, max: 3, type: 'integer', label: 'Scratch Marks (Excoriation)' },
    lichenification: { min: 0, max: 3, type: 'integer', label: 'Skin Thickening (Lichenification)' },
    dryness: { min: 0, max: 3, type: 'integer', label: 'Dryness' },
    pruritus: { min: 0, max: 10, type: 'integer', label: 'Itch (Pruritus)' },
    sleepLoss: { min: 0, max: 10, type: 'integer', label: 'Sleeplessness' },
  };

  // Helper text based on Dr. Amanda Oakley’s description
  const helperText = {
    extent:
      'Percentage of body surface affected by eczema (0-100%). Shade affected sites on a body drawing and use the rule of 9: Head and neck 9%, each upper limb 9%, each lower limb 18%, anterior trunk 18%, back 18%, genitals 1%. Total area is summed to give A (max 100%).',
    erythema:
      'Redness in a representative eczema area, scored as none (0), mild (1), moderate (2), or severe (3). Part of intensity score B.',
    edema:
      'Swelling or papules in a representative eczema area, scored as none (0), mild (1), moderate (2), or severe (3). Part of intensity score B. Note: May be harder to assess remotely.',
    oozing:
      'Oozing or crusting in a representative eczema area, scored as none (0), mild (1), moderate (2), or severe (3). Part of intensity score B.',
    excoriation:
      'Scratch marks in a representative eczema area, scored as none (0), mild (1), moderate (2), or severe (3). Part of intensity score B.',
    lichenification:
      'Skin thickening due to chronic scratching in a representative eczema area, scored as none (0), mild (1), moderate (2), or severe (3). Part of intensity score B.',
    dryness:
      'Dryness in an area without inflammation, scored as none (0), mild (1), moderate (2), or severe (3). Part of intensity score B.',
    pruritus:
      'Itch severity reported by patient or relative using a visual analogue scale (0 = no itch, 10 = worst imaginable). Summed with sleeplessness for C (max 20).',
    sleepLoss:
      'Sleep disturbance due to eczema, reported by patient or relative using a visual analogue scale (0 = no sleeplessness, 10 = worst imaginable). Summed with itch for C (max 20).',
  };

  // Handle input changes with real-time validation
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });

    // Validate input
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

  // Calculate SCORAD score per the formula A/5 + 7B/2 + C
  const handleCalculate = () => {
    // Validate all inputs
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

    // Calculate SCORAD score
    const extentScore = parseFloat(formData.extent) / 5; // A/5
    const intensityScore =
      (parseInt(formData.erythema) +
        parseInt(formData.edema) +
        parseInt(formData.oozing) +
        parseInt(formData.excoriation) +
        parseInt(formData.lichenification) +
        parseInt(formData.dryness)) *
      (7 / 2); // 7B/2
    const subjectiveScore = parseInt(formData.pruritus) + parseInt(formData.sleepLoss); // C
    const score = extentScore + intensityScore + subjectiveScore;

    // Determine severity based on score
    let severity = '';
    let riskColor = '';
    let interpretation = '';

    if (score < 25) {
      severity = 'Mild';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Mild atopic dermatitis; topical emollients and low-potency corticosteroids are typically sufficient.';
    } else if (score <= 50) {
      severity = 'Moderate';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Moderate atopic dermatitis; consider moderate-potency corticosteroids and specialist referral.';
    } else {
      severity = 'Severe';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'Severe atopic dermatitis; systemic therapy and urgent dermatology consultation may be required.';
    }

    setResult({ score: score.toFixed(1), severity, riskColor, interpretation });
  };

  // Reset all inputs and results
  const handleReset = () => {
    setFormData({
      extent: '',
      erythema: '',
      edema: '',
      oozing: '',
      excoriation: '',
      lichenification: '',
      dryness: '',
      pruritus: '',
      sleepLoss: '',
    });
    setErrors({});
    setResult(null);
  };

  // Check if any errors exist
  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        SCORAD Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-400 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          SCORAD is a clinical tool used to assess the extent and severity of eczema (SCORing Atopic Dermatitis). Dermatologists may use this tool before and after treatment to determine whether the treatment has been effective. (Source: Dr. Amanda Oakley, 2009)
        </Typography>
      </Box>

      <Box className="card w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {hasErrors && (
          <Alert severity="warning" className="mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Please correct the errors below before calculating.
          </Alert>
        )}

        {Object.keys(formData).map((field) => (
          <Box key={field} className="mb-4">
            <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
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
        ))}

        <Box className="flex gap-4">
          <Button
            variant="contained"
            onClick={handleCalculate}
            className="w-full py-3 btn-primary"
            disabled={hasErrors}
            sx={{
              backgroundColor: '#0d9488',
              '&:hover': { backgroundColor: '#0b8276' },
              textTransform: 'none',
              fontWeight: '600',
              borderRadius: 2,
            }}
          >
            Calculate SCORAD Score
          </Button>
          <Button
            variant="outlined"
            onClick={handleReset}
            className="w-full py-3"
            sx={{
              borderColor: '#d1d5db',
              color: '#374151',
              textTransform: 'none',
              fontWeight: '600',
              borderRadius: 2,
              '&:hover': { borderColor: '#0d9488', color: '#0d9488' },
            }}
          >
            Reset
          </Button>
        </Box>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              SCORAD Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.score}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Severity
            </Typography>
            <Typography
              variant="body1"
              className={`font-medium p-2 rounded ${result.riskColor}`}
            >
              {result.severity}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-400 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Sources:{' '}
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/8435513/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 underline"
                >
                  European Task Force on Atopic Dermatitis, Dermatology 1993;186:23-31
                </a>
                ;{' '}
                <a
                  href="http://adserver.sante.univ-nantes.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 underline"
                >
                  Université de Nantes AD Information Server
                </a>
                ; Dr. Amanda Oakley, Dermatologist, 2009.
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SCORAD;