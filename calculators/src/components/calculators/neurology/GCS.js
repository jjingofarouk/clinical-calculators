
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  Divider,
  Modal,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import Select from 'react-select';
import { Info, X } from 'lucide-react';

const GlasgowComaScale = () => {
  const [eyeOpening, setEyeOpening] = useState(null);
  const [verbalResponse, setVerbalResponse] = useState(null);
  const [motorResponse, setMotorResponse] = useState(null);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [timestamp] = useState(new Date());

  const totalScore = (eyeOpening || 0) + (verbalResponse || 0) + (motorResponse || 0);

  const CLINICAL_GUIDELINES = {
    assessment: `
      Key Assessment Points:
      • Assess eye opening first
      • Test verbal response before painful stimuli
      • Assess best motor response last
      • Document any factors affecting assessment (e.g., intubation)
      • Always use standardized painful stimuli
      • Record actual responses, not just scores
    `,
    interventions: {
      mild: [
        'Neurological observations every 2-4 hours',
        'Monitor for deterioration',
        'Consider CT scan if indicated',
        'Review medication history',
      ],
      moderate: [
        'Hourly neurological observations',
        'Immediate CT scan',
        'Consider neurosurgical consult',
        'Ensure airway protection',
        'Monitor ICP if indicated',
      ],
      severe: [
        'Immediate airway assessment',
        'Consider intubation (GCS ≤ 8)',
        'Urgent CT scan',
        'Neurosurgical evaluation',
        'ICU admission',
        'Continuous ICP monitoring',
      ],
    },
    confounding: [
      'Alcohol intoxication',
      'Drug effects',
      'Metabolic disturbances',
      'Hypothermia',
      'Non-neurological trauma',
      'Language barriers',
      'Intubation status',
    ],
  };

  const gradeGCS = (score) => {
    if (score === 15) {
      return {
        grade: 'Normal',
        color: 'success.main',
        guidance: 'Fully alert and oriented. No neurological impairment.',
        interventions: [],
      };
    } else if (score >= 14) {
      return {
        grade: 'Mild impairment',
        color: 'success.main',
        guidance: 'Alert with mild neurological impairment. Further evaluation needed.',
        interventions: CLINICAL_GUIDELINES.interventions.mild,
      };
    } else if (score >= 9) {
      return {
        grade: 'Moderate impairment',
        color: 'warning.main',
        guidance: 'Moderate impairment present. Requires close monitoring.',
        interventions: CLINICAL_GUIDELINES.interventions.moderate,
      };
    } else if (score >= 3) {
      return {
        grade: 'Severe impairment',
        color: 'error.main',
        guidance: 'Severe impairment. Immediate intervention required.',
        interventions: CLINICAL_GUIDELINES.interventions.severe,
      };
    } else {
      return {
        grade: 'No response',
        color: 'grey.900',
        guidance: 'No response. Critical intervention required.',
        interventions: CLINICAL_GUIDELINES.interventions.severe,
      };
    }
  };

  const eyeOpeningOptions = [
    { label: 'No eye opening (1)', value: 1, details: 'No eye opening with any stimulation' },
    { label: 'Eye opening to pain (2)', value: 2, details: 'Eyes open in response to painful stimuli' },
    { label: 'Eye opening to sound (3)', value: 3, details: 'Eyes open in response to voice' },
    { label: 'Eyes open spontaneously (4)', value: 4, details: 'Eyes open without stimulation' },
  ];

  const verbalResponseOptions = [
    { label: 'No verbal response (1)', value: 1, details: 'No vocalization of any type' },
    { label: 'Incomprehensible sounds (2)', value: 2, details: 'Moans/groans, no words' },
    { label: 'Inappropriate words (3)', value: 3, details: 'Random or exclamatory articulated speech' },
    { label: 'Confused (4)', value: 4, details: 'Attention can be held, disoriented' },
    { label: 'Orientated (5)', value: 5, details: 'Fully oriented to time, place, person' },
  ];

  const motorResponseOptions = [
    { label: 'No motor response (1)', value: 1, details: 'No movement to any stimulation' },
    { label: 'Extension to pain (2)', value: 2, details: 'Decerebrate posturing' },
    { label: 'Abnormal flexion (3)', value: 3, details: 'Decorticate posturing' },
    { label: 'Withdrawal from pain (4)', value: 4, details: 'Withdraws from painful stimuli' },
    { label: 'Localizing pain (5)', value: 5, details: 'Purposeful movement to painful stimuli' },
    { label: 'Obeys commands (6)', value: 6, details: 'Follows simple commands' },
  ];

  const { grade, color, guidance, interventions } = gradeGCS(totalScore);

  const renderAssessmentSection = (title, options, value, setValue) => (
    <Card className="mb-4 shadow-sm">
      <CardContent>
        <Typography className="font-semibold text-gray-900 mb-4">
          {title}
        </Typography>
        <Select
          options={options}
          value={options.find(opt => opt.value === value) || null}
          placeholder={`Select ${title}`}
          onChange={(item) => setValue(item.value)}
          formatOptionLabel={(item) => (
            <Box className="flex flex-col">
              <Typography className="font-medium text-gray-900">
                {item.label}
              </Typography>
              <Typography className="text-sm text-gray-500">
                {item.details}
              </Typography>
            </Box>
          )}
          className="text-gray-900"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: '#E2E8F0',
              '&:hover': { borderColor: '#004C54' },
            }),
            menu: (base) => ({
              ...base,
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }),
            option: (base, { isSelected }) => ({
              ...base,
              backgroundColor: isSelected ? '#004C54' : '#FFFFFF',
              color: isSelected ? '#FFFFFF' : '#333333',
              '&:hover': {
                backgroundColor: isSelected ? '#004C54' : '#F5F7FA',
              },
            }),
          }}
        />
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="md" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-lg mb-4">
          <Typography variant="h4" className="font-bold">
            Glasgow Coma Scale
          </Typography>
          <Button
            variant="contained"
            className="bg-white/20 text-white"
            startIcon={<Info />}
            onClick={() => setShowGuidelines(true)}
          >
            Guidelines
          </Button>
        </Box>

        <Box className="bg-gray-100 p-2 rounded-lg mb-4">
          <Typography className="text-gray-700">
            Assessment Time: {timestamp.toLocaleTimeString()}
          </Typography>
        </Box>

        {renderAssessmentSection('Eye Opening', eyeOpeningOptions, eyeOpening, setEyeOpening)}
        {renderAssessmentSection('Verbal Response', verbalResponseOptions, verbalResponse, setVerbalResponse)}
        {renderAssessmentSection('Motor Response', motorResponseOptions, motorResponse, setMotorResponse)}

        <Card className="mb-4 shadow-sm">
          <CardContent sx={{ bgcolor: `${color}15` }}>
            <Typography variant="h5" className="font-bold text-center text-gray-900 mb-2">
              Total GCS Score: {totalScore}/15
            </Typography>
            <Chip
              label={grade}
              sx={{ bgcolor: color, color: 'white' }}
              className="mb-2"
            />
            <Typography className="text-center text-gray-600">
              {guidance}
            </Typography>
          </CardContent>
        </Card>

        <Card className="mb-4 shadow-sm">
          <CardContent>
            <Typography className="font-semibold text-gray-900 mb-4">
              Recommended Interventions:
            </Typography>
            {interventions.map((intervention, index) => (
              <Box key={index} className="flex items-center mb-2">
                <Typography className="text-gray-700 mr-2">•</Typography>
                <Typography className="text-gray-700">{intervention}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>

        <Modal
          open={showGuidelines}
          onClose={() => setShowGuidelines(false)}
        >
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-11/12 max-w-lg max-h-[80vh] overflow-y-auto">
            <Box className="flex justify-between items-center mb-4">
              <Typography variant="h6" className="font-bold text-gray-900">
                Clinical Guidelines
              </Typography>
              <Button onClick={() => setShowGuidelines(false)}>
                <X className="text-gray-700" />
              </Button>
            </Box>

            <Typography className="font-semibold text-gray-900 mb-2">
              Assessment Protocol
            </Typography>
            <Typography className="text-gray-600 mb-4 whitespace-pre-line">
              {CLINICAL_GUIDELINES.assessment}
            </Typography>

            <Divider className="my-4" />

            <Typography className="font-semibold text-gray-900 mb-2">
              Confounding Factors
            </Typography>
            {CLINICAL_GUIDELINES.confounding.map((factor, index) => (
              <Typography key={index} className="text-gray-600 mb-1">
                • {factor}
              </Typography>
            ))}

            <Button
              fullWidth
              variant="contained"
              className="bg-gray-900 text-white mt-6"
              onClick={() => setShowGuidelines(false)}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </motion.div>
    </Container>
  );
};

export default GlasgowComaScale;
