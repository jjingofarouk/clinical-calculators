import React, { useState } from 'react';
import { Card, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { motion } from 'framer-motion';

const EDSS = () => {
  const [scores, setScores] = useState({
    pyramidal: 0,
    cerebellar: 0,
    brainstem: 0,
    sensory: 0,
    bowelBladder: 0,
    visual: 0,
    cerebral: 0,
    other: 0,
    ambulation: 0
  });

  const [showGuidelines, setShowGuidelines] = useState(false);

  const functionalSystems = {
    pyramidal: {
      title: "Pyramidal Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Abnormal signs without disability" },
        { score: 2, description: "Minimal disability" },
        { score: 3, description: "Mild or moderate paraparesis or hemiparesis; severe monoparesis" },
        { score: 4, description: "Marked paraparesis or hemiparesis; moderate quadriparesis; or monoplegia" },
        { score: 5, description: "Paraplegia, hemiplegia, or marked quadriparesis" },
        { score: 6, description: "Quadriplegia" }
      ]
    },
    cerebellar: {
      title: "Cerebellar Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Abnormal signs without disability" },
        { score: 2, description: "Mild ataxia" },
        { score: 3, description: "Moderate truncal or limb ataxia" },
        { score: 4, description: "Severe ataxia, all limbs" },
        { score: 5, description: "Unable to perform coordinated movements due to ataxia" }
      ]
    },
    brainstem: {
      title: "Brainstem Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Signs only" },
        { score: 2, description: "Moderate nystagmus or other mild disability" },
        { score: 3, description: "Severe nystagmus, marked extraocular weakness, or moderate disability of other cranial nerves" },
        { score: 4, description: "Marked dysarthria or other marked disability" },
        { score: 5, description: "Inability to swallow or speak" }
      ]
    },
    sensory: {
      title: "Sensory Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Vibration or figure-writing decrease only, in 1-2 limbs" },
        { score: 2, description: "Mild decrease in touch, pain or position sense, and/or moderate decrease in vibration in 1-2 limbs; or vibratory decrease alone in 3-4 limbs" },
        { score: 3, description: "Moderate decrease in touch, pain or position sense, and/or lost vibration in 1-2 limbs; or mild decrease in touch, pain and/or moderate decrease in all proprioceptive tests in 3-4 limbs" },
        { score: 4, description: "Marked decrease in touch or pain or loss of proprioception, alone or combined, in 1-2 limbs; or moderate decrease in touch, pain and/or severe proprioceptive decrease in >2 limbs" },
        { score: 5, description: "Loss of sensation in 1-2 limbs; or moderate decrease in touch, pain and/or loss of proprioception for most of the body below the head" },
        { score: 6, description: "Sensation essentially lost below the head" }
      ]
    },
    bowelBladder: {
      title: "Bowel and Bladder Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Mild urinary hesitancy, urgency, or retention" },
        { score: 2, description: "Moderate hesitancy, urgency, retention of bowel or bladder, or rare urinary incontinence" },
        { score: 3, description: "Frequent urinary incontinence" },
        { score: 4, description: "In need of almost constant catheterization" },
        { score: 5, description: "Loss of bladder function" },
        { score: 6, description: "Loss of bowel and bladder function" }
      ]
    },
    visual: {
      title: "Visual (Optic) Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Scotoma with visual acuity (corrected) better than 20/30" },
        { score: 2, description: "Worse eye with scotoma with maximal visual acuity (corrected) of 20/30 to 20/59" },
        { score: 3, description: "Worse eye with large scotoma, or moderate decrease in fields, but with maximal visual acuity (corrected) of 20/60 to 20/99" },
        { score: 4, description: "Worse eye with marked decrease of fields and maximal visual acuity (corrected) of 20/100-20/200; grade 3 plus maximal acuity of better eye of ≤20/60" },
        { score: 5, description: "Worse eye with maximal visual acuity (corrected) less than 20/200; grade 4 plus maximal acuity of better eye of 20/60 or less" },
        { score: 6, description: "Grade 5 plus maximal visual acuity of better eye of 20/60 or less" }
      ]
    },
    cerebral: {
      title: "Cerebral (Mental) Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Mood alteration only (Does not affect DSS score)" },
        { score: 2, description: "Mild decrease in mentation" },
        { score: 3, description: "Moderate decrease in mentation" },
        { score: 4, description: "Marked decrease in mentation (chronic brain syndrome - moderate)" },
        { score: 5, description: "Dementia or chronic brain syndrome - severe or incompetent" }
      ]
    },
    other: {
      title: "Other Functions",
      options: [
        { score: 0, description: "Normal" },
        { score: 1, description: "Any other neurologic findings attributed to MS" }
      ]
    },
    ambulation: {
      title: "Ambulation",
      options: [
        { score: 0, description: "Fully ambulatory" },
        { score: 4, description: "Fully ambulatory, self-sufficient, up 12 hours a day despite relatively severe disability. Able to walk ≥500 meters without aid/rest." },
        { score: 4.5, description: "Fully ambulatory, able to work a full day, may require minimal assistance. Able to walk ≥300 meters without aid/rest." },
        { score: 5, description: "Ambulatory for 200 meters without aid/rest; disability that impairs full daily activities." },
        { score: 5.5, description: "Ambulatory for 100 meters without aid/rest; disability precludes full daily activities." },
        { score: 6, description: "Intermittent or unilateral constant assistance required to walk 100 meters, with/without resting." },
        { score: 6.5, description: "Constant bilateral assistance required to walk 20 meters without resting." },
        { score: 7, description: "Unable to walk >5 meters even with aid; restricted to wheelchair; wheels self in standard wheelchair and transfers alone." },
        { score: 7.5, description: "Unable to take more than steps; restricted to wheelchair; may need aid in transfer." },
        { score: 8, description: "Restricted to bed/chair or perambulated in wheelchair, but may be out of bed itself much of the day." },
        { score: 8.5, description: "Restricted to bed much of the day; has some effective use of arms; retains some self-care functions." },
        { score: 9, description: "Helpless bed patient; can communicate and eat." },
        { score: 9.5, description: "Totally helpless bed patient; unable to communicate effectively or eat/swallow." },
        { score: 10, description: "Death due to MS." }
      ]
    }
  };

  const calculateEDSS = () => {
    const fsScores = {
      pyramidal: scores.pyramidal,
      cerebellar: scores.cerebellar,
      brainstem: scores.brainstem,
      sensory: scores.sensory,
      bowelBladder: scores.bowelBladder,
      visual: scores.visual,
      cerebral: scores.cerebral,
      other: scores.other
    };

    const maxFS = Math.max(...Object.values(fsScores));
    const numFS2Plus = Object.values(fsScores).filter(score => score >= 2).length;

    if (scores.ambulation >= 7) {
      return scores.ambulation;
    }

    if (maxFS <= 1) {
      return 1.0;
    }

    if (scores.ambulation === 0) {
      if (maxFS === 2) {
        return 2.0;
      }
      if (maxFS === 3) {
        return numFS2Plus >= 2 ? 3.0 : 2.5;
      }
      if (maxFS === 4) {
        return numFS2Plus >= 2 ? 3.5 : 3.0;
      }
    }

    if (scores.ambulation >= 4) {
      return Math.max(scores.ambulation, maxFS);
    }

    return Math.min(4, maxFS + 1);
  };

  const ScoreSection = ({ system, scores, setScores }) => (
    <Card className="p-4 mb-4" sx={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
      <Typography variant="h6" className="font-bold mb-2" sx={{ color: '#2c3e50' }}>
        {functionalSystems[system].title}
      </Typography>
      {functionalSystems[system].options.map((option, index) => (
        <Button
          key={index}
          variant={scores[system] === option.score ? "contained" : "outlined"}
          fullWidth
          onClick={() => setScores({...scores, [system]: option.score})}
          sx={{
            mb: 1,
            textAlign: 'left',
            justifyContent: 'flex-start',
            textTransform: 'none',
            borderRadius: '5px',
            backgroundColor: scores[system] === option.score ? '#e3f2fd' : '#f8f9fa',
            borderColor: scores[system] === option.score ? '#2196f3' : '#e0e0e0',
            color: '#333',
          }}
        >
          <Typography variant="body2">
            Score {option.score}: {option.description}
          </Typography>
        </Button>
      ))}
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="p-6" sx={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Typography variant="h5" className="text-center font-bold mb-4" sx={{ color: '#2c3e50' }}>
            EDSS Assessment Tool
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setShowGuidelines(true)}
            sx={{ mb: 4, borderRadius: '10px', backgroundColor: '#2196f3' }}
          >
            View Clinical Guidelines
          </Button>

          {Object.keys(functionalSystems).map((system) => (
            <ScoreSection
              key={system}
              system={system}
              scores={scores}
              setScores={setScores}
            />
          ))}

          <Card className="p-4 mt-4" sx={{ backgroundColor: '#fff', borderRadius: '10px' }}>
            <Typography variant="h6" className="text-center font-bold mb-2">
              EDSS Score: {calculateEDSS().toFixed(1)}
            </Typography>
            <Typography variant="body2" className="text-center text-gray-600">
              Based on:
              <br />- Functional Systems Scores
              <br />- Ambulation Assessment
            </Typography>
          </Card>

          <Dialog
            open={showGuidelines}
            onClose={() => setShowGuidelines(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle sx={{ fontWeight: 'bold', color: '#333' }}>
              Clinical Guidelines
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ color: '#333', lineHeight: 1.5 }}>
                The Expanded Disability Status Scale (EDSS) is used to quantify disability in multiple sclerosis:
                <br /><br />
                • Scores 1.0 to 4.5: Fully ambulatory patients
                <br />
                • Scores 5.0 to 9.5: Impairment to ambulation
                <br /><br />
                Assessment Guidelines:
                <br /><br />
                1. Evaluate each functional system independently
                <br />
                2. Consider impact on daily activities
                <br />
                3. Document objective findings
                <br />
                4. Regular reassessment recommended
                <br /><br />
                Note: The final EDSS score is heavily weighted toward ambulatory ability in the middle and high range of the scale.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setShowGuidelines(false)}
                color="error"
                sx={{ borderRadius: '10px' }}
              >
                Close Guidelines
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </motion.div>
    </div>
  );
};

export default EDSS;