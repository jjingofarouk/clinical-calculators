import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Divider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Info } from 'lucide-react';

const AlveolarGasEquation = () => {
  const [inputs, setInputs] = useState({
    fio2: '',
    patm: '',
    ph2o: '',
    paco2: '',
    rq: '',
  });
  const [pao2, setPao2] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setError('');
  };

  const calculatePao2 = () => {
    const { fio2, patm, ph2o, paco2, rq } = inputs;
    
    // Validate inputs
    if (!fio2 || !patm || !ph2o || !paco2 || !rq) {
      setError('Please fill in all fields with valid numbers.');
      return;
    }

    const parsedFio2 = parseFloat(fio2);
    const parsedPatm = parseFloat(patm);
    const parsedPh2o = parseFloat(ph2o);
    const parsedPaco2 = parseFloat(paco2);
    const parsedRq = parseFloat(rq);

    if (
      isNaN(parsedFio2) ||
      isNaN(parsedPatm) ||
      isNaN(parsedPh2o) ||
      isNaN(parsedPaco2) ||
      isNaN(parsedRq) ||
      parsedFio2 < 0.21 || parsedFio2 > 1.0 ||
      parsedPatm < 500 || parsedPatm > 800 ||
      parsedPh2o < 0 || parsedPh2o > 100 ||
      parsedPaco2 < 0 || parsedPaco2 > 100 ||
      parsedRq < 0.7 || parsedRq > 1.0
    ) {
      setError('Invalid input values. Ensure FiO2 (0.21-1.0), Patm (500-800 mmHg), PH2O (0-100 mmHg), PaCO2 (0-100 mmHg), RQ (0.7-1.0).');
      return;
    }

    // Alveolar Gas Equation: PAO2 = (FiO2 * (Patm - PH2O)) - (PaCO2 / RQ)
    const pao2 = (parsedFio2 * (parsedPatm - parsedPh2o)) - (parsedPaco2 / parsedRq);
    setPao2(pao2.toFixed(2));
  };

  const resetCalculator = () => {
    setInputs({
      fio2: '',
      patm: '',
      ph2o: '',
      paco2: '',
      rq: '',
    });
    setPao2(null);
    setError('');
  };

  const inputFields = [
    { name: 'fio2', label: 'FiO2 (Fraction of Inspired Oxygen, 0.21-1.0)', placeholder: 'e.g., 0.21' },
    { name: 'patm', label: 'Patm (Atmospheric Pressure, mmHg)', placeholder: 'e.g., 760' },
    { name: 'ph2o', label: 'PH2O (Water Vapor Pressure, mmHg)', placeholder: 'e.g., 47' },
    { name: 'paco2', label: 'PaCO2 (Arterial CO2 Pressure, mmHg)', placeholder: 'e.g., 40' },
    { name: 'rq', label: 'RQ (Respiratory Quotient, 0.7-1.0)', placeholder: 'e.g., 0.8' },
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto', bgcolor: '#f5f5f5' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#1a3c34', fontWeight: 'bold' }}>
          Alveolar Gas Equation Calculator
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: '#4a4a4a' }}>
          The Alveolar Gas Equation calculates the partial pressure of oxygen in the alveoli (PAO2), which is critical for assessing oxygenation in clinical settings such as anesthesia, critical care, and respiratory therapy.
        </Typography>
      </motion.div>

      <Paper elevation={3} sx={{ p: 3, bgcolor: '#ffffff', borderRadius: 2 }}>
        {inputFields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <TextField
              fullWidth
              label={field.label}
              name={field.name}
              value={inputs[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              type="number"
              sx={{ mb: 2, '& .MuiInputLabel-root': { color: '#1a3c34' }, '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#2e7d32' } } }}
              InputProps={{ style: { color: '#4a4a4a' } }}
            />
            {index < inputFields.length - 1 && <Divider sx={{ my: 2, bgcolor: '#e0e0e0' }} />}
          </motion.div>
        ))}
      </Paper>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <Typography variant="body2" sx={{ color: '#d32f2f', mt: 2 }}>
            {error}
          </Typography>
        </motion.div>
      )}

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            onClick={calculatePao2}
            sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1a3c34' }, color: '#ffffff' }}
          >
            Calculate PAO2
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outlined"
            onClick={resetCalculator}
            sx={{ borderColor: '#2e7d32', color: '#2e7d32', '&:hover': { borderColor: '#1a3c34', color: '#1a3c34' } }}
          >
            Reset
          </Button>
        </motion.div>
      </Box>

      <AnimatePresence>
        {pao2 !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            sx={{ mt: 3 }}
          >
            <Paper elevation={2} sx={{ p: 3, bgcolor: '#ffffff', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ color: '#1a3c34', mb: 1 }}>
                Results
              </Typography>
              <Typography variant="body1" sx={{ color: '#4a4a4a' }}>
                Alveolar Oxygen Partial Pressure (PAO2): <strong>{pao2} mmHg</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: '#4a4a4a', mt: 1 }}>
                Interpretation: Normal PAO2 varies with altitude and FiO2. At sea level (Patm ≈ 760 mmHg, FiO2 = 0.21), PAO2 is typically ~100 mmHg. Values significantly lower may indicate impaired gas exchange.
              </Typography>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: '#1a3c34', mb: 2 }}>
          <Info size={20} style={{ marginRight: 8, color: '#2e7d32' }} />
          Clinical Guidance
        </Typography>
        <Typography variant="body2" sx={{ color: '#4a4a4a', lineHeight: 1.6 }}>
          The Alveolar Gas Equation (PAO2 = [FiO2 × (Patm − PH2O)] − [PaCO2 / RQ]) estimates the partial pressure of oxygen in the alveoli, a key determinant of arterial oxygenation. It is used to evaluate gas exchange efficiency in conditions such as acute respiratory distress syndrome (ARDS), pulmonary edema, or chronic obstructive pulmonary disease (COPD). Key considerations:
          <ul>
            <li><strong>FiO2</strong>: Fraction of inspired oxygen (0.21 for room air, up to 1.0 for supplemental oxygen).</li>
            <li><strong>Patm</strong>: Atmospheric pressure, typically 760 mmHg at sea level, decreases with altitude.</li>
            <li><strong>PH2O</strong>: Water vapor pressure, approximately 47 mmHg at body temperature (37°C).</li>
            <li><strong>PaCO2</strong>: Arterial CO2 pressure, typically 35-45 mmHg in healthy individuals.</li>
            <li><strong>RQ</strong>: Respiratory quotient, usually 0.8 (carbohydrate metabolism) but can range from 0.7 (fat metabolism) to 1.0 (carbohydrate metabolism).</li>
          </ul>
          Use this calculator to assess the A-a gradient (PAO2 − PaO2) for diagnosing causes of hypoxemia. Always interpret results in the context of clinical findings, patient condition, and environmental factors such as altitude. Consult institutional protocols for oxygen therapy and ventilatory support adjustments.
        </Typography>
        <Typography variant="h6" sx={{ color: '#1a3c34', mt: 3, mb: 1 }}>
          References
        </Typography>
        <Typography variant="body2" sx={{ color: '#4a4a4a', lineHeight: 1.6 }}>
          <ul>
            <li>Sarkar, M., et al. (2023). Alveolar Gas Equation. In StatPearls. StatPearls Publishing. <a href="https://www.ncbi.nlm.nih.gov/books/NBK482268/">https://www.ncbi.nlm.nih.gov/books/NBK482268/</a></li>
            <li>ScienceDirect. (n.d.). Alveolar Gas Equation. <a href="https://www.sciencedirect.com/topics/neuroscience/alveolar-gas-equation">https://www.sciencedirect.com/topics/neuroscience/alveolar-gas-equation</a></li>
            <li>McCanny, P., & Gleeson, A. (2017). Oxygen therapy and delivery devices. BJA Education, 17(3), 88-93. <a href="https://www.bjaed.org/article/S1472-2615(17)30007-9/fulltext">https://www.bjaed.org/article/S1472-2615(17)30007-9/fulltext</a></li>
            <li>Deranged Physiology. (n.d.). The Alveolar Gas Equation. <a href="https://derangedphysiology.com/main/cicm-primary-exam/respiratory-system/Chapter-134/alveolar-gas-equation">https://derangedphysiology.com/main/cicm-primary-exam/respiratory-system/Chapter-134/alveolar-gas-equation</a></li>
          </ul>
        </Typography>
      </Box>
    </Box>
  );
};

export default AlveolarGasEquation;