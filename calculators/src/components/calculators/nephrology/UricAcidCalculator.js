import React, { useState, useCallback } from 'react';
import { Button, Card, TextField, Typography, Box, Chip, Grid, Dialog, DialogContent, DialogTitle, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { AlertTriangle } from 'lucide-react';

const REFERENCE_RANGES = {
	NORMAL: { min: 3.5, max: 7.2 },
	ELEVATED: { min: 7.2, max: 8.9 },
	HIGH: { min: 8.9, max: Infinity },
	CRITICAL: 13.0,
	TARGET_GOUT: 6.0,
	TARGET_TOPHACEOUS: 5.0,
};

const RISK_FACTORS = [
	{ id: 'obesity', label: 'Obesity (BMI > 30)' },
	{ id: 'hypertension', label: 'Hypertension' },
	{ id: 'diabetes', label: 'Diabetes' },
	{ id: 'ckd', label: 'Chronic Kidney Disease' },
	{ id: 'cardiovascular', label: 'Cardiovascular Disease' },
	{ id: 'diuretics', label: 'Diuretic Use' },
];

const UricAcidCalculator = () => {
	const [values, setValues] = useState({
		uricAcid: '',
		creatinine: '',
		age: '',
		weight: '',
		height: '',
	});
	const [selectedRiskFactors, setSelectedRiskFactors] = useState([]);
	const [showTrendModal, setShowTrendModal] = useState(false);
	const [historicalData, setHistoricalData] = useState([]);
	const [results, setResults] = useState({
		status: null,
		interpretation: null,
		riskLevel: null,
		recommendations: [],
		alerts: [],
	});
	const [alert, setAlert] = useState(null);

	const calculateBMI = useCallback(() => {
		const heightInMeters = parseFloat(values.height) / 100;
		return (parseFloat(values.weight) / (heightInMeters * heightInMeters)).toFixed(1);
	}, [values.height, values.weight]);

	const interpretUricAcid = useCallback(() => {
		const uricAcid = parseFloat(values.uricAcid);
		const bmi = calculateBMI();
		let status, interpretation, riskLevel, recommendations = [], alerts = [];

		if (uricAcid < REFERENCE_RANGES.NORMAL.min) {
			status = 'Hypouricemia';
			interpretation = 'Uric acid levels below normal range';
			riskLevel = 'Moderate';
			recommendations.push(
				'Evaluate for possible causes of hypouricemia:',
				'• SIADH',
				'• Malignancy',
				'• Medications (e.g., allopurinol overdose)',
				'Consider nephrology consultation'
			);
		} else if (uricAcid <= REFERENCE_RANGES.NORMAL.max) {
			status = 'Normal';
			interpretation = 'Uric acid within normal range';
			riskLevel = 'Low';
			recommendations.push(
				'Routine monitoring recommended',
				'Continue current management'
			);
		} else if (uricAcid <= REFERENCE_RANGES.ELEVATED.max) {
			status = 'Hyperuricemia';
			interpretation = 'Elevated uric acid levels - Increased risk for gout';
			riskLevel = 'Moderate';
			recommendations.push(
				'Consider urate-lowering therapy if:',
				'• History of gout attacks',
				'• Presence of tophi',
				'• Chronic kidney disease',
				'Lifestyle modifications recommended'
			);
		} else {
			status = 'Severe Hyperuricemia';
			interpretation = 'Significantly elevated uric acid levels';
			riskLevel = 'High';
			recommendations.push(
				'Urgent intervention recommended:',
				'• Initiate urate-lowering therapy',
				'• Monitor for tumor lysis syndrome',
				'• Assess renal function',
				'• Consider rheumatology consultation'
			);
		}

		if (selectedRiskFactors.length > 2) {
			alerts.push('Multiple risk factors present - Consider aggressive management');
		}

		if (uricAcid >= REFERENCE_RANGES.CRITICAL) {
			alerts.push('CRITICAL VALUE - Immediate medical attention required');
		}

		if (bmi > 30) {
			recommendations.push(
				'Weight management strategies:',
				'• Dietary modification',
				'• Regular exercise program',
				'• Consider bariatric consultation if BMI > 35'
			);
		}

		return { status, interpretation, riskLevel, recommendations, alerts };
	}, [values.uricAcid, selectedRiskFactors, calculateBMI]);

	const calculateResults = useCallback(() => {
		if (!values.uricAcid) {
			setAlert('Please enter uric acid value');
			return;
		}

		const results = interpretUricAcid();
		setResults(results);

		const newHistoricalData = [
			...historicalData,
			{ date: new Date().toLocaleDateString(), uricAcid: parseFloat(values.uricAcid) || 0 }
		];
		setHistoricalData(newHistoricalData);

		if (parseFloat(values.uricAcid) >= REFERENCE_RANGES.CRITICAL) {
			setAlert('CRITICAL VALUE - Uric acid level critically elevated. Immediate medical attention recommended.');
		} else {
			setAlert(null);
		}
	}, [values.uricAcid, historicalData, interpretUricAcid]);

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<motion.div 
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className="max-w-2xl mx-auto"
			>
				<Card className="p-6 bg-indigo-900">
					<Typography variant="h4" className="text-center font-bold text-white mb-2">
						Advanced Uric Acid Analysis
					</Typography>
					<Typography variant="subtitle2" className="text-center text-indigo-200 mb-6">
						Clinical Decision Support Tool
					</Typography>

					<Box className="space-y-6">
						<Card className="p-4">
							<Box className="space-y-4">
								<TextField
									fullWidth
									variant="outlined"
									label="Uric Acid (mg/dL)"
									placeholder="Enter value"
									value={values.uricAcid}
									onChange={(e) => setValues(prev => ({ ...prev, uricAcid: e.target.value }))}
									type="number"
									size="small"
								/>
								<Typography variant="caption" className="text-gray-500">
									Reference Range: {REFERENCE_RANGES.NORMAL.min} - {REFERENCE_RANGES.NORMAL.max} mg/dL
								</Typography>

								<TextField
									fullWidth
									variant="outlined"
									label="Creatinine (mg/dL)"
									placeholder="Enter value"
									value={values.creatinine}
									onChange={(e) => setValues(prev => ({ ...prev, creatinine: e.target.value }))}
									type="number"
									size="small"
								/>

								<Grid container spacing={2}>
									<Grid item xs={6}>
										<TextField
											fullWidth
											variant="outlined"
											label="Weight (kg)"
											placeholder="Weight"
											value={values.weight}
											onChange={(e) => setValues(prev => ({ ...prev, weight: e.target.value }))}
											type="number"
											size="small"
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											fullWidth
											variant="outlined"
											label="Height (cm)"
											placeholder="Height"
											value={values.height}
											onChange={(e) => setValues(prev => ({ ...prev, height: e.target.value }))}
											type="number"
											size="small"
										/>
									</Grid>
								</Grid>
							</Box>
						</Card>

						<Card className="p-4">
							<Typography variant="h6" className="font-bold mb-4">Risk Factors</Typography>
							<Grid container spacing={2}>
								{RISK_FACTORS.map(factor => (
									<Grid item xs={6} key={factor.id}>
										<Button
											variant={selectedRiskFactors.includes(factor.id) ? "contained" : "outlined"}
											color="primary"
											fullWidth
											onClick={() => {
												setSelectedRiskFactors(prev =>
													prev.includes(factor.id)
														? prev.filter(id => id !== factor.id)
														: [...prev, factor.id]
												);
											}}
											sx={{
												borderRadius: "12px",
												textTransform: "none",
												py: 1.5,
												...(selectedRiskFactors.includes(factor.id) && {
													backgroundColor: '#EEF2FF',
													color: '#4F46E5',
												}),
											}}
										>
											{factor.label}
										</Button>
									</Grid>
								))}
							</Grid>
						</Card>

						<Box className="flex gap-4">
							<Button
								variant="contained"
								color="primary"
								fullWidth
								onClick={calculateResults}
							>
								Analyze Results
							</Button>
							<Button
								variant="contained"
								color="success"
								fullWidth
								onClick={() => setShowTrendModal(true)}
							>
								View Trends
							</Button>
						</Box>

						{alert && (
							<Alert severity="error" onClose={() => setAlert(null)} className="mt-4">
								{alert}
							</Alert>
						)}

						{results.status && (
							<Box className="space-y-4">
								<Card
									className="p-4"
									sx={{
										borderLeft: `4px solid ${
											results.riskLevel === 'Low' ? '#10B981' :
											results.riskLevel === 'Moderate' ? '#F59E0B' :
											results.riskLevel === 'High' ? '#EF4444' : '#4F46E5'
										}`
									}}
								>
									<Typography variant="h5" className="font-bold mb-2">{results.status}</Typography>
									<Typography variant="body2" className="text-gray-700 mb-2">{results.interpretation}</Typography>
									<Chip
										label={`Risk Level: ${results.riskLevel}`}
										color={
											results.riskLevel === 'Low' ? 'success' :
											results.riskLevel === 'Moderate' ? 'warning' :
											results.riskLevel === 'High' ? 'error' : 'primary'
										}
									/>
								</Card>

								{results.alerts.length > 0 && (
									<Card className="p-4 bg-red-50">
										{results.alerts.map((alert, index) => (
											<Box key={index} className="flex items-center mb-2">
												<AlertTriangle className="h-5 w-5 text-red-700 mr-2" />
												<Typography variant="body2" className="text-red-700">{alert}</Typography>
											</Box>
										))}
									</Card>
								)}

								<Card className="p-4">
									<Typography variant="h6" className="font-bold mb-2">Clinical Recommendations</Typography>
									{results.recommendations.map((rec, index) => (
										<Typography key={index} variant="body2" className="text-gray-700 mb-1">
											{rec}
										</Typography>
									))}
								</Card>

								{values.weight && values.height && (
									<Card className="p-4 bg-gray-50 text-center">
										<Typography variant="h6" className="font-bold mb-2">BMI Assessment</Typography>
										<Typography variant="h5" className="text-indigo-600">{calculateBMI()} kg/m²</Typography>
									</Card>
								)}
							</Box>
						)}
					</Box>
				</Card>

				<Dialog open={showTrendModal} onClose={() => setShowTrendModal(false)} maxWidth="md" fullWidth>
					<DialogTitle className="text-center text-xl font-bold">Uric Acid Trends</DialogTitle>
					<DialogContent>
						{historicalData.length > 0 ? (
							<LineChart
								width={700}
								height={300}
								data={historicalData}
								margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
							>
								<XAxis dataKey="date" />
								<YAxis />
								<Line type="monotone" dataKey="uricAcid" stroke="#483D8B" strokeWidth={2} dot={{ r: 6, strokeWidth: 2, stroke: '#483D8B' }} />
							</LineChart>
						) : (
							<Typography className="text-center text-gray-600">No trend data available yet</Typography>
						)}
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={() => setShowTrendModal(false)}
							className="mt-4"
						>
							Close
						</Button>
					</DialogContent>
				</Dialog>
			</motion.div>
		</div>
	);
};

export default UricAcidCalculator;