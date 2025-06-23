import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { Calculator } from "lucide-react";

const HELLPSyndromeRisk = () => {
  const [plateletCount, setPlateletCount] = useState("");
  const [astLevel, setAstLevel] = useState("");
  const [altLevel, setAltLevel] = useState("");
  const [ldhLevel, setLdhLevel] = useState("");
  const [risk, setRisk] = useState(null);

  const calculateRisk = () => {
    const parsedPlateletCount = parseFloat(plateletCount);
    const parsedAstLevel = parseFloat(astLevel);
    const parsedAltLevel = parseFloat(altLevel);
    const parsedLdhLevel = parseFloat(ldhLevel);

    // Validate inputs
    if (
      isNaN(parsedPlateletCount) ||
      isNaN(parsedAstLevel) ||
      isNaN(parsedAltLevel) ||
      isNaN(parsedLdhLevel)
    ) {
      setRisk(
        <Alert severity="error">Please enter valid numeric values for all parameters.</Alert>
      );
      return;
    }

    // Risk calculation logic based on common HELLP syndrome criteria
    let riskScore = 0;

    // Platelet count < 100,000/mm³ adds significant risk
    if (parsedPlateletCount < 100000) riskScore += 3;

    // AST > 70 IU/L or ALT > 70 IU/L adds risk
    if (parsedAstLevel > 70 || parsedAltLevel > 70) riskScore += 2;

    // LDH > 600 IU/L adds risk
    if (parsedLdhLevel > 600) riskScore += 2;

    // Determine risk level
    if (riskScore >= 5) {
      setRisk(
        <Alert severity="warning">High Risk for HELLP Syndrome</Alert>
      );
    } else if (riskScore >= 3) {
      setRisk(
        <Alert severity="info">Moderate Risk for HELLP Syndrome</Alert>
      );
    } else {
      setRisk(
        <Alert severity="success">Low Risk for HELLP Syndrome</Alert>
      );
    }
  };

  return (
    <Box
      className="p-8 bg-white shadow-lg rounded-lg"
      sx={{ maxWidth: 600, mx: "auto" }}
    >
      <Box className="text-center mb-6">
        <Calculator className="mx-auto mb-2 text-blue-500" size={48} />
        <Typography variant="h4" className="font-bold">
          HELLP Syndrome Risk Calculator
        </Typography>
      </Box>

      {/* Input for Platelet Count */}
      <Box className="mb-4">
        <TextField
          fullWidth
          label="Platelet Count (per mm³)"
          variant="outlined"
          type="number"
          value={plateletCount}
          onChange={(e) => setPlateletCount(e.target.value)}
          placeholder="Enter platelet count"
        />
      </Box>

      {/* Input for AST */}
      <Box className="mb-4">
        <TextField
          fullWidth
          label="AST Level (IU/L)"
          variant="outlined"
          type="number"
          value={astLevel}
          onChange={(e) => setAstLevel(e.target.value)}
          placeholder="Enter AST level"
        />
      </Box>

      {/* Input for ALT */}
      <Box className="mb-4">
        <TextField
          fullWidth
          label="ALT Level (IU/L)"
          variant="outlined"
          type="number"
          value={altLevel}
          onChange={(e) => setAltLevel(e.target.value)}
          placeholder="Enter ALT level"
        />
      </Box>

      {/* Input for LDH */}
      <Box className="mb-4">
        <TextField
          fullWidth
          label="LDH Level (IU/L)"
          variant="outlined"
          type="number"
          value={ldhLevel}
          onChange={(e) => setLdhLevel(e.target.value)}
          placeholder="Enter LDH level"
        />
      </Box>

      {/* Calculate Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={calculateRisk}
        className="my-4"
      >
        Calculate Risk
      </Button>

      {/* Display the result */}
      {risk && (
        <Box className="mt-6">
          {risk}
        </Box>
      )}
    </Box>
  );
};

export default HELLPSyndromeRisk;