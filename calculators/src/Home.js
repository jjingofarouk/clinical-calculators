import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Brain, Wind, Stethoscope, Baby, Bone, Droplet, Activity, Calculator } from 'lucide-react';

const categories = [
  { label: 'General', icon: Calculator, color: '#0f766e', path: '/calculators/General', description: 'BMI, BMR, etc.' },
  { label: 'Cardiovascular', icon: Heart, color: '#ef4444', path: '/calculators/Cardiovascular', description: 'ASCVD, CHADSVASC' },
  { label: 'Neurology', icon: Brain, color: '#6366f1', path: '/calculators/Neurology', description: 'GCS, NIHSS' },
  { label: 'Pulmonary', icon: Wind, color: '#3b82f6', path: '/calculators/Pulmonary', description: 'BODE, CURB-65' },
  { label: 'Gastroenterology', icon: Stethoscope, color: '#f97316', path: '/calculators/Gastroenterology', description: 'Child-Pugh, FIB-4' },
  { label: 'Obstetrics', icon: Baby, color: '#ec4899', path: '/calculators/Obstetrics', description: 'Due date, Bishop' },
  { label: 'Orthopedics', icon: Bone, color: '#eab308', path: '/calculators/Orthopedics', description: 'Ottawa rules' },
  { label: 'Nephrology', icon: Droplet, color: '#64748b', path: '/calculators/Nephrology', description: 'eGFR, KDIGO' },
  { label: 'ICU', icon: Activity, color: '#10b981', path: '/calculators/ICU', description: 'SOFA, APACHE' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-8 w-full max-w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Clinical Calculators</h1>
      <p className="text-gray-600 mb-6">
        Quickly access a range of evidence-based medical calculators by category.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-full">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer w-full"
            onClick={() => navigate(cat.path)}
          >
            <div className="flex items-center gap-4 p-4">
              <cat.icon size={32} style={{ color: cat.color }} />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{cat.label}</h2>
                <p className="text-sm text-gray-600">{cat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}