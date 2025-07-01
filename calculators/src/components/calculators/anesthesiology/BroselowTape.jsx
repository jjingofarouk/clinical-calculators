import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertTriangle } from 'lucide-react';
import { FormControl, TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';

const BroselowTape = () => {
  const [formData, setFormData] = useState({
    length: '',
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateBroselow = () => {
    const lengthNum = parseFloat(formData.length);

    if (!formData.length || isNaN(lengthNum) || lengthNum < 46 || lengthNum > 146.7) {
      setResult({ message: 'Please enter a valid length between 46 cm and 146.7 cm.' });
      return;
    }

    const broselowData = [
      { color: 'Gray', lengthMin: 46, lengthMax: 59.6, weight: 3, etTube: '3.0 uncuffed', epi: '0.3 mg', defib: '6 J', fluids: '60 mL' },
      { color: 'Pink', lengthMin: 59.7, lengthMax: 67.7, weight: 5, etTube: '3.5 uncuffed', epi: '0.5 mg', defib: '10 J', fluids: '100 mL' },
      { color: 'Red', lengthMin: 67.8, lengthMax: 75.7, weight: 7, etTube: '3.5 uncuffed', epi: '0.7 mg', defib: '14 J', fluids: '140 mL' },
      { color: 'Purple', lengthMin: 75.8, lengthMax: 85.7, weight: 9, etTube: '4.0 uncuffed', epi: '0.9 mg', defib: '18 J', fluids: '180 mL' },
      { color: 'Yellow', lengthMin: 85.8, lengthMax: 97.7, weight: 12, etTube: '4.5 uncuffed', epi: '1.2 mg', defib: '24 J', fluids: '240 mL' },
      { color: 'White', lengthMin: 97.8, lengthMax: 109.7, weight: 15, etTube: '5.0 uncuffed', epi: '1.5 mg', defib: '30 J', fluids: '300 mL' },
      { color: 'Blue', lengthMin: 109.8, lengthMax: 121.7, weight: 19, etTube: '5.5 cuffed', epi: '1.9 mg', defib: '38 J', fluids: '380 mL' },
      { color: 'Orange', lengthMin: 121.8, lengthMax: 133.7, weight: 24, etTube: '6.0 cuffed', epi: '2.4 mg', defib: '48 J', fluids: '480 mL' },
      { color: 'Green', lengthMin: 133.8, lengthMax: 146.7, weight: 30, etTube: '6.5 cuffed', epi: '3.0 mg', defib: '60 J', fluids: '600 mL' },
    ];

    const zone = broselowData.find((zone) => lengthNum >= zone.lengthMin && lengthNum <= zone.lengthMax);

    if (!zone) {
      setResult({ message: 'Length out of Broselow Tape range.' });
      return;
    }

    setResult({
      color: zone.color,
      estimatedWeight: zone.weight,
      etTube: zone.etTube,
      epinephrine: zone.epi,
      defibrillation: zone.defib,
      fluidBolus: zone.fluids,
    });
  };

  const handleReset = () => {
    setFormData({ length: '' });
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
            <Stethoscope className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-card-foreground">Broselow Tape Calculator</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            This calculator uses the Broselow Tape system to estimate pediatric weight and provide emergency dosing recommendations based on length. Enter the child’s length (46–146.7 cm).
          </p>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TextField
                fullWidth
                label="Length (cm)"
                name="length"
                type="number"
                value={formData.length}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter length in cm (46–146.7)"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Measure length from head to heel (supine).</p>
            </motion.div>
          </div>

          <div className="flex gap-4 mt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                onClick={calculateBroselow}
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
                Calculate Broselow Parameters
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
                      <strong>Broselow Color Zone:</strong> {result.color}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Estimated Weight:</strong> {result.estimatedWeight} kg
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Endotracheal Tube Size:</strong> {result.etTube}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Epinephrine (1:10,000):</strong> {result.epinephrine}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Defibrillation Energy:</strong> {result.defibrillation}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Fluid Bolus (20 mL/kg):</strong> {result.fluidBolus}
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
            The Broselow Tape is a length-based tool for pediatric emergency care, providing estimated weight and dosing recommendations for resuscitation drugs and equipment sizes.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Key Parameters:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Length:</strong> Measured head to heel (supine), ranging from 46 cm to 146.7 cm.</li>
            <li><strong>Color Zones:</strong> Correspond to weight ranges and guide medication doses and equipment sizes.</li>
            <li><strong>Applications:</strong> Endotracheal tube size, epinephrine dose (1:10,000), defibrillation energy, and fluid bolus (20 mL/kg).</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Recommendations:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li>Use actual Broselow Tape in emergencies for quick reference.</li>
            <li>Verify length measurement to ensure accurate color zone selection.</li>
            <li>Confirm equipment sizes (e.g., ET tube) and drug doses before administration.</li>
            <li>Adjust fluid bolus based on clinical condition (e.g., dehydration, shock).</li>
            <li>Follow PALS (Pediatric Advanced Life Support) guidelines for resuscitation.</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Precautions:</strong> The Broselow Tape is less accurate in obese children or those outside the length range. Always cross-check with clinical judgment and actual weight if available. Ensure emergency equipment (e.g., defibrillator, airway tools) is prepared based on the color zone. Consult pediatric protocols for complex cases.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BroselowTape;