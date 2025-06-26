import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Stethoscope, AlertTriangle } from 'lucide-react';

const ASADifficultAirway = () => {
  const [formData, setFormData] = useState({
    neckMobility: '',
    mouthOpening: '',
    thyromentalDistance: '',
    mallampati: '',
    jawProtrusion: '',
    upperAirwayObstruction: '',
    historyDifficultIntubation: false,
    historyObstructiveSleepApnea: false,
    neckRadiation: false,
    limitedNeckExtension: false,
    facialDeformity: false,
  });

  const [riskLevel, setRiskLevel] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const calculateRisk = () => {
    let riskFactors = 0;
    const recs = [];

    // Neck Mobility
    if (formData.neckMobility === 'limited') {
      riskFactors += 1;
      recs.push('Consider fiberoptic intubation due to limited neck mobility.');
    }

    // Mouth Opening
    const mouthOpening = parseFloat(formData.mouthOpening);
    if (mouthOpening < 3) {
      riskFactors += 1;
      recs.push('Limited mouth opening may require video laryngoscopy or awake intubation.');
    }

    // Thyromental Distance
    const thyromentalDistance = parseFloat(formData.thyromentalDistance);
    if (thyromentalDistance < 6) {
      riskFactors += 1;
      recs.push('Short thyromental distance suggests potential intubation difficulty; prepare for alternative airway management.');
    }

    // Mallampati Score
    if (formData.mallampati === '3' || formData.mallampati === '4') {
      riskFactors += 1;
      recs.push('Mallampati Class III/IV indicates potential difficult airway; consider advanced airway techniques.');
    }

    // Jaw Protrusion
    if (formData.jawProtrusion === 'limited') {
      riskFactors += 1;
      recs.push('Limited jaw protrusion may complicate intubation; video laryngoscopy recommended.');
    }

    // Upper Airway Obstruction
    if (formData.upperAirwayObstruction === 'present') {
      riskFactors += 1;
      recs.push('Upper airway obstruction detected; prepare for emergency airway management, including possible cricothyrotomy.');
    }

    // History-based Risk Factors
    if (formData.historyDifficultIntubation) {
      riskFactors += 1;
      recs.push('History of difficult intubation; ensure experienced anesthesiologist and backup airway devices are available.');
    }
    if (formData.historyObstructiveSleepApnea) {
      riskFactors += 1;
      recs.push('Obstructive sleep apnea increases risk; consider CPAP or awake intubation.');
    }
    if (formData.neckRadiation) {
      riskFactors += 1;
      recs.push('Neck radiation history may cause tissue rigidity; fiberoptic intubation may be necessary.');
    }
    if (formData.limitedNeckExtension) {
      riskFactors += 1;
      recs.push('Limited neck extension noted; use video laryngoscopy or awake fiberoptic intubation.');
    }
    if (formData.facialDeformity) {
      riskFactors += 1;
      recs.push('Facial deformity may complicate mask ventilation; prepare for alternative airway management.');
    }

    // Risk Level Assessment
    let risk;
    if (riskFactors === 0) {
      risk = 'Low Risk';
      recs.push('Standard intubation techniques likely sufficient.');
    } else if (riskFactors <= 2) {
      risk = 'Moderate Risk';
      recs.push('Prepare for potential difficult airway with backup devices (e.g., bougie, video laryngoscope).');
    } else {
      risk = 'High Risk';
      recs.push('High risk of difficult airway; involve experienced anesthesiologist, prepare for awake fiberoptic intubation, and have surgical airway equipment ready.');
    }

    setRiskLevel(risk);
    setRecommendations(recs);
  };

  return (
    <div className="container">
      <main>
        <div className="card">
          <div className="flex items-center mb-4">
            <Stethoscope className="mr-2" size={24} />
            <h2 className="header">ASA Difficult Airway Assessment</h2>
          </div>
          <div className="custom-grid">
            <FormControl fullWidth margin="normal">
              <InputLabel>Neck Mobility</InputLabel>
              <Select
                name="neckMobility"
                value={formData.neckMobility}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="limited">Limited</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Mouth Opening (cm)"
              name="mouthOpening"
              type="number"
              value={formData.mouthOpening}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Thyromental Distance (cm)"
              name="thyromentalDistance"
              type="number"
              value={formData.thyromentalDistance}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Mallampati Score</InputLabel>
              <Select
                name="mallampati"
                value={formData.mallampati}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="1">Class I</MenuItem>
                <MenuItem value="2">Class II</MenuItem>
                <MenuItem value="3">Class III</MenuItem>
                <MenuItem value="4">Class IV</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Jaw Protrusion</InputLabel>
              <Select
                name="jawProtrusion"
                value={formData.jawProtrusion}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="limited">Limited</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Upper Airway Obstruction</InputLabel>
              <Select
                name="upperAirwayObstruction"
                value={formData.upperAirwayObstruction}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="present">Present</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="historyDifficultIntubation"
                  checked={formData.historyDifficultIntubation}
                  onChange={handleChange}
                />
              }
              label="History of Difficult Intubation"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="historyObstructiveSleepApnea"
                  checked={formData.historyObstructiveSleepApnea}
                  onChange={handleChange}
                />
              }
              label="Obstructive Sleep Apnea"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="neckRadiation"
                  checked={formData.neckRadiation}
                  onChange={handleChange}
                />
              }
              label="Neck Radiation History"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="limitedNeckExtension"
                  checked={formData.limitedNeckExtension}
                  onChange={handleChange}
                />
              }
              label="Limited Neck Extension"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="facialDeformity"
                  checked={formData.facialDeformity}
                  onChange={handleChange}
                />
              }
              label="Facial Deformity"
            />
          </div>
          <Button
            className="btn-primary"
            onClick={calculateRisk}
            disabled={!Object.values(formData).some(val => val !== '' || val === true)}
          >
            Assess Risk
          </Button>
          {riskLevel && (
            <div className="mt-4">
              <div className="flex items-center">
                <AlertTriangle className="mr-2" size={20} />
                <h3 className="header">Assessment Results</h3>
              </div>
              <p>Risk Level: {riskLevel}</p>
              <h4 className="text-teal-600 font-semibold mt-2">Clinical Recommendations:</h4>
              <ul className="list-disc pl-5">
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ASADifficultAirway;