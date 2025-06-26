import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableRow } from '@mui/material';

const asapStatuses = [
  {
    class: 'ASA I',
    description: 'A normal healthy patient',
    example: 'Healthy, non-smoking, no or minimal alcohol use',
  },
  {
    class: 'ASA II',
    description: 'A patient with mild systemic disease',
    example: 'Mild diseases only without substantive functional limitations (e.g., current smoker, social alcohol drinker, pregnancy, obesity (30 < BMI < 40), well-controlled diabetes/HTN)',
  },
  {
    class: 'ASA III',
    description: 'A patient with severe systemic disease',
    example: 'Substantive functional limitations; one or more moderate to severe diseases (e.g., poorly controlled diabetes/HTN, COPD, morbid obesity (BMI ≥ 40), active hepatitis, alcohol dependence or abuse, implanted pacemaker)',
  },
  {
    class: 'ASA IV',
    description: 'A patient with severe systemic disease that is a constant threat to life',
    example: 'Recent (less than 3 months) MI, CVA, TIA, or CAD/stents, ongoing cardiac ischemia or severe valve dysfunction, severe reduction of ejection fraction, sepsis, DIC',
  },
  {
    class: 'ASA V',
    description: 'A moribund patient who is not expected to survive without the operation',
    example: 'Ruptured abdominal/thoracic aneurysm, massive trauma, intracranial bleed with mass effect, ischemic bowel in the face of significant cardiac pathology',
  },
  {
    class: 'ASA VI',
    description: 'A declared brain-dead patient whose organs are being removed for donor purposes',
    example: 'Organ donor',
  },
  {
    class: 'E',
    description: 'Emergency surgery modifier',
    example: 'Add “E” to the ASA class (e.g., ASA IIIE) to denote emergency surgery',
  },
];

const ASAPhysicalStatus = () => {
  return (
    <Box sx={{ p: 3 }} className="card">
      <Typography variant="h6" className="header">ASA Physical Status Classification</Typography>
      <Table>
        <TableBody>
          {asapStatuses.map((status, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-gray-900">{status.class}</TableCell>
              <TableCell className="text-gray-700">{status.description}</TableCell>
              <TableCell className="text-gray-600 italic">{status.example}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ASAPhysicalStatus;