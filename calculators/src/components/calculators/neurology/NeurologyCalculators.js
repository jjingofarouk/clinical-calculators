import React, { useState } from 'react';
import {
  Box,
  TextField,
  Container,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import GlasgowComaScale from './GCS';
import NIHStrokeScale from './NIHStrokeScale';
import PHQ9 from './PHQ9';
import GAD7 from './GAD7';
import MMSE from './MMSE';
import MoCA from './MoCa';
import TBISeverityScore from './TBISeverityScore';
import ABCD2Score from './ABCD2Score';
import PHASESScore from './PHASESScore';
import EDSS from './EDSS';
import RanchoLosAmigos from './RanchoLosAmigos';
import EQ5D from './EQ5D';
import ApacheII from './ApacheII';

const NeurologyCalculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState('Glasgow Coma Scale');
  const [searchQuery, setSearchQuery] = useState('');

  const calculators = [
    'Glasgow Coma Scale',
    'NIH Stroke Scale',
    'APACHE II for Neurology',
    'Traumatic Brain Injury Severity Score',
    'Mini-Mental State Examination (MMSE)',
    'Montreal Cognitive Assessment (MoCA)',
    'ABCD2 Score',
    'PHQ-9',
    'GAD-7',
    'PHASES Score',
    'EDSS',
    'Rancho Los Amigos Scale',
    'EQ-5D',
  ];

  const filteredCalculators = calculators.filter((calculator) =>
    calculator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case 'Glasgow Coma Scale':
        return <GlasgowComaScale />;
      case 'NIH Stroke Scale':
        return <NIHStrokeScale />;
      case 'APACHE II for Neurology':
        return <ApacheII />;
      case 'Traumatic Brain Injury Severity Score':
        return <TBISeverityScore />;
      case 'Mini-Mental State Examination (MMSE)':
        return <MMSE />;
      case 'Montreal Cognitive Assessment (MoCA)':
        return <MoCA />;
      case 'ABCD2 Score':
        return <ABCD2Score />;
      case 'PHQ-9':
        return <PHQ9 />;
      case 'GAD-7':
        return <GAD7 />;
      case 'PHASES Score':
        return <PHASESScore />;
      case 'EDSS':
        return <EDSS />;
      case 'Rancho Los Amigos Scale':
        return <RanchoLosAmigos />;
      case 'EQ-5D':
        return <EQ5D />;
      default:
        return (
          <Typography className="text-gray-600 text-center mt-8">
            Select a calculator to get started
          </Typography>
        );
    }
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="mb-4">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search calculators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              sx: {
                borderRadius: '8px',
                bgcolor: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E5E7EB',
                },
              },
            }}
          />
        </Box>

        <Card className="mb-4 shadow-sm">
          <Tabs
            value={selectedCalculator}
            onChange={(e, newValue) => setSelectedCalculator(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              bgcolor: '#F9FAFB',
              borderBottom: 1,
              borderColor: '#E5E7EB',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 400,
                fontSize: '14px',
                color: '#1F2937',
                px: 3,
                py: 2,
                borderRadius: '12px',
                m: 1,
                bgcolor: 'white',
                border: '1px solid #E5E7EB',
                '&:hover': {
                  bgcolor: '#F5F7FA',
                },
              },
              '& .Mui-selected': {
                bgcolor: '#27C7B8',
                color: 'white !important',
                border: 'none',
                boxShadow: '0 2px 4px rgba(39, 199, 184, 0.2)',
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            {filteredCalculators.map((calculator) => (
              <Tab key={calculator} label={calculator} value={calculator} />
            ))}
          </Tabs>
        </Card>

        <Card className="shadow-sm">
          <CardContent>{renderCalculator()}</CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default NeurologyCalculators;