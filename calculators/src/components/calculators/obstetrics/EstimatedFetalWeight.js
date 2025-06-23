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

const EstimatedFetalWeight = () => {
  const [biparietalDiameter, setBiparietalDiameter] = useState('');
  const [headCircumference, setHeadCircumference] = useState('');
  const [abdominalCircumference, setAbdominalCircumference] = useState('');
  const [femurLength, setFemurLength] = useState('');
  const [efw, setEfw] = useState(null);
  const [error, setError] = useState('');

  const calculateEFW = () => {
    const bpd = parseFloat(biparietalDiameter);
    const hc = parseFloat(headCircumference);
    const ac = parseFloat(abdominalCircumference);
    const fl = parseFloat(femurLength);

    if (isNaN(bpd) || isNaN(hc) || isNaN(ac) || isNaN(fl)) {
      setError('Please enter valid numeric values for all parameters.');
      return;
    }

    setError('');
    const logEfw = 1.3596 + 0.0016 * bpd + 0.0424 * ac + 0.174 * fl + 0.0067 * hc;
    const efwValue = Math.pow(10, logEfw);
    setEfw(efwValue.toFixed(2));
  };

  const handleInputChange = (setter) => (value) => {
    const numericValue = parseFloat(value);
    if (value === '' || (!isNaN(numericValue) && numericValue >= 0)) {
      setter(value);
    }
  };

  const fields = [
    {
      label: 'Biparietal Diameter (mm)',
      value: biparietalDiameter,
      setter: setBiparietalDiameter,
      placeholder: 'Enter BPD',
    },
    {
      label: 'Head Circumference (mm)',
      value: headCircumference,
      setter: setHeadCircumference,
      placeholder: 'Enter HC',
    },
    {
      label: 'Abdominal Circumference (mm)',
      value: abdominalCircumference,
      setter: setAbdominalCircumference,
      placeholder: 'Enter AC',
    },
    {
      label: 'Femur Length (mm)',
      value: femurLength,
      setter: setFemurLength,
      placeholder: 'Enter FL',
    },
  ];

  return (
    <Container maxWidth="sm" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" className="font-bold text-center text-gray-900 mb-6">
          Estimated Fetal Weight (EFW)
        </Typography>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            {fields.map(({ label, value, setter, placeholder }) => (
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
                  placeholder={placeholder}
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
              onClick={calculateEFW}
            >
              Calculate EFW
            </Button>

            {efw && (
              <Box className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                <Typography variant="h6" className="font-bold text-gray-900">
                  Estimated Fetal Weight (EFW): {efw} grams
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default EstimatedFetalWeight;