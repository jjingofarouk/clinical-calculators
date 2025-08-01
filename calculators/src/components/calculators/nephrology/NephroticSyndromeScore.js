import React, { useState } from 'react';
import { Button, Card, TextField, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const NephroticSyndromeScore = () => {
	const [albumin, setAlbumin] = useState('');
	const [proteinuria, setProteinuria] = useState('');
	const [score, setScore] = useState(null);

	const calculateScore = () => {
		if (!albumin || !proteinuria) return;
		const syndromeScore = (parseFloat(albumin) * 0.1 + parseFloat(proteinuria) * 0.2).toFixed(2);
		setScore(syndromeScore);
	};

	return (
		<div className="min-h-screen bg-gray-100 p-6 flex justify-center">
			<motion.div 
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className="w-full max-w-md"
			>
				<Card className="p-6">
					<Typography variant="h4" className="text-center font-bold mb-6">
						Nephrotic Syndrome Score
					</Typography>

					<Box className="space-y-4">
						<Box>
							<TextField
								fullWidth
								variant="outlined"
								label="Albumin (g/dL)"
								placeholder="Reference: 3.5-5.0"
								value={albumin}
								onChange={(e) => setAlbumin(e.target.value)}
								type="number"
								size="small"
							/>
						</Box>

						<Box>
							<TextField
								fullWidth
								variant="outlined"
								label="Proteinuria (mg/day)"
								placeholder="Reference: < 150"
								value={proteinuria}
								onChange={(e) => setProteinuria(e.target.value)}
								type="number"
								size="small"
							/>
						</Box>

						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={calculateScore}
						>
							Calculate Score
						</Button>

						{score && (
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
								<Typography variant="h6" className="text-center mt-6">
									Nephrotic Syndrome Score: {score}
								</Typography>
							</motion.div>
						)}
					</Box>
				</Card>
			</motion.div>
		</div>
	);
};

export default NephroticSyndromeScore;