import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const GestationalAgeCalculator = () => {
  const [lmp, setLmp] = useState(null);
  const [maternalAge, setMaternalAge] = useState('');
  const [parity, setParity] = useState('');
  const [previousCSection, setPreviousCSection] = useState(false);
  const [hiv, setHiv] = useState('unknown');
  const [results, setResults] = useState(null);

  const calculateDates = () => {
    if (!lmp) return;

    const today = new Date();
    const gestationalDays = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
    const gestationalWeeks = Math.floor(gestationalDays / 7);
    const remainingDays = gestationalDays % 7;

    const edd = new Date(lmp);
    edd.setDate(edd.getDate() + 280);

    const risks = [];
    const age = parseInt(maternalAge);
    if (maternalAge && (age < 18 || age > 35)) {
      risks.push('Age-related risk - Requires additional monitoring');
    }
    if (parity && parseInt(parity) > 4) {
      risks.push('Grand multipara - Higher risk of complications');
    }
    if (previousCSection) {
      risks.push('Previous C-section - Plan for facility-based delivery');
    }

    let recommendedFacility = 'Health Centre III';
    if (risks.length > 0 || hiv === 'positive') {
      recommendedFacility = 'Health Centre IV or Regional Referral Hospital';
    }

    setResults({
      gestationalAge: { weeks: gestationalWeeks, days: remainingDays },
      edd,
      risks,
      recommendedFacility,
      antenatalCare: calculateANCSchedule(lmp),
      hivCare: getHIVCareGuidelines(),
    });
  };

  const calculateANCSchedule = (lmpDate) => {
    const schedule = [
      {
        visit: 1,
        timing: 'As early as possible (before 12 weeks)',
        services: [
          'Comprehensive history',
          'Blood pressure & weight',
          'HIV testing',
          'Syphilis screening',
          'Blood group & Hb',
          'Urinalysis',
          'TT vaccination',
          'Iron/Folate supplementation',
          'IPTp-SP if after quickening',
        ],
      },
      {
        visit: 2,
        timing: '20 weeks',
        date: new Date(lmpDate.getTime() + 20 * 7 * 24 * 60 * 60 * 1000),
        services: [
          'Blood pressure & weight',
          'Fundal height',
          'Fetal heart rate',
          'IPTp-SP dose',
          'Iron/Folate review',
        ],
      },
      {
        visit: 3,
        timing: '26 weeks',
        date: new Date(lmpDate.getTime() + 26 * 7 * 24 * 60 * 60 * 1000),
        services: [
          'Blood pressure & weight',
          'Fundal height',
          'Fetal heart rate',
          'IPTp-SP dose',
          'Hemoglobin test',
        ],
      },
      {
        visit: 4,
        timing: '32 weeks',
        date: new Date(lmpDate.getTime() + 32 * 7 * 24 * 60 * 60 * 1000),
        services: [
          'Blood pressure & weight',
          'Fundal height',
          'Fetal heart rate',
          'IPTp-SP dose',
          'Birth preparedness plan',
        ],
      },
      {
        visit: 5,
        timing: '36 weeks',
        date: new Date(lmpDate.getTime() + 36 * 7 * 24 * 60 * 60 * 1000),
        services: [
          'Blood pressure & weight',
          'Fundal height',
          'Fetal presentation',
          'Birth preparedness review',
          'Facility delivery planning',
        ],
      },
    ];
    return schedule;
  };

  const getHIVCareGuidelines = () => {
    if (hiv === 'positive') {
      return {
        title: 'HIV Care Guidelines',
        recommendations: [
          'Initiate or continue ART immediately',
          'Regular viral load monitoring',
          'Enhanced adherence counseling',
          'Infant prophylaxis planning',
          'Exclusive breastfeeding counseling',
          'Partner testing',
          'Referral to comprehensive care clinic',
        ],
      };
    }
    return null;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Container maxWidth="md" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-sm">
          <CardContent>
            <Typography variant="h4" className="font-bold text-center text-gray-900 mb-6">
              Pregnancy Care Calculator
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box className="mb-4">
                <Typography className="font-semibold text-gray-900 mb-2">
                  Last Menstrual Period (LMP)
                </Typography>
                <DatePicker
                  value={lmp}
                  onChange={setLmp}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      sx={{ borderRadius: '8px', bgcolor: '#F8F9FA' }}
                    />
                  )}
                />
              </Box>
            </LocalizationProvider>

            <Box className="mb-4">
              <Typography className="font-semibold text-gray-900 mb-2">
                Maternal Age
              </Typography>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                value={maternalAge}
                onChange={(e) => setMaternalAge(e.target.value)}
                placeholder="Enter age"
                InputProps={{
                  sx: { borderRadius: '8px', bgcolor: '#F8F9FA' },
                }}
              />
            </Box>

            <Box className="mb-4">
              <Typography className="font-semibold text-gray-900 mb-2">
                Parity
              </Typography>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                value={parity}
                onChange={(e) => setParity(e.target.value)}
                placeholder="Number of previous deliveries"
                InputProps={{
                  sx: { borderRadius: '8px', bgcolor: '#F8F9FA' },
                }}
              />
            </Box>

            <Box className="mb-4">
              <Typography className="font-semibold text-gray-900 mb-2">
                Previous C-Section
              </Typography>
              <RadioGroup
                row
                value={previousCSection.toString()}
                onChange={(e) => setPreviousCSection(e.target.value === 'true')}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio sx={{ color: '#74B9FF', '&.Mui-checked': { color: '#74B9FF' } }} />}
                  label={<Typography className="text-gray-900">Yes</Typography>}
                />
                <FormControlLabel
                  value="false"
                  control={<Radio sx={{ color: '#74B9FF', '&.Mui-checked': { color: '#74B9FF' } }} />}
                  label={<Typography className="text-gray-900">No</Typography>}
                />
              </RadioGroup>
            </Box>

            <Box className="mb-4">
              <Typography className="font-semibold text-gray-900 mb-2">
                HIV Status
              </Typography>
              <RadioGroup
                row
                value={hiv}
                onChange={(e) => setHiv(e.target.value)}
              >
                <FormControlLabel
                  value="positive"
                  control={<Radio sx={{ color: '#74B9FF', '&.Mui-checked': { color: '#74B9FF' } }} />}
                  label={<Typography className="text-gray-900">Positive</Typography>}
                />
                <FormControlLabel
                  value="negative"
                  control={<Radio sx={{ color: '#74B9FF', '&.Mui-checked': { color: '#74B9FF' } }} />}
                  label={<Typography className="text-gray-900">Negative</Typography>}
                />
                <FormControlLabel
                  value="unknown"
                  control={<Radio sx={{ color: '#74B9FF', '&.Mui-checked': { color: '#74B9FF' } }} />}
                  label={<Typography className="text-gray-900">Unknown</Typography>}
                />
              </RadioGroup>
            </Box>

            <Button
              fullWidth
              variant="contained"
              className="bg-blue-600 text-white"
              onClick={calculateDates}
              sx={{ mt: 2, borderRadius: '8px' }}
            >
              Calculate
            </Button>

            {results && (
              <Box className="mt-6">
                <Typography className="font-bold text-gray-900 mb-2">
                  Pregnancy Information
                </Typography>
                <Divider className="mb-4" />
                <Box className="flex justify-between mb-2">
                  <Typography className="font-semibold text-gray-900">
                    Gestational Age:
                  </Typography>
                  <Typography className="text-blue-600">
                    {results.gestationalAge.weeks} weeks {results.gestationalAge.days} days
                  </Typography>
                </Box>
                <Box className="flex justify-between mb-2">
                  <Typography className="font-semibold text-gray-900">
                    Estimated Delivery Date:
                  </Typography>
                  <Typography className="text-blue-600">
                    {formatDate(results.edd)}
                  </Typography>
                </Box>

                <Typography className="font-bold text-gray-900 mt-4 mb-2">
                  Risk Assessment
                </Typography>
                <Divider className="mb-4" />
                {results.risks.length > 0 ? (
                  results.risks.map((risk, index) => (
                    <Typography key={index} className="text-red-500 mb-2">
                      {risk}
                    </Typography>
                  ))
                ) : (
                  <Typography className="text-green-500 mb-2">
                    No specific risk factors identified
                  </Typography>
                )}

                <Typography className="font-bold text-gray-900 mt-4 mb-2">
                  Recommended Facility Level
                </Typography>
                <Divider className="mb-4" />
                <Typography className="text-blue-600 mb-2">
                  {results.recommendedFacility}
                </Typography>

                <Typography className="font-bold text-gray-900 mt-4 mb-2">
                  Antenatal Care Schedule
                </Typography>
                <Divider className="mb-4" />
                {results.antenatalCare.map((visit, index) => (
                  <Box key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <Typography className="font-semibold text-gray-900 mb-1">
                      Visit {visit.visit}: {visit.timing}
                    </Typography>
                    {visit.date && (
                      <Typography className="text-blue-600 mb-1">
                        Target date: {formatDate(visit.date)}
                      </Typography>
                    )}
                    {visit.services.map((service, sIndex) => (
                      <Typography key={sIndex} className="text-gray-700">
                        • {service}
                      </Typography>
                    ))}
                  </Box>
                ))}

                {results.hivCare && (
                  <>
                    <Typography className="font-bold text-gray-900 mt-4 mb-2">
                      {results.hivCare.title}
                    </Typography>
                    <Divider className="mb-4" />
                    <Box className="p-4 bg-yellow-50 rounded-lg">
                      {results.hivCare.recommendations.map((rec, index) => (
                        <Typography key={index} className="text-gray-700">
                          • {rec}
                        </Typography>
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default GestationalAgeCalculator;