import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';
import ApacheIICalculator from './APACHE'; // Ensure correct import paths
import SOFACalculator from './SOFACalculator';
import QSOFAScoreCalculator from './QSOFAScoreCalculator';

// Tab Panel Component
const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const ICU = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="ICU Calculators Tabs">
          <Tab label="APACHE II Calculator" />
          <Tab label="SOFA Calculator" />
          <Tab label="qSOFA Calculator" />
        </Tabs>
      </AppBar>
      <TabPanel value={tabIndex} index={0}>
        <ApacheIICalculator />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <SOFACalculator />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <QSOFAScoreCalculator />
      </TabPanel>
    </Box>
  );
};

export default ICU;