import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Divider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Info } from 'lucide-react';

const AnionGap = () => {
  const [inputs, setInputs] = useState({
    sodium: '',
    chloride: '',
    bicarbonate: '',
    albumin: '',
  });
  const [anionGap, setAnionGap] = useState(null);
  const [correctedAnionGap, setCorrectedAnionGap] = useState(null);
  const [interpretation, setInterpretation] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setError('');
  };

  const calculateAnionGap = () => {
    const { sodium, chloride, bicarbonate, albumin } = inputs;

    // Validate inputs
    if (!sodium || !chloride || !bicarbonate) {
      setError('Please fill in Sodium, Chloride, and Bicarbonate fields with valid numbers.');
      return;
    }

    const parsedSodium = parseFloat(sodium);
    const parsedChloride = parseFloat(chloride);
    const parsedBicarbonate = parseFloat(bicarbonate);
    const parsedAlbumin = albumin ? parseFloat(albumin) : 4.0; // Default albumin to 4.0 g/dL if not provided

    if (
      isNaN(parsedSodium) ||
      isNaN(parsedChloride) ||
      isNaN(parsedBicarbonate) ||
      parsedSodium < 100 || parsedSodium > 150 ||
      parsedChloride < 70 || parsedChloride > 120 ||
      parsedBicarbonate < 10 || parsedBicarbonate > 40 ||
      (albumin && (isNaN(parsedAlbumin) || parsedAlbumin < 1 || parsedAlbumin > 6))
    ) {
      setError('Invalid input values. Ensure Sodium (100-150 mmol/L), Chloride (70-120 mmol/L), Bicarbonate (10-40 mmol/L), Albumin (1-6 g/dL).');
      return;
    }

    // Calculate Anion Gap: AG = Na - (Cl + HCO3)
    const ag = parsedSodium - (parsedChloride + parsedBicarbonate);
    setAnionGap(ag.toFixed(1));

    // Calculate Corrected Anion Gap if albumin is provided
    let correctedAg = ag;
    if (albumin) {
      correctedAg = ag + ((4.0 - parsedAlbumin) * 2.5); // Adjust for hypoalbuminemia
      setCorrectedAnionGap(correctedAg.toFixed(1));
    } else {
      setCorrectedAnionGap(null);
    }

    // Interpretation
    let interp = '';
    if (ag > 12) {
      interp = 'Elevated anion gap, suggestive of anion gap metabolic acidosis. Consider causes such as lactic acidosis, ketoacidosis, or toxic ingestions.';
    } else if (ag < 8) {
      interp = 'Low anion gap, possibly due to hypoalbuminemia, lithium intoxication, or laboratory error. Further evaluation is warranted.';
    } else {
      interp = 'Normal anion gap (8-12 mmol/L). Consider non-anion gap metabolic acidosis or other acid-base disorders if clinically indicated.';
    }
    setInterpretation(interp);
  };

  const resetCalculator = () => {
    setInputs({
      sodium: '',
      chloride: '',
      bicarbonate: '',
      albumin: '',
    });
    setAnionGap(null);
    setCorrectedAnionGap(null);
    setInterpretation('');
    setError('');
  };

  const inputFields = [
    { name: 'sodium', label: 'Sodium (Na⁺, mmol/L)', placeholder: 'e.g., 140' },
    { name: 'chloride', label: 'Chloride (Cl⁻, mmol/L)', placeholder: 'e.g., 100' },
    { name: 'bicarbonate', label: 'Bicarbonate (HCO₃⁻, mmol/L)', placeholder: 'e.g., 24' },
    { name: 'albumin', label: 'Albumin (g/dL, optional)', placeholder: 'e.g., 4.0' },
  ];

  return (
    <Box sx={{ p: 4, width: '100vw', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#1a3c34', fontWeight: 'bold' }}>
          Anion Gap Calculator
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: '#4a4a4a', maxWidth: '1200px', mx: 'auto' }}>
          The Anion Gap Calculator evaluates acid-base status by calculating the difference between measured cations and anions in serum. It aids in diagnosing metabolic acidosis and identifying underlying causes.
        </Typography>
      </motion.div>

      <Paper elevation={3} sx={{ p: 3, bgcolor: '#ffffff', borderRadius: 2, maxWidth: '1200px', mx: 'auto' }}>
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
          <Typography variant="body2" sx={{ color: '#d32f2f', mt: 2, maxWidth: '1200px', mx: 'auto' }}>
            {error}
          </Typography>
        </motion.div>
      )}

      <Box sx={{ mt: 3, display: 'flex', gap: 2, maxWidth: '1200px', mx: 'auto' }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            onClick={calculateAnionGap}
            sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1a3c34' }, color: '#ffffff' }}
          >
            Calculate Anion Gap
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outlined"
            onClick={resetCalculator}
            sx={{ borderColor: '#2e7d32', color: '#2e7d32', '&:hover':Stencil { borderColor: '#1a3c34', color: '#1a3c34' } }}
          >
            Reset
          </Button>
        </motion.div>
      </Box>

      <AnimatePresence>
        {anionGap !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            sx={{ mt: 3 }}
          >
            <Paper elevation={2} sx={{ p: 3, bgcolor: '#ffffff', borderRadius: 2, maxWidth: '1200px', mx: 'auto' }}>
              <Typography variant="h6" sx={{ color: '#1a3c34', mb: 1 }}>
                Results
              </Typography>
              <Typography variant="body1" sx={{ color: '#4a4a4a' }}>
                Anion Gap: <strong>{anionGap} mmol/L</strong>
              </Typography>
              {correctedAnionGap && (
                <Typography variant="body1" sx={{ color: '#4a4a4a', mt: 1 }}>
                  Corrected Anion Gap (for albumin): <strong>{correctedAnionGap} mmol/L</strong>
                </Typography>
              )}
              <Typography variant="body2" sx={{ color: '#4a4a4a', mt: 1 }}>
                Interpretation: {interpretation}
              </Typography>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      <Box sx={{ mt: 4, maxWidth: '1200px', mx: 'auto' }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: '#1a3c34', mb: 2 }}>
          <Info size={20} style={{ marginRight: 8, color: '#2e7d32' }} />
          Clinical Guidance
        </Typography>
        <Typography variant="body2" sx={{ color: '#4a4a4a', lineHeight: 1.6 }}>
          The Anion Gap (AG) is calculated as AG = Na⁺ − (Cl⁻ + HCO₃⁻) and is used to assess acid-base disorders. A normal AG is typically 8-12 mmol/L without albumin correction. Hypoalbuminemia lowers the AG, and for every 1 g/dL decrease in albumin below 4.0 g/dL, the AG should be corrected by adding 2.5 mmol/L. Key considerations:
          <ul>
            <li><strong>Elevated AG (>12 mmol/L)</strong>: Suggests anion gap metabolic acidosis, potentially due to lactic acidosis (e.g., sepsis, shock), ketoacidosis (e.g., diabetic, alcoholic), or toxic ingestions (e.g., methanol, ethylene glycol).</li>
            <li><strong>Normal AG (8-12 mmol/L)</strong>: May indicate non-anion gap metabolic acidosis (e.g., hyperchloremic acidosis from diarrhea or renal tubular acidosis).</li>
            <li><strong>Low AG (<8 mmol/L)</strong>: Rare, often due to hypoalbuminemia, lithium intoxication, or laboratory error.</li>
            <li><strong>Albumin Correction</strong>: Adjust AG for hypoalbuminemia to avoid underestimating acid-base disturbances.</li>
          </ul>
          Always interpret the AG in conjunction with clinical history, physical exam, and other laboratory findings (e.g., arterial blood gas, lactate levels). Further diagnostic workup may include evaluating for MUDPILES (Methanol, Uremia, Diabetic ketoacidosis, Paraldehyde, Iron/Isoniazid, Lactic acidosis, Ethylene glycol, Salicylates) for high AG acidosis. Consult institutional protocols for management of acid-base disorders.
        </Typography>
        <Typography variant="h6" sx={{ color: '#1a3c34', mt: 3, mb: 1 }}>
          References
        </Typography>
        <Typography variant="body2" sx={{ color: '#4a4a4a', lineHeight: 1.6 }}>
          <ul>
            <li>Kamel, K. S., & Halperin, M. L. (2023). Anion Gap. In StatPearls. StatPearls Publishing. <a href="https://www.ncbi.nlm.nih.gov/books/NBK539757/">https://www.ncbi.nlm.nih.gov/books/NBK539757/</a></li>
            <li>ScienceDirect. (n.d.). Anion Gap. <a href="https://www.sciencedirect.com/topics/medicine-and-dentistry/anion-gap">https://www.sciencedirect.com/topics/medicine-and-dentistry/anion-gap</a></li>
          </ul>
        </Typography>
      </Box>
    </Box>
  );
};

export default AnionGap;