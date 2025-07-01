
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertTriangle } from 'lucide-react';
import { FormControl, FormControlLabel, Checkbox, TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';

const PREDELIRIC = () => {
  const [formData, setFormData] = useState({
    age: '',
    coma: '',
    infection: false,
    apacheII: '',
    admissionCategory: '',
    urea: '',
    metabolicAcidosis: false,
    sedativeUse: false,
    morphineDose: '',
    emergencyAdmission: false,
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const calculatePREDELIRIC = () => {
    const { age, coma, infection, apacheII, admissionCategory, urea, metabolicAcidosis, sedativeUse, morphineDose, emergencyAdmission } = formData;
    const ageNum = parseFloat(age);
    const apacheIINum = parseFloat(apacheII);
    const ureaNum = parseFloat(urea);
    const morphineDoseNum = parseFloat(morphineDose);

    if (
      !age || isNaN(ageNum) || ageNum < 0 ||
      !coma || !apacheII || isNaN(apacheIINum) || apacheIINum < 0 ||
      !admissionCategory || !urea || isNaN(ureaNum) ||
      !morphineDose || isNaN(morphineDoseNum)
    ) {
      setResult({ message: 'Please complete all required fields with valid values.' });
      return;
    }

    let score = 0;
    let riskPercentage;

    // Age
    score += (ageNum / 10) * 0.3;

    // Coma
    if (coma === 'drugInduced') score += 1.6;
    else if (coma === 'other') score += 2.25;
    else if (coma === 'combined') score += 2.7;

    // Infection
    if (infection) score += 1.0;

    // APACHE II Score
    score += (apacheIINum / 10) * 0.5;

    // Admission Category
    if (admissionCategory === 'surgical') score += 0.4;
    else if (admissionCategory === 'trauma') score += 1.2;
    else if (admissionCategory === 'neurological') score += 1.5;
    else if (admissionCategory === 'other') score += 1.0;

    // Urea (mmol/L)
    score += (ureaNum / 10) * 0.2;

    // Metabolic Acidosis
    if (metabolicAcidosis) score += 0.7;

    // Sedative Use
    if (sedativeUse) score += 1.6;

    // Morphine Dose (mg/kg/day)
    if (morphineDoseNum <= 0.01) score += 0;
    else if (morphineDoseNum <= 0.1) score += 0.5;
    else if (morphineDoseNum <= 1.0) score += 1.0;
    else score += 1.5;

    // Emergency Admission
    if (emergencyAdmission) score += 0.6;

    // Calculate risk percentage
    const logit = -6.28 + score;
    riskPercentage = (Math.exp(logit) / (1 + Math.exp(logit))) * 100;

    let riskLevel, recommendations;
    if (riskPercentage < 20) {
      riskLevel = 'Low Risk';
      recommendations = 'Low risk of delirium. Monitor mental status and implement standard preventive measures.';
    } else if (riskPercentage < 50) {
      riskLevel = 'Moderate Risk';
      recommendations = 'Moderate risk of delirium. Implement non-pharmacologic interventions (e.g., early mobilization, sleep hygiene).';
    } else {
      riskLevel = 'High Risk';
      recommendations = 'High risk of delirium. Initiate aggressive non-pharmacologic interventions and consider pharmacologic prophylaxis in consultation with a specialist.';
    }

    setResult({ score: score.toFixed(2), riskPercentage: riskPercentage.toFixed(1), riskLevel, recommendations });
  };

  const handleReset = () => {
    setFormData({
      age: '',
      coma: '',
      infection: false,
      apacheII: '',
      admissionCategory: '',
      urea: '',
      metabolicAcidosis: false,
      sedativeUse: false,
      morphineDose: '',
      emergencyAdmission: false,
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
            <h1 className="text-2xl font-bold text-card-foreground">PRE-DELIRIC Score Calculator</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            This calculator uses the PRE-DELIRIC model to predict the risk of delirium in ICU patients. Complete the fields below to evaluate the risk.
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
              <p className="text-muted-foreground text-sm mt-1">Older age increases delirium risk.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Coma Type</InputLabel>
                <Select
                  name="coma"
                  value={formData.coma}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Coma Type</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="drugInduced">Drug-Induced</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                  <MenuItem value="combined">Combined</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Coma significantly increases delirium risk.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="infection"
                    checked={formData.infection}
                    onChange={handleInputChange}
                    className="text-primary focus:ring-ring border-border"
                    sx={{
                      color: 'hsl(var(--border))',
                      '&.Mui-checked': { color: 'hsl(var(--primary))' },
                    }}
                  />
                }
                label="Infection Present"
                className="text-card-foreground"
              />
              <p className="text-muted-foreground text-sm mt-1">Infections are associated with higher delirium risk.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <TextField
                fullWidth
                label="APACHE II Score"
                name="apacheII"
                type="number"
                value={formData.apacheII}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter APACHE II score"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Higher APACHE II scores indicate greater severity of illness.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Admission Category</InputLabel>
                <Select
                  name="admissionCategory"
                  value={formData.admissionCategory}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Admission Category</MenuItem>
                  <MenuItem value="medical">Medical</MenuItem>
                  <MenuItem value="surgical">Surgical</MenuItem>
                  <MenuItem value="trauma">Trauma</MenuItem>
                  <MenuItem value="neurological">Neurological</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Admission type affects delirium risk.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <TextField
                fullWidth
                label="Urea (mmol/L)"
                name="urea"
                type="number"
                value={formData.urea}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter urea level"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Elevated urea is a risk factor for delirium.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="metabolicAcidosis"
                    checked={formData.metabolicAcidosis}
                    onChange={handleInputChange}
                    className="text-primary focus:ring-ring border-border"
                    sx={{
                      color: 'hsl(var(--border))',
                      '&.Mui-checked': { color: 'hsl(var(--primary))' },
                    }}
                  />
                }
                label="Metabolic Acidosis"
                className="text-card-foreground"
              />
              <p className="text-muted-foreground text-sm mt-1">Metabolic acidosis increases delirium risk.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="sedativeUse"
                    checked={formData.sedativeUse}
                    onChange={handleInputChange}
                    className="text-primary focus:ring-ring border-border"
                    sx={{
                      color: 'hsl(var(--border))',
                      '&.Mui-checked': { color: 'hsl(var(--primary))' },
                    }}
                  />
                }
                label="Sedative Use"
                className="text-card-foreground"
              />
              <p className="text-muted-foreground text-sm mt-1">Sedatives (e.g., benzodiazepines) increase delirium risk.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <TextField
                fullWidth
                label="Morphine Dose (mg/kg/day)"
                name="morphineDose"
                type="number"
                value={formData.morphineDose}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter morphine dose"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Higher morphine doses correlate with increased risk.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="emergencyAdmission"
                    checked={formData.emergencyAdmission}
                    onChange={handleInputChange}
                    className="text-primary focus:ring-ring border-border"
                    sx={{
                      color: 'hsl(var(--border))',
                      '&.Mui-checked': { color: 'hsl(var(--primary))' },
                    }}
                  />
                }
                label="Emergency Admission"
                className="text-card-foreground"
              />
              <p className="text-muted-foreground text-sm mt-1">Emergency admissions increase delirium risk.</p>
            </motion.div>
          </div>

          <div className="flex gap-4 mt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                onClick={calculatePREDELIRIC}
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
                Calculate Delirium Risk
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
                      <strong>PRE-DELIRIC Score:</strong> {result.score}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Risk of Delirium:</strong> {result.riskPercentage}%</p>
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
            The PRE-DELIRIC (PREdiction of DELIRium in ICu patients) model predicts the risk of delirium in ICU patients based on 10 risk factors assessed within 24 hours of admission.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Risk Factors:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Age:</strong> Risk increases with age (0.3 points per decade).</li>
            <li><strong>Coma:</strong> Drug-induced (1.6 points), other (2.25 points), combined (2.7 points).</li>
            <li><strong>Infection:</strong> Presence adds 1.0 point.</li>
            <li><strong>APACHE II Score:</strong> Higher severity increases risk (0.5 points per 10 points).</li>
            <li><strong>Admission Category:</strong> Surgical (0.4), trauma (1.2), neurological (1.5), other (1.0).</li>
            <li><strong>Urea:</strong> Elevated levels increase risk (0.2 points per 10 mmol/L).</li>
            <li><strong>Metabolic Acidosis:</strong> Presence adds 0.7 points.</li>
            <li><strong>Sedative Use:</strong> Adds 1.6 points.</li>
            <li><strong>Morphine Dose:</strong> 0.01–0.1 mg/kg/day (0.5 points), 0.1–1.0 (1.0 point), >1.0 (1.5 points).</li>
            <li><strong>Emergency Admission:</strong> Adds 0.6 points.</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Risk Interpretation:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong><20%:</strong> Low risk; minimal interventions needed.</li>
            <li><strong>20–50%:</strong> Moderate risk; implement preventive strategies.</li>
            <li><strong>>50%:</strong> High risk; aggressive prevention and monitoring required.</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Clinical Recommendations:</strong> For moderate to high-risk patients, implement non-pharmacologic interventions (e.g., early mobilization, reorientation, sleep protocols). Avoid unnecessary sedatives and optimize pain management. Monitor daily with a delirium assessment tool (e.g., CAM-ICU). Consult a specialist for high-risk cases. Always integrate with patient-specific factors and ICU protocols.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PREDELIRIC;