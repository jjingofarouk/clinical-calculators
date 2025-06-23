import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  IconButton,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';

const NIHStrokeScale = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scores, setScores] = useState({
    levelOfConsciousness: 0,
    bestGaze: 0,
    visualField: 0,
    motorArmRight: 0,
    motorArmLeft: 0,
    motorLegRight: 0,
    motorLegLeft: 0,
    limbAtaxia: 0,
    sensory: 0,
    language: 0,
    dysarthria: 0,
    extinction: 0,
  });

  const sections = [
    {
      title: 'Consciousness',
      items: [
        {
          name: 'Level of Consciousness',
          key: 'levelOfConsciousness',
          maxScore: 3,
          descriptions: [
            'Alert',
            'Sleepy but arouses',
            'Can\'t stay awake',
            'No purposeful response',
          ],
        },
        {
          name: 'Best Gaze',
          key: 'bestGaze',
          maxScore: 2,
          descriptions: [
            'Normal side-to-side',
            'Partial gaze',
            'No gaze movement',
          ],
        },
      ],
    },
    {
      title: 'Visual & Motor',
      items: [
        {
          name: 'Visual Field',
          key: 'visualField',
          maxScore: 3,
          descriptions: [
            'Normal fields',
            'Partial hemianopia',
            'Complete hemianopia',
            'Bilateral hemianopia',
          ],
        },
      ],
    },
    {
      title: 'Motor Arms',
      items: [
        {
          name: 'Right Arm',
          key: 'motorArmRight',
          maxScore: 4,
          descriptions: [
            'No drift',
            'Drift',
            'Can\'t resist gravity',
            'No antigravity',
            'No movement',
          ],
        },
        {
          name: 'Left Arm',
          key: 'motorArmLeft',
          maxScore: 4,
          descriptions: [
            'No drift',
            'Drift',
            'Can\'t resist gravity',
            'No antigravity',
            'No movement',
          ],
        },
      ],
    },
    {
      title: 'Motor Legs',
      items: [
        {
          name: 'Right Leg',
          key: 'motorLegRight',
          maxScore: 4,
          descriptions: [
            'No drift',
            'Drift',
            'Can\'t resist gravity',
            'No antigravity',
            'No movement',
          ],
        },
        {
          name: 'Left Leg',
          key: 'motorLegLeft',
          maxScore: 4,
          descriptions: [
            'No drift',
            'Drift',
            'Can\'t resist gravity',
            'No antigravity',
            'No movement',
          ],
        },
      ],
    },
    {
      title: 'Other Tests',
      items: [
        {
          name: 'Limb Ataxia',
          key: 'limbAtaxia',
          maxScore: 2,
          descriptions: [
            'Absent',
            'Present in one limb',
            'Present in two limbs',
          ],
        },
        {
          name: 'Sensory',
          key: 'sensory',
          maxScore: 2,
          descriptions: [
            'Normal',
            'Mild loss',
            'Severe loss',
          ],
        },
      ],
    },
    {
      title: 'Speech & Cognition',
      items: [
        {
          name: 'Language',
          key: 'language',
          maxScore: 3,
          descriptions: [
            'Normal',
            'Mild aphasia',
            'Severe aphasia',
            'Mute/global aphasia',
          ],
        },
        {
          name: 'Dysarthria',
          key: 'dysarthria',
          maxScore: 2,
          descriptions: [
            'Normal',
            'Mild',
            'Severe',
          ],
        },
        {
          name: 'Extinction',
          key: 'extinction',
          maxScore: 2,
          descriptions: [
            'No neglect',
            'Partial neglect',
            'Complete neglect',
          ],
        },
      ],
    },
  ];

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleScore = (key, value) => {
    setScores((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const navigateSection = (direction) => {
    const newSection = currentSection + direction;
    if (newSection >= 0 && newSection < sections.length) {
      setCurrentSection(newSection);
    }
  };

  const getSeverityColor = (score) => {
    if (score <= 4) return 'success.main';
    if (score <= 15) return 'warning.main';
    return 'error.main';
  };

  const renderScoreButton = (score, value, description, isSelected) => (
    <Button
      key={value}
      variant={isSelected ? 'contained' : 'outlined'}
      fullWidth
      className={`mb-2 ${isSelected ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
      onClick={() => handleScore(score, value)}
      sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
    >
      <Box className="flex items-center w-full">
        <Box
          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
            isSelected ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300'
          }`}
        >
          <Typography className="font-semibold">{value}</Typography>
        </Box>
        <Typography className={isSelected ? 'text-blue-700 font-medium' : 'text-gray-700'}>
          {description}
        </Typography>
      </Box>
    </Button>
  );

  return (
    <Container maxWidth="md" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4">
          <Typography variant="h5" className="font-bold text-gray-900">
            NIH Stroke Scale
          </Typography>
          <Box
            className="px-4 py-2 rounded-full"
            sx={{ bgcolor: getSeverityColor(totalScore) }}
          >
            <Typography className="text-white font-semibold">
              Score: {totalScore}
            </Typography>
          </Box>
        </Box>

        <Box className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4">
          <IconButton
            disabled={currentSection === 0}
            onClick={() => navigateSection(-1)}
            className={currentSection === 0 ? 'opacity-50' : ''}
          >
            <ChevronLeft />
          </IconButton>
          <Typography className="font-semibold text-gray-900">
            {sections[currentSection].title}
          </Typography>
          <IconButton
            disabled={currentSection === sections.length - 1}
            onClick={() => navigateSection(1)}
            className={currentSection === sections.length - 1 ? 'opacity-50' : ''}
          >
            <ChevronRight />
          </IconButton>
        </Box>

        <Box className="flex justify-center mb-4">
          {sections.map((_, index) => (
            <Box
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === currentSection ? 'w-3 h-3' : ''
              }`}
              sx={{ bgcolor: index === currentSection ? getSeverityColor(totalScore) : 'grey.300' }}
            />
          ))}
        </Box>

        {sections[currentSection].items.map((item) => (
          <Card key={item.key} className="mb-4 shadow-sm">
            <CardContent>
              <Typography className="font-semibold text-gray-900 mb-4">
                {item.name}
              </Typography>
              <Grid container spacing={2}>
                {[...Array(item.maxScore + 1)].map((_, index) =>
                  renderScoreButton(
                    item.key,
                    index,
                    item.descriptions[index],
                    scores[item.key] === index
                  )
                )}
              </Grid>
            </CardContent>
          </Card>
        ))}

        <Box className="flex items-center bg-white p-4 rounded-lg shadow mt-4">
          <AlertCircle className="text-gray-500 mr-2" size={20} />
          <Typography className="text-gray-600 flex-1">
            Use navigation arrows to move between sections.
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default NIHStrokeScale;