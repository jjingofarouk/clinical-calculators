import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, Typography, Paper, Divider, Chip, Tooltip, Button, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '100%',
  margin: 'auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

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

  return (
    <StyledBox>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <AlertCircle size={24} color="#00695c" />
          <Typography variant="h5" color="text.primary">Confusion Assessment Method for ICU (CAM-ICU)</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" color="text.secondary" mb={3}>
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
                    color="primary"
                  />
                }
                label={label}
                sx={{ '& .MuiFormControlLabel-label': { color: 'text.primary' } }}
              />
            </Tooltip>
          ))}
        </Box>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Chip
            icon={<CheckCircle size={20} />}
            label={`Delirium Present: ${isDelirium ? 'Yes' : 'No'}`}
            color={isDelirium ? 'error' : 'success'}
            sx={{ mb: 3, fontWeight: 'medium' }}
          />
        </motion.div>
        <Button
          variant="contained"
          color="primary"
          onClick={resetForm}
          sx={{ mb: 3, textTransform: 'none' }}
        >
          Reset Assessment
        </Button>
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Info size={20} color="#00695c" />
            <Typography variant="subtitle1" color="text.primary">CAM-ICU Criteria</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li>Feature 1: Sudden onset or fluctuating mental status</li>
              <li>Feature 2: Inability to maintain attention</li>
              <li>Feature 3: Illogical or incoherent thinking</li>
              <li>Feature 4: Any level of consciousness other than alert</li>
            </ul>
          </Typography>
        </Paper>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setShowHistory(!showHistory)}
          sx={{ mb: 2, textTransform: 'none' }}
        >
          {showHistory ? 'Hide Assessment History' : 'Show Assessment History'}
        </Button>
        <Collapse in={showHistory}>
          <Paper elevation={1} sx={{ p: 2, maxHeight: 200, overflowY: 'auto' }}>
            <Typography variant="subtitle1" mb={1}>Assessment History</Typography>
            {history.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No assessments recorded.</Typography>
            ) : (
              history.map((entry, index) => (
                <Box key={index} mb={1} p={1} bgcolor="grey.100" borderRadius={1}>
                  <Typography variant="caption" color="text.secondary">
                    {entry.timestamp}: Delirium {entry.delirium ? 'Present' : 'Absent'} (F1: {entry.acuteOnset ? 'Yes' : 'No'}, F2: {entry.inattention ? 'Yes' : 'No'}, F3: {entry.disorganizedThinking ? 'Yes' : 'No'}, F4: { | entry.alteredLOC ? 'Yes' : 'No'})
                  </Typography>
                </Box>
              ))
            )}
          </Paper>
        </Collapse>
        <Typography variant="caption" color="text.secondary" component="div">
          <strong>Source:</strong> Ely EW, et al. JAMA 2001;286(21):2703-10<br />
          <strong>References:</strong><br />
          - Inouye SK, et al. Ann Intern Med 1990;113(12):941-8<br />
          - Devlin JW, et al. Crit Care Med 2018;46(9):e825-73
        </Typography>
      </motion.div>
    </StyledBox>
  );
};

export default CAMICU;