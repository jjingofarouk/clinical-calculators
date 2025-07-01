import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, AlertTriangle } from 'lucide-react';
import { FormControl, TextField, Button } from '@mui/material';

const OsmolalGap = () => {
  const [formData, setFormData] = useState({
    measuredOsmolality: '',
    sodium: '',
    glucose: '',
    bun: '',
    ethanol: '',
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateOsmolalGap = () => {
    const { measuredOsmolality, sodium, glucose, bun, ethanol } = formData;
    const measuredOsmNum = parseFloat(measuredOsmolality);
    const sodiumNum = parseFloat(sodium);
    const glucoseNum = parseFloat(glucose);
    const bunNum = parseFloat(bun);
    const ethanolNum = parseFloat(ethanol) || 0;

    if (
      !measuredOsmolality || isNaN(measuredOsmNum) || measuredOsmNum < 0 ||
      !sodium || isNaN(sodiumNum) || sodiumNum < 0 ||
      !glucose || isNaN(glucoseNum) || glucoseNum < 0 ||
      !bun || isNaN(bunNum) || bunNum < 0
    ) {
      setResult({ message: 'Please complete all required fields with valid values.' });
      return;
    }

    // Calculate calculated osmolality: 2 * Na + (Glucose / 18) + (BUN / 2.8) + (Ethanol / 4.6)
    const calculatedOsm = (2 * sodiumNum) + (glucoseNum / 18) + (bunNum / 2.8) + (ethanolNum / 4.6);

    // Osmolal Gap = Measured Osmolality - Calculated Osmolality
    const osmolalGap = measuredOsmNum - calculatedOsm;

    let interpretation, recommendations;
    if (osmolalGap < 10) {
      interpretation = 'Normal Osmolal Gap';
      recommendations = 'No significant osmolal gap. Consider other causes for clinical symptoms.';
    } else if (osmolalGap >= 10 && osmolalGap < 20) {
      interpretation = 'Mildly Elevated Osmolal Gap';
      recommendations = 'Possible presence of unmeasured osmoles. Consider ethanol, methanol, or ethylene glycol ingestion. Further evaluation needed.';
    } else {
      interpretation = 'Significantly Elevated Osmolal Gap';
      recommendations = 'High likelihood of toxic alcohol ingestion (e.g., methanol, ethylene glycol). Urgent toxicology evaluation and consider antidotes (e.g., fomepizole).';
    }

    setResult({
      osmolalGap: osmolalGap.toFixed(1),
      calculatedOsmolality: calculatedOsm.toFixed(1),
      interpretation,
      recommendations,
    });
  };

  const handleReset = () => {
    setFormData({
      measuredOsmolality: '',
      sodium: '',
      glucose: '',
      bun: '',
      ethanol: '',
    });
    setResult(null);
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
            <Droplet className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-card-foreground">Osmolal Gap Calculator</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            This calculator determines the osmolal gap to evaluate for potential toxic alcohol ingestion or other causes of elevated osmolarity. Enter the required laboratory values below.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TextField
                fullWidth
                label="Measured Osmolality (mOsm/kg)"
                name="measuredOsmolality"
                type="number"
                value={formData.measuredOsmolality}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter measured osmolality"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Typically obtained via serum osmometry.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <TextField
                fullWidth
                label="Sodium (mEq/L)"
                name="sodium"
                type="number"
                value={formData.sodium}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter sodium level"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Primary contributor to calculated osmolality.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <TextField
                fullWidth
                label="Glucose (mg/dL)"
                name="glucose"
                type="number"
                value={formData.glucose}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter glucose level"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Divide by 18 for osmolality contribution.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <TextField
                fullWidth
                label="BUN (mg/dL)"
                name="bun"
                type="number"
                value={formData.bun}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter BUN level"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Divide by 2.8 for osmolality contribution.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <TextField
                fullWidth
                label="Ethanol (mg/dL, optional)"
                name="ethanol"
                type="number"
                value={formData.ethanol}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter ethanol level (if available)"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Divide by 4.6 for osmolality contribution.</p>
            </motion.div>
          </div>

          <div className="flex gap-4 mt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                onClick={calculateOsmolalGap}
                className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                sx={{
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  borderRadius: 'var(--radius)',
                  padding: '8px 16px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'hsl(var(--accent))',
                    color: 'hsl(var(--accent-foreground))',
                  },
                }}
                fullWidth
              >
                Calculate Osmolal Gap
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                onClick={handleReset}
                className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                sx={{
                  backgroundColor: 'hsl(var(--secondary))',
                  color: 'hsl(var(--secondary-foreground))',
                  borderRadius: 'var(--radius)',
                  padding: '8px 16px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'hsl(var(--accent))',
                    color: 'hsl(var(--accent-foreground))',
                  },
                }}
                fullWidth
              >
                Reset
              </Button>
            </motion.div>
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
                {result.message ? (
                  <p className="text-destructive-foreground">{result.message}</p>
                ) : (
                  <>
                    <p className="text-muted-foreground">
                      <strong>Osmolal Gap:</strong> {result.osmolalGap} mOsm/kg
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Calculated Osmolality:</strong> {result.calculatedOsmolality} mOsm/kg
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Interpretation:</strong> {result.interpretation}
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
            The osmolal gap is the difference between measured and calculated serum osmolality, used to detect unmeasured osmoles such as toxic alcohols (e.g., methanol, ethylene glycol).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Calculation:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Calculated Osmolality:</strong> 2 × Sodium (mEq/L) + Glucose (mg/dL) / 18 + BUN (mg/dL) / 2.8 + Ethanol (mg/dL) / 4.6</li>
            <li><strong>Osmolal Gap:</strong> Measured Osmolality - Calculated Osmolality</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Interpretation:</strong>
          </p>
   <ul className="list-disc pl-6 text-muted-foreground mb-4">
  <li><strong>&lt;10 mOsm/kg:</strong> Normal; no significant unmeasured osmoles.</li>
  <li><strong>10–20 mOsm/kg:</strong> Mildly elevated; consider ethanol or early toxic alcohol ingestion.</li>
  <li><strong>&gt;20 mOsm/kg:</strong> Significantly elevated; suspect toxic alcohol ingestion (e.g., methanol, ethylene glycol).</li>
</ul>
          <p className="text-muted-foreground">
            <strong>Clinical Recommendations:</strong> For elevated osmolal gaps, obtain toxic alcohol levels (e.g., methanol, ethylene glycol) and consider anion gap for metabolic acidosis. Initiate fomepizole or ethanol therapy for suspected toxic alcohol ingestion. Consult toxicology or nephrology for hemodialysis in severe cases. Rule out other causes (e.g., ketoacidosis, lactate) for high gaps. Always correlate with clinical presentation and history.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OsmolalGap;