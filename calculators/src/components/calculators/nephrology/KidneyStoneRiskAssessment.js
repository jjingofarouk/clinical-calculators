import React, { useState } from 'react';
import { Button, Card, TextField, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const KidneyStoneRiskAssessment = () => {
  const [calcium, setCalcium] = useState('');
  const [oxalate, setOxalate] = useState('');
  const [risk, setRisk] = useState(null);

  const calculateRisk = () => {
    if (!calcium || !oxalate) return;
    const riskValue = parseFloat(calcium) * 0.1 + parseFloat(oxalate) * 0.2;
    setRisk(riskValue.toFixed(2));
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
            Kidney Stone Risk Assessment
          </Typography>

          <Box className="space-y-4">
            <Box>
              <TextField
                fullWidth
                variant="outlined"
                label="Calcium (mg/dL)"
                placeholder="Reference: 8.5-10.5"
                value={calcium}
                onChange={(e) => setCalcium(e.target.value)}
                type="number"
                size="small"
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                variant="outlined"
                label="Oxalate (mg/dL)"
                placeholder="Reference: < 40"
                value={oxalate}
                onChange={(e) => setOxalate(e.target.value)}
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
              Calculate Risk
            </Button>

            {risk && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Typography variant="h6" className="text-center mt-6">
                  Kidney Stone Risk: {risk}
                </Typography>
              </motion.div>
            )}
          </Box>
        </Card>
      </motion.div>
    </div>
  );
};

export default KidneyStoneRiskAssessment;