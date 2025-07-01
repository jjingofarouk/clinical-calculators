// MBSAQIPRiskCalculator.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Save } from 'lucide-react';

const MBSAQIPRiskCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    bmi: '',
    gender: '',
    procedure: '',
    asaClass: '',
    diabetes: '',
    hypertension: '',
    sleepApnea: '',
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
        <h2 className="text-2xl font-bold text-foreground">MBSAQIP Risk Calculator</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium text-foreground mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Procedure</label>
            <select
              name="procedure"
              value={formData.procedure}
              onChange={handleChange}
              className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select Procedure</option>
              <option value="gastric-bypass">Gastric Bypass</option>
              <option value="sleeve-gastrectomy">Sleeve Gastrectomy</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">ASA Class</label>
            <select
              name="asaClass"
              value={formData.asaClass}
              onChange={handleChange}
              className="w-full p-2 rounded-radius border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select ASA Class</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="diabetes"
              checked={formData.diabetes}
              onChange={(e) => setFormData({ ...formData, diabetes: e.target.checked })}
              className="rounded border-border text-primary focus:ring-ring"
            />
            <span className="text-sm text-foreground">Diabetes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hypertension"
              checked={formData.hypertension}
              onChange={(e) => setFormData({ ...formData, hypertension: e.target.checked })}
              className="rounded border-border text-primary focus:ring-ring"
            />
            <span className="text-sm text-foreground">Hypertension</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="sleepApnea"
              checked={formData.sleepApnea}
              onChange={(e) => setFormData({ ...formData, sleepApnea: e.target.checked })}
              className="rounded border-border text-primary focus:ring-ring"
            />
            <span className="text-sm text-foreground">Sleep Apnea</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition-all duration-200 flex items-center justify-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Calculate Risk
        </button>
      </form>
    </motion.div>
  );
};

export default MBSAQIPRiskCalculator;