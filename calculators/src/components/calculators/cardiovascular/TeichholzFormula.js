import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { HeartPulse, AlertTriangle } from 'lucide-react';

const TeichholzFormula = () => {
  const [lvidDiastole, setLVIDDiastole] = useState('');
  const [lvidSystole, setLVIDSystole] = useState('');

  const calculateTeichholz = () => {
    const diastole = parseFloat(lvidDiastole) || 0;
    const systole = parseFloat(lvidSystole) || 0;
    let edv = 0, esv = 0, ef = 0, guidance = '';

    if (diastole && systole) {
      edv = (7 * Math.pow(diastole, 3) / (2.4 + diastole)).toFixed(2);
      esv = (7 * Math.pow(systole, 3) / (2.4 + systole)).toFixed(2);
      ef = ((edv - esv) / edv * 100).toFixed(1);
      guidance = ef < 50 ? 'Reduced EF; consider further cardiac evaluation.' : 'Normal EF; monitor as needed.';
    }

    return { edv, esv, ef, guidance };
  };

  const { edv, esv, ef, guidance } = calculateTeichholz();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <HeartPulse size={20} className="inline mr-2" />
        Teichholz Formula
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="LVID Diastole (cm)"
          type="number"
          value={lvidDiastole}
          onChange={(e) => setLVIDDiastole(e.target.value)}
          fullWidth
        />
        <TextField
          label="LVID Systole (cm)"
          type="number"
          value={lvidSystole}
          onChange={(e) => setLVIDSystole(e.target.value)}
          fullWidth
        />
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          EDV: {edv} mL, ESV: {esv} mL, EF: {ef}%
        </Typography>
        <Typography variant="body1" className="text-teal-700 mt-2">
          Guidance: {guidance}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          Teichholz Formula estimates LV volumes and EF. Use with 2D echocardiography for accuracy.
        </Typography>
      </Box>
    </Box>
  );
};

export default TeichholzFormula;