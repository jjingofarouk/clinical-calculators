
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
  Container,
  Grid,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const MMSE = () => {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    education: '',
    testDate: new Date().toISOString().split('T')[0],
    previousScore: '',
    notes: '',
    examiner: '',
    location: '',
  });

  const [responses, setResponses] = useState(Array(11).fill(''));
  const [totalScore, setTotalScore] = useState(0);
  const [openDialog, setOpenDialog] = useState(null);
  const scrollViewRef = useRef(null);

  const scoringGuides = {
    0: {
      max: 5,
      guide: "• Year (1 point)\n• Season (1 point)\n• Date (1 point)\n• Day (1 point)\n• Month (1 point)\n\nMust be exact. No partial credit.",
      placeholder: "Enter 0-5",
    },
    1: {
      max: 5,
      guide: "• State (1 point)\n• Country (1 point)\n• Town/City (1 point)\n• Hospital/Building (1 point)\n• Floor/Room (1 point)",
      placeholder: "Enter 0-5",
    },
    2: {
      max: 3,
      guide: "Name three unrelated objects clearly and slowly, one second for each.\nThen ask the patient to repeat all three.\n• 1 point for each correct on first attempt\n• Keep repeating until patient learns all three (up to 6 trials)",
      placeholder: "Enter 0-3",
    },
    3: {
      max: 5,
      guide: "Serial 7s: Start at 100\n• 93 (1 point)\n• 86 (1 point)\n• 79 (1 point)\n• 72 (1 point)\n• 65 (1 point)\n\nOR\n\nSpell 'WORLD' backwards:\n• D (1 point)\n• L (1 point)\n• R (1 point)\n• O (1 point)\n• W (1 point)",
      placeholder: "Enter 0-5",
    },
    4: {
      max: 3,
      guide: "Ask for the three objects repeated in Question 3\n• 1 point for each correct recall\n• Order doesn't matter",
      placeholder: "Enter 0-3",
    },
    5: {
      max: 2,
      guide: "Show a pencil and wristwatch\n• 1 point for naming pencil\n• 1 point for naming watch\n• Must use exact terms",
      placeholder: "Enter 0-2",
    },
    6: {
      max: 1,
      guide: "Ask patient to repeat 'No ifs, ands, or buts'\n• 1 point for perfect repetition\n• Must be exact, no errors",
      placeholder: "Enter 0-1",
    },
    7: {
      max: 3,
      guide: "• Takes paper (1 point)\n• Folds in half (1 point)\n• Places on floor (1 point)\n\nDon't demonstrate or help. Score only what patient does.",
      placeholder: "Enter 0-3",
    },
    8: {
      max: 1,
      guide: "Show written command: 'CLOSE YOUR EYES'\n• 1 point for closing eyes\n• Patient must read and execute command",
      placeholder: "Enter 0-1",
    },
    9: {
      max: 1,
      guide: "Ask patient to write a sentence\n• Must contain subject and verb\n• Must make sense\n• Ignore spelling errors",
      placeholder: "Enter 0-1",
    },
    10: {
      max: 1,
      guide: "Show intersecting pentagons\n• All 10 angles must be present\n• Intersection must form four-sided figure\n• Figures must be approximately equal",
      placeholder: "Enter 0-1",
    },
  };

  useEffect(() => {
    const newTotal = responses.reduce((sum, value) => {
      const numValue = parseInt(value) || 0;
      return sum + numValue;
    }, 0);
    setTotalScore(newTotal);
  }, [responses]);

  const handleChange = (index, value) => {
    if (value === '') {
      const newResponses = [...responses];
      newResponses[index] = '';
      setResponses(newResponses);
      return;
    }

    const newValue = parseInt(value) || 0;
    const maxScore = scoringGuides[index].max;

    if (newValue > maxScore) {
      setOpenDialog({
        title: 'Invalid Score',
        message: `Maximum score for this question is ${maxScore}`,
      });
      return;
    }

    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const getScoreInterpretation = (score) => {
    if (score >= 27) return 'Normal cognition';
    if (score >= 24) return 'Normal to Mild cognitive impairment';
    if (score >= 19) return 'Mild cognitive impairment';
    if (score >= 10) return 'Moderate cognitive impairment';
    return 'Severe cognitive impairment';
  };

  const getEducationAdjustedInterpretation = (score, education) => {
    const eduYears = parseInt(education) || 0;
    let adjustment = 0;

    if (eduYears < 8) adjustment = -2;
    else if (eduYears >= 8 && eduYears <= 12) adjustment = -1;
    else if (eduYears > 16) adjustment = +1;

    const adjustedScore = score + adjustment;
    return {
      score: adjustedScore,
      adjustment,
      interpretation: `Education-adjusted score: ${adjustedScore}/30 (${adjustment > 0 ? '+' : ''}${adjustment} point adjustment)`,
    };
  };

  const getCognitiveProfile = (responses) => ({
    orientation: (parseInt(responses[0]) || 0) + (parseInt(responses[1]) || 0),
    memory: (parseInt(responses[2]) || 0) + (parseInt(responses[4]) || 0),
    attention: parseInt(responses[3]) || 0,
    language: (parseInt(responses[5]) || 0) + (parseInt(responses[6]) || 0) + (parseInt(responses[9]) || 0),
    visualSpatial: parseInt(responses[10]) || 0,
    executiveFunction: (parseInt(responses[7]) || 0) + (parseInt(responses[8]) || 0),
  });

  const cognitiveProfile = getCognitiveProfile(responses);

  const renderQuestion = (index, label, subLabel = null) => (
    <Card key={index} className="mb-4 shadow-sm">
      <CardContent>
        <Box className="flex justify-between items-center mb-2">
          <Typography className="font-medium text-gray-900">{label}</Typography>
          <Button
            variant="outlined"
            size="small"
            className="border-gray-300"
            onClick={() => setOpenDialog({ title: 'Scoring Guide', message: scoringGuides[index].guide })}
          >
            <HelpCircle className="w-4 h-4 text-gray-600" />
          </Button>
        </Box>
        {subLabel && (
          <Typography className="text-sm text-gray-600 mb-2">{subLabel}</Typography>
        )}
        <Box className="flex items-center">
          <TextField
            type="number"
            size="small"
            placeholder={scoringGuides[index].placeholder}
            value={responses[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-20 mr-2"
            InputProps={{
              sx: { bgcolor: responses[index] === '' ? '#F8F9FA' : 'white' },
            }}
          />
          <Typography className="text-gray-600">/ {scoringGuides[index].max}</Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="md" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        ref={scrollViewRef}
      >
        <Typography variant="h4" className="font-bold text-center text-gray-900 mb-6">
          Mini-Mental State Examination (MMSE)
        </Typography>

        <Card className="mb-6 shadow-sm">
          <CardContent>
            <Typography className="font-semibold text-gray-900 mb-4">
              Patient Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Patient Name"
                  value={patientInfo.name}
                  onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  value={patientInfo.age}
                  onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Years of Education"
                  type="number"
                  value={patientInfo.education}
                  onChange={(e) => setPatientInfo({ ...patientInfo, education: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Previous MMSE Score (if any)"
                  type="number"
                  value={patientInfo.previousScore}
                  onChange={(e) => setPatientInfo({ ...patientInfo, previousScore: e.target.value })}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {[
          { index: 0, label: '1. Orientation to Time', subLabel: 'Year, Season, Date, Day, Month' },
          { index: 1, label: '2. Orientation to Place', subLabel: 'State, Country, Town, Hospital, Floor' },
          { index: 2, label: '3. Registration', subLabel: 'Name and repeat: APPLE, PENNY, TABLE' },
          { index: 3, label: '4. Attention & Calculation', subLabel: "Serial 7s from 100 OR spell 'WORLD' backwards" },
          { index: 4, label: '5. Recall', subLabel: 'Recall the 3 objects from question 3' },
          { index: 5, label: '6. Naming', subLabel: 'Name the pencil and watch shown' },
          { index: 6, label: '7. Repetition', subLabel: '"No ifs, ands, or buts"' },
          { index: 7, label: '8. Three-Stage Command', subLabel: 'Take paper, fold in half, place on floor' },
          { index: 8, label: '9. Reading', subLabel: 'Read and obey: CLOSE YOUR EYES' },
          { index: 9, label: '10. Writing', subLabel: 'Write a complete sentence' },
          { index: 10, label: '11. Drawing', subLabel: 'Copy the intersecting pentagons' },
        ].map(({ index, label, subLabel }) => renderQuestion(index, label, subLabel))}

        <Card className="mb-6 shadow-sm">
          <CardContent>
            <Typography className="font-semibold text-gray-900 mb-4">
              Clinical Notes
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Enter any observations, concerns, or follow-up notes"
              value={patientInfo.notes}
              onChange={(e) => setPatientInfo({ ...patientInfo, notes: e.target.value })}
            />
          </CardContent>
        </Card>

        <Card className="mb-6 shadow-sm" sx={{ bgcolor: '#E8F5F5' }}>
          <CardContent>
            <Typography className="font-semibold text-gray-900 mb-4">
              Assessment Results
            </Typography>
            <Typography variant="h5" className="font-bold text-gray-900 mb-2">
              Total Score: {totalScore}/30
            </Typography>
            <Chip
              label={getScoreInterpretation(totalScore)}
              color={totalScore < 24 ? 'error' : 'success'}
              className="mb-2"
            />
            {patientInfo.education && (
              <Typography className="text-gray-600 mb-2">
                {getEducationAdjustedInterpretation(totalScore, patientInfo.education).interpretation}
              </Typography>
            )}
            <Divider className="my-4" />
            <Typography className="font-semibold text-gray-900 mb-2">
              Cognitive Domain Analysis
            </Typography>
            <Typography className="text-gray-600">
              Orientation: {cognitiveProfile.orientation}/10
              <br />
              Memory: {cognitiveProfile.memory}/6
              <br />
              Attention: {cognitiveProfile.attention}/5
              <br />
              Language: {cognitiveProfile.language}/4
              <br />
              Visual-Spatial: {cognitiveProfile.visualSpatial}/1
              <br />
              Executive Function: {cognitiveProfile.executiveFunction}/4
            </Typography>
          </CardContent>
        </Card>

        <Card className="mb-6 shadow-sm">
          <CardContent>
            <Typography className="font-semibold text-gray-900 mb-4">
              Clinical Guidelines
            </Typography>
            <Typography className="font-medium text-gray-900 mb-2">
              Score Interpretation
            </Typography>
            <Typography className="text-gray-600 mb-4">
              • 27-30: Normal cognition
              <br />
              • 24-26: Normal to Mild impairment
              <br />
              • 19-23: Mild cognitive impairment
              <br />
              • 10-18: Moderate impairment
              <br />
              • ≤9: Severe impairment
            </Typography>
            <Divider className="my-4" />
            <Typography className="font-medium text-gray-900 mb-2">
              Education Adjustments
            </Typography>
            <Typography className="text-gray-600 mb-4">
              • 0-7 years: -2 points
              <br />
              • 8-12 years: -1 point
              <br />
              • 13-16 years: no adjustment
              <br />
              • above 16 years: +1 point
            </Typography>
            <Divider className="my-4" />
            <Typography className="font-medium text-gray-900 mb-2">
              Risk Factors to Consider
            </Typography>
            <Typography className="text-gray-600 mb-4">
              • Age (increased risk above 65)
              <br />
              • Family history of dementia
              <br />
              • Cardiovascular conditions
              <br />
              • Depression/anxiety
              <br />
              • Recent medication changes
              <br />
              • Sleep disorders
              <br />
              • Substance use
            </Typography>
            <Divider className="my-4" />
            <Typography className="font-medium text-gray-900 mb-2">
              Recommended Follow-up
            </Typography>
            <Typography className="text-gray-600 mb-4">
              • Score drop ≥3 points in 6 months
              <br />
              • Score ≤24 with high education
              <br />
              • Score ≤19 with limited education
              <br />
              • Significant domain-specific deficits
            </Typography>
            <Divider className="my-4" />
            <Typography className="font-medium text-gray-900 mb-2">
              Additional Assessments to Consider
            </Typography>
            <Typography className="text-gray-600">
              • Clock Drawing Test
              <br />
              • Trail Making Test
              <br />
              • Geriatric Depression Scale
              <br />
              • Activities of Daily Living
              <br />
              • Instrumental Activities of Daily Living
              <br />
              • Montreal Cognitive Assessment (MoCA)
            </Typography>
          </CardContent>
        </Card>

        <Dialog
          open={!!openDialog}
          onClose={() => setOpenDialog(null)}
        >
          {openDialog && (
            <>
              <DialogTitle>{openDialog.title}</DialogTitle>
              <DialogContent>
                <Typography className="text-gray-600 whitespace-pre-line">
                  {openDialog.message}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(null)} color="primary">
                  OK
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default MMSE;
