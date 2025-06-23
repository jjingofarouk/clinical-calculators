import React, { useState, useRef } from 'react';
import { Button, Card, TextField, Typography, Box, Grid, Alert } from '@mui/material';
import { motion } from 'framer-motion';

const UrineProteinToCreatinineRatio = () => {
	const [protein, setProtein] = useState('');
	const [creatinine, setCreatinine] = useState('');
	const [ratio, setRatio] = useState(null);
	const [error, setError] = useState('');
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const fadeIn = () => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};

	const calculateRatio = () => {
		setError('');
		
		if (!protein || !creatinine) {
			setError('Please enter both values');
			return;
		}

		const proteinValue = parseFloat(protein);
		const creatinineValue = parseFloat(creatinine);

		if (isNaN(proteinValue) || isNaN(creatinineValue)) {
			setError('Please enter valid numbers');
			return;
		}

		if (creatinineValue === 0) {
			setError('Creatinine value cannot be zero');
			return;
		}

		const ratioValue = proteinValue / creatinineValue;
		setRatio(ratioValue.toFixed(2));
		fadeIn();
	};

	const interpretResult = (ratio) => {
		if (!ratio) return null;
		const numericRatio = parseFloat(ratio);
		
		if (numericRatio < 0.2) {
			return { text: 'Normal range', color: '#4CAF50' };
		} else if (numericRatio >= 0.2 && numericRatio < 0.5) {
			return { text: 'Mild proteinuria', color: '#FFC107' };
		} else if (numericRatio >= 0.5 && numericRatio < 3.0) {
			return { text: 'Moderate proteinuria', color: '#FF9800' };
		} else {
			return { text: 'Severe proteinuria', color: '#F44336' };
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<motion.div 
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className="max-w-md mx-auto"
			>
				<Card className="p-6">
					<Typography variant="h4" className="text-center font-bold mb-2">
						UPCR Calculator
					</Typography>
					<Typography variant="subtitle1" className="text-center text-gray-600 mb-2">
						Professional Edition
					</Typography>
					<Typography variant="body2" className="text-center text-gray-500 mb-6">
						Precise Proteinuria Quantification Tool
					</Typography>

					<Box className="space-y-4">
						<Box>
							<Typography variant="subtitle2" className="mb-1">Urine Protein (mg/dL)</Typography>
							<TextField
								fullWidth
								variant="outlined"
								placeholder="Enter protein value"
								value={protein}
								onChange={(e) => setProtein(e.target.value)}
								type="number"
								size="small"
							/>
							<Typography variant="caption" className="text-gray-500 mt-1">Reference: Less than 150 mg/dL</Typography>
						</Box>

						<Box>
							<Typography variant="subtitle2" className="mb-1">Urine Creatinine (mg/dL)</Typography>
							<TextField
								fullWidth
								variant="outlined"
								placeholder="Enter creatinine value"
								value={creatinine}
								onChange={(e) => setCreatinine(e.target.value)}
								type="number"
								size="small"
							/>
							<Typography variant="caption" className="text-gray-500 mt-1">Reference: 20-370 mg/dL</Typography>
						</Box>

						{error && (
							<Alert severity="error" className="mt-4">{error}</Alert>
						)}

						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={calculateRatio}
							sx={{ borderRadius: '12px', py: 1.5 }}
						>
							Calculate UPCR
						</Button>

						{ratio && (
							<motion.div 
								animate={{ opacity: fadeAnim._value }}
								className="mt