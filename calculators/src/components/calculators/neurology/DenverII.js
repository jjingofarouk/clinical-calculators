import React, { useState } from 'react';
import { Card, Typography, TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

const DenverII = () => {
  const [grossMotor, setGrossMotor] = useState('');
  const [fineMotor, setFineMotor] = useState('');
  const [language, setLanguage] = useState('');
  const [personalSocial, setPersonalSocial] = useState('');
  const [score, setScore] = useState(null);

  const calculateDenverII = () => {
    const gross = parseInt(grossMotor) || 0;
    const fine = parseInt(fineMotor) || 0;
    const lang = parseInt(language) || 0;
    const personal = parseInt(personalSocial) || 0;

    if ([gross, fine, lang, personal].some(val => val < 0 || val > 2)) {
      alert('Please enter values between 0 and 2 for all fields');
      return;
    }

    const totalScore = gross + fine + lang + personal;
    setScore(totalScore);
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
            Denver II Developmental Screening Test
          </Typography>

          <Box className="space-y-4">
            <Box>
              <Typography variant="subtitle2" className="mb-1">Gross Motor Skills (0-2)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={grossMotor}
                onChange={(e) => setGrossMotor(e.target.value)}
                type="number"
                inputProps={{ min: 0, max: 2 }}
                size="small"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Fine Motor Skills (0-2)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={fineMotor}
                onChange={(e) => setFineMotor(e.target.value)}
                type="number"
                inputProps={{ min: 0, max: 2 }}
                size="small"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Language Skills (0-2)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                type="number"
                inputProps={{ min: 0, max: 2 }}
                size="small"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" className="mb-1">Personal/Social Skills (0-2)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={personalSocial}
                onChange={(e) => setPersonalSocial(e.target.value)}
                type="number"
                inputProps={{ min: 0, max: 2 }}
                size="small"
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={calculateDenverII}
              sx={{ borderRadius: '8px', py: 1.5, backgroundColor: '#004C54' }}
            >
              Calculate
            </Button>

            {score !== null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Typography 
                  variant="h6" 
                  className="text-center font-semibold mt-4" 
                  sx={{ color: '#004C54' }}
                >
                  Total Score: {score}
                </Typography>
              </motion.div>
            )}
          </Box>
        </Card>
      </motion.div>
    </div>
  );
};

export default DenverII;