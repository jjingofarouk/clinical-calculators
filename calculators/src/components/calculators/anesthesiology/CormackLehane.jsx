// CormackLehane.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Button,
  Modal,
  IconButton,
  Alert,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Info,
  Stethoscope,
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  BarChart2,
  HeartPulse,
  Syringe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CormackLehane = () => {
  const [grade, setGrade] = useState(null);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showGradeGuide, setShowGradeGuide] = useState(false);
  const [showAnesthesiaGuide, setShowAnesthesiaGuide] = useState(false);

  const cormackLehaneGrades = [
    { grade: '1', description: 'Full view of glottis' },
    { grade: '2a', description: 'Partial view of glottis' },
    { grade: '2b', description: 'Only posterior portion of glottis or arytenoids visible' },
    { grade: '3a', description: 'Only epiglottis visible, liftable' },
    { grade: '3b', description: 'Only epiglottis visible, not liftable' },
    { grade: '4', description: 'No glottic structures visible' },
  ];

  const anesthesiaGuidance = {
    '1-2a': {
      risk: 'Low',
      considerations: [
        'Standard intubation techniques (direct or video laryngoscopy) typically successful',
        'Use of Macintosh blade or standard video laryngoscope recommended',
        'Minimal airway adjuncts needed',
        'Low risk of desaturation; standard preoxygenation sufficient',
        'Routine monitoring during intubation (SpO2, ETCO2)',
        'Post-intubation airway management straightforward'
      ],
      icon: <CheckCircle size={20} className="text-green-500" />
    },
    '2b-3a': {
      risk: 'Moderate',
      considerations: [
        'Increased difficulty in intubation; video laryngoscopy preferred',
        'Consider hyperangulated blade (e.g., GlideScope) for better visualization',
        'Prepare airway adjuncts (bougie, stylet, LMA as backup)',
        'Extended preoxygenation (3-5 min) to prevent desaturation',
        'Use rapid sequence induction (RSI) if aspiration risk present',
        'Plan for potential difficult airway cart availability'
      ],
      icon: <AlertTriangle size={20} className="text-yellow-500" />
    },
    '3b-4': {
      risk: 'High',
      considerations: [
        'High risk of difficult intubation; anticipate failure of standard techniques',
        'Mandatory use of advanced airway tools (fiberoptic, video laryngoscope)',
        'Prepare for awake intubation or surgical airway as backup',
        'Maximize preoxygenation (8 min with CPAP or BiPAP if possible)',
        'Multidisciplinary team (ENT, anesthesia) on standby for emergency airway',
        'Post-intubation ICU monitoring for airway edema or complications'
      ],
      icon: <XCircle size={20} className="text-red-500" />
    }
  };

  const handleGradeSelection = (event, newGrade) => {
    if (newGrade !== null) {
      setGrade(newGrade);
      setError('');
      setShowResults(true);
    }
  };

  const resetForm = () => {
    setGrade(null);
    setError('');
    setShowResults(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-screen min-h-screen container bg-gray-50"
    >
      <Box className="p-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <Typography className="header">
            <Stethoscope size={24} className="inline mr-2" />
            Cormack-Lehane Classification
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600">
             Airway Assessment
          </Typography>
        </motion.div>

        <Collapse in={!!error}>
          <Alert severity="error" className="mb-4 max-w-4xl mx-auto">
            {error}
          </Alert>
        </Collapse>

        <motion.div
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="card">
            <CardContent>
              <Typography className="header">
                <Activity size={20} className="inline mr-2" />
                Airway Assessment
              </Typography>
              <Box className="space-y-4">
                <Box>
                  <Box className="flex items-center mb-2">
                    <Typography>Cormack-Lehane Grade</Typography>
                    <IconButton onClick={() => setShowGradeGuide(true)}>
                      <Info size={20} />
                    </IconButton>
                  </Box>
                  <ToggleButtonGroup
                    value={grade}
                    exclusive
                    onChange={handleGradeSelection}
                    className="w-full flex-wrap"
                  >
                    {cormackLehaneGrades.map((level) => (
                      <ToggleButton key={level.grade} value={level.grade} className="flex-1 min-w-[100px]">
                        {level.grade}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                  <Typography variant="caption" className="text-gray-500">
                    Select the grade based on laryngoscopic view
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex justify-center space-x-4"
        >
          <Button
            className="btn-primary"
            onClick={() => {
              if (!grade) {
                setError('Please select a grade');
                return;
              }
              setShowResults(true);
            }}
            startIcon={<BarChart2 size={20} />}
          >
            Confirm Grade
          </Button>
          <Button
            className="btn-primary"
            onClick={resetForm}
            startIcon={<XCircle size={20} />}
          >
            Reset
          </Button>
        </motion.div>

        <AnimatePresence>
          {showResults && grade && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6 max-w-4xl mx-auto"
            >
              <Card className="card">
                <CardContent>
                  <Typography className="header">
                    <BarChart2 size={20} className="inline mr-2" />
                    Results
                  </Typography>
                  <Box className="text-center mb-4">
                    <Typography variant="h3" className="font-bold text-teal-600">
                      Grade {grade}
                    </Typography>
                    <Typography variant="h5" className="font-semibold text-gray-800">
                      {cormackLehaneGrades.find((level: { grade: string }) => level.grade === grade)?.description}
                    </Typography>
                  </Box>
                  <Card className="bg-gray-50">
                    <CardContent>
                      <Typography className="font-semibold mb-2">Description:</Typography>
                      <Typography className="text-gray-700">
                        {cormackLehaneGrades.find((level: { grade: string }) => level.grade === grade)?.description}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 mt-4">
                    <CardContent>
                      <Box className="flex items-center mb-2">
                        <Typography className="font-semibold">Anesthesia Considerations</Typography>
                        <IconButton onClick={() => setShowAnesthesiaGuide(true)}>
                          <Info size={20} />
                        </IconButton>
                      </Box>
                      <Box className="flex items-center">
                        {anesthesiaGuidance[grade === '1' || grade === '2a' ? '1-2a' : grade === '2b' || grade === '3a' ? '2b-3a' : '3b-4'].icon}
                        <Typography className="ml-2 font-semibold">
                          Risk Level: {anesthesiaGuidance[grade === '1' || grade === '2a' ? '1-2a' : grade === '2b' || grade === '3a' ? '2b-3a' : '3b-4'].risk}
                        </Typography>
                      </Box>
                      <List>
                        {anesthesiaGuidance[grade === '1' || grade === '2a' ? '1-2a' : grade === '2b' || grade === '3a' ? '2b-3a' : '3b-4'].considerations.map((item: string, index: number) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Syringe size={16} className="text-teal-600" />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <Modal
          open={showGradeGuide}
          onClose={() => setShowGradeGuide(false)}
          className="flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto"
          >
            <Typography className="header text-center">
              Cormack-Lehane Grades Guide
            </Typography>
            {cormackLehaneGrades.map((item: { grade: string, description: string }) => (
              <Box key={item.grade} className="mb-4">
                <Typography className="font-semibold">Grade {item.grade}</Typography>
                <Typography className="text-gray-700">{item.description}</Typography>
              </Box>
            ))}
            <Button
              className="btn-primary w-full mt-4"
              onClick={() => setShowGradeGuide(false)}
            >
              Close
            </Button>
          </motion.div>
        </Modal>

        <Modal
          open={showAnesthesiaGuide}
          onClose={() => setShowAnesthesiaGuide(false)}
          className="flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto"
          >
            <Typography className="header text-center">
              Anesthesia Considerations - Grade {grade}
            </Typography>
            <Box className="flex items-center mb-2">
              {anesthesiaGuidance[grade === '1' || grade === '2a' ? '1-2a' : grade === '2b' || grade === '3a' ? '2b-3a' : '3b-4'].icon}
              <Typography className="ml-2 font-semibold">
                Risk Level: {anesthesiaGuidance[grade === '1' || grade === '2a' ? '1-2a' : grade === '2b' || grade === '3a' ? '2b-3a' : '3b-4'].risk}
              </Typography>
            </Box>
            <List>
              {anesthesiaGuidance[grade === '1' || grade === '2a' ? '1-2a' : grade === '2b' || grade === '3a' ? '2b-3a' : '3b-4'].considerations.map((item: string, index: number) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Syringe size={16} className="text-teal-600" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
            <Button
              className="btn-primary w-full mt-4"
              onClick={() => setShowAnesthesiaGuide(false)}
            >
              Close
            </Button>
          </motion.div>
        </Modal>
      </Box>
    </motion.div>
  );
};

export default CormackLehane;