import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Syringe, AlertTriangle } from 'lucide-react';
import { FormControl, TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';

const RSIDrugDosing = () => {
  const [formData, setFormData] = useState({
    weight: '',
    drug: '',
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateRSIDosing = () => {
    const { weight, drug } = formData;
    const weightNum = parseFloat(weight);

    if (!weight || isNaN(weightNum) || weightNum <= 0 || !drug) {
      setResult({ message: 'Please enter a valid weight and select a drug.' });
      return;
    }

    const drugs = {
      etomidate: { dose: 0.3, unit: 'mg/kg', maxDose: 20 },
      ketamine: { dose: 2, unit: 'mg/kg', maxDose: 200 },
      propofol: { dose: 2, unit: 'mg/kg', maxDose: 200 },
      midazolam: { dose: 0.2, unit: 'mg/kg', maxDose: 10 },
      succinylcholine: { dose: 1.5, unit: 'mg/kg', maxDose: 150 },
      rocuronium: { dose: 1.2, unit: 'mg/kg', maxDose: 100 },
    };

    const selectedDrug = drugs[drug];
    if (!selectedDrug) {
      setResult({ message: 'Invalid drug selection.' });
      return;
    }

    let calculatedDose = weightNum * selectedDrug.dose;
    calculatedDose = Math.min(calculatedDose, selectedDrug.maxDose);

    const recommendations = `Administer ${calculatedDose.toFixed(1)} mg of ${drug} IV. Ensure airway equipment and monitoring are ready. Confirm no contraindications (e.g., allergies, hyperkalemia for succinylcholine). Monitor for hypotension (especially with propofol or midazolam) and prepare for intubation.`;

    setResult({
      drug,
      dose: calculatedDose.toFixed(1),
      unit: 'mg',
      recommendations,
    });
  };

  const handleReset = () => {
    setFormData({
      weight: '',
      drug: '',
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
            <Syringe className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-card-foreground">Rapid Sequence Intubation (RSI) Drug Dosing Calculator</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            This calculator provides dosing recommendations for common medications used in Rapid Sequence Intubation (RSI) based on patient weight. Select a drug and enter the patient’s weight.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter weight in kg"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Enter patient’s actual body weight.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Drug</InputLabel>
                <Select
                  name="drug"
                  value={formData.drug}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Drug</MenuItem>
                  <MenuItem value="etomidate">Etomidate (0.3 mg/kg)</MenuItem>
                  <MenuItem value="ketamine">Ketamine (2 mg/kg)</MenuItem>
                  <MenuItem value="propofol">Propofol (2 mg/kg)</MenuItem>
                  <MenuItem value="midazolam">Midazolam (0.2 mg/kg)</MenuItem>
                  <MenuItem value="succinylcholine">Succinylcholine (1.5 mg/kg)</MenuItem>
                  <MenuItem value="rocuronium">Rocuronium (1.2 mg/kg)</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Select the induction or paralytic agent.</p>
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
                onClick={calculateRSIDosing}
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
                Calculate RSI Dose
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
                      <strong>Drug:</strong> {result.drug.charAt(0).toUpperCase() + result.drug.slice(1)}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Dose:</strong> {result.dose} {result.unit}
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
            The Rapid Sequence Intubation (RSI) Drug Dosing Calculator provides weight-based dosing for induction and paralytic agents used during emergency airway management.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Drugs and Dosing:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Etomidate:</strong> 0.3 mg/kg IV (max 20 mg); preferred for hemodynamic stability.</li>
            <li><strong>Ketamine:</strong> 2 mg/kg IV (max 200 mg); ideal for hypotensive or bronchospastic patients.</li>
            <li><strong>Propofol:</strong> 2 mg/kg IV (max 200 mg); risk of hypotension, use cautiously.</li>
            <li><strong>Midazolam:</strong> 0.2 mg/kg IV (max 10 mg); slower onset, risk of hypotension.</li>
            <li><strong>Succinylcholine:</strong> 1.5 mg/kg IV (max 150 mg); rapid paralysis, avoid in hyperkalemia.</li>
            <li><strong>Rocuronium:</strong> 1.2 mg/kg IV (max 100 mg); non-depolarizing, longer duration.</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Clinical Recommendations:</strong> Verify patient weight and contraindications before administration. Prepare airway equipment (e.g., laryngoscope, endotracheal tube) and monitoring (e.g., pulse oximetry, capnography). Administer induction agent followed by paralytic agent for RSI. Monitor for adverse effects (e.g., hypotension, anaphylaxis) and ensure post-intubation sedation. Follow local protocols and consult an airway specialist for complex cases.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RSIDrugDosing;