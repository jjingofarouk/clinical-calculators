import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import Select from 'react-select';
import { motion } from 'framer-motion';

const NeuroDegenerativeRisk = () => {
  const [age, setAge] = useState('40');
  const [familyHistory, setFamilyHistory] = useState('no');
  const [lifestyle, setLifestyle] = useState('healthy');
  const [risk, setRisk] = useState('');

  const calculateRisk = () => {
    let riskScore = 0;
    if (parseInt(age) > 60) riskScore += 1;
    if (familyHistory === 'yes') riskScore += 2;
    if (lifestyle === 'unhealthy') riskScore += 2;

    if (riskScore === 0) setRisk('Low Risk');
    else if (riskScore === 1) setRisk('Moderate Risk');
    else setRisk('High Risk');
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      borderColor: '#E2E8F0',
      '&:hover': { borderColor: '#004C54' },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }),
    option: (base, { isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? '#004C54' : '#FFFFFF',
      color: isSelected ? '#FFFFFF' : '#333333',
      '&:hover': {
        backgroundColor: isSelected ? '#004C54' : '#F5F7FA',
      },
    }),
  };

  const ageOptions = [
    { label: 'Under 40', value: '40' },
    { label: '40-60', value: '60' },
    { label: 'Over 60', value: '70' },
  ];

  const familyHistoryOptions = [
    { label: 'No', value: 'no' },
    { label: 'Yes', value: 'yes' },
  ];

  const lifestyleOptions = [
    { label: 'Healthy', value: 'healthy' },
    { label: 'Unhealthy', value: 'unhealthy' },
  ];

  return (
    <Container maxWidth="sm" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" className="font-bold text-center text-gray-900 mb-6">
          Neurodegenerative Disease Risk Calculator
        </Typography>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            <Typography className="font-semibold text-gray-900 mb-2">
              Age
            </Typography>
            <Select
              options={ageOptions}
              value={ageOptions.find((option) => option.value === age)}
              onChange={(option) => setAge(option.value)}
              styles={selectStyles}
              className="mb-4"
            />
          </CardContent>
        </Card>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            <Typography className="font-semibold text-gray-900 mb-2">
              Family History of Neurodegenerative Diseases
            </Typography>
            <Select
              options={familyHistoryOptions}
              value={familyHistoryOptions.find((option) => option.value === familyHistory)}
              onChange={(option) => setFamilyHistory(option.value)}
              styles={selectStyles}
              className="mb-4"
            />
          </CardContent>
        </Card>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            <Typography className="font-semibold text-gray-900 mb-2">
              Lifestyle
            </Typography>
            <Select
              options={lifestyleOptions}
              value={lifestyleOptions.find((option) => option.value === lifestyle)}
              onChange={(option) => setLifestyle(option.value)}
              styles={selectStyles}
              className="mb-4"
            />
          </CardContent>
        </Card>

        <Button
          variant="contained"
          fullWidth
          className="bg-gray-900 text-white mb-4"
          onClick={calculateRisk}
        >
          Calculate Risk
        </Button>

        {risk && (
          <Card className="shadow-sm">
            <CardContent>
              <Typography className="font-semibold text-gray-900">
                Risk Level: {risk}
              </Typography>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </Container>
  );
};

export default NeuroDegenerativeRisk;