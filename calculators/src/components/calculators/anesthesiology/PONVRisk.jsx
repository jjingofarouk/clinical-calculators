import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertTriangle } from 'lucide-react';

const PONVRisk = () => {
  const [formData, setFormData] = useState({
    gender: '',
    smoker: false,
    historyPONV: false,
    opioidUse: false,
    age: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    gender: [
      { value: 'female', label: 'Female' },
      { value: 'male', label: 'Male' },
    ],
    age: { min: 0, max: 120, type: 'integer', label: 'Age (years)' },
  };

  const helperText = {
    gender: 'Female gender is a risk factor for PONV (Apfel Score).',
    smoker: 'Non-smokers are at higher risk for PONV.',
    historyPONV: 'History of PONV or motion sickness increases risk.',
    opioidUse: 'Postoperative opioid use is a risk factor for PONV.',
    age: 'Younger age (<50 years) is associated with higher PONV risk.',
  };

  const handleChange = (field) => (e) => {
    const value = field === 'gender' ? e.target.value : e.target.value;
    setFormData({ ...formData, [field]: value });

    if (field === 'age') {
      if (value === '') {
        setErrors({ ...errors, age: 'Age is required.' });
      } else {
        const numValue = parseInt(value);
        if (isNaN(numValue)) {
          setErrors({ ...errors, age: 'Age must be a number.' });
        } else if (numValue < ranges.age.min || numValue > ranges.age.max) {
          setErrors({ ...errors, age: `Age must be between ${ranges.age.min} and ${ranges.age.max}.` });
        } else if (!Number.isInteger(numValue)) {
          setErrors({ ...errors, age: 'Age must be an integer.' });
        } else {
          setErrors({ ...errors, age: '' });
        }
      }
    }
  };

  const handleCheckboxChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.checked });
  };

  const handleCalculate = () => {
    const newErrors = {};
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    if (formData.age === '') newErrors.age = 'Age is required.';
    else {
      const ageValue = parseInt(formData.age);
      if (isNaN(ageValue) || ageValue < ranges.age.min || ageValue > ranges.age.max) {
        newErrors.age = `Age must be between ${ranges.age.min} and ${ranges.age.max}.`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    let score = 0;
    if (formData.gender === 'female') score += 1;
    if (!formData.smoker) score += 1;
    if (formData.historyPONV) score += 1;
    if (formData.opioidUse) score += 1;

    let riskLevel, riskDescription, riskColor;
    if (score === 0 || score === 1) {
      riskLevel = 'Low Risk';
      riskDescription = 'Low risk of PONV (0–1 risk factors). Consider standard antiemetic prophylaxis.';
      riskColor = 'bg-green-100 text-green-800';
    } else if (score === 2) {
      riskLevel = 'Moderate Risk';
      riskDescription = 'Moderate risk of PONV (2 risk factors). Consider multimodal antiemetic prophylaxis (e.g., ondansetron, dexamethasone).';
      riskColor = 'bg-yellow-100 text-yellow-800';
    } else {
      riskLevel = 'High Risk';
      riskDescription = 'High risk of PONV (3–4 risk factors). Aggressive multimodal prophylaxis and close monitoring recommended.';
      riskColor = 'bg-red-100 text-red-800';
    }

    setResult({ score, riskLevel, riskDescription, riskColor });
  };

  const handleReset = () => {
    setFormData({ gender: '', smoker: false, historyPONV: false, opioidUse: false, age: '' });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <div className="min-h-screen bg-background text-foreground w-full">
      <div className="container mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-radius shadow-lg p-6 mb-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Stethoscope className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-card-foreground">PONV Risk Calculator (Apfel Score)</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            This calculator assesses the risk of postoperative nausea and vomiting (PONV) using the Apfel Score. Select the relevant risk factors and enter the patient’s age to calculate the risk.
          </p>

          <AnimatePresence>
            {hasErrors && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4 p-4 bg-destructive rounded-radius flex items-center"
              >
                <AlertTriangle className="h-5 w-5 text-destructive-foreground mr-2" />
                <span className="text-destructive-foreground">Please correct the errors below before calculating.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col space-y-2"
            >
              <label className="text-card-foreground">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange('gender')}
                className="border-border bg-background text-foreground px-3 py-2 rounded-radius focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Gender</option>
                {ranges.gender.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.gender && <span className="text-destructive-foreground text-sm">{errors.gender}</span>}
              <p className="text-muted-foreground text-sm">{helperText.gender}</p>
            </motion.div>

            <motion.label
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center space-x-2 text-card-foreground"
            >
              <input
                type="checkbox"
                name="smoker"
                checked={formData.smoker}
                onChange={handleCheckboxChange('smoker')}
                className="h-5 w-5 text-primary focus:ring-ring border-border rounded"
              />
              <span>Non-smoker</span>
            </motion.label>
            <p className="text-muted-foreground text-sm">{helperText.smoker}</p>

            <motion.label
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center space-x-2 text-card-foreground"
            >
              <input
                type="checkbox"
                name="historyPONV"
                checked={formData.historyPONV}
                onChange={handleCheckboxChange('historyPONV')}
                className="h-5 w-5 text-primary focus:ring-ring border-border rounded"
              />
              <span>History of PONV or Motion Sickness</span>
            </motion.label>
            <p className="text-muted-foreground text-sm">{helperText.historyPONV}</p>

            <motion.label
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex items-center space-x-2 text-card-foreground"
            >
              <input
                type="checkbox"
                name="opioidUse"
                checked={formData.opioidUse}
                onChange={handleCheckboxChange('opioidUse')}
                className="h-5 w-5 text-primary focus:ring-ring border-border rounded"
              />
              <span>Postoperative Opioid Use</span>
            </motion.label>
            <p className="text-muted-foreground text-sm">{helperText.opioidUse}</p>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex flex-col space-y-2"
            >
              <label className="text-card-foreground">Age (years)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange('age')}
                className="border-border bg-background text-foreground px-3 py-2 rounded-radius focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter age"
              />
              {errors.age && <span className="text-destructive-foreground text-sm">{errors.age}</span>}
              <p className="text-muted-foreground text-sm">{helperText.age}</p>
            </motion.div>
          </div>

          <div className="flex gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCalculate}
              disabled={hasErrors}
              className={`w-full bg-primary text-primary-foreground px-4 py-2 rounded-radius transition ${hasErrors ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              Calculate PONV Risk
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition"
            >
              Reset
            </motion.button>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-4 bg-secondary rounded-radius"
              >
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-secondary-foreground">Results</h2>
                </div>
                <p className="text-muted-foreground">
                  <strong>Apfel Score:</strong> {result.score}
                </p>
                <p className="text-muted-foreground">
                  <strong>Risk Level:</strong> <span className={`p-1 rounded ${result.riskColor}`}>{result.riskLevel}</span>
                </p>
                <p className="text-muted-foreground">
                  <strong>Interpretation:</strong> {result.riskDescription}
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Source:{' '}
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/10475218/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Apfel et al., Anesthesiology 1999;91:693-700
                  </a>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-radius shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Clinical Guidance</hstrong>
            <strong>Apfel Score Overview:</strong> The Apfel Score is a validated tool to predict the risk of postoperative nausea and vomiting (PONV) based on four risk factors: female gender, non-smoker status, history of PONV or motion sickness, and postoperative opioid use. Each factor contributes one point to the score.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Risk Interpretation:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li>Score 0–1: Low risk (~10–20% chance of PONV).</li>
            <li>Score 2: Moderate risk (~40% chance of PONV).</li>
            <li>Score 3–4: High risk (~60–80% chance of PONV).</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Clinical Recommendations:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Low Risk (0–1):</strong> Consider single-agent antiemetic prophylaxis (e.g., ondansetron 4 mg IV).</li>
            <li><strong>Moderate Risk (2):</strong> Use multimodal prophylaxis (e.g., ondansetron 4 mg IV + dexamethasone 4–8 mg IV).</li>
            <li><strong>High Risk (3–4):</strong> Implement aggressive multimodal prophylaxis (e.g., ondansetron, dexamethasone, and additional agents like scopolamine or droperidol) and monitor closely postoperatively.</li>
            <li>Consider non-opioid analgesics to reduce opioid-related PONV risk.</li>
            <li>Evaluate surgical and anesthetic techniques (e.g., regional anesthesia, TIVA with propofol) to minimize PONV.</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Precautions:</strong> Always integrate Apfel Score results with patient-specific factors, such as surgical type and anesthesia plan. High-risk patients may benefit from preoperative consultation with an anesthesiologist. Monitor for PONV symptoms in the postanesthesia care unit (PACU) and adjust treatment as needed.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PONVRisk;