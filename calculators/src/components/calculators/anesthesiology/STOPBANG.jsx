import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertTriangle } from 'lucide-react';

const STOPBANG = () => {
  const [formData, setFormData] = useState({
    snoring: false,
    tired: false,
    observedApnea: false,
    pressure: false,
    bmi: false,
    age: false,
    neck: false,
    gender: false,
  });
  const [score, setScore] = useState(null);
  const [risk, setRisk] = useState(null);

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const calculateSTOPBANG = () => {
    const score = Object.values(formData).filter(Boolean).length;
    setScore(score);

    let riskLevel, riskDescription;
    if (score <= 2) {
      riskLevel = 'Low Risk';
      riskDescription = 'Low likelihood of moderate to severe OSA.';
    } else if (score >= 3 && score <= 4) {
      riskLevel = 'Intermediate Risk';
      riskDescription = 'Moderate likelihood of OSA; consider further evaluation.';
    } else {
      riskLevel = 'High Risk';
      riskDescription = 'High likelihood of moderate to severe OSA; recommend sleep study.';
    }
    setRisk({ level: riskLevel, description: riskDescription });
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
            <h1 className="text-2xl font-bold text-card-foreground">STOP-BANG Calculator</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            The STOP-BANG questionnaire screens for obstructive sleep apnea (OSA) risk in patients. Answer the following questions to calculate the risk score.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {[
              { name: 'snoring', label: 'Snoring: Do you snore loudly (louder than talking or loud enough to be heard through closed doors)?' },
              { name: 'tired', label: 'Tired: Do you often feel tired, fatigued, or sleepy during the daytime?' },
              { name: 'observedApnea', label: 'Observed Apnea: Has anyone observed you stop breathing during your sleep?' },
              { name: 'pressure', label: 'Pressure: Do you have or are you being treated for high blood pressure?' },
              { name: 'bmi', label: 'BMI: Is your Body Mass Index (BMI) more than 35 kg/m²?' },
              { name: 'age', label: 'Age: Are you older than 50 years?' },
              { name: 'neck', label: 'Neck: Is your neck circumference greater than 40 cm (15.7 inches)?' },
              { name: 'gender', label: 'Gender: Are you male?' },
            ].map((factor, index) => (
              <motion.label
                key={factor.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center space-x-2 text-card-foreground"
              >
                <input
                  type="checkbox"
                  name={factor.name}
                  checked={formData[factor.name]}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-primary focus:ring-ring border-border rounded"
                />
                <span>{factor.label}</span>
              </motion.label>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={calculateSTOPBANG}
            className="mt-6 bg-primary text-primary-foreground px-4 py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition"
          >
            Calculate STOP-BANG
          </motion.button>

          <AnimatePresence>
            {score !== null && risk && (
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
                  <strong>STOP-BANG Score:</strong> {score}
                </p>
                <p className="text-muted-foreground">
                  <strong>Risk Level:</strong> {risk.level}
                </p>
                <p className="text-muted-foreground">
                  <strong>Description:</strong> {risk.description}
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
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Clinical Guidance</h2>
          <p className="text-muted-foreground mb-4">
            The STOP-BANG questionnaire is a validated screening tool for assessing the risk of obstructive sleep apnea (OSA) in patients, particularly in preoperative settings. Each question contributes one point to the total score, with higher scores indicating greater risk.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Snoring:</strong> Loud snoring is a common symptom of OSA, often reported by bed partners.</li>
            <li><strong>Tired:</strong> Daytime fatigue or sleepiness may indicate poor sleep quality due to OSA.</li>
            <li><strong>Observed Apnea:</strong> Witnessed apneas are a strong indicator of OSA and should prompt further evaluation.</li>
            <li><strong>Pressure:</strong> Hypertension is associated with OSA, as sleep apnea can exacerbate blood pressure issues.</li>
            <li><strong>BMI:</strong> A BMI >35 kg/m² is a significant risk factor for OSA due to increased airway obstruction.</li>
            <li><strong>Age:</strong> Patients over 50 years are at higher risk for OSA due to age-related changes in airway anatomy.</li>
            <li><strong>Neck:</strong> A neck circumference >40 cm is associated with increased soft tissue around the airway.</li>
            <li><strong>Gender:</strong> Males are at higher risk for OSA, though females can also be affected.</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Risk Interpretation:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li>Score 0–2: Low risk of moderate to severe OSA.</li>
            <li>Score 3–4: Intermediate risk; consider clinical correlation and possible sleep study.</li>
            <li>Score 5–8: High risk; strongly recommend polysomnography for confirmation.</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Clinical Recommendations:</strong> Patients with intermediate to high risk (score ≥3) should be considered for further evaluation, including a sleep study or referral to a sleep specialist. For surgical patients, high-risk individuals may require preoperative optimization, such as CPAP therapy, to reduce perioperative complications. Always interpret STOP-BANG results in the context of the patient’s overall clinical presentation and medical history.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default STOPBANG;