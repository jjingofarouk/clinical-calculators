import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Calculator, Info } from 'lucide-react';
import { Box, Typography, TextField, Button, Tabs, Tab, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const EpiduralDosing = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    medication: 'bupivacaine',
    concentration: '',
    volume: '',
    infusionRate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateEpiduralDose = () => {
    const { weight, height, concentration, volume, infusionRate } = formData;
    if (!weight || !height || !concentration || !volume || !infusionRate) return null;

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const concentrationNum = parseFloat(concentration);
    const volumeNum = parseFloat(volume);
    const infusionRateNum = parseFloat(infusionRate);

    const bmi = (weightNum / ((heightNum / 100) ** 2)).toFixed(2);
    const totalDose = (concentrationNum * volumeNum).toFixed(2);
    const dosePerKg = (totalDose / weightNum).toFixed(2);
    const hourlyDose = (concentrationNum * infusionRateNum).toFixed(2);

    let recommendation = 'Standard';
    if (dosePerKg > 0.5 || hourlyDose > 15) recommendation = 'High - Review';
    else if (dosePerKg < 0.2) recommendation = 'Low - Adjust';

    return { bmi, totalDose, dosePerKg, hourlyDose, recommendation };
  };

  const results = calculateEpiduralDose();

  const tabContent = [
    {
      label: 'Epidural Calculator',
      icon: <Calculator className="w-5 h-5" />,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <Typography className="header">Epidural Dosing Parameters</Typography>
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
              <FormControl fullWidth variant="outlined">
                <InputLabel>Medication</InputLabel>
                <Select
                  label="Medication"
                  name="medication"
                  value={formData.medication}
                  onChange={handleInputChange}
                >
                  <MenuItem value="bupivacaine">Bupivacaine</MenuItem>
                  <MenuItem value="ropivacaine">Ropivacaine</MenuItem>
                  <MenuItem value="lidocaine">Lidocaine</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Concentration (mg/mL)"
                name="concentration"
                type="number"
                value={formData.concentration}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Volume (mL)"
                name="volume"
                type="number"
                value={formData.volume}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Infusion Rate (mL/h)"
                name="infusionRate"
                type="number"
                value={formData.infusionRate}
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
                <Typography>Total Dose: {results.totalDose} mg</Typography>
                <Typography>Dose per kg: {results.dosePerKg} mg/kg</Typography>
                <Typography>Hourly Dose: {results.hourlyDose} mg/h</Typography>
                <Typography>Recommendation: {results.recommendation}</Typography>
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
          <Typography className="header">Epidural Dosing Guidelines</Typography>
          <Typography variant="body2">
            Epidural anesthesia dosing requires careful calculation to ensure safety and efficacy. This calculator provides estimates for total dose, dose per kg, and hourly infusion rates based on patient parameters and medication choice. Recommendations are based on standard thresholds for common local anesthetics like bupivacaine, ropivacaine, and lidocaine.
          </Typography>
          <Typography variant="body2" className="mt-2">
            <strong>Sources:</strong>
            <ul>
              <li>American Society of Regional Anesthesia and Pain Medicine Guidelines</li>
              <li>PubMed: Epidural Anesthesia Dosing (PMID: 14576523)</li>
              <li>Miller RD, et al. Miller's Anesthesia. 9th ed. 2019.</li>
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
          <Stethoscope className="w-6 h-6" /> Epidural Dosing Calculator
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

export default EpiduralDosing;