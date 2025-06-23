import React, { useState } from 'react';
import { Button, Card, TextField, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const HypertensiveNephropathyRiskScore = () => {
  const [age, setAge] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [score, setScore] = useState(null);

  const calculateRisk = () => {
    if (!age || !bloodPressure) return;
    const risk = parseFloat(age) * 0.1 + parseFloat(bloodPressure) * 0.5;
    setScore(risk.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-6">
          <Typography variant="h4" className="text-center font-bold mb-6">
            Hypertensive Nephropathy Risk Score
          </Typography>

          <Box className="space-y-4">
            <Box>
              <TextField
                fullWidth
                variant="outlined"
                label="Age (years)"
                placeholder="Reference: 18+"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                size="small"
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                variant="outlined"
                label="Blood Pressure (mmHg)"
                placeholder="Reference: < 120/80"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                type="number"
                size="small"
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={calculateRisk}
            >
              Calculate Risk Score
            </Button>

            {score && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Typography variant="h6" className="text-center mt-6">
                  Risk Score: {score}
                </Typography>
              </motion.div>
            )}
          </Box>
        </Card>
      </motion.div>
    </div>
  );
};

export default HypertensiveNephropathyRiskScore;