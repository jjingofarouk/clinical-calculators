import React, { useState } from 'react';
import { Box, Typography, Switch, TextField, Button } from '@mui/material';

const TIMICalculator = () => {
  const [ageOver65, setAgeOver65] = useState(false);
  const [riskFactors, setRiskFactors] = useState(0);
  const [knownCAD, setKnownCAD] = useState(false);
  const [aspirinUse, setAspirinUse] = useState(false);
  const [severeAngina, setSevereAngina] = useState(false);
  const [stChanges, setSTChanges] = useState(false);
  const [elevatedBiomarkers, setElevatedBiomarkers] = useState(false);
  const [result, setResult] = useState(null);

  const calculateTIMI = () => {
    let score = 0;

    score += ageOver65 ? 1 : 0;
    score += riskFactors >= 3 ? 1 : 0;
    score += knownCAD ? 1 : 0;
    score += aspirinUse ? 1 : 0;
    score += severeAngina ? 1 : 0;
    score += stChanges ? 1 : 0;
    score += elevatedBiomarkers ? 1 : 0;

    setResult(score);
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-2">
      <Typography variant="h4" className="header mb-4">
        TIMI Risk Calculator
      </Typography>

      <Box className="card w-full max-w-full p-4">
        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
            Age ≥ 65 years
          </Typography>
          <Switch
            checked={ageOver65}
            onChange={(e) => setAgeOver65(e.target.checked)}
            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
          />
        </Box>

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Number of Risk Factors (Hypertension, Smoking, Diabetes, Family History, Hyperlipidemia)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={String(riskFactors)}
          onChange={(e) => setRiskFactors(parseInt(e.target.value) || 0)}
          placeholder="Enter Number of Risk Factors (0-5)"
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
            Known Coronary Artery Disease (CAD)
          </Typography>
          <Switch
            checked={knownCAD}
            onChange={(e) => setKnownCAD(e.target.checked)}
            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
          />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
            Aspirin Use in Past 7 Days
          </Typography>
          <Switch
            checked={aspirinUse}
            onChange={(e) => setAspirinUse(e.target.checked)}
            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
          />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
            Severe Angina (≥2 episodes in 24 hours)
          </Typography>
          <Switch
            checked={severeAngina}
            onChange={(e) => setSevereAngina(e.target.checked)}
            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
          />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
            ST Changes (≥0.5 mm)
          </Typography>
          <Switch
            checked={stChanges}
            onChange={(e) => setSTChanges(e.target.checked)}
            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
          />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-700 mr-2">
            Elevated Cardiac Biomarkers
          </Typography>
          <Switch
            checked={elevatedBiomarkers}
            onChange={(e) => setElevatedBiomarkers(e.target.checked)}
            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0d9488' } }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={calculateTIMI}
          className="w-full py-3"
          sx={{
            backgroundColor: '#0d9488',
            '&:hover': { backgroundColor: '#0b8276' },
            textTransform: 'none',
            fontWeight: '600',
          }}
        >
          Calculate TIMI
        </Button>

        {result !== null && (
          <Box className="mt-5 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="header">
              TIMI Score
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900">
              {result}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TIMICalculator;