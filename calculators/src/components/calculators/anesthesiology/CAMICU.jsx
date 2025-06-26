import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

const CAMICU = () => {
  const [features, setFeatures] = useState({
    acuteOnset: false,
    inattention: false,
    disorganizedThinking: false,
    alteredLOC: false
  });

  const handleChange = (event) => {
    setFeatures({ ...features, [event.target.name]: event.target.checked });
  };

  const isDelirium = features.acuteOnset && features.inattention && (features.disorganizedThinking || features.alteredLOC);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Confusion Assessment Method for ICU (CAM-ICU)</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Diagnoses delirium in ICU patients. Requires Feature 1 (acute onset/fluctuating course) AND Feature 2 (inattention) PLUS either Feature 3 (disorganized thinking) OR Feature 4 (altered level of consciousness).
      </Typography>
      <FormControlLabel
        control={<Checkbox checked={features.acuteOnset} onChange={handleChange} name="acuteOnset" />}
        label="Feature 1: Acute onset or fluctuating course"
      />
      <FormControlLabel
        control={<Checkbox checked={features.inattention} onChange={handleChange} name="inattention" />}
        label="Feature 2: Inattention (e.g., unable to follow commands)"
      />
      <FormControlLabel
        control={<Checkbox checked={features.disorganizedThinking} onChange={handleChange} name="disorganizedThinking" />}
        label="Feature 3: Disorganized thinking"
      />
      <FormControlLabel
        control={<Checkbox checked={features.alteredLOC} onChange={handleChange} name="alteredLOC" />}
        label="Feature 4: Altered level of consciousness (not alert/calm)"
      />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Delirium Present: {isDelirium ? 'Yes' : 'No'}
      </Typography>
      <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
        Source: Ely EW, et al. JAMA 2001;286(21):2703-10<br />
        References: Inouye SK, et al. Ann Intern Med 1990;113(12):941-8; Devlin JW, et al. Crit Care Med 2018;46(9):e825-73
      </Typography>
    </Box>
  );
};

export default CAMICU;