import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  Grid,
  Alert,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';

const PHASESScore = () => {
  const [scores, setScores] = useState({
    population: 0,
    hypertension: 0,
    age: 0,
    size: 0,
    earlierSAH: 0,
    site: 0,
  });
  const [showAlert, setShowAlert] = useState(false);

  const calculateRuptureProbability = (score) => {
    const riskTable = {
      0: 0.4, 1: 0.4, 2: 0.4,
      3: 0.7,
      4: 0.9,
      5: 1.3,
      6: 1.7,
      7: 2.4,
      8: 3.2,
      9: 4.3,
      10: 5.3,
      11: 7.2,
      12: 17.8,
    };
    return score >= 12 ? 17.8 : riskTable[score];
  };

  const sections = [
    {
      title: 'Population',
      key: 'population',
      options: [
        { label: 'North American/European (non-Finnish)', value: 0, detail: 'Standard population risk' },
        { label: 'Japanese', value: 3, detail: 'Higher baseline risk' },
        { label: 'Finnish', value: 5, detail: 'Highest population risk' },
      ],
    },
    {
      title: 'Hypertension',
      key: 'hypertension',
      options: [
        { label: 'No', value: 0, detail: 'Normal blood pressure' },
        { label: 'Yes', value: 1, detail: 'Diagnosed hypertension' },
      ],
    },
    {
      title: 'Age',
      key: 'age',
      options: [
        { label: '< 70 years', value: 0, detail: 'Lower age-related risk' },
        { label: '≥ 70 years', value: 1, detail: 'Higher age-related risk' },
      ],
    },
    {
      title: 'Size of Aneurysm',
      key: 'size',
      options: [
        { label: '< 7.0 mm', value: 0, detail: 'Small aneurysm' },
        { label: '7.0-9.9 mm', value: 3, detail: 'Medium aneurysm' },
        { label: '10.0-19.9 mm', value: 6, detail: 'Large aneurysm' },
        { label: '≥ 20.0 mm', value: 10, detail: 'Giant aneurysm' },
      ],
    },
    {
      title: 'Earlier SAH',
      key: 'earlierSAH',
      options: [
        { label: 'No', value: 0, detail: 'No previous subarachnoid hemorrhage' },
        { label: 'Yes', value: 1, detail: 'History of SAH from another aneurysm' },
      ],
    },
    {
      title: 'Site of Aneurysm',
      key: 'site',
      options: [
        { label: 'Internal carotid artery (ICA)', value: 0, detail: 'Lowest site-related risk' },
        { label: 'Middle cerebral artery (MCA)', value: 2, detail: 'Moderate site-related risk' },
        { label: 'ACA/PComm/Posterior circulation', value: 4, detail: 'Highest site-related risk' },
      ],
    },
  ];

  const handleSelection = (sectionKey, value) => {
    const newScores = { ...scores, [sectionKey]: value };
    setScores(newScores);
    
    if (value === 10) {
      setShowAlert(true);
    }
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const ruptureProbability = calculateRuptureProbability(totalScore);

  const getRiskLevel = (probability) => {
    if (probability >= 7) return { text: 'High Risk', color: 'error.main' };
    if (probability >= 3) return { text: 'Moderate Risk', color: 'warning.main' };
    return { text: 'Low Risk', color: 'success.main' };
  };

  const riskLevel = getRiskLevel(ruptureProbability);

  return (
    <Container maxWidth="md" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="text-center mb-6">
          <Typography variant="h4" className="font-bold text-gray-900">
            PHASES Score Calculator
          </Typography>
          <Typography className="text-gray-600">
            5-Year Aneurysm Rupture Risk Assessment
          </Typography>
        </Box>

        {showAlert && (
          <Alert
            severity="warning"
            onClose={() => setShowAlert(false)}
            className="mb-4"
          >
            <Typography>
              Giant aneurysm (≥20mm) detected. Consider urgent neurosurgical consultation.
            </Typography>
          </Alert>
        )}

        {sections.map((section) => (
          <Card key={section.key} className="mb-4 shadow-sm">
            <CardContent>
              <Typography className="font-semibold text-gray-900 mb-4">
                {section.title}
              </Typography>
              <Grid container spacing={2}>
                {section.options.map((option) => (
                  <Grid item xs={12} key={option.value}>
                    <Button
                      fullWidth
                      variant={scores[section.key] === option.value ? 'contained' : 'outlined'}
                      className={scores[section.key] === option.value ? 'bg-slate-800' : 'border-gray-300'}
                      onClick={() => handleSelection(section.key, option.value)}
                      sx={{ justifyContent: 'space-between', textTransform: 'none', p: 2 }}
                    >
                      <Box className="flex flex-col items-start">
                        <Typography className={scores[section.key] === option.value ? 'text-white' : 'text-gray-900'}>
                          {option.label}
                        </Typography>
                        <Typography
                          className={scores[section.key] === option.value ? 'text-white' : 'text-gray-600'}
                          variant="caption"
                        >
                          {option.detail}
                        </Typography>
                      </Box>
                      <Typography className={scores[section.key] === option.value ? 'text-white' : 'text-gray-900'}>
                        {option.value > 0 ? `+${option.value}` : '0'}
                      </Typography>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        ))}

        <Card className="mb-4 shadow-sm" sx={{ bgcolor: `${riskLevel.color}15` }}>
          <CardContent className="text-center">
            <Typography variant="h5" className="font-bold text-gray-900 mb-2">
              Total Score: {totalScore}
            </Typography>
            <Typography className="text-gray-900 mb-2">
              5-Year Rupture Risk: {ruptureProbability}%
            </Typography>
            <Typography className="font-semibold" sx={{ color: riskLevel.color }}>
              {riskLevel.text}
            </Typography>
          </CardContent>
        </Card>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            <Typography className="font-semibold text-gray-900 mb-4">
              Clinical Recommendations
            </Typography>
            <Typography className="text-gray-600 mb-2">
              • Score ≤2: Consider conservative management with regular monitoring
            </Typography>
            <Typography className="text-gray-600 mb-2">
              • Score 3-6: Individual risk assessment needed; consider patient factors
            </Typography>
            <Typography className="text-gray-600 mb-2">
              • Score 7-11: Consider intervention based on patient factors
            </Typography>
            <Typography className="text-gray-600">
              • Score ≥12: Strong consideration for intervention
            </Typography>
          </CardContent>
        </Card>

        <Typography className="text-gray-600 italic text-center">
          Validated only in North American, European, Japanese, and Finnish populations. Use clinical judgment in conjunction with score results.
        </Typography>
      </motion.div>
    </Container>
  );
};

export default PHASESScore;