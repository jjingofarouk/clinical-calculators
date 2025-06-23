import React, { useState } from 'react';
import { Card, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';
import { motion } from 'framer-motion';

const CHADSVASc = () => {
  const [age, setAge] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [stroke, setStroke] = useState(false);
  const [vascular, setVascular] = useState(false);
  const [female, setFemale] = useState(false);

  const score =
    (hypertension ? 1 : 0) +
    (diabetes ? 1 : 0) +
    (stroke ? 2 : 0) +
    (vascular ? 1 : 0) +
    (female ? 1 : 0) +
    (age ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0', opacity: '1' }}
        className="max-w-md mx-auto"
      >
        <Card className="p-6" sx={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Typography variant="h5" className="text-center font-bold mb-4" sx={{ color: '#004C54' }}>
            CHADS-VASc Score
          </Typography>

          <Box className="space-y-4">
            <FormControlLabel
              control={
                <Checkbox
                  checked={hypertension}
                  onChange={(e) => setHypertension(e.target.checked)}
                  color="primary"
                />
              }
              label="Hypertension"
              sx={{ '.MuiTypography-root': { fontSize: '1rem', fontWeight: 500, color: '#333' } }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={diabetes}
                  onChange={(e) => setDiabetes(e.target.checked)}
                  color="primary"
                />
              }
              label="Diabetes"
              sx={{ '.MuiTypography-root': { fontSize: '1rem', fontWeight: 500, color: '#333' } }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={stroke}
                  onChange={(e) => setStroke(e.target.checked)}
                  color="primary"
                />
              }
              label="Previous Stroke/TIA"
              sx={{ '.MuiTypography-root': { fontSize: '1rem', fontWeight: 500, color: '#333' } }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={vascular}
                  onChange={(e) => setVascular(e.target.checked)}
                  color="primary"
                />
              }
              label="Vascular Disease"
              sx={{ '.MuiTypography-root': { fontSize: '1rem', fontWeight: 500, color: '#333' } }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={female}
                  onChange={(e) => setFemale(e.target.checked)}
                  color="primary"
                />
              }
              label="Female Gender"
              sx={{ '.MuiTypography-root': { fontSize: '1rem', fontWeight: 500, color: '#333' } }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={age}
                  onChange={(e) => setAge(e.target.checked)}
                  color="primary"
                />
              }
              label="Age greater than 75"
              sx={{ '.MuiTypography-root': { fontSize: '1rem', fontWeight: 500, color: '#333' } }}
            />

            <Typography 
              variant="h6" 
              className="text-center font-semibold mt-4" 
              sx={{ color: '#004C54' }}
            >
              Total Score: {score}
            </Typography>
          </Box>
        </Card>
      </motion.div>
    </div>
  );
};

export default CHADSVASc;