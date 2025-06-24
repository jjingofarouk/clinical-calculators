// EuroSCOREII.js
import React, { useState } from 'react';
import { TextField, Typography, Box, Select, MenuItem, Slider } from '@mui/material';
import { HeartPulse, AlertTriangle } from 'lucide-react';

const EuroSCOREII = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [extracardiacArteriopathy, setExtracardiacArteriopathy] = useState(false);
  const [poorMobility, setPoorMobility] = useState(false);
  const [previousCardiacSurgery, setPreviousCardiacSurgery] = useState(false);
  const [chronicLungDisease, setChronicLungDisease] = useState('');
  const [activeEndocarditis, setActiveEndocarditis] = useState(false);
  const [criticalPreoperativeState, setCriticalPreoperativeState] = useState(false);
  const [diabetes, setDiabetes] = useState('');
  const [nyha, setNyha] = useState('');
  const [ccs, setCcs] = useState('');
  const [lvFunction, setLvFunction] = useState('');
  const [pulmonaryHypertension, setPulmonaryHypertension] = useState('');
  const [urgency, setUrgency] = useState('');
  const [weight, setWeight] = useState('');
  const [procedure, setProcedure] = useState('');

  const calculateScore = () => {
    let score = 0;
    
    // Age
    if (age >= 60) score += (age - 60) * 0.07;
    
    // Gender
    if (gender === 'female') score += 0.22;
    
    // Renal impairment
    if (creatinine && parseFloat(creatinine) > 2.0) score += 0.64;
    
    // Other factors
    if (extracardiacArteriopathy) score += 0.43;
    if (poorMobility) score += 0.85;
    if (previousCardiacSurgery) score += 1.0;
    if (chronicLungDisease === 'moderate') score += 0.41;
    if (chronicLungDisease === 'severe') score += 0.89;
    if (activeEndocarditis) score += 0.61;
    if (criticalPreoperativeState) score += 1.13;
    
    // Cardiac factors
    if (diabetes === 'insulin') score += 0.67;
    if (nyha === 'II') score += 0.85;
    if (nyha === 'III') score += 1.10;
    if (nyha === 'IV') score += 1.35;
    if (ccs === 'IV') score += 0.39;
    if (lvFunction === 'moderate') score += 0.62;
    if (lvFunction === 'poor') score += 0.93;
    if (lvFunction === 'veryPoor') score += 1.28;
    if (pulmonaryHypertension === 'moderate') score += 0.45;
    if (pulmonaryHypertension === 'severe') score += 0.92;
    
    // Procedure factors
    if (urgency === 'urgent') score += 0.55;
    if (urgency === 'emergency') score += 1.10;
    if (urgency === 'salvage') score += 1.61;
    if (weight === 'singleNonCABG') score += 0.42;
    if (weight === 'twoProcedures') score += 0.59;
    if (weight === 'threeProcedures') score += 0.74;
    if (procedure === 'aortic') score += 0.17;
    if (procedure === 'mitral') score += 0.25;
    
    const mortality = (Math.exp(score - 5.324) / (1 + Math.exp(score - 5.324))) * 100;
    
    return {
      score: score.toFixed(2),
      mortality: mortality.toFixed(1)
    };
  };

  const { score, mortality } = calculateScore();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <HeartPulse size={20} className="inline mr-2" />
        EuroSCORE II Calculator
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Age (years)"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
        />
        
        <Select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">Select gender</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </Box>

      <Box className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Creatinine (mg/dL)"
          type="number"
          value={creatinine}
          onChange={(e) => setCreatinine(e.target.value)}
          fullWidth
        />
        
        <Select
          value={chronicLungDisease}
          onChange={(e) => setChronicLungDisease(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">Chronic lung disease</MenuItem>
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="moderate">Moderate</MenuItem>
          <MenuItem value="severe">Severe</MenuItem>
        </Select>
      </Box>

      <Box className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          value={nyha}
          onChange={(e) => setNyha(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">NYHA class</MenuItem>
          <MenuItem value="I">I</MenuItem>
          <MenuItem value="II">II</MenuItem>
          <MenuItem value="III">III</MenuItem>
          <MenuItem value="IV">IV</MenuItem>
        </Select>
        
        <Select
          value={lvFunction}
          onChange={(e) => setLvFunction(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">LV function</MenuItem>
          <MenuItem value="good">Good (>50%)</MenuItem>
          <MenuItem value="moderate">Moderate (30-50%)</MenuItem>
          <MenuItem value="poor">Poor (<30%)</MenuItem>
          <MenuItem value="veryPoor">Very poor (<20%)</MenuItem>
        </Select>
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          Logistic EuroSCORE II: {score}
        </Typography>
        <Typography variant="h6" className="text-teal-700 mt-2">
          Predicted mortality: {mortality}%
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          EuroSCORE II predicts in-hospital mortality for adult cardiac surgery.
        </Typography>
      </Box>
    </Box>
  );
};

export default EuroSCOREII;