import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';

const AmnioticFluidIndex = () => {
  const [quadrant1, setQuadrant1] = useState('');
  const [quadrant2, setQuadrant2] = useState('');
  const [quadrant3, setQuadrant3] = useState('');
  const [quadrant4, setQuadrant4] = useState('');
  const [afi, setAfi] = useState(null);
  const [interpretation, setInterpretation] = useState('');
  const [error, setError] = useState('');

  const calculateAFI = () => {
    const q1 = parseFloat(quadrant1) || 0;
    const q2 = parseFloat(quadrant2) || 0;
    const q3 = parseFloat(quadrant3) || 0;
    const q4 = parseFloat(quadrant4) || 0;

    if ([q1, q2, q3, q4].some((value) => isNaN(value))) {
      setError('Please enter valid numeric values for all quadrants.');
      return;
    }

    setError('');
    const afiValue = q1 + q2 + q3 + q4;
    setAfi(afiValue);

    if (afiValue < 5) {
      setInterpretation('Oligohydramnios (Low Amniotic Fluid Level)');
    } else if (afiValue >= 5 && afiValue <= 24) {
      setInterpretation('Normal Amniotic Fluid Level');
    } else if (afiValue > 24) {
      setInterpretation('Polyhydramnios (High Amniotic Fluid Level)');
    }
  };

  const handleInputChange = (setter) => (value) => {
    const numericValue = parseFloat(value);
    if (value === '' || (!isNaN(numericValue) && numericValue >= 0)) {
      setter(value);
    }
  };

  const getInterpretationColor = (interpretation) => {
    if (interpretation.includes('Normal')) return 'success.main';
    if (interpretation.includes('Oligohydramnios')) return 'error.main';
    if (interpretation.includes('Polyhydramnios')) return 'warning.main';
    return 'grey.600';
  };

  const fields = [
    { label: 'Quadrant 1 (cm)', value: quadrant1, setter: setQuadrant1 },
    { label: 'Quadrant 2 (cm)', value: quadrant2, setter: setQuadrant2 },
    { label: 'Quadrant 3 (cm)', value: quadrant3, setter: setQuadrant3 },
    { label: 'Quadrant 4 (cm)', value: quadrant4, setter: setQuadrant4 },
  ];

  return (
    <Container maxWidth="sm" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" className="font-bold text-center text-gray-900 mb-6">
          Amniotic Fluid Index (AFI)
        </Typography>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            {fields.map(({ label, value, setter }) => (
              <Box key={label} className="mb-4">
                <Typography className="font-semibold text-gray-900 mb-2">
                  {label}
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  variant="outlined"
                  value={value}
                  onChange={(e) => handleInputChange(setter)(e.target.value)}
                  placeholder={`Enter ${label.split(' ')[0]} Value`}
                  InputProps={{
                    inputProps: { min: 0, step: '0.1' },
                    sx: { borderRadius: '8px', bgcolor: '#F5F7FA' },
                  }}
                />
              </Box>
            ))}

            {error && (
              <Alert severity="error" className="mb-4">
                {error}
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              className="bg-gray-900 text-white"
              onClick={calculateAFI}
            >
              Calculate AFI
            </Button>

            {afi !== null && (
              <Box className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                <Typography variant="h6" className="font-bold text-gray-900 mb-2">
                  Amniotic Fluid Index (AFI): {afi} cm
                </Typography>
                <Typography
                  className="font-semibold"
                  sx={{ color: getInterpretationColor(interpretation) }}
                >
                  {interpretation}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default AmnioticFluidIndex;