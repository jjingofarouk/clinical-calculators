import React, { useState, useCallback } from 'react';
import { Button, Card, TextField, Typography, Box, List, ListItem, ListItemText, Dialog, DialogContent, DialogTitle, Chip, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { LineChart } from 'recharts';
import { AlertTriangle } from 'lucide-react';

const CRITICAL_VALUES = {
  sodium: { low: 120, high: 155 },
  potassium: { low: 2.5, high: 6.5 },
  calcium: { low: 7.0, high: 11.0 },
  magnesium: { low: 1.0, high: 3.0 },
  phosphate: { low: 1.0, high: 7.0 },
};

// Helper functions for calculations
const calculateCorrectedCalcium = (calcium, albumin) => {
  const normalAlbumin = 4.0;
  return calcium + 0.8 * (normalAlbumin - albumin);
};

const getSeverity = (electrolyte, value, type) => {
  const range = CRITICAL_VALUES[electrolyte];
  if (!range) return 'Unknown';
  return type === 'low' 
    ? value <= range.low ? 'Critical' : 'Mild'
    : value >= range.high ? 'Critical' : 'Mild';
};

const getAcidBaseContext = (values) => {
  const { pH, pCO2, bicarbonate } = values;
  if (!pH || !pCO2 || !bicarbonate) return 'Insufficient data for acid-base assessment';
  if (pH < 7.35) {
    if (bicarbonate < 22) return 'Metabolic acidosis';
    if (pCO2 > 45) return 'Respiratory acidosis';
  } else if (pH > 7.45) {
    if (bicarbonate > 26) return 'Metabolic alkalosis';
    if (pCO2 < 35) return 'Respiratory alkalosis';
  }
  return 'Normal acid-base status';
};

const getHyponatremiaProtocol = (severity, values) => {
  const baseProtocol = {
    title: 'Hyponatremia Management',
    actions: [
      'Check serum osmolality',
      'Assess volume status',
      'Monitor sodium correction rate (not to exceed 8 mEq/L/24h)',
      'Check TSH and cortisol levels'
    ]
  };
  if (severity === 'Critical') {
    baseProtocol.actions.push(
      'Immediate 3% hypertonic saline bolus',
      'Target correction rate: 6-8 mEq/L in first 24h',
      'Frequent neurological checks',
      'Q2h sodium monitoring initially',
      'Consider ICU admission'
    );
  } else if (severity === 'Moderate') {
    baseProtocol.actions.push(
      'Consider 3% hypertonic saline if symptomatic',
      'Fluid restrict to <1L/day',
      'Daily sodium monitoring',
      'Evaluate for underlying cause'
    );
  } else {
    baseProtocol.actions.push(
      'Fluid restriction if appropriate',
      'Address underlying cause',
      'Monitor sodium daily',
      'Consider endocrine consultation'
    );
  }
  return [baseProtocol];
};

const getHypernatremiaProtocol = (severity, values) => {
  return [{
    title: 'Hypernatremia Management',
    actions: [
      'Assess volume status',
      'Calculate free water deficit',
      severity === 'Critical' ? 'Begin immediate free water replacement' : 'Start oral water intake if possible',
      'Monitor sodium correction rate (not to exceed 8 mEq/L/24h)',
      'Identify and treat underlying cause',
    ]
  }];
};

const getHypokalemiaProtocol = (severity, values) => {
  return [{
    title: 'Hypokalemia Management',
    actions: [
      'Obtain ECG',
      'Check magnesium level',
      severity === 'Critical' ? 'Consider IV potassium replacement' : 'Start oral potassium supplementation',
      'Monitor renal function',
      'Assess for underlying causes (diuretics, GI losses)',
    ]
  }];
};

const getHyperkalemiaProtocol = (severity, values) => {
  return [{
    title: 'Hyperkalemia Management',
    actions: [
      'Obtain immediate ECG',
      severity === 'Critical' ? 'Give calcium gluconate if ECG changes present' : 'Consider potassium binders',
      'Implement insulin/glucose protocol if needed',
      'Consider albuterol nebulizer',
      'Assess for acute kidney injury',
    ]
  }];
};

const ElectrolyteCalculator = () => {
  const [values, setValues] = useState({
    sodium: '', potassium: '', chloride: '', bicarbonate: '',
    calcium: '', ionizedCalcium: '', magnesium: '', phosphate: '',
    albumin: '', glucose: '', bun: '', creatinine: '', pH: '', pCO2: ''
  });
  const [historicalData, setHistoricalData] = useState([]);
  const [showTrendModal, setShowTrendModal] = useState(false);
  const [results, setResults] = useState({
    basicMetrics: { anionGap: null, correctedSodium: null, correctedCalcium: null, deltaGap: null },
    advancedMetrics: { serumOsmolality: null, calculatedOsmolality: null, osmolarGap: null, winterFormula: null, expectedpCO2: null },
    renalMetrics: { feneNa: null, feneK: null, transTubularKGradient: null },
    clinicalAssessment: [],
    recommendations: [],
    alerts: [],
  });
  const [alert, setAlert] = useState(null);

  const referenceRanges = {
    sodium: { min: 135, max: 145, unit: 'mEq/L', criticalLow: 120, criticalHigh: 160, context: 'Critical for neural function and fluid balance' },
    potassium: { min: 3.5, max: 5.0, unit: 'mEq/L', criticalLow: 2.5, criticalHigh: 6.5, context: 'Essential for cardiac function' },
    chloride: { min: 96, max: 106, unit: 'mEq/L', context: 'Important for acid-base balance' },
    bicarbonate: { min: 22, max: 29, unit: 'mEq/L', context: 'Key indicator of metabolic acid-base status' },
    calcium: { min: 8.5, max: 10.5, unit: 'mg/dL', context: 'Critical for neuromuscular function' },
    ionizedCalcium: { min: 1.16, max: 1.32, unit: 'mmol/L', context: 'Physiologically active calcium' },
    magnesium: { min: 1.7, max: 2.2, unit: 'mg/dL', context: 'Essential for enzyme function' },
    phosphate: { min: 2.5, max: 4.5, unit: 'mg/dL', context: 'Important for cellular energy' },
    albumin: { min: 3.5, max: 5.0, unit: 'g/dL', context: 'Affects calcium interpretation' },
    pH: { min: 7.35, max: 7.45, unit: '', context: 'Critical for acid-base assessment' },
    glucose: { min: 70, max: 100, unit: 'mg/dL', context: 'Affects sodium interpretation' },
    bun: { min: 7, max: 20, unit: 'mg/dL', context: 'Renal function indicator' },
    creatinine: { min: 0.6, max: 1.2, unit: 'mg/dL', context: 'Renal function marker' },
    pCO2: { min: 35, max: 45, unit: 'mmHg', context: 'Respiratory component of acid-base' }
  };

  const calculateResults = useCallback(() => {
    const v = Object.keys(values).reduce((acc, key) => {
      acc[key] = parseFloat(values[key]) || 0;
      return acc;
    }, {});

    const anionGap = v.sodium - (v.chloride + v.bicarbonate);
    const correctedSodium = v.sodium + (1.6 * ((v.glucose - 100) / 100));
    const correctedCalcium = calculateCorrectedCalcium(v.calcium, v.albumin);
    const calculatedOsmolality = (2 * v.sodium) + (v.glucose / 18) + (v.bun / 2.8);
    const serumOsmolality = v.serumOsmolality || calculatedOsmolality;
    const osmolarGap = Math.abs(serumOsmolality - calculatedOsmolality);
    const expectedpCO2 = (1.5 * v.bicarbonate) + 8;
    const winterFormula = v.pCO2 - expectedpCO2;

    let clinicalAssessment = [];
    let recommendations = [];

    if (v.sodium < referenceRanges.sodium.min) {
      const severity = getSeverity('sodium', v.sodium, 'low');
      clinicalAssessment.push({
        condition: 'Hyponatremia',
        severity,
        details: `Sodium: ${v.sodium} mEq/L`
      });
      recommendations.push(...getHyponatremiaProtocol(severity, v));
    } else if (v.sodium > referenceRanges.sodium.max) {
      const severity = getSeverity('sodium', v.sodium, 'high');
      clinicalAssessment.push({
        condition: 'Hypernatremia',
        severity,
        details: `Sodium: ${v.sodium} mEq/L`
      });
      recommendations.push(...getHypernatremiaProtocol(severity, v));
    }

    if (v.potassium < referenceRanges.potassium.min) {
      const severity = getSeverity('potassium', v.potassium, 'low');
      clinicalAssessment.push({
        condition: 'Hypokalemia',
        severity,
        details: `Potassium: ${v.potassium} mEq/L`
      });
      recommendations.push(...getHypokalemiaProtocol(severity, v));
    } else if (v.potassium > referenceRanges.potassium.max) {
      const severity = getSeverity('potassium', v.potassium, 'high');
      clinicalAssessment.push({
        condition: 'Hyperkalemia',
        severity,
        details: `Potassium: ${v.potassium} mEq/L`,
        urgency: v.potassium > referenceRanges.potassium.criticalHigh ? 'IMMEDIATE ECG' : 'Urgent'
      });
      recommendations.push(...getHyperkalemiaProtocol(severity, v));
    }

    const newHistoricalData = [
      ...historicalData,
      { date: new Date().toLocaleDateString(), sodium: v.sodium || 0 }
    ];
    setHistoricalData(newHistoricalData);

    setResults({
      basicMetrics: { anionGap, correctedSodium, correctedCalcium, deltaGap: null },
      advancedMetrics: { serumOsmolality, calculatedOsmolality, osmolarGap, winterFormula, expectedpCO2 },
      renalMetrics: { feneNa: null, feneK: null, transTubularKGradient: null },
      clinicalAssessment,
      recommendations,
      alerts: [],
    });

    Object.entries(CRITICAL_VALUES).forEach(([electrolyte, ranges]) => {
      const value = parseFloat(values[electrolyte]);
      if (value && (value < ranges.low || value > ranges.high)) {
        setAlert(`Critical ${electrolyte} value detected: ${value} ${referenceRanges[electrolyte].unit}`);
      }
    });
  }, [values, historicalData]);

  const handleInputChange = (name, value) => {
    if (value && !/^\d*\.?\d*$/.test(value)) return;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const renderInput = (name, placeholder) => {
    const range = referenceRanges[name];
    const value = parseFloat(values[name]);
    const isOutOfRange = value && (value < range.min || value > range.max);

    return (
      <Box className="mb-4">
        <Box className="flex justify-between items-center mb-1">
          <Typography variant="subtitle2">{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
          <Typography variant="caption" className="text-gray-500 italic">{range.unit}</Typography>
        </Box>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={`${range.min} - ${range.max}`}
          value={values[name]}
          onChange={(e) => handleInputChange(name, e.target.value)}
          type="number"
          size="small"
          error={isOutOfRange}
          sx={isOutOfRange ? { '& .MuiOutlinedInput-root': { borderColor: '#E74C3C' } } : {}}
        />
        <Typography variant="caption" className="text-gray-500 mt-1">{range.context}</Typography>
      </Box>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-6 bg-blue-900">
          <Typography variant="h4" className="text-center font-bold text-white mb-2">
            Clinical Electrolyte Analysis
          </Typography>
          <Typography variant="subtitle2" className="text-center text-blue-200 mb-6">
            Advanced Medical Decision Support
          </Typography>

          <Box className="space-y-6">
            <Card className="p-4">
              <Typography variant="h6" className="font-bold mb-4">Basic Electrolytes</Typography>
              {['sodium', 'potassium', 'chloride', 'bicarbonate'].map(key => renderInput(key))}
            </Card>

            <Card className="p-4">
              <Typography variant="h6" className="font-bold mb-4">Calcium & Minerals</Typography>
              {['calcium', 'ionizedCalcium', 'magnesium', 'phosphate'].map(key => renderInput(key))}
            </Card>

            <Card className="p-4">
              <Typography variant="h6" className="font-bold mb-4">Additional Parameters</Typography>
              {['albumin', 'glucose', 'bun', 'creatinine', 'pH', 'pCO2'].map(key => renderInput(key))}
            </Card>

            <Box className="flex gap-4">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={calculateResults}
              >
                Analyze Values
              </Button>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => setShowTrendModal(true)}
              >
                View Trends
              </Button>
            </Box>

            {alert && (
              <Alert severity="error" onClose={() => setAlert(null)} className="mt-4">
                {alert}
              </Alert>
            )}

            {results.clinicalAssessment.length > 0 && (
              <Box className="space-y-4">
                <Card className="p-4">
                  <Typography variant="h6" className="font-bold mb-2">Basic Metrics</Typography>
                  <List>
                    {Object.entries(results.basicMetrics).map(([key, value]) => (
                      value !== null && (
                        <ListItem key={key} className="py-0">
                          <ListItemText primary={`${key.replace(/([A-Z])/g, ' $1').trim()}: ${value.toFixed(1)}`} />
                        </ListItem>
                      )
                    ))}
                  </List>
                </Card>

                <Card className="p-4">
                  <Typography variant="h6" className="font-bold mb-2">Advanced Calculations</Typography>
                  <List>
                    {Object.entries(results.advancedMetrics).map(([key, value]) => (
                      value !== null && (
                        <ListItem key={key} className="py-0">
                          <ListItemText primary={`${key.replace(/([A-Z])/g, ' $1').trim()}: ${value.toFixed(1)}`} />
                        </ListItem>
                      )
                    ))}
                  </List>
                </Card>

                {results.clinicalAssessment.map((assessment, index) => (
                  <Card
                    key={index}
                    className="p-4 border-l-4"
                    sx={{ borderColor: assessment.urgency === 'IMMEDIATE ECG' ? '#E74C3C' : '#E74C3C' }}
                  >
                    <Typography variant="h6" className="text-red-600 font-bold mb-2">
                      {assessment.condition} - {assessment.severity}
                      {assessment.urgency && (
                        <span className="text-red-600"> ({assessment.urgency})</span>
                      )}
                    </Typography>
                    <Typography variant="body2" className="text-gray-700">{assessment.details}</Typography>
                  </Card>
                ))}

                {results.recommendations.map((rec, index) => (
                  <Card key={index} className="p-4 border-l-4" sx={{ borderColor: '#27AE60' }}>
                    <Typography variant="h6" className="text-green-600 font-bold mb-2">{rec.title}</Typography>
                    <List>
                      {rec.actions.map((action, actionIndex) => (
                        <ListItem key={actionIndex} className="py-0">
                          <ListItemText primary={`• ${action}`} className="text-gray-700" />
                        </ListItem>
                      ))}
                    </List>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </Card>

        <Dialog open={showTrendModal} onClose={() => setShowTrendModal(false)} maxWidth="md" fullWidth>
          <DialogTitle className="text-center text-xl font-bold">Electrolyte Trends</DialogTitle>
          <DialogContent>
            {historicalData.length > 0 ? (
              <LineChart
                width={700}
                height={300}
                data={historicalData.map(item => ({ date: item.date, sodium: item.sodium }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Line type="monotone" dataKey="sodium" stroke="#2980B9" strokeWidth={2} />
              </LineChart>
            ) : (
              <Typography className="text-center text-gray-600">No trend data available yet</Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setShowTrendModal(false)}
              className="mt-4"
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default ElectrolyteCalculator;