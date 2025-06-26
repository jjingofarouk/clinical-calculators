import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Stethoscope, AlertTriangle } from 'lucide-react';

const ARISCATScore = () => {
  const [formData, setFormData] = useState({
    age: '',
    spO2: '',
    respiratoryInfection: '',
    anemia: '',
    surgicalSite: '',
    surgeryDuration: '',
    emergency: '',
  });

  const [score, setScore] = useState(null);
  const [riskLevel, setRiskLevel] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateScore = () => {
    let totalScore = 0;

    // Age
    const age = parseFloat(formData.age);
    if (age > 80) totalScore += 24;
    else if (age >= 51) totalScore += 3;

    // Preoperative SpO2
    const spO2 = parseFloat(formData.spO2);
    if (spO2 <= 90) totalScore += 24;
    else if (spO2 <= 95) totalScore += 8;

    // Respiratory Infection in last month
    if (formData.respiratoryInfection === 'yes') totalScore += 17;

    // Preoperative Anemia (Hb ≤ 10 g/dL)
    if (formData.anemia === 'yes') totalScore += 11;

    // Surgical Site
    if (formData.surgicalSite === 'thoracic') totalScore += 23;
    else if (formData.surgicalSite === 'upperAbdominal') totalScore += 15;

    // Duration of Surgery
    const duration = parseFloat(formData.surgeryDuration);
    if (duration > 3) totalScore += 23;
    else if (duration > 2) totalScore += 16;

    // Emergency Procedure
    if (formData.emergency === 'yes') totalScore += 8;

    setScore(totalScore);

    // Risk Level
    if (totalScore < 26) setRiskLevel('Low (1.6%)');
    else if (totalScore <= 44) setRiskLevel('Intermediate (13.3%)');
    else setRiskLevel('High (42.1%)');
  };

  return (
    <div className="container">
      <main>
        <div className="card">
          <div className="flex items-center mb-4">
            <Stethoscope className="mr-2" size={24} />
            <h2 className="header">ARISCAT Score Calculator</h2>
          </div>
          <div className="custom-grid">
            <TextField
              label="Age (years)"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Preoperative SpO2 (%)"
              name="spO2"
              type="number"
              value={formData.spO2}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Respiratory Infection (Last Month)</InputLabel>
              <Select
                name="respiratoryInfection"
                value={formData.respiratoryInfection}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Preoperative Anemia (Hb ≤ 10 g/dL)</InputLabel>
              <Select
                name="anemia"
                value={formData.anemia}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Surgical Site</InputLabel>
              <Select
                name="surgicalSite"
                value={formData.surgicalSite}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="thoracic">Thoracic</MenuItem>
                <MenuItem value="upperAbdominal">Upper Abdominal</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Duration of Surgery (hours)"
              name="surgeryDuration"
              type="number"
              value={formData.surgeryDuration}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Emergency Procedure</InputLabel>
              <Select
                name="emergency"
                value={formData.emergency}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            className="btn-primary"
            onClick={calculateScore}
            disabled={!Object.values(formData).every(val => val !== '')}
          >
            Calculate Score
          </Button>
          {score !== null && (
            <div className="mt-4">
              <div className="flex items-center">
                <AlertTriangle className="mr-2" size={20} />
                <h3 className="header">Results</h3>
              </div>
              <p>ARISCAT Score: {score}</p>
              <p>Risk Level: {riskLevel}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ARISCATScore;