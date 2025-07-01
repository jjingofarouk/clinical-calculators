// DiaRemScore.jsx
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
        <Calculator className="w-6 h-6 text-primary mr-2" />
        <h2 className="text-2xl font-bold text-foreground">DiaRem Score</h2>
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
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center justify-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Calculate DiaRem Score
        </button>
      </form>
    </motion.div>
  );
};

export default DiaRemScore;