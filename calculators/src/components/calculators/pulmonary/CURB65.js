import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, CardContent, Typography, TextField, Button, Switch, FormControlLabel, Modal, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const CURB65Calculator = () => {
  const [confusion, setConfusion] = useState(false);
  const [urea, setUrea] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [bloodPressure, setBloodPressure] = useState({ systolic: '', diastolic: '' });
  const [age, setAge] = useState('');
  const [score, setScore] = useState(null);
  const [showGuidance, setShowGuidance] = useState(false);

  const calculateScore = () => {
    if (!urea || !respiratoryRate || !bloodPressure.systolic || !bloodPressure.diastolic || !age) {
      alert('Please complete all fields for accurate assessment.');
      return;
    }

    const ureaValue = parseFloat(urea);
    const ureaMgDl = ureaValue * 2.8;
    const respiratoryRateValue = parseInt(respiratoryRate, 10);
    const systolicBP = parseInt(bloodPressure.systolic, 10);
    const diastolicBP = parseInt(bloodPressure.diastolic, 10);
    const ageValue = parseInt(age, 10);

    let newScore = 0;
    if (confusion) newScore += 1;
    if (ureaMgDl > 19) newScore += 1;
    if (respiratoryRateValue >= 30) newScore += 1;
    if (systolicBP < 90 || diastolicBP <= 60) newScore += 1;
    if (ageValue >= 65) newScore += 1;

    setScore(newScore);
  };

  const getRecommendations = () => {
    if (score === null) return null;

    const recommendations = {
      0: {
        risk: 'Low Risk',
        mortality: '0.6% 30-day mortality',
        disposition: 'Consider outpatient treatment',
        management: [
          'Consider oral antibiotics',
          'Ensure reliable follow-up',
          'Patient education on warning signs',
          'Follow-up within 48 hours recommended'
        ]
      },
      1: {
        risk: 'Low Risk',
        mortality: '2.7% 30-day mortality',
        disposition: 'Consider outpatient treatment with close follow-up',
        management: [
          'Consider oral antibiotics',
          'Ensure reliable follow-up',
          'Consider observation if other risk factors present',
          'Follow-up within 24-48 hours required'
        ]
      },
      2: {
        risk: 'Moderate Risk',
        mortality: '9.2% 30-day mortality',
        disposition: 'Consider short inpatient admission or observation',
        management: [
          'IV antibiotics likely needed',
          'Blood cultures before antibiotics',
          'Consider chest imaging',
          'Monitor vital signs closely'
        ]
      },
      3: {
        risk: 'High Risk',
        mortality: '14.5% 30-day mortality',
        disposition: 'Inpatient admission required',
        management: [
          'Urgent IV antibiotics required',
          'Blood cultures mandatory',
          'Consider respiratory support',
          'Regular vital sign monitoring'
        ]
      },
      4: {
        risk: 'Severe Risk',
        mortality: '40% 30-day mortality',
        disposition: 'ICU admission consideration required',
        management: [
          'Immediate IV antibiotics',
          'Possible ventilatory support',
          'Intensive monitoring',
          'Consider sepsis protocol'
        ]
      },
      5: {
        risk: 'Very Severe Risk',
        mortality: '57% 30-day mortality',
        disposition: 'ICU admission strongly recommended',
        management: [
          'Immediate critical care consultation',
          'Aggressive intervention likely needed',
          'Consider mechanical ventilation',
          'Implement sepsis protocol'
        ]
      }
    };

    return recommendations[score];
  };

  const recommendations = getRecommendations();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" className="font-bold text-gray-800">
            CURB-65 Assessment
          </Typography>
          <IconButton onClick={() => setShowGuidance(true)} color="primary">
            <InfoIcon />
          </IconButton>
        </Box>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="space-y-6">
              <Box>
                <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                  Confusion
                </Typography>
                <FormControlLabel
                  control={<Switch checked={confusion} onChange={() => setConfusion(!confusion)} />}
                  label={confusion ? 'Yes' : 'No'}
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                  Blood Urea (mmol/L)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={urea}
                  onChange={(e) => setUrea(e.target.value)}
                  placeholder="Enter value"
                  variant="outlined"
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                  Respiratory Rate (breaths/min)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={respiratoryRate}
                  onChange={(e) => setRespiratoryRate(e.target.value)}
                  placeholder="Enter value"
                  variant="outlined"
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                  Blood Pressure (mmHg)
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <TextField
                    fullWidth
                    type="number"
                    value={bloodPressure.systolic}
                    onChange={(e) => setBloodPressure(prev => ({ ...prev, systolic: e.target.value }))}
                    placeholder="Systolic"
                    variant="outlined"
                  />
                  <Typography variant="h6">/</Typography>
                  <TextField
                    fullWidth
                    type="number"
                    value={bloodPressure.diastolic}
                    onChange={(e) => setBloodPressure(prev => ({ ...prev, diastolic: e.target.value }))}
                    placeholder="Diastolic"
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                  Age (years)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter age"
                  variant="outlined"
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                onClick={calculateScore}
              >
                Calculate Score
              </Button>
            </Box>
          </CardContent>
        </Card>

        {score !== null && recommendations && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <Box textAlign="center" mb={4}>
                  <Typography variant="subtitle1" className="text-gray-600">
                    CURB-65 Score
                  </Typography>
                  <Typography variant="h3" className="font-bold text-blue-600">
                    {score}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h5" className="font-bold text-gray-800 mb-2">
                    {recommendations.risk}
                  </Typography>
                  <Typography variant="body1" className="text-red-600 mb-2">
                    {recommendations.mortality}
                  </Typography>
                  <Typography variant="body1" className="font-medium text-gray-800 mb-4">
                    {recommendations.disposition}
                  </Typography>
                  <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
                    Recommended Management:
                  </Typography>
                  {recommendations.management.map((item, index) => (
                    <Typography key={index} variant="body2" className="text-gray-600 mb-1">
                      • {item}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Modal
          open={showGuidance}
          onClose={() => setShowGuidance(false)}
          sx={{ display: 'flex', alignItems: 'flex-end' }}
        >
          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: '20px 20px 0 0',
              p: 4,
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: 24,
            }}
          >
            <Typography variant="h5" className="font-bold text-gray-800 mb-4">
              Clinical Guidance
            </Typography>
            <Typography variant="h6" className="font-medium text-gray-800 mb-2">
              When to Use
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-4">
              • Use for adult patients with suspected community-acquired pneumonia<br />
              • Best used at initial patient evaluation<br />
              • Aids in determining appropriate level of care
            </Typography>
            <Typography variant="h6" className="font-medium text-gray-800 mb-2">
              Pearls/Pitfalls
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-4">
              • Score should not override clinical judgment<br />
              • Consider additional risk factors not captured in score<br />
              • Regular reassessment is crucial<br />
              • Don't forget to assess for sepsis in high-risk patients
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setShowGuidance(false)}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </motion.div>
    </div>
  );
};

export default CURB65Calculator;