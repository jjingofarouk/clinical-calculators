import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, CardContent, Typography, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const QUESTIONS = [
  {
    text: 'Cough',
    description: 'I never cough (0) → I cough all the time (5)',
    detail: 'Consider frequency, severity, and impact on daily activities',
    id: 'question1'
  },
  {
    text: 'Phlegm',
    description: 'I have no phlegm in my chest (0) → My chest is completely full of phlegm (5)',
    detail: 'Consider color, amount, and consistency of phlegm',
    id: 'question2'
  },
  {
    text: 'Chest Tightness',
    description: 'My chest does not feel tight (0) → My chest feels very tight (5)',
    detail: 'Consider frequency and severity of chest tightness',
    id: 'question3'
  },
  {
    text: 'Breathlessness',
    description: 'Not breathless climbing stairs (0) → Very breathless climbing stairs (5)',
    detail: 'Consider impact on daily activities and exercise tolerance',
    id: 'question4'
  },
  {
    text: 'Activity Limitation',
    description: 'Not limited in activities (0) → Very limited in activities (5)',
    detail: 'Consider impact on household tasks and social activities',
    id: 'question5'
  },
  {
    text: 'Confidence',
    description: 'Confident leaving home (0) → Not confident leaving home (5)',
    detail: 'Consider impact on independence and social interactions',
    id: 'question6'
  },
  {
    text: 'Sleep',
    description: 'I sleep soundly (0) → I don\'t sleep soundly due to my condition (5)',
    detail: 'Consider quality of sleep and nighttime symptoms',
    id: 'question7'
  },
  {
    text: 'Energy',
    description: 'I have lots of energy (0) → I have no energy at all (5)',
    detail: 'Consider impact on daily energy levels and fatigue',
    id: 'question8'
  }
];

const CATCalculator = () => {
  const [answers, setAnswers] = useState({
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: null,
    question6: null,
    question7: null,
    question8: null,
  });
  const [score, setScore] = useState(null);
  const [result, setResult] = useState(null);

  const calculateCATScore = () => {
    if (Object.values(answers).some((value) => value === null)) {
      alert('Please ensure all questions are answered to generate an accurate assessment.');
      return;
    }

    const totalScore = Object.values(answers).reduce((sum, value) => sum + (value || 0), 0);
    setScore(totalScore);
    setResult(getCATInterpretation(totalScore));
  };

  const getCATInterpretation = (score) => {
    if (score <= 10) {
      return {
        impact: 'Low impact',
        description: 'Mild impact of COPD on daily life. Continue current management and monitoring.',
        recommendation: 'Consider bronchodilator therapy. Ensure preventive care is up to date.',
        color: '#4CAF50'
      };
    }
    if (score <= 20) {
      return {
        impact: 'Medium impact',
        description: 'Moderate impact of COPD on quality of life. May need treatment adjustment.',
        recommendation: 'Consider LABA/LAMA combination therapy. Review inhaler technique.',
        color: '#FFA726'
      };
    }
    if (score <= 30) {
      return {
        impact: 'High impact',
        description: 'Severe impact on daily activities. Treatment optimization recommended.',
        recommendation: 'Consider triple therapy. Evaluate for comorbidities.',
        color: '#F44336'
      };
    }
    return {
      impact: 'Very high impact',
      description: 'Very severe impact on quality of life. Urgent medical attention needed.',
      recommendation: 'Immediate specialist referral. Consider hospitalization if acute exacerbation.',
      color: '#D32F2F'
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
          COPD Assessment Test (CAT)
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600 text-center mb-8">
          Evaluate the impact of COPD on patient's health status
        </Typography>

        {QUESTIONS.map((q, index) => (
          <Card key={index} className="shadow-lg mb-6">
            <CardContent className="p-6">
              <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
                {q.text}
              </Typography>
              <Typography variant="body2" className="text-gray-600 mb-2">
                {q.description}
              </Typography>
              <Typography variant="body2" className="text-gray-500 italic mb-4">
                {q.detail}
              </Typography>
              <RadioGroup
                row
                value={answers[q.id] !== null ? answers[q.id].toString() : ''}
                onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: Number(e.target.value) }))}
              >
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value.toString()}
                    control={<Radio />}
                    label={value}
                    className="mr-4"
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
          onClick={calculateCATScore}
          sx={{ background: 'linear-gradient(to right, #007AFF, #0055FF)', padding: 2 }}
        >
          Generate Assessment
        </Button>

        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <Card className="shadow-lg" sx={{ borderLeft: `4px solid ${result.color}` }}>
              <CardContent className="p-6">
                <Typography variant="h6" className="font-bold text-gray-800 mb-4">
                  Assessment Results
                </Typography>
                <Typography variant="h5" sx={{ color: result.color, fontWeight: 'bold', mb: 2 }}>
                  CAT Score: {score}
                </Typography>
                <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
                  {result.impact}
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-4">
                  {result.description}
                </Typography>
                <Box sx={{ bgcolor: '#F5F6F7', p: 2, borderRadius: 2 }}>
                  <Typography variant="body1" className="font-medium text-gray-800">
                    Recommendation: {result.recommendation}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CATCalculator;