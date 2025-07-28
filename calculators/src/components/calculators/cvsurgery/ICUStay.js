import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const ICUStay = () => {
  const [formData, setFormData] = useState({
    age: '',
    surgeryType: '',
    ef: '',
    renalFunction: '',
    diabetes: '',
    urgency: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    age: { min: 18, max: 100, type: 'integer', label: 'Age (years)' },
    surgeryType: { min: 1, max: 3, type: 'integer', label: 'Surgery Type (1 = CABG, 2 = Valve, 3 = Combined)' },
    ef: { min: 10, max: 80, type: 'integer', label: 'Ejection Fraction (%)' },
    renalFunction: { min: 0, max: 1, type: 'integer', label: 'Renal Dysfunction (0 = No, 1 = Yes)' },
    diabetes: { min: 0, max: 1, type: 'integer', label: 'Diabetes (0 = No, 1 = Yes)' },
    urgency: { min: 1, max: 3, type: 'integer', label: 'Procedure Urgency (1 = Elective, 2 = Urgent, 3 = Emergent)' },
  };

  const helperText = {
    age: 'Patient age in years (18-100)',
    surgeryType: 'Type of surgery: 1 = CABG, 2 = Valve, 3 = Combined',
    ef: 'Left ventricular ejection fraction (%) measured by echocardiography (10-80%)',
    renalFunction: 'Presence of renal dysfunction (e.g., creatinine > 2 mg/dL): 0 = No, 1 = Yes',
    diabetes: 'Presence of diabetes mellitus: 0 = No, 1 = Yes',
    urgency: 'Urgency of procedure: 1 = Elective, 2 = Urgent, 3 = Emergent',
  };

  const validateField = (field, value) => {
    if (value === '') {
      return `${ranges[field].label} is required`;
    }

    const numValue = ranges[field].type === 'float' ? parseFloat(value) : parseInt(value);
    
    if (isNaN(numValue)) {
      return `${ranges[field].label} must be a number`;
    }
    
    if (numValue < ranges[field].min || numValue > ranges[field].max) {
      return `${ranges[field].label} must be between ${ranges[field].min} and ${ranges[field].max}`;
    }
    
    if (ranges[field].type === 'integer' && !Number.isInteger(numValue)) {
      return `${ranges[field].label} must be an integer`;
    }
    
    return '';
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));

    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleCalculate = () => {
    const newErrors = {};
    let hasError = false;

    // Validate all fields
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      newErrors[field] = error;
      if (error) hasError = true;
    });

    setErrors(newErrors);

    if (hasError) {
      setResult(null);
      return;
    }

    // Parse form data to numbers
    const data = {
      age: parseInt(formData.age),
      surgeryType: parseInt(formData.surgeryType),
      ef: parseInt(formData.ef),
      renalFunction: parseInt(formData.renalFunction),
      diabetes: parseInt(formData.diabetes),
      urgency: parseInt(formData.urgency),
    };

    // Calculate coefficients based on risk factors
    const coefficients = {
      age: data.age > 65 ? 0.3 : 0,
      surgeryType: [0, 0, 0.2, 0.4][data.surgeryType] || 0,
      ef: data.ef < 50 ? 0.3 : 0,
      renalFunction: data.renalFunction === 1 ? 0.4 : 0,
      diabetes: data.diabetes === 1 ? 0.2 : 0,
      urgency: [0, 0, 0.5, 0.8][data.urgency] || 0,
    };

    const sum = Object.values(coefficients).reduce((a, b) => a + b, 0);
    const days = Math.max(1, Math.round(2 + sum * 3)); // Ensure minimum 1 day

    let riskLevel = '';
    let riskColor = '';
    let interpretation = '';

    if (days <= 3) {
      riskLevel = 'Short Stay';
      riskColor = 'success';
      interpretation = 'Short expected ICU stay; standard postoperative care recommended.';
    } else if (days <= 7) {
      riskLevel = 'Moderate Stay';
      riskColor = 'warning';
      interpretation = 'Moderate ICU stay expected; plan for extended monitoring and resource allocation.';
    } else {
      riskLevel = 'Prolonged Stay';
      riskColor = 'error';
      interpretation = 'Prolonged ICU stay expected; prepare for comprehensive management and additional resources.';
    }

    setResult({ days, riskLevel, riskColor, interpretation, coefficients });
  };

  const handleReset = () => {
    setFormData({
      age: '',
      surgeryType: '',
      ef: '',
      renalFunction: '',
      diabetes: '',
      urgency: '',
    });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');
  const isFormComplete = Object.values(formData).every((value) => value !== '');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 2 }}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          ICU Stay Duration Calculator
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Info size={20} style={{ marginRight: 8, color: '#1976d2' }} />
          <Typography variant="body2" color="text.secondary">
            Estimates duration of ICU stay after cardiothoracic surgery based on patient risk factors.
            <br />
            <strong>Source:</strong> Widyastuti et al., Ann Thorac Surg 2016
          </Typography>
        </Box>

        <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 2 }}>
          {hasErrors && !isFormComplete && (
            <Alert 
              severity="warning" 
              icon={<AlertCircle size={20} />}
              sx={{ mb: 3 }}
            >
              Please correct the errors below and complete all fields before calculating.
            </Alert>
          )}

          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            {Object.entries(formData).map(([field, value]) => (
              <Tooltip key={field} title={helperText[field]} placement="top" arrow>
                <TextField
                  fullWidth
                  label={ranges[field].label}
                  type="number"
                  value={value}
                  onChange={handleChange(field)}
                  placeholder={`${ranges[field].min}-${ranges[field].max}`}
                  variant="outlined"
                  error={!!errors[field]}
                  helperText={errors[field] || helperText[field]}
                  inputProps={{
                    min: ranges[field].min,
                    max: ranges[field].max,
                    step: ranges[field].type === 'integer' ? 1 : 0.1,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: 'primary.main' },
                    },
                  }}
                />
              </Tooltip>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleCalculate}
              disabled={hasErrors || !isFormComplete}
              fullWidth
              size="large"
              sx={{ py: 1.5, fontWeight: 600 }}
            >
              Calculate ICU Stay
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              fullWidth
              size="large"
              sx={{ py: 1.5, fontWeight: 600 }}
            >
              Reset Form
            </Button>
          </Box>

          {result && (
            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Calculation Results
              </Typography>
              
              <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
                <Box sx={{ p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.contrastText' }}>
                    Estimated ICU Stay
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>
                    {result.days} {result.days === 1 ? 'day' : 'days'}
                  </Typography>
                </Box>
                
                <Box sx={{ p: 2, bgcolor: `${result.riskColor}.light`, borderRadius: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Risk Category
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {result.riskLevel}
                  </Typography>
                </Box>
              </Box>

              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Clinical Interpretation:</strong> {result.interpretation}
                </Typography>
              </Alert>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Reference:</strong>{' '}
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/27499474/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1976d2', textDecoration: 'none' }}
                  >
                    Widyastuti Y, et al. Risk factors for prolonged mechanical ventilation after cardiac surgery. Ann Thorac Surg. 2016;102(4):1204-1209.
                  </a>
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ICUStay;