import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, CardContent, Typography, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const CLINICAL_THEME = {
  primary: '#2D3580',
  secondary: '#4B61DD',
  success: '#00A474',
  warning: '#FF9F3E',
  danger: '#E53E3E',
  background: '#FFFFFF',
  surface: '#F7FAFC',
  border: '#E2E8F0',
  text: '#1A202C',
  textLight: '#4A5568',
};

const QUESTIONS = [
  {
    id: 'q1',
    text: 'During the past 4 weeks, how often did your asthma prevent you from getting as much done at work, school or home?',
    options: [
      { value: 5, label: 'None of the time' },
      { value: 4, label: 'A little of the time' },
      { value: 3, label: 'Some of the time' },
      { value: 2, label: 'Most of the time' },
      { value: 1, label: 'All of the time' }
    ]
  },
  {
    id: 'q2',
    text: 'During the past 4 weeks, how often have you had shortness of breath?',
    options: [
      { value: 5, label: 'Not at all' },
      { value: 4, label: '1-2 times a week' },
      { value: 3, label: '3-6 times a week' },
      { value: 2, label: 'Once a day' },
      { value: 1, label: 'More than once a day' }
    ]
  },
  {
    id: 'q3',
    text: 'During the past 4 weeks, how often did your asthma symptoms (wheezing, coughing, chest tightness, shortness of breath) wake you up at night or earlier than usual in the morning?',
    options: [
      { value: 5, label: 'Not at all' },
      { value: 4, label: 'Once or twice' },
      { value: 3, label: 'Once a week' },
      { value: 2, label: '2-3 nights a week' },
      { value: 1, label: '4 or more times a week' }
    ]
  },
  {
    id: 'q4',
    text: 'During the past 4 weeks, how often have you used your reliever inhaler (usually blue)?',
    options: [
      { value: 5, label: 'Not at all' },
      { value: 4, label: 'Once a week or less' },
      { value: 3, label: '2-3 times a week' },
      { value: 2, label: '1-2 times a day' },
      { value: 1, label: '3 or more times a day' }
    ]
  },
  {
    id: 'q5',
    text: 'How would you rate your asthma control during the past 4 weeks?',
    options: [
      { value: 5, label: 'Completely controlled' },
      { value: 4, label: 'Well controlled' },
      { value: 3, label: 'Somewhat controlled' },
      { value: 2, label: 'Poorly controlled' },
      { value: 1, label: 'Not controlled at all' }
    ]
  }
];

const ACTCalculator = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    setScore(totalScore);
  };

  const getScoreInterpretation = (score) => {
    if (score >= 25) return {
      status: 'Well Controlled',
      color: CLINICAL_THEME.success,
      advice: 'Asthma appears to be under control. Continue current management plan. Schedule routine follow-up.'
    };
    if (score >= 20) return {
      status: 'Reasonably Controlled',
      color: CLINICAL_THEME.warning,
      advice: 'Consider reviewing current management plan. May benefit from treatment adjustment.'
    };
    return {
      status: 'Poor Control',
      color: CLINICAL_THEME.danger,
      advice: 'Urgent review of management plan recommended. Schedule follow-up appointment.'
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Typography variant="h4" className="font-bold text-gray-800 text-center mb-4">
          Asthma Control Test™
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600 text-center mb-8">
          Clinical Assessment Tool
        </Typography>

        <Card className="shadow-lg mb-6">
          <CardContent className="p-6 bg-gray-50">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
              Clinical Guidance
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              • Assessment period: Past 4 weeks<br />
              • Use for monitoring asthma control<br />
              • Validated for ages 12 and above<br />
              • Consider in conjunction with lung function tests
            </Typography>
          </CardContent>
        </Card>

        {QUESTIONS.map((question, index) => (
          <Card key={question.id} className="shadow-lg mb-6">
            <CardContent className="p-6">
              <Box className="flex items-start mb-4">
                <Typography className="font-bold text-gray-800 mr-4">
                  Q{index + 1}
                </Typography>
                <Typography className="text-gray-800">
                  {question.text}
                </Typography>
              </Box>
              <RadioGroup
                value={answers[question.id] || ''}
                onChange={(e) => setAnswers(prev => ({ ...prev, [question.id]: Number(e.target.value) }))}
              >
                {question.options.map((option, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                    className="mb-2"
                  />
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
          onClick={calculateScore}
          disabled={Object.keys(answers).length !== 5}
        >
          Calculate ACT Score
        </Button>

        {score !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <Card className="shadow-lg" style={{ borderLeft: `4px solid ${getScoreInterpretation(score).color}` }}>
              <CardContent className="p-6 text-center">
                <Typography variant="subtitle1" className="text-gray-600">
                  ACT Score
                </Typography>
                <Typography variant="h3" className="font-bold text-gray-800">
                  {score}/25
                </Typography>
                <Typography
                  variant="h6"
                  className="font-semibold"
                  style={{ color: getScoreInterpretation(score).color }}
                >
                  {getScoreInterpretation(score).status}
                </Typography>
              </CardContent>
            </Card>

            <Card className="shadow-lg mt-4">
              <CardContent className="p-6">
                <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
                  Clinical Recommendations
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {getScoreInterpretation(score).advice}
                </Typography>
              </CardContent>
            </Card>

            <Card className="shadow-lg mt-4">
              <CardContent className="p-6">
                <Typography variant="body2" className="text-gray-600 italic">
                  This tool is intended to support clinical decision-making and should be used in conjunction with other clinical assessments. Results should be documented in the patient's medical record.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ACTCalculator;