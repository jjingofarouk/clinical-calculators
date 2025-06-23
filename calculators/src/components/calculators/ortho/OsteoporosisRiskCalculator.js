import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, TextField, Button, FormControlLabel, Checkbox, Typography, Box } from '@mui/material';

const OsteoporosisRiskCalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [familyHistory, setFamilyHistory] = useState(false);
  const [historyOfFractures, setHistoryOfFractures] = useState(false);
  const [risk, setRisk] = useState(null);

  const calculateOsteoporosisRisk = () => {
    if (!age || Number(age) <= 0) {
      alert('Please enter a valid age.');
      return;
    }
    let riskScore = (Number(age) / 10) + (gender === 'female' ? 1 : 0) + (familyHistory ? 1 : 0) + (historyOfFractures ? 1 : 0);
    setRisk(riskScore);
  };

  const resetFields = () => {
    setAge('');
    setGender('male');
    setFamilyHistory(false);
    setHistoryOfFractures(false);
    setRisk(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="shadow-lg">
          <CardHeader title="Osteoporosis Risk Assessment" className="bg-gray-50" />
          <CardContent className="p-6">
            <Box className="space-y-4">
              <TextField
                fullWidth
                type="number"
                label="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                variant="outlined"
                inputProps={{ min: 0 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gender === 'female'}
                    onChange={() => setGender(gender === 'female' ? 'male' : 'female')}
                  />
                }
                label="Female"
              />
              <FormControlLabel
                control={<Checkbox checked={familyHistory} onChange={() => setFamilyHistory(!familyHistory)} />}
                label="Family History of Osteoporosis"
              />
              <FormControlLabel
                control={<Checkbox checked={historyOfFractures} onChange={() => setHistoryOfFractures(!historyOfFractures)} />}
                label="Personal History of Fractures"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                onClick={calculateOsteoporosisRisk}
              >
                Calculate Osteoporosis Risk
              </Button>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                className="mt-2"
                onClick={resetFields}
              >
                Reset
              </Button>
              {risk !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 rounded-lg bg-white border border-gray-200 shadow-sm"
                >
                  <Typography variant="h6" className="font-bold text-gray-800 text-center">
                    Osteoporosis Risk Score: {risk.toFixed(2)}
                  </Typography>
                </motion.div>
              )}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OsteoporosisRiskCalculator;