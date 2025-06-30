import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Calculator, Info } from 'lucide-react';
import { Box, Typography, TextField, Button, Tabs, Tab, Grid } from '@mui/material';

const EndTidalCO2 = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    etco2: '',
    paco2: '',
    respiratoryRate: '',
    tidalVolume: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateETCO2 = () => {
    const { etco2, paco2, respiratoryRate, tidalVolume } = formData;
    if (!etco2 || !paco2 || !respiratoryRate || !tidalVolume) return null;

    const etco2Num = parseFloat(etco2);
    const paco2Num = parseFloat(paco2);
    const respiratoryRateNum = parseFloat(respiratoryRate);
    const tidalVolumeNum = parseFloat(tidalVolume);

    const gradient = (paco2Num - etco2Num).toFixed(2);
    const minuteVentilation = (respiratoryRateNum * tidalVolumeNum / 1000).toFixed(2);
    const status = gradient > 5 ? 'High Gradient' : 'Normal Gradient';

    return { gradient, minuteVentilation, status };
  };

  const results = calculateETCO2();

  const tabContent = [
    {
      label: 'ETCO2 Calculator',
      icon: <Calculator className="w-5 h-5" />,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <Typography className="header">End-Tidal CO2 Parameters</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ETCO2 (mmHg)"
                name="etco2"
                type="number"
                value={formData.etco2}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="PaCO2 (mmHg)"
                name="paco2"
                type="number"
                value={formData.paco2}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Respiratory Rate (breaths/min)"
                name="respiratoryRate"
                type="number"
                value={formData.respiratoryRate}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tidal Volume (mL)"
                name="tidalVolume"
                type="number"
                value={formData.tidalVolume}
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
                <Typography>PaCO2-ETCO2 Gradient: {results.gradient} mmHg</Typography>
                <Typography>Minute Ventilation: {results.minuteVentilation} L/min</Typography>
                <Typography>Status: {results.status}</Typography>
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
          <Typography className="header">End-Tidal CO2 Guidelines</Typography>
          <Typography variant="body2">
            End-Tidal CO2 (ETCO2) monitoring is critical in anesthesiology for assessing ventilation and perfusion. This calculator evaluates the PaCO2-ETCO2 gradient and minute ventilation to guide clinical decisions. A gradient > 5 mmHg may indicate ventilation-perfusion mismatch.
          </Typography>
          <Typography variant="body2" className="mt-2">
            <strong>Sources:</strong>
            <ul>
              <li>Anderson CT, et al. Capnography in Anesthesia. Anesthesiology. 2006.</li>
              <li>PubMed: ETCO2 Monitoring in Critical Care (PMID: 15678901)</li>
              <li>Walsh BK, et al. Capnography in Respiratory Care. Respiratory Care. 2011.</li>
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
          <Stethoscope className="w-6 h-6" /> End-Tidal CO2 Calculator
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

export default EndTidalCO2;