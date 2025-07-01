import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertTriangle } from 'lucide-react';
import { FormControl, TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';

const SAPSII = () => {
  const [formData, setFormData] = useState({
    age: '',
    heartRate: '',
    systolicBP: '',
    temperature: '',
    gcs: '',
    pao2fio2: '',
    urineOutput: '',
    bun: '',
    sodium: '',
    potassium: '',
    bicarbonate: '',
    bilirubin: '',
    wbc: '',
    chronicDisease: '',
    admissionType: '',
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateSAPSII = () => {
    const { age, heartRate, systolicBP, temperature, gcs, pao2fio2, urineOutput, bun, sodium, potassium, bicarbonate, bilirubin, wbc, chronicDisease, admissionType } = formData;
    
    const ageNum = parseFloat(age);
    const heartRateNum = parseFloat(heartRate);
    const systolicBPNum = parseFloat(systolicBP);
    const temperatureNum = parseFloat(temperature);
    const gcsNum = parseFloat(gcs);
    const pao2fio2Num = parseFloat(pao2fio2);
    const urineOutputNum = parseFloat(urineOutput);
    const bunNum = parseFloat(bun);
    const sodiumNum = parseFloat(sodium);
    const potassiumNum = parseFloat(potassium);
    const bicarbonateNum = parseFloat(bicarbonate);
    const bilirubinNum = parseFloat(bilirubin);
    const wbcNum = parseFloat(wbc);

    if (
      !age || isNaN(ageNum) || ageNum < 0 ||
      !heartRate || isNaN(heartRateNum) || heartRateNum < 0 ||
      !systolicBP || isNaN(systolicBPNum) || systolicBPNum < 0 ||
      !temperature || isNaN(temperatureNum) ||
      !gcs || isNaN(gcsNum) || gcsNum < 3 || gcsNum > 15 ||
      !pao2fio2 || isNaN(pao2fio2Num) || pao2fio2Num < 0 ||
      !urineOutput || isNaN(urineOutputNum) || urineOutputNum < 0 ||
      !bun || isNaN(bunNum) || bunNum < 0 ||
      !sodium || isNaN(sodiumNum) || sodiumNum < 0 ||
      !potassium || isNaN(potassiumNum) || potassiumNum < 0 ||
      !bicarbonate || isNaN(bicarbonateNum) || bicarbonateNum < 0 ||
      !bilirubin || isNaN(bilirubinNum) || bilirubinNum < 0 ||
      !wbc || isNaN(wbcNum) || wbcNum < 0 ||
      !chronicDisease || !admissionType
    ) {
      setResult({ message: 'Please complete all required fields with valid values.' });
      return;
    }

    let score = 0;

    // Age
    if (ageNum >= 40 && ageNum < 60) score += 7;
    else if (ageNum >= 60 && ageNum < 70) score += 12;
    else if (ageNum >= 70 && ageNum < 75) score += 15;
    else if (ageNum >= 75 && ageNum < 80) score += 16;
    else if (ageNum >= 80) score += 18;

    // Heart Rate
    if (heartRateNum < 40) score += 11;
    else if (heartRateNum >= 40 && heartRateNum < 70) score += 2;
    else if (heartRateNum >= 120 && heartRateNum < 160) score += 4;
    else if (heartRateNum >= 160) score += 7;

    // Systolic BP
    if (systolicBPNum < 70) score += 13;
    else if (systolicBPNum >= 70 && systolicBPNum < 100) score += 5;
    else if (systolicBPNum >= 200) score += 2;

    // Temperature
    if (temperatureNum < 39) score += 0;
    else score += 3;

    // Glasgow Coma Scale
    if (gcsNum < 6) score += 26;
    else if (gcsNum >= 6 && gcsNum < 9) score += 13;
    else if (gcsNum >= 9 && gcsNum < 11) score += 7;
    else if (gcsNum >= 11 && gcsNum < 14) score += 5;

    // PaO2/FiO2 (if ventilated or CPAP)
    if (pao2fio2Num < 100) score += 11;
    else if (pao2fio2Num >= 100 && pao2fio2Num < 200) score += 9;
    else if (pao2fio2Num >= 200) score += 6;

    // Urine Output
    if (urineOutputNum < 500) score += 11;
    else if (urineOutputNum >= 500 && urineOutputNum < 1000) score += 4;

    // BUN
    if (bunNum >= 28 && bunNum < 56) score += 6;
    else if (bunNum >= 56) score += 10;

    // Sodium
    if (sodiumNum < 125) score += 5;
    else if (sodiumNum >= 145) score += 1;

    // Potassium
    if (potassiumNum < 3) score += 3;
    else if (potassiumNum >= 5) score += 3;

    // Bicarbonate
    if (bicarbonateNum < 15) score += 6;
    else if (bicarbonateNum >= 15 && bicarbonateNum < 20) score += 3;

    // Bilirubin
    if (bilirubinNum >= 4 && bilirubinNum < 6) score += 4;
    else if (bilirubinNum >= 6) score += 9;

    // WBC
    if (wbcNum < 1) score += 12;
    else if (wbcNum >= 20) score += 3;

    // Chronic Disease
    if (chronicDisease === 'metastaticCancer') score += 9;
    else if (chronicDisease === 'hematologicMalignancy') score += 10;
    else if (chronicDisease === 'aids') score += 11;

    // Admission Type
    if (admissionType === 'scheduledSurgical') score += 0;
    else if (admissionType === 'medical') score += 6;
    else if (admissionType === 'unscheduledSurgical') score += 8;

    // Mortality calculation
    const logit = -7.7631 + 0.0737 * score + 0.9971 * Math.log(score + 1);
    const mortality = (Math.exp(logit) / (1 + Math.exp(logit))) * 100;

    let riskLevel, recommendations;
    if (score <= 40) {
      riskLevel = 'Low Risk';
      recommendations = 'Low mortality risk. Monitor closely and manage underlying conditions.';
    } else if (score <= 60) {
      riskLevel = 'Moderate Risk';
      recommendations = 'Moderate mortality risk. Optimize supportive care and consider ICU consultation.';
    } else {
      riskLevel = 'High Risk';
      recommendations = 'High mortality risk. Urgent ICU admission and aggressive management required.';
    }

    setResult({
      score,
      mortality: mortality.toFixed(1),
      riskLevel,
      recommendations,
    });
  };

  const handleReset = () => {
    setFormData({
      age: '',
      heartRate: '',
      systolicBP: '',
      temperature: '',
      gcs: '',
      pao2fio2: '',
      urineOutput: '',
      bun: '',
      sodium: '',
      potassium: '',
      bicarbonate: '',
      bilirubin: '',
      wbc: '',
      chronicDisease: '',
      admissionType: '',
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
            <h1 className="text-2xl font-bold text-card-foreground">SAPS II Score Calculator</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            This calculator computes the Simplified Acute Physiology Score II (SAPS II) to assess severity of illness and predict mortality in ICU patients. Enter the required values.
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
              <p className="text-muted-foreground text-sm mt-1">Older age increases risk.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <TextField
                fullWidth
                label="Heart Rate (beats/min)"
                name="heartRate"
                type="number"
                value={formData.heartRate}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter heart rate"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Extreme heart rates increase score.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <TextField
                fullWidth
                label="Systolic BP (mmHg)"
                name="systolicBP"
                type="number"
                value={formData.systolicBP}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter systolic BP"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Low or high BP contributes to score.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <TextField
                fullWidth
                label="Temperature (°C)"
                name="temperature"
                type="number"
                value={formData.temperature}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter temperature"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Fever ≥39°C adds points.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <TextField
                fullWidth
                label="Glasgow Coma Scale (3–15)"
                name="gcs"
                type="number"
                value={formData.gcs}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter GCS"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Lower GCS indicates worse neurological status.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <TextField
                fullWidth
                label="PaO2/FiO2 (mmHg)"
                name="pao2fio2"
                type="number"
                value={formData.pao2fio2}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter PaO2/FiO2 ratio"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">For ventilated or CPAP patients.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <TextField
                fullWidth
                label="Urine Output (mL/day)"
                name="urineOutput"
                type="number"
                value={formData.urineOutput}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter urine output"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Low urine output indicates renal dysfunction.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <TextField
                fullWidth
                label="BUN (mg/dL)"
                name="bun"
                type="number"
                value={formData.bun}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter BUN"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Elevated BUN indicates renal impairment.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <TextField
                fullWidth
                label="Sodium (mEq/L)"
                name="sodium"
                type="number"
                value={formData.sodium}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter sodium"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Abnormal sodium levels contribute to score.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            >
              <TextField
                fullWidth
                label="Potassium (mEq/L)"
                name="potassium"
                type="number"
                value={formData.potassium}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter potassium"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Abnormal potassium levels contribute to score.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.0 }}
            >
              <TextField
                fullWidth
                label="Bicarbonate (mEq/L)"
                name="bicarbonate"
                type="number"
                value={formData.bicarbonate}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter bicarbonate"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Low bicarbonate indicates metabolic acidosis.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.1 }}
            >
              <TextField
                fullWidth
                label="Bilirubin (mg/dL)"
                name="bilirubin"
                type="number"
                value={formData.bilirubin}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter bilirubin"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Elevated bilirubin indicates liver dysfunction.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.2 }}
            >
              <TextField
                fullWidth
                label="WBC (×10³/µL)"
                name="wbc"
                type="number"
                value={formData.wbc}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter WBC count"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Abnormal WBC counts indicate infection or hematologic issues.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.3 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Chronic Disease</InputLabel>
                <Select
                  name="chronicDisease"
                  value={formData.chronicDisease}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Chronic Disease</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="metastaticCancer">Metastatic Cancer</MenuItem>
                  <MenuItem value="hematologicMalignancy">Hematologic Malignancy</MenuItem>
                  <MenuItem value="aids">AIDS</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Severe chronic diseases increase risk.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.4 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Admission Type</InputLabel>
                <Select
                  name="admissionType"
                  value={formData.admissionType}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Admission Type</MenuItem>
                  <MenuItem value="scheduledSurgical">Scheduled Surgical</MenuItem>
                  <MenuItem value="medical">Medical</MenuItem>
                  <MenuItem value="unscheduledSurgical">Unscheduled Surgical</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Admission type affects mortality risk.</p>
              </FormControl>
            </motion.div>
          </div>

          <div className="flex gap-4 mt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                onClick={calculateSAPSII}
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
                Calculate SAPS II Score
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
                      <strong>SAPS II Score:</strong> {result.score}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Predicted Mortality:</strong> {result.mortality}%
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
            The Simplified Acute Physiology Score II (SAPS II) assesses severity of illness and predicts hospital mortality in ICU patients based on physiological and clinical variables.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Components:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Physiological Variables:</strong> Age, heart rate, systolic BP, temperature, GCS, PaO2/FiO2, urine output, BUN, sodium, potassium, bicarbonate, bilirubin, WBC.</li>
            <li><strong>Clinical Variables:</strong> Chronic disease (metastatic cancer, hematologic malignancy, AIDS), admission type (scheduled surgical, medical, unscheduled surgical).</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Risk Interpretation:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Score ≤40:</strong> Low risk; lower mortality probability.</li>
            <li><strong>Score 41–60:</strong> Moderate risk; increased mortality probability.</li>
            <li><strong>Score >60:</strong> High risk; high mortality probability.</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Clinical Recommendations:</strong> For moderate to high scores, escalate care with ICU admission and targeted organ support (e.g., mechanical ventilation, vasopressors, dialysis). Monitor daily to assess progression. Integrate with clinical context, such as sepsis or trauma protocols, and consult specialists (e.g., intensivist, nephrologist) for severe cases. Use predicted mortality to guide discussions with family and care planning.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SAPSII;