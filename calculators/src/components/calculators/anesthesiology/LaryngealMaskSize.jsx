import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Ruler } from 'lucide-react';

const LaryngealMaskSize = () => {
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  const calculateLMA = () => {
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum < 0) {
      setResult({ size: null, message: 'Please enter a valid weight.' });
      return;
    }

    let size, maxVolume, patientGroup;
    if (weightNum < 5) {
      size = '1';
      maxVolume = '4 mL';
      patientGroup = 'Neonates/Infants up to 5 kg';
    } else if (weightNum >= 5 && weightNum < 10) {
      size = '1.5';
      maxVolume = '7 mL';
      patientGroup = 'Infants 5–10 kg';
    } else if (weightNum >= 10 && weightNum < 20) {
      size = '2';
      maxVolume = '10 mL';
      patientGroup = 'Children 10–20 kg';
    } else if (weightNum >= 20 && weightNum < 30) {
      size = '2.5';
      maxVolume = '14 mL';
      patientGroup = 'Children 20–30 kg';
    } else if (weightNum >= 30 && weightNum < 50) {
      size = '3';
      maxVolume = '20 mL';
      patientGroup = 'Children/Small adults 30–50 kg';
    } else if (weightNum >= 50 && weightNum < 70) {
      size = '4';
      maxVolume = '30 mL';
      patientGroup = 'Adults 50–70 kg';
    } else {
      size = '5';
      maxVolume = '40 mL';
      patientGroup = 'Adults over 70 kg';
    }

    setResult({ size, maxVolume, patientGroup });
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
            <Stethoscope className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-card-foreground">Laryngeal Mask Airway (LMA) Size Calculator</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            This calculator determines the appropriate Laryngeal Mask Airway (LMA) size based on patient weight. Enter the patient’s weight in kilograms to get the recommended LMA size and cuff inflation volume.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-2"
            >
              <label htmlFor="weight" className="text-card-foreground">Weight (kg):</label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="border-border bg-background text-foreground px-3 py-2 rounded-radius focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter weight in kg"
              />
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={calculateLMA}
            className="mt-6 bg-primary text-primary-foreground px-4 py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition"
          >
            Calculate LMA Size
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
                  <Ruler className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-secondary-foreground">Results</h2>
                </div>
                {result.message ? (
                  <p className="text-destructive-foreground">{result.message}</p>
                ) : (
                  <>
                    <p className="text-muted-foreground">
                      <strong>LMA Size:</strong> {result.size}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Maximum Cuff Volume:</strong> {result.maxVolume}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Patient Group:</strong> {result.patientGroup}
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
            The Laryngeal Mask Airway (LMA) is a supraglottic airway device used to manage the airway during anesthesia or in emergency settings. Selecting the appropriate LMA size is critical to ensure effective ventilation and minimize complications.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>LMA Size Selection Guidelines:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li>Size 1: Neonates/Infants up to 5 kg (Max cuff volume: 4 mL)</li>
            <li>Size 1.5: Infants 5–10 kg (Max cuff volume: 7 mL)</li>
            <li>Size 2: Children 10–20 kg (Max cuff volume: 10 mL)</li>
            <li>Size 2.5: Children 20–30 kg (Max cuff volume: 14 mL)</li>
            <li>Size 3: Children/Small adults 30–50 kg (Max cuff volume: 20 mL)</li>
            <li>Size 4: Adults 50–70 kg (Max cuff volume: 30 mL)</li>
            <li>Size 5: Adults over 70 kg (Max cuff volume: 40 mL)</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Clinical Considerations:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li>Always confirm the LMA size with the patient’s weight and clinical context. For borderline cases, consider the larger size if clinically appropriate.</li>
            <li>Inflate the cuff with the minimum volume needed to achieve a seal, not exceeding the maximum recommended volume to avoid mucosal injury.</li>
            <li>Ensure proper LMA placement by checking for adequate ventilation, capnography waveform, and absence of gastric insufflation.</li>
            <li>In pediatric patients, weight-based sizing is critical, as anatomical differences can affect fit and function.</li>
            <li>For emergency use, verify LMA size and function promptly to ensure airway patency.</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Contraindications and Precautions:</strong> LMAs are contraindicated in patients with high risk of aspiration (e.g., full stomach, severe GERD), oropharyngeal pathology, or need for high ventilatory pressures. Always assess the patient’s airway anatomy and clinical status before LMA use. Consult anesthesia guidelines or a specialist for complex cases.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LaryngealMaskSize;