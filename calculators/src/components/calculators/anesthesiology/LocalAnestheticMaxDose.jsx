import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Syringe, AlertTriangle } from 'lucide-react';

const LocalAnestheticMaxDose = () => {
  const [formData, setFormData] = useState({
    anesthetic: 'lidocaine',
    epinephrine: false,
    weight: '',
  });
  const [result, setResult] = useState(null);

  const anesthetics = [
    { name: 'lidocaine', maxDoseWithoutEpi: 4.5, maxDoseWithEpi: 7 },
    { name: 'bupivacaine', maxDoseWithoutEpi: 2, maxDoseWithEpi: 3 },
    { name: 'ropivacaine', maxDoseWithoutEpi: 3, maxDoseWithEpi: 4 },
    { name: 'mepivacaine', maxDoseWithoutEpi: 4.5, maxDoseWithEpi: 7 },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const calculateMaxDose = () => {
    const weightNum = parseFloat(formData.weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      setResult({ message: 'Please enter a valid weight.' });
      return;
    }

    const anesthetic = anesthetics.find((a) => a.name === formData.anesthetic);
    const maxDosePerKg = formData.epinephrine
      ? anesthetic.maxDoseWithEpi
      : anesthetic.maxDoseWithoutEpi;
    const maxDoseMg = maxDosePerKg * weightNum;
    const maxVolume = {
      '0.5%': (maxDoseMg / 5).toFixed(1),
      '1%': (maxDoseMg / 10).toFixed(1),
      '2%': (maxDoseMg / 20).toFixed(1),
    };

    setResult({
      maxDoseMg: maxDoseMg.toFixed(1),
      maxVolume,
      anesthetic: formData.anesthetic.charAt(0).toUpperCase() + formData.anesthetic.slice(1),
      epinephrine: formData.epinephrine,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-radius shadow-lg p-6 mb-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Syringe className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-card-foreground">Local Anesthetic Maximum Dose Calculator</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Calculate the maximum safe dose of local anesthetic based on patient weight and anesthetic type. Select the anesthetic, indicate if epinephrine is used, and enter the patient’s weight in kilograms.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col space-y-2"
            >
              <label htmlFor="anesthetic" className="text-card-foreground">Anesthetic:</label>
              <select
                id="anesthetic"
                name="anesthetic"
                value={formData.anesthetic}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground px-3 py-2 rounded-radius focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {anesthetics.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name.charAt(0).toUpperCase() + a.name.slice(1)}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.label
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center space-x-2 text-card-foreground"
            >
              <input
                type="checkbox"
                name="epinephrine"
                checked={formData.epinephrine}
                onChange={handleInputChange}
                className="h-5 w-5 text-primary focus:ring-ring border-border rounded"
              />
              <span>With Epinephrine</span>
            </motion.label>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center space-x-2"
            >
              <label htmlFor="weight" className="text-card-foreground">Weight (kg):</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground px-3 py-2 rounded-radius focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter weight in kg"
              />
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={calculateMaxDose}
            className="mt-6 bg-primary text-primary-foreground px-4 py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition"
          >
            Calculate Max Dose
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
                      <strong>Anesthetic:</strong> {result.anesthetic} {result.epinephrine ? 'with Epinephrine' : 'without Epinephrine'}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Maximum Dose:</strong> {result.maxDoseMg} mg
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Maximum Volume:</strong>
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>0.5% solution: {result.maxVolume['0.5%']} mL</li>
                      <li>1% solution: {result.maxVolume['1%']} mL</li>
                      <li>2% solution: {result.maxVolume['2%']} mL</li>
                    </ul>
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
            This calculator provides the maximum safe dose of common local anesthetics based on patient weight and the presence of epinephrine, which can increase the safe dose by reducing systemic absorption.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Maximum Dose Guidelines:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li>Lidocaine: 4.5 mg/kg without epinephrine, 7 mg/kg with epinephrine</li>
            <li>Bupivacaine: 2 mg/kg without epinephrine, 3 mg/kg with epinephrine</li>
            <li>Ropivacaine: 3 mg/kg without epinephrine, 4 mg/kg with epinephrine</li>
            <li>Mepivacaine: 4.5 mg/kg without epinephrine, 7 mg/kg with epinephrine</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Volume Calculations:</strong> The maximum volume is calculated for common concentrations (0.5%, 1%, 2%). For example, 1% lidocaine contains 10 mg/mL, so a 100 mg dose equals 10 mL.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Clinical Considerations:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li>Always verify patient weight and adjust for pediatric or frail patients. Use ideal body weight in obese patients to avoid overdose.</li>
            <li>Epinephrine-containing solutions reduce systemic toxicity but are contraindicated in areas with end-artery circulation (e.g., digits, nose).</li>
            <li>Monitor for signs of local anesthetic systemic toxicity (LAST), including neurological (tinnitus, seizures) and cardiovascular (arrhythmias, hypotension) symptoms.</li>
            <li>Administer doses incrementally and aspirate before injection to avoid intravascular administration.</li>
            <li>Consider patient comorbidities (e.g., liver or renal impairment) that may affect anesthetic metabolism.</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Precautions:</strong> Avoid exceeding the maximum dose to prevent LAST. In emergency settings, have lipid emulsion available for LAST treatment. Consult anesthesia or pharmacology references for complex cases or combination therapies.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LocalAnestheticMaxDose;

