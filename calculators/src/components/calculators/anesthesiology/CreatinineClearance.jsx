// CreatinineClearance.jsx
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
  CheckCircle,
  AlertTriangle,
  XCircle,
  BarChart2,
  HeartPulse,
  Syringe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CreatinineClearance = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [sex, setSex] = useState('');
  const [crcl, setCrCl] = useState(null);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showAnesthesiaGuide, setShowAnesthesiaGuide] = useState(false);

  const anesthesiaGuidance = {
    'Normal': {
      range: '>= 90',
      risk: 'Low',
      considerations: [
        'Standard anesthetic dosing and protocols applicable',
        'No significant renal adjustment needed for renally cleared drugs',
        'Monitor for age-related comorbidities affecting renal perfusion',
        'Use short-acting agents (e.g., propofol, remifentanil) for rapid recovery',
        'Routine intraoperative fluid management sufficient',
        'Standard postoperative monitoring for renal function'
      ],
      icon: <CheckCircle size={20} className="text-green-500" />
    },
    'Mild': {
      range: '60-89',
      risk: 'Mild',
      considerations: [
        'Mild dose adjustments for renally cleared drugs (e.g., neuromuscular blockers)',
        'Monitor for potential intraoperative oliguria; maintain adequate hydration',
        'Avoid nephrotoxic agents (e.g., NSAIDs, high-dose aminoglycosides)',
        'Consider regional anesthesia to minimize systemic drug load',
        'Use balanced crystalloids for fluid management',
        'Postoperative monitoring of urine output and serum creatinine'
      ],
      icon: <CheckCircle size={20} className="text-green-500" />
    },
    'Moderate': {
      range: '30-59',
      risk: 'Moderate',
      considerations: [
        'Significant dose reductions for renally cleared drugs (e.g., rocuronium, morphine)',
        'Use invasive monitoring (arterial line, CVP) for major surgery to guide fluid therapy',
        'Avoid prolonged use of nephrotoxic anesthetics (e.g., sevoflurane in prolonged cases)',
        'Preoperative optimization of volume status and electrolytes',
        'Consider intraoperative urine output monitoring with Foley catheter',
        'Extended postoperative monitoring in PACU or step-down unit'
      ],
      icon: <AlertTriangle size={20} className="text-yellow-500" />
    },
    'Severe': {
      range: '15-29',
      risk: 'High',
      considerations: [
        'High risk of perioperative renal failure and fluid overload',
        'Significant dose reductions or avoidance of renally cleared drugs',
        'Mandatory invasive monitoring (arterial, CVP, urine output)',
        'Preoperative consultation with nephrology for dialysis planning if indicated',
        'Use minimal sedation techniques (e.g., dexmedetomidine, low-dose propofol)',
        'Postoperative ICU monitoring with frequent electrolyte and creatinine checks'
      ],
      icon: <XCircle size={20} className="text-red-500" />
    },
    'Kidney Failure': {
      range: '<15',
      risk: 'Very High',
      considerations: [
        'Extremely high risk of perioperative morbidity; avoid elective surgery',
        'Avoid renally cleared drugs; use agents with hepatic clearance (e.g., cisatracurium)',
        'Mandatory preoperative dialysis if patient is dialysis-dependent',
        'Intraoperative CRRT may be required for fluid and electrolyte management',
        'Multidisciplinary team (anesthesia, nephrology, ICU) for emergency procedures',
        'Prolonged ICU stay with continuous renal function monitoring'
      ],
      icon: <XCircle size={20} className="text-red-500" />
    }
  };

  const calculateCrCl = () => {
    if (!age || !weight || !creatinine || !sex) {
      setError('Please fill in all fields');
      return;
    }

    const ageValue = parseFloat(age);
    const weightValue = parseFloat(weight);
    const creatinineValue = parseFloat(creatinine);

    if (isNaN(ageValue) || isNaN(weightValue) || isNaN(creatinineValue)) {
      setError('Please enter valid numerical values');
      return;
    }

    if (ageValue < 18 || ageValue > 120) {
      setError('Age must be between 18 and 120 years');
      return;
    }
    if (weightValue < 30 || weightValue > 200) {
      setError('Weight must be between 30 and 200 kg');
      return;
    }
    if (creatinineValue <= 0 || creatinineValue > 10) {
      setError('Serum creatinine must be between 0.1 and 10 mg/dL');
      return;
    }

    // Cockcroft-Gault formula
    let crclValue = ((140 - ageValue) * weightValue) / (72 * creatinineValue);
    if (sex === 'female') {
      crclValue *= 0.85;
    }

    setCrCl(crclValue.toFixed(1));
    setError('');
    setShowResults(true);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const resetForm = () => {
    setAge('');
    setWeight('');
    setCreatinine('');
    setSex('');
    setCrCl(null);
    setError('');
    setShowResults(false);
  };

  const getClassification = (crclValue) => {
    if (crclValue >= 90) return 'Normal';
    if (crclValue >= 60) return 'Mild';
    if (crclValue >= 30) return 'Moderate';
    if (crclValue >= 15) return 'Severe';
    return 'Kidney Failure';
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
            Creatinine Clearance Calculator
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600">
            Anesthesiology-Optimized Renal Function Assessment
          </Typography>
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
                  Patient Parameters
                </Typography>
                <Box className="space-y-4">
                  <Box>
                    <TextField
                      label="Age (years)"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full"
                      placeholder="Enter age"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ step: "1" }}
                    />
                    <Typography variant="caption" className="text-gray-500">
                      Range: 18-120 years
                    </Typography>
                  </Box>
                  <Box>
                    <TextField
                      label="Weight (kg)"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full"
                      placeholder="Enter weight"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ step: "0.1" }}
                    />
                    <Typography variant="caption" className="text-gray-500">
                      Range: 30-200 kg
                    </Typography>
                  </Box>
                  <Box>
                    <TextField
                      label="Serum Creatinine (mg/dL)"
                      type="number"
                      value={creatinine}
                      onChange={(e) => setCreatinine(e.target.value)}
                      className="w-full"
                      placeholder="Enter creatinine"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ step: "0.1" }}
                    />
                    <Typography variant="caption" className="text-gray-500">
                      Normal: 0.6-1.2 mg/dL | Impacts drug clearance
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
                  Sex
                </Typography>
                <Box className="space-y-4">
                  <Box>
                    <ToggleButtonGroup
                      value={sex}
                      exclusive
                      onChange={(e, value) => value && setSex(value)}
                      className="w-full"
                    >
                      <ToggleButton value="male" className="flex-1">Male</ToggleButton>
                      <ToggleButton value="female" className="flex-1">Female</ToggleButton>
                    </ToggleButtonGroup>
                    <Typography variant="caption" className="text-gray-500">
                      Affects clearance calculation (Cockcroft-Gault formula)
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
            onClick={calculateCrCl}
            startIcon={<BarChart2 size={20} />}
          >
            Calculate CrCl
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
          {showResults && crcl && (
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
                      {crcl} mL/min
                    </Typography>
                    <Typography variant="h5" className="font-semibold text-gray-800">
                      {getClassification(parseFloat(crcl))}
                    </Typography>
                  </Box>
                  <Card className="bg-gray-50">
                    <CardContent>
                      <Typography className="font-semibold mb-2">Renal Function:</Typography>
                      <Typography className="text-gray-700">
                        Creatinine Clearance: {crcl} mL/min (Normal: ≥90 mL/min)
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
                        {anesthesiaGuidance[getClassification(parseFloat(crcl))].icon}
                        <Typography className="ml-2 font-semibold">
                          Risk Level: {anesthesiaGuidance[getClassification(parseFloat(crcl))].risk}
                        </Typography>
                      </Box>
                      <List>
                        {anesthesiaGuidance[getClassification(parseFloat(crcl))].considerations.map((item, index) => (
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
              Anesthesia Considerations - {crcl && getClassification(parseFloat(crcl))}
            </Typography>
            <Box className="flex items-center mb-2">
              {anesthesiaGuidance[crcl && getClassification(parseFloat(crcl))].icon}
              <Typography className="ml-2 font-semibold">
                Risk Level: {anesthesiaGuidance[crcl && getClassification(parseFloat(crcl))].risk}
              </Typography>
            </Box>
            <List>
              {anesthesiaGuidance[crcl && getClassification(parseFloat(crcl))].considerations.map((item, index) => (
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

export default CreatinineClearance;