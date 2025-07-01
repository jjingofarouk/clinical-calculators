import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertTriangle } from 'lucide-react';
import { FormControl, FormControlLabel, Checkbox, TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';

const IntubationDifficulty = () => {
  const [formData, setFormData] = useState({
    mallampati: '',
    thyromental: '',
    mouthOpening: '',
    neckMobility: false,
    upperIncisors: false,
    jawProtrusion: false,
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const calculateIntubationDifficulty = () => {
    const { mallampati, thyromental, mouthOpening, neckMobility, upperIncisors, jawProtrusion } = formData;

    if (!mallampati || !thyromental || !mouthOpening) {
      setResult({ message: 'Please complete all required fields.' });
      return;
    }

    let score = 0;
    let riskLevel, recommendations;

    // Mallampati score
    if (mallampati === '3' || mallampati === '4') score += 2;
    else if (mallampati === '2') score += 1;

    // Thyromental distance
    if (thyromental === '<6') score += 2;
    else if (thyromental === '6-6.5') score += 1;

    // Mouth opening
    if (mouthOpening === '<3') score += 2;
    else if (mouthOpening === '3-4') score += 1;

    // Neck mobility
    if (!neckMobility) score += 1;

    // Upper incisors
    if (upperIncisors) score += 1;

    // Jaw protrusion
    if (jawProtrusion) score += 1;

    // Risk assessment
    if (score <= 2) {
      riskLevel = 'Low Risk';
      recommendations = 'Likely straightforward intubation. Standard preparation sufficient.';
    } else if (score <= 5) {
      riskLevel = 'Moderate Risk';
      recommendations = 'Potential for difficult intubation. Prepare alternative airway devices (e.g., video laryngoscope, bougie).';
    } else {
      riskLevel = 'High Risk';
      recommendations = 'High likelihood of difficult intubation. Ensure advanced airway equipment (e.g., fiberoptic scope, cricothyrotomy kit) and consider awake intubation.';
    }

    setResult({ score, riskLevel, recommendations });
  };

  const handleReset = () => {
    setFormData({
      mallampati: '',
      thyromental: '',
      mouthOpening: '',
      neckMobility: false,
      upperIncisors: false,
      jawProtrusion: false,
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
            <Stethoscope className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-card-foreground">Intubation Difficulty Assessment</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            This calculator assesses the risk of difficult intubation using a simplified scoring system based on airway evaluation parameters. Complete the fields below to evaluate the risk.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Mallampati Score</InputLabel>
                <Select
                  name="mallampati"
                  value={formData.mallampati}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Mallampati Score</MenuItem>
                  <MenuItem value="1">Class I (Full visibility of tonsils, uvula, and soft palate)</MenuItem>
                  <MenuItem value="2">Class II (Partial visibility of tonsils, uvula, and soft palate)</MenuItem>
                  <MenuItem value="3">Class III (Soft palate and base of uvula visible)</MenuItem>
                  <MenuItem value="4">Class IV (Only hard palate visible)</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Higher scores indicate increased difficulty.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Thyromental Distance</InputLabel>
                <Select
                  name="thyromental"
                  value={formData.thyromental}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Thyromental Distance</MenuItem>
                  <MenuItem value="<6">&lt;6 cm</MenuItem>
                  <MenuItem value="6-6.5">6–6.5 cm</MenuItem>
                  <MenuItem value=">6.5">&gt;6.5 cm</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Shorter distance suggests difficult intubation.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Mouth Opening</InputLabel>
                <Select
                  name="mouthOpening"
                  value={formData.mouthOpening}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Mouth Opening</MenuItem>
                  <MenuItem value="<3">&lt;3 cm</MenuItem>
                  <MenuItem value="3-4">3–4 cm</MenuItem>
                  <MenuItem value=">4">&gt;4 cm</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Limited mouth opening increases intubation difficulty.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="neckMobility"
                    checked={formData.neckMobility}
                    onChange={handleInputChange}
                    className="text-primary focus:ring-ring border-border"
                    sx={{
                      color: 'hsl(var(--border))',
                      '&.Mui-checked': { color: 'hsl(var(--primary))' },
                    }}
                  />
                }
                label="Normal Neck Mobility"
                className="text-card-foreground"
              />
              <p className="text-muted-foreground text-sm mt-1">Restricted neck mobility increases difficulty.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="upperIncisors"
                    checked={formData.upperIncisors}
                    onChange={handleInputChange}
                    className="text-primary focus:ring-ring border-border"
                    sx={{
                      color: 'hsl(var(--border))',
                      '&.Mui-checked': { color: 'hsl(var(--primary))' },
                    }}
                  />
                }
                label="Prominent Upper Incisors"
                className="text-card-foreground"
              />
              <p className="text-muted-foreground text-sm mt-1">Prominent incisors may obstruct laryngoscope view.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="jawProtrusion"
                    checked={formData.jawProtrusion}
                    onChange={handleInputChange}
                    className="text-primary focus:ring-ring border-border"
                    sx={{
                      color: 'hsl(var(--border))',
                      '&.Mui-checked': { color: 'hsl(var(--primary))' },
                    }}
                  />
                }
                label="Limited Jaw Protrusion"
                className="text-card-foreground"
              />
              <p className="text-muted-foreground text-sm mt-1">Inability to protrude jaw complicates alignment.</p>
            </motion.div>
          </div>

          <div className="flex gap-4 mt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button
                onClick={calculateIntubationDifficulty}
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
                Calculate Intubation Difficulty
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
                      <strong>Score:</strong> {result.score}
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Risk Level:</strong> {result.riskLevel}
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
            This calculator assesses the risk of difficult intubation using a simplified scoring system based on common airway evaluation parameters. It is inspired by tools like the Modified Mallampati and LEMON assessment.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Evaluation Parameters:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Mallampati Score:</strong> Assesses visibility of oropharyngeal structures. Class III–IV indicates higher risk.</li>
            <li><strong>Thyromental Distance:</strong> Measures from thyroid notch to mentum. &lt;6 cm suggests difficulty.</li>
            <li><strong>Mouth Opening:</strong> &lt;3 cm limits laryngoscope insertion.</li>
            <li><strong>Neck Mobility:</strong> Restricted extension or flexion complicates alignment.</li>
            <li><strong>Upper Incisors:</strong> Prominent incisors obstruct visualization.</li>
            <li><strong>Jaw Protrusion:</strong> Inability to protrude the mandible hinders airway alignment.</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Risk Interpretation:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Score 0–2:</strong> Low risk; standard intubation techniques likely sufficient.</li>
            <li><strong>Score 3–5:</strong> Moderate risk; prepare for potential difficulty with backup devices.</li>
            <li><strong>Score >5:</strong> High risk; anticipate significant challenges and consider advanced techniques.</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Clinical Recommendations:</strong> For moderate to high-risk patients, ensure availability of advanced airway tools (e.g., video laryngoscope, bougie, fiberoptic scope). Consider awake intubation for high-risk cases. Always have a surgical airway kit (e.g., cricothyrotomy) available. Perform a thorough preoperative airway assessment and involve an experienced anesthesiologist for high-risk cases.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default IntubationDifficulty;
