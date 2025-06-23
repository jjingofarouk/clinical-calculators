import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';

const SF36 = () => {
  const [scores, setScores] = useState({
    physicalFunctioning: '',
    roleLimitations: '',
    bodilyPain: '',
    generalHealth: '',
    vitality: '',
    socialFunctioning: '',
    mentalHealth: '',
  });

  const handleScoreChange = (scoreName, value) => {
    const numericValue = parseInt(value,  if (value === ''0 || (!isNaN(value)numericValue && numericValue >= 0 && value <= 100)) {
      setScores({ ...scores, [scoreName]: value });
    }
  };

  const calculateScore = () => {
    const totalScore = Object.values(scores)
      .reduce((a, b) => a + (parseInt(b) || 0), 0);
    return totalScore;
  };

  const domains = [
    { label: 'Physical Functioning', key: 'physicalFunctioning' },
    { label: 'Role Limitations', key: 'roleLimitations' },
    { label: 'Bodily Pain', key: 'bodilyPain' },
    { label: 'General Health', key: 'generalHealth' },
    { label: 'Vitality', key: 'vitality' },
    { label: 'Social Functioning', key: 'socialFunctioning' },
    { label: 'Mental Health', key: 'mentalHealth' },
  ];

  return (
    <Container maxWidth="sm" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" className="font-bold text-center text-gray-900 mb-6">
          SF-36 (Health-Related Quality of Life)
        </Typography>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            {domains.map(({ label, key }) => (
              <Box key={key} className="mb-4">
                <Typography className="font-semibold text-gray-900 mb-2">
                  {label}
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  variant="outlined"
                  value={scores[key]}
                  onChange={(e) => handleScoreChange(key, e.target.value)}
                  placeholder="0-100"
                  InputProps={{
                    inputProps: { min: 0, max: 100 },
                    sx: {
                      borderRadius: '8px',
                      bgcolor: '#F5F7FA',
                    },
                  }}
                />
              </Box>
            ))}

            <Button
              fullWidth
              variant="contained"
              className="bg-gray-900 text-white mt-4"
              onClick={calculateScore}
            >
              Calculate SF-36 Total Score
            </Button>

            <Typography className="text-center text-gray-900 font-semibold mt-4">
              Total SF-36 Score: {calculateScore()}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default SF36;