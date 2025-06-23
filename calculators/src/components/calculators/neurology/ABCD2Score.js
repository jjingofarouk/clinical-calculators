import React, { useState } from 'react';
import { Button, Card, Typography, Box, Grid, Chip, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import ShareIcon from '@mui/icons-material/Share';

const ABCD2Score = () => {
	const [responses, setResponses] = useState({
		age: null,
		bp: null,
		clinicalFeatures: null,
		duration: null,
		diabetes: null,
	});

	const handleSelection = (field, value) => {
		setResponses(prev => ({ ...prev, [field]: value }));
	};

	const totalScore = Object.values(responses).reduce((sum, value) => sum + (value ?? 0), 0);

	const getRiskLevel = () => {
		if (totalScore >= 6) return {
			level: "High Risk",
			twoDayRisk: "8.1%",
			sevenDayRisk: "11.7%",
			ninetyDayRisk: "17.8%",
			color: "#FFE4E4",
			textColor: "#CC0000",
		};
		if (totalScore >= 4) return {
			level: "Moderate Risk",
			twoDayRisk: "4.1%",
			sevenDayRisk: "5.9%",
			ninetyDayRisk: "9.8%",
			color: "#FFF4E4",
			textColor: "#CC7700",
		};
		return {
			level: "Low Risk",
			twoDayRisk: "1.0%",
			sevenDayRisk: "1.2%",
			ninetyDayRisk: "3.1%",
			color: "#E4FFE4",
			textColor: "#007700",
		};
	};

	const handleShare = async () => {
		const riskInfo = getRiskLevel();
		const message = `ABCD² Score Results:\n
Total Score: ${totalScore}
Risk Level: ${riskInfo.level}
2-Day Stroke Risk: ${riskInfo.twoDayRisk}
7-Day Stroke Risk: ${riskInfo.sevenDayRisk}
90-Day Stroke Risk: ${riskInfo.ninetyDayRisk}`;

		if (navigator.share) {
			try {
				await navigator.share({ text: message });
			} catch (error) {
				console.error(error);
			}
		} else {
			alert('Share functionality not supported. Copy the results manually:\n\n' + message);
		}
	};

	const criteriaGroups = [
		{
			id: 'age',
			label: 'Age ≥60 years',
			description: 'Patient age at time of TIA',
			options: [
				{ value: 1, label: 'Yes (+1)', details: 'Patient is 60 years or older' },
				{ value: 0, label: 'No (0)', details: 'Patient is under 60 years' }
			]
		},
		{
			id: 'bp',
			label: 'Blood Pressure ≥140/90 mmHg',
			description: 'Initial BP reading. Either SBP ≥140 or DBP ≥90.',
			options: [
				{ value: 1, label: 'Yes (+1)', details: 'SBP ≥140 or DBP ≥90 mmHg' },
				{ value: 0, label: 'No (0)', details: 'Both SBP <140 and DBP <90 mmHg' }
			]
		},
		{
			id: 'clinicalFeatures',
			label: 'Clinical Features of the TIA',
			description: 'Select the most severe symptom present during the TIA',
			options: [
				{ value: 2, label: 'Unilateral Weakness (+2)', details: 'Any unilateral weakness of face, arm, or leg' },
				{ value: 1, label: 'Speech Disturbance (+1)', details: 'Speech disturbance without weakness' },
				{ value: 0, label: 'Other Symptoms (0)', details: 'Including sensory symptoms, visual loss, or vertigo' }
			]
		},
		{
			id: 'duration',
			label: 'Duration of Symptoms',
			description: 'Total duration of TIA symptoms',
			options: [
				{ value: 2, label: '≥60 minutes (+2)', details: 'Symptoms lasted 60 minutes or longer' },
				{ value: 1, label: '10-59 minutes (+1)', details: 'Symptoms lasted between 10 and 59 minutes' },
				{ value: 0, label: '<10 minutes (0)', details: 'Symptoms resolved within 10 minutes' }
			]
		},
		{
			id: 'diabetes',
			label: 'History of Diabetes',
			description: 'Presence of diabetes mellitus',
			options: [
				{ value: 1, label: 'Yes (+1)', details: 'Known history of diabetes mellitus' },
				{ value: 0, label: 'No (0)', details: 'No history of diabetes' }
			]
		}
	];

	const isComplete = Object.values(responses).every(value => value !== null);
	const riskInfo = getRiskLevel();

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<motion.div 
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className="max-w-2xl mx-auto"
			>
				<Card className="p-6">
					<Typography variant="h4" className="text-center font-bold mb-4">
						ABCD² Score for TIA
					</Typography>

					<Alert severity="info" className="mb-6">
						<Typography variant="subtitle1" className="font-bold">When to Use</Typography>
						<Typography variant="body2">
							Use to estimate stroke risk after a suspected transient ischemic attack (TIA).
							This tool helps risk-stratify patients for appropriate level of care and urgency of workup.
						</Typography>
					</Alert>

					<Box className="space-y-6">
						{criteriaGroups.map((group) => (
							<Card key={group.id} className="p-4 bg-gray-50">
								<Typography variant="h6" className="font-bold mb-2">{group.label}</Typography>
								<Typography variant="body2" className="text-gray-600 mb-4">{group.description}</Typography>
								<Grid container spacing={2}>
									{group.options.map((option) => (
										<Grid item xs={12} sm={6} key={`${group.id}-${option.value}`}>
											<Button
												variant={responses[group.id] === option.value ? "contained" : "outlined"}
												color="primary"
												fullWidth
												onClick={() => handleSelection(group.id, option.value)}
												sx={{
													borderRadius: '8px',
													textTransform: 'none',
													py: 2,
													...(responses[group.id] === option.value && {
														backgroundColor: '#27C7B8',
														'&:hover': { backgroundColor: '#24b3a5' },
													}),
												}}
											>
												<Box>
													<Typography variant="body1" className="font-semibold">{option.label}</Typography>
													<Typography variant="caption" className="text-gray-600">{option.details}</Typography>
												</Box>
											</Button>
										</Grid>
									))}
								</Grid>
							</Card>
						))}

						{isComplete && (
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 mt-6">
								<Card sx={{ backgroundColor: riskInfo.color, p: 4, border: `1px solid ${riskInfo.textColor}` }}>
									<Typography variant="h5" sx={{ color: riskInfo.textColor, fontWeight: 'bold', mb: 2 }}>
										Total Score: {totalScore} points - {riskInfo.level}
									</Typography>
									<Typography variant="subtitle1" className="font-semibold mb-2">Stroke Risk:</Typography>
									<Typography variant="body2">• 2-Day: {riskInfo.twoDayRisk}</Typography>
									<Typography variant="body2">• 7-Day: {riskInfo.sevenDayRisk}</Typography>
									<Typography variant="body2">• 90-Day: {riskInfo.ninetyDayRisk}</Typography>
									<Button
										variant="contained"
										startIcon={<ShareIcon />}
										onClick={handleShare}
										sx={{
											mt: 3,
											backgroundColor: '#27C7B8',
											'&:hover': { backgroundColor: '#24b3a5' },
											borderRadius: '8px',
										}}
									>
										Share Results
									</Button>
								</Card>

								<Card className="p-4 bg-blue-50">
									<Typography variant="h6" className="font-bold mb-4">Management Recommendations</Typography>
									<Box className="space-y-4">
										<Box>
											<Typography variant="subtitle2" className="font-semibold mb-2">Immediate Actions:</Typography>
											{[
												'Consider brain imaging (CT/MRI) based on risk level',
												'Evaluate for carotid stenosis with ultrasound/CTA',
												'Review and optimize antithrombotic therapy',
												'Assess and manage vascular risk factors',
											].map((item, index) => (
												<Typography key={index} variant="body2" className="ml-2 mb-1">• {item}</Typography>
											))}
										</Box>
										<Box>
											<Typography variant="subtitle2" className="font-semibold mb-2">Risk-Based Management:</Typography>
											{[
												'High Risk (≥6): Consider immediate admission and neurology consultation',
												'Moderate Risk (4-5): Same-day TIA clinic evaluation recommended',
												'Low Risk (0-3): Expedited outpatient evaluation within 24-48 hours',
											].map((item, index) => (
												<Typography key={index} variant="body2" className="ml-2 mb-1">• {item}</Typography>
											))}
										</Box>
										<Box>
											<Typography variant="subtitle2" className="font-semibold mb-2">Critical Actions:</Typography>
											{[
												'This score does not replace clinical judgment',
												'Consider cardiac monitoring for AF detection',
												'Arrange appropriate follow-up based on risk level',
											].map((item, index) => (
												<Typography key={index} variant="body2" className="ml-2 mb-1">• {item}</Typography>
											))}
										</Box>
									</Box>
								</Card>

								<Card className="p-4 bg-yellow-50">
									<Typography variant="h6" className="font-bold mb-4">Pearls/Pitfalls</Typography>
									{[
										'Score should supplement, not replace, clinical judgment',
										'Low scores still require appropriate follow-up',
										'Consider local stroke center capabilities when planning disposition',
										'Evaluate for other stroke mimics',
									].map((item, index) => (
										<Typography key={index} variant="body2" className="ml-2 mb-1">• {item}</Typography>
									))}
								</Card>
							</motion.div>
						)}
					</Box>
				</Card>
			</motion.div>
		</div>
	);
};

export default ABCD2Score;