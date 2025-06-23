import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert, Switch, FormControlLabel } from "@mui/material";

const PreeclampsiaRisk = () => {
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("");
  const [systolicBP, setSystolicBP] = useState("");
  const [diastolicBP, setDiastolicBP] = useState("");
  const [hasHistory, setHasHistory] = useState(false);
  const [multiplePregnancy, setMultiplePregnancy] = useState(false);
  const [risk, setRisk] = useState(null);

  const calculateRisk = () => {
    const parsedAge = parseFloat(age);
    const parsedBmi = parseFloat(bmi);
    const parsedSystolicBP = parseFloat(systolicBP);
    const parsedDiastolicBP = parseFloat(diastolicBP);

    // Validate inputs
    if (
      isNaN(parsedAge) ||
      isNaN(parsedBmi) ||
      isNaN(parsedSystolicBP) ||
      isNaN(parsedDiastolicBP)
    ) {
      setRisk(
        <Alert severity="error">Please enter valid numeric values for all parameters.</Alert>
      );
      return;
    }

    // Risk calculation logic based on some common factors
    let riskScore = 0;

    // Age > 35 years adds risk
    if (parsedAge > 35) riskScore += 2;

    // BMI >= 30 adds risk
    if (parsedBmi >= 30) riskScore += 2;

    // High blood pressure (Systolic >= 140 or Diastolic >= 90) adds risk
    if (parsedSystolicBP >= 140 || parsedDiastolicBP >= 90) riskScore += 3;

    // History of preeclampsia adds risk
    if (hasHistory) riskScore += 4;

    // Multiple pregnancy adds risk
    if (multiplePregnancy) riskScore += 5;

    // Determine risk level
    if (riskScore >= 8) {
      setRisk(
        <Alert severity="warning">High Risk</Alert>
      );
    } else if (riskScore >= 4) {
      setRisk(
        <Alert severity="info">Moderate Risk</Alert>
      );
    } else {
      setRisk(
        <Alert severity="success">Low Risk</Alert>
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Preeclampsia Risk Calculator
      </Typography>

      {/* Input for Age */}
      <TextField
        fullWidth
        label="Age (years)"
        variant="outlined"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Enter age"
        sx={{ mb: 2 }}
      />

      {/* Input for BMI */}
      <TextField
        fullWidth
        label="BMI (kg/m²)"
        variant="outlined"
        type="number"
        value={bmi}
        onChange={(e) => setBmi(e.target.value)}
        placeholder="Enter BMI"
        sx={{ mb: 2 }}
      />

      {/* Input for Systolic Blood Pressure */}
      <TextField
        fullWidth
        label="Systolic Blood Pressure (mmHg)"
        variant="outlined"
        type="number"
        value={systolicBP}
        onChange={(e) => setSystolicBP(e.target.value)}
        placeholder="Enter systolic BP"
        sx={{ mb: 2 }}
      />

      {/* Input for Diastolic Blood Pressure */}
      <TextField
        fullWidth
        label="Diastolic Blood Pressure (mmHg)"
        variant="outlined"
        type="number"
        value={diastolicBP}
        onChange={(e) => setDiastolicBP(e.target.value)}
        placeholder="Enter diastolic BP"
        sx={{ mb: 2 }}
      />

      {/* History of Preeclampsia */}
      <FormControlLabel
        control={<Switch checked={hasHistory} onChange={() => setHasHistory(!hasHistory)} />}
        label="History of Preeclampsia"
        sx={{ mb: 2 }}
      />

      {/* Multiple Pregnancy */}
      <FormControlLabel
        control={<Switch checked={multiplePregnancy} onChange={() => setMultiplePregnancy(!multiplePregnancy)} />}
        label="Multiple Pregnancy"
        sx={{ mb: 2 }}
      />

      {/* Calculate Button */}
      <Button variant="contained" color="primary" fullWidth onClick={calculateRisk} sx={{ mb: 3 }}>
        Calculate Risk
      </Button>

      {/* Display the result */}
      {risk && (
        <Box sx={{ mt: 2 }}>
          {risk}
        </Box>
      )}
    </Box>
  );
};

export default PreeclampsiaRisk;