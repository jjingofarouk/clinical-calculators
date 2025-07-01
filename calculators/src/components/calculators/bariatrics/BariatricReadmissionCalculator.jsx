import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Save } from 'lucide-react';

const BariatricReadmissionCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    bmi: '',
    diabetes: '',
    hypertension: '',
    procedureType: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setResult(null);
  };

  const calculateReadmissionRisk = () => {
    const { age, bmi, diabetes, hypertension, procedureType } = formData;

    if (!age || !bmi || !diabetes || !hypertension || !procedureType) {
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

    // Readmission scoring (approximated from MBSAQIP data)
    if (ageNum >= 60) score += 1;
    if (bmiNum >= 50) score += 1;
    if (diabetes === 'yes') score += 1;
    if (hypertension === 'yes') score += 1;
    if (procedureType === 'RYGB') score += 1;

    // Readmission risk
    let risk = '';
    if (score <= 1) risk = 'Low (<5%)';
    else if (score <= 3) risk = 'Moderate (5-10%)';
    else risk = 'High (>10%)';

    return { score, risk };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateReadmissionRisk();
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
        <h2 className="text-2xl font-bold text-foreground">Bariatric Readmission Calculator</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Predict readmission risk after bariatric surgery.
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
          <label className="block text-sm font-medium text-foreground mb-1">Procedure Type</label>
          <select
            name="procedureType"
            value={formData.procedureType}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Procedure Type</option>
            <option value="SG">Sleeve Gastrectomy</option>
            <option value="RYGB">Roux-en-Y Gastric Bypass</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center justify-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Calculate Readmission Risk
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
            Readmission Risk Score: <span className="font-bold">{result.score}</span>
          </p>
          <p className="text-sm text-foreground">
            Readmission Risk: <span className="font-bold">{result.risk}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Based on MBSAQIP data for readmission risk assessment. Consult a healthcare professional for clinical decisions.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BariatricReadmissionCalculator;