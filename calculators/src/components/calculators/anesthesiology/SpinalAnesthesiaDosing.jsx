import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Syringe, AlertTriangle } from 'lucide-react';

const SpinalAnesthesiaDosing = () => {
  const [formData, setFormData] = useState({
    anesthetic: 'bupivacaine',
    procedure: '',
    weight: '',
    height: '',
    duration: '',
  });
  const [result, setResult] = useState(null);

  const anesthetics = [
    { name: 'bupivacaine', label: 'Bupivacaine 0.5% (isobaric or hyperbaric)' },
    { name: 'ropivacaine', label: 'Ropivacaine 0.5%' },
    { name: 'lidocaine', label: 'Lidocaine 2%' },
  ];

  const procedures = [
    { value: 'lowerLimb', label: 'Lower Limb Surgery (e.g., knee, ankle)' },
    { value: 'hip', label: 'Hip Surgery' },
    { value: 'lowerAbdominal', label: 'Lower Abdominal Surgery (e.g., herniaiamasoidectomy)' },
    { value: 'cesarean', label: 'Cesarean Section' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateDose = () => {
    const weightNum = parseFloat(formData.weight);
    const heightNum = parseFloat(formData.height);
    const durationNum = parseFloat(formData.duration);

    if (isNaN(weightNum) || weightNum <= 0 || isNaN(heightNum) || heightNum <= 0 || !formData.anesthetic || !formData.procedure) {
      setResult({ message: 'Please enter valid weight, height, anesthetic, and procedure.' });
      return;
    }

    let dose, level, notes;
    const anesthetic = formData.anesthetic;
    const procedure = formData.procedure;

    // Bupivacaine dosing
    if (anesthetic === 'bupivacaine') {
      if (procedure === 'lowerLimb') {
        dose = weightNum <= 70 ? '10–15 mg (2–3 mL)' : '15–20 mg (3–4 mL)';
        level = 'T10–T12';
        notes = 'Adjust for shorter duration (1–2 hours) with lower doses.';
      } else if (procedure === 'hip') {
        dose = '12–18 mg (2.4–3.6 mL)';
        level = 'T8–T10';
        notes = 'Higher doses for larger patients or prolonged surgery.';
      } else if (procedure === 'lowerAbdominal') {
        dose = '15–20 mg (3–4 mL)';
        level = 'T6–T8';
        notes = 'Consider hyperbaric bupivacaine for better spread.';
      } else if (procedure === 'cesarean') {
        dose = '10–12 mg (2–2.4 mL)';
        level = 'T4–T6';
        notes = 'Hyperbaric bupivacaine preferred for cesarean sections.';
      }
    }
    // Ropivacaine dosing
    else if (anesthetic === 'ropivacaine') {
      if (procedure === 'lowerLimb') {
        dose = '15–20 mg (3–4 mL)';
        level = 'T10–T12';
        notes = 'Lower potency than bupivacaine; may require higher volume.';
      } else if (procedure === 'hip') {
        dose = '18–25 mg (3.6–5 mL)';
        level = 'T8–T10';
        notes = 'Adjust volume based on patient size and duration.';
      } else if (procedure === 'lowerAbdominal') {
        dose = '20–25 mg (4–5 mL)';
        level = 'T6–T8';
        notes = 'Ensure adequate spread for abdominal procedures.';
      } else if (procedure === 'cesarean') {
        dose = '15–20 mg (3–4 mL)';
        level = 'T4–T6';
        notes = 'Consider adjuvants (e.g., fentanyl) for enhanced effect.';
      }
    }
    // Lidocaine dosing
    else if (anesthetic === 'lidocaine') {
      if (procedure === 'lowerLimb') {
        dose = '50–75 mg (2.5–3.75 mL)';
        level = 'T10–T12';
        notes = 'Shorter duration (1–1.5 hours); suitable for brief procedures.';
      } else if (procedure === 'hip') {
        dose = '75–100 mg (3.75–5 mL)';
        level = 'T8–T10';
        notes = 'Higher doses for larger patients; monitor for toxicity.';
      } else if (procedure === 'lowerAbdominal') {
        dose = '100–125 mg (5–6.25 mL)';
        level = 'T6–T8';
        notes = 'Use with caution due to shorter duration.';
      } else if (procedure === 'cesarean') {
        dose = '75–100 mg (3.75–5 mL)';
        level = 'T4–T6';
        notes = 'Not commonly used for cesarean due to short duration.';
      }
    }

    // Adjust dose based on duration
    const durationAdjustment = durationNum > 2 ? 'Consider adjuvants (e.g., epinephrine, clonidine) for prolonged effect.' : '';
    notes = durationAdjustment ? `${notes} ${durationAdjustment}` : notes;

    setResult({ dose, level, notes });
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
            <Syringe className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-card-foreground">Spinal Anesthesia Dosing Calculator</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Calculate the appropriate spinal anesthetic dose based on the procedure, patient weight, height, and desired duration. Select the anesthetic and procedure, then enter the patient’s weight, height, and duration.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col space-y-2"
            >
              <label className="text-card-foreground">Anesthetic</label>
              <select
                name="anesthetic"
                value={formData.anesthetic}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground px-3 py-2 rounded-radius focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Anesthetic</option>
                {anesthetics.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.label}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col space-y-2"
            >
              <label className="text-card-foreground">Procedure</label>
              <select
                name="procedure"
                value={formData.procedure}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground px-3 py-2 rounded-radius focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Procedure</option>
                {procedures.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
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

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex flex-col space-y-2"
            >
              <label className="text-card-foreground">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground px-3 py-2 rounded-radius focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter height in cm"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex flex-col space-y-2"
            >
              <label className="text-card-foreground">Desired Duration (hours)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground px-3 py-2 rounded-radius focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter duration in hours"
              />
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={calculateDose}
            className="mt-6 bg-primary text-primary-foreground px-4 py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition"
          >
            Calculate Dose
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
                      <strong>Anesthetic:</strong> {formData.anesthetic.charAt(0).toUpperCase() + formData.anesthetic.slice(1)}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Recommended Dose:</strong> {result.dose}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Dermatomal Level:</strong> {result.level}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Notes:</strong> {result.notes}
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
            Spinal anesthesia dosing depends on the surgical procedure, patient characteristics (weight and height), and desired duration of anesthesia. This calculator provides general dosing guidelines for common spinal anesthetics.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Dosing Considerations:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Bupivacaine:</strong> Commonly used due to its long duration (2–4 hours). Hyperbaric bupivacaine is preferred for procedures requiring higher dermatomal levels (e.g., cesarean sections).</li>
            <li><strong>Ropivacaine:</strong> Less cardiotoxic than bupivacaine but may require slightly higher doses due to lower potency.</li>
            <li><strong>Lidocaine:</strong> Suitable for short procedures (1–1.5 hours) but less common due to risk of transient neurological symptoms (TNS).</li>
            <li><strong>Weight and Height:</strong> Heavier or taller patients may require higher doses to achieve adequate spread. Adjust doses cautiously to avoid excessive cephalad spread.</li>
            <li><strong>Duration:</strong> For prolonged procedures (>2 hours), consider adding adjuvants like epinephrine (0.2–0.5 mg) or clonidine (15–150 µg) to extend the effect.</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Procedure-Specific Notes:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Lower Limb Surgery:</strong> Targets T10–T12 levels; lower doses suffice for peripheral procedures.</li>
            <li><strong>Hip Surgery:</strong> Requires T8–T10 levels; intermediate doses are typical.</li>
            <li><strong>Lower Abdominal Surgery:</strong> Targets T6–T8; higher doses or hyperbaric solutions ensure adequate spread.</li>
            <li><strong>Cesarean Section:</strong> Targets T4–T6; hyperbaric bupivacaine with opioids (e.g., fentanyl 10–25 µg) is standard.</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Precautions:</strong> Always verify patient allergies and contraindications (e.g., coagulopathy, infection at injection site). Monitor for complications such as hypotension, bradycardia, or high spinal block. Use ultrasound or landmarks for accurate needle placement. Consult anesthesia guidelines for complex cases or high-risk patients.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SpinalAnesthesiaDosing;