import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, Alert } from '@mui/material';

const ApacheIICalculator = () => {
  const [scores, setScores] = useState({
    age: '',
    temperature: '',
    heartRate: '',
    respiratoryRate: '',
    systolicBP: '',
    oxygen: '',
    arterialPH: '',
    sodium: '',
    potassium: '',
    creatinine: '',
    hematocrit: '',
    whiteBloodCellCount: '',
    glasgowComaScore: '',
  });

  const [totalScore, setTotalScore] = useState(null);

  const calculateAPACHEII = () => {
    let score = 0;

    // Validate if all fields are filled
    for (let key in scores) {
      if (scores[key] === '') {
        Alert.alert(
          'Error',
          `Please fill out the ${key.replace(/([A-Z])/g, ' $1').toUpperCase()} field.`
        );
        return;
      }
    }

    // Calculate the score based on the criteria
    score += parseInt(scores.age) > 44 ? 1 : 0;
    score += parseFloat(scores.temperature) < 30 || parseFloat(scores.temperature) > 39 ? 1 : 0;
    score += parseInt(scores.heartRate) > 180 ? 1 : 0;
    score += parseInt(scores.respiratoryRate) > 30 ? 1 : 0;
    score += parseInt(scores.systolicBP) < 70 ? 1 : 0;
    score += parseInt(scores.oxygen) < 60 ? 1 : 0;
    score += parseFloat(scores.arterialPH) < 7.2 || parseFloat(scores.arterialPH) > 7.5 ? 1 : 0;
    score += parseInt(scores.sodium) < 130 || parseInt(scores.sodium) > 150 ? 1 : 0;
    score += parseFloat(scores.potassium) < 3 || parseFloat(scores.potassium) > 6 ? 1 : 0;
    score += parseFloat(scores.creatinine) > 1.2 ? 1 : 0;
    score += parseFloat(scores.hematocrit) < 30 ? 1 : 0;
    score += parseInt(scores.whiteBloodCellCount) < 4000 ||
      parseInt(scores.whiteBloodCellCount) > 12000
      ? 1
      : 0;
    score += parseInt(scores.glasgowComaScore) < 13 ? 1 : 0;

    setTotalScore(score);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Card className="mb-4 shadow-lg">
        <CardContent>
          <Typography variant="h4" className="text-center text-blue-600 mb-4">
            APACHE II Score Calculator
          </Typography>
          <div className="mb-4">
            {/* Dynamic input fields for each score */}
            {Object.keys(scores).map((key) => (
              <div key={key} className="mb-4">
                <TextField
                  label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  variant="outlined"
                  type="number"
                  value={scores[key]}
                  onChange={(e) => setScores({ ...scores, [key]: e.target.value })}
                  fullWidth
                  placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                />
              </div>
            ))}

            {/* Button to calculate APACHE II score */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={calculateAPACHEII}
              className="mb-4"
            >
              Calculate Score
            </Button>

            {/* Display the calculated APACHE II score */}
            {totalScore !== null && (
              <Typography variant="h6" className="text-center text-green-600">
                Total APACHE II Score: {totalScore}
              </Typography>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApacheIICalculator;