import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Container,
  IconButton,
  Collapse,
} from '@mui/material';
import { motion } from 'framer-motion';
import Select from 'react-select';
import InfoIcon from '@mui/icons-material/Info';

const BishopScore = () => {
  const [dilation, setDilation] = useState('');
  const [effacement, setEffacement] = useState('');
  const [station, setStation] = useState('');
  const [consistency, setConsistency] = useState('');
  const [position, setPosition] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const calculateScore = () => {
    let score = 0;

    const dilationScore = {
      0: 0,
      1: 0,
      2: 1,
      3: 1,
      4: 2,
      5: 2,
      6: 3,
    };
    score += dilationScore[Math.min(6, Math.floor(parseFloat(dilation) || 0))] || 0;

    const effacementValue = parseFloat(effacement) || 0;
    if (effacementValue <= 30) score += 0;
    else if (effacementValue <= 50) score += 1;
    else if (effacementValue <= 70) score += 2;
    else score += 3;

    const stationScores = {
      '-3': 0,
      '-2': 1,
      '-1': 2,
      '0': 2,
      '+1': 3,
      '+2': 3,
    };
    score += stationScores[station] || 0;

    const consistencyScores = { Firm: 0, Medium: 1, Soft: 2 };
    const positionScores = { Posterior: 0, Mid: 1, Anterior: 2 };

    score += consistencyScores[consistency] || 0;
    score += positionScores[position] || 0;

    return score;
  };

  const getInterpretation = (score) => {
    if (score <= 5) {
      return {
        text: 'Unfavorable for induction',
        detail: 'Success rate <50%. Consider cervical ripening.',
        color: '#FF6B6B',
      };
    } else if (score <= 8) {
      return {
        text: 'Moderately favorable',
        detail: 'Success rate 65-85%',
        color: '#4ECDC4',
      };
    } else {
      return {
        text: 'Highly favorable',
        detail: 'Success rate >85%',
        color: '#2ECC71',
      };
    }
  };

  const score = calculateScore();
  const interpretation = getInterpretation(score);

  const selectStyles = {
    control: (base) => ({
      ...base,
      borderColor: '#E2E8F0',
      borderRadius: '8px',
      backgroundColor: '#F8F9FA',
      '&:hover': { borderColor: '#004C54' },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }),
    option: (base, { isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? '#004C54' : '#FFFFFF',
      color: isSelected ? '#FFFFFF' : '#333333',
      '&:hover': {
        backgroundColor: isSelected ? '#004C54' : '#F5F7FA',
      },
    }),
  };

  const stationOptions = [
    { label: '-3 (High)', value: '-3' },
    { label: '-2', value: '-2' },
    { label: '-1', value: '-1' },
    { label: '0 (Engaged)', value: '0' },
    { label: '+1', value: '+1' },
    { label: '+2 (Low)', value: '+2' },
  ];

  const consistencyOptions = [
    { label: 'Firm (like cartilage)', value: 'Firm' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Soft (like vaginal wall)', value: 'Soft' },
  ];

  const positionOptions = [
    { label: 'Posterior', value: 'Posterior' },
    { label: 'Mid-position', value: 'Mid' },
    { label: 'Anterior', value: 'Anterior' },
  ];

  return (
    <Container maxWidth="md" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h4" className="font-bold text-gray-900">
            Bishop Score Assessment
          </Typography>
          <IconButton onClick={() => setShowInfo(!showInfo)}>
            <InfoIcon sx={{ color: '#339AF0' }} />
          </IconButton>
        </Box>

        <Collapse in={showInfo}>
          <Card className="mb-4 shadow-sm" sx={{ bgcolor: '#E7F5FF', borderLeft: '4px solid #339AF0' }}>
            <CardContent>
              <Typography className="font-semibold text-blue-700 mb-2">
                Clinical Information
              </Typography>
              <Typography className="text-gray-700">
                • The Bishop Score (1964) is the most widely used pre-induction cervical scoring system<br />
                • Scores ≥8 are associated with high probability of vaginal delivery<br />
                • Modified Bishop Score includes five components, each scored 0-2 or 0-3<br />
                • Meta-analysis shows 85% success rate for scores above 8<br />
                • ACOG recommends assessment before labor induction
              </Typography>
            </CardContent>
          </Card>
        </Collapse>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            <Box className="mb-4">
              <Typography className="font-semibold text-gray-900 mb-2">
                Cervical Dilation
              </Typography>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                value={dilation}
                onChange={(e) => setDilation(e.target.value)}
                placeholder="Enter 0-6 cm"
                InputProps={{
                  inputProps: { min: 0, max: 6, step: '0.1' },
                  sx: { borderRadius: '8px', bgcolor: '#F8F9FA' },
                }}
              />
              <Typography className="text-gray-600 text-sm mt-1">
                Measured in centimeters
              </Typography>
            </Box>

            <Box className="mb-4">
              <Typography className="font-semibold text-gray-900 mb-2">
                Cervical Effacement
              </Typography>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                value={effacement}
                onChange={(e) => setEffacement(e.target.value)}
                placeholder="Enter 0-100%"
                InputProps={{
                  inputProps: { min: 0, max: 100 },
                  sx: { borderRadius: '8px', bgcolor: '#F8F9FA' },
                }}
              />
              <Typography className="text-gray-600 text-sm mt-1">
                Percentage of cervical thinning
              </Typography>
            </Box>

            <Box className="mb-4">
              <Typography className="font-semibold text-gray-900 mb-2">
                Fetal Station
              </Typography>
              <Select
                options={stationOptions}
                value={stationOptions.find((option) => option.value === station)}
                onChange={(option) => setStation(option.value)}
                styles={selectStyles}
                placeholder="Select station"
              />
              <Typography className="text-gray-600 text-sm mt-1">
                Relation to ischial spines
              </Typography>
            </Box>

            <Box className="mb-4">
              <Typography className="font-semibold text-gray-900 mb-2">
                Cervical Consistency
              </Typography>
              <Select
                options={consistencyOptions}
                value={consistencyOptions.find((option) => option.value === consistency)}
                onChange={(option) => setConsistency(option.value)}
                styles={selectStyles}
                placeholder="Select consistency"
              />
            </Box>

            <Box>
              <Typography className="font-semibold text-gray-900 mb-2">
                Cervical Position
              </Typography>
              <Select
                options={positionOptions}
                value={positionOptions.find((option) => option.value === position)}
                onChange={(option) => setPosition(option.value)}
                styles={selectStyles}
                placeholder="Select position"
              />
            </Box>
          </CardContent>
        </Card>

        <Card className="shadow-sm" sx={{ borderLeft: `6px solid ${interpretation.color}` }}>
          <CardContent>
            <Typography variant="h5" className="font-bold text-gray-900 mb-2">
              Bishop Score: {score}/13
            </Typography>
            <Typography className="font-semibold mb-1" sx={{ color: interpretation.color }}>
              {interpretation.text}
            </Typography>
            <Typography className="text-gray-700">
              {interpretation.detail}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default BishopScore;