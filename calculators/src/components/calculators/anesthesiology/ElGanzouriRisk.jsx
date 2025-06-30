import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Calculator, Info } from 'lucide-react';
import { Box, Typography, TextField, Button, Tabs, Tab, Grid, FormControlLabel, Checkbox } from '@mui/material';

const ElGanzouriRisk = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    mouthOpening: false,
    thyromentalDistance: false,
    mallampati: false,
    neckMovement: false,
    prognathism: false,
    weight: false,
    history: false,
  });

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const calculateEGRI = () => {
    const { mouthOpening, thyromentalDistance, mallampati, neckMovement, prognathism, weight, history } = formData;
    const score = [
      mouthOpening,
      thyromentalDistance,
      mallampati,
      neckMovement,
      prognathism,
      weight,
      history,
    ].filter(Boolean).length;
    let riskLevel = 'Low';
    if (score >= 4) riskLevel = 'High';
    else if (score >= 2) riskLevel = 'Moderate';
    return { score, riskLevel };
  };

  const results = calculateEGRI();

  const tabContent = [
    {
      label: 'EGRI Calculator',
      icon: <Calculator className="w-5 h-5" />,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <Typography className="header">El-Ganzouri Risk Index Parameters</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="mouthOpening"
                    checked={formData.mouthOpening}
                    onChange={handleInputChange}
                  />
                }
                label="Mouth Opening < 4 cm"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="thyromentalDistance"
                    checked={formData.thyromentalDistance}
                    onChange={handleInputChange}
                  />
                }
                label="Thyromental Distance < 6 cm"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="mallampati"
                    checked={formData.mallampati}
                    onChange={handleInputChange}
                  />
                }
                label="Mallampati Class III or IV"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="neckMovement"
                    checked={formData.neckMovement}
                    onChange={handleInputChange}
                  />
                }
                label="Neck Movement < 80°"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="prognathism"
                    checked={formData.prognathism}
                    onChange={handleInputChange}
                  />
                }
                label="Inability to Prognath"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="weight"
                    checked={formData.weight}
                    onChange={handleInputChange}
                  />
                }
                label="Weight > 90 kg"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="history"
                    checked={formData.history}
                    onChange={handleInputChange}
                  />
                }
                label="History of Difficult Intubation"
              />
            </Grid>
          </Grid>
          <Button className="btn-primary mt-4" onClick={() => {}}>
            Calculate
          </Button>
          <AnimatePresence>
            {results.score > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4"
              >
                <Typography className="header">Results</Typography>
                <Typography>EGRI Score: {results.score}</Typography>
                <Typography>Risk Level: {results.riskLevel}</Typography>
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
          <Typography className="header">El-Ganzouri Risk Index Guidelines</Typography>
          <Typography variant="body2">
            The El-Ganzouri Risk Index (EGRI) is used to predict difficult tracheal intubation in anesthesiology. It assesses seven parameters, each contributing one point to the total score. A score of 0-1 indicates low risk, 2-3 moderate risk, and ≥4 high risk for difficult intubation.
          </Typography>
          <Typography variant="body2" className="mt-2">
            <strong>Sources:</strong>
            <ul>
              <li>El-Ganzouri AR, et al. Preoperative Airway Assessment. Anesth Analg. 1996.</li>
              <li>PMC: Predictive Efficacy of EGRI (PMC9191799)</li>
              <li>IJA: Evaluating the Predictive Efficacy (2024)</li>
              <li>British Journal of Anaesthesia: Airway Assessment (S0007-0912(17)35971-8)</li>
              <li>EJHM: Validation of EGRI (62144)</li>
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
          <Stethoscope className="w-6 h-6" /> El-Ganzouri Risk Index
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

export default ElGanzouriRisk;