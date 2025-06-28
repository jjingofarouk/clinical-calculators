import React, { useState } from 'react';
import { Box, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Divider, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Activity, Droplet, Heart, Lungs, Info } from 'lucide-react';

const AldreteScore = () => {
  const [scores, setScores] = useState({
    activity: null,
    respiration: null,
    circulation: null,
    consciousness: null,
    o2Saturation: null,
  });
  const [totalScore, setTotalScore] = useState(null);
  const [recommendation, setRecommendation] = useState('');

  const calculateScore = () => {
    const total = Object.values(scores).reduce((sum, score) => sum + (parseInt(score) || 0), 0);
    setTotalScore(total);
    if (total >= 9) {
      setRecommendation('Patient meets criteria for discharge from PACU to a less intensive care setting.');
    } else if (total >= 7) {
      setRecommendation('Patient may require additional monitoring before discharge.');
    } else {
      setRecommendation('Patient requires continued PACU monitoring and intervention.');
    }
  };

  const handleChange = (category, value) => {
    setScores({ ...scores, [category]: value });
  };

  const resetCalculator = () => {
    setScores({
      activity: null,
      respiration: null,
      circulation: null,
      consciousness: null,
      o2Saturation: null,
    });
    setTotalScore(null);
    setRecommendation('');
  };

  const categoryDetails = [
    {
      name: 'activity',
      icon: Activity,
      label: 'Activity',
      options: [
        { value: '2', label: 'Able to move 4 extremities voluntarily or on command' },
        { value: '1', label: 'Able to move 2 extremities voluntarily or on command' },
        { value: '0', label: 'Unable to move extremities voluntarily or on command' },
      ],
    },
    {
      name: 'respiration',
      icon: Lungs,
      label: 'Respiration',
      options: [
        { value: '2', label: 'Able to breathe deeply and cough freely' },
        { value: '1', label: 'Dyspnea or limited breathing' },
        { value: '0', label: 'Apneic or on mechanical ventilator' },
      ],
    },
    {
      name: 'circulation',
      icon: Heart,
      label: 'Circulation',
      options: [
        { value: '2', label: 'BP ±20% of pre-anesthetic level' },
        { value: '1', label: 'BP ±20-50% of pre-anesthetic level' },
        { value: '0', label: 'BP ±50% of pre-anesthetic level' },
      ],
    },
    {
      name: 'consciousness',
      icon: Stethoscope,
      label: 'Consciousness',
      options: [
        { value: '2', label: 'Fully awake' },
        { value: '1', label: 'Arousable on calling' },
        { value: '0', label: 'Not responding' },
      ],
    },
    {
      name: 'o2Saturation',
      icon: Droplet,
      label: 'O2 Saturation',
      options: [
        { value: '2', label: 'SpO2 >92% on room air' },
        { value: '1', label: 'Needs O2 inhalation to maintain SpO2 >90%' },
        { value: '0', label: 'SpO2 <90% even with O2 supplement' },
      ],
    },
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto', bgcolor: '#f5f5f5' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#1a3c34', fontWeight: 'bold' }}>
          Aldrete Score Calculator
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: '#4a4a4a' }}>
          The Aldrete Score assesses a patient's recovery from anesthesia in the Post-Anesthesia Care Unit (PACU). A score of 9 or higher typically indicates readiness for discharge to a less intensive care setting.
        </Typography>
      </motion.div>

      <Paper elevation={3} sx={{ p: 3, bgcolor: '#ffffff', borderRadius: 2 }}>
        {categoryDetails.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
              <FormLabel component="legend" sx={{ display: 'flex', alignItems: 'center', color: '#1a3c34', fontWeight: 'medium' }}>
                <category.icon size={20} style={{ marginRight: 8, color: '#2e7d32' }} />
                {category.label}
              </FormLabel>
              <RadioGroup
                name={category.name}
                value={scores[category.name]}
                onChange={(e) => handleChange(category.name, e.target.value)}
              >
                {category.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />}
                    label={option.label}
                    sx={{ color: '#4a4a4a' }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            {index < categoryDetails.length - 1 && <Divider sx={{ my: 2, bgcolor: '#e0e0e0' }} />}
          </motion.div>
        ))}
      </Paper>

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            onClick={calculateScore}
            disabled={Object.values(scores).some((score) => score === null)}
            sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1a3c34' }, color: '#ffffff' }}
          >
            Calculate Score
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
        {totalScore !== null && (
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
                Total Aldrete Score: <strong>{totalScore}/10</strong>
              </Typography>
              <Typography variant="body1" sx={{ color: '#4a4a4a', mt: 1 }}>
                Recommendation: {recommendation}
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
          The Aldrete Scoring System is used to evaluate a patient's recovery from anesthesia in the PACU. It assesses five parameters: Activity, Respiration, Circulation, Consciousness, and Oxygen Saturation, each scored from 0 to 2. A total score of 9-10 generally indicates readiness for discharge from PACU, while scores of 7-8 suggest the need for further monitoring, and scores below 7 indicate the need for continued intensive care. Always consider additional clinical factors, such as pain control, nausea, and surgical complications, before making discharge decisions. Consult institutional protocols and clinical guidelines for comprehensive patient management.
        </Typography>
      </Box>
    </Box>
  );
};

export default AldreteScore;