import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Save } from 'lucide-react';

const DiaBetterScore = () => {
  const [formData, setFormData] = useState({
    hba1c: '',
    diabetesDuration: '',
    medications: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setResult(null);
  };

  const calculateDiaBetterScore = () => {
    const { hba1c, diabetesDuration, medications } = formData;

    if (!hba1c || !diabetesDuration || !medications) {
      return { error: 'Please fill in all fields' };
    }

    const hba1cNum = parseFloat(hba1c);
    const durationNum = parseFloat(diabetesDuration);

    if (isNaN(hba1cNum) || isNaN(durationNum)) {
      return { error: 'Please enter valid numbers for HbA1c and duration' };
    }

    if (hba1cNum < 0 || hba1cNum > 20) return { error: 'HbA1c must be between 0 and 20%' };
    if (durationNum < 0 || durationNum > 50) return { error: 'Diabetes duration must be between 0 and 50 years' };

    let score = 0;

    // HbA1c scoring (based on PubMed:28008543)
    if (hba1cNum < 7.0) score += 0;
    else if (hba1cNum < 8.0) score += 1;
    else score += 2;

    // Diabetes duration
    if (durationNum < 4) score += 0;
    else if (durationNum < 8) score += 1;
    else score += 2;

    // Medications
    if (medications === 'none') score += 0;
    else if (medications === 'oral') score += 1;
    else if (medications === 'insulin') score += 2;

    // Remission probability
    let probability = '';
    if (score <= 1) probability = 'High (>70%)';
    else if (score <= 3) probability = 'Moderate (40-70%)';
    else probability = 'Low (<40%)';

    return { score, probability };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateDiaBetterScore();
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
        <h2 className="text-2xl font-bold text-foreground">DiaBetter Score Calculator</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Predict diabetes remission probability after bariatric surgery.
      </p>
      <div className="space-y-4">
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
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Diabetes Duration (years)</label>
          <input
            type="number"
            name="diabetesDuration"
            value={formData.diabetesDuration}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter duration"
            min="0"
            max="50"
            step="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Medications</label>
          <select
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Medications</option>
            <option value="none">None</option>
            <option value="oral">Oral</option>
            <option value="insulin">Insulin</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center justify-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Calculate DiaBetter Score
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
            DiaBetter Score: <span className="font-bold">{result.score}</span>
          </p>
          <p className="text-sm text-foreground">
            Remission Probability: <span className="font-bold">{result.probability}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Based on DiaBetter scoring system. Consult a healthcare professional for clinical decisions.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DiaBetterScore;