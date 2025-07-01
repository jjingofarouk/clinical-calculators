import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertTriangle } from 'lucide-react';
import { FormControl, FormControlLabel, Checkbox, Button, Select, MenuItem, InputLabel } from '@mui/material';

const WilsonScore = () => {
  const [formData, setFormData] = useState({
    mallampati: '',
    thyromental: '',
    mouthOpening: '',
    neckExtension: '',
    bodyWeight: '',
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateWilsonScore = () => {
    const { mallampati, thyromental, mouthOpening, neckExtension, bodyWeight } = formData;

    if (!mallampati || !thyromental || !mouthOpening || !neckExtension || !bodyWeight) {
      setResult({ message: 'Please complete all required fields.' });
      return;
    }

    let score = 0;
    let riskLevel, recommendations;

    // Mallampati score
    if (mallampati === '3-4') score += 2;
    else if (mallampati === '2') score += 1;

    // Thyromental distance
    if (thyromental === '<6') score += 2;
    else if (thyromental === '6-6.5') score += 1;

    // Mouth opening
    if (mouthOpening === '<3.5') score += 2;
    else if (mouthOpening === '3.5-4') score += 1;

    // Neck extension
    if (neckExtension === 'limited') score += 2;
    else if (neckExtension === 'moderate') score += 1;

    // Body weight
    if (bodyWeight === '>90') score += 2;
    else if (bodyWeight === '70-90') score += 1;

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
      neckExtension: '',
      bodyWeight: '',
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
            <h1 className="text-2xl font-bold text-card-foreground">Wilson Score for Difficult Intubation</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            This calculator uses the Wilson Score to assess the risk of difficult intubation based on airway evaluation parameters. Complete the fields below to evaluate the risk.
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
                  <MenuItem value="1">Class I (Full visibility)</MenuItem>
                  <MenuItem value="2">Class II (Partial visibility)</MenuItem>
                  <MenuItem value="3-4">Class III–IV (Limited or no visibility)</MenuItem>
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
                  <MenuItem value="&lt;3.5">&lt;3.5 cm</MenuItem>
                  <MenuItem value="3.5-4">3.5–4 cm</MenuItem>
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
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Neck Extension</InputLabel>
                <Select
                  name="neckExtension"
                  value={formData.neckExtension}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Neck Extension</MenuItem>
                  <MenuItem value="normal">Normal (>35°)</MenuItem>
                  <MenuItem value="moderate">Moderate (20–35°)</MenuItem>
                  <MenuItem value="limited">Limited (<20°)</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Restricted neck extension complicates airway alignment.</p>
              </FormControl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <FormControl fullWidth className="bg-background">
                <InputLabel className="text-card-foreground">Body Weight</InputLabel>
                <Select
                  name="bodyWeight"
                  value={formData.bodyWeight}
                  onChange={handleInputChange}
                  className="border-border bg-background text-foreground rounded-radius"
                  sx={{
                    '& .MuiSelect-select': { padding: '8px 12px' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--border))' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'hsl(var(--ring))' },
                  }}
                >
                  <MenuItem value="">Select Body Weight</MenuItem>
                  <MenuItem value="<70"><70 kg</MenuItem>
                  <MenuItem value="70-90">70–90 kg</MenuItem>
                  <MenuItem value=">90">>90 kg</MenuItem>
                </Select>
                <p className="text-muted-foreground text-sm mt-1">Higher body weight may increase intubation difficulty.</p>
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
                onClick={calculateWilsonScore}
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
                Calculate Wilson Score
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
                      <strong>Wilson Score:</strong> {result.score}
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
            The Wilson Score is a validated tool to predict the risk of difficult tracheal intubation based on five risk factors. Each factor is scored to assess airway management challenges.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Risk Factors:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li><strong>Mallampati Score:</strong> Class III–IV (limited/no visibility) indicates higher risk (2 points).</li>
            <li><strong>Thyromental Distance:</strong> <6 cm suggests difficulty (2 points).</li>
            <li><strong>Mouth Opening:</strong> <3.5 cm limits laryngoscope access (2 points).</li>
            <li><strong>Neck Extension:</strong> Limited extension (<20°) complicates alignment (2 points).</li>
            <li><strong>Body Weight:</strong> >90 kg may increase difficulty due to anatomy (2 points).</li>
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

export default WilsonScore;