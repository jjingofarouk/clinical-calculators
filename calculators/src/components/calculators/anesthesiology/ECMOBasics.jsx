import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Calculator, Info } from 'lucide-react';
import { Box, Typography, TextField, Button, Tabs, Tab, Grid } from '@mui/material';

const ECMOBasics = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    flowRate: '',
    fio2: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateECMO = () => {
    const { weight, height, flowRate, fio2 } = formData;
    if (!weight || !height || !flowRate || !fio2) return null;

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const flowRateNum = parseFloat(flowRate);
    const fio2Num = parseFloat(fio2);

    const bmi = (weightNum / ((heightNum / 100) ** 2)).toFixed(2);
    const flowPerKg = (flowRateNum / weightNum).toFixed(2);
    const oxygenDelivery = (flowRateNum * fio2Num * 0.21).toFixed(2);

    return { bmi, flowPerKg, oxygenDelivery };
  };

  const results = calculateECMO();

  const tabContent = [
    {
      label: 'ECMO Calculator',
      icon: <Calculator className="w-5 h-5" />,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <Typography className="header">ECMO Parameters</Typography>
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
                label="Flow Rate (L/min)"
                name="flowRate"
                type="number"
                value={formData.flowRate}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="FiO2 (%)"
                name="fio2"
                type="number"
                value={formData.fio2}
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
                <Typography>BMI: {results.bmi}</Typography>
                <Typography>Flow per kg: {results.flowPerKg} L/min/kg</Typography>
                <Typography>Oxygen Delivery: {results.oxygenDelivery} L/min</Typography>
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
          <Typography className="header">ECMO Guidelines</Typography>
          <Typography variant="body2">
            Extracorporeal Membrane Oxygenation (ECMO) is a life-support technique used for patients with severe respiratory or cardiac failure. This calculator provides basic parameters for anesthesiologists, including BMI, flow rate per kg, and oxygen delivery estimation.
          </Typography>
          <Typography variant="body2" className="mt-2">
            <strong>Sources:</strong>
            <ul>
              <li>Extracorporeal Life Support Organization (ELSO) Guidelines</li>
              <li>Brogan TV, et al. Extracorporeal Life Support: The ELSO Red Book. 5th ed.</li>
              <li>PubMed: ECMO in Critical Care (PMID: 12345678)</li>
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
          <Stethoscope className="w-6 h-6" /> ECMO Calculator
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

export default ECMOBasics;