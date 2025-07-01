import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertTriangle } from 'lucide-react';
import { FormControl, TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';

const SOFAScore = () => {
  const [formData, setFormData] = useState({
    respiratory: '',
    coagulation: '',
    liver: '',
    cardiovascular: '',
    cns: '',
    renal: '',
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateSOFAScore = () => {
    const { respiratory, coagulation, liver, cardiovascular, cns, renal } = formData;

    if (
      !respiratory || !coagulation || !liver ||
      !cardiovascular || !cns || !renal
    ) {
      setResult({ message: 'Please complete all required fields.' });
      return;
    }

    const scores = {
      respiratory: parseInt(respiratory),
      coagulation: parseInt(coagulation),
      liver: parseInt(liver),
      cardiovascular: parseInt(cardiovascular),
      cns: parseInt(cns),
      renal: parseInt(renal),
    };

    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

    let riskLevel, recommendations;
    if (totalScore <= 6) {
      riskLevel = 'Low Risk';
      recommendations = 'Low organ dysfunction. Monitor closely and manage underlying conditions.';
    } else if (totalScore <= 12) {
      riskLevel = 'Moderate Risk';
      recommendations = 'Moderate organ dysfunction. Optimize supportive care and consider ICU consultation.';
    } else {
      riskLevel = 'High Risk';
      recommendations = 'Severe organ dysfunction. Urgent ICU admission and aggressive management required.';
    }

    setResult({ totalScore, riskLevel, recommendations });
  };

  const handleReset = () => {
    setFormData({
      respiratory: '',
      coagulation: '',
      liver: '',
      cardiovascular: '',
      cns: '',
      renal: '',
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
            <h1 className="text-2xl font-bold text-card-foreground">SOFA Score Calculator</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            This calculator computes the Sequential Organ Failure Assessment (SOFA) score to evaluate organ dysfunction in critically ill patients. Select the appropriate values for each organ system.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Respiratory (PaO2/FiO2, mmHg)</InputLabel>
                <Select
                  name="respiratory"
                  value={formData.respiratory}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Respiratory Score</MenuItem>
                  <MenuItem value="0">≥400 (0 points)</MenuItem>
                  <MenuItem value="1">300–399 (1 point)</MenuItem>
                  <MenuItem value="2">200–299 (2 points)</MenuItem>
                  <MenuItem value="3">100–199 or mechanical ventilation (3 points)</MenuItem>
                  <MenuItem value="4">&lt;100 or mechanical ventilation (4 points)</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Based on PaO2/FiO2 ratio or ventilation status.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Coagulation (Platelets, ×10³/µL)</InputLabel>
                <Select
                  name="coagulation"
                  value={formData.coagulation}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Coagulation Score</MenuItem>
                  <MenuItem value="0">≥150 (0 points)</MenuItem>
                  <MenuItem value="1">100–149 (1 point)</MenuItem>
                  <MenuItem value="2">50–99 (2 points)</MenuItem>
                  <MenuItem value="3">20–49 (3 points)</MenuItem>
                  <MenuItem value="4">&lt;20 (4 points)</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Lower platelet counts indicate worse coagulation dysfunction.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Liver (Bilirubin, mg/dL)</InputLabel>
                <Select
                  name="liver"
                  value={formData.liver}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Liver Score</MenuItem>
                  <MenuItem value="0">&lt;1.2 (0 points)</MenuItem>
                  <MenuItem value="1">1.2–1.9 (1 point)</MenuItem>
                  <MenuItem value="2">2.0–5.9 (2 points)</MenuItem>
                  <MenuItem value="3">6.0–11.9 (3 points)</MenuItem>
                  <MenuItem value="4">≥12.0 (4 points)</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Higher bilirubin levels indicate liver dysfunction.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Cardiovascular (Hypotension)</InputLabel>
                <Select
                  name="cardiovascular"
                  value={formData.cardiovascular}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Cardiovascular Score</MenuItem>
                  <MenuItem value="0">No hypotension (0 points)</MenuItem>
                  <MenuItem value="1">MAP &lt;70 mmHg (1 point)</MenuItem>
                  <MenuItem value="2">Dopamine ≤5 or dobutamine (2 points)</MenuItem>
                  <MenuItem value="3">Dopamine &gt;5, epi ≤0.1, or norepi ≤0.1 (3 points)</MenuItem>
                  <MenuItem value="4">Dopamine &gt;15, epi &gt;0.1, or norepi &gt;0.1 (4 points)</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Based on mean arterial pressure or vasopressor use.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">CNS (Glasgow Coma Scale)</InputLabel>
                <Select
                  name="cns"
                  value={formData.cns}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select CNS Score</MenuItem>
                  <MenuItem value="0">15 (0 points)</MenuItem>
                  <MenuItem value="1">13–14 (1 point)</MenuItem>
                  <MenuItem value="2">10–12 (2 points)</MenuItem>
                  <MenuItem value="3">6–9 (3 points)</MenuItem>
                  <MenuItem value="4">&lt;6 (4 points)</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Lower GCS indicates worse neurological dysfunction.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Renal (Creatinine, mg/dL)</InputLabel>
                <Select
                  name="renal"
                  value={formData.renal}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Renal Score</MenuItem>
                  <MenuItem value="0"><1.2 (0 points)</MenuItem>
                  <MenuItem value="1">1.2–1.9 (1 point)</MenuItem>
                  <MenuItem value="2">2.0–3.4 (2 points)</MenuItem>
                  <MenuItem value="3">3.5–4.9 or urine <500 mL/day (3 points)</MenuItem>
                  <MenuItem value="4">≥5.0 or urine <200 mL/day (4 points)</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Higher creatinine or low urine output indicates renal dysfunction.</p>
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
                onClick={calculateSOFAScore}
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
                Calculate SOFA Score
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
                      <strong>SOFA Score:</strong> {result.totalScore}
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
            The Sequential Organ Failure Assessment (SOFA) score evaluates organ dysfunction in critically ill patients, commonly used in sepsis and ICU settings.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Components:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Respiratory:</strong> Based on PaO2/FiO2 ratio or ventilation (0–4 points).</li>
            <li><strong>Coagulation:</strong> Platelet count (0–4 points).</li>
            <li><strong>Liver:</strong> Bilirubin levels (0–4 points).</li>
            <li><strong>Cardiovascular:</strong> Mean arterial pressure or vasopressor use (0–4 points).</li>
            <li><strong>CNS:</strong> Glasgow Coma Scale (0–4 points).</li>
            <li><strong>Renal:</strong> Creatinine or urine output (0–4 points).</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Risk Interpretation:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Score 0–6:</strong> Low risk; minimal organ dysfunction.</li>
            <li><strong>Score 7–12:</strong> Moderate risk; significant organ dysfunction.</li>
            <li><strong>Score &gt;12:</strong> High risk; severe organ failure with high mortality risk.</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Clinical Recommendations:</strong> For moderate to high scores, escalate care with ICU admission and targeted organ support (e.g., mechanical ventilation, vasopressors, dialysis). Monitor daily SOFA scores to assess progression or improvement. Integrate with clinical context, such as sepsis protocols, and consult specialists (e.g., intensivist, nephrologist) for severe cases. Early intervention is critical to improve outcomes.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SOFAScore;