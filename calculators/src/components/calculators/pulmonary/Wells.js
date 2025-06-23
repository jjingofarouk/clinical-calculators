import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Alert,
} from "@mui/material";

const WellsScoreCalculator = () => {
  const [criteria, setCriteria] = useState({
    clinicalSigns: false,
    alternativeDiagnosis: false,
    immobilization: false,
    previousPE: false,
    heartRate: "",
    cancer: false,
    hemoptysis: false,
  });
  const [score, setScore] = useState(0);
  const [showGuidance, setShowGuidance] = useState(false);

  const calculateScore = () => {
    if (criteria.heartRate === "") {
      setScore(null);
      return <Alert severity="error">Please enter the heart rate value.</Alert>;
    }

    const heartRateValue = parseInt(criteria.heartRate, 10);
    if (isNaN(heartRateValue)) {
      setScore(null);
      return <Alert severity="error">Please enter a valid heart rate.</Alert>;
    }

    let totalScore = 0;
    totalScore += criteria.clinicalSigns ? 3 : 0;
    totalScore += criteria.alternativeDiagnosis ? 3 : 0;
    totalScore += criteria.immobilization ? 1.5 : 0;
    totalScore += criteria.previousPE ? 1.5 : 0;
    totalScore += heartRateValue > 100 ? 1.5 : 0;
    totalScore += criteria.cancer ? 1 : 0;
    totalScore += criteria.hemoptysis ? 1 : 0;

    setScore(totalScore);
    setShowGuidance(true);
  };

  const getRiskLevel = (score) => {
    if (score < 2) return { level: "Low Risk", color: "green" };
    if (score <= 6) return { level: "Moderate Risk", color: "orange" };
    return { level: "High Risk", color: "red" };
  };

  const getRecommendation = (score) => {
    if (score < 2) {
      return "Consider D-dimer testing or PERC rule to rule out PE. If D-dimer negative, consider stopping workup.";
    } else if (score <= 6) {
      return "Consider high-sensitivity D-dimer testing or CTA. If D-dimer negative, consider stopping workup.";
    }
    return "CTA recommended. D-dimer testing not recommended at this risk level.";
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      {/* Header */}
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        Wells' Criteria
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
        Pulmonary Embolism Risk Assessment
      </Typography>

      {/* Criteria Inputs */}
      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={criteria.clinicalSigns}
              onChange={() =>
                setCriteria({ ...criteria, clinicalSigns: !criteria.clinicalSigns })
              }
            />
          }
          label="Clinical Signs of DVT (+3 pts)"
        />
        <FormControlLabel
          control={
            <Switch
              checked={criteria.alternativeDiagnosis}
              onChange={() =>
                setCriteria({
                  ...criteria,
                  alternativeDiagnosis: !criteria.alternativeDiagnosis,
                })
              }
            />
          }
          label="PE is #1 Diagnosis (+3 pts)"
        />
        <TextField
          fullWidth
          label="Heart Rate (BPM)"
          variant="outlined"
          type="number"
          value={criteria.heartRate}
          onChange={(e) =>
            setCriteria({ ...criteria, heartRate: e.target.value })
          }
          sx={{ mt: 2 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={criteria.immobilization}
              onChange={() =>
                setCriteria({
                  ...criteria,
                  immobilization: !criteria.immobilization,
                })
              }
            />
          }
          label="Immobilization/Recent Surgery (+1.5 pts)"
        />
        <FormControlLabel
          control={
            <Switch
              checked={criteria.previousPE}
              onChange={() =>
                setCriteria({ ...criteria, previousPE: !criteria.previousPE })
              }
            />
          }
          label="Previous PE/DVT (+1.5 pts)"
        />
        <FormControlLabel
          control={
            <Switch
              checked={criteria.hemoptysis}
              onChange={() =>
                setCriteria({ ...criteria, hemoptysis: !criteria.hemoptysis })
              }
            />
          }
          label="Hemoptysis (+1 pt)"
        />
        <FormControlLabel
          control={
            <Switch
              checked={criteria.cancer}
              onChange={() =>
                setCriteria({ ...criteria, cancer: !criteria.cancer })
              }
            />
          }
          label="Active Cancer (+1 pt)"
        />
      </Box>

      {/* Calculate Button */}
      <Button variant="contained" color="primary" fullWidth onClick={calculateScore}>
        Calculate Score
      </Button>

      {/* Display the result */}
      {showGuidance && score !== null && (
        <Box sx={{ mt: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" align="center" sx={{ color: getRiskLevel(score).color }}>
                {getRiskLevel(score).level} ({score.toFixed(1)} pts)
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {getRecommendation(score)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default WellsScoreCalculator;