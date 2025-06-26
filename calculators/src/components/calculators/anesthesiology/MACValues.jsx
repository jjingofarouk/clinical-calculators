import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

const MACValues = () => {
  const [agent, setAgent] = useState('');
  const macData = {
    sevoflurane: { mac: 2.0, ageAdjusted: '1.8% (40 years)' },
    desflurane: { mac: 6.6, ageAdjusted: '6.0% (40 years)' },
    isoflurane: { mac: 1.17, ageAdjusted: '1.1% (40 years)' },
    halothane: { mac: 0.75, ageAdjusted: '0.7% (40 years)' }
  };

  const handleAgentChange = (event) => {
    setAgent(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Minimum Alveolar Concentration (MAC) Values</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Represents the concentration of inhaled anesthetic preventing movement in 50% of patients. MAC values decrease with age and vary by agent. Use to guide anesthetic dosing.
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Anesthetic Agent</InputLabel>
        <Select value={agent} onChange={handleAgentChange}>
          <MenuItem value="sevoflurane">Sevoflurane</MenuItem>
          <MenuItem value="desflurane">Desflurane</MenuItem>
          <MenuItem value="isoflurane">Isoflurane</MenuItem>
          <MenuItem value="halothane">Halothane</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="body2">
        {agent ? `MAC: ${macData[agent].mac}% (${macData[agent].ageAdjusted})` : 'Select an agent'}
      </Typography>
      <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
        Source: Eger EI II. Anesth Analg 2001;93(4):947-53<br />
        References: Miller RD, et al. Miller's Anesthesia, 8th ed., 2015; Mapleson WW. Br J Anaesth 1996;76(2):179-85
      </Typography>
    </Box>
  );
};

export default MACValues;