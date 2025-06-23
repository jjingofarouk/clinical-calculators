import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export const MSSS = () => {
  const [motorFunction, setMotorFunction] = useState(0);
  const [cognitiveStatus, setCognitiveStatus] = useState(0);
  const [totalScore, setTotalScore] = useState(null);

  const calculateScore = () => {
    const score = motorFunction + cognitiveStatus;
    setTotalScore(score);
  };

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 400,
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        MSSS (Multiple Sclerosis)
      </Typography>

      <TextField
        label="Motor Function Score (0-6)"
        type="number"
        value={motorFunction}
        onChange={(event) => setMotorFunction(parseInt(event.target.value, 10))}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Cognitive Status Score (0-6)"
        type="number"
        value={cognitiveStatus}
        onChange={(event) => setCognitiveStatus(parseInt(event.target.value, 10))}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={calculateScore}
        sx={{ marginTop: 2 }}
      >
        Calculate Total Score
      </Button>
      {totalScore !== null && (
        <Typography
          sx={{
            marginTop: 2,
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          Total MSSS Score: {totalScore}
        </Typography>
      )}
    </Box>
  );
};