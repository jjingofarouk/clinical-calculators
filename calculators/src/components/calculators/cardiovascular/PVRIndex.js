import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { HeartPulse, AlertTriangle } from 'lucide-react';

const PVRIndex = () => {
  const [meanPAP, setMeanPAP] = useState('');
  const [pcwp, setPCWP] = useState('');
  const [cardiacIndex, setCardiacIndex] = useState('');

  const calculatePVRIndex = () => {
    const pap = parseFloat(meanPAP) || 0;
    const wedge = parseFloat(pcwp) || 0;
    const ci = parseFloat(cardiacIndex) || 0;
    let pvrIndex = 0;
    let guidance = '';

    if (pap && wedge && ci) {
      pvrIndex = ((pap - wedge) / ci).toFixed(2);
      if (pvrIndex > 3) {
        guidance = 'Elevated PVR; consider pulmonary hypertension evaluation.';
      } else {
        guidance = 'Normal PVR; monitor as needed.';
      }
    }

    return { pvrIndex, guidance };
  };

  const { pvrIndex, guidance } = calculatePVRIndex();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <HeartPulse size={20} className="inline mr-2" />
        Pulmonary Vascular Resistance Index
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Mean PAP (mmHg)"
          type="number"
          value={meanPAP}
          onChange={(e) => setMeanPAP(e.target.value)}
          fullWidth
        />
        <TextField
          label="PCWP (mmHg)"
          type="number"
          value={pcwp}
          onChange={(e) => setPCWP(e.target.value)}
          fullWidth
        />
        <TextField
          label="Cardiac Index (L/min/m²)"
          type="number"
          value={cardiacIndex}
          onChange={(e) => setCardiacIndex(e.target.value)}
          fullWidth
        />
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          PVR Index: {pvrIndex} Wood Units·m²
        </Typography>
        <Typography variant="body1" className="text-teal-700 mt-2">
          Guidance: {guidance}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          PVR Index assesses pulmonary vascular resistance. Use with hemodynamic data for accurate interpretation.
        </Typography>
      </Box>
    </Box>
  );
};

export default PVRIndex;