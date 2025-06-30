import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Calculator, Info } from 'lucide-react';
import { Box, Typography, TextField, Button, Tabs, Tab, Grid } from '@mui/material';

const EntropyMonitoring = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    stateEntropy: '',
    responseEntropy: '',
    burstSuppression: '',
    age: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateEntropy = () => {
    const { stateEntropy, responseEntropy, burstSuppression, age } = formData;
    if (!stateEntropy || !responseEntropy || !burstSuppression || !age) return null;

    const stateEntropyNum = parseFloat(stateEntropy);
    const responseEntropyNum = parseFloat(responseEntropy);
    const burstSuppressionNum = parseFloat(burstSuppression);
    const ageNum = parseFloat(age);

    const entropyDiff = (responseEntropyNum - stateEntropyNum).toFixed(2);
    let anesthesiaDepth = 'Adequate';
    if (stateEntropyNum < 40 || responseEntropyNum < 50) anesthesiaDepth = 'Deep';
    else if (stateEntropyNum > 60 || responseEntropyNum > 70) anesthesiaDepth = 'Light';
    const ageAdjustedBSR = (burstSuppressionNum * (ageNum > 60 ? 1.2 : 1)).toFixed(2);

    return { entropyDiff, anesthesiaDepth, ageAdjustedBSR };
  };

  const results = calculateEntropy();

  const tabContent = [
    {
      label: 'Entropy Calculator',
      icon: <Calculator className="w-5 h-5" />,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <Typography className="header">Entropy Monitoring Parameters</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State Entropy (SE)"
                name="stateEntropy"
                type="number"
                value={formData.stateEntropy}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Response Entropy (RE)"
                name="responseEntropy"
                type="number"
                value={formData.responseEntropy}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Burst Suppression Ratio (%)"
                name="burstSuppression"
                type="number"
                value={formData.burstSuppression}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button className="btn-primary mt-4" onClick={() => {}}>
            Calculate
          </Button>
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4"
              >
                <Typography className="header">Results</Typography>
                <Typography>RE-SE Difference: {results.entropyDiff}</Typography>
                <Typography>Anesthesia Depth: {results.anesthesiaDepth}</Typography>
                <Typography>Age-Adjusted BSR: {results.ageAdjustedBSR}%</Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ),
    },
    {
      label: 'Information',
      icon: <Info className="w-5 h-5" />,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <Typography className="header">Entropy Monitoring Guidelines</Typography>
          <Typography variant="body2">
            Entropy monitoring assesses the depth of anesthesia by analyzing EEG signals. State Entropy (SE) reflects cortical activity, while Response Entropy (RE) includes frontal muscle activity. A RE-SE difference > 10 or SE < 40 may indicate deep anesthesia, while SE > 60 suggests light anesthesia. Burst Suppression Ratio (BSR) is adjusted for age due to variability in EEG patterns.
          </Typography>
          <Typography variant="body2" className="mt-2">
            <strong>Sources:</strong>
            <ul>
              <li>Vakkuri A, et al. Spectral Entropy Monitoring. Anesthesiology. 2004.</li>
              <li>PubMed: Entropy in Anesthesia Monitoring (PMID: 15277929)</li>
              <li>Viertiö-Oja H, et al. Entropy Monitoring in Anesthesia. Acta Anaesthesiologica Scandinavica. 2004.</li>
            </ul>
          </Typography>
        </motion.div>
      ),
    },
  ];

  return (
    <Box component="main">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container"
      >
        <Typography className="header flex items-center gap-2">
          <Stethoscope className="w-6 h-6" /> Entropy Monitoring Calculator
        </Typography>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          className="calculator-tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabContent.map((tab, index) => (
            <Tab
              key={index}
              label={
                <span className="flex items-center gap-2">
                  {tab.icon}
                  {tab.label}
                </span>
              }
            />
          ))}
        </Tabs>
        <Box className="mt-4">{tabContent[activeTab].content}</Box>
      </motion.div>
    </Box>
  );
};

export default EntropyMonitoring;