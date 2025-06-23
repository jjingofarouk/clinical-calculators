import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Card, CardContent, Modal, IconButton } from '@mui/material';
import { Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import localforage from 'localforage';

const ReferenceRanges = {
  AST: { low: 10, high: 40, unit: "U/L" },
  ALT: { low: 7, high: 56, unit: "U/L" },
  Platelets: { low: 150, high: 450, unit: "×10⁹/L" },
};

const FIB4Calculator = () => {
  const [patientData, setPatientData] = useState({
    id: "",
    age: "",
    ast: "",
    alt: "",
    plateletCount: "",
    date: new Date(),
  });
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await localforage.getItem("fib4_history");
      if (savedHistory) {
        setHistory(savedHistory);
      }
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  const saveHistory = async (newHistory) => {
    try {
      await localforage.setItem("fib4_history", newHistory);
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  const validateInput = () => {
    const { age, ast, alt, plateletCount } = patientData;
    if (!age || !ast || !alt || !plateletCount) {
      alert("All fields are required.");
      return false;
    }
    
    const values = {
      age: parseFloat(age),
      ast: parseFloat(ast),
      alt: parseFloat(alt),
      plateletCount: parseFloat(plateletCount),
    };

    if (Object.values(values).some(val => val <= 0)) {
      alert("All values must be greater than zero.");
      return false;
    }

    if (values.age < 18 || values.age > 130) {
      alert("Age must be between 18 and 130 years.");
      return false;
    }

    return values;
  };

  const calculateFIB4 = () => {
    const values = validateInput();
    if (!values) return;

    const fib4 = (values.age * values.ast) / (values.plateletCount * Math.sqrt(values.alt));
    const newResult = {
      score: fib4.toFixed(2),
      date: new Date(),
      values: { ...values },
    };

    setResult(newResult);
    const newHistory = [...history, newResult].slice(-10);
    setHistory(newHistory);
    saveHistory(newHistory);
  };

  const interpretResult = (score) => {
    const numScore = parseFloat(score);
    if (numScore < 1.45) {
      return {
        risk: "Low Risk",
        color: "#4CAF50",
        detail: "NPV 90% for advanced fibrosis. Consider medical management.",
        action: "• Regular monitoring recommended\n• Repeat FIB-4 annually\n• Consider non-invasive monitoring",
      };
    } else if (numScore > 3.25) {
      return {
        risk: "High Risk",
        color: "#F44336",
        detail: "PPV 65% for advanced fibrosis. Consider liver biopsy.",
        action: "• Urgent hepatology referral recommended\n• Consider liver biopsy\n• Enhanced monitoring required",
      };
    } else {
      return {
        risk: "Intermediate Risk",
        color: "#FFC107",
        detail: "Indeterminate result requiring further assessment.",
        action: "• Consider additional testing (e.g., elastography)\n• More frequent monitoring\n• Hepatology consultation may be warranted",
      };
    }
  };

  const renderHistoryChart = () => {
    if (history.length < 2) return null;

    const data = history.map((h, i) => ({
      name: `Test ${i + 1}`,
      score: parseFloat(h.score),
    }));

    return (
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            FIB-4 Score Trend
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

  const isAbnormal = (value, type) => {
    const range = ReferenceRanges[type];
    const numValue = parseFloat(value);
    return numValue < range.low || numValue > range.high;
  };

  return (
    <Box className="p-4 bg-gray-100 min-h-screen">
      <Box className="flex justify-between items-center mb-5">
        <Typography variant="h4" className="font-bold text-gray-800">
          FIB-4 Score Calculator
        </Typography>
        <IconButton onClick={() => setShowInfo(true)}>
          <Info size={24} className="text-teal-500" />
        </IconButton>
      </Box>

      <Card className="mb-4">
        <CardContent className="space-y-4">
          <TextField
            label="Patient ID"
            value={patientData.id}
            onChange={(e) => setPatientData({...patientData, id: e.target.value})}
            className="w-full"
            placeholder="Enter Patient ID"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Age (years)"
            type="number"
            value={patientData.age}
            onChange={(e) => setPatientData({...patientData, age: e.target.value})}
            className="w-full"
            placeholder="Enter age"
            InputLabelProps={{ shrink: true }}
          />
          <Box>
            <TextField
              label={`AST (${ReferenceRanges.AST.unit})`}
              type="number"
              value={patientData.ast}
              onChange={(e) => setPatientData({...patientData, ast: e.target.value})}
              className="w-full"
              placeholder="Enter AST value"
              InputLabelProps={{ shrink: true }}
              error={patientData.ast && isAbnormal(patientData.ast, "AST")}
              helperText={`Normal: ${ReferenceRanges.AST.low}-${ReferenceRanges.AST.high} ${ReferenceRanges.AST.unit}`}
            />
          </Box>
          <Box>
            <TextField
              label={`ALT (${ReferenceRanges.ALT.unit})`}
              type="number"
              value={patientData.alt}
              onChange={(e) => setPatientData({...patientData, alt: e.target.value})}
              className="w-full"
              placeholder="Enter ALT value"
              InputLabelProps={{ shrink: true }}
              error={patientData.alt && isAbnormal(patientData.alt, "ALT")}
              helperText={`Normal: ${ReferenceRanges.ALT.low}-${ReferenceRanges.ALT.high} ${ReferenceRanges.ALT.unit}`}
            />
          </Box>
          <Box>
            <TextField
              label={`Platelet Count (${ReferenceRanges.Platelets.unit})`}
              type="number"
              value={patientData.plateletCount}
              onChange={(e) => setPatientData({...patientData, plateletCount: e.target.value})}
              className="w-full"
              placeholder="Enter platelet count"
              InputLabelProps={{ shrink: true }}
              error={patientData.plateletCount && isAbnormal(patientData.plateletCount, "Platelets")}
              helperText={`Normal: ${ReferenceRanges.Platelets.low}-${ReferenceRanges.Platelets.high} ${ReferenceRanges.Platelets.unit}`}
            />
          </Box>
          <Button
            variant="contained"
            className="w-full bg-teal-500 hover:bg-teal-600"
            onClick={calculateFIB4}
          >
            Calculate FIB-4 Score
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="mb-4">
          <CardContent>
            <Typography variant="h6" className="font-semibold mb-4">
              Results
            </Typography>
            <Box className="p-4 rounded-lg mb-4" style={{ backgroundColor: `${interpretResult(result.score).color}20` }}>
              <Typography className="text-gray-600 mb-1">FIB-4 Score</Typography>
              <Typography variant="h3" className="font-bold" style={{ color: interpretResult(result.score).color }}>
                {result.score}
              </Typography>
              <Typography variant="h6" className="font-semibold text-gray-600">
                {interpretResult(result.score).risk}
              </Typography>
            </Box>
            <Box className="border-t pt-4">
              <Typography className="font-semibold mb-2">Clinical Interpretation</Typography>
              <Typography className="text-gray-600 mb-4">{interpretResult(result.score).detail}</Typography>
              <Typography className="font-semibold mb-2">Recommendations</Typography>
              <Typography className="text-gray-600 whitespace-pre-line">{interpretResult(result.score).action}</Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      {renderHistoryChart()}

      <Modal
        open={showInfo}
        onClose={() => setShowInfo(false)}
        className="flex items-center justify-center"
      >
        <Box className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
          <Typography variant="h6" className="font-semibold mb-4">
            About FIB-4 Score
          </Typography>
          <Typography className="text-gray-600 mb-4">
            The FIB-4 index is a non-invasive scoring system that helps identify liver fibrosis in patients with chronic liver disease. It combines:
            {"\n\n"}• Age
            {"\n"}• AST (Aspartate Aminotransferase)
            {"\n"}• ALT (Alanine Aminotransferase)
            {"\n"}• Platelet count
            {"\n\n"}Interpretation Guidelines:
            {"\n\n"}• Score below 1.45: Low risk of advanced fibrosis
            {"\n"}• Score 1.45-3.25: Intermediate risk
            {"\n"}• Score above 3.25: High risk of advanced fibrosis
            {"\n\n"}Clinical Use:
            {"\n\n"}• Initial assessment of liver fibrosis
            {"\n"}• Monitoring disease progression
            {"\n"}• Guiding referral decisions
            {"\n\n"}Limitations:
            {"\n\n"}• Not validated in all liver diseases
            {"\n"}• May be affected by concurrent conditions
            {"\n"}• Should be interpreted in clinical context
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

export default FIB4Calculator;