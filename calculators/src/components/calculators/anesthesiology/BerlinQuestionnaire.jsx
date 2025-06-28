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
    // Category 1: Snoring behavior
    snoring: '',
    snoringLoudness: '',
    snoringFrequency: '',
    snoringBothers: '',
    snoringWitnessed: '',
    
    // Category 2: Daytime somnolence
    drowsyDriving: '',
    drowsyDaily: '',
    fallAsleepSitting: '',
    
    // Category 3: History of hypertension and BMI
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

    // Category 1: Snoring behavior (5 questions)
    const cat1Responses = [
      responses.snoring === 'yes' ? 1 : 0,
      responses.snoringLoudness === 'louder' ? 1 : 0,
      responses.snoringFrequency === 'frequent' ? 1 : 0,
      responses.snoringBothers === 'yes' ? 1 : 0,
      responses.snoringWitnessed === 'yes' ? 1 : 0
    ];
    cat1Score = cat1Responses.reduce((a, b) => a + b, 0);

    // Category 2: Daytime somnolence (3 questions)
    const cat2Responses = [
      responses.drowsyDriving === 'yes' ? 1 : 0,
      responses.drowsyDaily === 'yes' ? 1 : 0,
      responses.fallAsleepSitting === 'yes' ? 1 : 0
    ];
    cat2Score = cat2Responses.reduce((a, b) => a + b, 0);

    // Category 3: BMI and hypertension
    const height = parseFloat(responses.height) || 0;
    const weight = parseFloat(responses.weight) || 0;
    const bmi = height > 0 && weight > 0 ? weight / ((height / 100) ** 2) : 0;
    
    cat3Score = 0;
    if (bmi > 30) cat3Score += 1;
    if (responses.hypertension === 'yes') cat3Score += 1;

    // Determine positive categories (≥2 points for cat1&2, ≥1 point for cat3)
    const cat1Positive = cat1Score >= 2;
    const cat2Positive = cat2Score >= 2;
    const cat3Positive = cat3Score >= 1;
    
    const categoriesPositive = [cat1Positive, cat2Positive, cat3Positive].filter(Boolean).length;
    const totalScore = cat1Score + cat2Score + cat3Score;

    // High risk if ≥2 categories are positive
    const riskLevel = categoriesPositive >= 2 ? 'high' : 'low';

    setResults({
      category1Score: cat1Score,
      category2Score: cat2Score,
      category3Score: cat3Score,
      totalScore,
      riskLevel,
      bmi: Math.round(bmi * 10) / 10,
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
      <Card elevation={2} sx={{ borderLeft: '4px solid #1976d2' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
            <Sleep sx={{ mr: 1 }} />
            Category 1: Snoring Behavior
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  1. Do you snore?
                </FormLabel>
                <RadioGroup
                  value={responses.snoring}
                  onChange={(e) => handleInputChange('snoring', e.target.value)}
                  row
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                  <FormControlLabel value="dont-know" control={<Radio />} label="Don't know" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {responses.snoring === 'yes' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <Grid item xs={12}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend" sx={{ mb: 1 }}>
                      2. Your snoring is:
                    </FormLabel>
                    <RadioGroup
                      value={responses.snoringLoudness}
                      onChange={(e) => handleInputChange('snoringLoudness', e.target.value)}
                    >
                      <FormControlLabel value="louder" control={<Radio />} label="Louder than talking" />
                      <FormControlLabel value="same" control={<Radio />} label="Same as talking" />
                      <FormControlLabel value="quieter" control={<Radio />} label="Quieter than talking" />
                      <FormControlLabel value="quiet" control={<Radio />} label="Very quiet" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </motion.div>
            )}

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  3. How often do you snore?
                </FormLabel>
                <RadioGroup
                  value={responses.snoringFrequency}
                  onChange={(e) => handleInputChange('snoringFrequency', e.target.value)}
                >
                  <FormControlLabel value="frequent" control={<Radio />} label="Nearly every day" />
                  <FormControlLabel value="weekly" control={<Radio />} label="3-4 times a week" />
                  <FormControlLabel value="monthly" control={<Radio />} label="1-2 times a week" />
                  <FormControlLabel value="monthly-less" control={<Radio />} label="1-2 times a month" />
                  <FormControlLabel value="never" control={<Radio />} label="Never or nearly never" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  4. Has your snoring ever bothered other people?
                </FormLabel>
                <RadioGroup
                  value={responses.snoringBothers}
                  onChange={(e) => handleInputChange('snoringBothers', e.target.value)}
                  row
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  5. Has anyone noticed that you quit breathing during your sleep?
                </FormLabel>
                <RadioGroup
                  value={responses.snoringWitnessed}
                  onChange={(e) => handleInputChange('snoringWitnessed', e.target.value)}
                  row
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
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
      <Card elevation={2} sx={{ borderLeft: '4px solid #ed6c02' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: 'warning.main' }}>
            <Help sx={{ mr: 1 }} />
            Category 2: Daytime Sleepiness
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  6. How often do you feel tired or fatigued after your sleep?
                </FormLabel>
                <RadioGroup
                  value={responses.drowsyDaily}
                  onChange={(e) => handleInputChange('drowsyDaily', e.target.value)}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Nearly every day" />
                  <FormControlLabel value="weekly" control={<Radio />} label="3-4 times a week" />
                  <FormControlLabel value="monthly" control={<Radio />} label="1-2 times a week" />
                  <FormControlLabel value="monthly-less" control={<Radio />} label="1-2 times a month" />
                  <FormControlLabel value="no" control={<Radio />} label="Never or nearly never" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  7. During your waking time, do you feel tired, fatigued, or not up to par?
                </FormLabel>
                <RadioGroup
                  value={responses.fallAsleepSitting}
                  onChange={(e) => handleInputChange('fallAsleepSitting', e.target.value)}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Nearly every day" />
                  <FormControlLabel value="weekly" control={<Radio />} label="3-4 times a week" />
                  <FormControlLabel value="monthly" control={<Radio />} label="1-2 times a week" />
                  <FormControlLabel value="monthly-less" control={<Radio />} label="1-2 times a month" />
                  <FormControlLabel value="no" control={<Radio />} label="Never or nearly never" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  8. Have you ever nodded off or fallen asleep while driving a vehicle?
                </FormLabel>
                <RadioGroup
                  value={responses.drowsyDriving}
                  onChange={(e) => handleInputChange('drowsyDriving', e.target.value)}
                  row
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
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
      <Card elevation={2} sx={{ borderLeft: '4px solid #2e7d32' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
            <Assessment sx={{ mr: 1 }} />
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
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>
                }}
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
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>
                }}
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
                  endAdornment: <InputAdornment position="end">years</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1 }}>Gender</FormLabel>
                <RadioGroup
                  value={responses.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  row
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  9. Do you have or are you being treated for high blood pressure?
                </FormLabel>
                <RadioGroup
                  value={responses.hypertension}
                  onChange={(e) => handleInputChange('hypertension', e.target.value)}
                  row
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
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
    <Box sx={{ maxWidth: '100vw', p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Hotel sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
              <Typography variant="h4" component="h1" fontWeight="bold">
                Berlin Questionnaire
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              A validated screening tool for obstructive sleep apnea (OSA) in primary care settings.
              Complete all three categories to assess your risk level.
            </Typography>

            <Grid container spacing={4}>
              {/* Questions Section */}
              <Grid item xs={12} lg={8}>
                <Box sx={{ mb: 3 }}>
                  <Category1Questions />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Category2Questions />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Category3Questions />
                </Box>
              </Grid>

              {/* Results Section */}
              <Grid item xs={12} lg={4}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                >
                  <Card elevation={3} sx={{ position: 'sticky', top: 20 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocalHospital sx={{ mr: 1 }} />
                        Assessment Results
                      </Typography>

                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12}>
                          <Paper elevation={0} sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                            <Typography variant="body2" gutterBottom>Category 1 Score</Typography>
                            <Typography variant="h4" fontWeight="bold">
                              {results.category1Score}/5
                            </Typography>
                            <Typography variant="caption">
                              {results.category1Score >= 2 ? 'Positive' : 'Negative'}
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12}>
                          <Paper elevation={0} sx={{ p: 2, bgcolor: 'warning.light', color: 'warning.contrastText' }}>
                            <Typography variant="body2" gutterBottom>Category 2 Score</Typography>
                            <Typography variant="h4" fontWeight="bold">
                              {results.category2Score}/3
                            </Typography>
                            <Typography variant="caption">
                              {results.category2Score >= 2 ? 'Positive' : 'Negative'}
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12}>
                          <Paper elevation={0} sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
                            <Typography variant="body2" gutterBottom>Category 3 Score</Typography>
                            <Typography variant="h4" fontWeight="bold">
                              {results.category3Score}/2
                            </Typography>
                            <Typography variant="caption">
                              {results.category3Score >= 1 ? 'Positive' : 'Negative'}
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Chip
                          label={getRiskText(results.riskLevel)}
                          color={getRiskColor(results.riskLevel)}
                          icon={results.riskLevel === 'high' ? <Warning /> : <CheckCircle />}
                          size="large"
                          sx={{ mb: 2 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {results.categoriesPositive}/3 categories positive
                        </Typography>
                      </Box>

                      <Alert severity={results.riskLevel === 'high' ? "warning" : "success"} sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          {results.riskLevel === 'high' 
                            ? "High risk for OSA. Consider sleep study referral."
                            : "Low risk for OSA based on current responses."
                          }
                        </Typography>
                      </Alert>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Clinical Information */}
            <Card elevation={1}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Info sx={{ mr: 1 }} />
                  Clinical Information & Validation
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Alert severity="info">
                      <Typography variant="subtitle2" gutterBottom>Scoring Criteria</Typography>
                      <Typography variant="body2">
                        • Category 1: ≥2 positive responses<br/>
                        • Category 2: ≥2 positive responses<br/>
                        • Category 3: BMI >30 kg/m² or hypertension<br/>
                        • High Risk: ≥2 categories positive
                      </Typography>
                    </Alert>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Alert severity="success">
                      <Typography variant="subtitle2" gutterBottom>Validation Data</Typography>
                      <Typography variant="body2">
                        • Sensitivity: 76.8% (95% CI: 68-86%)<br/>
                        • Specificity: 74.5% (95% CI: 65-84%)<br/>
                        • Validated in primary care settings<br/>
                        • AHI ≥5: 86% sensitivity, 77% specificity
                      </Typography>
                    </Alert>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Alert severity="warning">
                      <Typography variant="subtitle2" gutterBottom>Clinical Recommendations</Typography>
                      <Typography variant="body2">
                        • High risk: Consider sleep study referral<br/>
                        • Evaluate for cardiovascular comorbidities<br/>
                        • Sleep hygiene counseling<br/>
                        • Follow-up in 3-6 months if low risk
                      </Typography>
                    </Alert>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Box sx={{ mt: 3 }}>
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Disclaimer:</strong> The Berlin Questionnaire is a screening tool and cannot diagnose OSA. 
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