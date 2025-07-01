import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertTriangle } from 'lucide-react';
import { FormControl, FormControlLabel, Checkbox, Button } from '@mui/material';

const QSOFA = () => {
  const [formData, setFormData] = useState({
    respiratoryRate: false,
    systolicBP: false,
    mentalStatus: false,
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const calculateQSOFA = () => {
    const { respiratoryRate, systolicBP, mentalStatus } = formData;

    const score = (
      (respiratoryRate ? 1 : 0) +
      (systolicBP ? 1 : 0) +
      (mentalStatus ? 1 : 0)
    );

    let riskLevel, recommendations;
    if (score < 2) {
      riskLevel = 'Low Risk';
      recommendations = 'Low risk of poor outcome from sepsis. Monitor vital signs and clinical status.';
    } else {
      riskLevel = 'High Risk';
      recommendations = 'High risk of poor outcome from sepsis. Urgent evaluation for sepsis, initiate SIRS criteria assessment, and consider ICU admission.';
    }

    setResult({ score, riskLevel, recommendations });
  };

  const handleReset = () => {
    setFormData({
      respiratoryRate: false,
      systolicBP: false,
      mentalStatus: false,
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
            <h1 className="text-2xl font-bold text-card-foreground">qSOFA Score Calculator</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            The quick Sequential Organ Failure Assessment (qSOFA) score identifies patients at risk of poor outcomes from sepsis outside the ICU. Check the criteria that apply.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="respiratoryRate"
                    checked={formData.respiratoryRate}
                    onChange={handleInputChange}
                    className="text-primary focus:ring-ring border-border"
                    sx={{
                      color: 'hsl(var(--border))',
                      '&.Mui-checked': { color: 'hsl(var(--primary))' },
                    }}
                  />
                }
                label="Respiratory Rate ≥ 22 breaths/min"
                className="text-card-foreground"
              />
              <p className="text-muted-foreground text-sm mt-1">Elevated respiratory rate indicates respiratory distress.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="systolicBP"
                    checked={formData.systolicBP}
                    onChange={handleInputChange}
                    className="text-primary focus:ring-ring border-border"
                    sx={{
                      color: 'hsl(var(--border))',
                      '&.Mui-checked': { color: 'hsl(var(--primary))' },
                    }}
                  />
                }
                label="Systolic Blood Pressure ≤ 100 mmHg"
                className="text-card-foreground"
              />
              <p className="text-muted-foreground text-sm mt-1">Low blood pressure suggests hemodynamic instability.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="mentalStatus"
                    checked={formData.mentalStatus}
                    onChange={handleInputChange}
                    className="text-primary focus:ring-ring border-border"
                    sx={{
                      color: 'hsl(var(--border))',
                      '&.Mui-checked': { color: 'hsl(var(--primary))' },
                    }}
                  />
                }
                label="Altered Mental Status (GCS < 15)"
                className="text-card-foreground"
              />
              <p className="text-muted-foreground text-sm mt-1">Altered mentation indicates neurological compromise.</p>
            </motion.div>
          </div>

          <div className="flex gap-4 mt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                onClick={calculateQSOFA}
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
                Calculate qSOFA Score
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
                      <strong>qSOFA Score:</strong> {result.score}
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
            The quick Sequential Organ Failure Assessment (qSOFA) score is a bedside tool to identify patients outside the ICU at risk of poor outcomes from sepsis.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Criteria (1 point each):</strong>
          </p>
  <ul className="list-disc pl-6 text-muted-foreground mb-4">
  <li><strong>Respiratory Rate:</strong> ≥22 breaths/min.</li>
  <li><strong>Systolic Blood Pressure:</strong> ≤100 mmHg.</li>
  <li><strong>Altered Mental Status:</strong> Glasgow Coma Scale &lt;15.</li>
</ul>
          <p className="text-muted-foreground mb-4">
            <strong>Risk Interpretation:</strong>
          </p>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
  <li><strong>Score &lt;2:</strong> Low risk; monitor for clinical deterioration.</li>
  <li><strong>Score ≥2:</strong> High risk; increased likelihood of mortality or ICU admission.</li>
</ul>
          <p className="text-muted-foreground">
            <strong>Clinical Recommendations:</strong> For a qSOFA score ≥2, urgently evaluate for sepsis using SIRS criteria or SOFA score. Obtain blood cultures, lactate levels, and initiate broad-spectrum antibiotics if infection is suspected. Consider ICU transfer and fluid resuscitation. For low-risk patients, continue monitoring vital signs and reassess frequently. Always integrate with clinical judgment and patient history.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default QSOFA;