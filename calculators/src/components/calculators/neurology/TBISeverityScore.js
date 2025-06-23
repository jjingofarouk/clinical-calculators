import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Container,
} from '@mui/material';
import { motion } from 'framer-motion';

const TBISeverityScore = () => {
  const [gcs, setGcs] = useState('');
  const [lossOfConsciousness, setLossOfConsciousness] = useState(false);
  const [pta, setPta] = useState('');

  const gcsScore = parseInt(gcs) || 0;
  const ptaHours = parseInt(pta) || 0;

  const severityScore = useCallback(
    () =>
      (gcsScore >= 13 ? 1 : 0) +
      (lossOfConsciousness ? 1 : 0) +
      (ptaHours <= 24 ? 1 : 0),
    [gcsScore, lossOfConsciousness, ptaHours]
  )();

  const getSeverityDetails = useCallback(() => {
    if (severityScore === 3) {
      return { text: 'Mild TBI', color: 'success.main' };
    }
    if (severityScore === 2) {
      return { text: 'Moderate TBI', color: 'warning.main' };
    }
    return { text: 'Severe TBI', color: 'error.main' };
  }, [severityScore]);

  const handleGcsChange = useCallback((value) => {
    const numericValue = parseInt(value);
    if (value === '' || (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 15)) {
      setGcs(value);
    }
  }, []);

  const handlePtaChange = useCallback((value) => {
    const numericValue = parseInt(value);
    if (value === '' || (!isNaN(numericValue) && numericValue >= 0)) {
      setPta(value);
    }
  }, []);

  const severityDetails = getSeverityDetails();

  return (
    <Container maxWidth="md" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" className="font-bold text-center text-gray-900 mb-6">
          TBI Severity Assessment
        </Typography>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            <Typography className="font-semibold text-gray-900 mb-2">
              Glasgow Coma Scale (GCS)
            </Typography>
            <Typography className="text-gray-600 mb-2">Score range: 3-15</Typography>
            <TextField
              fullWidth
              type="number"
              variant="outlined"
              value={gcs}
              onChange={(e) => handleGcsChange(e.target.value)}
              placeholder="Enter GCS"
              InputProps={{
                inputProps: { min: 0, max: 15 },
                sx: { borderRadius: '8px', bgcolor: '#F5F7FA' },
              }}
            />
          </CardContent>
        </Card>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            <FormControlLabel
              control={
                <Checkbox
                  checked={lossOfConsciousness}
                  onChange={() => setLossOfConsciousness(!lossOfConsciousness)}
                  sx={{
                    color: '#1A237E',
                    '&.Mui-checked': { color: '#1A237E' },
                  }}
                />
              }
              label={
                <Typography className="text-gray-900">Loss of Consciousness</Typography>
              }
            />
          </CardContent>
        </Card>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            <Typography className="font-semibold text-gray-900 mb-2">
              Post-Traumatic Amnesia (PTA)
            </Typography>
            <Typography className="text-gray-600 mb-2">Duration in hours</Typography>
            <TextField
              fullWidth
              type="number"
              variant="outlined"
              value={pta}
              onChange={(e) => handlePtaChange(e.target.value)}
              placeholder="Enter hours"
              InputProps={{
                inputProps: { min: 0 },
                sx: { borderRadius: '8px', bgcolor: '#F5F7FA' },
              }}
            />
          </CardContent>
        </Card>

        <Card className="mb-4 shadow-sm" sx={{ bgcolor: `${severityDetails.color}15` }}>
          <CardContent className="text-center">
            <Typography className="text-gray-600 mb-2">Severity Score</Typography>
            <Typography variant="h4" className="font-bold" sx={{ color: severityDetails.color }}>
              {severityScore} / 3
            </Typography>
            <Box className="h-2 bg-gray-200 rounded-full my-4">
              <Box
                className="h-full rounded-full"
                sx={{ width: `${(severityScore / 3) * 100}%`, bgcolor: severityDetails.color }}
              />
            </Box>
            <Typography className="font-semibold" sx={{ color: severityDetails.color }}>
              {severityDetails.text}
            </Typography>
          </CardContent>
        </Card>

        <Box className="flex flex-row mb-4">
          <Card className="flex-1 mr-2 shadow-sm">
            <CardContent>
              <Typography className="font-semibold text-gray-900 mb-2">
                GCS Guide
              </Typography>
              <Typography className="text-gray-600">
                • 13-15: Mild<br />
                • 9-12: Moderate<br />
                • 3-8: Severe
              </Typography>
            </CardContent>
          </Card>
          <Card className="flex-1 ml-2 shadow-sm">
            <CardContent>
              <Typography className="font-semibold text-gray-900 mb-2">
                PTA Guide
              </Typography>
              <Typography className="text-gray-600">
                • {'<'}24h: Mild<br />
                • 1-7d: Moderate<br />
                • {'>'}7d: Severe
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Card className="shadow-sm" sx={{ border: '1px dashed #666', bgcolor: '#F5F7FA' }}>
          <CardContent>
            <Typography className="text-gray-600 text-center italic">
              This tool provides initial guidance only. Clinical judgment and comprehensive assessment are essential.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default TBISeverityScore;