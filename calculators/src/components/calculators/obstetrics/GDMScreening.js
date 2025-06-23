import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Modal,
  IconButton,
} from '@mui/material';
import Select from 'react-select';
import { motion } from 'framer-motion';
import { Info, X } from 'lucide-react';

const GDMScreening = () => {
  const [screeningPhase, setScreeningPhase] = useState('initial');
  const [showModal, setShowModal] = useState(false);
  const [activeInfoContent, setActiveInfoContent] = useState('');
  const [patientData, setPatientData] = useState({
    gestationalAge: '',
    fastingGlucose: '',
    oneHourGlucose: '',
    twoHourGlucose: '',
    threeHourGlucose: '',
    age: '',
    bmi: '',
    ethnicity: null,
    familyHistory: false,
    previousGDM: false,
    macrosomia: false,
    pcos: false,
    preDiabetes: false,
  });
  const [result, setResult] = useState(null);

  const ethnicityOptions = [
    { label: 'Select Ethnicity', value: '' },
    { label: 'Hispanic', value: 'Hispanic' },
    { label: 'African American', value: 'African American' },
    { label: 'Native American', value: 'Native American' },
    { label: 'Asian', value: 'Asian' },
    { label: 'Pacific Islander', value: 'Pacific Islander' },
    { label: 'Other', value: 'Other' },
  ];

  const riskFactors = [
    {
      id: 'age',
      label: 'Age ≥35 years',
      type: 'number',
      info: 'Advanced maternal age is a significant risk factor for GDM',
    },
    {
      id: 'bmi',
      label: 'Pre-pregnancy BMI ≥30 kg/m²',
      type: 'number',
      info: 'Obesity significantly increases GDM risk',
    },
    {
      id: 'ethnicity',
      label: 'High-risk ethnicity',
      type: 'select',
      info: 'Certain ethnic groups have higher GDM risk',
    },
    {
      id: 'familyHistory',
      label: 'First-degree relative with diabetes',
      type: 'switch',
      info: 'Family history increases risk by 2-6 times',
    },
    {
      id: 'previousGDM',
      label: 'History of GDM in previous pregnancy',
      type: 'switch',
      info: '33-50% recurrence rate in subsequent pregnancies',
    },
    {
      id: 'macrosomia',
      label: 'Previous macrosomic baby (>4000g)',
      type: 'switch',
      info: 'Previous large baby indicates potential undiagnosed GDM',
    },
    {
      id: 'pcos',
      label: 'Polycystic ovary syndrome',
      type: 'switch',
      info: 'PCOS increases insulin resistance',
    },
    {
      id: 'preDiabetes',
      label: 'History of prediabetes',
      type: 'switch',
      info: 'Prediabetes indicates existing glucose metabolism issues',
    },
  ];

  const handleInputChange = (field, value) => {
    setPatientData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateRiskLevel = () => {
    let riskScore = 0;
    const gestAge = parseFloat(patientData.gestationalAge);

    if (parseFloat(patientData.age) >= 35) riskScore += 2;
    if (parseFloat(patientData.bmi) >= 30) riskScore += 2;
    if (patientData.familyHistory) riskScore += 2;
    if (patientData.previousGDM) riskScore += 3;
    if (patientData.macrosomia) riskScore += 2;
    if (patientData.pcos) riskScore += 1;
    if (patientData.preDiabetes) riskScore += 3;
    if (
      ['Hispanic', 'African American', 'Native American', 'Asian', 'Pacific Islander'].includes(
        patientData.ethnicity?.value
      )
    ) {
      riskScore += 2;
    }

    if (gestAge < 20) {
      return {
        risk: riskScore >= 6 ? 'High Risk - Early Screening' : 'Standard Screening',
        score: riskScore,
        recommendation: riskScore >= 6
          ? 'Recommend immediate fasting glucose or HbA1c testing'
          : 'Schedule routine screening at 24-28 weeks gestation',
        color: riskScore >= 6 ? '#FF6B6B' : '#4ECDC4',
      };
    }

    if (gestAge >= 24 && gestAge <= 28) {
      return {
        risk: 'Universal Screening Window',
        score: riskScore,
        recommendation: 'Proceed with standard two-step screening (50g GCT)',
        color: '#45B7D1',
      };
    }

    return {
      risk: 'Outside Standard Window',
      score: riskScore,
      recommendation: 'Clinical judgment required for screening timing',
      color: '#FFD93D',
    };
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      borderColor: '#E0E0E0',
      borderRadius: '8px',
      backgroundColor: '#FFFFFF',
      boxShadow: 'none',
      '&:hover': { borderColor: '#3498DB' },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }),
    option: (base, { isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? '#3498DB' : '#FFFFFF',
      color: isSelected ? '#FFFFFF' : '#2C3E50',
      '&:hover': {
        backgroundColor: isSelected ? '#3498DB' : '#F5F7FA',
      },
    }),
  };

  const renderInputField = (factor) => {
    switch (factor.type) {
      case 'number':
        return (
          <Box className="flex flex-row items-center">
            <TextField
              fullWidth
              type="number"
              variant="outlined"
              value={patientData[factor.id]}
              onChange={(e) => handleInputChange(factor.id, e.target.value)}
              placeholder={`Enter ${factor.label}`}
              InputProps={{
                sx: { borderRadius: '8px', bgcolor: '#FFFFFF' },
              }}
            />
            <IconButton onClick={() => setActiveInfoContent(factor.info) || setShowModal(true)}>
              <Info size={20} color="#3498DB" />
            </IconButton>
          </Box>
        );
      case 'select':
        return (
          <Box className="flex flex-row items-center">
            <Select
              options={ethnicityOptions}
              value={patientData.ethnicity}
              onChange={(option) => handleInputChange(factor.id, option)}
              styles={selectStyles}
              placeholder="Select Ethnicity"
              className="flex-1"
            />
            <IconButton onClick={() => setActiveInfoContent(factor.info) || setShowModal(true)}>
              <Info size={20} color="#3498DB" />
            </IconButton>
          </Box>
        );
      case 'switch':
        return (
          <Box className="flex flex-row items-center justify-between">
            <FormControlLabel
              control={
                <Switch
                  checked={patientData[factor.id]}
                  onChange={(e) => handleInputChange(factor.id, e.target.checked)}
                  sx={{
                    '& .MuiSwitch-track': {
                      bgcolor: patientData[factor.id] ? '#81b0ff' : '#767577',
                    },
                    '& .MuiSwitch-thumb': {
                      bgcolor: patientData[factor.id] ? '#f5dd4b' : '#f4f3f4',
                    },
                  }}
                />
              }
              label={<Typography className="text-gray-900">{factor.label}</Typography>}
            />
            <IconButton onClick={() => setActiveInfoContent(factor.info) || setShowModal(true)}>
              <Info size={20} color="#3498DB" />
            </IconButton>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" className="font-bold text-center text-gray-900 mb-2">
          GDM Risk Assessment
        </Typography>
        <Typography className="text-center text-gray-600 mb-6">
          Clinical Screening Tool
        </Typography>

        <Card className="shadow-sm">
          <CardContent>
            <Typography className="font-semibold text-gray-900 mb-4">
              Patient Information
            </Typography>
            <Box className="h-px bg-gray-200 mb-4" />

            {riskFactors.map((factor) => (
              <Box key={factor.id} className="mb-4">
                {factor.type !== 'select' && (
                  <Typography className="font-medium text-gray-900 mb-2">
                    {factor.label}
                  </Typography>
                )}
                {renderInputField(factor)}
              </Box>
            ))}

            <Button
              fullWidth
              variant="contained"
              className="bg-blue-600 text-white"
              onClick={() => setResult(calculateRiskLevel())}
              sx={{ mt: 2, borderRadius: '8px' }}
            >
              Calculate Risk
            </Button>

            {result && (
              <Box className="mt-4 p-4 rounded-lg" sx={{ bgcolor: `${result.color}20` }}>
                <Typography
                  variant="h6"
                  className="font-bold mb-2"
                  sx={{ color: result.color }}
                >
                  {result.risk}
                </Typography>
                <Typography className="text-gray-900 mb-2">
                  Risk Score: {result.score}
                </Typography>
                <Typography className="text-gray-700">
                  {result.recommendation}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          className="bg-white rounded-lg p-6 w-4/5 max-w-md"
          sx={{ outline: 'none' }}
        >
          <Box className="flex justify-between items-center mb-4">
            <Typography className="font-semibold text-gray-900">
              Information
            </Typography>
            <IconButton onClick={() => setShowModal(false)}>
              <X size={20} color="#2C3E50" />
            </IconButton>
          </Box>
          <Typography className="text-gray-700 mb-4">
            {activeInfoContent}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            className="bg-blue-600 text-white"
            onClick={() => setShowModal(false)}
            sx={{ borderRadius: '8px' }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default GDMScreening;