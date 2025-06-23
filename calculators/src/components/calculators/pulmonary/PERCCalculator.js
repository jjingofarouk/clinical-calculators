import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  Card,
  CardContent,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import { Info } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import localforage from "localforage";

const PERCCalculator = () => {
  const [inputs, setInputs] = useState({
    age: "",
    heartRate: "",
    oxygenSaturation: "",
    hemoptysis: false,
    estrogenUse: false,
    priorDVTPE: false,
    recentSurgery: false,
    unilateralLegSwelling: false,
  });
  const [score, setScore] = useState(null);
  const [result, setResult] = useState("");
  const [showGuidance, setShowGuidance] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const criteriaDescriptions = {
    age: {
      title: "Age ≥50",
      description: "Patient age 50 years or older",
      scoring: "No = 0, Yes = +1",
    },
    heartRate: {
      title: "HR ≥100",
      description: "Heart rate 100 beats per minute or greater",
      scoring: "No = 0, Yes = +1",
    },
    oxygenSaturation: {
      title: "O₂ sat on room air <95%",
      description: "Oxygen saturation less than 95% on room air",
      scoring: "No = 0, Yes = +1",
    },
    unilateralLegSwelling: {
      title: "Unilateral leg swelling",
      description: "Clinical evidence of leg swelling on one side",
      scoring: "No = 0, Yes = +1",
    },
    hemoptysis: {
      title: "Hemoptysis",
      description: "Coughing up blood",
      scoring: "No = 0, Yes = +1",
    },
    recentSurgery: {
      title: "Recent surgery or trauma",
      description: "Surgery or trauma ≤4 weeks ago requiring treatment with general anesthesia",
      scoring: "No = 0, Yes = +1",
    },
    priorDVTPE: {
      title: "Prior PE or DVT",
      description: "History of previous pulmonary embolism or deep vein thrombosis",
      scoring: "No = 0, Yes = +1",
    },
    estrogenUse: {
      title: "Hormone use",
      description: "Oral contraceptives, hormone replacement or estrogenic hormones use in males or female patients",
      scoring: "No = 0, Yes = +1",
    },
  };

  const clinicalGuidance = {
    management: [
      "In low-risk patients who are not PERC negative, consider d-dimer for further evaluation.",
      "If d-dimer is negative and pre-test probability is <15%, no further testing for PE is required.",
      "If d-dimer is positive, pursue further testing such as CT-angiography or V/Q scan.",
      "For moderate or high-risk patients, PERC cannot be utilized - proceed with d-dimer or imaging based on risk.",
    ],
    criticalActions: [
      "Only apply PERC rule to patients being evaluated for PE",
      "Use PERC for low-risk patients to potentially avoid further testing",
      "Do not use PERC for moderate or high-risk patients",
      "Consider pericardial disease in patients with pleuritic complaints",
    ],
    whenToUse: [
      "Use only in patients with suspected PE",
      "Pre-test probability must be ≤15%",
      "Intended to rule out PE when no criteria are present",
    ],
    pearlsPitfalls: [
      "PERC is only valid in low-risk patients",
      "All criteria must be negative to rule out PE",
      "Cannot be used in moderate or high-risk patients",
      "Pre-test probability assessment is crucial",
    ],
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await localforage.getItem("perc_history");
      if (savedHistory) {
        setHistory(savedHistory);
      }
    } catch (error) {
      console.error("Error loading PERC history:", error);
    }
  };

  const saveHistory = async (newHistory) => {
    try {
      await localforage.setItem("perc_history", newHistory);
    } catch (error) {
      console.error("Error saving PERC history:", error);
    }
  };

  const calculatePERC = () => {
    const { age, heartRate, oxygenSaturation } = inputs;

    if (!age || !heartRate || !oxygenSaturation) {
      setError("Please complete all numeric fields before calculating PERC score.");
      return;
    }

    const numericAge = parseInt(age, 10);
    const numericHR = parseInt(heartRate, 10);
    const numericO2 = parseInt(oxygenSaturation, 10);

    if (isNaN(numericAge) || isNaN(numericHR) || isNaN(numericO2)) {
      setError("All numeric inputs must be valid numbers.");
      return;
    }

    let totalScore = 0;
    totalScore += numericAge >= 50 ? 1 : 0;
    totalScore += numericHR >= 100 ? 1 : 0;
    totalScore += numericO2 < 95 ? 1 : 0;
    totalScore += inputs.hemoptysis ? 1 : 0;
    totalScore += inputs.estrogenUse ? 1 : 0;
    totalScore += inputs.priorDVTPE ? 1 : 0;
    totalScore += inputs.recentSurgery ? 1 : 0;
    totalScore += inputs.unilateralLegSwelling ? 1 : 0;

    setScore(totalScore);
    const resultText =
      totalScore === 0
        ? "PERC Negative: PE can be safely ruled out (<2% chance of PE). No further workup needed if pre-test probability is <15%."
        : `PERC Positive: ${totalScore} criteria present. Further evaluation recommended.`;
    setResult(resultText);
    setError("");
    setShowGuidance(true);

    const newResult = {
      score: totalScore,
      date: new Date(),
      values: { ...inputs },
    };
    const newHistory = [...history, newResult].slice(-10);
    setHistory(newHistory);
    saveHistory(newHistory);
  };

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderNumericInput = (field, placeholder) => (
    <Box className="mb-4">
      <Typography className="font-semibold text-blue-800">{criteriaDescriptions[field].title}</Typography>
      <Typography className="text-gray-600 text-sm mb-2">{criteriaDescriptions[field].description}</Typography>
      <TextField
        label={placeholder}
        type="number"
        value={inputs[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className="w-full"
        placeholder={placeholder}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        size="small"
      />
      <Typography className="text-gray-500 text-xs mt-1 italic">{criteriaDescriptions[field].scoring}</Typography>
    </Box>
  );

  const renderToggle = (field) => (
    <Box className="flex justify-between items-center mb-4">
      <Box className="flex-1 mr-4">
        <Typography className="font-semibold text-blue-800">{criteriaDescriptions[field].title}</Typography>
        <Typography className="text-gray-600 text-sm">{criteriaDescriptions[field].description}</Typography>
        <Typography className="text-gray-500 text-xs italic">{criteriaDescriptions[field].scoring}</Typography>
      </Box>
      <Switch
        checked={inputs[field]}
        onChange={(e) => handleInputChange(field, e.target.checked)}
        color="primary"
      />
    </Box>
  );

  const renderGuidanceSection = (title, items) => (
    <Box className="mb-4">
      <Typography className="font-semibold text-blue-800 text-lg mb-2">{title}</Typography>
      {items.map((item, index) => (
        <Typography key={index} className="text-gray-600 text-sm mb-2 pl-4">
          • {item}
        </Typography>
      ))}
    </Box>
  );

  const renderHistoryChart = () => {
    if (history.length < 2) return null;

    const data = history.map((h, i) => ({
      name: `Test ${i + 1}`,
      score: h.score,
    }));

    return (
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            PERC Score Trend
          </Typography>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#27C7B8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box className="p-4 bg-gray-100 min-h-screen">
      <Box className="flex justify-between items-center mb-5">
        <Typography variant="h4" className="font-bold text-gray-800">
          PERC Rule Calculator
        </Typography>
        <IconButton onClick={() => setShowInfo(true)}>
          <Info size={24} className="text-teal-500" />
        </IconButton>
      </Box>
      <Typography className="text-gray-600 text-center mb-4">
        Pulmonary Embolism Rule-out Criteria: Rules out PE if no criteria are present and pre-test probability is ≤15%
      </Typography>

      <Card className="mb-4">
        <CardContent className="space-y-4">
          <Collapse in={!!error}>
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          </Collapse>
          {renderNumericInput("age", "Enter age")}
          {renderNumericInput("heartRate", "Enter heart rate")}
          {renderNumericInput("oxygenSaturation", "Enter O₂ saturation")}
          <Box className="border-t border-gray-200 my-4" />
          {renderToggle("unilateralLegSwelling")}
          {renderToggle("hemoptysis")}
          {renderToggle("recentSurgery")}
          {renderToggle("priorDVTPE")}
          {renderToggle("estrogenUse")}
          <Button
            variant="contained"
            className="w-full bg-teal-500 hover:bg-teal-600"
            onClick={calculatePERC}
          >
            Calculate PERC Score
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="mb-4">
          <CardContent>
            <Typography className="font-semibold text-blue-800 text-center mb-2">
              PERC Score: {score}/8
            </Typography>
            <Typography className="text-gray-600 text-center">{result}</Typography>
          </CardContent>
        </Card>
      )}

      {renderHistoryChart()}

      {showGuidance && (
        <Card className="mb-4">
          <CardContent>
            {renderGuidanceSection("Clinical Management", clinicalGuidance.management)}
            {renderGuidanceSection("Critical Actions", clinicalGuidance.criticalActions)}
            {renderGuidanceSection("When to Use", clinicalGuidance.whenToUse)}
            {renderGuidanceSection("Pearls & Pitfalls", clinicalGuidance.pearlsPitfalls)}
          </CardContent>
        </Card>
      )}

      <Modal open={showInfo} onClose={() => setShowInfo(false)} className="flex items-center justify-center">
        <Box className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
          <Typography variant="h6" className="font-semibold mb-4">
            About PERC Rule
          </Typography>
          <Typography className="text-gray-600 mb-4">
            The PERC (Pulmonary Embolism Rule-out Criteria) rule is a clinical decision tool used to identify low-risk patients where pulmonary embolism (PE) can be ruled out without further testing. It includes eight criteria:
            <br />
            <br />
            • Age ≥50
            <br />
            • Heart rate ≥100
            <br />
• Oxygen saturation on room air &lt;95%
            <br />
            • Unilateral leg swelling
            <br />
            • Hemoptysis
            <br />
            • Recent surgery or trauma
            <br />
            • Prior PE or DVT
            <br />
            • Hormone use
            <br />
            <br />
            <strong>Interpretation:</strong>
            <br />
            • Score = 0: PE can be ruled out if pre-test probability is ≤15% (PERC negative).
            <br />
            • Score ≥1: Further evaluation (e.g., d-dimer, imaging) is recommended.
            <br />
            <br />
            <strong>Limitations:</strong>
            <br />
            • Only valid for low-risk patients (pre-test probability ≤15%).
            <br />
            • Not applicable for moderate or high-risk patients.
            <br />
            • Requires accurate clinical assessment.
          </Typography>
          <Button
            variant="contained"
            className="w-full bg-teal-500 hover:bg-teal-600"
            onClick={() => setShowInfo(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default PERCCalculator;