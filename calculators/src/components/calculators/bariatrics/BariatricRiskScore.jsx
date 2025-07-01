// BariatricRiskScore.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Save } from 'lucide-react';

const BariatricRiskScore = () => {
  const [formData, setFormData] = useState({
    age: '',
    bmi: '',
    comorbidities: '',
    procedureType: '',
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
        <Calculator className="w-6 h-6 text-primary mr-2"

/>
        <h2 className="text-2xl font-bold text-foreground">Bariatric Risk Score</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter age"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">BMI</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter BMI"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Comorbidities</label>
          <select
            name="comorbidities"
            value={formData.comorbidities}
            onChange={handleChange}
            className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Comorbidities</option>
            <option value="0">None</option>
            <option value="1-2">1-2</option>
            <option value="3+">3 or more</option>
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
            <option value="">Select Procedure</option>
            <option value="gastric-bypass">Gastric Bypass</option>
            <option value="sleeve-gastrectomy">Sleeve Gastrectomy</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center justify-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Calculate Risk Score
        </button>
      </form>
    </motion.div>
  );
};

export default BariatricRiskScore;