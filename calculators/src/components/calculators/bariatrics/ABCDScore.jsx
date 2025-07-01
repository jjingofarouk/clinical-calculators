import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Save } from 'lucide-react';

const ABCDScore = () => {
  const [formData, setFormData] = useState({
    age: '',
    bmi: '',
    cPeptide: '',
    diabetesDuration: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setResult(null);
  };

  const calculateABCDScore = () => {
    const { age, bmi, cPeptide, diabetesDuration } = formData;

    // Input validation
    if (!age || !bmi || !cPeptide || !diabetesDuration) {
      return { error: 'Please fill in all fields' };
    }

    const ageNum = parseFloat(age);
    const bmiNum = parseFloat(bmi);
    const cPeptideNum = parseFloat(cPeptide);
    const diabetesDurationNum = parseFloat(diabetesDuration);

    if (isNaN(ageNum) || isNaN(bmiNum) || isNaN(cPeptideNum) || isNaN(diabetesDurationNum)) {
      return { error: 'Please enter valid numbers' };
    }

    if (ageNum < 0 || ageNum > 120) return { error: 'Age must be between 0 and 120' };
    if (bmiNum < 10 || bmiNum > 60) return { error: 'BMI must be between 10 and 60' };
    if (cPeptideNum < 0 || cPeptideNum > 10) return { error: 'C-Peptide must be between 0 and 10 ng/mL' };
    if (diabetesDurationNum < 0 || diabetesDurationNum > 50) return { error: 'Diabetes duration must be between 0 and 50 years' };

    // ABCD Score calculation based on modified scoring system
    let score = 0;

    // Age scoring (based on PubMed:37985569 and ResearchGate)
    if (ageNum < 50) score += 3;
    else if (ageNum < 60) score += 2;
    else if (ageNum < 70) score += 1;

    // BMI scoring
    if (bmiNum >= 30) score += 2;
    else if (bmiNum >= 27) score += 1;

    // C-Peptide scoring
    if (cPeptideNum >= 2.0) score += 2;
    else if (cPeptideNum >= 1.0) score += 1;

    // Diabetes duration scoring
    if (diabetesDurationNum < 5) score += 2;
    else if (diabetesDurationNum < 10) score += 1;

    // Remission probability based on score (ResearchGate table)
    let probability = '';
    if (score >= 8) probability = 'High (>80%)';
    else if (score >= 6) probability = 'Moderate (50-80%)';
    else if (score >= 4) probability = 'Low (20-50%)';
    else probability = 'Very Low (<20%)';

    return { score, probability };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateABCDScore();
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
        <h2 className="text-2xl font-bold text-foreground">ABCD Score Calculator</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Calculate diabetes remission probability after bariatric surgery based on the ABCD score.
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
            max="60"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">C-Peptide (ng/mL)</label>
          <input
            type="number"
            name="cPeptide"
            value={formData.cPeptide}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter C-Peptide level"
            min="0"
            max="10"
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
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center justify-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Calculate ABCD Score
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
            ABCD Score: <span className="font-bold">{result.score}</span>
          </p>
          <p className="text-sm text-foreground">
            Remission Probability: <span className="font-bold">{result.probability}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Based on modified ABCD scoring system for predicting diabetes remission after bariatric surgery.
            Consult a healthcare professional for clinical decisions.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ABCDScore;