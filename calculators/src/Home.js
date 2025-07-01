import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Search,
  Zap,
  Users,
  Shield,
  Clock,
  TrendingUp,
  ArrowRight,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { sidebarItems } from './data/sidebarItems';

const categories = sidebarItems.map(item => ({
  label: item.label,
  icon: item.icon,
  color: getCategoryColor(item.label),
  path: item.path,
  description: getCategoryDescription(item.label, item.calculators),
  calculatorCount: item.calculators?.length || 0,
}));

function getCategoryColor(label) {
  const colorMap = {
    'Allergy and Immunology': 'hsl(186, 61%, 35%)',
    'Anesthesiology': 'hsl(220, 13%, 46%)',
    'Bariatrics': 'hsl(24, 94%, 50%)',
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
    'Bariatrics': 'BMI, Weight Loss',
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
  return descriptionMap[label] || calculators?.slice(0, 2).join(', ') || '';
}

export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    const filtered = categories.filter(cat =>
      cat.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm]);

  const totalCalculators = categories.reduce((sum, cat) => sum + cat.calculatorCount, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-card border-b border-border"
      >
        <div className="absolute inset-0 bg-accent/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                <Calculator className="w-10 h-10 text-primary" />
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl font-bold text-foreground mb-6"
            >
              Clinical Calculators
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            >
              The most comprehensive collection of evidence-based medical calculators, 
              trusted by healthcare professionals worldwide for accurate clinical decision support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-8 mb-12"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">{categories.length}+ Specialties</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">{totalCalculators}+ Calculators</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">Evidence-Based</span>
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search specialties or calculators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-background border border-input rounded-radius focus:outline-none focus:ring-2 ring-ring shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Key Features */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 bg-muted/30"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Instant calculations with real-time results" },
              { icon: Shield, title: "Evidence-Based", desc: "Validated by peer-reviewed research" },
              { icon: Users, title: "Trusted by Experts", desc: "Used by healthcare professionals globally" },
              { icon: Clock, title: "Always Updated", desc: "Latest guidelines and recommendations" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={featureVariants}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Medical Specialties
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive collection of specialty-specific calculators, 
              each category containing multiple validated tools for clinical practice.
            </p>
          </motion.div>

          <AnimatePresence>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredCategories.map((cat, index) => (
                <motion.div
                  key={cat.label}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-card border border-border rounded-radius p-6 cursor-pointer transition-all duration-300 hover:border-primary/20"
                  onClick={() => navigate(cat.path)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-radius flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${cat.color}15` }}
                    >
                      <cat.icon 
                        size={24} 
                        style={{ color: cat.color }} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-card-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                        {cat.label}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {cat.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {cat.calculatorCount} calculators
                        </span>
                        <ArrowRight 
                          className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" 
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredCategories.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Results Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all categories above.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-card border-t border-border"
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-card-foreground mb-4">
            Elevate Your Clinical Practice
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who rely on our platform 
            for accurate, evidence-based clinical calculations every day.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchTerm('')}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-radius font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Calculator className="w-5 h-5" />
            Explore All Calculators
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}