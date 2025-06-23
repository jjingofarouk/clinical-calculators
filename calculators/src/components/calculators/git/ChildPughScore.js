import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, ToggleButton, ToggleButtonGroup, Modal, IconButton } from '@mui/material';
import { Info } from 'lucide-react';

const ChildPughScore = () => {
  const [bilirubin, setBilirubin] = useState('');
  const [albumin, setAlbumin] = useState('');
  const [inr, setInr] = useState('');
  const [ascites, setAscites] = useState('');
  const [encephalopathy, setEncephalopathy] = useState('');
  const [score, setScore] = useState(null);
  const [classification, setClassification] = useState('');
  const [showEncephalopathyGuide, setShowEncephalopathyGuide] = useState(false);

  const encephalopathyGrades = [
    { grade: 0, description: 'Normal consciousness, personality, neurological examination' },
    { grade: 1, description: 'Restless, sleep disturbed, irritable/agitated, tremor' },
    { grade: 2, description: 'Lethargic, time-disoriented, inappropriate behavior, asterixis' },
    { grade: 3', description: 'Somnolent, stuporous, place-disoriented, hyperactive reflexes' },
    { grade: 4, description: 'Unrousable coma, no personality/behavior, decerebrate' },
  ];

  const calculateScore = () => {
    if (!bilirubin || !albumin || !inr || !ascites || !encephalopathy) {
      return;
    }

    let totalScore = 0;
    const bilirubinValue = parseFloat(bilirubin);
    const albuminValue = parseFloat(albumin);
    const inrValue = parseFloat(inr);
    const ascitesValue = parseInt(ascites);
    const encephalopathyValue = parseInt(encephalopathy);

    if (bilirubinValue < 2) totalScore += 1;
    else if (bilirubinValue <= 3) totalScore += 2;
    else totalScore += 3;

    if (albuminValue > 3.5) totalScore += 1;
    else if (albuminValue >= 2.8) totalScore += 2;
    else totalScore += 3;

    if (inrValue < 1.7) totalScore += 1;
    else if (inrValue <= 2.3) totalScore += 2;
    else totalScore += 3;

    totalScore += ascitesValue;
    totalScore += encephalopathyValue;

    setScore(totalScore);

    if (totalScore <= 6) setClassification('Class A');
    else if (totalScore <= 9) setClassification('Class B');
    else setClassification('Class C');
  };

  useEffect(() => {
    calculateScore();
  }, [bilirubin, albumin, inr, ascites, encephalopathy]);

  return (
    <Box className="p-4 bg-gray-100 min-h-screen">
      <Box className="text-center mb-5">
        <Typography variant="h4" className="font-bold text-gray-800">
          Child-Pugh Score
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600">
          Cirrhosis Severity Assessment
        </Typography>
      </Box>

      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            Laboratory Values
          </Typography>
          <Box className="space-y-4">
            <Box>
              <TextField
                label="Total Bilirubin (mg/dL)"
                type="number"
                value={bilirubin}
                onChange={(e) => setBilirubin(e.target.value)}
                className="w-full"
                placeholder="Enter bilirubin"
                InputLabelProps={{ shrink: true }}
              />
              <Typography variant="caption" className="text-gray-500">
                Normal: 0.3-1.2 mg/dL
              </Typography>
            </Box>
            <Box>
              <TextField
                label="Serum Albumin (g/dL)"
                type="number"
                value={albumin}
                onChange={(e) => setAlbumin(e.target.value)}
                className="w-full"
                placeholder="Enter albumin"
                InputLabelProps={{ shrink: true }}
              />
              <Typography variant="caption" className="text-gray-500">
                Normal: 3.5-5.5 g/dL
              </Typography>
            </Box>
            <Box>
              <TextField
                label="INR"
                type="number"
                value={inr}
                onChange={(e) => setInr(e.target.value)}
                className="w-full"
                placeholder="Enter INR"
                InputLabelProps={{ shrink: true }}
              />
              <Typography variant="caption" className="text-gray-500">
                Normal: 0.8-1.1
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            Clinical Assessment
          </Typography>
          <Box className="space-y-4">
            <Box>
              <Typography className="mb-2">Ascites</Typography>
              <ToggleButtonGroup
                value={ascites}
                exclusive
                onChange={(e, value) => setAscites(value)}
                className="w-full"
              >
                <ToggleButton value="1" className="flex-1">None</ToggleButton>
                <ToggleButton value="2" className="flex-1">Mild</ToggleButton>
                <ToggleButton value="3" className="flex-1">Moderate-Severe</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box>
              <Box className="flex items-center mb-2">
                <Typography>Encephalopathy</Typography>
                <IconButton onClick={() => setShowEncephalopathyGuide(true)}>
                  <Info size={20} />
                </IconButton>
              </Box>
              <ToggleButtonGroup
                value={encephalopathy}
                exclusive
                onChange={(e, value) => setEncephalopathy(value)}
                className="w-full"
              >
                <ToggleButton value="1" className="flex-1">None</ToggleButton>
                <ToggleButton value="2" className="flex-1">Grade I-II</ToggleButton>
                <ToggleButton value="3" className="flex-1">Grade III-IV</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {score && (
        <Card>
          <CardContent>
            <Typography variant="h6" className="font-semibold mb-4">
              Results
            </Typography>
            <Box className="text-center mb-4">
              <Typography variant="h3" className="font-bold text-blue-600">
                {score}
              </Typography>
              <Typography variant="h5" className="font-semibold text-gray-800">
                {classification}
              </Typography>
            </Box>
            <Card className="bg-gray-50">
              <CardContent>
                <Typography className="font-semibold mb-2">Prognosis:</Typography>
                <Typography className="text-gray-700">
                  {classification === 'Class A' && '1-year survival: 100%, 2-year survival: 85%'}
                  {classification === 'Class B' && '1-year survival: 81%, 2-year survival: 57%'}
                  {classification === 'Class C' && '1-year survival: 45%, 2-year survival: 35%'}
                </Typography>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      <Modal
        open={showEncephalopathyGuide}
        onClose={() => setShowEncephalopathyGuide(false)}
        className="flex items-center justify-center"
      >
        <Box className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
          <Typography variant="h6" className="font-semibold text-center mb-4">
            Hepatic Encephalopathy Grades
          </Typography>
          {encephalopathyGrades.map((item) => (
            <Box key={item.grade} className="mb-4">
              <Typography className="font-semibold">Grade {item.grade}</Typography>
              <Typography className="text-gray-700">{item.description}</Typography>
            </Box>
          ))}
          <Button
            variant="contained"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowEncephalopathyGuide(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChildPughScore;