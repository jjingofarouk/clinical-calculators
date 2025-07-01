import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Save } from 'lucide-react';

const OSMRSCalculator = () => {
  const [formData, setFormData] = useState({
    bmi: '',
    hypertension: '',
    diabetes: '',
    sleepApnea: '',
    female: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setResult(null);
  };

  const calculateOSMRS = () => {
    const { bmi, hypertension, diabetes, sleepApnea, female } = formData;

    if (!bmi || !hypertension || !diabetes || !sleepApnea || !female) {
      return { error: 'Please fill in all fields' };
    }

    const bmiNum = parseFloat(bmi);

    if (isNaN(bmiNum)) return { error: 'Please enter a valid number for BMI' };
    if (bmiNum < 10 || bmiNum > 100) return { error: 'BMI must be between 10 and 100' };

    let score = 0;

    // OS-MRS scoring (based on PubMed:17476870)
    if (bmiNum >= 50) score += 2;
    if (hypertension === 'yes') score += 2;
    if (diabetes === 'yes') score += 2;
    if (sleepApnea === 'yes') score += 2;
    if (female === 'no') score += 1;

    // Mortality risk
    let risk = '';
    if (score === 0) risk = 'Low (0-1%)';
    else if (score <= 2) risk = 'Intermediate (1-5%)';
    else if (score <= 5) risk = 'High (5-10%)';
    else risk = 'Very High (>10%)';

    return { score, risk };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateOSMRS();
    if (result.error) {
      setError(result.error);
      setResult(null);
    } else {
      setResult(result);
      setError('');
    }
  };

  return (
    <motion.div
      className="bg-card p-6 rounded-radius shadow-lg max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <Calculator className="w-6 h-6 text-primary mr-2" />
        <h2 className="text-2xl font-bold text-foreground">OS-MRS Calculator</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Predict mortality risk for bariatric surgery patients.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">BMI (kg/m²)</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter BMI"
            min="10"
            max="100"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Hypertension</label>
          <select
            name="hypertension"
            value={formData.hypertension}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Hypertension</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Diabetes</label>
          <select
            name="diabetes"
            value={formData.diabetes}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Diabetes</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Sleep Apnea</label>
          <select
            name="sleepApnea"
            value={formData.sleepApnea}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Sleep Apnea</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Gender</label>
          <select
            name="female"
            value={formData.female}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Gender</option>
            <option value="yes">Female</option>
            <option value="no">Male</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center justify-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Calculate OS-MRS
        </button>
      </div>
      {error && (
        <motion.p
          className="mt-4 text-destructive text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
      {result && (
        <motion.div
          className="mt-4 p-4 bg-muted rounded-radius"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-foreground">Results</h3>
          <p className="text-sm text-foreground">
            OS-MRS Score: <span className="font-bold">{result.score}</span>
          </p>
          <p className="text-sm text-foreground">
            Mortality Risk: <span className="font-bold">{result.risk}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Based on Obesity Surgery Mortality Risk Score. Consult a healthcare professional for clinical decisions.[](https://www.mdcalc.com/calc/10520/obesity-surgery-mortality-risk-score-os-mrs)
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OSMRSCalculator;