import React, { useState } from 'react";
import { motion } from 'framer-motion';
import { Info, X } from 'lucide-react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Modal,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Select from 'react-select';

const VBACRiskCalculator = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [activeInfoContent, setActiveInfoContent] = useState('');
  const [patientData, setPatientData] = useState({
    age: '',
    vaginalBirthHistory: '',
    previousCSection: '',
    cervicalEffacement: '',
    cervicalDilation: '',
  });
  const [result, setResult] = useState(null);

  const ageOptions = [
    { label: 'Age ≥ 40 years', value: 'over40' },
    { label: 'Age < 40 years', value: 'under40' },
  ];

  const vaginalBirthOptions = [
    { label: 'Select vaginal birth history', value: '' },
    { label: 'Vaginal birth before AND after first cesarean', value: 'beforeAndAfter' },
    { label: 'Vaginal birth after first cesarean only', value: 'afterOnly' },
    { label: 'Vaginal birth before cesarean only', value: 'beforeOnly' },
    { label: 'No previous vaginal birth', value: 'none' },
  ];

  const previousCSectionOptions = [
    { label: 'Select previous C-section reason', value: '' },
    { label: 'Failure to progress', value: 'failureToProgress' },
    { label: 'Other reason', value: 'other' },
  ];

  const effacementOptions = [
    { label: 'Select cervical effacement', value: '' },
    { label: '> 75%', value: 'high' },
    { label: '25-75%', value: 'medium' },
    { label: '< 25%', value: 'low' },
  ];

  const dilationOptions = [
    { label: 'Select cervical dilation', value: '' },
    { label: '≥ 4 cm', value: 'yes' },
    { label: '< 4 cm', value: 'no' },
  ];

  const criticalActions = [
    'Carefully evaluate uterine scar integrity',
    'Consider facility\'s capability for emergency C-section',
    'Discuss risks and benefits with patient',
    'Ensure continuous fetal monitoring during labor',
    'Have informed consent documented',
  ];

  const handleInputChange = (field, value) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateScore = () => {
    let score = 0;

    if (patientData.age === 'under40') score += 2;

    switch (patientData.vaginalBirthHistory) {
      case 'beforeAndAfter':
        score += 4;
        break;
      case 'afterOnly':
        score += 2;
        break;
      case 'beforeOnly':
        score += 1;
        break;
      default:
        break;
    }

    if (patientData.previousCSection === 'other') score += 1;

    switch (patientData.cervicalEffacement) {
      case 'high':
        score += 2;
        break;
      case 'medium':
        score += 1;
        break;
      default:
        break;
    }

    if (patientData.cervicalDilation === 'yes') score += 1;

    const successProbability = Math.min(Math.round((score / 10) * 100), 100);

    return {
      score,
      probability: successProbability,
      recommendation: getRecommendation(successProbability),
      color: getResultColor(successProbability),
    };
  };

  const getRecommendation = (probability) => {
    if (probability >= 70) {
      return 'High likelihood of successful VBAC. Proceed with careful monitoring.';
    } else if (probability >= 50) {
      return 'Moderate likelihood of successful VBAC. Close monitoring required.';
    } else {
      return 'Lower likelihood of successful VBAC. Consider scheduled C-section.';
    }
  };

  const getResultColor = (probability) => {
    if (probability >= 70) return '#4CAF50';
    if (probability >= 50) return '#FFA726';
    return '#EF5350';
  };

  const showInfo = (info) => {
    setActiveInfoContent(info);
    setShowInfoModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <Typography variant="h4" className="font-bold text-gray-800">
            VBAC Success Calculator
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600 mt-2">
            Flamm Scoring Model
          </Typography>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
              Patient Assessment
            </Typography>
            <Divider className="mb-6" />

            <div className="space-y-6">
              <div>
                <Typography variant="body2" className="mb-2 font-medium">
                  Maternal Age
                </Typography>
                <Select
                  options={ageOptions}
                  placeholder="Select maternal age"
                  onChange={(item) => handleInputChange('age', item.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Typography variant="body2" className="mb-2 font-medium">
                  Vaginal Birth History
                </Typography>
                <Select
                  options={vaginalBirthOptions}
                  placeholder="Select vaginal birth history"
                  onChange={(item) => handleInputChange('vaginalBirthHistory', item.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Typography variant="body2" className="mb-2 font-medium">
                  Previous C-section Reason
                </Typography>
                <Select
                  options={previousCSectionOptions}
                  placeholder="Select previous C-section reason"
                  onChange={(item) => handleInputChange('previousCSection', item.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Typography variant="body2" className="mb-2 font-medium">
                  Cervical Effacement at Admission
                </Typography>
                <Select
                  options={effacementOptions}
                  placeholder="Select cervical effacement"
                  onChange={(item) => handleInputChange('cervicalEffacement', item.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Typography variant="body2" className="mb-2 font-medium">
                  Cervical Dilation at Admission
                </Typography>
                <Select
                  options={dilationOptions}
                  placeholder="Select cervical dilation"
                  onChange={(item) => handleInputChange('cervicalDilation', item.value)}
                  className="w-full"
                />
              </div>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-6"
                onClick={() => setResult(calculateScore())}
              >
                Calculate Success Probability
              </Button>

              {result && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 rounded-lg"
                  style={{ backgroundColor: `${result.color}20` }}
                >
                  <Typography
                    variant="h6"
                    className="font-bold"
                    style={{ color: result.color }}
                  >
                    VBAC Success Probability: {result.probability}%
                  </Typography>
                  <Typography variant="body1" className="mt-2">
                    Flamm Score: {result.score}
                  </Typography>
                  <Typography variant="body2" className="mt-2 text-gray-700">
                    {result.recommendation}
                  </Typography>

                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <Typography variant="subtitle2" className="font-semibold mb-2">
                      Critical Actions:
                    </Typography>
                    <List>
                      {criticalActions.map((action, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemText
                            primary={`• ${action}`}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Modal
        open={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        className="flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
        >
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6">Information</Typography>
            <Button onClick={() => setShowInfoModal(false)}>
              <X size={24} />
            </Button>
          </div>
          <Typography variant="body1" className="mb-4">
            {activeInfoContent}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setShowInfoModal(false)}
          >
            Close
          </Button>
        </motion.div>
      </Modal>
    </div>
  );
};

export default VBACRiskCalculator;