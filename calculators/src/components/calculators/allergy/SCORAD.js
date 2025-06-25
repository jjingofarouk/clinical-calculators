import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const SCORAD = () => {
  const [extent, setExtent] = useState('');
  const [erythema, setErythema] = useState('');
  const [edema, setEdema] = useState('');
  const [oozing, setOozing] = useState('');
  const [excoriation, setExcoriation] = useState('');
  const [lichenification, setLichenification] = useState('');
  const [dryness, setDryness] = useState('');
  const [pruritus, setPruritus] = useState('');
  const [sleepLoss, setSleepLoss] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const extentValue = parseFloat(extent);
    const erythemaValue = parseInt(erythema);
    const edemaValue = parseInt(edema);
    const oozingValue = parseInt(oozing);
    const excoriationValue = parseInt(excoriation);
    const lichenificationValue = parseInt(lichenification);
    const drynessValue = parseInt(dryness);
    const pruritusValue = parseInt(pruritus);
    const sleepLossValue = parseInt(sleepLoss);

    if (
      isNaN(extentValue) ||
      isNaN(erythemaValue) ||
      isNaN(edemaValue) ||
      isNaN(oozingValue) ||
      isNaN(excoriationValue) ||
      isNaN(lichenificationValue) ||
      isNaN(drynessValue) ||
      isNaN(pruritusValue) ||
      isNaN(sleepLossValue)
    ) {
      setError('Please enter valid numeric values for all fields.');
      return;
    }

    if (extentValue < 0 || extentValue > 100) {
      setError('Extent is outside the plausible range (0-100%). Please verify.');
      return;
    }
    if (
      erythemaValue < 0 || erythemaValue > 3 ||
      edemaValue < 0 || edemaValue > 3 ||
      oozingValue < 0 || oozingValue > 3 ||
      excoriationValue < 0 || excoriationValue > 3 ||
      lichenificationValue < 0 || lichenificationValue > 3 ||
      drynessValue < 0 || drynessValue > 3
    ) {
      setError('Intensity scores must be between 0 and 3. Please verify.');
      return;
    }
    if (pruritusValue < 0 || pruritusValue > 10 || sleepLossValue < 0 || sleepLossValue > 10) {
      setError('Subjective symptoms must be between 0 and 10. Please verify.');
      return;
    }

    const extentScore = extentValue / 5; // Part A: Extent
    const intensityScore = (erythemaValue + edemaValue + oozingValue + excoriationValue + lichenificationValue + drynessValue) * 2; // Part B: Intensity
    const subjectiveScore = pruritusValue + sleepLossValue; // Part C: Subjective symptoms
    const score = extentScore + intensityScore + subjectiveScore;

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

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        SCORAD Calculator
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The SCORAD assesses atopic dermatitis severity in patients using extent, intensity, and subjective symptoms.
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
          Extent (% body surface affected)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={extent}
          onChange={(e) => setExtent(e.target.value)}
          placeholder="Typical range: 0-100"
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
          Erythema (0-3)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={erythema}
          onChange={(e) => setErythema(e.target.value)}
          placeholder="Score: 0 (none) to 3 (severe)"
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
          Edema/Papulation (0-3)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={edema}
          onChange={(e) => setEdema(e.target.value)}
          placeholder="Score: 0 (none) to 3 (severe)"
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
          Oozing/Crusting (0-3)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={oozing}
          onChange={(e) => setOozing(e.target.value)}
          placeholder="Score: 0 (none) to 3 (severe)"
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
          Excoriation (0-3)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={excoriation}
          onChange={(e) => setExcoriation(e.target.value)}
          placeholder="Score: 0 (none) to 3 (severe)"
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
          Lichenification (0-3)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={lichenification}
          onChange={(e) => setLichenification(e.target.value)}
          placeholder="Score: 0 (none) to 3 (severe)"
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
          Dryness (0-3)
        </Typography>
          <TextField
            fullWidth
            type="number"
            value={dryness}
            onChange={(e) => setDryness(e.target.value)}
            placeholder="Score: 0 (none) to 3 (severe)"
            variant="outlined"
            className="mb-4"
            sx={{
              backgroundColor: '#fff',
              borderRadius: '#e2e',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#d1d5db' },
                '&:hover fieldset': { borderColor: '#0d9488' },
                '&.Mui-focused fieldset': { borderColor: '#0d9488' },
              },
            }}
          />

          <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
            Pruritus (0-10)
          </Typography>
            <TextField
              fullWidth
              type="number"
              value={pruritus}
              onChange={(e) => setPruritus(e.target.value))}
              placeholder="Score: 0 (none) to 10 (severe)"
              variant="outlined"
              className="mb-4"
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                '&.MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#d1d5db' },
                  '&:hover fieldset': { borderColor: '#0d9488' },
                  '&.Mui-focused fieldset': { borderColor: '#0d9488' },
                },
              }}
            />

            <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
              Sleep Loss (0-10)
            </Typography>
              <TextField
                fullWidth
                type="number"
                value={sleepLoss}
                onChange={(e) => setSleepLoss(e.target.value)}
                placeholder="Score: 0 (none) to 10 (severe)"
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

              <Button
                variant="contained"
                onClick={handleCalculate}
                className="w-full py-3 btn-primary"
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
                    <Info className="w-4 h-4 text-teal-600 mr-1" />
                    <Typography variant="body2" className="text-gray-600">
                      Source: European Task Force on Atopic Dermatitis, Dermatology 1993;186:23-31.{' '}
                      <a
                        href="https://pubmed.ncbi.nlm.nih.gov/8435513/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 underline"
                      >
                        Read study
                      </a>
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        );
      };

      export default SCORAD;