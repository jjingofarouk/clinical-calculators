import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { HeartPulse, AlertTriangle } from 'lucide-react';

const FickCardiacOutput = () => {
  const [vo2, setVo2] = useState('');
  const [artO2, setArtO2] = useState('');
  const [venO2, setVenO2] = useState('');

  const calculateFickCO = () => {
    const oxygenConsumption = parseFloat(vo2) || 0;
    const arterialO2 = parseFloat(artO2) || 0;
    const venousO2 = parseFloat(venO2) || 0;
    let co = 0, guidance = '';

    if (oxygenConsumption && arterialO2 && venousO2) {
      co = (oxygenConsumption / (arterialO2 - venousO2) * 10).toFixed(2);
      if (co < 4.0) {
        guidance = 'Low CO; evaluate for heart failure or shock';
      } else if (co > 8.0) {
        guidance = 'High CO; consider hyperdynamic states.';
      } else {
        guidance = 'Normal CO; monitor as needed.';
      }
    }

    return { co, guidance };
  };

  const { co, guidance } = calculateFickCO();

  return (
    <Box className="card">
      <Typography variant="h6" className="header" gutterBottom>
        <HeartPulse size={20} className="inline mr-2" />
        Fick Cardiac Output
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="VO2 (mL/min)"
          type="number"
          value={vo2}
          onChange={(e) => setVo2(e.target.value)}
          fullWidth
        />
        <TextField
          label="Arterial O2 Content (mL/L)"
          type="number"
          value={artO2}
          onChange={(e) => setArtO2(e.target.value)}
          fullWidth
        />
        <TextField
          label="Venous O2 Content (mL/L)"
          type="number"
          value={venO2}
          onChange={(e) => setVenO2(e.target.value)}
          fullWidth
        />
      </Box>

      <Box className="mt-6 p-4 bg-teal-50 rounded-lg">
        <Typography variant="h6" className="text-teal-700">
          Cardiac Output: {co} L/min
        </Typography>
        <Typography variant="body1" className="text-teal-700 mt-2">
          Guidance: {guidance}
        </Typography>
      </Box>

      <Box className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start">
        <AlertTriangle className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
        <Typography variant="body2" className="text-yellow-800">
          Fick CO estimates cardiac output. Use with invasive monitoring data.
        </Typography>
      </Box>
    </Box>
  );
};

export default FickCardiacOutput;