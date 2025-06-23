import React, { useState, useCallback } from 'react';
import { Box, Typography, TextField, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import Select from 'react-select';

const GlasgowBlatchfordScore = () => {
  const [formData, setFormData] = useState({
    hemoglobin: '',
    bloodUrea: '',
    systolicBP: '',
    sex: '',
    heartRate: '',
    melena: '',
    syncope: '',
    liverDisease: '',
    cardiacFailure: '',
  });

  const getRiskLevel = (score) => {
    if (score === 0) return { level: 'Very Low Risk', recommendation: 'Consider outpatient management' };
    if (score <= 3) return { level: 'Low Risk', recommendation: 'Consider early discharge with follow-up' };
    if (score <= 7) return { level: 'Moderate Risk', recommendation: 'Admit for observation and early endoscopy' };
    return { level: 'High Risk', recommendation: 'Urgent intervention required. Consider ICU admission.' };
  };

  const calculateScore = useCallback(() => {
    let score = 0;
    const { hemoglobin, bloodUrea, systolicBP, sex, heartRate, melena, syncope, liverDisease, cardiacFailure } = formData;

    const bun = parseFloat(bloodUrea);
    if (bun >= 25.0) score += 6;
    else if (bun >= 10.0) score += 3;
    else if (bun >= 6.5) score += 2;
    else if (bun >= 3.5) score += 1;

    const hb = parseFloat(hemoglobin);
    if (sex === 'male') {
      if (hb < 100) score += 6;
      else if (hb < 120) score += 1;
    } else if (sex === 'female') {
      if (hb < 100) score += 6;
      else if (hb < 110) score += 1;
    }

    const sbp = parseFloat(systolicBP);
    if (sbp < 90) score += 3;
    else if (sbp < 100) score += 2;
    else if (sbp < 110) score += 1;

    if (heartRate === 'yes') score += 1;
    if (melena === 'yes') score += 1;
    if (syncope === 'yes') score += 2;
    if (liverDisease === 'yes') score += 2;
    if (cardiacFailure === 'yes') score += 2;

    return score;
  }, [formData]);

  const getManagementGuidelines = (score) => {
    const risk = getRiskLevel(score);
    return {
      ...risk,
      immediateActions: score >= 7 ? [
        'Establish two large-bore IV lines',
        'Start fluid resuscitation',
        'Consider blood type and cross-match',
        'Urgent endoscopy within 24 hours',
        'Monitor vitals every 15-30 minutes'
      ] : [
        'Regular vital sign monitoring',
        'Consider oral intake if appropriate',
        'Schedule routine endoscopy if indicated',
        'Plan follow-up care'
      ]
    };
  };

  const yesNoOptions = [
    { label: 'No', value: 'no' },
    { label: 'Yes', value: 'yes' }
  ];

  const sexOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];

  const handleInputChange = (field, selectedOption) => {
    setFormData(prev => ({
      ...prev,
      [field]: selectedOption ? selectedOption.value : ''
    }));
  };

  const score = calculateScore();
  const management = getManagementGuidelines(score);

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      width: '208px',
      borderRadius: '8px',
      borderColor: '#dcdde1',
      backgroundColor: '#fff',
    }),
    menu: (provided) => ({
      ...provided,
      width: '208px',
    }),
  };

  return (
    <Box className="p-5 bg-gray-100 min-h-screen">
      <Box className="mb-5">
        <Typography variant="h4" className="font-bold text-gray-800">
          Glasgow-Blatchford Score (GBS)
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600">
          Upper GI Bleeding Risk Assessment
        </Typography>
      </Box>

      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            Clinical Parameters
          </Typography>
          <Box className="space-y-4">
            <Box>
              <Typography className="mb-1">Sex</Typography>
              <Select
                options={sexOptions}
                value={sexOptions.find(option => option.value === formData.sex)}
                onChange={(option) => handleInputChange('sex', option)}
                placeholder="Select sex"
                styles={selectStyles}
              />
            </Box>

            <Box>
              <TextField
                label="Hemoglobin (g/L)"
                type="number"
                value={formData.hemoglobin}
                onChange={(e) => handleInputChange('hemoglobin', { value: e.target.value })}
                className="w-52"
                placeholder="Enter hemoglobin level"
                InputLabelProps={{ shrink: true }}
                helperText="Normal range: Males 130-170, Females 120-150 g/L"
              />
            </Box>

            <Box>
              <TextField
                label="Blood Urea (mmol/L)"
                type="number"
                value={formData.bloodUrea}
                onChange={(e) => handleInputChange('bloodUrea', { value: e.target.value })}
                className="w-52"
                placeholder="Enter blood urea level"
                InputLabelProps={{ shrink: true }}
                helperText="Normal range: 3.6-7.1 mmol/L"
              />
            </Box>

            <Box>
              <TextField
                label="Systolic BP (mmHg)"
                type="number"
                value={formData.systolicBP}
                onChange={(e) => handleInputChange('systolicBP', { value: e.target.value })}
                className="w-52"
                placeholder="Enter systolic blood pressure"
                InputLabelProps={{ shrink: true }}
                helperText="Normal range: 90-140 mmHg"
              />
            </Box>

            <Box>
              <Typography className="mb-1">Heart Rate ≥100 bpm</Typography>
              <Select
                options={yesNoOptions}
                value={yesNoOptions.find(option => option.value === formData.heartRate)}
                onChange={(option) => handleInputChange('heartRate', option)}
                placeholder="Select heart rate status"
                styles={selectStyles}
              />
            </Box>

            <Box>
              <Typography className="mb-1">Melena Present</Typography>
              <Select
                options={yesNoOptions}
                value={yesNoOptions.find(option => option.value === formData.melena)}
                onChange={(option) => handleInputChange('melena', option)}
                placeholder="Select melena status"
                styles={selectStyles}
              />
            </Box>

            <Box>
              <Typography className="mb-1">Recent Syncope</Typography>
              <Select
                options={yesNoOptions}
                value={yesNoOptions.find(option => option.value === formData.syncope)}
                onChange={(option) => handleInputChange('syncope', option)}
                placeholder="Select syncope status"
                styles={selectStyles}
              />
            </Box>

            <Box>
              <Typography className="mb-1">Liver Disease History</Typography>
              <Select
                options={yesNoOptions}
                value={yesNoOptions.find(option => option.value === formData.liverDisease)}
                onChange={(option) => handleInputChange('liverDisease', option)}
                placeholder="Select liver disease status"
                styles={selectStyles}
              />
            </Box>

            <Box>
              <Typography className="mb-1">Cardiac Failure</Typography>
              <Select
                options={yesNoOptions}
                value={yesNoOptions.find(option => option.value === formData.cardiacFailure)}
                onChange={(option) => handleInputChange('cardiacFailure', option)}
                placeholder="Select cardiac failure status"
                styles={selectStyles}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">Results</Typography>
          <Typography variant="h4" className="font-bold text-gray-800 mb-2">Total Score: {score}</Typography>
          <Typography variant="h6" className="text-red-600 mb-2">Risk Level: {management.level}</Typography>
          <Typography className="text-gray-700 mb-4">Recommendation: {management.recommendation}</Typography>
          <Typography className="font-semibold mb-2">Immediate Actions:</Typography>
          <List>
            {management.immediateActions.map((action, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={`• ${action}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">Clinical Notes</Typography>
          <List>
            <ListItem disablePadding><ListItemText primary="• Score of 0 has NPV above 99% for requiring intervention" /></ListItem>
            <ListItem disablePadding><ListItemText primary="• Scores ≥7 associated with above 50% risk of requiring intervention" /></ListItem>
            <ListItem disablePadding><ListItemText primary="• Consider early endoscopy for scores above 3" /></ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GlasgowBlatchfordScore;