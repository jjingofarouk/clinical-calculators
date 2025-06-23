import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  Grid,
  Alert,
  Collapse,
} from '@mui/material';
import { motion } from 'framer-motion';

const PHQ9 = () => {
  const [responses, setResponses] = useState(Array(9).fill(null));
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const totalScore = responses.reduce((a, b) => a + (b || 0), 0);

  const getSeverity = () => {
    if (totalScore >= 20) return { text: 'Severe depression', color: 'error.main' };
    if (totalScore >= 15) return { text: 'Moderately severe depression', color: 'warning.main' };
    if (totalScore >= 10) return { text: 'Moderate depression', color: 'orange.main' };
    if (totalScore >= 5) return { text: 'Mild depression', color: 'grey.600' };
    return { text: 'Minimal depression', color: 'success.main' };
  };

  const handleResponse = (questionIndex, value) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = value;
    setResponses(newResponses);

    if (questionIndex === 8 && value >= 1) {
      setShowAlert(true);
    }
  };

  const questions = [
    {
      text: 'Little interest or pleasure in doing things?',
      subtext: 'Anhedonia assessment',
    },
    {
      text: 'Feeling down, depressed, or hopeless?',
      subtext: 'Mood evaluation',
    },
    {
      text: 'Trouble falling or staying asleep, or sleeping too much?',
      subtext: 'Sleep patterns',
    },
    {
      text: 'Feeling tired or having little energy?',
      subtext: 'Energy levels',
    },
    {
      text: 'Poor appetite or overeating?',
      subtext: 'Eating patterns',
    },
    {
      text: 'Feeling bad about yourself — or that you are a failure?',
      subtext: 'Self-worth assessment',
    },
    {
      text: 'Trouble concentrating on things?',
      subtext: 'Cognitive function',
    },
    {
      text: 'Moving or speaking very slowly or being fidgety/restless?',
      subtext: 'Psychomotor observation',
    },
    {
      text: 'Thoughts of being better off dead or hurting yourself?',
      subtext: 'Suicide risk assessment',
    },
  ];

  const frequencyOptions = [
    { text: 'Not at all', value: 0, color: 'success.main' },
    { text: 'Several days', value: 1, color: 'grey.600' },
    { text: 'More than half the days', value: 2, color: 'warning.main' },
    { text: 'Nearly every day', value: 3, color: 'error.main' },
  ];

  const severity = getSeverity();

  const renderQuestion = (question, index) => (
    <Card key={index} className="mb-4 shadow-sm">
      <CardContent>
        <Box className="flex items-start mb-4">
          <Typography className="font-bold text-gray-600 mr-3">
            Q{index + 1}
          </Typography>
          <Box>
            <Typography className="font-medium text-gray-900">
              {question.text}
            </Typography>
            <Typography className="text-sm text-gray-600">
              {question.subtext}
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          {frequencyOptions.map((option, optionIndex) => (
            <Grid item xs={12} sm={3} key={optionIndex}>
              <Button
                fullWidth
                variant={responses[index] === option.value ? 'contained' : 'outlined'}
                sx={{ bgcolor: responses[index] === option.value ? option.color : 'white' }}
                className={`${
                  responses[index] === option.value ? 'text-white' : 'border-gray-300'
                }`}
                onClick={() => handleResponse(index, option.value)}
              >
                {option.text}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
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
            PHQ-9 Depression Screening
          </Typography>
          <Typography className="text-gray-600">
            Patient assessment for the past 2 weeks
          </Typography>
        </Box>

        {showAlert && (
          <Alert
            severity="warning"
            onClose={() => setShowAlert(false)}
            className="mb-4"
          >
            Patient has indicated thoughts of self-harm or suicide. Immediate clinical assessment is recommended.
          </Alert>
        )}

        {questions.map((question, index) => renderQuestion(question, index))}

        <Card className="mb-4 shadow-sm" sx={{ bgcolor: `${severity.color}15` }}>
          <CardContent className="text-center">
            <Typography variant="h5" className="font-bold text-gray-900 mb-2">
              Total Score: {totalScore}/27
            </Typography>
            <Typography className="font-semibold" sx={{ color: severity.color }}>
              {severity.text}
            </Typography>
          </CardContent>
        </Card>

        <Button
          fullWidth
          variant="contained"
          className="bg-slate-800 text-white mb-4"
          onClick={() => setShowInterpretation(!showInterpretation)}
        >
          {showInterpretation ? 'Hide Clinical Guide' : 'Show Clinical Guide'}
        </Button>

        <Collapse in={showInterpretation}>
          <Card className="mb-4 shadow-sm">
            <CardContent>
              <Typography className="font-semibold text-gray-900 mb-4">
                Clinical Action Guide
              </Typography>
              <Typography className="font-medium text-gray-900 mb-2">
                Score Interpretation:
              </Typography>
              <Typography className="text-gray-600 mb-2">
                • 0-4: Monitor; may not require treatment
              </Typography>
              <Typography className="text-gray-600 mb-2">
                • 5-9: Mild symptoms; use clinical judgment
              </Typography>
              <Typography className="text-gray-600 mb-2">
                • 10-14: Consider active treatment
              </Typography>
              <Typography className="text-gray-600 mb-2">
                • 15-19: Active treatment needed
              </Typography>
              <Typography className="text-gray-600 mb-4">
                • 20-27: Urgent intervention required
              </Typography>
              <Typography className="font-medium text-gray-900 mb-2">
                Required Actions:
              </Typography>
              <Typography className="text-gray-600 mb-2">
                • Conduct suicide risk assessment for positive response to Q9
              </Typography>
              <Typography className="text-gray-600 mb-2">
                • Screen for bipolar disorder
              </Typography>
              <Typography className="text-gray-600 mb-2">
                • Assess for medical causes of depression
              </Typography>
              <Typography className="text-gray-600">
                • Consider referral to mental health specialist for scores ≥15
              </Typography>
            </CardContent>
          </Card>
        </Collapse>

        <Typography className="text-gray-600 italic text-center">
          For clinical use only. Final diagnosis should be based on comprehensive evaluation.
        </Typography>
      </motion.div>
    </Container>
  );
};

export default PHQ9;