import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Tooltip, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { AlertCircle, Info, Activity, HeartPulse, Eye, Droplet, CircleDot } from 'lucide-react';

const PACUDischarge = () => {
  const [formData, setFormData] = useState({
    activity: '',
    respiration: '',
    circulation: '',
    consciousness: '',
    oxygenSaturation: '',
    painScore: '',
    nauseaScore: '',
    surgicalBleeding: ''
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const criteria = {
    activity: {
      label: 'Activity',
      options: [
        { value: '2', label: 'Able to move voluntarily or on command (4 limbs)' },
        { value: '1', label: 'Able to move 2 extremities voluntarily or on command' },
        { value: '0', label: 'Unable to move extremities' }
      ],
      icon: <Activity className="w-5 h-5 mr-2 text-teal-600" />
    },
    respiration: {
      label: 'Respiration',
      options: [
        { value: '2', label: 'Able to breathe deeply and cough freely' },
        { value: '1', label: 'Dyspnea, shallow or limited breathing' },
        { value: '0', label: 'Apneic' }
      ],
      icon: <Droplet className="w-5 h-5 mr-2 text-teal-600" />
    },
    circulation: {
      label: 'Circulation',
      options: [
        { value: '2', label: 'BP ± 20% of pre-anesthetic level' },
        { value: '1', label: 'BP ± 20-49% of pre-anesthetic level' },
        { value: '0', label: 'BP ± 50% of pre-anesthetic level' }
      ],
      icon: <HeartPulse className="w-5 h-5 mr-2 text-teal-600" />
    },
    consciousness: {
      label: 'Consciousness',
      options: [
        { value: '2', label: 'Fully awake' },
        { value: '1', label: 'Arousable on calling' },
        { value: '0', label: 'Not responding' }
      ],
      icon: <Eye className="w-5 h-5 mr-2 text-teal-600" />
    },
    oxygenSaturation: {
      label: 'Oxygen Saturation',
      options: [
        { value: '2', label: 'SpO₂ > 92% on room air' },
        { value: '1', label: 'Needs O₂ to maintain SpO₂ > 90%' },
        { value: '0', label: 'SpO₂ < 90% even with O₂' }
      ],
      icon: <CircleDot className="w-5 h-5 mr-2 text-teal-600" />
    }
  };

  const additionalCriteria = {
    painScore: {
      label: 'Pain Score (0-10)',
      min: 0,
      max: 10,
      helperText: 'Numeric rating scale where 0 = no pain and 10 = worst possible pain'
    },
    nauseaScore: {
      label: 'Nausea Score (0-10)',
      min: 0,
      max: 10,
      helperText: 'Numeric rating scale where 0 = no nausea and 10 = worst possible nausea'
    },
    surgicalBleeding: {
      label: 'Surgical Bleeding',
      options: [
        { value: '0', label: 'None/minimal' },
        { value: '1', label: 'Moderate (requires monitoring)' },
        { value: '2', label: 'Severe (requires intervention)' }
      ]
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: '' });
  };

  const handleCalculate = () => {
    const newErrors = {};
    let hasError = false;

    // Validate all fields
    Object.keys(criteria).forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
        hasError = true;
      }
    });

    Object.keys(additionalCriteria).forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
        hasError = true;
      } else if (additionalCriteria[field].min !== undefined) {
        const value = parseInt(formData[field]);
        if (isNaN(value) || value < additionalCriteria[field].min || value > additionalCriteria[field].max) {
          newErrors[field] = `Must be between ${additionalCriteria[field].min} and ${additionalCriteria[field].max}`;
          hasError = true;
        }
      }
    });

    if (hasError) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    // Calculate score
    const aldreteScore = Object.keys(criteria).reduce((sum, field) => sum + parseInt(formData[field]), 0);
    const modifiedScore = aldreteScore >= 9 && 
                         parseInt(formData.painScore) <= 4 && 
                         parseInt(formData.nauseaScore) <= 4 && 
                         parseInt(formData.surgicalBleeding) <= 1;

    setResult({
      aldreteScore,
      painScore: formData.painScore,
      nauseaScore: formData.nauseaScore,
      surgicalBleeding: formData.surgicalBleeding,
      isReadyForDischarge: modifiedScore,
      dischargeCriteria: modifiedScore ? 
        'Patient meets all criteria for PACU discharge' : 
        'Patient does not meet all discharge criteria'
    });
  };

  const handleReset = () => {
    setFormData({
      activity: '',
      respiration: '',
      circulation: '',
      consciousness: '',
      oxygenSaturation: '',
      painScore: '',
      nauseaScore: '',
      surgicalBleeding: ''
    });
    setErrors({});
    setResult(null);
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        PACU Discharge Criteria (Modified Aldrete Score)
      </Typography>
      
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-400 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          The Modified Aldrete Score assesses patient recovery after anesthesia. A score ≥9 with adequate pain/nausea control and minimal bleeding indicates readiness for PACU discharge. (Source: Aldrete JA, 1995; Chung F, 1995)
        </Typography>
      </Box>

      <Box className="card w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <Typography variant="h6" className="font-semibold text-teal-600 mb-4">
          Aldrete Scoring Parameters (0-2 points each)
        </Typography>

        {Object.keys(criteria).map(field => (
          <Box key={field} className="mb-6">
            <Box className="flex items-center mb-2">
              {criteria[field].icon}
              <Typography variant="subtitle1" className="font-semibold text-gray-700">
                {criteria[field].label}
              </Typography>
            </Box>
            <RadioGroup
              name={field}
              value={formData[field]}
              onChange={handleChange(field)}
              className="ml-2"
            >
              {criteria[field].options.map(option => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio color="primary" />}
                  label={
                    <Typography variant="body2" className="text-gray-600">
                      {option.label} ({option.value} points)
                    </Typography>
                  }
                />
              ))}
            </RadioGroup>
            {errors[field] && (
              <Typography variant="body2" className="text-red-500 mt-1">
                {errors[field]}
              </Typography>
            )}
          </Box>
        ))}

        <Typography variant="h6" className="font-semibold text-teal-600 mb-4 mt-6">
          Additional Discharge Criteria
        </Typography>

        {Object.keys(additionalCriteria).map(field => (
          <Box key={field} className="mb-4">
            {additionalCriteria[field].options ? (
              <>
                <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
                  {additionalCriteria[field].label}
                </Typography>
                <RadioGroup
                  name={field}
                  value={formData[field]}
                  onChange={handleChange(field)}
                  className="ml-2"
                >
                  {additionalCriteria[field].options.map(option => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio color="primary" />}
                      label={
                        <Typography variant="body2" className="text-gray-600">
                          {option.label}
                        </Typography>
                      }
                    />
                  ))}
                </RadioGroup>
              </>
            ) : (
              <TextField
                fullWidth
                type="number"
                label={additionalCriteria[field].label}
                value={formData[field]}
                onChange={handleChange(field)}
                variant="outlined"
                error={!!errors[field]}
                helperText={errors[field] || additionalCriteria[field].helperText}
                InputProps={{
                  inputProps: {
                    min: additionalCriteria[field].min,
                    max: additionalCriteria[field].max
                  }
                }}
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#d1d5db' },
                    '&:hover fieldset': { borderColor: '#0d9488' },
                    '&.Mui-focused fieldset': { borderColor: '#0d9488' },
                  },
                }}
              />
            )}
          </Box>
        ))}

        <Box className="flex gap-4 mt-6">
          <Button
            variant="contained"
            onClick={handleCalculate}
            className="w-full py-3 btn-primary"
            sx={{
              backgroundColor: '#0d9488',
              '&:hover': { backgroundColor: '#0b8276' },
              textTransform: 'none',
              fontWeight: '600',
              borderRadius: 2,
            }}
          >
            Calculate Discharge Readiness
          </Button>
          <Button
            variant="outlined"
            onClick={handleReset}
            className="w-full py-3"
            sx={{
              borderColor: '#d1d5db',
              color: '#374151',
              textTransform: 'none',
              fontWeight: '600',
              borderRadius: 2,
              '&:hover': { borderColor: '#0d9488', color: '#0d9488' },
            }}
          >
            Reset
          </Button>
        </Box>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Aldrete Score: {result.aldreteScore}/10
            </Typography>
            <Typography variant="body1" className="mb-2">
              Pain Score: {result.painScore}/10
            </Typography>
            <Typography variant="body1" className="mb-2">
              Nausea Score: {result.nauseaScore}/10
            </Typography>
            <Typography variant="body1" className="mb-4">
              Surgical Bleeding: {result.surgicalBleeding === '0' ? 'None/Minimal' : 
                                result.surgicalBleeding === '1' ? 'Moderate' : 'Severe'}
            </Typography>

            <Box className={`p-4 rounded-lg ${result.isReadyForDischarge ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              <Typography variant="h6" className="font-semibold mb-2">
                {result.isReadyForDischarge ? 'Ready for Discharge' : 'Not Ready for Discharge'}
              </Typography>
              <Typography variant="body2">
                {result.dischargeCriteria}
              </Typography>
            </Box>

            <Box className="mt-4">
              <Typography variant="body2" className="text-gray-600">
                <strong>Clinical Context:</strong> The Modified Aldrete Score evaluates recovery from anesthesia based on activity, respiration, circulation, consciousness, and oxygen saturation. Additional discharge criteria include adequate pain control (≤4/10), minimal nausea (≤4/10), and acceptable surgical bleeding.
              </Typography>
            </Box>

            <Box className="flex items-center mt-4">
              <Info className="w-4 h-4 text-teal-400 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                <strong>Sources:</strong> Aldrete JA. The post-anesthesia recovery score revisited. J Clin Anesth. 1995;7(1):89-91. Chung F. Discharge criteria--a new trend. Can J Anaesth. 1995;42(11):1056-8.
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PACUDischarge;