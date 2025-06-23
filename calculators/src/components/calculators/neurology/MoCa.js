import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
  Container,
  Grid,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';

const MoCA = () => {
  const [responses, setResponses] = useState({
    educationAdjustment: 0,
    visuospatial: '',
    naming: '',
    memory: '',
    attention: '',
    language: '',
    abstraction: '',
    delayedRecall: '',
    orientation: '',
  });

  const handleChange = useCallback((field, value, max) => {
    const numericValue = parseInt(value, 10);
    if (value === '' || (!isNaN(numericValue) && numericValue >= 0 && numericValue <= max)) {
      setResponses((prev) => ({ ...prev, [field]: value }));
    }
  }, []);

  const handleEducationAdjustment = useCallback((hasLessEducation) => {
    setResponses((prev) => ({
      ...prev,
      educationAdjustment: hasLessEducation ? 1 : 0,
    }));
  }, []);

  const totalScore = Object.keys(responses).reduce((sum, key) => {
    if (key === 'educationAdjustment') return sum + responses[key];
    return sum + (parseInt(responses[key], 10) || 0);
  }, 0);

  const getSeverityColor = (score) => {
    if (score >= 26) return 'success.main';
    if (score >= 18) return 'warning.main';
    return 'error.main';
  };

  const InputField = ({ label, info, value, max, onChangeText, field }) => (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-4 shadow-sm">
        <CardContent>
          <Typography className="font-semibold text-gray-900 mb-2">{label}</Typography>
          <Typography className="text-sm text-gray-600 mb-4">{info}</Typography>
          <Box className="flex items-center">
            <TextField
              type="number"
              size="small"
              placeholder={`0-${max}`}
              value={value}
              onChange={(e) => onChangeText(field, e.target.value, max)}
              className="w-20 mr-2"
              InputProps={{ inputProps: { min: 0, max } }}
            />
            <Typography className="text-gray-600">Max: {max}</Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Container maxWidth="md" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="text-center mb-6">
          <Typography variant="h4" className="font-bold text-gray-900">
            Montreal Cognitive Assessment
          </Typography>
          <Typography className="text-gray-600 font-semibold">MoCA</Typography>
          <Divider className="w-1/3 mx-auto my-4" />
          <Typography className="text-gray-500">
            A comprehensive screening tool for mild cognitive impairment
          </Typography>
        </Box>

        <Card className="mb-4 shadow-sm" sx={{ bgcolor: '#F7FAFC' }}>
          <CardContent>
            <Typography className="font-semibold text-gray-900 mb-2">
              Education Level Assessment
            </Typography>
            <Typography className="text-sm text-gray-600 mb-4">
              Years of formal education
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant={responses.educationAdjustment === 1 ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleEducationAdjustment(true)}
                >
                  ≤ 12 Years (+1)
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant={responses.educationAdjustment === 0 ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleEducationAdjustment(false)}
                >
                  {'>'}12 Years (0)
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {[
          {
            label: 'Visuospatial/Executive',
            info: 'Tests visual and executive functioning. Involves copying a cube, drawing a clock (including the contour, numbers, and hands set to 10 past 11). One point is given for each correct element.',
            field: 'visuospatial',
            max: 5,
          },
          {
            label: 'Naming',
            info: 'Tests ability to name objects. Show the patient pictures of a Lion, Rhinoceros, and Camel. One point is given for each correct naming.',
            field: 'naming',
            max: 3,
          },
          {
            label: 'Memory',
            info: 'Tests delayed recall. Read the words "Face, Velvet, Church, Daisy, Red" aloud, and ask the patient to repeat them immediately (not scored). After 5 minutes, ask the patient to recall the words without prompts.',
            field: 'memory',
            max: 5,
          },
          {
            label: 'Attention',
            info: 'Tests attention. Includes forward digit span, backward digit span, letter tapping, and serial subtraction of 7s starting from 100.',
            field: 'attention',
            max: 6,
          },
          {
            label: 'Language',
            info: 'Tests sentence repetition and fluency. Ask the patient to repeat complex sentences exactly as stated and list words starting with "F" in one minute.',
            field: 'language',
            max: 3,
          },
          {
            label: 'Abstraction',
            info: 'Tests abstract reasoning. Ask the patient to explain similarities between pairs of items (e.g., "Train & Bicycle", "Watch & Ruler").',
            field: 'abstraction',
            max: 2,
          },
          {
            label: 'Delayed Recall',
            info: 'Tests ability to recall previously mentioned words without cues after a 5-minute delay.',
            field: 'delayedRecall',
            max: 5,
          },
          {
            label: 'Orientation',
            info: 'Tests orientation to time and place. Questions about date, month, year, day, place, and city.',
            field: 'orientation',
            max: 6,
          },
        ].map(({ label, info, field, max }) => (
          <InputField
            key={field}
            label={label}
            info={info}
            value={responses[field]}
            max={max}
            field={field}
            onChangeText={handleChange}
          />
        ))}

        <Card className="mb-4 shadow-sm">
          <CardContent>
            <Box className="flex justify-between items-center mb-4">
              <Typography className="font-semibold text-gray-900">Total Score</Typography>
              <Typography
                variant="h5"
                sx={{ color: getSeverityColor(totalScore) }}
              >
                {totalScore} / 30
              </Typography>
            </Box>
            <Box className="h-2 bg-gray-200 rounded-full mb-6">
              <Box
                className="h-full rounded-full"
                sx={{ width: `${(totalScore / 30) * 100}%`, bgcolor: getSeverityColor(totalScore) }}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box className="border-2 border-green-500 rounded-lg p-3 text-center">
                  <Typography className="font-semibold">26-30</Typography>
                  <Typography className="text-sm text-gray-600">Normal</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className="border-2 border-orange-500 rounded-lg p-3 text-center">
                  <Typography className="font-semibold">18-25</Typography>
                  <Typography className="text-sm text-gray-600">Mild Impairment</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className="border-2 border-red-500 rounded-lg p-3 text-center">
                  <Typography className="font-semibold">{'<18'}</Typography>
                  <Typography className="text-sm text-gray-600">Significant</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card className="mb-4 shadow-sm" sx={{ bgcolor: '#FFF5F5', border: '1px solid #FED7D7' }}>
          <CardContent>
            <Typography className="font-semibold text-red-700 mb-2">
              Important Note
            </Typography>
            <Typography className="text-gray-600">
              This assessment is a screening tool and should not replace comprehensive clinical evaluation. Results should be interpreted in conjunction with other clinical findings and patient history.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default MoCA;