import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertTriangle } from 'lucide-react';
import { FormControl, FormControlLabel, Checkbox, TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';

const GuptaPerioperativeRisk = () => {
  const [formData, setFormData] = useState({
    age: '',
    asaStatus: '',
    functionalStatus: '',
    serumCreatinine: '',
    surgicalProcedure: '',
    emergency: false,
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const calculateGuptaRisk = () => {
    const { age, asaStatus, functionalStatus, serumCreatinine, surgicalProcedure, emergency } = formData;
    const ageNum = parseFloat(age);
    const creatinineNum = parseFloat(serumCreatinine);

    if (!age || isNaN(ageNum) || ageNum < 0 || !asaStatus || !functionalStatus || !serumCreatinine || isNaN(creatinineNum) || !surgicalProcedure) {
      setResult({ message: 'Please complete all required fields with valid values.' });
      return;
    }

    let score = 0;
    let riskLevel, recommendations;

    // Age
    if (ageNum >= 80) score += 2;
    else if (ageNum >= 65) score += 1;

    // ASA Status
    if (asaStatus === '3') score += 1;
    else if (asaStatus === '4-5') score += 2;

    // Functional Status
    if (functionalStatus === 'partiallyDependent') score += 1;
    else if (functionalStatus === 'totallyDependent') score += 2;

    // Serum Creatinine
    if (creatinineNum >= 1.2) score += 1;

    // Surgical Procedure
    if (['cardiac', 'vascular', 'thoracic'].includes(surgicalProcedure)) score += 2;
    else if (surgicalProcedure === 'abdominal') score += 1;

    // Emergency Surgery
    if (emergency) score += 2;

    // Risk assessment
    if (score <= 2) {
      riskLevel = 'Low Risk';
      recommendations = 'Low perioperative cardiac risk. Standard preoperative optimization recommended.';
    } else if (score <= 5) {
      riskLevel = 'Moderate Risk';
      recommendations = 'Moderate perioperative cardiac risk. Consider cardiac stress testing and optimization of comorbidities.';
    } else {
      riskLevel = 'High Risk';
      recommendations = 'High perioperative cardiac risk. Strongly consider cardiology consultation, stress testing, and aggressive optimization.';
    }

    setResult({ score, riskLevel, recommendations });
  };

  const handleReset = () => {
    setFormData({
      age: '',
      asaStatus: '',
      functionalStatus: '',
      serumCreatinine: '',
      surgicalProcedure: '',
      emergency: false,
    });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground w-full">
      <div className="container mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-radius shadow-lg p-6 mb-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Stethoscope className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-card-foreground">Gupta Perioperative Cardiac Risk Calculator</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            This calculator assesses perioperative cardiac risk based on the Gupta MICA (Myocardial Infarction or Cardiac Arrest) risk model. Complete the fields below to evaluate the risk.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TextField
                fullWidth
                label="Age (years)"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter age"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Age ≥65 increases risk; ≥80 significantly higher.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">ASA Physical Status</InputLabel>
                <Select
                  name="asaStatus"
                  value={formData.asaStatus}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select ASA Status</MenuItem>
                  <MenuItem value="1">ASA I (Healthy)</MenuItem>
                  <MenuItem value="2">ASA II (Mild systemic disease)</MenuItem>
                  <MenuItem value="3">ASA III (Severe systemic disease)</MenuItem>
                  <MenuItem value="4-5">ASA IV–V (Severe disease, life-threatening)</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Higher ASA status indicates greater risk.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Functional Status</InputLabel>
                <Select
                  name="functionalStatus"
                  value={formData.functionalStatus}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Functional Status</MenuItem>
                  <MenuItem value="independent">Independent</MenuItem>
                  <MenuItem value="partiallyDependent">Partially Dependent</MenuItem>
                  <MenuItem value="totallyDependent">Totally Dependent</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Dependency increases cardiac risk.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <TextField
                fullWidth
                label="Serum Creatinine (mg/dL)"
                name="serumCreatinine"
                type="number"
                value={formData.serumCreatinine}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter serum creatinine"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Creatinine ≥1.2 mg/dL indicates renal impairment.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Surgical Procedure</InputLabel>
                <Select
                  name="surgicalProcedure"
                  value={formData.surgicalProcedure}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Surgical Procedure</MenuItem>
                  <MenuItem value="general">General Surgery</MenuItem>
                  <MenuItem value="abdominal">Abdominal Surgery</MenuItem>
                  <MenuItem value="cardiac">Cardiac Surgery</MenuItem>
                  <MenuItem value="vascular">Vascular Surgery</MenuItem>
                  <MenuItem value="thoracic">Thoracic Surgery</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">High-risk procedures increase cardiac complications.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="emergency"
                    checked={formData.emergency}
                    onChange={handleInputChange}
                    className="text-primary focus:ring-ring border-border"
                    sx={{
                      color: 'hsl(var(--border))',
                      '&.Mui-checked': { color: 'hsl(var(--primary))' },
                    }}
                  />
                }
                label="Emergency Surgery"
                className="text-card-foreground"
              />
              <p className="text-muted-foreground text-sm mt-1">Emergency procedures significantly increase risk.</p>
            </motion.div>
          </div>

          <div className="flex gap-4 mt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                onClick={calculateGuptaRisk}
                className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                sx={{
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  borderRadius: 'var(--radius)',
                  padding: '8px 16px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'hsl(var(--accent))',
                    color: 'hsl(var(--accent-foreground))',
                  },
                }}
                fullWidth
              >
                Calculate Cardiac Risk
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                onClick={handleReset}
                className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                sx={{
                  backgroundColor: 'hsl(var(--secondary))',
                  color: 'hsl(var(--secondary-foreground))',
                  borderRadius: 'var(--radius)',
                  padding: '8px 16px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'hsl(var(--accent))',
                    color: 'hsl(var(--accent-foreground))',
                  },
                }}
                fullWidth
              >
                Reset
              </Button>
            </motion.div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-4 bg-secondary rounded-radius"
              >
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-secondary-foreground">Results</h2>
                </div>
                {result.message ? (
                  <p className="text-destructive-foreground">{result.message}</p>
                ) : (
                  <>
                    <p className="text-muted-foreground">
                      <strong>Gupta Score:</strong> {result.score}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Risk Level:</strong> {result.riskLevel}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Recommendations:</strong> {result.recommendations}
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-radius shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Clinical Guidance</h2>
          <p className="text-muted-foreground mb-4">
            The Gupta Perioperative Cardiac Risk Calculator is based on the Myocardial Infarction or Cardiac Arrest (MICA) risk model, designed to predict the risk of major adverse cardiac events (MACE) in non-cardiac surgery.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Risk Factors:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Age:</strong> ≥65 years (1 point); ≥80 years (2 points).</li>
            <li><strong>ASA Status:</strong> ASA III (1 point); ASA IV–V (2 points).</li>
            <li><strong>Functional Status:</strong> Partially dependent (1 point); totally dependent (2 points).</li>
            <li><strong>Serum Creatinine:</strong> ≥1.2 mg/dL (1 point).</li>
            <li><strong>Surgical Procedure:</strong> Abdominal (1 point); cardiac, vascular, or thoracic (2 points).</li>
            <li><strong>Emergency Surgery:</strong> Yes (2 points).</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Risk Interpretation:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Score 0–2:</strong> Low risk; minimal cardiac complications expected.</li>
            <li><strong>Score 3–5:</strong> Moderate risk; increased likelihood of MACE.</li>
            <li><strong>Score >5:</strong> High risk; significant chance of cardiac events.</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Clinical Recommendations:</strong> For moderate to high-risk patients, consider preoperative cardiac evaluation (e.g., stress testing, echocardiography) and optimization of comorbidities (e.g., hypertension, diabetes). High-risk patients may benefit from cardiology consultation. Emergency surgeries require rapid assessment and stabilization. Always integrate with patient-specific factors and surgical context.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default GuptaPerioperativeRisk;