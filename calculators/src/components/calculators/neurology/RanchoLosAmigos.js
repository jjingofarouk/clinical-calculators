import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  Grid,
  Collapse,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Save, TrendingUp } from 'lucide-react';

const RanchoLosAmigos = ({ patientName = '', onSave }) => {
  const [level, setLevel] = useState('1');
  const [history, setHistory] = useState([]);
  const [showTrends, setShowTrends] = useState(false);

  const levelColors = {
    '1': '#FF6B6B',
    '2': '#FF9F69',
    '3': '#FFD93D',
    '4': '#95DAC1',
    '5': '#7FB5FF',
    '6': '#6ECCAF',
    '7': '#4CACBC',
    '8': '#3D8361',
    '9': '#219F94',
    '10': '#006E7F',
  };

  const getDescription = (level) => {
    switch (level) {
      case '1':
        return {
          title: 'Level I: No Response/Total Assistance',
          response: 'No response to external stimuli.',
          clinicalFeatures: [
            'No response to external stimuli.',
            'Requires total assistance.',
          ],
        };
      case '2':
        return {
          title: 'Level II: Generalized Response/Total Assistance',
          response: 'Responds inconsistently and non-purposefully to external stimuli.',
          clinicalFeatures: [
            'Responds inconsistently and non-purposefully to external stimuli.',
            'Responses are often the same regardless of the stimulus applied.',
            'Requires total assistance.',
          ],
        };
      case '3':
        return {
          title: 'Level III: Localized Response/Total Assistance',
          response: 'Responds inconsistently and specifically to external stimuli.',
          clinicalFeatures: [
            'Responds inconsistently and specifically to external stimuli.',
            'Responses are directly related to the stimulus.',
            'Tends to be more responsive to familiar people (friends and family).',
            'Requires total assistance.',
          ],
        };
      case '4':
        return {
          title: 'Level IV: Confused and Agitated/Max Assistance',
          response: 'In a hyperactive state with bizarre and non-purposeful behavior.',
          clinicalFeatures: [
            'In a hyperactive state with bizarre and non-purposeful behavior.',
            'Demonstrates agitated behavior that originates more from internal confusion than external stimuli.',
            'Requires maximum assistance.',
          ],
        };
      case '5':
        return {
          title: 'Level V: Confused, Inappropriate/Non-agitated/Max Assistance',
          response: 'Shows increased consistency in following simple commands, but responses are non-purposeful.',
          clinicalFeatures: [
            'Can follow simple commands with increased consistency.',
            'Responses are non-purposeful and random for more complex commands.',
            'Behavior and verbalization are often inappropriate.',
            'Memory is severely impaired and learning new information is difficult.',
            'Requires maximum assistance.',
          ],
        };
      case '6':
        return {
          title: 'Level VI: Confused, Appropriate/Mod Assistance',
          response: 'Able to follow simple commands consistently and retain learning for familiar tasks.',
          clinicalFeatures: [
            'Able to follow simple commands consistently.',
            'Can retain learning for familiar tasks (e.g., brushing teeth).',
            'Demonstrates increased awareness of self and environment, but unaware of specific impairments.',
            'Requires moderate assistance.',
          ],
        };
      case '7':
        return {
          title: 'Level VII: Automatic, Appropriate/Min Assistance for ADLs',
          response: 'Oriented in familiar settings and can perform daily routines automatically.',
          clinicalFeatures: [
            'Oriented in familiar settings.',
            'Can perform daily routines automatically with minimal confusion.',
            'Requires at least minimal supervision for learning and safety purposes.',
          ],
        };
      case '8':
        return {
          title: 'Level VIII: Purposeful, Appropriate/Standby Assistance',
          response: 'Consistently oriented to person, place, and time and can carry out familiar tasks.',
          clinicalFeatures: [
            'Consistently oriented to person, place, and time.',
            'Can carry out familiar tasks in a non-distracting environment.',
            'Aware of specific impairments and requires standby assistance for compensatory skills.',
            'Able to use memory aids like schedules.',
            'Demonstrates improvement in memory and emotional regulation.',
          ],
        };
      case '9':
        return {
          title: 'Level IX: Purposeful, Appropriate/Standby Assistance on Request',
          response: 'Can independently shift between tasks and use compensatory strategies.',
          clinicalFeatures: [
            'Able to shift between tasks and complete them independently.',
            'Aware of impairments and uses compensatory strategies.',
            'Able to anticipate obstacles and understand the consequences of actions.',
            'Requires some assistance for problem-solving and social interactions.',
          ],
        };
      case '10':
        return {
          title: 'Level X: Purposeful, Appropriate/Modified Independent',
          response: 'Can multitask in various environments with compensatory strategies.',
          clinicalFeatures: [
            'Able to multitask with extra time and/or assistive devices.',
            'Creates methods for memory retention and anticipates obstacles.',
            'May demonstrate intermittent periods of depression or frustration under stress.',
            'Interacts appropriately with others in social situations.',
          ],
        };
      default:
        return {};
    }
  };

  const addToHistory = useCallback(() => {
    const timestamp = new Date().toISOString();
    const currentAssessment = {
      level,
      timestamp,
      description: getDescription(level),
    };
    setHistory((prev) => [...prev, currentAssessment]);

    if (onSave) {
      onSave(currentAssessment);
    }
  }, [level, onSave]);

  const renderLevelButton = (value, description) => (
    <Button
      key={value}
      variant={level === value ? 'contained' : 'outlined'}
      className={`m-2 ${level === value ? 'shadow-md' : ''}`}
      sx={{
        bgcolor: level === value ? levelColors[value] : 'white',
        borderColor: level === value ? levelColors[value] : '#E2E8F0',
        color: level === value ? 'white' : 'grey.900',
        borderRadius: '8px',
        textTransform: 'none',
        p: 2,
        minWidth: '120px',
        transform: level === value ? 'scale(1.05)' : 'scale(1)',
      }}
      onClick={() => setLevel(value)}
    >
      <Box className="flex flex-col items-start">
        <Typography className="font-bold">Level {value}</Typography>
        <Typography variant="caption" className={level === value ? 'text-white' : 'text-grey-600'}>
          {description.title.split(':')[1]}
        </Typography>
      </Box>
    </Button>
  );

  const description = getDescription(level);

  return (
    <Container maxWidth="md" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="text-center mb-6">
          <Typography variant="h4" className="font-bold text-gray-900">
            Rancho Los Amigos Scale
          </Typography>
          {patientName && (
            <Typography className="text-gray-600 mt-2">
              Patient: {patientName}
            </Typography>
          )}
        </Box>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            <Grid container spacing={2} className="justify-center">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((value) =>
                <Grid item key={value}>
                  {renderLevelButton(value.toString(), getDescription(value.toString()))}
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            <Typography className="font-bold text-gray-900 mb-2">
              Current Assessment: Level {level}
            </Typography>
            <Typography className="text-gray-600 mb-4">
              {new Date().toLocaleString()}
            </Typography>
            <Typography className="font-semibold text-gray-900 mb-2">
              {description.title}
            </Typography>
            <Typography className="text-gray-900 mb-4">
              {description.response}
            </Typography>
            <Typography className="font-semibold text-gray-900 mb-2">
              Clinical Features:
            </Typography>
            {description.clinicalFeatures.map((feature, index) => (
              <Box key={index} className="flex items-center mb-2">
                <Box className="mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#4CAF50"/>
                  </svg>
                </Box>
                <Typography className="text-gray-900">{feature}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>

        <Box className="flex justify-between mb-4">
          <Button
            variant="contained"
            startIcon={<Save />}
            className="bg-green-600 text-white"
            onClick={addToHistory}
            sx={{ flex: 0.48 }}
          >
            Save Assessment
          </Button>
          <Button
            variant="contained"
            startIcon={<TrendingUp />}
            className="bg-blue-600 text-white"
            onClick={() => setShowTrends(!showTrends)}
            sx={{ flex: 0.48 }}
          >
            Show Trends
          </Button>
        </Box>

        <Collapse in={showTrends && history.length > 0}>
          <Card className="mb-4 shadow-sm">
            <CardContent>
              <Typography className="font-semibold text-gray-900 mb-4">
                Assessment History
              </Typography>
              {history.map((entry, index) => (
                <Box key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <Typography className="font-semibold text-gray-900">
                    Level {entry.level}
                  </Typography>
                  <Typography className="text-gray-600">
                    {new Date(entry.timestamp).toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Collapse>
      </motion.div>
    </Container>
  );
};

export default RanchoLosAmigos;