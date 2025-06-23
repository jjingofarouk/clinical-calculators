import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { motion } from 'framer-motion';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const PregnancyCalculator = () => {
  const [lmp, setLmp] = useState(null);
  const [ultrasoundDate, setUltrasoundDate] = useState(null);
  const [gestationalAge, setGestationalAge] = useState('');
  const [calculationMethod, setCalculationMethod] = useState('lmp');
  const [results, setResults] = useState(null);

  const calculateDates = () => {
    let edd, gestationalAgeWeeks, firstTrimester, secondTrimester, thirdTrimester;

    if (calculationMethod === 'lmp') {
      if (!lmp) return;
      edd = new Date(lmp);
      edd.setDate(edd.getDate() + 280);

      const today = new Date();
      gestationalAgeWeeks = Math.floor((today - lmp) / (1000 * 60 * 60 * 24 * 7));
    } else {
      const ultrasoundWeeks = parseFloat(gestationalAge);
      if (isNaN(ultrasoundWeeks) || !ultrasoundDate) return;

      const daysToAdd = 280 - ultrasoundWeeks * 7;
      edd = new Date(ultrasoundDate);
      edd.setDate(edd.getDate() + daysToAdd);

      const today = new Date();
      gestationalAgeWeeks = Math.floor((today - ultrasoundDate) / (1000 * 60 * 60 * 24 * 7)) + ultrasoundWeeks;
    }

    firstTrimester = new Date(lmp || ultrasoundDate);
    firstTrimester.setDate(firstTrimester.getDate() + 84);

    secondTrimester = new Date(lmp || ultrasoundDate);
    secondTrimester.setDate(secondTrimester.getDate() + 182);

    thirdTrimester = new Date(lmp || ultrasoundDate);
    thirdTrimester.setDate(thirdTrimester.getDate() + 280);

    setResults({
      edd,
      gestationalAgeWeeks,
      firstTrimester,
      secondTrimester,
      thirdTrimester,
      importantDates: {
        anatomyScan: new Date((lmp || ultrasoundDate).getTime() + 20 * 7 * 24 * 60 * 60 * 1000),
        glucoseTest: new Date((lmp || ultrasoundDate).getTime() + 24 * 7 * 24 * 60 * 60 * 1000),
        tdap: new Date((lmp || ultrasoundDate).getTime() + 27 * 7 * 24 * 60 * 60 * 1000),
        gbs: new Date((lmp || ultrasoundDate).getTime() + 36 * 7 * 24 * 60 * 60 * 1000),
      },
    });
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
              Pregnancy Calculator
            </Typography>

            <Box className="flex justify-center mb-6">
              <ToggleButtonGroup
                value={calculationMethod}
                exclusive
                onChange={(e, value) => value && setCalculationMethod(value)}
                sx={{ bgcolor: '#F1F2F6', borderRadius: '8px' }}
              >
                <ToggleButton
                  value="lmp"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    color: '#2D3436',
                    bgcolor: calculationMethod === 'lmp' ? '#74B9FF' : 'transparent',
                    '&:hover': { bgcolor: '#E6E6FA' },
                  }}
                >
                  LMP Method
                </ToggleButton>
                <ToggleButton
                  value="ultrasound"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    color: '#2D3436',
                    bgcolor: calculationMethod === 'ultrasound' ? '#74B9FF' : 'transparent',
                    '&:hover': { bgcolor: '#E6E6FA' },
                  }}
                >
                  Ultrasound Method
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {calculationMethod === 'lmp' ? (
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
              ) : (
                <>
                  <Box className="mb-4">
                    <Typography className="font-semibold text-gray-900 mb-2">
                      Ultrasound Date
                    </Typography>
                    <DatePicker
                      value={ultrasoundDate}
                      onChange={setUltrasoundDate}
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
                  <Box className="mb-4">
                    <Typography className="font-semibold text-gray-900 mb-2">
                      Gestational Age at Ultrasound (weeks)
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      variant="outlined"
                      value={gestationalAge}
                      onChange={(e) => setGestationalAge(e.target.value)}
                      placeholder="Enter weeks (e.g. 8.5)"
                      InputProps={{
                        inputProps: { step: '0.1' },
                        sx: { borderRadius: '8px', bgcolor: '#F8F9FA' },
                      }}
                    />
                  </Box>
                </>
              )}
            </LocalizationProvider>

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
              <Box className="mt-6 p-4 bg-gray-50 rounded-lg">
                <Box className="flex justify-between border-b border-gray-200 pb-2 mb-2">
                  <Typography className="font-semibold text-gray-900">
                    Estimated Due Date:
                  </Typography>
                  <Typography className="text-blue-600 font-medium">
                    {formatDate(results.edd)}
                  </Typography>
                </Box>

                <Box className="flex justify-between border-b border-gray-200 pb-2 mb-2">
                  <Typography className="font-semibold text-gray-900">
                    Current Gestational Age:
                  </Typography>
                  <Typography className="text-blue-600 font-medium">
                    {results.gestationalAgeWeeks} weeks
                  </Typography>
                </Box>

                <Typography className="font-bold text-gray-900 mt-4 mb-2">
                  Important Dates
                </Typography>

                <Box className="flex justify-between border-b border-gray-200 pb-2 mb-2">
                  <Typography className="font-semibold text-gray-900">
                    Anatomy Scan (20w):
                  </Typography>
                  <Typography className="text-blue-600 font-medium">
                    {formatDate(results.importantDates.anatomyScan)}
                  </Typography>
                </Box>

                <Box className="flex justify-between border-b border-gray-200 pb-2 mb-2">
                  <Typography className="font-semibold text-gray-900">
                    Glucose Test (24-28w):
                  </Typography>
                  <Typography className="text-blue-600 font-medium">
                    {formatDate(results.importantDates.glucoseTest)}
                  </Typography>
                </Box>

                <Box className="flex justify-between border-b border-gray-200 pb-2 mb-2">
                  <Typography className="font-semibold text-gray-900">
                    Tdap Vaccine (27-36w):
                  </Typography>
                  <Typography className="text-blue-600 font-medium">
                    {formatDate(results.importantDates.tdap)}
                  </Typography>
                </Box>

                <Box className="flex justify-between">
                  <Typography className="font-semibold text-gray-900">
                    GBS Screen (36w):
                  </Typography>
                  <Typography className="text-blue-600 font-medium">
                    {formatDate(results.importantDates.gbs)}
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default PregnancyCalculator;