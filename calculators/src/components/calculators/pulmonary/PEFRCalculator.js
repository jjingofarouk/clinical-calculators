import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, CardContent, Typography, TextField, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';

const PEFRCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    race: '',
    actualPEFR: '',
    previousBest: '',
  });
  const [result, setResult] = useState(null);

  const calculateExpectedPEFR = () => {
    const age = parseFloat(formData.age);
    const height = parseFloat(formData.height);
    const actualPEFR = parseFloat(formData.actualPEFR);
    const previousBest = parseFloat(formData.previousBest);

    if (!age || !height || !formData.race) {
      alert('Please fill in all required fields');
      return;
    }

    let expectedPEFR;
    switch (formData.race) {
      case 'caucasian':
        expectedPEFR = (-0.0517 * age + 0.0332 * height + 2.3) * 60;
        break;
      case 'african-american':
        expectedPEFR = (-0.0517 * age + 0.0332 * height + 1.8) * 60;
        break;
      case 'mexican-american':
        expectedPEFR = (-0.0517 * age + 0.0332 * height + 2.1) * 60;
        break;
      case 'other':
        expectedPEFR = (-0.0517 * age + 0.0332 * height + 2.1) * 60;
        break;
      default:
        alert('Please select a race/ethnicity');
        return;
    }

    const pefrResult = {
      expectedPEFR: expectedPEFR.toFixed(1),
      percentage: actualPEFR ? ((actualPEFR / expectedPEFR) * 100).toFixed(1) : null,
      personalBestRatio: previousBest ? ((actualPEFR / previousBest) * 100).toFixed(1) : null,
      severity: getExacerbationSeverity(actualPEFR, previousBest),
    };

    setResult(pefrResult);
  };

  const getExacerbationSeverity = (actual, personalBest) => {
    if (!actual || !personalBest) return null;
    const percentage = (actual / personalBest) * 100;

    if (percentage >= 80) return {
      level: 'Green Zone - Well Controlled',
      description: 'Good asthma control',
      clinicalFeatures: [
        'No nighttime symptoms',
        'No activity limitation',
        'Rescue inhaler use ≤2 times/week',
        'No exacerbations'
      ],
      recommendations: [
        'Continue current treatment regimen',
        'Review inhaler technique at next visit',
        'Follow-up in 1-3 months',
        'Consider step-down if well-controlled for >3 months'
      ],
      medications: [
        'Continue prescribed controller medication',
        'PRN SABA for rescue'
      ],
      monitoring: [
        'Regular PEFR monitoring',
        'Symptom diary review',
        'Review action plan compliance'
      ],
      color: '#4CAF50'
    };

    if (percentage >= 50) return {
      level: 'Yellow Zone - Partial Control',
      description: 'Moderate exacerbation',
      clinicalFeatures: [
        'Increasing symptoms',
        'Decreased exercise tolerance',
        'Nocturnal symptoms',
        'Increased rescue inhaler use'
      ],
      recommendations: [
        'Increase ICS dose 2-4 fold',
        'Add LABA if not already prescribed',
        'Consider short course of oral corticosteroids',
        'Re-evaluate in 24-48 hours'
      ],
      medications: [
        'Increase ICS or ICS/LABA combination',
        'Prednisone 40-50mg daily for 5-7 days if needed',
        'Frequent SABA use as needed'
      ],
      monitoring: [
        'Daily PEFR measurements',
        'Follow-up in 2-7 days',
        'Monitor for deterioration'
      ],
      color: '#FFC107'
    };

    return {
      level: 'Red Zone - Severe Exacerbation',
      description: 'Severe exacerbation - Medical Alert',
      clinicalFeatures: [
        'Marked breathlessness',
        'Cannot complete sentences',
        'Use of accessory muscles',
        'Silent chest on auscultation'
      ],
      recommendations: [
        'Immediate SABA + ipratropium nebulization',
        'Systemic corticosteroids',
        'Consider IM epinephrine if anaphylaxis suspected',
        'Arrange emergency transport'
      ],
      medications: [
        'Continuous nebulized SABA/ipratropium',
        'Systemic steroids (IV methylprednisolone 60-125mg)',
        'Consider magnesium sulfate',
        'Oxygen therapy to maintain SpO2 92-95%'
      ],
      monitoring: [
        'Continuous pulse oximetry',
        'Frequent vital signs',
        'Serial PEFR measurements',
        'Consider ABG if severe'
      ],
      referral: [
        'Emergency department evaluation',
        'Consider ICU if deteriorating',
        'Pulmonology consultation',
        'Close follow-up after discharge'
      ],
      color: '#F44336'
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Typography variant="h4" className="font-bold text-gray-800 text-center mb-2">
          PEFR Clinical Assessment Tool
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600 text-center mb-8">
          Based on GINA Guidelines & NHANES III Standards
        </Typography>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="space-y-6">
              <Box>
                <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                  Age (years)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Enter age"
                  variant="outlined"
                  inputProps={{ min: 0 }}
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                  Height (cm)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  placeholder="Enter height"
                  variant="outlined"
                  inputProps={{ min: 0 }}
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                  Race/Ethnicity
                </Typography>
                <ToggleButtonGroup
                  value={formData.race}
                  exclusive
                  onChange={(e, value) => setFormData({ ...formData, race: value })}
                  sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                >
                  <ToggleButton value="caucasian">Caucasian</ToggleButton>
                  <ToggleButton value="african-american">African-American</ToggleButton>
                  <ToggleButton value="mexican-american">Mexican-American</ToggleButton>
                  <ToggleButton value="other">Other</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Box>
                <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                  Current PEFR (L/min)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.actualPEFR}
                  onChange={(e) => setFormData({ ...formData, actualPEFR: e.target.value })}
                  placeholder="Enter measured PEFR"
                  variant="outlined"
                  inputProps={{ min: 0 }}
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                  Personal Best PEFR (L/min)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.previousBest}
                  onChange={(e) => setFormData({ ...formData, previousBest: e.target.value })}
                  placeholder="Enter patient's personal best PEFR"
                  variant="outlined"
                  inputProps={{ min: 0 }}
                />
              </Box>

              <Button
                variant="contained"
                fullWidth
                className="mt-4"
                onClick={calculateExpectedPEFR}
                sx={{ background: 'linear-gradient(to right, #007AFF, #0055FF)', padding: 2 }}
              >
                Generate Clinical Assessment
              </Button>
            </Box>
          </CardContent>
        </Card>

        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <Typography variant="h6" className="font-bold text-gray-800 mb-4">
                  Clinical Assessment
                </Typography>

                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body1" className="text-gray-600">
                    Expected PEFR:
                  </Typography>
                  <Typography variant="body1" className="font-semibold text-gray-800">
                    {result.expectedPEFR} L/min
                  </Typography>
                </Box>

                {result.percentage && (
                  <>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography variant="body1" className="text-gray-600">
                        % of Predicted:
                      </Typography>
                      <Typography variant="body1" className="font-semibold text-gray-800">
                        {result.percentage}%
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography variant="body1" className="text-gray-600">
                        % of Personal Best:
                      </Typography>
                      <Typography variant="body1" className="font-semibold text-gray-800">
                        {result.personalBestRatio}%
                      </Typography>
                    </Box>

                    <Card sx={{ borderLeft: `4px solid ${result.severity.color}`, mt: 2 }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ color: result.severity.color, fontWeight: 'bold', mb: 2 }}>
                          {result.severity.level}
                        </Typography>
                        <Typography variant="body1" className="text-gray-600 mb-2">
                          {result.severity.description}
                        </Typography>

                        <Typography variant="subtitle2" className="font-medium text-gray-800 mt-4 mb-2">
                          Clinical Features
                        </Typography>
                        {result.severity.clinicalFeatures.map((feature, index) => (
                          <Typography key={index} variant="body2" className="text-gray-600 mb-1">
                            • {feature}
                          </Typography>
                        ))}

                        <Typography variant="subtitle2" className="font-medium text-gray-800 mt-4 mb-2">
                          Recommended Actions
                        </Typography>
                        {result.severity.recommendations.map((rec, index) => (
                          <Typography key={index} variant="body2" className="text-gray-600 mb-1">
                            • {rec}
                          </Typography>
                        ))}

                        <Typography variant="subtitle2" className="font-medium text-gray-800 mt-4 mb-2">
                          Medication Adjustments
                        </Typography>
                        {result.severity.medications.map((med, index) => (
                          <Typography key={index} variant="body2" className="text-gray-600 mb-1">
                            • {med}
                          </Typography>
                        ))}

                        <Typography variant="subtitle2" className="font-medium text-gray-800 mt-4 mb-2">
                          Monitoring Plan
                        </Typography>
                        {result.severity.monitoring.map((item, index) => (
                          <Typography key={index} variant="body2" className="text-gray-600 mb-1">
                            • {item}
                          </Typography>
                        ))}

                        {result.severity.referral && (
                          <>
                            <Typography variant="subtitle2" className="font-medium text-gray-800 mt-4 mb-2">
                              Referral Considerations
                            </Typography>
                            {result.severity.referral.map((item, index) => (
                              <Typography key={index} variant="body2" className="text-gray-600 mb-1">
                                • {item}
                              </Typography>
                            ))}
                          </>
                        )}
                      </CardContent>
                    </Card>

                    <Card sx={{ mt: 2, bgcolor: '#F8F9FA' }}>
                      <CardContent>
                        <Typography variant="subtitle1" className="font-bold text-gray-800 mb-2">
                          Additional Clinical Considerations
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          • Consider comorbidities (rhinitis, GERD, obesity)<br />
                          • Assess medication adherence and inhaler technique<br />
                          • Evaluate trigger factors and environmental exposures<br />
                          • Review vaccination status (flu, pneumococcal)<br />
                          • Consider biological therapy for severe asthma
                        </Typography>
                      </CardContent>
                    </Card>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PEFRCalculator;