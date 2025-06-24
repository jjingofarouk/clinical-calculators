import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Baby,
  Bone,
  Brain,
  Calculator,
  Droplet,
  Heart,
  Stethoscope,
  Wind,
} from 'lucide-react';
import { sidebarItems } from './data/sidebarItems';

const categories = sidebarItems.map(item => ({
  label: item.label,
  icon: item.icon,
  color: getCategoryColor(item.label),
  path: item.path,
  description: getCategoryDescription(item.label, item.calculators),
}));

function getCategoryColor(label) {
  const colorMap = {
    'Allergy and Immunology': '#0f766e',
    'Anesthesiology': '#6b7280',
    'Bariatric Surgery': '#f97316',
    'Cardiology': '#ef4444',
    'Cardiothoracic Surgery': '#dc2626',
    'Colorectal Surgery': '#fb923c',
    'Critical Care': '#10b981',
    'Dermatology': '#22d3ee',
    'Emergency Medicine': '#f87171',
    'Endocrinology': '#8b5cf6',
    'ENT': '#ec4899',
    'Family Medicine': '#14b8a6',
    'Gastroenterology': '#f97316',
    'General Surgery': '#16a34a',
    'Geriatrics': '#475569',
    'Hematology': '#e11d48',
    'Hepatology': '#ea580c',
    'Infectious Disease': '#06b6d4',
    'Internal Medicine': '#1d4ed8',
    'Medical Genetics': '#7c3aed',
    'Nephrology': '#64748b',
    'Neurology': '#6366f1',
    'Neurosurgery': '#4f46e5',
    'Obstetrics and Gynecology': '#ec4899',
    'Oncology': '#d97706',
    'Ophthalmology': '#0ea5e9',
    'Orthopedics': '#eab308',
    'Pain Medicine': '#6d28d9',
    'Palliative Care': '#94a3b8',
    'Pathology': '#78716c',
    'Pediatrics': '#db2777',
    'Physical Medicine': '#ca8a04',
    'Plastic Surgery': '#0891b2',
    'Psychiatry': '#7e22ce',
    'Pulmonary': '#3b82f6',
    'Radiation Oncology': '#c026d3',
    'Rheumatology': '#047857',
    'Sports Medicine': '#d97706',
    'Toxicology': '#155e75',
    'Transplant Medicine': '#1e40af',
    'Trauma Surgery': '#b91c1c',
    'Urology': '#0ea5e9',
    'Vascular Surgery': '#9f1239',
  };
  return colorMap[label] || '#6b7280';
}

function getCategoryDescription(label, calculators) {
  const descriptionMap = {
    'Allergy and Immunology': 'SCORAD, EASI, IgE',
    'Anesthesiology': 'ASA, Mallampati',
    'Bariatric Surgery': 'BMI, Weight Loss',
    'Cardiology': 'ASCVD, CHA2DS2-VASc',
    'Cardiothoracic Surgery': 'EuroSCORE, STS',
    'Colorectal Surgery': 'CR-POSSUM, LARS',
    'Critical Care': 'SOFA, APACHE II',
    'Dermatology': 'PASI, SCORAD',
    'Emergency Medicine': 'Ottawa Rules, PERC',
    'Endocrinology': 'HbA1c, HOMA-IR',
    'ENT': 'SNOT-22, NOSE',
    'Family Medicine': 'Framingham, PHQ9',
    'Gastroenterology': 'MELD, Child-Pugh',
    'General Surgery': 'POSSUM, ACS NSQIP',
    'Geriatrics': 'Frailty, MMSE',
    'Hematology': 'DIC, HAS-BLED',
    'Hepatology': 'MELD, FIB-4',
    'Infectious Disease': 'CURB-65, Sepsis',
    'Internal Medicine': 'Charlson, eGFR',
    'Medical Genetics': 'BRCA, Lynch',
    'Nephrology': 'eGFR, KDIGO',
    'Neurology': 'GCS, NIHSS',
    'Neurosurgery': 'ICH, Spetzler-Martin',
    'Obstetrics and Gynecology': 'EDD, Bishop',
    'Oncology': 'TNM, ECOG',
    'Ophthalmology': 'IOP, Glaucoma',
    'Orthopedics': 'WOMAC, FRAX',
    'Pain Medicine': 'VAS, PainDETECT',
    'Palliative Care': 'PPS, ESAS',
    'Pathology': 'TNM, Gleason',
    'Pediatrics': 'Apgar, Growth',
    'Physical Medicine': 'Oswestry, FIM',
    'Plastic Surgery': 'TBSA, Parkland',
    'Psychiatry': 'PHQ9, GAD7',
    'Pulmonary': 'BODE, CURB-65',
    'Radiation Oncology': 'BED, EQD2',
    'Rheumatology': 'DAS28, SLEDAI',
    'Sports Medicine': 'KOOS, IKDC',
    'Toxicology': 'Anion Gap, Rumack',
    'Transplant Medicine': 'MELD, DRI',
    'Trauma Surgery': 'RTS, ISS',
    'Urology': 'IPSS, PSA',
    'Vascular Surgery': 'ABI, Caprini',
  };
  return descriptionMap[label] || calculators.slice(0, 2).join(', ');
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 w-full max-w-full m-0 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Clinical Calculators</h1>
      <p className="text-gray-600 mb-6">
        Quickly access a range of evidence-based medical calculators by category.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-full">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer w-full p-4"
            onClick={() => navigate(cat.path)}
          >
            <div className="flex items-center gap-4">
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