
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Divider,
  Collapse,
  Container,
  Alert,
  AlertTitle,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const GAD7 = () => {
  const [responses, setResponses] = useState(Array(7).fill(null));
  const [showGuide, setShowGuide] = useState(false);

  const totalScore = responses.reduce((a, b) => a + (b || 0), 0);

  const getSeverity = () => {
    if (totalScore >= 15) return { text: 'Severe anxiety', color: 'error.main' };
    if (totalScore >= 10) return { text: 'Moderate anxiety', color: 'warning.main' };
    if (totalScore >= 5) return { text: 'Mild anxiety', color: 'info.main' };
    return { text: 'Minimal anxiety', color: 'success.main' };
  };

  const questions = [
    {
      text: 'Feeling nervous, anxious, or on edge',
      clinical: 'Assesses general anxiety symptoms',
    },
    {
      text: 'Not being able to stop or control worrying',
      clinical: 'Evaluates worry control',
    },
    {
      text: 'Worrying too much about different things',
      clinical: 'Measures worry generalization',
    },
    {
      text: 'Trouble relaxing',
      clinical: 'Assesses physical tension',
    },
    {
      text: 'Being so restless that it\'s hard to sit still',
      clinical: 'Evaluates psychomotor agitation',
    },
    {
      text: 'Becoming easily annoyed or irritable',
      clinical: 'Measures irritability',
    },
    {
      text: 'Feeling afraid as if something awful might happen',
      clinical: 'Assesses anticipatory anxiety',
    },
  ];

  const frequencyOptions = [
    { text: 'Not at all', value: 0, color: 'bg-green-600' },
    { text: 'Several days', value: 1, color: 'bg-gray-500' },
    { text: 'More than half the days', value: 2, color: 'bg-orange-500' },
    { text: 'Nearly every day', value: 3, color: 'bg-red-600' },
  ];

  const handleResponse = (questionIndex, value) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = value;
    setResponses(newResponses);
  };

  const severity = getSeverity();

  return (
    <Container maxWidth="md" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="text-center mb-8">
          <Typography variant="h4" className="font-bold text-gray-900">
            GAD-7 Anxiety Assessment
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600 mt-2">
            Assessment period: Past 2 weeks
          </Typography>
        </Box>

        {totalScore >= 15 && (
          <Alert severity="error" className="mb-6">
            <AlertTitle>⚠️ High Anxiety Score Alert</AlertTitle>
            Patient shows signs of severe anxiety. Consider immediate clinical assessment.
          </Alert>
        )}

        {questions.map((question, index) => (
          <Card key={index} className="mb-4 shadow-sm">
            <CardContent>
              <Box className="flex items-start">
                <Typography className="font-bold text-gray-500 mr-4">
                  Q{index + 1}
                </Typography>
                <Box>
                  <Typography className="font-medium text-gray-900">
                    {question.text}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500 italic">
                    {question.clinical}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions className="px-4 pb-4">
              <Grid container spacing={2}>
                {frequencyOptions.map((option, optionIndex) => (
                  <Grid item xs={6} sm={3} key={optionIndex}>
                    <Button
                      fullWidth
                      variant={responses[index] === option.value ? 'contained' : 'outlined'}
                      className={`${
                        responses[index] === option.value
                          ? `${option.color} text-white`
                          : 'border-gray-300 text-gray-700'
                      } h-16`}
                      onClick={() => handleResponse(index, option.value)}
                    >
                      <Box className="flex flex-col items-center">
                        <Typography variant="body2">{option.text}</Typography>
                        <Typography variant="caption">({option.value})</Typography>
                      </Box>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardActions>
          </Card>
        ))}

        <Card className="mb-6 shadow-sm">
          <CardContent className="text-center" sx={{ bgcolor: `${severity.color}20` }}>
            <Typography variant="h5" className="font-bold text-gray-900 mb-2">
              Total Score: {totalScore}/21
            </Typography>
            <Chip
              label={severity.text}
              sx={{ bgcolor: severity.color, color: 'white' }}
            />
          </CardContent>
        </Card>

        <Button
          fullWidth
          variant="contained"
          className="bg-gray-900 text-white mb-6"
          endIcon={showGuide ? <ChevronUp /> : <ChevronDown />}
          onClick={() => setShowGuide(!showGuide)}
        >
          {showGuide ? 'Hide Clinical Guide' : 'Show Clinical Guide'}
        </Button>

        <Collapse in={showGuide}>
          <Card className="shadow-sm">
            <CardContent>
              <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                Clinical Interpretation Guide
              </Typography>

              <Box className="mb-4">
                <Typography className="font-semibold text-gray-900 mb-2">
                  Score Interpretation:
                </Typography>
                <Typography className="text-gray-600">
                  • 0-4: Minimal anxiety
                  <br />
                  • 5-9: Mild anxiety - Monitor
                  <br />
                  • 10-14: Moderate anxiety - Possible clinically significant condition
                  <br />
                  • ≥15: Severe anxiety - Active treatment warranted
                </Typography>
              </Box>

              <Divider className="my-4" />

              <Box className="mb-4">
                <Typography className="font-semibold text-gray-900 mb-2">
                  Critical Actions:
                </Typography>
                <Typography className="text-gray-600">
                  • Score ≥10: Consider referral to mental health professional
                  <br />
                  • Rule out medical causes (thyroid, cardiac, etc.)
                  <br />
                  • For Panic Disorder, Social Phobia, & PTSD: Consider using 8 as cutoff
                  <br />
                  • Conduct comprehensive mental status examination
                </Typography>
              </Box>

              <Divider className="my-4" />

              <Box>
                <Typography className="font-semibold text-gray-900 mb-2">
                  Management Guidelines:
                </Typography>
                <Typography className="text-gray-600">
                  • Mild: Monitor and reassess at follow-up
                  <br />
                  • Moderate: Consider psychotherapy or medication
                  <br />
                  • Severe: Active treatment with combined approach recommended
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Collapse>

        <Typography className="text-center text-gray-500 italic text-sm mt-6">
          For clinical use only. Final diagnosis requires comprehensive evaluation.
        </Typography>
      </motion.div>
    </Container>
  );
});

export default GAD7;
