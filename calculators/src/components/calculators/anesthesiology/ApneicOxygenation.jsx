import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Grid,
  Alert,
  Chip,
  Divider,
  Paper,
  InputAdornment
} from '@mui/material';
import { Calculate, Air, AccessTime, Warning } from '@mui/icons-material';

const ApneicOxygenation = () => {
  const [inputs, setInputs] = useState({
    weight: '',
    age: '',
    baselineSpo2: '98',
    flowRate: '15',
    oxygenType: 'nasal',
    patientType: 'healthy'
  });

  const [results, setResults] = useState({
    recommendedFlow: 0,
    estimatedFiO2: 21,
    oxygenConsumption: 0,
    safeApneaTime: 0,
    riskLevel: 'low'
  });

  useEffect(() => {
    calculateResults();
  }, [inputs]);

  const calculateResults = () => {
    const weight = parseFloat(inputs.weight) || 70;
    const age = parseFloat(inputs.age) || 30;
    const baselineSpo2 = parseFloat(inputs.baselineSpo2) || 98;
    const flowRate = parseFloat(inputs.flowRate) || 15;

    // Calculate recommended flow based on age/weight
    let recommendedFlow;
    if (age < 1) {
      recommendedFlow = 5; // Infants
    } else if (age <= 7) {
      recommendedFlow = 10; // Young children
    } else if (age <= 18) {
      recommendedFlow = 15; // Older children
    } else {
      recommendedFlow = Math.max(15, Math.min(weight * 0.25, 70)); // Adults
    }

    // Calculate FiO2 based on flow rate
    let estimatedFiO2;
    if (inputs.oxygenType === 'nasal') {
      // Standard nasal cannula: 4% increase per L/min
      estimatedFiO2 = Math.min(21 + (flowRate * 4), 44);
    } else if (inputs.oxygenType === 'hfnc') {
      // High-flow nasal cannula can achieve higher FiO2
      estimatedFiO2 = Math.min(21 + (flowRate * 1.5), 100);
    } else {
      // Non-rebreather mask
      estimatedFiO2 = Math.min(60 + (flowRate * 2), 95);
    }

    // Calculate oxygen consumption (3 mL/kg/min baseline)
    let oxygenConsumption = weight * 3;
    if (inputs.patientType === 'septic') {
      oxygenConsumption *= 1.5; // Increased consumption in sepsis
    } else if (inputs.patientType === 'pregnant') {
      oxygenConsumption *= 1.2; // Increased consumption in pregnancy
    }

    // Calculate safe apnea time (simplified model)
    const oxygenReserve = ((baselineSpo2 - 90) / 100) * 1000; // Simplified oxygen reserve
    const netOxygenLoss = Math.max(0, oxygenConsumption - (flowRate * 10)); // Oxygen delivery vs consumption
    const safeApneaTime = netOxygenLoss > 0 ? Math.max(1, oxygenReserve / netOxygenLoss) : 15;

    // Determine risk level
    let riskLevel = 'low';
    if (baselineSpo2 < 95 || inputs.patientType !== 'healthy' || safeApneaTime < 3) {
      riskLevel = 'high';
    } else if (baselineSpo2 < 98 || safeApneaTime < 6) {
      riskLevel = 'medium';
    }

    setResults({
      recommendedFlow: Math.round(recommendedFlow),
      estimatedFiO2: Math.round(estimatedFiO2),
      oxygenConsumption: Math.round(oxygenConsumption),
      safeApneaTime: Math.round(safeApneaTime * 10) / 10,
      riskLevel
    });
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'info';
    }
  };

  const getRiskText = (level) => {
    switch (level) {
      case 'low': return 'Low Risk';
      case 'medium': return 'Medium Risk';
      case 'high': return 'High Risk';
      default: return 'Unknown';
    }
  };

  return (
    <Box sx={{ maxWidth: '100vw', p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Calculate sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Apneic Oxygenation Calculator
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Calculate optimal oxygen flow rates and estimate safe apnea duration for preoxygenation during intubation.
          </Typography>

          <Grid container spacing={3}>
            {/* Input Section */}
            <Grid item xs={12} md={6}>
              <Card elevation={1}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Air sx={{ mr: 1 }} />
                    Patient Parameters
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Weight"
                        value={inputs.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        type="number"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">kg</InputAdornment>
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Age"
                        value={inputs.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        type="number"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">years</InputAdornment>
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Baseline SpO₂"
                        value={inputs.baselineSpo2}
                        onChange={(e) => handleInputChange('baselineSpo2', e.target.value)}
                        type="number"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Oxygen Flow Rate"
                        value={inputs.flowRate}
                        onChange={(e) => handleInputChange('flowRate', e.target.value)}
                        type="number"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">L/min</InputAdornment>
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Oxygen Delivery</InputLabel>
                        <Select
                          value={inputs.oxygenType}
                          label="Oxygen Delivery"
                          onChange={(e) => handleInputChange('oxygenType', e.target.value)}
                        >
                          <MenuItem value="nasal">Nasal Cannula</MenuItem>
                          <MenuItem value="hfnc">High-Flow Nasal Cannula</MenuItem>
                          <MenuItem value="nrb">Non-Rebreather Mask</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Patient Type</InputLabel>
                        <Select
                          value={inputs.patientType}
                          label="Patient Type"
                          onChange={(e) => handleInputChange('patientType', e.target.value)}
                        >
                          <MenuItem value="healthy">Healthy Adult</MenuItem>
                          <MenuItem value="pregnant">Pregnant</MenuItem>
                          <MenuItem value="septic">Septic/Critical</MenuItem>
                          <MenuItem value="obese">Obese (BMI >30)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Results Section */}
            <Grid item xs={12} md={6}>
              <Card elevation={1}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ mr: 1 }} />
                    Calculated Results
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                        <Typography variant="body2" gutterBottom>Recommended Flow</Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {results.recommendedFlow} L/min
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
                        <Typography variant="body2" gutterBottom>Estimated FiO₂</Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {results.estimatedFiO2}%
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
                        <Typography variant="body2" gutterBottom>O₂ Consumption</Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {results.oxygenConsumption} mL/min
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
                        <Typography variant="body2" gutterBottom>Safe Apnea Time</Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {results.safeApneaTime} min
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 3 }}>
                    <Chip
                      label={getRiskText(results.riskLevel)}
                      color={getRiskColor(results.riskLevel)}
                      icon={<Warning />}
                      sx={{ mb: 2 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Clinical Guidelines */}
          <Card elevation={1}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Clinical Guidelines</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Flow Rate Guidelines</Typography>
                    <Typography variant="body2">
                      • Infants (&lt;1 year): 5 L/min<br/>
                      • Children (1-7 years): 10 L/min<br/>
                      • Children (≥8 years): 15 L/min<br/>
                      • Adults: 15-70 L/min (HFNC)
                    </Typography>
                  </Alert>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Risk Factors</Typography>
                    <Typography variant="body2">
                      • Baseline SpO₂ &lt;95%<br/>
                      • Pregnancy (↑20% O₂ consumption)<br/>
                      • Sepsis (↑50% O₂ consumption)<br/>
                      • Obesity (↓functional residual capacity)
                    </Typography>
                  </Alert>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Key Points</Typography>
                    <Typography variant="body2">
                      • O₂ consumption: ~250 mL/min during apnea<br/>
                      • HFNC at 70 L/min: ~14 min safe apnea<br/>
                      • Preoxygenation goal: SpO₂ ≥95%<br/>
                      • Monitor continuously during procedure
                    </Typography>
                  </Alert>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ mt: 3 }}>
            <Alert severity="warning">
              <Typography variant="body2">
                <strong>Disclaimer:</strong> This calculator provides estimates based on established clinical guidelines. 
                Always use clinical judgment and follow institutional protocols. Individual patient factors may significantly 
                affect actual oxygen requirements and safe apnea duration.
              </Typography>
            </Alert>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ApneicOxygenation;