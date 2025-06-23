import React from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Heart, Brain, Wind, Stethoscope, Baby, Bone, Droplet, Activity, Calculator } from 'lucide-react';

const categories = [
  { label: 'General', icon: Calculator, color: '#2ECC71', path: '/calculators/General', description: 'BMI, BMR, etc.' },
  { label: 'Cardiovascular', icon: Heart, color: '#FF4757', path: '/calculators/Cardiovascular', description: 'ASCVD, CHADSVASC' },
  { label: 'Neurology', icon: Brain, color: '#5352ED', path: '/calculators/Neurology', description: 'GCS, NIHSS' },
  { label: 'Pulmonary', icon: Wind, color: '#1E90FF', path: '/calculators/Pulmonary', description: 'BODE, CURB-65' },
  { label: 'Gastroenterology', icon: Stethoscope, color: '#FF6B6B', path: '/calculators/Gastroenterology', description: 'Child-Pugh, FIB-4' },
  { label: 'Obstetrics', icon: Baby, color: '#FF9FF3', path: '/calculators/Obstetrics', description: 'Due date, Bishop' },
  { label: 'Orthopedics', icon: Bone, color: '#FFA502', path: '/calculators/Orthopedics', description: 'Ottawa rules' },
  { label: 'Nephrology', icon: Droplet, color: '#747D8C', path: '/calculators/Nephrology', description: 'eGFR, KDIGO' },
  { label: 'ICU', icon: Activity, color: '#E84393', path: '/calculators/ICU', description: 'SOFA, APACHE' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box className="p-6 bg-white min-h-screen">
      <Typography variant="h4" gutterBottom className="font-bold text-gray-800">
        Clinical Calculators
      </Typography>
      <Typography variant="body1" className="mb-6 text-gray-600">
        Quickly access a range of evidence-based medical calculators by category.
      </Typography>

      <Grid container spacing={3}>
        {categories.map((cat) => (
          <Grid item xs={12} sm={6} md={4} key={cat.label}>
            <Card>
              <CardActionArea onClick={() => navigate(cat.path)}>
                <CardContent className="flex gap-4 items-center">
                  <cat.icon size={32} style={{ color: cat.color }} />
                  <Box>
                    <Typography variant="h6" className="font-semibold text-gray-800">
                      {cat.label}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {cat.description}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;