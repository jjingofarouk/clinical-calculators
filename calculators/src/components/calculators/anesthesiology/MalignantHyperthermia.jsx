import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Thermometer } from 'lucide-react';

const MalignantHyperthermia = () => {
  const [formData, setFormData] = useState({
    weight: '',
    suspectedMH: false,
    symptoms: [],
  });
  const [result, setResult] = useState(null);

  const symptomsList = [
    { value: 'hypercapnia', label: 'Hypercapnia (elevated ETCO2)' },
    { value: 'tachycardia', label: 'Tachycardia' },
    { value: 'muscleRigidity', label: 'Generalized muscle rigidity' },
    { value: 'hyperthermia', label: 'Rapidly increasing temperature (>38.8°C)' },
    { value: 'rhabdomyolysis', label: 'Rhabdomyolysis (elevated CK)' },
    { value: 'acidosis', label: 'Metabolic acidosis' },
    { value: 'arrhythmia', label: 'Cardiac arrhythmia' },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        symptoms: checked
          ? [...prev.symptoms, name]
          : prev.symptoms.filter((symptom) => symptom !== name),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const calculateMHTreatment = () => {
    const weightNum = parseFloat(formData.weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      setResult({ message: 'Please enter a valid weight.' });
      return;
    }

    let riskLevel, dantroleneDose, recommendations;
    const symptomCount = formData.symptoms.length;

    if (!formData.suspectedMH || symptomCount < 2) {
      riskLevel = 'Low Suspicion';
      dantroleneDose = 'Not indicated';
      recommendations = 'Monitor closely for MH signs. Avoid triggering agents (e.g., succinylcholine, volatile anesthetics).';
    } else if (symptomCount >= 2 && symptomCount <= 4) {
      riskLevel = 'Moderate Suspicion';
      dantroleneDose = `2.5 mg/kg IV bolus (≈${(2.5 * weightNum).toFixed(1)} mg), repeat every 5–10 min if needed, up to 10 mg/kg.`;
      recommendations = 'Initiate dantrolene, stop triggering agents, hyperventilate with 100% oxygen, and cool patient if hyperthermic.';
    } else {
      riskLevel = 'High Suspicion';
      dantroleneDose = `2.5 mg/kg IV bolus (≈${(2.5 * weightNum).toFixed(1)} mg), repeat every 5–10 min if needed, up to 10 mg/kg.`;
      recommendations = 'Urgent dantrolene administration, stop all triggering agents, hyperventilate with 100% oxygen, cool patient, and treat complications (e.g., acidosis, arrhythmias).';
    }

    setResult({ riskLevel, dantroleneDose, recommendations });
  };

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
            <Thermometer className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-card-foreground">Malignant Hyperthermia (MH) Risk and Treatment Calculator</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            This calculator evaluates the suspicion for malignant hyperthermia (MH) based on clinical symptoms and provides dantrolene dosing recommendations. Enter the patient’s weight and select observed symptoms.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col space-y-2"
            >
              <label className="text-card-foreground">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground px-3 py-2 rounded-radius focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter weight in kg"
              />
            </motion.div>

            <motion.label
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center space-x-2 text-card-foreground"
            >
              <input
                type="checkbox"
                name="suspectedMH"
                checked={formData.suspectedMH}
                onChange={handleCheckboxChange}
                className="h-5 w-5 text-primary focus:ring-ring border-border rounded"
              />
              <span>Suspected Malignant Hyperthermia</span>
            </motion.label>

            <div className="mt-4">
              <h3 className="text-card-foreground font-semibold mb-2">Select Observed Symptoms</h3>
              {symptomsList.map((symptom, index) => (
                <motion.label
                  key={symptom.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-2 text-card-foreground"
                >
                  <input
                    type="checkbox"
                    name={symptom.value}
                    checked={formData.symptoms.includes(symptom.value)}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-primary focus:ring-ring border-border rounded"
                  />
                  <span>{symptom.label}</span>
                </motion.label>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={calculateMHTreatment}
            className="mt-6 bg-primary text-primary-foreground px-4 py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition"
          >
            Calculate MH Risk and Treatment
          </motion.button>

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
                {result.message ? (
                  <p className="text-destructive-foreground">{result.message}</p>
                ) : (
                  <>
                    <p className="text-muted-foreground">
                      <strong>Risk Level:</strong> {result.riskLevel}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Dantrolene Dose:</strong> {result.dantroleneDose}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Recommendations:</strong> {result.recommendations}
                    </p>
                  </>
                )}
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
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Clinical Guidance</h2>
          <p className="text-muted-foreground mb-4">
            Malignant hyperthermia (MH) is a rare, life-threatening condition triggered by certain anesthetics (e.g., succinylcholine, volatile anesthetics like sevoflurane). Early recognition and treatment are critical.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Key Symptoms:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li>Hypercapnia (elevated ETCO2) is often the earliest sign.</li>
            <li>Tachycardia and muscle rigidity (especially masseter spasm) are common.</li>
            <li>Hyperthermia may occur late; a rapid temperature rise (>38.8°C) is concerning.</li>
            <li>Rhabdomyolysis, metabolic acidosis, and arrhythmias indicate severe progression.</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Treatment Protocol:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li>Stop all triggering agents immediately.</li>
            <li>Administer dantrolene 2.5 mg/kg IV bolus, repeating every 5–10 minutes as needed (up to 10 mg/kg).</li>
            <li>Hyperventilate with 100% oxygen at high flow rates.</li> 
            <li>Cool the patient if hyperthermic (e.g., ice packs, cooled IV fluids).</li>
            <li>Treat complications: sodium bicarbonate for acidosis, antiarrhythmics for arrhythmias, and fluids for rhabdomyolysis.</li>
            <li>Consult the Malignant Hyperthermia Association of the United States (MHAUS) hotline: 1-800-644-9737 (US) or +1-315-464-7079 (international).</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Precautions:</strong> Screen patients for MH history or family history. Avoid triggering agents in susceptible patients. Ensure dantrolene is readily available in operating rooms. Transfer confirmed MH cases to an ICU for monitoring post-treatment. Genetic testing (RYR1 mutations) may be considered for confirmed cases.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MalignantHyperthermia;