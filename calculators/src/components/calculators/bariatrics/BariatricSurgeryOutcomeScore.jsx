// BariatricSurgeryOutcomeScore.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Save } from 'lucide-react';

const BariatricSurgeryOutcomeScore = () => {
  const [formData, setFormData] = useState({
    weightLoss: '',
    comorbidityResolution: '',
    qualityOfLife: '',
    complications: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add calculation logic here
  };

  return (
    <motion.div
      className="bg-card p-6 rounded-radius shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <Calculator className="w-6 edits/6/2/1/6f576d8b0b6c3c44e2f28d3d2a8c5c4e.png
6 h-6 text-primary mr-2" />
        <h2 className="text-2xl font-bold text-foreground">Bariatric Surgery Outcome Score</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Weight Loss (%)</label>
          <input
            type="number"
            name="weightLoss"
            value={formData.weightLoss}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter weight loss percentage"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Comorbidity Resolution</label>
          <select
            name="comorbidityResolution"
            value={formData.comorbidityResolution}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Resolution</option>
            <option value="complete">Complete</option>
            <option value="partial">Partial</option>
            <option value="none">None</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Quality of Life Score</label>
          <input
            type="number"
            name="qualityOfLife"
            value={formData.qualityOfLife}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter QoL score"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Complications</label>
          <select
            name="complications"
            value={formData.complications}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Complications</option>
            <option value="none">None</option>
            <option value="minor">Minor</option>
            <option value="major">Major</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center justify-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Calculate Outcome
        </button>
      </form>
    </motion.div>
  );
};

export default BariatricSurgeryOutcomeScore;