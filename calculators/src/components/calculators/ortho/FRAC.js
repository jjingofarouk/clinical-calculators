import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, CardContent, TextField, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';

const FRAXCalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('female');
  const [bmd, setBMD] = useState('');
  const [smoking, setSmoking] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [glucocorticoids, setGlucocorticoids] = useState(false);
  const [familyHistory, setFamilyHistory] = useState(false);
  const [fractureRisk, setFractureRisk] = useState(null);

  const validateInputs = () => {
    if (age === '' || bmd === '') {
      alert('Please fill in all required fields.');
      return false;
    }
    if (isNaN(age) || isNaN(bmd) || age <= 0 || bmd <= 0) {
      alert('Please enter valid numeric values for age and BMD.');
      return false;
    }
    return true;
  };

  const calculateFRAX = () => {
    if (!validateInputs()) return;

    let risk = (parseFloat(age) + (gender === 'female' ? 10 : 0) + parseFloat(bmd)) / 100;

    if (smoking) risk += 0.05;
    if (alcohol) risk += 0.05;
    if (glucocorticoids) risk += 0.1;
    if (familyHistory) risk += 0.1;

    setFractureRisk((risk * 100).toFixed(2) + '%');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Typography variant="h4" className="font-bold text-gray-800 text-center mb-4">
          FRAX® Fracture Risk Assessment
        </Typography>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="space-y-4">
              <TextField
                fullWidth
                type="number"
                label="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                variant="outlined"
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
              <TextField
                fullWidth
                type="number"
                label="BMD (g/cm²)"
                value={bmd}
                onChange={(e) => setBMD(e.target.value)}
                variant="outlined"
              />
              <FormControlLabel
                control={<Checkbox checked={smoking} onChange={(e) => setSmoking(e.target.checked)} />}
                label="Smoker"
              />
              <FormControlLabel
                control={<Checkbox checked={alcohol} onChange={(e) => setAlcohol(e.target.checked)} />}
                label="Alcohol Consumption"
              />
              <FormControlLabel
                control={<Checkbox checked={glucocorticoids} onChange={(e) => setGlucocorticoids(e.target.checked)} />}
                label="Glucocorticoid Therapy"
              />
              <FormControlLabel
                control={<Checkbox checked={familyHistory} onChange={(e) => setFamilyHistory(e.target.checked)} />}
                label="Family History of Fractures"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                onClick={calculateFRAX}
              >
                Calculate Risk
              </Button>
              {fractureRisk && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <Typography variant="h6" className="font-bold text-gray-800 text-center">
                    Fracture Risk: {fractureRisk}
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

export default FRAXCalculator;