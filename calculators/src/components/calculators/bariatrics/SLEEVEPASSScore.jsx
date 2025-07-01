import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Save } from 'lucide-react';

const SLEEVEPASSScore = () => {
  const [formData, setFormData] = useState({
    age: '',
    bmi: '',
    diabetes: '',
    osa: '',
    hypertension: '',
    heartDisease: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setResult(null);
  };

  const calculateSLEEVEPASS = () => {
    const { age, bmi, diabetes, osa, hypertension, heartDisease } = formData;

    if (!age || !bmi || !diabetes || !osa || !hypertension || !heartDisease) {
      return { error: 'Please fill in all fields' };
    }

    const ageNum = parseFloat(age);
    const bmiNum = parseFloat(bmi);

    if (isNaN(ageNum) || isNaN(bmiNum)) {
      return { error: 'Please enter valid numbers for age and BMI' };
    }

    if (ageNum < 0 || ageNum > 120) return { error: 'Age must be between 0 and 120' };
    if (bmiNum < 10 || bmiNum > 100) return { error: 'BMI must be between 10 and 100' };

    let score = 0;

    // SLEEVE PASS scoring (based on PubMed:28161887)
    if (ageNum >= 65) score += 1;
    if (bmiNum >= 50) score += 1;
    if (diabetes === 'yes') score += 1;
    if (osa === 'yes') score += 1;
    if (hypertension === 'yes') score += 1;
    if (heartDisease === 'yes') score += 1;

    // Complication risk
    let risk = '';
    if (score <= 1) risk = 'Low (<2%)';
    else if (score <= 3) risk = 'Moderate (2-5%)';
    else risk = 'High (>5%)';

    return { score, risk };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateSLEEVEPASS();
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
        <h2 className="text-2xl font-bold text-foreground">SLEEVE PASS Score Calculator</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Predict complication risk after sleeve gastrectomy.
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
          <label className="block text-sm font-medium text-foreground mb-1">Obstructive Sleep Apnea</label>
          <select
            name="osa"
            value={formData.osa}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select OSA</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
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
          <label className="block text-sm font-medium text-foreground mb-1">Heart Disease</label>
          <select
            name="heartDisease"
            value={formData.heartDisease}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Heart Disease</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center justify-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Calculate SLEEVE PASS Score
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
            SLEEVE PASS Score: <span className="font-bold">{result.score}</span>
          </p>
          <p className="text-sm text-foreground">
            Complication Risk: <span className="font-bold">{result.risk}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Based on SLEEVE PASS scoring system. Consult a healthcare professional for clinical decisions.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SLEEVEPASSScore;