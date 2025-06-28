import React, { useState } from 'react';
import { Box, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Divider, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Info } from 'lucide-react';

const ApfelScore = () => {
  const [scores, setScores] = useState({
    gender: null,
    smoking: null,
    history: null,
    opioids: null,
  });
  const [totalScore, setTotalScore] = useState(null);
  const [riskLevel, setRiskLevel] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const handleChange = (category, value) => {
    setScores({ ...scores, [category]: value });
  };

  const calculateScore = () => {
    const total = Object.values(scores).reduce((sum, score) => sum + (parseInt(score) || 0), 0);
    setTotalScore(total);

    let risk, reco;
    switch (total) {
      case 0:
        risk = 'Low (~10%)';
        reco = 'No prophylaxis recommended unless other clinical factors suggest increased risk.';
        break;
      case 1:
        risk = 'Low (~20%)';
        reco = 'Consider single-agent prophylaxis (e.g., ondansetron 4 mg IV) for moderate-risk procedures.';
        break;
      case 2:
        risk = 'Moderate (~40%)';
        reco = 'Administer single or dual-agent prophylaxis (e.g., ondansetron 4 mg IV + dexamethasone 4-8 mg IV).';
        break;
      case 3:
        risk = 'High (~60%)';
        reco = 'Administer dual-agent prophylaxis (e.g., ondansetron 4 mg IV + dexamethasone 4-8 mg IV) and consider non-pharmacologic measures.';
        break;
      case 4:
        risk = 'Very High (~80%)';
        reco = 'Administer multimodal prophylaxis (e.g., ondansetron 4 mg IV, dexamethasone 4-8 mg IV, and scopolamine patch) and optimize anesthesia technique (e.g., TIVA).';
        break;
      default:
        risk = 'Unknown';
        reco = 'Complete all fields to assess risk.';
    }
    setRiskLevel(risk);
    setRecommendation(reco);
  };

  const resetCalculator = () => {
    setScores({
      gender: null,
      smoking: null,
      history: null,
      opioids: null,
    });
    setTotalScore(null);
    setRiskLevel('');
    setRecommendation('');
  };

  const riskFactors = [
    {
      name: 'gender',
      label: 'Gender',
      options: [
        { value: '1', label: 'Female' },
        { value: '0', label: 'Male' },
      ],
    },
    {
      name: 'smoking',
      label: 'Smoking Status',
      options: [
        { value: '1', label: 'Non-smoker' },
        { value: '0', label: 'Smoker' },
      ],
    },
    {
      name: 'history',
      label: 'History of PONV or Motion Sickness',
      options: [
        { value: '1', label: 'Yes' },
        { value: '0', label: 'No' },
      ],
    },
    {
      name: 'opioids',
      label: 'Postoperative Opioid Use (Anticipated)',
      options: [
        { value: '1', label: 'Yes' },
        { value: '0', label: 'No' },
      ],
    },
  ];

  return (
    <Box sx={{ p: 4, width: '100vw', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#1a3c34', fontWeight: 'bold' }}>
          Apfel Score Calculator
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: '#4a4a4a', maxWidth: '1200px', mx: 'auto' }}>
          The Apfel Score is a validated tool to predict the risk of postoperative nausea and vomiting (PONV) in patients undergoing surgery under general anesthesia. It uses four risk factors to stratify patients into low, moderate, or high-risk categories for PONV, guiding prophylactic antiemetic strategies.
        </Typography>
      </motion.div>

      <Paper elevation={3} sx={{ p: 3, bgcolor: '#ffffff', borderRadius: 2, maxWidth: '1200px', mx: 'auto' }}>
        {riskFactors.map((factor, index) => (
          <motion.div
            key={factor.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
              <FormLabel component="legend" sx={{ display: 'flex', alignItems: 'center', color: '#1a3c34', fontWeight: 'medium' }}>
                <Stethoscope size={20} style={{ marginRight: 8, color: '#2e7d32' }} />
                {factor.label}
              </FormLabel>
              <RadioGroup
                name={factor.name}
                value={scores[factor.name]}
                onChange={(e) => handleChange(factor.name, e.target.value)}
              >
                {factor.options.map((option) => (
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
            {index < riskFactors.length - 1 && <Divider sx={{ my: 2, bgcolor: '#e0e0e0' }} />}
          </motion.div>
        ))}
      </Paper>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, maxWidth: '1200px', mx: 'auto' }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            onClick={calculateScore}
            disabled={Object.values(scores).some((score) => score === null)}
            sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1a3c34' }, color: '#ffffff' }}
          >
            Calculate Apfel Score
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
            <Paper elevation={2} sx={{ p: 3, bgcolor: '#ffffff', borderRadius: 2, maxWidth: '1200px', mx: 'auto' }}>
              <Typography variant="h6" sx={{ color: '#1a3c34', mb: 1 }}>
                Results
              </Typography>
              <Typography variant="body1" sx={{ color: '#4a4a4a' }}>
                Apfel Score: <strong>{totalScore}/4</strong>
              </Typography>
              <Typography variant="body1" sx={{ color: '#4a4a4a', mt: 1 }}>
                Risk Level: <strong>{riskLevel}</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: '#4a4a4a', mt: 1 }}>
                Recommendation: {recommendation}
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
          The Apfel Score is a simplified risk assessment tool for postoperative nausea and vomiting (PONV), validated for use in patients undergoing general anesthesia. It includes four risk factors: female gender, non-smoking status, history of PONV or motion sickness, and anticipated postoperative opioid use. Each factor contributes approximately 20% to the risk of PONV. The score ranges from 0 to 4, corresponding to approximate PONV risks of 10%, 20%, 40%, 60%, and 80%, respectively. Key clinical considerations:
          <ul>
            <li><strong>Low Risk (0-1)</strong>: Prophylaxis may not be necessary unless other risk factors (e.g., type of surgery) are present.</li>
            <li><strong>Moderate Risk (2)</strong>: Consider single or dual-agent prophylaxis to reduce PONV incidence.</li>
            <li><strong>High Risk (3-4)</strong>: Multimodal prophylaxis (e.g., 5-HT3 antagonists, corticosteroids, antihistamines) and non-pharmacologic strategies (e.g., total intravenous anesthesia, adequate hydration) are recommended.</li>
            <li><strong>Additional Factors</strong>: Certain surgeries (e.g., laparoscopic, gynecologic, orthopedic) and patient factors (e.g., anxiety, young age) may increase PONV risk beyond the Apfel Score.</li>
          </ul>
          Use the Apfel Score to guide prophylactic antiemetic administration, but always integrate clinical judgment, patient history, and institutional protocols. Monitor patients for PONV in the PACU and up to 24-48 hours post-surgery, as delayed PONV can occur, especially with opioid use.[](https://www.researchgate.net/publication/290995451_Validation_of_the_Apfel_scoring_system_for_identification_of_High-risk_patients_for_PONV)[](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3743191/)
        </Typography>
        <Typography variant="h6" sx={{ color: '#1a3c34', mt: 3, mb: 1 }}>
          References
        </Typography>
        <Typography variant="body2" sx={{ color: '#4a4a4a', lineHeight: 1.6 }}>
          <ul>
            <li>Apfel, C. C., et al. (1999). A simplified risk score for predicting postoperative nausea and vomiting: conclusions from cross-validations between two centers. Anesthesiology, 91(3), 693-700. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10661641/">https://pmc.ncbi.nlm.nih.gov/articles/PMC10661641/</a></li>
            <li>Sherif, L., et al. (2015). Validation of the Apfel scoring system for identification of high-risk patients for PONV. Karnataka Anaesthesia Journal, 1(3), 115-119. <a href="https://www.researchgate.net/publication/290995451_Validation_of_the_Apfel_scoring_system_for_identification_of_High-risk_patients_for_PONV">https://www.researchgate.net/publication/290995451_Validation_of_the_Apfel_scoring_system_for_identification_of_High-risk_patients_for_PONV</a></li>
          </ul>
        </Typography>
      </Box>
    </Box>
  );
};

export default ApfelScore;