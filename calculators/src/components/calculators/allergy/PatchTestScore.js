import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { AlertCircle, Info } from 'lucide-react';

const PatchTestScore = () => {
  const [reactions, setReactions] = useState([]);
  const [currentReaction, setCurrentReaction] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAddReaction = () => {
    if (!currentReaction) {
      setError('Please select a reaction type');
      return;
    }
    setReactions([...reactions, currentReaction]);
    setCurrentReaction('');
    setError('');
  };

  const handleCalculate = () => {
    if (reactions.length === 0) {
      setError('Please add at least one reaction');
      return;
    }

    const scoreMap = {
      'negative': 0,
      'doubtful': 1,
      'weak': 2,
      'strong': 3,
      'extreme': 4
    };

    const totalScore = reactions.reduce((sum, reaction) => sum + scoreMap[reaction], 0);
    const averageScore = totalScore / reactions.length;

    let interpretation = '';
    let riskColor = '';

    if (averageScore < 1) {
      interpretation = 'Negative or doubtful reactions - No significant contact allergy detected';
      riskColor = 'bg-green-100 text-green-800';
    } else if (averageScore < 2) {
      interpretation = 'Mild positive reactions - Possible contact allergy, consider clinical relevance';
      riskColor = 'bg-yellow-100 text-yellow-800';
    } else if (averageScore < 3) {
      interpretation = 'Moderate positive reactions - Likely clinically relevant contact allergy';
      riskColor = 'bg-orange-100 text-orange-800';
    } else {
      interpretation = 'Strong positive reactions - Definite contact allergy, avoidance recommended';
      riskColor = 'bg-red-100 text-red-800';
    }

    setResult({ 
      totalScore,
      averageScore: averageScore.toFixed(2),
      interpretation,
      riskColor,
      reactionCount: reactions.length
    });
  };

  return (
    <Box className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Patch Test Scoring
      </Typography>
      <Box className="flex items-center mb-4">
        <Info className="w-5 h-5 text-teal-600 mr-2" />
        <Typography variant="body2" className="text-gray-600">
          Evaluates patch test reactions to identify contact allergens using standardized scoring.
        </Typography>
      </Box>

      <Box className="card w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {error && (
          <Alert severity="warning" className="mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </Alert>
        )}

        <Typography variant="subtitle1" className="font-semibold text-gray-700 mb-2">
          Add Patch Test Reactions
        </Typography>
        
        <Box className="flex gap-2 mb-4">
          <FormControl fullWidth>
            <InputLabel>Reaction Type</InputLabel>
            <Select
              value={currentReaction}
              onChange={(e) => setCurrentReaction(e.target.value)}
              label="Reaction Type"
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#d1d5db' },
                  '&:hover fieldset': { borderColor: '#0d9488' },
                  '&.Mui-focused fieldset': { borderColor: '#0d9488' },
                },
              }}
            >
              <MenuItem value="negative">Negative (-)</MenuItem>
              <MenuItem value="doubtful">Doubtful (+/-)</MenuItem>
              <MenuItem value="weak">Weak positive (+)</MenuItem>
              <MenuItem value="strong">Strong positive (++)</MenuItem>
              <MenuItem value="extreme">Extreme reaction (+++)</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            variant="outlined"
            onClick={handleAddReaction}
            sx={{
              textTransform: 'none',
              fontWeight: '600',
              borderRadius: 2,
              borderColor: '#0d9488',
              color: '#0d9488',
              '&:hover': { borderColor: '#0b8276' },
            }}
          >
            Add
          </Button>
        </Box>

        {reactions.length > 0 && (
          <Box className="mb-4 p-3 bg-gray-50 rounded">
            <Typography variant="subtitle2" className="font-medium text-gray-700 mb-1">
              Added Reactions ({reactions.length})
            </Typography>
            <Box className="flex flex-wrap gap-1">
              {reactions.map((reaction, index) => (
                <Box 
                  key={index} 
                  className="px-2 py-1 bg-white border border-gray-200 rounded text-sm"
                >
                  {reaction}
                </Box>
              ))}
            </Box>
          </Box>
        )}

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
          Calculate Patch Test Score
        </Button>

        {result && (
          <Box className="mt-6 pt-4 border-t border-gray-200">
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Patch Test Results
            </Typography>
            <Typography variant="body1" className="font-medium text-gray-900 mb-2">
              {result.reactionCount} reactions | Average Score: {result.averageScore}
            </Typography>
            <Typography variant="h6" className="font-semibold text-gray-800 mb-2">
              Interpretation
            </Typography>
            <Typography
              variant="body1"
              className={`font-medium p-2 rounded ${result.riskColor}`}
            >
              {result.interpretation}
            </Typography>
            <Box className="flex items-center mt-2">
              <Info className="w-4 h-4 text-teal-600 mr-1" />
              <Typography variant="body2" className="text-gray-600">
                Scoring based on International Contact Dermatitis Research Group criteria
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PatchTestScore;