import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Save } from 'lucide-react';

const PostDischargeVTECalculator = () => {
  const [formData, setFormData] = useState({
    bmi: '',
    procedureType: '',
    historyVTE: '',
    operativeTime: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setResult(null);
  };

  const calculateVTERisk = () => {
    const { bmi, procedureType, historyVTE, operativeTime } = formData;

    if (!bmi || !procedureType || !historyVTE || !operativeTime) {
      return { error: 'Please fill in all fields' };
    }

    const bmiNum = parseFloat(bmi);
    const operativeTimeNum = parseFloat(operativeTime);

    if (isNaN(bmiNum) || isNaN(operativeTimeNum)) {
      return { error: 'Please enter valid numbers for BMI and operative time' };
    }

    if (bmiNum < 10 || bmiNum > 100) return { error: 'BMI must be between 10 and 100' };
    if (operativeTimeNum < 0 || operativeTimeNum > 600) return { error: 'Operative time must be between 0 and 600 minutes' };

    let score = 0;

    // Scoring based on PubMed:27823607
    if (bmiNum >= 50) score += 2;
    if (procedureType === 'open') score += 2;
    if (historyVTE === 'yes') score += 3;
    if (operativeTimeNum >= 180) score += 1;

    // VTE risk
    let risk = '';
    if (score <= 1) risk = 'Low (<1%)';
    else if (score <= 3) risk = 'Moderate (1-3%)';
    else risk = 'High (>3%)';

    return { score, risk };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateVTERisk();
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
        <h2 className="text-2xl font-bold text-foreground">Post-Discharge VTE Risk Calculator</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Assess risk of venous thromboembolism after bariatric surgery.
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
          <label className="block text-sm font-medium text-foreground mb-1">Procedure Type</label>
          <select
            name="procedureType"
            value={formData.procedureType}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Procedure Type</option>
            <option value="laparoscopic">Laparoscopic</option>
            <option value="open">Open</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">History of VTE</label>
          <select
            name="historyVTE"
            value={formData.historyVTE}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select VTE History</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Operative Time (minutes)</label>
          <input
            type="number"
            name="operativeTime"
            value={formData.operativeTime}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter operative time"
            min="0"
            max="600"
            step="1"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center justify-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Calculate VTE Risk
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
            VTE Risk Score: <span className="font-bold">{result.score}</span>
          </p>
          <p className="text-sm text-foreground">
            VTE Risk: <span className="font-bold">{result.risk}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Based on post-discharge VTE risk assessment tool. Consult a healthcare professional for clinical decisions.[](https://riskcalc.org/RiskOfPostDischargeVenousThromboembolismAfterBariatricSurgery/)
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PostDischargeVTECalculator;