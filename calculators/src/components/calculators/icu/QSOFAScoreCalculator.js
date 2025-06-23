import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, Box } from '@mui/material';
import { AlertCircle, CheckCircle } from 'lucide-react';

const QSOFAScoreCalculator = () => {
  const [scores, setScores] = useState({
    respiratoryRate: '',
    systolicBP: '',
    alteredMentalStatus: false,
  });
  const [totalScore, setTotalScore] = useState(0);

  // Handle score calculation logic
  const calculateQSOFA = () => {
    let score = 0;

    // Validate inputs
    if (!scores.respiratoryRate || !scores.systolicBP) {
      alert('Error: Please fill all fields correctly.');
      return;
    }

    // Convert inputs to numbers for proper comparison
    const respiratoryRate = parseInt(scores.respiratoryRate, 10);
    const systolicBP = parseInt(scores.systolicBP, 10);

    // Calculate score based on criteria
    if (respiratoryRate > 22) score += 1;
    if (systolicBP < 100) score += 1;
    if (scores.alteredMentalStatus) score += 1;

    setTotalScore(score);
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'gray.100', minHeight: '100vh' }}>
      <Card sx={{ maxWidth: 500, margin: 'auto', p: 2 }}>
        <CardContent>
          <Typography variant="h4" className="text-center text-blue-600 mb-4">
            QSOFA Score Calculator
          </Typography>

          {/* Respiratory Rate Input */}
          <TextField
            label="Respiratory Rate"
            variant="outlined"
            type="number"
            fullWidth
            value={scores.respiratoryRate}
            onChange={(e) => setScores({ ...scores, respiratoryRate: e.target.value })}
            placeholder="Enter Respiratory Rate"
            className="mb-4"
          />

          {/* Systolic BP Input */}
          <TextField
            label="Systolic BP"
            variant="outlined"
            type="number"
            fullWidth
            value={scores.systolicBP}
            onChange={(e) => setScores({ ...scores, systolicBP: e.target.value })}
            placeholder="Enter Systolic BP"
            className="mb-4"
          />

          {/* Altered Mental Status Input */}
          <TextField
            label="Altered Mental Status (1 for Yes, 0 for No)"
            variant="outlined"
            type="number"
            fullWidth
            value={scores.alteredMentalStatus ? '1' : '0'}
            onChange={(e) =>
              setScores({ ...scores, alteredMentalStatus: e.target.value === '1' })
            }
            placeholder="Enter 1 for Yes, 0 for No"
            className="mb-4"
          />

          {/* Calculate Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={calculateQSOFA}
            className="mb-4"
            startIcon={<CheckCircle />}
          >
            Calculate Score
          </Button>

          {/* Result */}
          <Typography variant="h6" className="text-center text-green-600">
            Total QSOFA Score: {totalScore}
          </Typography>

          {/* Alert if missing input */}
          {totalScore === 0 && (
            <Typography variant="body1" className="text-center text-red-600 mt-4">
              <AlertCircle size={20} /> Please ensure all fields are filled correctly.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default QSOFAScoreCalculator;