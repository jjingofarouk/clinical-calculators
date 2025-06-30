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
    'Allergy and Immunology': 'hsl(186, 61%, 35%)',
    'Anesthesiology': 'hsl(220, 13%, 46%)',
    'Bariatric Surgery': 'hsl(24, 94%, 50%)',
    'Cardiology': 'hsl(0, 83%, 62%)',
    'Cardiothoracic Surgery': 'hsl(0, 82%, 45%)',
    'Colorectal Surgery': 'hsl(24, 94%, 62%)',
    'Critical Care': 'hsl(160, 82%, 39%)',
    'Dermatology': 'hsl(186, 83%, 45%)',
    'Emergency Medicine': 'hsl(0, 87%, 67%)',
    'Endocrinology': 'hsl(262, 87%, 62%)',
    'ENT': 'hsl(330, 81%, 60%)',
    'Family Medicine': 'hsl(174, 78%, 41%)',
    'Gastroenterology': 'hsl(24, 94%, 50%)',
    'General Surgery': 'hsl(134, 76%, 38%)',
    'Geriatrics': 'hsl(223, 17%, 35%)',
    'Hematology': 'hsl(348, 89%, 47%)',
    'Hepatology': 'hsl(24, 88%, 47%)',
    'Infectious Disease': 'hsl(186, 95%, 39%)',
    'Internal Medicine': 'hsl(229, 70%, 33%)',
    'Medical Genetics': 'hsl(262, 88%, 58%)',
    'Nephrology': 'hsl(220, 13%, 46%)',
    'Neurology': 'hsl(239, 82%, 62%)',
    'Neurosurgery': 'hsl(244, 67%, 53%)',
    'Obstetrics and Gynecology': 'hsl(330, 81%, 60%)',
    'Oncology': 'hsl(36, 92%, 45%)',
    'Ophthalmology': 'hsl(195, 86%, 47%)',
    'Orthopedics': 'hsl(45, 94%, 47%)',
    'Pain Medicine': 'hsl(262, 72%, 37%)',
    'Palliative Care': 'hsl(220, 17%, 62%)',
    'Pathology': 'hsl(20, 14%, 45%)',
    'Pediatrics': 'hsl(335, 76%, 54%)',
    'Physical Medicine': 'hsl(41, 94%, 40%)',
    'Plastic Surgery': 'hsl(188, 90%, 34%)',
    'Psychiatry': 'hsl(271, 70%, 40%)',
    'Pulmonary': 'hsl(221, 83%, 53%)',
    'Radiation Oncology': 'hsl(300, 78%, 47%)',
    'Rheumatology': 'hsl(160, 91%, 27%)',
    'Sports Medicine': 'hsl(36, 92%, 45%)',
    'Toxicology': 'hsl(192, 73%, 28%)',
    'Transplant Medicine': 'hsl(229, 76%, 31%)',
    'Trauma Surgery': 'hsl(0, 82%, 38%)',
    'Urology': 'hsl(195, 86%, 47%)',
    'Vascular Surgery': 'hsl(340, 82%, 38%)',
  };
  return colorMap[label] || 'hsl(220, 13%, 46%)';
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
    <div className="min-h-screen w-full max-w-full m-0 p-6 bg-background text-foreground">
      <h1 className="text-3xl font-bold header mb-2">Clinical Calculators</h1>
      <p className="text-muted-foreground mb-6">
        Quickly access a range of evidence-based medical calculators by category.
      </p>

      <div className="custom-grid">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="card hover:shadow-lg transition duration-200 cursor-pointer"
            onClick={() => navigate(cat.path)}
          >
            <div className="flex items-center gap-4">
              <cat.icon size={32} style={{ color: cat.color }} />
              <div>
                <h2 className="text-lg font-semibold text-foreground">{cat.label}</h2>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}