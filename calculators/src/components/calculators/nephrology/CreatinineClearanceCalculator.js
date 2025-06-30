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
  ListItemText,
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
  Syringe,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../../index.css'; // Ensure Tailwind CSS is imported

const CreatinineClearanceCalculator = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [sex, setSex] = useState('');
  const [crcl, setCrCl] = useState(null);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showAnesthesiaGuide, setShowAnesthesiaGuide] = useState(false);

  const anesthesiaGuidance = {
    Normal: {
      range: '>= 90',
      risk: 'Low',
      considerations: [
        'Standard anesthetic dosing and protocols applicable',
        'No significant renal adjustment needed for renally cleared drugs',
        'Monitor for age-related comorbidities affecting renal perfusion',
        'Use short-acting agents (e.g., propofol, remifentanil) for rapid recovery',
        'Routine intraoperative fluid management sufficient',
        'Standard postoperative monitoring for renal function',
      ],
      icon: <CheckCircle size={20} color="#22c55e" />,
    },
    Mild: {
      range: '60-89',
      risk: 'Mild',
      considerations: [
        'Mild dose adjustments for renally cleared drugs (e.g., neuromuscular blockers)',
        'Monitor for potential intraoperative oliguria; maintain adequate hydration',
        'Avoid nephrotoxic agents (e.g., NSAIDs, high-dose aminoglycosides)',
        'Consider regional anesthesia to minimize systemic drug load',
        'Use balanced crystalloids for fluid management',
        'Postoperative monitoring of urine output and serum creatinine',
      ],
      icon: <CheckCircle size={20} color="#22c55e" />,
    },
    Moderate: {
      range: '30-59',
      risk: 'Moderate',
      considerations: [
        'Significant dose reductions for renally cleared drugs (e.g., rocuronium, morphine)',
        'Use invasive monitoring (arterial line, CVP) for major surgery to guide fluid therapy',
        'Avoid prolonged use of nephrotoxic anesthetics (e.g., sevoflurane in prolonged cases)',
        'Preoperative optimization of volume status and electrolytes',
        'Consider intraoperative urine output monitoring with Foley catheter',
        'Extended postoperative monitoring in PACU or step-down unit',
      ],
      icon: <AlertTriangle size={20} color="#eab308" />,
    },
    Severe: {
      range: '15-29',
      risk: 'High',
      considerations: [
        'High risk of perioperative renal failure and fluid overload',
        'Significant dose reductions or avoidance of renally cleared drugs',
        'Mandatory invasive monitoring (arterial, CVP, urine output)',
        'Preoperative consultation with nephrology for dialysis planning if indicated',
        'Use minimal sedation techniques (e.g., dexmedetomidine, low-dose propofol)',
        'Postoperative ICU monitoring with frequent electrolyte and creatinine checks',
      ],
      icon: <XCircle size={20} color="#ef4444" />,
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
        'Prolonged ICU stay with continuous renal function monitoring',
      ],
      icon: <XCircle size={20} color="#ef4444" />,
    },
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

    // Cockcroft-Gault formula
    let crclValue = ((140 - ageValue) * weightValue) / (72 * creatinineValue);
    if (sex === 'female') {
      crclValue *= 0.85;
    }

    setCrCl(crclValue);
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
    setShowAnesthesiaGuide(false);
  };

  const getClassification = (crclValue) => {
    if (crclValue >= 90) return 'Normal';
    if (crclValue >= 60) return 'Mild';
    if (crclValue >= 30) return 'Moderate';
    if (crclValue >= 15) return 'Severe';
    return 'Kidney Failure';
  };

  const getAnesthesiaGuidance = () => {
    if (!crcl) return null;
    return anesthesiaGuidance[getClassification(crcl)];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-screen bg-gray-50 overflow-y-auto overflow-x-hidden"
    >
      <main className="w-full max-w-full p-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <Typography className="header !text-2xl flex items-center justify-center">
            <Stethoscope size={24} className="mr-2" />
            Creatinine Clearance Calculator
          </Typography>
          <Typography className="text-gray-600">
            Renal Function Assessment
          </Typography>
        </motion.div>

        <Collapse in={!!error}>
          <Alert severity="error" className="mb-4 max-w-full">
            {error}
          </Alert>
        </Collapse>

        <div className="custom-grid">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="card">
              <CardContent>
                <Typography className="header flex items-center">
                  <Activity size={20} className="mr-2" />
                  Patient Parameters
                </Typography>
                <div className="flex flex-col gap-4 mt-2">
                  <div>
                    <TextField
                      label="Age (years)"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      fullWidth
                      placeholder="Enter age"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ step: '1' }}
                      className="bg-white"
                    />
                    <Typography className="text-gray-600 text-sm">
                      Range: 18-120 years
                    </Typography>
                  </div>
                  <div>
                    <TextField
                      label="Weight (kg)"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      fullWidth
                      placeholder="Enter weight"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ step: '0.1' }}
                      className="bg-white"
                    />
                    <Typography className="text-gray-600 text-sm">
                      Range: 30-200 kg
                    </Typography>
                  </div>
                  <div>
                    <TextField
                      label="Serum Creatinine (mg/dL)"
                      type="number"
                      value={creatinine}
                      onChange={(e) => setCreatinine(e.target.value)}
                      fullWidth
                      placeholder="Enter creatinine"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ step: '0.1' }}
                      className="bg-white"
                    />
                    <Typography className="text-gray-600 text-sm">
                      Normal: 0.6-1.2 mg/dL | Impacts drug clearance
                    </Typography>
                  </div>
                </div>
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
                <Typography className="header flex items-center">
                  <HeartPulse size={20} className="mr-2" />
                  Sex
                </Typography>
                <div className="mt-2">
                  <ToggleButtonGroup
                    value={sex}
                    exclusive
                    onChange={(e, value) => value && setSex(value)}
                    className="flex gap-1"
                  >
                    <ToggleButton value="male" className="flex-1">
                      Male
                    </ToggleButton>
                    <ToggleButton value="female" className="flex-1">
                      Female
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <Typography className="text-gray-600 text-sm">
                    Affects clearance calculation (Cockcroft-Gault formula)
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex justify-center gap-4"
        >
          <Button
            className="btn-primary"
            onClick={calculateCrCl}
            startIcon={<BarChart2 size={20} />}
          >
            Calculate CrCl
          </Button>
          <Button
            className="border border-teal-600 text-teal-600 rounded hover:bg-teal-50 transition px-4 py-2"
            onClick={resetForm}
            startIcon={<XCircle size={20} />}
          >
            Reset
          </Button>
        </motion.div>

        <AnimatePresence>
          {showResults && crcl !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <Card className="card">
                <CardContent>
                  <Typography className="header flex items-center">
                    <BarChart2 size={20} className="mr-2" />
                    Results
                  </Typography>
                  <div className="text-center mb-4">
                    <Typography className="text-4xl font-bold text-teal-600">
                      {crcl.toFixed(1)} mL/min
                    </Typography>
                    <Typography className="text-2xl font-semibold text-gray-900">
                      {getClassification(crcl)}
                    </Typography>
                  </div>
                  <Card className="card bg-gray-50">
                    <CardContent>
                      <Typography className="font-semibold mb-2">
                        Renal Function:
                      </Typography>
                      <Typography className="text-gray-700">
                        Creatinine Clearance: {crcl.toFixed(1)} mL/min (Normal: ≥90 mL/min)
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className="card bg-gray-50 mt-4">
                    <CardContent>
                      <div className="flex items-center mb-2">
                        <Typography className="font-semibold">
                          Anesthesia Considerations
                        </Typography>
                        <IconButton onClick={() => setShowAnesthesiaGuide(true)}>
                          <Info size={20} />
                        </IconButton>
                      </div>
                      <div className="flex items-center">
                        {anesthesiaGuidance[getClassification(crcl)].icon}
                        <Typography className="ml-1 font-semibold">
                          Risk Level: {anesthesiaGuidance[getClassification(crcl)].risk}
                        </Typography>
                      </div>
                      <List>
                        {anesthesiaGuidance[getClassification(crcl)].considerations.map((item, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Syringe size={16} color="#0d9488" />
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
            className="card max-w-md max-h-[80vh] overflow-y-auto"
          >
            {crcl !== null && getAnesthesiaGuidance() && (
              <>
                <Typography className="header text-center">
                  Anesthesia Considerations - {getClassification(crcl)}
                </Typography>
                <div className="flex items-center mb-2">
                  {getAnesthesiaGuidance().icon}
                  <Typography className="ml-1 font-semibold">
                    Risk Level: {getAnesthesiaGuidance().risk}
                  </Typography>
                </div>
                <List>
                  {getAnesthesiaGuidance().considerations.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Syringe size={16} color="#0d9488" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
                <Button
                  className="btn-primary mt-4 w-full"
                  onClick={() => setShowAnesthesiaGuide(false)}
                >
                  Close
                </Button>
              </>
            )}
          </motion.div>
        </Modal>
      </main>
    </motion.div>
  );
};

export default CreatinineClearanceCalculator;