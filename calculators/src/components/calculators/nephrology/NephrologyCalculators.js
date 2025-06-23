import React, { useState } from "react";
import { Tab, Tabs, Box, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import GFRCalculator from "./GFRCalculator";
import CKDEpiCalculator from "./CKDEpiCalculator";
import CreatinineClearanceCalculator from "./CreatinineClearanceCalculator";
import UrineProteinToCreatinineRatio from "./UrineProteinToCreatinineRatio";
import ChronicKidneyDiseaseStageCalculator from "./ChronicKidneyDiseaseStageCalculator";
import ElectrolyteCalculator from "./ElectrolyteImbalanceCalculator";
import UricAcidCalculator from "./UricAcidCalculator";

const NephrologyCalculators = () => {
	const [selectedCalculator, setSelectedCalculator] = useState("GFR Calculator");
	const [searchQuery, setSearchQuery] = useState("");

	const calculators = [
		"GFR Calculator",
		"CKD-EPI Calculator",
		"Creatinine Clearance Calculator",
		"Urine Protein to Creatinine Ratio",
		"Chronic Kidney Disease Stage Calculator",
		"Electrolyte Calculator",
		"Uric Acid Calculator",
	];

	const filteredCalculators = calculators.filter((calculator) =>
		calculator.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const renderCalculator = () => {
		switch (selectedCalculator) {
			case "GFR Calculator":
				return <GFRCalculator />;
			case "CKD-EPI Calculator":
				return <CKDEpiCalculator />;
			case "Creatinine Clearance Calculator":
				return <CreatinineClearanceCalculator />;
			case "Urine Protein to Creatinine Ratio":
				return <UrineProteinToCreatinineRatio />;
			case "Chronic Kidney Disease Stage Calculator":
				return <ChronicKidneyDiseaseStageCalculator />;
			case "Electrolyte Calculator":
				return <ElectrolyteCalculator />;
			case "Uric Acid Calculator":
				return <UricAcidCalculator />;
			default:
				return (
					<Typography variant="body1" className="text-center text-gray-500 mt-8">
						Select a calculator to get started
					</Typography>
				);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="max-w-4xl mx-auto"
			>
				<Box className="p-4">
					{/* Search Bar */}
					<Box className="mb-4">
						<TextField
							fullWidth
							variant="outlined"
							placeholder="Search calculators..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "8px",
									backgroundColor: "#FFFFFF",
								},
							}}
						/>
					</Box>

					{/* Calculator Tabs */}
					<Tabs
						value={selectedCalculator}
						onChange={(e, newValue) => setSelectedCalculator(newValue)}
						variant="scrollable"
						scrollButtons="auto"
						sx={{
							backgroundColor: "#F9FAFB",
							borderBottom: "1px solid #E5E7EB",
							"& .MuiTab-root": {
								borderRadius: "12px",
								mx: 1,
								my: 1,
								backgroundColor: "#FFFFFF",
								border: "1px solid #E5E7EB",
								color: "#1F2937",
								"&.Mui-selected": {
									backgroundColor: "#27C7B8",
									color: "#FFFFFF",
									border: "none",
									boxShadow:
										"0 2px 4px rgba(39, 199, 184, 0.2)",
								},
							},
							"& .MuiTabs-indicator": {
								display: "none",
							},
						}}
					>
						{filteredCalculators.map((calculator) => (
							<Tab
								key={calculator}
								label={calculator}
								value={calculator}
							/>
						))}
					</Tabs>

					{/* Calculator Body */}
					<Box className="p-4">{renderCalculator()}</Box>
				</Box>
			</motion.div>
		</div>
	);
};

export default NephrologyCalculators;