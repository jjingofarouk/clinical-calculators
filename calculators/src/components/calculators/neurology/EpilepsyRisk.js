import React, { useState } from 'react';
import { Card, Typography, TextField, Button, Box, FormControlLabel, Checkbox } from '@mui/material';
import { motion } from 'framer-motion';

const EpilepsyRisk = () => {
  const [age, setAge] = useState('');
  const [familyHistory, setFamilyHistory] = useState(false);
  const [seizures, setSeizures] = useState(false);
  const [riskScore, setRiskScore] = useState(null);

  const calculateRisk = () => {
    let score = 0;
    
    if (parseInt(age) < 20) score += 2;
    if (familyHistory) score += 3;
    if (seizures) score += 4;

    setRiskScore(score);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-md mx-auto"
      >
        <Card className="p-6" sx={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Typography variant="h5" className="text-center font-bold mb-4" sx={{ color: '#004C54' }}>
            Epilepsy Risk Assessment Score
          </Typography>

          <Box className="space-y-4">
            <Box>
              <Typography variant="subtitle2" className="mb-1">Age</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                placeholder="Enter Age"
                size="small"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Family History of Epilepsy?</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={familyHistory}
                    onChange={(e) => setFamilyHistory(e.target.checked)}
                    color="primary"
                  />
                }
                label="Yes"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Prior Seizures?</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={seizures}
                    onChange={(e) => setSeizures(e.target.checked)}
                    color="primary"
                  />
                }
                label="Yes"
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={calculateRisk}
              sx={{ borderRadius: '8px', py: 1.5, backgroundColor: '#004C54' }}
            >
              Calculate Risk
            </Button>

            {riskScore !== null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Typography 
                  variant="h6" 
                  className="text-center font-semibold mt-4" 
                  sx={{ color: '#004C54' }}
                >
                  Risk Score: {riskScore}
                </Typography>
              </motion.div>
            )}
          </Box>
        </Card>
      </motion.div>
    </div>
  );
};

export default EpilepsyRisk;