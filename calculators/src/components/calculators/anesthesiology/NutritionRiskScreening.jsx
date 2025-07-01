import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, AlertTriangle } from 'lucide-react';
import { FormControl, FormControlLabel, Checkbox, TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';

const NutritionRiskScreening = () => {
  const [formData, setFormData] = useState({
    bmi: '',
    weightLoss: '',
    foodIntake: '',
    diseaseSeverity: '',
    age: '',
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateNRS2002 = () => {
    const { bmi, weightLoss, foodIntake, diseaseSeverity, age } = formData;
    const bmiNum = parseFloat(bmi);
    const ageNum = parseFloat(age);

    if (
      !bmi || isNaN(bmiNum) || bmiNum < 0 ||
      !weightLoss || !foodIntake || !diseaseSeverity ||
      !age || isNaN(ageNum) || ageNum < 0
    ) {
      setResult({ message: 'Please complete all required fields with valid values.' });
      return;
    }

    let nutritionalScore = 0;
    let diseaseScore = 0;
    let totalScore = 0;

    // BMI
    if (bmiNum < 18.5) nutritionalScore += 3;
    else if (bmiNum >= 18.5 && bmiNum < 20.5) nutritionalScore += 1;

    // Weight Loss
    if (weightLoss === 'high') nutritionalScore += 3;
    else if (weightLoss === 'moderate') nutritionalScore += 2;
    else if (weightLoss === 'low') nutritionalScore += 1;

    // Food Intake
    if (foodIntake === '0-25') nutritionalScore += 3;
    else if (foodIntake === '25-50') nutritionalScore += 2;
    else if (foodIntake === '50-75') nutritionalScore += 1;

    // Disease Severity
    if (diseaseSeverity === 'severe') diseaseScore += 3;
    else if (diseaseSeverity === 'moderate') diseaseScore += 2;
    else if (diseaseSeverity === 'mild') diseaseScore += 1;

    // Age adjustment
    totalScore = nutritionalScore + diseaseScore;
    if (ageNum >= 70) totalScore += 1;

    let riskLevel, recommendations;
    if (totalScore < 3) {
      riskLevel = 'Low Risk';
      recommendations = 'No nutritional intervention required. Monitor nutritional status weekly.';
    } else {
      riskLevel = 'High Risk';
      recommendations = 'Initiate nutritional support (e.g., oral supplements, enteral/parenteral nutrition). Consult a dietitian and develop a nutritional plan.';
    }

    setResult({ totalScore, riskLevel, recommendations });
  };

  const handleReset = () => {
    setFormData({
      bmi: '',
      weightLoss: '',
      foodIntake: '',
      diseaseSeverity: '',
      age: '',
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
            <Apple className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-card-foreground">Nutrition Risk Screening (NRS-2002)</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            This calculator uses the NRS-2002 tool to screen for nutritional risk in hospitalized patients. Complete the fields below to assess the need for nutritional intervention.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TextField
                fullWidth
                label="BMI (kg/m²)"
                name="bmi"
                type="number"
                value={formData.bmi}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter BMI"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">BMI <18.5 indicates severe malnutrition; 18.5–20.5 indicates mild risk.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Weight Loss</InputLabel>
                <Select
                  name="weightLoss"
                  value={formData.weightLoss}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Weight Loss</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="low">Low (&lt;5% in 3 months)</MenuItem>
                  <MenuItem value="moderate">Moderate (5–10% in 3 months)</MenuItem>
                  <MenuItem value="high">High (&gt;10% in 3 months)</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Significant weight loss increases nutritional risk.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Food Intake (Past Week)</InputLabel>
                <Select
                  name="foodIntake"
                  value={formData.foodIntake}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Food Intake</MenuItem>
                  <MenuItem value=">75">>75% of normal</MenuItem>
                  <MenuItem value="50-75">50–75% of normal</MenuItem>
                  <MenuItem value="25-50">25–50% of normal</MenuItem>
                  <MenuItem value="0-25">0–25% of normal</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Reduced food intake indicates nutritional compromise.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Disease Severity</InputLabel>
                <Select
                  name="diseaseSeverity"
                  value={formData.diseaseSeverity}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Disease Severity</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="mild">Mild (e.g., minor surgery)</MenuItem>
                  <MenuItem value="moderate">Moderate (e.g., hip fracture)</MenuItem>
                  <MenuItem value="severe">Severe (e.g., major surgery, ICU)</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Severe disease increases nutritional demands.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
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
              <p className="text-muted-foreground text-sm mt-1">Age ≥70 increases nutritional risk.</p>
            </motion.div>
          </div>

          <div className="flex gap-4 mt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                onClick={calculateNRS2002}
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
                Calculate Nutritional Risk
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
                      <strong>NRS-2002 Score:</strong> {result.totalScore}
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
            The NRS-2002 (Nutritional Risk Screening 2002) is a validated tool to identify patients at risk of malnutrition who may benefit from nutritional intervention. It assesses nutritional status and disease severity.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Risk Factors:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>BMI:</strong> <18.5 (3 points); 18.5–20.5 (1 point).</li>
            <li><strong>Weight Loss:</strong> >10% in 3 months (3 points); 5–10% (2 points); <5% (1 point).</li>
            <li><strong>Food Intake:</strong> 0–25% of normal (3 points); 25–50% (2 points); 50–75% (1 point).</li>
            <li><strong>Disease Severity:</strong> Severe (3 points); moderate (2 points); mild (1 point).</li>
            <li><strong>Age:</strong> ≥70 years adds 1 point to the total score.</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Risk Interpretation:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Score <3:</strong> Low risk; no immediate nutritional intervention needed.</li>
            <li><strong>Score ≥3:</strong> High risk; nutritional support required.</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Clinical Recommendations:</strong> For high-risk patients, initiate nutritional support (e.g., oral supplements, enteral, or parenteral nutrition) within 24–48 hours. Consult a dietitian for a tailored plan. Monitor intake and weight regularly. Consider underlying conditions (e.g., cancer, GI disorders) and adjust interventions accordingly. Implement preventive measures for low-risk patients to avoid deterioration.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NutritionRiskScreening;