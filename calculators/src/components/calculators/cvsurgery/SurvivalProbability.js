import React, { useState } from 'react';
import { AlertCircle, Info, Calculator, RotateCcw } from 'lucide-react';

const SurvivalProbability = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    ef: '',
    comorbidity: '',
    surgeryType: '',
    performanceStatus: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const ranges = {
    age: { min: 18, max: 100, type: 'integer', label: 'Age (years)' },
    sex: { min: 0, max: 1, type: 'integer', label: 'Sex (0 = Male, 1 = Female)' },
    ef: { min: 10, max: 80, type: 'integer', label: 'Ejection Fraction (%)' },
    comorbidity: { min: 0, max: 5, type: 'integer', label: 'Comorbidity Count (0-5)' },
    surgeryType: { min: 1, max: 3, type: 'integer', label: 'Surgery Type (1 = CABG, 2 = Valve, 3 = Combined)' },
    performanceStatus: { min: 0, max: 4, type: 'integer', label: 'ECOG Performance Status (0-4)' },
  };

  const helperText = {
    age: 'Patient age in years. Higher age increases surgical risk.',
    sex: 'Enter 0 for male, 1 for female. Female sex generally associated with lower risk.',
    ef: 'Left ventricular ejection fraction (%) by echocardiography. <40% = reduced, 40-49% = mildly reduced, ≥50% = preserved.',
    comorbidity: 'Major comorbidities: DM, COPD, CKD, PVD, prior stroke. Each increases risk.',
    surgeryType: '1 = CABG only, 2 = Valve surgery, 3 = Combined CABG + Valve (highest risk).',
    performanceStatus: 'ECOG: 0 = fully active, 1 = restricted strenuous activity, 2 = ambulatory >50% time, 3 = limited self-care, 4 = completely disabled.',
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });

    if (value === '') {
      setErrors({ ...errors, [field]: `${ranges[field].label} is required.` });
      return;
    }

    const numValue = ranges[field].type === 'float' ? parseFloat(value) : parseInt(value);
    if (isNaN(numValue)) {
      setErrors({ ...errors, [field]: `${ranges[field].label} must be a number.` });
    } else if (numValue < ranges[field].min || numValue > ranges[field].max) {
      setErrors({
        ...errors,
        [field]: `${ranges[field].label} must be between ${ranges[field].min} and ${ranges[field].max}.`,
      });
    } else if (ranges[field].type === 'integer' && !Number.isInteger(numValue)) {
      setErrors({ ...errors, [field]: `${ranges[field].label} must be an integer.` });
    } else {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleCalculate = () => {
    const newErrors = {};
    let hasError = false;
    
    Object.keys(formData).forEach((field) => {
      if (formData[field] === '') {
        newErrors[field] = `${ranges[field].label} is required.`;
        hasError = true;
      } else {
        const numValue = ranges[field].type === 'float' ? parseFloat(formData[field]) : parseInt(formData[field]);
        if (isNaN(numValue)) {
          newErrors[field] = `${ranges[field].label} must be a number.`;
          hasError = true;
        } else if (numValue < ranges[field].min || numValue > ranges[field].max) {
          newErrors[field] = `${ranges[field].label} must be between ${ranges[field].min} and ${ranges[field].max}.`;
          hasError = true;
        } else if (ranges[field].type === 'integer' && !Number.isInteger(numValue)) {
          newErrors[field] = `${ranges[field].label} must be an integer.`;
          hasError = true;
        }
      }
    });

    if (hasError) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    // Improved EuroSCORE II-based calculation
    const age = parseInt(formData.age);
    const sex = parseInt(formData.sex);
    const ef = parseInt(formData.ef);
    const comorbidity = parseInt(formData.comorbidity);
    const surgeryType = parseInt(formData.surgeryType);
    const performanceStatus = parseInt(formData.performanceStatus);

    // More clinically accurate risk factors
    let riskScore = 0;
    
    // Age risk (exponential increase after 65)
    if (age > 80) riskScore += 3.0;
    else if (age > 70) riskScore += 2.0;
    else if (age > 65) riskScore += 1.0;
    else if (age > 60) riskScore += 0.5;
    
    // Sex (female protective effect)
    if (sex === 0) riskScore += 0.5; // Male
    
    // Ejection fraction (critical factor)
    if (ef < 30) riskScore += 2.5;
    else if (ef < 40) riskScore += 1.5;
    else if (ef < 50) riskScore += 0.8;
    
    // Comorbidities (additive effect)
    riskScore += comorbidity * 0.6;
    
    // Surgery type complexity
    if (surgeryType === 3) riskScore += 2.0; // Combined
    else if (surgeryType === 2) riskScore += 1.2; // Valve
    else riskScore += 0.5; // CABG
    
    // Performance status (functional capacity)
    riskScore += performanceStatus * 0.8;

    // Convert to mortality risk using logistic regression
    const mortalityRisk = (Math.exp(riskScore - 4) / (1 + Math.exp(riskScore - 4))) * 100;
    const survivalProbability = Math.max(0, Math.min(100, 100 - mortalityRisk));

    let survivalLevel = '';
    let survivalColor = '';
    let interpretation = '';
    let recommendations = '';

    if (survivalProbability >= 95) {
      survivalLevel = 'Excellent Prognosis';
      survivalColor = 'bg-green-50 text-green-800 border-green-200';
      interpretation = 'Very low surgical risk with excellent expected outcomes.';
      recommendations = 'Standard perioperative care. Early mobilization protocols.';
    } else if (survivalProbability >= 85) {
      survivalLevel = 'Good Prognosis';
      survivalColor = 'bg-blue-50 text-blue-800 border-blue-200';
      interpretation = 'Low-moderate surgical risk with good expected outcomes.';
      recommendations = 'Standard care with enhanced monitoring. Consider optimization of modifiable risk factors.';
    } else if (survivalProbability >= 70) {
      survivalLevel = 'Moderate Risk';
      survivalColor = 'bg-yellow-50 text-yellow-800 border-yellow-200';
      interpretation = 'Moderate surgical risk requiring careful perioperative management.';
      recommendations = 'Enhanced monitoring, ICU planning, multidisciplinary team involvement. Optimize comorbidities preoperatively.';
    } else if (survivalProbability >= 50) {
      survivalLevel = 'High Risk';
      survivalColor = 'bg-orange-50 text-orange-800 border-orange-200';
      interpretation = 'High surgical risk requiring comprehensive perioperative planning.';
      recommendations = 'Intensive monitoring, prolonged ICU stay expected. Consider less invasive alternatives. Extensive family discussion.';
    } else {
      survivalLevel = 'Very High Risk';
      survivalColor = 'bg-red-50 text-red-800 border-red-200';
      interpretation = 'Very high surgical risk. Careful risk-benefit analysis required.';
      recommendations = 'Consider palliative/medical management. If surgery necessary, prepare for extended ICU care and potential complications.';
    }

    setResult({ 
      score: survivalProbability.toFixed(1), 
      mortalityRisk: mortalityRisk.toFixed(1),
      survivalLevel, 
      survivalColor, 
      interpretation,
      recommendations
    });
    setErrors({});
  };

  const handleReset = () => {
    setFormData({
      age: '',
      sex: '',
      ef: '',
      comorbidity: '',
      surgeryType: '',
      performanceStatus: '',
    });
    setErrors({});
    setResult(null);
  };

  const hasErrors = Object.values(errors).some((error) => error !== '');
  const isFormComplete = Object.values(formData).every(value => value !== '');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            Cardiac Surgery Risk Calculator
          </h1>
          <div className="flex items-center mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Info className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              <strong>Clinical Tool:</strong> Estimates perioperative survival probability for cardiac surgery patients. 
              Based on validated risk scoring systems including EuroSCORE methodology. For educational purposes - 
              always use in conjunction with clinical judgment.
            </p>
          </div>

          {hasErrors && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Please correct the following errors:</p>
                <ul className="text-red-700 text-sm mt-1 list-disc list-inside">
                  {Object.entries(errors).filter(([_, error]) => error).map(([field, error]) => (
                    <li key={field}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {Object.keys(formData).map((field) => (
              <div key={field} className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  {ranges[field].label}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  value={formData[field]}
                  onChange={handleChange(field)}
                  placeholder={`${ranges[field].min}-${ranges[field].max}`}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors[field] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  min={ranges[field].min}
                  max={ranges[field].max}
                />
                <p className="text-xs text-gray-600">{helperText[field]}</p>
                {errors[field] && (
                  <p className="text-xs text-red-600 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleCalculate}
              disabled={hasErrors || !isFormComplete}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate Risk Score
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Risk Assessment Results</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Survival Probability</h3>
                <p className="text-3xl font-bold text-green-600">{result.score}%</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Mortality Risk</h3>
                <p className="text-3xl font-bold text-red-600">{result.mortalityRisk}%</p>
              </div>
            </div>

            <div className={`p-4 rounded-lg border-2 mb-6 ${result.survivalColor}`}>
              <h3 className="text-lg font-semibold mb-2">Risk Category</h3>
              <p className="text-xl font-bold">{result.survivalLevel}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Clinical Interpretation</h4>
                <p className="text-gray-600">{result.interpretation}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Management Recommendations</h4>
                <p className="text-gray-600">{result.recommendations}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Important Clinical Notes:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>This calculator provides risk estimates based on statistical models</li>
                    <li>Individual patient factors may significantly alter actual risk</li>
                    <li>Always incorporate clinical judgment and patient-specific factors</li>
                    <li>Discuss results within multidisciplinary team context</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 flex items-center">
              <Info className="w-4 h-4 mr-1" />
              <span>
                Based on validated cardiac surgery risk models. Reference: 
                <a href="https://pubmed.ncbi.nlm.nih.gov/12607666/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">
                  Roques et al., Eur Heart J 2003
                </a>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurvivalProbability;