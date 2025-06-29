import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Info } from 'lucide-react';

const BispectralIndex = () => {
  const [bis, setBis] = useState(60);

  const handleBisChange = (event) => {
    setBis(event.target.value);
  };

  const getBisInterpretation = (value) => {
    if (value > 90) return 'Fully awake, no sedation';
    if (value >= 80) return 'Light sedation, responsive to verbal stimuli';
    if (value >= 60) return 'Moderate sedation, suitable for general anesthesia';
    if (value >= 40) return 'Deep anesthesia, unconscious';
    if (value >= 20) return 'Very deep anesthesia, risk of burst suppression';
    return 'Profound suppression, high risk of adverse effects';
  };

  const getBisColor = (value) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-blue-500';
    if (value >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <main className="container">
      <motion.div
        className="card max-w-full mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-6 h-6 text-teal-600" />
          <h1 className="header">Bispectral Index (BIS) Monitor</h1>
        </div>
        <p className="text-gray-700 mb-6">
          The Bispectral Index (BIS) monitors depth of anesthesia using EEG analysis, providing a score from 0 (deep suppression) to 100 (fully awake). A BIS range of 40-60 is optimal for general anesthesia, minimizing risks of intraoperative awareness or over-sedation.
        </p>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">BIS Value: {bis}</label>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={bis}
            onChange={handleBisChange}
            className="w-full h-2 rounded-lg cursor-pointer"
            style={{ accentColor: getBisColor(bis).replace('bg-', '') }}
          />
          <AnimatePresence>
            <motion.p
              key={bis}
              className={`text-sm mt-2 ${getBisColor(bis)} text-white p-2 rounded`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Interpretation: {getBisInterpretation(bis)}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="card p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-semibold text-teal-600">BIS Range Guide</h2>
          </div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>90-100: Fully awake</li>
            <li>80-90: Light sedation</li>
            <li>60-80: Moderate sedation (general anesthesia target)</li>
            <li>40-60: Deep anesthesia</li>
            <li>20-40: Very deep anesthesia (risk of burst suppression)</li>
            <li>0-20: Profound suppression</li>
          </ul>
        </div>
        <p className="text-xs text-gray-500">
          <strong>Source:</strong> Sigl JC, Chamoun NG. Anesth Analg 1994;79(6):1150-8<br />
          <strong>References:</strong><br />
          - Gan TJ, et al. Anesthesiology 1997;87(4):808-15<br />
          - Avidan MS, et al. N Engl J Med 2011;364(12):1095-105<br />
          - <a href="https://resources.wfsahq.org/atotw/bispectral-index-monitoring-and-intraoperative-awareness/" className="text-teal-600 hover:underline">WFSA Resource</a>
        </p>
      </motion.div>
    </main>
  );
};

export default BispectralIndex;