import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// Tailwind CSS classes are used for styling alongside Material UI components

const RockallScore = () => {
  const [clinicalData, setClinicalData] = useState({
    age: '',
    systolicBP: '',
    heartRate: '',
    comorbidities: '',
    diagnosis: '',
    stigmata: '',
  });

  const [score, setScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState('');
  const [showClinicalGuidance, setShowClinicalGuidance] = useState(false);

  const comorbidityOptions = [
    { label: 'No major comorbidity', value: 'none' },
    { label: 'Any comorbidity (except major)', value: 'minor' },
    { label: 'Renal/Liver failure or malignancy', value: 'major' },
  ];

  const diagnosisOptions = [
    { label: 'Mallory-Weiss tear', value: 'mallory-weiss' },
    { label: 'Other diagnoses', value: 'other' },
    { label: 'Upper GI malignancy', value: 'malignancy' },
  ];

  const stigmataOptions = [
    { label: 'None or dark spot only', value: 'none' },
    { label: 'Blood in upper GI tract', value: 'blood' },
    { label: 'Adherent clot', value: 'clot' },
    { label: 'Visible or spurting vessel', value: 'vessel' },
  ];

  const calculateRockallScore = () => {
    let totalScore = 0;

    const age = parseInt(clinicalData.age, 10);
    if (age >= 60 && age < 80) totalScore += 1;
    if (age >= 80) totalScore += 2;

    const sbp = parseInt(clinicalData.systolicBP, 10);
    const hr = parseInt(clinicalData.heartRate, 10);
    if (sbp >= 100 && hr >= 100) totalScore += 1;
    if (sbp < 100) totalScore += 2;

    if (clinicalData.comorbidities === 'minor') totalScore += 2;
    if (clinicalData.comorbidities === 'major') totalScore += 3;

    if (clinicalData.diagnosis === 'other') totalScore += 1;
    if (clinicalData.diagnosis === 'malignancy') totalScore += 2;

    if (['blood', 'clot', 'vessel'].includes(clinicalData.stigmata)) totalScore += 2;

    return totalScore;
  };

  const getRiskLevel = (score) => {
    if (score === 0) return { level: 'Very Low', mortality: '0%', rebleed: '4.9%' };
    if (score <= 2) return { level: 'Low', mortality: '0.2%', rebleed: '5.3%' };
    if (score <= 4) return { level: 'Moderate', mortality: '5.3%', rebleed: '14.1%' };
    return { level: 'High', mortality: '24.6%', rebleed: '24.1%' };
  };

  useEffect(() => {
    const newScore = calculateRockallScore();
    setScore(newScore);
    setRiskLevel(getRiskLevel(newScore));
  }, [clinicalData]);

  const renderInputField = (label, key, unit, placeholder) => (
    <div className="mb-4 flex items-center">
      <TextField
        className="flex-grow"
        label={label}
        variant="outlined"
        type="number"
        value={clinicalData[key]}
        onChange={(e) => setClinicalData({ ...clinicalData, [key]: e.target.value })}
        placeholder={placeholder}
      />
      {unit && <Typography className="ml-2">{unit}</Typography>}
    </div>
  );

  const renderSelectField = (label, key, options) => (
    <FormControl fullWidth className="mb-4">
      <InputLabel>{label}</InputLabel>
      <Select
        value={clinicalData[key]}
        onChange={(e) => setClinicalData({ ...clinicalData, [key]: e.target.value })}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h5" className="text-blue-600">
            Rockall Score Calculator
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600">
            Upper GI Bleeding Risk Assessment
          </Typography>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6" className="text-blue-600 mb-4">
            Clinical Parameters
          </Typography>
          {renderInputField('Age', 'age', 'years', '0-100')}
          {renderInputField('Systolic BP', 'systolicBP', 'mmHg', '60-200')}
          {renderInputField('Heart Rate', 'heartRate', 'bpm', '40-200')}
          {renderSelectField('Comorbidities', 'comorbidities', comorbidityOptions)}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6" className="text-blue-600 mb-4">
            Endoscopic Findings
          </Typography>
          {renderSelectField('Diagnosis', 'diagnosis', diagnosisOptions)}
          {renderSelectField('Stigmata of Recent Hemorrhage', 'stigmata', stigmataOptions)}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6" className="text-gray-600">
            Rockall Score
          </Typography>
          <Typography
            className={`text-white text-center p-4 rounded ${
              score <= 2 ? 'bg-green-500' : score <= 4 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          >
            {score}
          </Typography>
          <Typography variant="h6" className="text-gray-600 mt-4">
            Risk Level: {riskLevel.level}
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Mortality Risk: {riskLevel.mortality}
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Rebleeding Risk: {riskLevel.rebleed}
          </Typography>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        className="w-full mb-4"
        onClick={() => setShowClinicalGuidance(!showClinicalGuidance)}
      >
        {showClinicalGuidance ? 'Hide Clinical Guidance' : 'Show Clinical Guidance'}
      </Button>

      {showClinicalGuidance && (
        <Card className="mb-4">
          <CardContent>
            <Typography variant="h6" className="text-gray-600">
              Clinical Recommendations
            </Typography>
            <Typography variant="body2" className="text-gray-600 whitespace-pre-wrap">
              • Score 0-2: Consider outpatient management if social circumstances allow
              • Score 3-4: Consider ward admission with regular monitoring
              • Score ≥5: Consider ICU admission and urgent endoscopy
              • All patients with active bleeding should receive IV PPI therapy
              • Endoscopy should be performed within 24h for most patients
              • Consider blood transfusion if Hb below 7 g/dL (or below 8 g/dL in patients with cardiovascular disease)
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RockallScore;