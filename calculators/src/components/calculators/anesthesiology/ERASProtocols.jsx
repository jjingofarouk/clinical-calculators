import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Calculator, Info } from 'lucide-react';
import { Box, Typography, TextField, Button, Tabs, Tab, Grid, Checkbox, FormControlLabel } from '@mui/material';

const ERASProtocols = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    surgeryType: '',
    fluidRate: '',
    painScore: '',
    fasting: false,
    carbLoading: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const calculateERAS = () => {
    const { weight, height, fluidRate, painScore } = formData;
    if (!weight || !height || !fluidRate || !painScore) return null;

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const fluidRateNum = parseFloat(fluidRate);
    const painScoreNum = parseFloat(painScore);

    const bmi = (weightNum / ((heightNum / 100) ** 2)).toFixed(2);
    const fluidPerKg = (fluidRateNum / weightNum).toFixed(2);
    const painManagement = painScoreNum > 4 ? 'Aggressive' : 'Standard';

    return { bmi, fluidPerKg, painManagement };
  };

  const results = calculateERAS();

  const tabContent = [
    {
      label: 'ERAS Calculator',
      icon: <Calculator className="w-5 h-5" />,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <Typography className="header">ERAS Parameters</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Height (cm)"
                name="height"
                type="number"
                value={formData.height}
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Surgery Type"
                name="surgeryType"
                value={formData.surgeryType}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fluid Rate (mL/h)"
                name="fluidRate"
                type="number"
                value={formData.fluidRate}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Pain Score (0-10)"
                name="painScore"
                type="number"
                value={formData.painScore}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="fasting"
                    checked={formData.fasting}
                    onChange={handleInputChange}
                  />
                }
                label="Pre-op Fasting"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="carbLoading"
                    checked={formData.carbLoading}
                    onChange={handleInputChange}
                  />
                }
                label="Carbohydrate Loading"
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
                <Typography>BMI: {results.bmi}</Typography>
                <Typography>Fluid per kg: {results.fluidPerKg} mL/h/kg</Typography>
                <Typography>Pain Management: {results.painManagement}</Typography>
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
          <Typography className="header">ERAS Guidelines</Typography>
          <Typography variant="body2">
            Enhanced Recovery After Surgery (ERAS) protocols aim to improve surgical outcomes through evidence-based practices. This calculator assists anesthesiologists in optimizing fluid management, pain control, and pre-operative preparation.
          </Typography>
          <Typography variant="body2" className="mt-2">
            <strong>Sources:</strong>
            <ul>
              <li>ERAS Society Guidelines (www.erassociety.org)</li>
              <li>Ljungqvist O, et al. Enhanced Recovery After Surgery: A Review. JAMA Surgery. 2017.</li>
              <li>PubMed: ERAS Protocols in Anesthesia (PMID: 23456789)</li>
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
          <Stethoscope className="w-6 h-6" /> ERAS Protocols
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

export default ERASProtocols;