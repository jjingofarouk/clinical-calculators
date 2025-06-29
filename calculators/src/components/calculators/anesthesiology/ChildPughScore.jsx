// ChildPughScore.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
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
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart2,
  HeartPulse,
  Syringe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChildPughScore = () => {
  const [bilirubin, setBilirubin] = useState('');
  const [albumin, setAlbumin] = useState('');
  const [inr, setInr] = useState('');
  const [ascites, setAscites] = useState('');
  const [encephalopathy, setEncephalopathy] = useState('');
  const [score, setScore] = useState(null);
  const [classification, setClassification] = useState('');
  const [showEncephalopathyGuide, setShowEncephalopathyGuide] = useState(false);
  const [showAnesthesiaGuide, setShowAnesthesiaGuide] = useState(false);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);

  const encephalopathyGrades = [
    { grade: 0, description: 'Normal consciousness, personality, neurological examination' },
    { grade: 1, description: 'Restless, sleep disturbed, irritable/agitated, tremor' },
    { grade: 2, description: 'Lethargic, time-disoriented, inappropriate behavior, asterixis' },
    { grade: 3, description: 'Somnolent, stuporous, place-disoriented, hyperactive reflexes' },
    { grade: 4, description: 'Unrousable coma, no personality/behavior, decerebrate' },
  ];

  const anesthesiaGuidance = {
    'Class A': {
      risk: 'Low',
      considerations: [
        'Safe for most surgical procedures with standard anesthesia protocols',
        'Monitor for mild coagulopathy; consider FFP if INR > 1.5',
        'Regional anesthesia preferred when feasible to reduce hepatic load',
        'Maintain normovolemia to prevent renal stress',
        'Use short-acting anesthetics (e.g., propofol, remifentanil)',
        'Postoperative LFT monitoring recommended',
        'Consider pre-anesthetic albumin supplementation if <3.5 g/dL',
        'Assess for potential drug interactions with reduced hepatic clearance'
      ],
      icon: <CheckCircle size={20} className="text-green-500" />
    },
    'Class B': {
      risk: 'Moderate',
      considerations: [
        'Increased risk of perioperative complications, including bleeding and encephalopathy',
        'Preoperative optimization: correct coagulopathy (vitamin K, FFP, cryoprecipitate)',
        'Avoid hepatotoxic drugs (e.g., halothane, acetaminophen, isoflurane)',
        'Use invasive monitoring (arterial line, CVP) for major surgery',
        'Prefer total intravenous anesthesia (TIVA) with propofol/remifentanil',
        'Monitor for postoperative delirium and hepatic encephalopathy',
        'Consider preoperative TIPS for portal hypertension if ascites severe',
        'Postoperative ICU monitoring for high-risk procedures'
      ],
      icon: <AlertTriangle size={20} className="text-yellow-500" />
    },
    'Class C': {
      risk: 'High',
      considerations: [
        'High risk of hepatic decompensation, multi-organ failure, and mortality',
        'Avoid elective surgery; emergency procedures only with multidisciplinary consult',
        'Use minimal sedation (low-dose propofol, dexmedetomidine, avoid benzodiazepines)',
        'Mandatory invasive monitoring (arterial, CVP, TEE, ScvO2 if indicated)',
        'Aggressive preoperative correction of coagulopathy and thrombocytopenia',
        'Prolonged ICU stay with frequent LFT, ammonia, and lactate monitoring',
        'Consider intraoperative CRRT for renal dysfunction risk',
        'High risk of postoperative ventilator dependence; plan extubation cautiously'
      ],
      icon: <XCircle size={20} className="text-red-500" />
    }
  };

  const calculateScore = () => {
    if (!bilirubin || !albumin || !inr || !ascites || !encephalopathy) {
      setError('Please fill in all fields');
      return;
    }

    const bilirubinValue = parseFloat(bilirubin);
    const albuminValue = parseFloat(albumin);
    const inrValue = parseFloat(inr);
    const ascitesValue = parseInt(ascites);
    const encephalopathyValue = parseInt(encephalopathy);

    if (isNaN(bilirubinValue) || isNaN(albuminValue) || isNaN(inrValue)) {
      setError('Please enter valid numerical values');
      return;
    }

    let totalScore = 0;

    if (bilirubinValue < 2) totalScore += 1;
    else if (bilirubinValue <= 3) totalScore += 2;
    else totalScore += 3;

    if (albuminValue > 3.5) totalScore += 1;
    else if (albuminValue >= 2.8) totalScore += 2;
    else totalScore += 3;

    if (inrValue < 1.7) totalScore += 1;
    else if (inrValue <= 2.3) totalScore += 2;
    else totalScore += 3;

    totalScore += ascitesValue;
    totalScore += encephalopathyValue;

    setScore(totalScore);
    setError('');

    if (totalScore <= 6) setClassification('Class A');
    else if (totalScore <= 9) setClassification('Class B');
    else setClassification('Class C');

    setShowResults(true);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const resetForm = () => {
    setBilirubin('');
    setAlbumin('');
    setInr('');
    setAscites('');
    setEncephalopathy('');
    setScore(null);
    setClassification('');
    setShowResults(false);
    setError('');
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
            Child-Pugh Score Calculator
        </motion.div>

        <Collapse in={!!error}>
          <Alert severity="error" className="mb-4 max-w-4xl mx-auto">
            {error}
          </Alert>
        </Collapse>

        <div className="custom-grid max-w-4xl mx-auto">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="card">
              <CardContent>
                <Typography className="header">
                  <Activity size={20} className="inline mr-2" />
                  Laboratory Values
                </Typography>
                <Box className="space-y-4">
                  <Box>
                    <TextField
                      label="Total Bilirubin (mg/dL)"
                      type="number"
                      value={bilirubin}
                      onChange={(e) => setBilirubin(e.target.value)}
                      className="w-full"
                      placeholder="Enter bilirubin"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ step: "0.1" }}
                    />
                    <Typography variant="caption" className="text-gray-500">
                      Normal: 0.3-1.2 mg/dL | Impacts anesthetic metabolism
                    </Typography>
                  </Box>
                  <Box>
                    <TextField
                      label="Serum Albumin (g/dL)"
                      type="number"
                      value={albumin}
                      onChange={(e) => setAlbumin(e.target.value)}
                      className="w-full"
                      placeholder="Enter albumin"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ step: "0.1" }}
                    />
                    <Typography variant="caption" className="text-gray-500">
                      Normal: 3.5-5.5 g/dL | Affects drug binding
                    </Typography>
                  </Box>
                  <Box>
                    <TextField
                      label="INR"
                      type="number"
                      value={inr}
                      onChange={(e) => setInr(e.target.value)}
                      className="w-full"
                      placeholder="Enter INR"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ step: "0.1" }}
                    />
                    <Typography variant="caption" className="text-gray-500">
                      Normal: 0.8-1.1 | Guides coagulation management
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="card">
              <CardContent>
                <Typography className="header">
                  <HeartPulse size={20} className="inline mr-2" />
                  Clinical Assessment
                </Typography>
                <Box className="space-y-4">
                  <Box>
                    <Typography className="mb-2">Ascites</Typography>
                    <ToggleButtonGroup
                      value={ascites}
                      exclusive
                      onChange={(e, value) => value && setAscites(value)}
                      className="w-full"
                    >
                      <ToggleButton value="1" className="flex-1">Null</ToggleButton>
                      <ToggleButton value="2" className="flex-1">Mild</ToggleButton>
                      <ToggleButton value="3" className="flex-1">Moderate-Severe</ToggleButton>
                    </ToggleButtonGroup>
                    <Typography variant="caption" className="text-gray-500">
                      Impacts intraoperative fluid management
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="flex items-center mb-2">
                      <Typography>Encephalopathy</Typography>
                      <IconButton onClick={() => setShowEncephalopathyGuide(true)}>
                        <Info size={20} />
                      </IconButton>
                    </Box>
                    <ToggleButtonGroup
                      value={encephalopathy}
                      exclusive
                      onChange={(e, value) => value && setEncephalopathy(value)}
                      className="w-full"
                    >
                      <ToggleButton value="1" className="flex-1">None</ToggleButton>
                      <ToggleButton value="2" className="flex-1">Grade I-II</ToggleButton>
                      <ToggleButton value="3" className="flex-1">Grade III-IV</ToggleButton>
                    </ToggleButtonGroup>
                    <Typography variant="caption" className="text-gray-500">
                      Influences sedation choice and dosing
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card> 
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex justify-center space-x-4"
        >
          <Button
            className="btn-primary"
            onClick={calculateScore}
            startIcon={<BarChart2 size={20} />}
          >
            Calculate Score
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
          {showResults && score && (
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
                      {score}
                    </Typography>
                    <Typography variant="h5" className="font-semibold text-gray-800">
                      {classification}
                    </Typography>
                  </Box>
                  <Card className="bg-gray-50">
                    <CardContent>
                      <Typography className="font-semibold mb-2">Prognosis:</Typography>
                      <Typography className="text-gray-700">
                        {classification === 'Class A' && '1-year survival: 100%, 2-year survival: 85%'}
                        {classification === 'Class B' && '1-year survival: 81%, 2-year survival: 57%'}
                        {classification === 'Class C' && '1-year survival: 45%, 2-year survival: 35%'}
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
                        {anesthesiaGuidance[classification].icon}
                        <Typography className="ml-2 font-semibold">
                          Risk Level: {anesthesiaGuidance[classification].risk}
                        </Typography>
                      </Box>
                      <List>
                        {anesthesiaGuidance[classification].considerations.map((item, index) => (
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
          open={showEncephalopathyGuide}
          onClose={() => setShowEncephalopathyGuide(false)}
          className="flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto"
          >
            <Typography className="header text-center">
              Hepatic Encephalopathy Grades
            </Typography>
            {encephalopathyGrades.map((item) => (
              <Box key={item.grade} className="mb-4">
                <Typography className="font-semibold">Grade {item.grade}</Typography>
                <Typography className="text-gray-700">{item.description}</Typography>
              </Box>
            ))}
            <Button
              className="btn-primary w-full mt-4"
              onClick={() => setShowEncephalopathyGuide(false)}
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
              Anesthesia Considerations - {classification}
            </Typography>
            <Box className="flex items-center mb-2">
              {anesthesiaGuidance[classification].icon}
              <Typography className="ml-2 font-semibold">
                Risk Level: {anesthesiaGuidance[classification].risk}
              </Typography>
            </Box>
            <List>
              {anesthesiaGuidance[classification].considerations.map((item, index) => (
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

export default ChildPughScore;