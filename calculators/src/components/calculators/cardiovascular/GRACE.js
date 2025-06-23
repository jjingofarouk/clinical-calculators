import React, { useState } from 'react';
import { Box, Typography, TextField, Switch, Button } from '@mui/material';

const GRACECalculator = () => {
  const [age, setAge] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [killipClass, setKillipClass] = useState(0);
  const [cardiacArrest, setCardiacArrest] = useState(false);
  const [stSegmentDeviation, setSTSegmentDeviation] = useState(false);
  const [elevatedBiomarkers, setElevatedBiomarkers] = useState(false);
  const [result, setResult] = useState(null);

  const calculateGRACE = () => {
    const ageNum = parseInt(age);
    const heartRateNum = parseInt(heartRate);
    const systolicBPNum = parseInt(systolicBP);
    const creatinineNum = parseFloat(creatinine);

    if (
      isNaN(ageNum) ||
      isNaN(heartRateNum) ||
      isNaN(systolicBPNum) ||
      isNaN(creatinineNum)
    ) {
      alert("Please enter valid numeric values.");
      return;
    }

    let score = 0;

    if (ageNum < 30) score += 0;
    else if (ageNum <= 39) score += 8;
    else if (ageNum <= 49) score += 25;
    else if (ageNum <= 59) score += 41;
    else if (ageNum <= 69) score += 58;
    else if (ageNum <= 79) score += 75;
    else if (ageNum <= 89) score += 91;
    else score += 100;

    if (heartRateNum < 50) score += 0;
    else if (heartRateNum <= 69) score += 3;
    else if (heartRateNum <= 89) score += 9;
    else if (heartRateNum <= 109) score += 15;
    else if (heartRateNum <= 149) score += 24;
    else if (heartRateNum <= 199) score += 38;
    else score += 46;

    if (systolicBPNum < 80) score += 58;
    else if (systolicBPNum <= 99) score += 53;
    else if (systolicBPNum <= 119) score += 43;
    else if (systolicBPNum <= 139) score += 34;
    else if (systolicBPNum <= 159) score += 24;
    else if (systolicBPNum <= 199) score += 10;
    else score += 0;

    if (creatinineNum < 0.4) score += 1;
    else if (creatinineNum <= 0.79) score += 4;
    else if (creatinineNum <= 1.19) score += 7;
    else if (creatinineNum <= 1.59) score += 10;
    else if (creatinineNum <= 1.99) score += 13;
    else if (creatinineNum <= 3.99) score += 21;
    else score += 28;

    if (killipClass === 1) score += 0;
    else if (killipClass === 2) score += 20;
    else if (killipClass === 3) score += 39;
    else if (killipClass === 4) score += 59;

    if (cardiacArrest) score += 39;
    if (stSegmentDeviation) score += 28;
    if (elevatedBiomarkers) score += 14;

    setResult(score);
  };

  return (
    <Box className="min-h-screen bg-gray-100 p-5">
      <Typography variant="h4" className="font-semibold text-gray-900 mb-8">
        GRACE Risk Calculator
      </Typography>

      <Box className="w-full bg-white rounded-xl p-5 shadow-md">
        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-2">
          Age
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter Age"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-2">
          Heart Rate (bpm)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          placeholder="Enter Heart Rate"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-2">
          Systolic Blood Pressure (mmHg)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={systolicBP}
          onChange={(e) => setSystolicBP(e.target.value)}
          placeholder="Enter Systolic BP"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-2">
          Creatinine (mg/dl)
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={creatinine}
          onChange={(e) => setCreatinine(e.target.value)}
          placeholder="Enter Serum Creatinine"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />

        <Typography variant="subtitle1" className="font-semibold text-gray-900 mb-2">
          Killip Class
        </Typography>
        <TextField
          fullWidth
          type="number"
          value={String(killipClass)}
          onChange={(e) => setKillipClass(parseInt(e.target.value) || 0)}
          placeholder="Enter Killip Class (1-4)"
          variant="outlined"
          className="mb-4"
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-2">
            Cardiac Arrest at Admission
          </Typography>
          <Switch checked={cardiacArrest} onChange={(e) => setCardiacArrest(e.target.checked)} />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-2">
            ST Segment Deviation
          </Typography>
          <Switch checked={stSegmentDeviation} onChange={(e) => setSTSegmentDeviation(e.target.checked)} />
        </Box>

        <Box className="flex items-center mb-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-900 mr-2">
            Elevated Cardiac Biomarkers
          </Typography>
          <Switch checked={elevatedBiomarkers} onChange={(e) => setElevatedBiomarkers(e.target.checked)} />
        </Box>

        <Button
          variant="contained"
          onClick={calculateGRACE}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg"
        >
          Calculate GRACE
        </Button>

        {result !== null && (
          <Box className="mt-5 pt-4 border-t border-gray-300">
            <Typography variant="h6" className="font-semibold text-teal-500">
              GRACE Score
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

export default GRACECalculator;