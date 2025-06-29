
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Divider, Chip, Alert, Collapse, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Info, Download, ChevronDown, ChevronUp } from 'lucide-react';

const CardiacOutputMonitoring = () => {
  const [inputs, setInputs] = useState({
    method: 'thermodilution',
    heartRate: '',
    strokeVolume: '',
    oxygenConsumption: '',
    arterialOxygen: '',
    venousOxygen: '',
  });
  const [cardiacOutput, setCardiacOutput] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (inputs.method === 'thermodilution') {
      if (!inputs.heartRate || !inputs.strokeVolume) return 'Heart rate and stroke volume are required for thermodilution.';
      if (isNaN(inputs.heartRate) || isNaN(inputs.strokeVolume) || inputs.heartRate <= 0 || inputs.strokeVolume <= 0) {
        return 'Heart rate and stroke volume must be positive numbers.';
      }
    } else if (inputs.method === 'fick') {
      if (!inputs.oxygenConsumption || !inputs.arterialOxygen || !inputs.venousOxygen) {
        return 'Oxygen consumption, arterial, and venous oxygen content are required for Fick method.';
      }
      if (isNaN(inputs.oxygenConsumption) || isNaN(inputs.arterialOxygen) || isNaN(inputs.venousOxygen) || 
          inputs.oxygenConsumption <= 0 || inputs.arterialOxygen <= 0 || inputs.venousOxygen <= 0) {
        return 'All Fick method inputs must be positive numbers.';
      }
    }
    return '';
  };

  const calculateCardiacOutput = () => {
    const errorMsg = validateInputs();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setError('');
    let co;
    if (inputs.method === 'thermodilution') {
      co = (parseFloat(inputs.heartRate) * parseFloat(inputs.strokeVolume)) / 1000; // L/min
    } else {
      co = parseFloat(inputs.oxygenConsumption) / (parseFloat(inputs.arterialOxygen) - parseFloat(inputs.venousOxygen)); // L/min
    }
    const result = Number(co.toFixed(2));
    setCardiacOutput(result);
    setHistory([...history, {
      timestamp: new Date().toLocaleString(),
      method: inputs.method,
      inputs: { ...inputs },
      cardiacOutput: result,
    }]);
  };

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setError('');
  };

  const handleMethodChange = (method) => {
    setInputs({ ...inputs, method, heartRate: '', strokeVolume: '', oxygenConsumption: '', arterialOxygen: '', venousOxygen: '' });
    setCardiacOutput(null);
    setError('');
  };

  const resetForm = () => {
    setInputs({
      method: 'thermodilution',
      heartRate: '',
      strokeVolume: '',
      oxygenConsumption: '',
      arterialOxygen: '',
      venousOxygen: '',
    });
    setCardiacOutput(null);
    setError('');
  };

  const exportHistory = () => {
    const csvContent = [
      'Timestamp,Method,Heart Rate,Stroke Volume,Oxygen Consumption,Arterial Oxygen,Venous Oxygen,Cardiac Output (L/min)',
      ...history.map(entry => `${entry.timestamp},${entry.method},${entry.inputs.heartRate || ''},${entry.inputs.strokeVolume || ''},${entry.inputs.oxygenConsumption || ''},${entry.inputs.arterialOxygen || ''},${entry.inputs.venousOxygen || ''},${entry.cardiacOutput}`)
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cardiac_output_history.csv';
    link.click();
  };

  return (
    <main className="container">
      <motion.div
        className="card766 max-w-full mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Heart size={24} className="text-teal-600" />
          <Typography variant="h5" className="header">Cardiac Output Monitoring</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" className="text-gray-700" mb={3}>
          Cardiac output (CO) monitoring assesses heart performance, critical in managing shock, heart failure, or anesthesia. Use thermodilution (heart rate × stroke volume) or Fick principle (VO₂ / (CaO₂ - CvO₂)) to calculate CO in L/min. Normal range: 4-8 L/min.
        </Typography>
        <Alert severity="info" className="mb-4">
          <Typography variant="body2">
            Ensure accurate measurements. Thermodilution requires a pulmonary artery catheter; Fick method needs precise oxygen content values. Consult guidelines for method selection.
          </Typography>
        </Alert>
        <Box display="flex" gap={2} mb={3}>
          <Button
            variant={inputs.method === 'thermodilution' ? 'contained' : 'outlined'}
            className={inputs.method === 'thermodilution' ? 'btn-primary' : 'text-teal-600 border-teal-600 hover:bg-teal-50'}
            onClick={() => handleMethodChange('thermodilution')}
          >
            Thermodilution
          </Button>
          <Button
            variant={inputs.method === 'fick' ? 'contained' : 'outlined'}
            className={inputs.method === 'fick' ? 'btn-primary' : 'text-teal-600 border-teal-600 hover:bg-teal-50'}
            onClick={() => handleMethodChange('fick')}
          >
            Fick Principle
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" gap={2} mb={3}>
          {inputs.method === 'thermodilution' ? (
            <>
              <TextField
                label="Heart Rate (bpm)"
                name="heartRate"
                value={inputs.heartRate}
                onChange={handleInputChange}
                type="number"
                fullWidth
                className="text-gray-700"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
 CNA                label="Stroke Volume (mL)"
                name="strokeVolume"
                value={inputs.strokeVolume}
                onChange={handleInputChange}
                type="number"
                fullWidth
                className="text-gray-700"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </>
          ) : (
            <>
              <TextField
                label="Oxygen Consumption (mL/min)"
                name="oxygenConsumption"
                value={inputs.oxygenConsumption}
                onChange={handleInputChange}
                type="number"
                fullWidth
                className="text-gray-700"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                label="Arterial Oxygen Content (mL/L)"
                name="arterialOxygen"
                value={inputs.arterialOxygen}
                onChange={handleInputChange}
                type="number"
                fullWidth
                className="text-gray-700"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                label="Venous Oxygen Content (mL/L)"
                name="venousOxygen"
                value={inputs.venousOxygen}
                onChange={handleInputChange}
                type="number"
                fullWidth
                className="text-gray-700"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </>
          )}
        </Box>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Alert severity="error" className="mb-3">{error}</Alert>
          </motion.div>
        )}
        <AnimatePresence>
          {cardiacOutput !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Chip
                icon={<CheckCircle size={20} />}
                label={`Cardiac Output: ${cardiacOutput} L/min`}
                color={cardiacOutput >= 4 && cardiacOutput <= 8 ? 'success' : 'warning'}
                className="mb-4"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Box display="flex" gap={2} mb={3}>
          <Button
            variant="contained"
            className="btn-primary"
            onClick={calculateCardiacOutput}
          >
            Calculate
          </Button>
          <Button
            variant="outlined"
            className="text-teal-600 border-teal-600 hover:bg-teal-50"
            onClick={resetForm}
          >
            Reset
          </Button>
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
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <IconButton onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? <ChevronUp size={20} className="text-teal-600" /> : <ChevronDown size={20} className="text-teal-600" />}
          </IconButton>
          <Typography variant="subtitle1" className="text-teal-600">Assessment History</Typography>
        </Box>
        <Collapse in={showHistory}>
          <Paper sx={{ p: 2, mb: 3, maxHeight: 200, overflowY: 'auto' }} className="card">
            {history.length === 0 ? (
              <Typography variant="body2" className="text-gray-500">No calculations recorded.</Typography>
            ) : (
              history.map((entry, index) => (
                <Box key={index} mb={1} p={1} bgcolor="grey.100" borderRadius={4}>
                  <Typography variant="caption" className="text-gray-600">
                    {entry.timestamp}: {entry.method === 'thermodilution' 
                      ? `HR: ${entry.inputs.heartRate} bpm, SV: ${entry.inputs.strokeVolume} mL` 
                      : `VO₂: ${entry.inputs.oxygenConsumption} mL/min, CaO₂: ${entry.inputs.arterialOxygen} mL/L, CvO₂: ${entry.inputs.venousOxygen} mL/L`
                    }, CO: {entry.cardiacOutput} L/min
                  </Typography>
                </Box>
              ))
            )}
          </Paper>
        </Collapse>
        <Paper sx={{ p: 2 }} className="card">
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Info size={20} className="text-teal-600" />
            <Typography variant="subtitle1" className="text-teal-600">Clinical Context</Typography>
          </Box>
          <Typography variant="body2" className="text-gray-700">
            <ul className="list-disc pl-5">
              <li><strong>Thermodilution:</strong> Uses a pulmonary artery catheter (e.g., Swan-Ganz) to measure CO. Requires accurate heart rate and stroke volume measurements.</li>
              <li><strong>F;ick Principle:</strong> Calculates CO based on oxygen consumption and arterial-venous oxygen difference. Ideal for non-invasive settings but requires precise measurements.</li>
              <li><strong>Normal Range:</strong> CO of 4-8 L/min is typical for healthy adults. Values outside this range may indicate shock, heart failure, or fluid overload.</li>
              <li><strong>Clinical Use:</strong> Monitor CO in critical care, cardiac surgery, or shock management to guide fluid and inotrope therapy.</li>
            </ul>
          </Typography>
        </Paper>
        <Typography variant="caption" component="div" className="text-gray-500 mt-4">
          <strong>References:</strong><br />
          - American Society of Anesthesiologists Guidelines<br />
          - Critical Care Medicine: Principles of Diagnosis and Management in the Adult
        </Typography>
      </motion.div>
    </main>
  );
};

export default CardiacOutputMonitoring;
