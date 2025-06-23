import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';

const CalculatorForm = ({ onSubmit, initialValues, fields, score, result }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (name, value, isCheckbox = false) => {
    setValues((prev) => ({
      ...prev,
      [name]: isCheckbox ? value : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <Box className="bg-white shadow-lg rounded-lg p-6">
        {fields.map((field) => (
          <Box key={field.name} className="mb-4">
            <Typography variant="subtitle1" className="font-medium text-gray-800 mb-2">
              {field.label}
            </Typography>
            {field.type === 'checkbox' ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values[field.name] || false}
                    onChange={(e) => handleChange(field.name, e.target.checked, true)}
                  />
                }
                label={field.label}
              />
            ) : (
              <TextField
                fullWidth
                type={field.type === 'number' ? 'number' : 'text'}
                value={values[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.label}
                variant="outlined"
                inputProps={field.type === 'number' ? { min: 0 } : {}}
              />
            )}
          </Box>
        ))}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
          onClick={handleSubmit}
        >
          Calculate
        </Button>

        {score !== null && (
          <Typography variant="h6" className="mt-4 font-bold text-blue-600">
            Score: {score}
          </Typography>
        )}
        {result && (
          <Typography variant="h6" className="mt-2 font-bold text-blue-600">
            Result: {result}
          </Typography>
        )}
      </Box>
    </motion.div>
  );
};

export default CalculatorForm;