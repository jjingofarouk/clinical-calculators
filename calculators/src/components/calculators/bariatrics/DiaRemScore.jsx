import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Save } from 'lucide-react';

const DiaRemScore = () => {
  const [formData, setFormData] = useState({
    age: '',
    insulin: '',
    diabetesMedication: '',
    hba1c: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setResult(null);
  };

  const calculateDiaRemScore = () => {
    const { age, insulin, diabetesMedication, hba1c } = formData;

    if (!age || !insulin || !diabetesMedication || !hba1c) {
      return { error: 'Please fill in all fields' };
    }

    const ageNum = parseFloat(age);
    const hba1cNum = parseFloat(hba1c);

    if (isNaN(ageNum) || isNaN(hba1cNum)) {
      return { error: 'Please enter valid numbers for age and HbA1c' };
    }

    if (ageNum < 0 || ageNum > 120) return { error: 'Age must be between 0 and 120' };
    if (hba1cNum < 0 || hba1cNum > 20) return { error: 'HbA1c must be between 0 and 20%' };

    let score = 0;

    // Age scoring (based on PubMed:25287744)
    if (ageNum < 40) score += 0;
    else if (ageNum < 50) score += 1;
    else if (ageNum < 60) score += 2;
    else score += 3;

    // HbA1c scoring
    if (hba1cNum < 6.5) score += 0;
    else if (hba1cNum < 7.0) score += 2;
    else if (hba1cNum < 9.0) score += 4;
    else score += 6;

    // Insulin use
    if (insulin === 'yes') score += 10;

    // Diabetes medication
    if (diabetesMedication === 'insulin') score += 10;
    else if (diabetesMedication === 'oral') score += 3;

    // Remission probability
    let probability = '';
    if (score <= 2) probability = 'High (>88%)';
    else if (score <= 7) probability = 'Moderate (64-88%)';
    else if (score <= 12) probability = 'Intermediate (23-49%)';
    else if (score <= 17) probability = 'Low (11-22%)';
    else probability = 'Very Low (<11%)';

    return { score, probability };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateDiaRemScore();
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
        <h2 className="text-2xl font-bold text-foreground">DiaRem Score Calculator</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Predict diabetes remission probability after bariatric surgery.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Age (years)</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter age"
            min="0"
            max="120"
            step="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Insulin Use</label>
          <select
            name="insulin"
            value={formData.insulin}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Insulin Use</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Diabetes Medication</label>
          <select
            name="diabetesMedication"
            value={formData.diabetesMedication}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Medication</option>
            <option value="none">None</option>
            <option value="oral">Oral</option>
            <option value="insulin">Insulin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">HbA1c (%)</label>
          <input
            type="number"
            name="hba1c"
            value={formData.hba1c}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter HbA1c level"
            min="0"
            max="20"
            step="0.1"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center justify-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Calculate DiaRem Score
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
            DiaRem Score: <span className="font-bold">{result.score}</span>
          </p>
          <p className="text-sm text-foreground">
            Remission Probability: <span className="font-bold">{result.probability}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Based on DiaRem scoring system for predicting diabetes remission after bariatric surgery. Consult a healthcare professional for clinical decisions.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DiaRemScore;