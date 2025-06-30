import React, { useState } from 'react';

const RCRI = () => {
  const [formData, setFormData] = useState({
    highRiskSurgery: false,
    ischemicHeartDisease: false,
    heartFailure: false,
    cerebrovascularDisease: false,
    diabetesOnInsulin: false,
    creatinineAbove2: false,
  });
  const [score, setScore] = useState(null);
  const [risk, setRisk] = useState(null);

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const calculateRCRI = () => {
    const score = Object.values(formData).filter(Boolean).length;
    setScore(score);

    let riskLevel, riskPercentage;
    switch (score) {
      case 0:
        riskLevel = 'Low Risk';
        riskPercentage = '0.4%';
        break;
      case 1:
        riskLevel = 'Low Risk';
        riskPercentage = '0.9%';
        break;
      case 2:
        riskLevel = 'Moderate Risk';
        riskPercentage = '6.6%';
        break;
      case 3:
      case 4:
      case 5:
      case 6:
        riskLevel = 'High Risk';
        riskPercentage = '11%';
        break;
      default:
        riskLevel = 'Unknown';
        riskPercentage = 'N/A';
    }
    setRisk({ level: riskLevel, percentage: riskPercentage });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="bg-card rounded-radius shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-card-foreground mb-4">Revised Cardiac Risk Index (RCRI) Calculator</h1>
          <p className="text-muted-foreground mb-6">
            The RCRI is used to assess the risk of major cardiac complications in patients undergoing non-cardiac surgery. Check all applicable risk factors and click "Calculate" to see the risk score and estimated complication rate.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {[
              { name: 'highRiskSurgery', label: 'High-risk surgery (e.g., intraperitoneal, intrathoracic, or suprainguinal vascular)' },
              { name: 'ischemicHeartDisease', label: 'History of ischemic heart disease (e.g., prior MI, angina)' },
              { name: 'heartFailure', label: 'History of congestive heart failure' },
              { name: 'cerebrovascularDisease', label: 'History of cerebrovascular disease (e.g., stroke, TIA)' },
              { name: 'diabetesOnInsulin', label: 'Diabetes mellitus requiring insulin' },
              { name: 'creatinineAbove2', label: 'Serum creatinine >2.0 mg/dL or chronic dialysis' },
            ].map((factor) => (
              <label key={factor.name} className="flex items-center space-x-2 text-card-foreground">
                <input
                  type="checkbox"
                  name={factor.name}
                  checked={formData[factor.name]}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-primary focus:ring-ring border-border rounded"
                />
                <span>{factor.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={calculateRCRI}
            className="mt-6 bg-primary text-primary-foreground px-4 py-2 rounded-radius hover:bg-accent hover:text-accent-foreground transition"
          >
            Calculate RCRI
          </button>

          {score !== null && risk && (
            <div className="mt-6 p-4 bg-secondary rounded-radius">
              <h2 className="text-lg font-semibold text-secondary-foreground">Results</h2>
              <p className="text-muted-foreground">
                <strong>RCRI Score:</strong> {score}
              </p>
              <p className="text-muted-foreground">
                <strong>Risk Level:</strong> {risk.level}
              </p>
              <p className="text-muted-foreground">
                <strong>Estimated Risk of Major Cardiac Complications:</strong> {risk.percentage}
              </p>
            </div>
          )}
        </div>

        <div className="bg-card rounded-radius shadow-lg p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Clinical Guidance</h2>
          <p className="text-muted-foreground mb-4">
            The Revised Cardiac Risk Index (RCRI) is a validated tool to estimate the risk of perioperative major adverse cardiac events (MACE) in patients undergoing non-cardiac surgery. It is based on six independent predictors, each contributing one point to the total score.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li>
              <strong>High-risk surgery:</strong> Includes intraperitoneal, intrathoracic, or suprainguinal vascular procedures, which carry higher cardiac risk due to their invasiveness.
            </li>
            <li>
              <strong>Ischemic heart disease:</strong> Defined by a history of myocardial infarction, positive stress test, current angina, or use of nitrate therapy.
            </li>
            <li>
              <strong>Congestive heart failure:</strong> Indicated by a history of heart failure, pulmonary edema, or paroxysmal nocturnal dyspnea.
            </li>
            <li>
              <strong>Cerebrovascular disease:</strong> Includes prior stroke or transient ischemic attack (TIA).
            </li>
            <li>
              <strong>Diabetes on insulin:</strong> Applies to patients requiring insulin for diabetes management.
            </li>
            <li>
              <strong>Renal insufficiency:</strong> Defined as serum creatinine >2.0 mg/dL or chronic dialysis.
            </li>
          </ul>
          <p className="text-muted-foreground mb-4">
            <strong>Risk Interpretation:</strong>
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-4">
            <li>Score 0: Low risk (0.4% risk of MACE)</li>
            <li>Score 1: Low risk (0.9% risk of MACE)</li>
            <li>Score 2: Moderate risk (6.6% risk of MACE)</li>
            <li>Score ≥3: High risk (11% risk of MACE)</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Clinical Recommendations:</strong> For patients with moderate to high risk (score ≥2), consider preoperative cardiac evaluation, optimization of medical therapy, or consultation with a cardiologist. Low-risk patients may proceed with surgery without additional cardiac testing unless other clinical factors suggest otherwise. Always integrate RCRI results with patient-specific factors and surgical urgency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RCRI;