import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, Box } from '@mui/material';
import { Calculator, CheckCircle } from 'lucide-react';

const SOFACalculator = () => {
  const [scores, setScores] = useState({
    respiratory: '',
    coagulation: '',
    liver: '',
    cardiovascular: '',
    neurological: '',
    renal: '',
  });
  const [totalScore, setTotalScore] = useState(null);

  const calculateSOFA = () => {
    // Validate all inputs
    for (let key in scores) {
      if (scores[key] === '') {
        alert(`Error: Please fill out the ${key} field.`);
        return;
      }
    }

    // Calculate the total score based on user input
    const total = Object.values(scores).reduce((acc, val) => acc + (parseInt(val, 10) || 0), 0);
    setTotalScore(total);
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'gray.100', minHeight: '100vh' }}>
      <Card sx={{ maxWidth: 500, margin: 'auto', p: 2 }}>
        <CardContent>
          <Typography variant="h4" className="text-center text-blue-600 mb-4">
            <Calculator size={24} className="inline-block mr-2" /> SOFA Score Calculator
          </Typography>

          {/* Dynamic Input Fields */}
          {Object.keys(scores).map((key) => (
            <TextField
              key={key}
              label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
              variant="outlined"
              type="number"
              fullWidth
              value={scores[key]}
              onChange={(e) => setScores({ ...scores, [key]: e.target.value })}
              placeholder={`Enter ${key}`}
              className="mb-4"
            />
          ))}

          {/* Calculate Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={calculateSOFA}
            className="mb-4"
            startIcon={<CheckCircle />}
          >
            Calculate Score
          </Button>

          {/* Display Total Score */}
          {totalScore !== null && (
            <Typography variant="h6" className="text-center text-green-600">
              Total SOFA Score: {totalScore}
            </Typography>
          )}

          {/* Alert if missing input */}
          {totalScore === null && (
            <Typography variant="body1" className="text-center text-red-600 mt-4">
              <Calculator size={20} className="inline-block mr-1" /> Please ensure all fields are filled correctly.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SOFACalculator;