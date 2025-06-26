import React, { useState, useCallback, useMemo } from 'react';
import { Button, Card, TextField, Typography, Box, Collapse, IconButton, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import InfoIcon from '@mui/icons-material/Info';

const CLINICAL_GUIDELINES = {
	temperature: {
		title: 'Temperature Management',
		ranges: [
			{
				range: '< 36.0°C',
				guidance: 'Consider external warming methods. Monitor for signs of infection.',
				intervention: 'Active warming indicated if < 35.0°C'
			},
			{
				range: '38.5°C - 39.5°C',
				guidance: 'Search for source of infection. Consider blood cultures.',
				intervention: 'Antipyretics if symptomatic'
			},
			{
				range: '> 39.5°C',
				guidance: 'Urgent sepsis evaluation required. Initiate sepsis protocol.',
				intervention: 'Immediate cooling measures and antibiotics if indicated'
			}
		]
	},
	heartRate: {
		title: 'Heart Rate Management',
		ranges: [
			{
				range: '< 60 bpm',
				guidance: 'Check medication history. Consider 12-lead ECG.',
				intervention: 'Atropine if symptomatic'
			},
			{
				range: '> 100 bpm',
				guidance: 'Evaluate for underlying cause: pain, anxiety, hypovolemia.',
				intervention: 'Rate control if AF. Fluid resuscitation if needed.'
			}
		]
	},
	respiratoryRate: {
		title: 'Respiratory Management',
		ranges: [
			{
				range: '< 12 breaths/min',
				guidance: 'Check medication effects. Monitor CO2 retention.',
				intervention: 'Consider naloxone if opiate-induced'
			},
			{
				range: '> 24 breaths/min',
				guidance: 'Assess work of breathing. Check oxygen saturation.',
				intervention: 'Supplemental oxygen if hypoxemic'
			}
		]
	},
	bloodPressure: {
		title: 'Blood Pressure Management',
		ranges: [
			{
				range: 'SBP < 90 mmHg',
				guidance: 'Evaluate for shock. Check lactate levels.',
				intervention: 'Fluid resuscitation. Consider vasopressors.'
			},
			{
				range: 'SBP > 180 mmHg',
				guidance: 'Screen for end-organ damage. Check causes.',
				intervention: 'IV antihypertensives if organ damage present'
			}
		]
	}
};

const GuidelineCard = ({ title, ranges }) => (
	<Card className="p-4 bg-gray-50 mt-2" sx={{ borderLeft: '4px solid #2C3E50' }}>
		<Typography variant="h6" className="font-bold mb-2">{title}</Typography>
		{ranges.map((item, index) => (
			<Box key={index} className="mb-3">
				<Typography variant="body2" className="font-semibold">{item.range}</Typography>
				<Typography variant="body2" className="text-gray-700 mt-1">• {item.guidance}</Typography>
				<Typography variant="body2" className="text-gray-600 italic mt-1 ml-3">→ {item.intervention}</Typography>
			</Box>
		))}
	</Card>
);

const InputField = ({ label, value, onChangeText, helperText, unit, keyboardType = 'numeric', guidelines }) => {
	const [showGuidelines, setShowGuidelines] = useState(false);

	return (
		<Box className="mb-5">
			<Box className="flex items-center mb-2">
				<Typography variant="subtitle2" className="font-semibold">{label}</Typography>
				{unit && <Typography variant="caption" className="ml-2 text-gray-500">({unit})</Typography>}
				{guidelines && (
					<IconButton size="small" onClick={() => setShowGuidelines(!showGuidelines)}>
						<InfoIcon fontSize="small" sx={{ color: '#2C3E50' }} />
					</IconButton>
				)}
			</Box>
			<TextField
				fullWidth
				variant="outlined"
				value={value}
				onChange={(e) => onChangeText(e.target.value)}
				type={keyboardType}
				placeholder="Enter value"
				size="small"
				sx={{ backgroundColor: '#FFF' }}
			/>
			{helperText && <Typography variant="caption" className="text-gray-500 mt-1">{helperText}</Typography>}
			<Collapse in={showGuidelines}>
				{guidelines && <GuidelineCard {...guidelines} />}
			</Collapse>
		</Box>
	);
};

const ScoreCard = ({ title, value, description, color }) => (
	<Card className="p-4" sx={{ borderLeft: `4px solid ${color}`, backgroundColor: '#FFF' }}>
		<Typography variant="subtitle2" className="font-semibold text-gray-500">{title}</Typography>
		<Typography variant="h5" sx={{ color, fontWeight: 'bold', my: 1 }}>{value}</Typography>
		<Typography variant="body2" className="text-gray-700">{description}</Typography>
	</Card>
);

const RecommendationsCard = ({ score }) => {
	const recommendations = useMemo(() => {
		if (score <= 4) {
			return {
				monitoring: 'Q4H vital signs',
				tests: ['Basic metabolic panel daily', 'CBC with differential'],
				interventions: ['Standard nursing care', 'Early mobilization if appropriate']
			};
		} else if (score <= 9) {
			return {
				monitoring: 'Q2H vital signs',
				tests: ['Comprehensive metabolic panel', 'Arterial blood gases'],
				interventions: ['Consider HDU admission', 'Early specialist consultation']
			};
		} else if (score <= 14) {
			return {
				monitoring: 'Continuous vital signs monitoring',
				tests: ['Hourly blood gases', 'Continuous cardiac monitoring'],
				interventions: ['ICU admission', 'Consider early intubation']
			};
		} else {
			return {
				monitoring: 'Continuous ICU monitoring',
				tests: ['Frequent blood gases', 'Continuous cardiac monitoring'],
				interventions: ['Immediate ICU admission', 'Consider ventilation']
			};
		}
	}, [score]);

	return (
		<Card className="p-4 bg-gray-50">
			<Typography variant="h6" className="font-bold mb-3">Clinical Recommendations</Typography>
			<Box className="mb-3">
				<Typography variant="subtitle2" className="font-semibold mb-1">Monitoring:</Typography>
				<Typography variant="body2" className="text-gray-700">{recommendations.monitoring}</Typography>
			</Box>
			<Box className="mb-3">
				<Typography variant="subtitle2" className="font-semibold mb-1">Suggested Tests:</Typography>
				{recommendations.tests.map((test, index) => (
					<Typography key={index} variant="body2" className="text-gray-700 ml-2">• {test}</Typography>
				))}
			</Box>
			<Box>
				<Typography variant="subtitle2" className="font-semibold mb-1">Interventions:</Typography>
				{recommendations.interventions.map((intervention, index) => (
					<Typography key={index} variant="body2" className="text-gray-700 ml-2">• {intervention}</Typography>
				))}
			</Box>
		</Card>
	);
};

const APACHEII = () => {
	const [formData, setFormData] = useState({
		temperature: '',
		heartRate: '',
		respiratoryRate: '',
		systolicBP: '',
		age: '',
		chronicHealth: '0',
	});
	const [score, setScore] = useState(0);
	const [hasCalculated, setHasCalculated] = useState(false);
	const [error, setError] = useState('');

	const handleInputChange = useCallback((field, value) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		setHasCalculated(false);
		setError('');
	}, []);

	const validateInput = useCallback(() => {
		const requiredFields = Object.entries(formData).filter(([key]) => key !== 'chronicHealth');
		
		for (const [field, value] of requiredFields) {
			if (!value || isNaN(value)) {
				setError(`Please enter a valid value for ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
				return false;
			}
		}
		return true;
	}, [formData]);

	const calculateScore = useCallback(() => {
		if (!validateInput()) return;

		let totalScore = 0;
		const { temperature, heartRate, respiratoryRate, systolicBP, age, chronicHealth } = formData;

		const temp = parseFloat(temperature);
		if (temp < 36 || temp > 38.5) totalScore += 2;
		
		const hr = parseInt(heartRate);
		if (hr < 40 || hr > 140) totalScore += 4;
		else if (hr >= 40 && hr <= 60) totalScore += 1;
		else if (hr > 100 && hr <= 140) totalScore += 2;

		const rr = parseInt(respiratoryRate);
		if (rr < 8 || rr > 35) totalScore += 4;
		else if (rr >= 8 && rr <= 12) totalScore += 1;
		else if (rr > 24 && rr <= 35) totalScore += 2;

		const sbp = parseInt(systolicBP);
		if (sbp < 70) totalScore += 4;
		else if (sbp >= 70 && sbp <= 100) totalScore += 2;
		else if (sbp > 160) totalScore += 2;

		const ageVal = parseInt(age);
		if (ageVal >= 75) totalScore += 6;
		else if (ageVal >= 65) totalScore += 4;
		else if (ageVal >= 55) totalScore += 2;

		if (chronicHealth === '1') totalScore += 2;

		setScore(totalScore);
		setHasCalculated(true);
	}, [formData, validateInput]);

	const interpretation = useMemo(() => {
		if (!hasCalculated) return null;

		if (score <= 4) {
			return {
				risk: 'Low',
				mortality: 'Very low',
				color: '#4CAF50'
			};
		} else if (score <= 9) {
			return {
				risk: 'Moderate',
				mortality: 'Low',
				color: '#FFA726'
			};
		} else if (score <= 14) {
			return {
				risk: 'High',
				mortality: 'Moderate',
				color: '#F44336'
			};
		} else {
			return {
				risk: 'Very High',
				mortality: 'High',
				color: '#D32F2F'
			};
		}
	}, [score, hasCalculated]);

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<motion.div 
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className="max-w-2xl mx-auto"
			>
				<Card className="p-6" sx={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
					<Typography variant="h5" className="text-center font-bold mb-2" sx={{ color: '#2C3E50' }}>
						APACHE II Score Calculator
					</Typography>
					<Typography variant="subtitle1" className="text-center text-gray-600 mb-6">
						Enter patient parameters below
					</Typography>

					<Box className="space-y-6">
						<InputField
							label="Temperature"
							value={formData.temperature}
							onChangeText={(value) => handleInputChange('temperature', value)}
							unit="°C"
							guidelines={CLINICAL_GUIDELINES.temperature}
						/>
						<InputField
							label="Heart Rate"
							value={formData.heartRate}
							onChangeText={(value) => handleInputChange('heartRate', value)}
							unit="bpm"
							guidelines={CLINICAL_GUIDELINES.heartRate}
						/>
						<InputField
							label="Respiratory Rate"
							value={formData.respiratoryRate}
							onChangeText={(value) => handleInputChange('respiratoryRate', value)}
							unit="breaths/min"
							guidelines={CLINICAL_GUIDELINES.respiratoryRate}
						/>
						<InputField
							label="Systolic BP"
							value={formData.systolicBP}
							onChangeText={(value) => handleInputChange('systolicBP', value)}
							unit="mmHg"
							guidelines={CLINICAL_GUIDELINES.bloodPressure}
						/>
						<InputField
							label="Age"
							value={formData.age}
							onChangeText={(value) => handleInputChange('age', value)}
							unit="years"
						/>
						<InputField
							label="Chronic Health"
							value={formData.chronicHealth}
							onChangeText={(value) => handleInputChange('chronicHealth', value)}
							helperText="Enter 1 if severe organ insufficiency present, 0 if not"
							keyboardType="numeric"
						/>

						{error && <Alert severity="error" className="mt-4">{error}</Alert>}

						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={calculateScore}
							sx={{ borderRadius: '8px', py: 1.5, backgroundColor: '#2C3E50' }}
						>
							Calculate Score
						</Button>

						{hasCalculated && interpretation && (
							<Box className="space-y-4 mt-6">
								<ScoreCard
									title="APACHE II Score"
									value={score}
									description={`Risk Level: ${interpretation.risk} (${interpretation.mortality} mortality)`}
									color={interpretation.color}
								/>
								<RecommendationsCard score={score} />
							</Box>
						)}
					</Box>
				</Card>
			</motion.div>
		</div>
	);
};

export default APACHEII;