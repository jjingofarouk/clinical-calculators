import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, AlertTriangle } from 'lucide-react';
import { FormControl, TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';

const PulsePressureVariation = () => {
  const [formData, setFormData] = useState({
    ppMax: '',
    ppMin: '',
    ventilationStatus: '',
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculatePPV = () => {
    const { ppMax, ppMin, ventilationStatus } = formData;
    const ppMaxNum = parseFloat(ppMax);
    const ppMinNum = parseFloat(ppMin);

    if (
      !ppMax || isNaN(ppMaxNum) || ppMaxNum <= 0 ||
      !ppMin || isNaN(ppMinNum) || ppMinNum <= 0 ||
      !ventilationStatus
    ) {
      setResult({ message: 'Please complete all required fields with valid values.' });
      return;
    }

    if (ventilationStatus !== 'mechanicallyVentilated') {
      setResult({ message: 'PPV is only valid for mechanically ventilated patients with controlled tidal volumes.' });
      return;
    }

    // PPV = ((PPmax - PPmin) / ((PPmax + PPmin) / 2)) * 100
    const ppMean = (ppMaxNum + ppMinNum) / 2;
    const ppv = ((ppMaxNum - ppMinNum) / ppMean) * 100;

    let fluidResponsiveness, recommendations;
    if (ppv < 13) {
      fluidResponsiveness = 'Unlikely Fluid Responsive';
      recommendations = 'Patient is unlikely to benefit from fluid administration. Optimize current therapy and monitor hemodynamic parameters.';
    } else if (ppv >= 13 && ppv <= 15) {
      fluidResponsiveness = 'Possibly Fluid Responsive';
      recommendations = 'Patient may benefit from fluid administration. Consider a fluid challenge and monitor response with hemodynamic parameters.';
    } else {
      fluidResponsiveness = 'Likely Fluid Responsive';
      recommendations = 'Patient is likely to benefit from fluid administration. Administer a fluid challenge (e.g., 250–500 mL crystalloid) and reassess PPV or other dynamic parameters.';
    }

    setResult({
      ppv: ppv.toFixed(1),
      fluidResponsiveness,
      recommendations,
    });
  };

  const handleReset = () => {
    setFormData({
      ppMax: '',
      ppMin: '',
      ventilationStatus: '',
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
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-card-foreground">Pulse Pressure Variation (PPV) Calculator</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            This calculator computes Pulse Pressure Variation (PPV) to assess fluid responsiveness in mechanically ventilated patients. Enter the required hemodynamic and ventilation parameters.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TextField
                fullWidth
                label="Maximum Pulse Pressure (mmHg)"
                name="ppMax"
                type="number"
                value={formData.ppMax}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter PPmax"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Maximum pulse pressure during respiratory cycle (from arterial line).</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <TextField
                fullWidth
                label="Minimum Pulse Pressure (mmHg)"
                name="ppMin"
                type="number"
                value={formData.ppMin}
                onChange={handleInputChange}
                className="border-border bg-background text-foreground"
                placeholder="Enter PPmin"
                sx={{
                  '& .MuiInputBase-input': { padding: '8px 12px' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                }}
              />
              <p className="text-muted-foreground text-sm mt-1">Minimum pulse pressure during respiratory cycle (from arterial line).</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Ventilation Status</InputLabel>
                <Select
                  name="ventilationStatus"
                  value={formData.ventilationStatus}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Ventilation Status</MenuItem>
                  <MenuItem value="mechanicallyVentilated">Mechanically Ventilated</MenuItem>
                  <MenuItem value="spontaneouslyBreathing">Spontaneously Breathing</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">PPV is valid only for mechanically ventilated patients.</p>
              </FormControl>
            </motion.div>
          </div>

          <div className="flex gap-4 mt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                onClick={calculatePPV}
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
                Calculate PPV
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
                      <strong>Pulse Pressure Variation:</strong> {result.ppv}%
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Fluid Responsiveness:</strong> {result.fluidResponsiveness}
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
            Pulse Pressure Variation (PPV) is a dynamic parameter used to assess fluid responsiveness in mechanically ventilated patients, particularly in critical care settings.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Calculation:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>PPV:</strong> ((PPmax - PPmin) / ((PPmax + PPmin) / 2)) × 100</li>
            <li><strong>Requirements:</strong> Patient must be mechanically ventilated with controlled tidal volume (8–10 mL/kg), no spontaneous breathing, and arterial line monitoring.</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Interpretation:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>PPV <13%:</strong> Unlikely fluid responsive; avoid unnecessary fluids.</li>
            <li><strong>PPV 13–15%:</strong> Possibly fluid responsive; consider fluid challenge.</li>
            <li><strong>PPV >15%:</strong> Likely fluid responsive; fluid administration recommended.</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Clinical Recommendations:</strong> For PPV >13%, perform a fluid challenge (e.g., 250–500 mL crystalloid over 10–15 minutes) and monitor response via PPV, cardiac output, or other hemodynamic parameters. Ensure patient is in sinus rhythm, mechanically ventilated with adequate tidal volume, and monitored via arterial line. Avoid PPV use in patients with arrhythmias, spontaneous breathing, or low tidal volumes. Correlate with other clinical data (e.g., lactate, urine output) and consult critical care specialists for complex cases.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PulsePressureVariation;