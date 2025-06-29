```jsx
import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, Typography, Paper, Divider, Chip, Tooltip, Button, Collapse, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, Download } from 'lucide-react';

const CAMICU = () => {
  const [features, setFeatures] = useState({
    acuteOnset: false,
    inattention: false,
    disorganizedThinking: false,
    alteredLOC: false,
  });
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleChange = (event) => {
    const updatedFeatures = { ...features, [event.target.name]: event.target.checked };
    setFeatures(updatedFeatures);
    setHistory([...history, {
      timestamp: new Date().toLocaleString(),
      ...updatedFeatures,
      delirium: updatedFeatures.acuteOnset && updatedFeatures.inattention && (updatedFeatures.disorganizedThinking || updatedFeatures.alteredLOC),
    }]);
  };

  const isDelirium = features.acuteOnset && features.inattention && (features.disorganizedThinking || features.alteredLOC);

  const resetForm = () => {
    setFeatures({
      acuteOnset: false,
      inattention: false,
      disorganizedThinking: false,
      alteredLOC: false,
    });
  };

  const exportHistory = () => {
    const csvContent = [
      'Timestamp,Acute Onset,Inattention,Disorganized Thinking,Altered LOC,Delirium',
      ...history.map(entry => `${entry.timestamp},${entry.acuteOnset},${entry.inattention},${entry.disorganizedThinking},${entry.alteredLOC},${entry.delirium}`)
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cam_icu_history.csv';
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
          <AlertCircle size={24} className="text-teal-600" />
          <Typography variant="h5" className="header">Confusion Assessment Method for ICU (CAM-ICU)</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" className="text-gray-700" mb={3}>
          The CAM-ICU assesses delirium in ICU patients using four key features. Delirium is diagnosed when Feature 1 (acute onset or fluctuating course) AND Feature 2 (inattention) are present, PLUS either Feature 3 (disorganized thinking) OR Feature 4 (altered level of consciousness).
        </Typography>
        <Box display="flex" flexDirection="column" gap={2} mb={3}>
          {[
            { name: 'acuteOnset', label: 'Feature 1: Acute onset or fluctuating course', tooltip: 'Sudden change or variability in mental status' },
            { name: 'inattention', label: 'Feature 2: Inattention', tooltip: 'Difficulty sustaining attention, e.g., unable to follow commands' },
            { name: 'disorganizedThinking', label: 'Feature 3: Disorganized thinking', tooltip: 'Illogical or incoherent thought processes' },
            { name: 'alteredLOC', label: 'Feature 4: Altered level of consciousness', tooltip: 'Any state other than alert and calm' },
          ].map(({ name, label, tooltip }) => (
            <Tooltip key={name} title={tooltip} placement="right">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={features[name]}
                    onChange={handleChange}
                    name={name}
                    sx={{ color: '#00695c', '&.Mui-checked': { color: '#00695c' } }}
                  />
                }
                label={label}
                className="text-gray-700"
              />
            </Tooltip>
          ))}
        </Box>
        <AnimatePresence>
          <motion.div
            key={isDelirium}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Chip
              icon={<CheckCircle size={20} />}
              label={`Delirium Present: ${isDelirium ? 'Yes' : 'No'}`}
              color={isDelirium ? 'error' : 'success'}
              className="mb-6"
            />
          </motion.div>
        </AnimatePresence>
        <Box display="flex" gap={2} mb={3}>
          <Button
            variant="contained"
            className="btn-primary"
            onClick={resetForm}
          >
            Reset Assessment
          </Button>
          <Button
            variant="outlined"
            className="text-teal-600 border-teal-600 hover:bg-teal-50"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? 'Hide History' : 'Show History'}
          </Button>
          {history.length > 0 && (
            <Button
              variant="outlined"
              startIcon={<Download size={20} />}
              className="text-teal-600 border-teal-600 hover:bg-teal-50"
              onClick={exportHistory}
            >
              Export History
            </Button>
          )}
        </Box>
        <Collapse in={showHistory}>
          <Paper sx={{ p: 2, mb: 3, maxHeight: 200, overflowY: 'auto' }} className="card">
            <Typography variant="subtitle1" className="text-teal-600 mb-2">Assessment History</Typography>
            {history.length === 0 ? (
              <Typography variant="body2" className="text-gray-500">No assessments recorded.</Typography>
            ) : (
              history.map((entry, index) => (
                <Box key={index} mb={1} p={1} bgcolor="grey.100" borderRadius={4}>
                  <Typography variant="caption" className="text-gray-600">
                    {entry.timestamp}: Delirium {entry.delirium ? 'Present' : 'Absent'} (F1: {entry.acuteOnset ? 'Yes' : 'No'}, F2: {entry.inattention ? 'Yes' : 'No'}, F3: {entry.disorganizedThinking ? 'Yes' : 'No'}, F4: {entry.alteredLOC ? 'Yes' : 'No'})
                  </Typography>
                </Box>
              ))
            )}
          </Paper>
        </Collapse>
        <Paper sx={{ p: 2 }} className="card">
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Info size={20} className="text-teal-600" />
            <Typography variant="subtitle1" className="text-teal-600">CAM-ICU Criteria</Typography>
          </Box>
          <Typography variant="body2" className="text-gray-700">
            <ul className="list-disc pl-5">
              <li>Feature 1: Sudden onset or fluctuating mental status</li>
              <li>Feature 2: Inability to maintain attention</li>
              <li>Feature 3: Illogical or incoherent thinking</li>
              <li>Feature 4: Any level of consciousness other than alert</li>
            </ul>
          </Typography>
        </Paper>
        <Typography variant="caption" component="div" className="text-gray-500 mt-4">
          <strong>Source:</strong> Ely EW, et al. JAMA 2001;286(21):2703-10<br />
          <strong>References:</strong><br />
          - Inouye SK, et al. Ann Intern Med 1990;113(12):941-8<br />
          - Devlin JW, et al. Crit Care Med 2018;46(9):e825-73
        </Typography>
      </motion.div>
    </main>
  );
};

export default CAMICU;