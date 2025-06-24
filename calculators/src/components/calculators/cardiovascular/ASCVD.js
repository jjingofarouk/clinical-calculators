import React, { useState } from 'react';
import { Box, Typography, TextField, Switch, Button, FormControlLabel, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const ASCVDCalculator = () => {
  const [age, setAge] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [hdl, setHdl] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [sex, setSex] = useState('male');
  const [diabetes, setDiabetes] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateASCVD = () => {
    setError('');
    const ageNum = Number(age);
    const cholesterolNum = Number(cholesterol);
    const hdlNum = Number(hdl);
    const systolicBPNum = Number(systolicBP);

    if (isNaN(ageNum) || isNaN(cholesterolNum) || isNaN(hdlNum) || isNaN(systolicBPNum)) {
      setError('Please enter valid numeric values for all fields.');
      return;
    }

    if (ageNum < 0 || ageNum > 120) {
      setError('Age is outside the plausible range (0-120 years). Please verify.');
      return;
    }
    if (cholesterolNum < 0 || cholesterolNum > 500) {
      setError('Total Cholesterol is outside the plausible range (0-500 mg/dL). Please verify.');
      return;
    }
    if (hdlNum < 0 || hdlNum > 150) {
      setError('HDL Cholesterol is outside the plausible range (0-150 mg/dL). Please verify.');
      return;
    }
    if (systolicBPNum < 0 || systolicBPNum > 300) {
      setError('Systolic BP is outside the plausible range (0-300 mmHg). Please verify.');
      return;
    }

    if (ageNum < 40 || ageNum > 79) {
      setError('Warning: Age is outside the validated range (40-79 years) for ASCVD calculation. Results may be less accurate.');
    }
    if (cholesterolNum < 130 || cholesterolNum > 320) {
      setError('Warning: Total Cholesterol is outside the validated range (130-320 mg/dL). Results may be less accurate.');
    }
    if (hdlNum < 20 || hdlNum > 100) {
      setError('Warning: HDL Cholesterol is outside the validated range (20-100 mg/dL). Results may be less accurate.');
    }
    if (systolicBPNum < 90 || systolicBPNum > 200) {
      setError('Warning: Systolic BP is outside the validated range (90-200 mmHg). Results may be less accurate.');
    }

    const lnAge = Math.log(ageNum);
    const lnChol = Math.log(cholesterolNum);
    const lnHdl = Math.log(hdlNum);
    const lnSbp = Math.log(systolicBPNum);

    let coefficients = sex === 'male' ? {
      lnAge: 12.344,
      lnChol: 11.853,
      lnHdl: -2.664,
      lnSbp: 2.733,
      smoking: 7.837,
      diabetes: 0.661,
      baseline: -29.799,
      mean: 86.61
    } : {
      lnAge: 17.114,
      lnChol: 0.94,
      lnHdl: -18.92,
      lnSbp: 1.998,
      smoking: 7.574,
      diabetes: 0.701,
      baseline: -29.18,
      mean: 69.845
    };

    let riskScore =
      coefficients.lnAge * lnAge +
      coefficients.lnChol * lnChol +
      coefficients.lnHdl * lnHdl +
      coefficients.lnSbp * lnSbp +
      (smoking ? coefficients.smoking : 0) +
      (diabetes ? coefficients.diabetes : 0);

    const riskPercentage = (1 - Math.pow(0.98634, Math.exp(riskScore - coefficients.mean))) * 100;
    const riskPercentageFixed = riskPercentage.toFixed(1);

    let riskLevel = '';
    let riskColor = '';
    let interpretation = '';

    if (riskPercentage < 5) {
      riskLevel = 'Low Risk';
      riskColor = 'bg-green-100 text-green-800';
      interpretation = 'Low risk of 10-year ASCVD events; maintain healthy lifestyle with regular monitoring.';
    } else if (riskPercentage >= 5 && riskPercentage < 7.5) {
      riskLevel = 'Borderline Risk';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Borderline risk of 10-year ASCVD events; consider lifestyle modifications and discuss statin therapy with risk enhancers.';
    } else if (riskPercentage >= 7.5 && riskPercentage <= 20) {
      riskLevel = 'Intermediate Risk';
      riskColor = 'bg-yellow-100 text-yellow-800';
      interpretation = 'Intermediate risk of 10-year ASCVD events; initiate moderate-intensity statin therapy and aggressive lifestyle changes.';
    } else {
      riskLevel = 'High Risk';
      riskColor = 'bg-red-100 text-red-800';
      interpretation = 'High risk of 10-year ASCVD events; initiate high-intensity statin therapy and intensive lifestyle interventions.';
    }

    setResult({ riskPercentage: riskPercentageFixed, riskLevel, riskColor, interpretation });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        ASCVD Risk Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The ASCVD Risk Calculator estimates 10-year cardiovascular event risk in adults with no prior cardiovascular disease.
        </Typography>
      </Box>

      <Box className="card w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {error && (
          <Alert severity="warning" className="mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </Alert>
        )}

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Age (years)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Normal range: 40-79"
          variant="outlined"
          className="mb-4"
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

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Total Cholesterol (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={cholesterol}
          onChange={(e) => setCholesterol(e.target.value)}
          placeholder="Normal range: 130-320"
          variant="outlined"
          className="mb-4"
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

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          HDL Cholesterol (mg/dL)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={hdl}
          onChange={(e) => setHdl(e.target.value)}
          placeholder="Normal range: 20-100"
          variant="outlined"
          className="mb-4"
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

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Systolic Blood Pressure (mmHg)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={systolicBP}
          onChange={(e) => setSystolicBP(e.target.value)}
          placeholder="Normal range: 90-200"
          variant="outlined"
          className="mb-4"
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

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
            Smoker
          </Typography>
          <Switch checked={smoking} onChange={(e) => setSmoking(e.target.checked)} />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
            Diabetes
          </Typography>
          <Switch checked={diabetes} onChange={(e) => setDiabetes(e.target.checked)} />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
            Sex
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={sex === 'female'}
                onChange={() => setSex(sex === 'male' ? 'female' : 'male')}
              />
            }
            label={sex === 'male' ? 'Male' : 'Female'}
          />
        </Box>

        <Button
          variant="contained"
          onClick={calculateASCVD}
          className="w-full py-3 btn-primary"
          sx={{
            backgroundColor: '#0d9488',
            '&:hover': { backgroundColor: '#0b8276' },
            textTransform: 'none',
            fontWeight: '600',
            borderRadius: 2,
          }}
        >
          Calculate ASCVD Risk
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              ASCVD 10-Year Risk Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.riskPercentage}%
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Risk Level
            </Typography>
            <Typography
              variant="body1"
              className={`font-medium p-2 rounded ${result.riskColor}`}
            >
              {result.riskLevel}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              <strong>Interpretation:</strong> {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Source: 2013 ACC/AHA Guideline on the Assessment of Cardiovascular Risk.{' '}
                <a
                  href="https://www.ahajournals.org/doi/10.1161/01.cir.0000437741.48606.98"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 underline"
                >
                  Read guideline
                </a>
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ASCVDCalculator;