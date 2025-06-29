
import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Divider, Chip, Stepper, Step, StepLabel, StepContent, Alert, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, ArrowRight, ArrowLeft, Download } from 'lucide-react';

const steps = [
  {
    label: 'Step 1: Optimize Oxygenation',
    description: 'Ensure optimal oxygenation via bag-mask ventilation, high-flow nasal cannula, or supraglottic airway device. Maximize attempts at laryngoscopy (up to 3 attempts).',
    validation: (state) => state.oxygenationAttempted,
    errorMessage: 'Please confirm that oxygenation attempts have been made.',
  },
  {
    label: 'Step 2: Supraglottic Airway (SGA)',
    description: 'Insert a supraglottic airway device (e.g., LMA). Ensure proper placement and adequate ventilation. Maximum 2 attempts.',
    validation: (state) => state.sgaAttempted,
    errorMessage: 'Please confirm that supraglottic airway attempts have been made.',
  },
  {
    label: 'Step 3: Emergency Front of Neck Access (FONA)',
    description: 'Proceed to emergency front of neck access (e.g., cricothyroidotomy or tracheostomy). Use scalpel-bougie-tube technique for adults. Ensure team readiness and equipment availability.',
    validation: (state) => state.fonaAttempted,
    errorMessage: 'Please confirm that front of neck access has been attempted or planned.',
  },
];

const CICOAlgorithm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [state, setState] = useState({
    oxygenationAttempted: false,
    sgaAttempted: false,
    fonaAttempted: false,
  });
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const handleCheckboxChange = (name) => {
    setState({ ...state, [name]: !state[name] });
    setError('');
  };

  const handleNext = () => {
    const currentStep = steps[activeStep];
    if (!currentStep.validation(state)) {
      setError(currentStep.errorMessage);
      return;
    }
    setHistory([...history, {
      timestamp: new Date().toLocaleString(),
      step: currentStep.label,
      state: { ...state },
    }]);
    setActiveStep((prev) => prev + 1);
    setError('');
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError('');
  };

  const handleReset = () => {
    setActiveStep(0);
    setState({
      oxygenationAttempted: false,
      sgaAttempted: false,
      fonaAttempted: false,
    });
    setError('');
  };

  const exportHistory = () => {
    const csvContent = [
      'Timestamp,Step,Oxygenation Attempted,SGA Attempted,FONA Attempted',
      ...history.map(entry => `${entry.timestamp},${entry.step},${entry.state.oxygenationAttempted},${entry.state.sgaAttempted},${entry.state.fonaAttempted}`)
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cico_history.csv';
    link.click();
  };

  return (
    <main className="container">
      <motion.div
        className="card max-w-full mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <AlertTriangle size={24} className="text-teal-600" />
          <Typography variant="h5" className="header">Can't Intubate, Can't Oxygenate (CICO) Algorithm</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" className="text-gray-700" mb={3}>
          The CICO algorithm guides management of a rare but life-threatening airway emergency where intubation and oxygenation via standard methods fail. Immediate action is critical to restore oxygenation and prevent hypoxia. Follow the steps below, ensuring each attempt is optimized before proceeding.
        </Typography>
        <Alert severity="warning" className="mb-4">
          <Typography variant="body2">
            CICO is a critical emergency. Ensure team communication, call for help, and prepare for front of neck access early. Reference: ANZCA CICO Guideline (2017).
          </Typography>
        </Alert>
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 3 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="subtitle1" className="text-teal-600">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body2" className="text-gray-700 mb-2">{step.description}</Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={state[step.label.includes('Oxygenation') ? ' MonsantoAttempted' : step.label.includes('Supraglottic') ? 'sgaAttempted' : 'fonaAttempted']}
                      onChange={() => handleCheckboxChange(step.label.includes('Oxygenation') ? 'oxygenationAttempted' : step.label.includes('Supraglottic') ? 'sgaAttempted' : 'fonaAttempted')}
                      className="w-5 h-5 text-teal-600 rounded"
                    />
                    <Typography variant="body2" className="text-gray-700">Confirm attempt</Typography>
                  </label>
                </Box>
                {error && activeStep === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert severity="error" className="mt-2">{error}</Alert>
                  </motion.div>
                )}
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  {index > 0 && (
                    <Button
                      variant="outlined"
                      className="text-teal-600 border-teal-600 hover:bg-teal-50"
                      onClick={handleBack}
                      startIcon={<ArrowLeft size={20} />}
                    >
                      Back
                    </Button>
                  )}
                  {index < steps.length - 1 && (
                    <Button
                      variant="contained"
                      className="btn-primary"
                      onClick={handleNext}
                      endIcon={<ArrowRight size={20} />}
                    >
                      Next
                    </Button>
                  )}
                  {index === steps.length - 1 && (
                    <Button
                      variant="contained"
                      className="btn-primary"
                      onClick={handleReset}
                      endIcon={<CheckCircle size={20} />}
                    >
                      Complete & Reset
                    </Button>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Chip
              icon={<CheckCircle size={20} />}
              label="CICO Algorithm Completed"
              color="success"
              className="mb-4"
            />
            <Button
              variant="contained"
              className="btn-primary"
              onClick={handleReset}
              startIcon={<CheckCircle size={20} />}
            >
              Restart Algorithm
            </Button>
          </motion.div>
        )}
        <Box display="flex" gap={2} mb={3}>
          {history.length > 0 && (
            <Button
              variant="outlined"
              className="text-teal-600 border-teal-600 hover:bg-teal-50"
              onClick={exportHistory}
              startIcon={<Download size={20} />}
            >
              Export History
            </Button>
          )}
        </Box>
        <Paper sx={{ p: 2, mb: 3 }} className="card">
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Info size={20} className="text-teal-600" />
            <Typography variant="subtitle1" className="text-teal-600">Clinical Context</Typography>
          </Box>
          <Typography variant="body2" className="text-gray-700">
            <ul className="list-disc pl-5">
              <li><strong>Call for Help:</ venitEarly:</strong> In a CICO scenario, immediate action by the airway team is critical. Additional help (e.g., ENT surgeon, second anesthesiologist) should be summoned.</li>
              <li><strong>Scalpel-Bougie Technique:</strong> Preferred for emergency cricothyroidotomy due to higher success rate in adults (ANZCA, 2017).</li>
              <li><strong>Pediatric Consideration:</strong> Needle cricothyroidotomy may be preferred in children due to anatomical differences (RCH CICO Guideline).</li>
              <li><strong>Training:</strong> Regular CICO drills improve team performance and reduce procedure time (BJA, 2017).</li>
            </ul>
          </Typography>
        </Paper>
        <Typography variant="caption" component="div" className="text-gray-500">
          <strong>Sources:</strong><br />
          - Royal Children’s Hospital CICO Guideline: <a href="https://www.rch.org.au/clinicalguide/guideline_index/CICO/" className="text-teal-600 hover:underline">RCH</a><br />
          - ANZCA CICO Guideline (2017): <a href="https://www.anzca.edu.au/getContentAsset/52988fd7-b32d-4757-94c5-fa3e3dc373f6/80feb437-d24d-46b8-a858-4a2a28b9b970/PG61(A)-CICO-2017.pdf" className="text-teal-600 hover:underline">ANZCA</a><br />
          - BJA Article (2017): <a href="https://www.bjanaesthesia.org.uk/article/S0007-0912(17)30224-6/fulltext" className="text-teal-600 hover:underline">BJA</a>
        </Typography>
      </motion.div>
    </main>
  );
};

export default CICOAlgorithm;