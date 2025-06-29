import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, FormControl, FormControlLabel, Radio, RadioGroup, Button, Divider } from '@mui/material';
import { Info, BookOpen, AlertTriangle } from 'lucide-react';

const MallampatiScore = () => {
  const [position, setPosition] = useState('sitting');
  const [score, setScore] = useState(null);
  const [result, setResult] = useState(null);

  const handleScoreChange = (event) => {
    const selectedScore = parseInt(event.target.value);
    setScore(selectedScore);
    calculateResult(selectedScore, position);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
    if (score !== null) {
      calculateResult(score, event.target.value);
    }
  };

  const calculateResult = (score, pos) => {
    // Diagnostic accuracy based on position (sitting/supine) from research
    const accuracyData = {
      sitting: { sensitivity: 0.65, specificity: 0.76, ppv: 0.55, npv: 0.82 },
      supine: { sensitivity: 0.71, specificity: 0.70, ppv: 0.52, npv: 0.85 }
    };

    const { sensitivity, specificity, ppv, npv } = accuracyData[pos];
    let riskLevel = '';
    let recommendation = '';

    switch (score) {
      case 1:
        riskLevel = 'Low';
        recommendation = 'Class I: Low risk of difficult intubation. Standard airway management is typically sufficient.';
        break;
      case 2:
        riskLevel = 'Low to Moderate';
        recommendation = 'Class II: Low to moderate risk. Consider standard airway protocols with potential for minor adjustments.';
        break;
      case 3:
        riskLevel = 'Moderate to High';
        recommendation = 'Class III: Moderate to high risk. Prepare for potential difficult intubation; consider advanced airway techniques.';
        break;
      case 4:
        riskLevel = 'High';
        recommendation = 'Class IV: High risk of difficult intubation. Advanced airway management techniques and specialist consultation are strongly recommended.';
        break;
      default:
        riskLevel = 'Unknown';
        recommendation = 'Please select a valid Mallampati score.';
    }

    setResult({
      riskLevel,
      recommendation,
      sensitivity: (sensitivity * 100).toFixed(1),
      specificity: (specificity * 100).toFixed(1),
      ppv: (ppv * 100).toFixed(1),
      npv: (npv * 100).toFixed(1),
      position: pos
    });
  };

  const resetCalculator = () => {
    setScore(null);
    setResult(null);
    setPosition('sitting');
  };

  return (
    <Box className="container w-full max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <Typography variant="h4" className="header flex items-center gap-2">
          <Info size={24} /> Mallampati Score Calculator
        </Typography>
        <Typography variant="body1" className="mb-4">
          Assess airway difficulty using the Mallampati classification. Select the patient’s position and observed class.
        </Typography>

        <Divider className="my-4" />

        <Box className="mb-4">
          <Typography variant="h6" className="header">Patient Position</Typography>
          <FormControl component="fieldset">
            <RadioGroup row value={position} onChange={handlePositionChange}>
              <FormControlLabel value="sitting" control={<Radio />} label="Sitting" />
              <FormControlLabel value="supine" control={<Radio />} label="Supine" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box className="mb-4">
          <Typography variant="h6" className="header">Mallampati Class</Typography>
          <FormControl component="fieldset">
            <RadioGroup value={score} onChange={handleScoreChange}>
              <FormControlLabel value={1} control={<Radio />} label="Class I: Soft palate, fauces, uvula, pillars visible" />
              <FormControlLabel value={2} control={<Radio />} label="Class II: Soft palate, fauces, uvula visible" />
              <FormControlLabel value={3} control={<Radio />} label="Class III: Soft palate, base of uvula visible" />
              <FormControlLabel value={4} control={<Radio />} label="Class IV: Only hard palate visible" />
            </RadioGroup>
          </FormControl>
        </Box>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-teal-50 rounded-lg"
            >
              <Typography variant="h6" className="header flex items-center gap-2">
                <AlertTriangle size={20} /> Results
              </Typography>
              <Typography variant="body1"><strong>Risk Level:</strong> {result.riskLevel}</Typography>
              <Typography variant="body1"><strong>Recommendation:</strong> {result.recommendation}</Typography>
              <Typography variant="body2" className="mt-2">
                <strong>Diagnostic Accuracy ({result.position}):</strong><br />
                Sensitivity: {result.sensitivity}% | Specificity: {result.specificity}%<br />
                PPV: {result.ppv}% | NPV: {result.npv}%
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>

        <Box className="mt-4">
          <Button
            className="btn-primary"
            onClick={resetCalculator}
            disabled={!score}
          >
            Reset
          </Button>
        </Box>

        <Divider className="my-4" />

        <Box className="mt-4">
          <Typography variant="h6" className="header flex items-center gap-2">
            <BookOpen size={20} /> Clinical Guidance & Sources
          </Typography>
          <Typography variant="body2">
            The Mallampati score assesses airway difficulty by visualizing oropharyngeal structures. Higher scores (III-IV) indicate increased risk of difficult intubation. Sensitivity and specificity vary by position (sitting vs. supine), as reported in studies.
          </Typography>
          <Typography variant="body2" className="mt-2">
            <strong>Sources:</strong><br />
            - Samsoon GL, Young JR. Difficult tracheal intubation: a retrospective study. Anaesthesia. 1987.<br />
            - Lee, L. et al. Diagnostic Accuracy of Mallampati Classification. ResearchGate, 2017.<br />
            - NCBI Bookshelf: Mallampati Score Overview. Available at: <a href="https://www.ncbi.nlm.nih.gov/books/NBK585119/" target="_blank">NCBI</a>.<br />
            - ScienceDirect: Mallampati Score in Airway Assessment. Available at: <a href="https://www.sciencedirect.com/topics/medicine-and-dentistry/mallampati-score" target="_blank">ScienceDirect</a>.
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default MallampatiScore;