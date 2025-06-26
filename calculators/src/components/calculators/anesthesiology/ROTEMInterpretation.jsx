// src/calculators/ROTEMInterpretation.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const ROTEMInterpretation = () => {
  const [formData, setFormData] = useState({
    ct: '',
    cft: '',
    alphaAngle: '',
    mcf: '',
    li30: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    ct: { min: 0, max: 200, type: 'float', label: 'Clotting Time (CT, s)' },
    cft: { min: 0, max: 400, type: 'float', label: 'Clot Formation Time (CFT, s)' },
    alphaAngle: { min: 0, max: 90, type: 'float', label: 'Alpha Angle (degrees)' },
    mcf: { min: 0, max: 100, type: 'float', label: 'Maximum Clot Firmness (MCF, mm)' },
    li30: { min: 0, max: 100, type: 'float', label: 'Lysis Index at 30 min (LI30, %)' },
  };

  const helperText = {
    ct: 'Time to initial clot formation (normal: 38-79 s for INTEM). Prolonged indicates clotting factor deficiency.',
    cft: 'Time to achieve clot strength (normal: 34-159 s for INTEM). Prolonged indicates fibrinogen deficiency.',
    alphaAngle: 'Rate of clot formation (normal: 63-83° for INTEM). Low indicates fibrinogen or platelet dysfunction.',
    mcf: 'Clot strength (normal: 50-72 mm for INTEM). Low indicates platelet dysfunction or low fibrinogen.',
    li30: 'Clot lysis at 30 minutes (normal: 94-100%). Low indicates hyperfibrinolysis.',
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });

    if (value === '') {
      setErrors({ ...errors, [field]: `${ranges[field].label} is required.` });
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setErrors({ ...errors, [field]: `${ranges[field].label} must be a number.` });
    } else if (numValue < ranges[field].min || numValue > ranges[field].max) {
      setErrors({ ...errors, [field]: `${ranges[field].label} must be between ${ranges[field].min} and ${ranges[field].max}.` });
    } else {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleCalculate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (formData[field] === '') {
        newErrors[field] = `${ranges[field].label} is required.`;
      } else {
        const numValue = parseFloat(formData[field]);
        if (isNaN(numValue) || numValue < ranges[field].min || numValue > ranges[field].max) {
          newErrors[field] = `${ranges[field].label} must be between ${ranges[field].min} and ${ranges[field].max}.`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    const ct = parseFloat(formData.ct);
    const cft = parseFloat(formData.cft);
    const alphaAngle = parseFloat(formData.alphaAngle);
    const mcf = parseFloat(formData.mcf);
    const li30 = parseFloat(formData.li30);

    let interpretation = [];
    if (ct > 79) interpretation.push('Prolonged CT: Consider fresh frozen plasma.');
    if (cft > 159) interpretation.push('Prolonged CFT: Consider cryoprecipitate.');
    if (alphaAngle < 63) interpretation.push('Low alpha angle: Consider cryoprecipitate or platelet transfusion.');
    if (mcf < 50) interpretation.push('Low MCF: Consider platelet transfusion.');
    if (li30 < 94) interpretation.push('Low LI30: Consider tranexamic acid for hyperfibrinolysis.');

    if (interpretation.length === 0) interpretation.push('Normal ROTEM parameters. No immediate intervention required.');

    setResult({ interpretation: interpretation.join(' ') });
  };

  const handleReset = () => {
    setFormData({ ct: '', cft: '', alphaAngle: '', mcf: '', li30: '' });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <Box className="card w-full max-w-2xl mx-auto p-6">
      <Typography variant="h6" className="header">ROTEM Interpretation Calculator</Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-400 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          Interprets rotational thromboelastometry (ROTEM) parameters for coagulation management. (Source: Miller’s Anesthesia, 9th Edition)
        </Typography>
      </Box>

      {hasErrors && (
        <Alert severity="warning" className="mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Please correct the errors below before calculating.
        </Alert>
      )}

      {Object.keys(formData).map((field) => (
        <Box key={field} className="mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">{ranges[field].label}</Typography>
          <Tooltip title={helperText[field]}>
            <TextField
              fullWidth
              type="number"
              value={formData[field]}
              onChange={handleChange(field)}
              placeholder={`Range: ${ranges[field].min}-${ranges[field].max}`}
              variant="outlined"
              error={!!errors[field]}
              helperText={errors[field] || helperText[field]}
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
        >
          Interpret ROTEM
        </Button>
        <Button variant="outlined" onClick={handleReset} className="w-full py-3">
          Reset
        </Button>
      </Box>

      {result && (
        <Box className="mt-6 pt-4 border-t border-gray-200">
          <Typography variant="h6" className="font-semibold text-gray-800 mb-2">ROTEM Interpretation</Typography>
          <Typography variant="body2" className="text-gray-600 mt-2">
            <strong>Interpretation:</strong> {result.interpretation}
          </Typography>
          <Box className="flex items-center mt-2">
            <Info className="w-4 h-4 text-teal-400 mr-1" />
            <Typography variant="body2" className="text-gray-600">
              Source: Miller’s Anesthesia, 9th Edition
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ROTEMInterpretation;