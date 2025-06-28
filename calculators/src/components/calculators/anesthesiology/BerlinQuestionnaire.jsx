import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Card,
  CardContent,
  Grid,
  Alert,
  Chip,
  Paper,
  LinearProgress,
  Divider,
  InputAdornment,
  Button
} from '@mui/material';
import { 
  Help, 
  Hotel, 
  Warning, 
  CheckCircle, 
  Info,
  Assessment,
  LocalHospital
} from '@mui/icons-material';

const BerlinQuestionnaire = () => {
  const [responses, setResponses] = useState({
    snoring: '',
    snoringLoudness: '',
    snoringFrequency: '',
    snoringBothers: '',
    snoringWitnessed: '',
    drowsyDriving: '',
    drowsyDaily: '',
    fallAsleepSitting: '',
    height: '',
    weight: '',
    age: '',
    hypertension: '',
    gender: ''
  });

  const [results, setResults] = useState({
    category1Score: 0,
    category2Score: 0,
    category3Score: 0,
    totalScore: 0,
    riskLevel: 'low',
    bmi: 0,
    categoriesPositive: 0
  });

  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;

  useEffect(() => {
    calculateResults();
  }, [responses]);

  const calculateResults = () => {
    let cat1Score = 0;
    let cat2Score = 0;
    let cat3Score = 0;

    // Category 1: Snoring behavior
    if (responses.snoring === 'yes') cat1Score += 1;
    if (responses.snoringLoudness === 'louder' || responses.snoringLoudness === 'very_loud') cat1Score += 1;
    if (['nearly_every_day', 'frequent'].includes(responses.snoringFrequency)) cat1Score += 1;
    if (responses.snoringBothers === 'yes') cat1Score += 1;
    if (responses.snoringWitnessed === 'yes') cat1Score += 1;

    // Category 2: Daytime somnolence
    if (['nearly_every_day', 'frequent'].includes(responses.drowsyDaily)) cat2Score += 1;
    if (['nearly_every_day', 'frequent'].includes(responses.fallAsleepSitting)) cat2Score += 1;
    if (responses.drowsyDriving === 'yes') cat2Score += 1;

    // Category 3: BMI and hypertension
    const height = parseFloat(responses.height) || 0;
    const weight = parseFloat(responses.weight) || 0;
    const bmi = height > 0 && weight > 0 ? (weight / ((height / 100) ** 2)) : 0;
    
    if (bmi > 30) cat3Score += 1;
    if (responses.hypertension === 'yes') cat3Score += 1;

    const cat1Positive = cat1Score >= 2;
    const cat2Positive = cat2Score >= 2;
    const cat3Positive = cat3Score >= 1;
    
    const categoriesPositive = [cat1Positive, cat2Positive, cat3Positive].filter(Boolean).length;
    const totalScore = cat1Score + cat2Score + cat3Score;

    const riskLevel = categoriesPositive >= 2 ? 'high' : 'low';

    setResults({
      category1Score: cat1Score,
      category2Score: cat2Score,
      category3Score: cat3Score,
      totalScore,
      riskLevel,
      bmi: bmi ? Math.round(bmi * 10) / 10 : 0,
      categoriesPositive
    });
  };

  const handleInputChange = (field, value) => {
    setResponses(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRiskColor = (level) => {
    return level === 'high' ? 'error' : 'success';
  };

  const getRiskText = (level) => {
    return level === 'high' ? 'High Risk for OSA' : 'Low Risk for OSA';
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetCalculator = () => {
    setResponses({
      snoring: '',
      snoringLoudness: '',
      snoringFrequency: '',
      snoringBothers: '',
      snoringWitnessed: '',
      drowsyDriving: '',
      drowsyDaily: '',
      fallAsleepSitting: '',
      height: '',
      weight: '',
      age: '',
      hypertension: '',
      gender: ''
    });
    setCurrentStep(0);
    setResults({
      category1Score: 0,
      category2Score: 0,
      category3Score: 0,
      totalScore: 0,
      riskLevel: 'low',
      bmi: 0,
      categoriesPositive: 0
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  const Category1Questions = () => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card elevation={2} sx={{ borderLeft: '4px solid #1976d2', bgcolor: '#ffffff' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#1a3c34' }}>
            <Hotel sx={{ mr: 1, color: '#2e7d32' }} />
            Category 1: Snoring Behavior
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1, color: '#4a4a4a' }}>
                  1. Do you snore?
                </FormLabel>
                <RadioGroup
                  value={responses.snoring}
                  onChange={(e) => handleInputChange('snoring', e.target.value)}
                  row
                >
                  <FormControlLabel value="yes" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="No" />
                  <FormControlLabel value="dont-know" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Don't know" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {responses.snoring === 'yes' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                <Grid item xs={12}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend" sx={{ mb: 1, color: '#4a4a4a' }}>
                      2. Your snoring is:
                    </FormLabel>
                    <RadioGroup
                      value={responses.snoringLoudness}
                      onChange={(e) => handleInputChange('snoringLoudness', e.target.value)}
                    >
                      <FormControlLabel value="very_loud" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Very loud (louder than talking)" />
                      <FormControlLabel value="louder" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Louder than talking" />
                      <FormControlLabel value="same" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Same as talking" />
                      <FormControlLabel value="quieter" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Quieter than talking" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </motion.div>
            )}

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1, color: '#4a4a4a' }}>
                  3. How often do you snore?
                </FormLabel>
                <RadioGroup
                  value={responses.snoringFrequency}
                  onChange={(e) => handleInputChange('snoringFrequency', e.target.value)}
                >
                  <FormControlLabel value="nearly_every_day" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Nearly every day" />
                  <FormControlLabel value="frequent" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="3-4 times a week" />
                  <FormControlLabel value="weekly" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="1-2 times a week" />
                  <FormControlLabel value="monthly" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="1-2 times a month" />
                  <FormControlLabel value="never" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Never or nearly never" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1, color: '#4a4a4a' }}>
                  4. Has your snoring ever bothered other people?
                </FormLabel>
                <RadioGroup
                  value={responses.snoringBothers}
                  onChange={(e) => handleInputChange('snoringBothers', e.target.value)}
                  row
                >
                  <FormControlLabel value="yes" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1, color: '#4a4a4a' }}>
                  5. Has anyone noticed that you quit breathing during your sleep?
                </FormLabel>
                <RadioGroup
                  value={responses.snoringWitnessed}
                  onChange={(e) => handleInputChange('snoringWitnessed', e.target.value)}
                  row
                >
                  <FormControlLabel value="yes" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </motion.div>
  );

  const Category2Questions = () => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card elevation={2} sx={{ borderLeft: '4px solid #ed6c02', bgcolor: '#ffffff' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#1a3c34' }}>
            <Help sx={{ mr: 1, color: '#2e7d32' }} />
            Category 2: Daytime Sleepiness
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1, color: '#4a4a4a' }}>
                  6. How often do you feel tired or fatigued after your sleep?
                </FormLabel>
                <RadioGroup
                  value={responses.drowsyDaily}
                  onChange={(e) => handleInputChange('drowsyDaily', e.target.value)}
                >
                  <FormControlLabel value="nearly_every_day" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Nearly every day" />
                  <FormControlLabel value="frequent" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="3-4 times a week" />
                  <FormControlLabel value="weekly" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="1-2 times a week" />
                  <FormControlLabel value="monthly" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="1-2 times a month" />
                  <FormControlLabel value="never" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Never or nearly never" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1, color: '#4a4a4a' }}>
                  7. During your waking time, do you feel tired, fatigued, or not up to par?
                </FormLabel>
                <RadioGroup
                  value={responses.fallAsleepSitting}
                  onChange={(e) => handleInputChange('fallAsleepSitting', e.target.value)}
                >
                  <FormControlLabel value="nearly_every_day" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Nearly every day" />
                  <FormControlLabel value="frequent" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="3-4 times a week" />
                  <FormControlLabel value="weekly" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="1-2 times a week" />
                  <FormControlLabel value="monthly" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="1-2 times a month" />
                  <FormControlLabel valueцен="never" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Never or nearly never" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1, color: '#4a4a4a' }}>
                  8. Have you ever nodded off or fallen asleep while driving a vehicle?
                </FormLabel>
                <RadioGroup
                  value={responses.drowsyDriving}
                  onChange={(e) => handleInputChange('drowsyDriving', e.target.value)}
                  row
                >
                  <FormControlLabel value="yes" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </motion.div>
  );

  const Category3Questions = () => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card elevation={2} sx={{ borderLeft: '4px solid #2e7d32', bgcolor: '#ffffff' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#1a3c34' }}>
            <Assessment sx={{ mr: 1, color: '#2e7d32' }} />
            Category 3: Physical Characteristics
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Height"
                value={responses.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                  inputProps: { min: 0 }
                }}
                sx={{ '& .MuiInputLabel-root': { color: '#4a4a4a' }, '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#2e7d32' } } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight"
                value={responses.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                  inputProps: { min: 0 }
                }}
                sx={{ '& .MuiInputLabel-root': { color: '#4a4a4a' }, '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#2e7d32' } } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                value={responses.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">years</InputAdornment>,
                  inputProps: { min: 0 }
                }}
                sx={{ '& .MuiInputLabel-root': { color: '#4a4a4a' }, '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#2e7d32' } } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1, color: '#4a4a4a' }}>
                  Gender
                </FormLabel>
                <RadioGroup
                  value={responses.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  row
                >
                  <FormControlLabel value="male" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Male" />
                  <FormControlLabel value="female" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Female" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1, color: '#4a4a4a' }}>
                  9. Do you have or are you being treated for high blood pressure?
                </FormLabel>
                <RadioGroup
                  value={responses.hypertension}
                  onChange={(e) => handleInputChange('hypertension', e.target.value)}
                  row
                >
                  <FormControlLabel value="yes" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio sx={{ color: '#2e7d32', '&.Mui-checked': { color: '#2e7d32' } }} />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {results.bmi > 0 && (
              <Grid item xs={12}>
                <Alert severity={results.bmi > 30 ? "warning" : "info"}>
                  <Typography variant="body2">
                    <strong>Calculated BMI: {results.bmi} kg/m²</strong>
                    {results.bmi > 30 && " (Obesity - Risk factor for OSA)"}
                  </Typography>
                </Alert>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ p: 4, width: '100vw', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#ffffff', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Hotel sx={{ mr: 2, color: '#2e7d32', fontSize: 32 }} />
              <Typography variant="h4" component="h1" sx={{ color: '#1a3c34', fontWeight: 'bold' }}>
                Berlin Questionnaire
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 3, color: '#4a4a4a' }}>
              A validated screening tool for obstructive sleep apnea (OSA) in primary care settings. Complete all three categories to assess your risk level for OSA.
            </Typography>

            <LinearProgress
              variant="determinate"
              value={((currentStep + 1) / totalSteps) * 100}
              sx={{ mb: 3, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: '#2e7d32' } }}
            />

            <Grid container spacing={4}>
              <Grid item xs={12} lg={8}>
                <Box sx={{ mb: 3 }}>
                  {currentStep === 0 && <Category1Questions />}
                  {currentStep === 1 && <Category2Questions />}
                  {currentStep === 2 && <Category3Questions />}
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="contained"
                      onClick={handlePrevStep}
                      disabled={currentStep === 0}
                      sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1a3c34' }, color: '#ffffff' }}
                    >
                      Previous
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="contained"
                      onClick={handleNextStep}
                      disabled={currentStep === totalSteps - 1}
                      sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1a3c34' }, color: '#ffffff' }}
                    >
                      Next
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
              </Grid>

              <Grid item xs={12} lg={4}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                >
                  <Card elevation={3} sx={{ position: 'sticky', top: 20, bgcolor: '#ffffff' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#1a3c34' }}>
                        <LocalHospital sx={{ mr: 1, color: '#2e7d32' }} />
                        Assessment Results
                      </Typography>

                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12}>
                          <Paper elevation={0} sx={{ p: 2, bgcolor: '#e3f2fd', color: '#1a3c34' }}>
                            <Typography variant="body2" gutterBottom>Category 1 Score (Snoring)</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                              {results.category1Score}/5
                            </Typography>
                            <Typography variant="caption">
                              {results.category1Score >= 2 ? 'Positive' : 'Negative'}
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12}>
                          <Paper elevation={0} sx={{ p: 2, bgcolor: '#fff3e0', color: '#1a3c34' }}>
                            <Typography variant="body2" gutterBottom>Category 2 Score (Sleepiness)</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                              {results.category2Score}/3
                            </Typography>
                            <Typography variant="caption">
                              {results.category2Score >= 2 ? 'Positive' : 'Negative'}
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12}>
                          <Paper elevation={0} sx={{ p: 2, bgcolor: '#e8f5e9', color: '#1a3c34' }}>
                            <Typography variant="body2" gutterBottom>Category 3 Score (Physical)</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                              {results.category3Score}/2
                            </Typography>
                            <Typography variant="caption">
                              {results.category3Score >= 1 ? 'Positive' : 'Negative'}
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 2, bgcolor: '#e0e0e0' }} />

                      <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Chip
                          label={getRiskText(results.riskLevel)}
                          color={getRiskColor(results.riskLevel)}
                          icon={results.riskLevel === 'high' ? <Warning /> : <CheckCircle />}
                          size="large"
                          sx={{ mb: 2 }}
                        />
                        <Typography variant="body2" sx={{ color: '#4a4a4a' }}>
                          {results.categoriesPositive}/3 categories positive
                        </Typography>
                      </Box>

                      <Alert severity={results.riskLevel === 'high' ? "warning" : "success"} sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          {results.riskLevel === 'high' 
                            ? "High risk for OSA. Consider sleep study referral and consultation with a sleep specialist."
                            : "Low risk for OSA based on current responses. Monitor for symptoms and reassess if needed."
                          }
                        </Typography>
                      </Alert>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4, bgcolor: '#e0e0e0' }} />

            <Card elevation={1} sx={{ bgcolor: '#ffffff' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#1a3c34' }}>
                  <Info sx={{ mr: 1, color: '#2e7d32' }} />
                  Clinical Information & Validation
                </Typography>
                <Typography variant="body2" sx={{ color: '#4a4a4a', lineHeight: 1.6, mb: 3 }}>
                  The Berlin Questionnaire is a validated screening tool designed to identify patients at risk for obstructive sleep apnea (OSA) in primary care and preoperative settings. It consists of three categories: snoring behavior, daytime sleepiness, and physical characteristics (BMI and hypertension). A high-risk result (≥2 positive categories) indicates a significant likelihood of OSA, warranting further evaluation. Key clinical considerations:
                  <ul>
                    <li><strong>Category 1 (Snoring)</strong>: Positive if ≥2 points, indicating significant snoring or witnessed apneas, which are strong predictors of OSA.</li>
                    <li><strong>Category 2 (Sleepiness)</strong>: Positive if ≥2 points, reflecting excessive daytime sleepiness, a hallmark symptom of OSA.</li>
                    <li><strong>Category 3 (Physical)</strong>: Positive if BMI >30 kg/m² or hypertension is present, both associated with increased OSA risk.</li>
                    <li><strong>Risk Assessment</strong>: High risk (≥2 positive categories) has a sensitivity of ~86% and specificity of ~77% for OSA (AHI ≥5).</li>
                    <li><strong>Clinical Recommendations</strong>: High-risk patients should be referred for polysomnography or home sleep apnea testing. Low-risk patients may require monitoring if clinical suspicion persists (e.g., neck circumference >40 cm, craniofacial abnormalities).</li>
                  </ul>
                  Always integrate results with clinical history, physical exam, and additional risk factors. Consider comorbidities like cardiovascular disease or diabetes, which may increase OSA risk. Follow institutional protocols for OSA screening and management.
                </Typography>
                <Typography variant="h6" sx={{ color: '#1a3c34', mb: 1 }}>
                  References
                </Typography>
                <Typography variant="body2" sx={{ color: '#4a4a4a', lineHeight: 1.6 }}>
                  <ul>
                    <li>Netzer, N. C., et al. (1999). Using the Berlin Questionnaire to identify patients at risk for the sleep apnea syndrome. Annals of Internal Medicine, 131(7), 485-491. <a href="https://www.acpjournals.org/doi/10.7326/0003-4819-131-7-199910050-00002">https://www.acpjournals.org/doi/10.7326/0003-4819-131-7-199910050-00002</a></li>
                    <li>Senaratna, C. V., et al. (2017). Validity of the Berlin Questionnaire in detecting obstructive sleep apnea: A systematic review and meta-analysis. Sleep Medicine Reviews, 36, 116-124. <a href="https://www.sciencedirect.com/science/article/pii/S1087079216301449">https://www.sciencedirect.com/science/article/pii/S1087079216301449</a></li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>

            <Box sx={{ mt: 3 }}>
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Disclaimer:</strong> The Berlin Questionnaire is a screening tool and not a diagnostic test for OSA. 
                  High-risk patients should be referred for polysomnography or home sleep testing for definitive diagnosis.
                  Clinical judgment should always be used in conjunction with screening results.
                </Typography>
              </Alert>
            </Box>
          </Paper>
        </Box>
      </motion.div>
    </Box>
  );
};

export default BerlinQuestionnaire;