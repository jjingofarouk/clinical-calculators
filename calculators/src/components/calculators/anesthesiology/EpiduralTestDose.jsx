import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Calculator, Info } from 'lucide-react';
import { Box, Typography, TextField, Button, Tabs, Tab, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const EpiduralTestDose = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    medication: 'lidocaine',
    concentration: '',
    volume: '',
    epinephrine: '',
    weight: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTestDose = () => {
    const { concentration, volume, epinephrine, weight } = formData;
    if (!concentration || !volume || !epinephrine || !weight) return null;

    const concentrationNum = parseFloat(concentration);
    const volumeNum = parseFloat(volume);
    const epinephrineNum = parseFloat(epinephrine);
    const weightNum = parseFloat(weight);

    const totalDose = (concentrationNum * volumeNum).toFixed(2);
    const dosePerKg = (totalDose / weightNum).toFixed(2);
    const epinephrineDose = (epinephrineNum * volumeNum).toFixed(2);
    let recommendation = 'Safe';
    if (dosePerKg > 0.1 || epinephrineDose > 15) recommendation = 'High - Review';
    else if (dosePerKg < 0.05) recommendation = 'Low - Adjust';

    return { totalDose, dosePerKg, epinephrineDose, recommendation };
  };

  const results = calculateTestDose();

  const tabContent = [
    {
      label: 'Test Dose Calculator',
      icon: <Calculator className="w-5 h-5" />,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <Typography className="header">Epidural Test Dose Parameters</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Medication</InputLabel>
                <Select
                  label="Medication"
                  name="medication"
                  value={formData.medication}
                  onChange={handleInputChange}
                >
                  <MenuItem value="lidocaine">Lidocaine</MenuItem>
                  <MenuItem value="bupivacaine">Bupivacaine</MenuItem>
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
                label="Epinephrine (mcg/mL)"
                name="epinephrine"
                type="number"
                value={formData.epinephrine}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
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
                <Typography>Total Dose: {results.totalDose} mg</Typography>
                <Typography>Dose per kg: {results.dosePerKg} mg/kg</Typography>
                <Typography>Epinephrine Dose: {results.epinephrineDose} mcg</Typography>
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
          <Typography className="header">Epidural Test Dose Guidelines</Typography>
          <Typography variant="body2">
            An epidural test dose is administered to confirm correct catheter placement and avoid complications such as intravascular or intrathecal injection. Typically, lidocaine (1-2%) with epinephrine (5-15 mcg/mL) is used. This calculator estimates the total dose, dose per kg, and epinephrine dose to ensure safe administration, with recommendations based on standard clinical thresholds.
          </Typography>
          <Typography variant="body2" className="mt-2">
            <strong>Sources:</strong>
            <ul>
              <li>American Society of Regional Anesthesia and Pain Medicine: Epidural Test Dose Guidelines</li>
              <li>Guay J. The epidural test dose: a review. Anesth Analg. 2006;102(3):921-9. (PMID: 16492849)</li>
              <li>Mulroy MF, et al. A Practical Approach to Regional Anesthesia. 4th ed. 2008.</li>
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
          <Stethoscope className="w-6 h-6" /> Epidural Test Dose Calculator
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

export default EpiduralTestDose;