import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Button,
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';

import CardiovascularCalculators from './src/components/calculators/cardiovascular/CardiovascularCalculators';
import NeurologyCalculators from './src/components/calculators/neurology/NeurologyCalculators';
import OrthopedicsCalculators from './src/components/calculators/ortho/OrthopedicsCalculators';
import ObstetricsCalculators from './src/components/calculators/obstetrics/ObstetricsCalculators';
import GastroenterologyCalculators from './src/components/calculators/git/GastroenterologyCalculators';
import PulmonaryCalculators from './src/components/calculators/pulmonary/PulmonaryCalculators';
import ICUCalculators from './src/components/calculators/icu/ICUCalculators';
import GeneralCalculators from './src/components/calculators/general/GeneralCalculators';
import NephrologyCalculators from './src/components/calculators/nephrology/NephrologyCalculators';

import {
  Calculator,
  HeartPulse,
  Brain,
  Lungs,
  Stomach,
  Baby,
  Bone,
  Droplet,
  MedicalBag,
} from 'lucide-react';

const calculatorCategories = [
  { id: 'general', label: 'General', icon: Calculator, color: '#2ECC71', component: GeneralCalculators },
  { id: 'cardiovascular', label: 'Cardiovascular', icon: HeartPulse, color: '#FF4757', component: CardiovascularCalculators },
  { id: 'neurology', label: 'Neurology', icon: Brain, color: '#5352ED', component: NeurologyCalculators },
  { id: 'pulmonary', label: 'Pulmonary', icon: Lungs, color: '#1E90FF', component: PulmonaryCalculators },
  { id: 'gastroenterology', label: 'Gastroenterology', icon: Stomach, color: '#FF6B6B', component: GastroenterologyCalculators },
  { id: 'obstetrics', label: 'Obstetrics', icon: Baby, color: '#FF9FF3', component: ObstetricsCalculators },
  { id: 'orthopedics', label: 'Orthopedics', icon: Bone, color: '#FFA502', component: OrthopedicsCalculators },
  { id: 'nephrology', label: 'Nephrology', icon: Droplet, color: '#747D8C', component: NephrologyCalculators },
  { id: 'icu', label: 'ICU', icon: MedicalBag, color: '#E74C3C', component: ICUCalculators },
];

const ClinicalCalculators = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const renderCategory = (item) => (
    <Grid item xs={12} sm={6} md={4} key={item.id}>
      <Card
        sx={{
          bgcolor: `${item.color}15`,
          textAlign: 'center',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <CardActionArea
          onClick={() => setSelectedCategory(item)}
          sx={{ p: 2 }}
        >
          <Avatar
            sx={{ bgcolor: item.color, width: 64, height: 64, margin: '0 auto' }}
          >
            <item.icon size={32} color="#FFF" />
          </Avatar>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {item.label}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}
      >
        Clinical Calculators
      </Typography>
      {selectedCategory ? (
        <Box>
          <Button
            startIcon={<ArrowLeft />}
            onClick={() => setSelectedCategory(null)}
            sx={{ mb: 3 }}
          >
            Back to Categories
          </Button>
          <selectedCategory.component />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {calculatorCategories.map(renderCategory)}
        </Grid>
      )}
    </Box>
  );
};

export default ClinicalCalculators;