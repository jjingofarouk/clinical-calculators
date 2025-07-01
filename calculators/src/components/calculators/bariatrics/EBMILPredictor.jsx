import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Save } from 'lucide-react';

const EBMILPredictor = () => {
  const [formData, setFormData] = useState({
    initialBMI: '',
    height: '',
    procedureType: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setResult(null);
  };

  const calculateEBMIL = () => {
    const { initialBMI, height, procedureType } = formData;

    if (!initialBMI || !height || !procedureType) {
      return { error: 'Please fill in all fields' };
    }

    const bmiNum = parseFloat(initialBMI);
    const heightNum = parseFloat(height);

    if (isNaN(bmiNum) || isNaN(heightNum)) {
      return { error: 'Please enter valid numbers for BMI and height' };
    }

    if (bmiNum < 10 || bmiNum > 100) return { error: 'BMI must be between 10 and 100' };
    if (heightNum < 100 || heightNum > 250) return { error: 'Height must be between 100 and 250 cm' };

    // EBMIL calculation (approximated from web:19)
    const idealBMI = 25; // Standard ideal BMI
    const initialWeight = bmiNum * (heightNum / 100) ** 2;
    let ebmil = 0;

    if (procedureType === 'SG') {
      ebmil = ((bmiNum - idealBMI) * 0.6) / (bmiNum - idealBMI) * 100;
    } else {
      ebmil = ((bmiNum - idealBMI) * 0.8) / (bmiNum - idealBMI) * 100;
    }

    ebmil = Math.round(ebmil);

    return { ebmil };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateEBMIL();
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
        <h2 className="text-2xl font-bold text-foreground">EBMIL Predictor</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Predict excess BMI loss after bariatric surgery.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Initial BMI (kg/m²)</label>
          <input
            type="number"
            name="initialBMI"
            value={formData.initialBMI}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter initial BMI"
            min="10"
            max="100"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter height"
            min="100"
            max="250"
            step="1"
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
          Calculate EBMIL
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
            Expected EBMIL: <span className="font-bold">{result.ebmil}%</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Based on estimated excess BMI loss prediction. Consult a healthcare professional for clinical decisions.[](https://renewbariatrics.com/bariatric-surgery-weight-loss-calculator/)
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EBMILPredictor;