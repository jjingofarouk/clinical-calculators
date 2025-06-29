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

interface AnesthesiaGuidance {
  range: string;
  risk: string;
  considerations: string[];
  icon: JSX.Element;
}

const CreatinineClearance: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [creatinine, setCreatinine] = useState<string>('');
  const [sex, setSex] = useState<string>('');
  const [crcl, setCrCl] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showAnesthesiaGuide, setShowAnesthesiaGuide] = useState<boolean>(false);

  const anesthesiaGuidance: Record<string, AnesthesiaGuidance> = {
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

  const getClassification = (crclValue: number): string => {
    if (crclValue >= 90) return 'Normal';
    if (crclValue >= 60) return 'Mild';
    if (crclValue >= 30) return 'Moderate';
    if (crclValue >= 15) return 'Severe';
    return 'Kidney Failure';
  };

  const getAnesthesiaGuidance = () => {
    if (!crcl) return null;
    const classification = getClassification(crcl);
    return anesthesiaGuidance[classification];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f5f5f5' }}
    >
      <Box sx={{ p: 4, maxWidth: '1200px', mx: 'auto' }}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', marginBottom: 24 }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            <Stethoscope size={24} style={{ display: 'inline', marginRight: 8 }} />
            Creatinine Clearance Calculator
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#666' }}>
            Anesthesiology-Optimized Renal Function Assessment
          </Typography>
        </motion.div>

        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mb: 4, maxWidth: '100%' }}>
            {error}
          </Alert>
        </Collapse>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  <Activity size={20} style={{ display: 'inline', marginRight: 8 }} />
                  Patient Parameters
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                  <Box>
                    <TextField
                      label="Age (years)"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      fullWidth
                      placeholder="Enter age"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ step: '1' }}
                    />
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      Range: 18-120 years
                    </Typography>
                  </Box>
                  <Box>
                    <TextField
                      label="Weight (kg)"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      fullWidth
                      placeholder="Enter weight"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ step: '0.1' }}
                    />
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      Range: 30-200 kg
                    </Typography>
                  </Box>
                  <Box>
                    <TextField
                      label="Serum Creatinine (mg/dL)"
                      type="number"
                      value={creatinine}
                      onChange={(e) => setCreatinine(e.target.value)}
                      fullWidth
                      placeholder="Enter creatinine"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ step: '0.1' }}
                    />
                    <Typography variant="caption" sx={{ color: '#666' }}>
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
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  <HeartPulse size={20} style={{ display: 'inline', marginRight: 8 }} />
                  Sex
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <ToggleButtonGroup
                    value={sex}
                    exclusive
                    onChange={(e, value) => value && setSex(value)}
                    fullWidth
                    sx={{ display: 'flex', gap: 1 }}
                  >
                    <ToggleButton value="male" sx={{ flex: 1 }}>
                      Male
                    </ToggleButton>
                    <ToggleButton value="female" sx={{ flex: 1 }}>
                      Female
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Affects clearance calculation (Cockcroft-Gault formula)
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 16 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={calculateCrCl}
            startIcon={<BarChart2 size={20} />}
            sx={{ minWidth: 150 }}
          >
            Calculate CrCl
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={resetForm}
            startIcon={<XCircle size={20} />}
            sx={{ minWidth: 150 }}
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
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    <BarChart2 size={20} style={{ display: 'inline', marginRight: 8 }} />
                    Results
                  </Typography>
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#00897b' }}>
                      {crcl.toFixed(1)} mL/min
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: '600', color: '#333' }}>
                      {getClassification(crcl)}
                    </Typography>
                  </Box>
                  <Card sx={{ backgroundColor: '#fafafa' }}>
                    <CardContent>
                      <Typography sx={{ fontWeight: '600', mb: 2 }}>Renal Function:</Typography>
                      <Typography sx={{ color: '#444' }}>
                        Creatinine Clearance: {crcl.toFixed(1)} mL/min (Normal: ≥90 mL/min)
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ backgroundColor: '#fafafa', mt: 4 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography sx={{ fontWeight: '600' }}>Anesthesia Considerations</Typography>
                        <IconButton onClick={() => setShowAnesthesiaGuide(true)}>
                          <Info size={20} />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {anesthesiaGuidance[getClassification(crcl)].icon}
                        <Typography sx={{ ml: 1, fontWeight: '600' }}>
                          Risk Level: {anesthesiaGuidance[getClassification(crcl)].risk}
                        </Typography>
                      </Box>
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
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 24,
              width: '100%',
              maxWidth: 500,
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            {crcl !== null && getAnesthesiaGuidance() ? (
              <>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Anesthesia Considerations - {getClassification(crcl)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {getAnesthesiaGuidance()!.icon}
                  <Typography sx={{ ml: 1, fontWeight: '600' }}>
                    Risk Level: {getAnesthesiaGuidance()!.risk}
                  </Typography>
                </Box>
                <List>
                  {getAnesthesiaGuidance()!.considerations.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Syringe size={16} color="#0d9488" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </>
            ) : (
              <Typography variant="h6" sx={{ textAlign: 'center', color: '#666' }}>
                No data available
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowAnesthesiaGuide(false)}
              fullWidth
              sx={{ mt: 4 }}
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