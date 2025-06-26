import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft, Calculator } from 'lucide-react';

const NotFound = () => {
  const messages = [
    {
      title: "Clinical Calculator Development in Progress",
      subtitle: "Our medical informatics team is currently developing and validating this clinical decision support tool. Please return shortly for access to this evidence-based calculator.",
      icon: Calculator
    },
    {
      title: "Medical Tool Under Construction",
      subtitle: "This diagnostic calculator is undergoing rigorous clinical validation and quality assurance testing. We appreciate your patience as we ensure accuracy and reliability.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Tool in Development",
      subtitle: "Our clinical development team is finalizing the algorithms and validation studies for this medical calculator. Implementation will be available soon.",
      icon: Calculator
    },
    {
      title: "Clinical Decision Support Coming Soon",
      subtitle: "This evidence-based calculator is currently in the final stages of clinical review and validation. Please check back for availability.",
      icon: Calculator
    },
    {
      title: "Medical Calculator Under Review",
      subtitle: "Our clinical advisory board is conducting final validation of this diagnostic tool to ensure adherence to current medical guidelines and best practices.",
      icon: Calculator
    },
    {
      title: "Diagnostic Tool in Beta Testing",
      subtitle: "This clinical calculator is undergoing comprehensive testing and validation by our medical experts. Launch will occur following successful completion of quality assurance protocols.",
      icon: Calculator
    },
    {
      title: "Clinical Algorithm Under Development",
      subtitle: "Our medical informatics specialists are refining the clinical algorithms and ensuring compliance with current evidence-based medicine standards.",
      icon: Calculator
    },
    {
      title: "Medical Scoring System in Progress",
      subtitle: "This clinical scoring tool is being developed with input from leading medical professionals and will be available following peer review and validation.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Calculator Pending",
      subtitle: "Our clinical team is conducting final literature reviews and algorithm validation for this medical decision support tool.",
      icon: Calculator
    },
    {
      title: "Clinical Tool Validation in Process",
      subtitle: "This medical calculator is undergoing rigorous validation studies to ensure accuracy and compliance with current clinical practice guidelines.",
      icon: Calculator
    },
    {
      title: "Medical Decision Support Tool Coming Soon",
      subtitle: "Our development team is finalizing the clinical algorithms and user interface for this evidence-based diagnostic calculator.",
      icon: Calculator
    },
    {
      title: "Diagnostic Calculator Under Construction",
      subtitle: "This clinical tool is being developed in collaboration with medical experts to ensure optimal accuracy and usability for healthcare professionals.",
      icon: Calculator
    },
    {
      title: "Clinical Assessment Tool in Development",
      subtitle: "Our medical informatics team is conducting final testing and validation of this evidence-based clinical calculator.",
      icon: Calculator
    },
    {
      title: "Medical Calculation Tool Pending Release",
      subtitle: "This diagnostic calculator is undergoing comprehensive clinical review and quality assurance testing prior to implementation.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Tool Under Review",
      subtitle: "Our clinical advisory panel is conducting final validation studies for this medical decision support calculator.",
      icon: Calculator
    },
    {
      title: "Clinical Algorithm Optimization in Progress",
      subtitle: "This medical calculator is being refined based on current literature and clinical expert recommendations to ensure optimal performance.",
      icon: Calculator
    },
    {
      title: "Medical Scoring Tool Development Ongoing",
      subtitle: "Our clinical development team is finalizing the validation studies and quality assurance protocols for this diagnostic calculator.",
      icon: Calculator
    },
    {
      title: "Diagnostic Tool Quality Assurance in Process",
      subtitle: "This clinical calculator is undergoing comprehensive testing and validation to meet the highest standards of medical accuracy and reliability.",
      icon: Calculator
    },
    {
      title: "Clinical Calculator Validation Studies Ongoing",
      subtitle: "Our medical experts are conducting final validation studies and peer review for this evidence-based diagnostic tool.",
      icon: Calculator
    },
    {
      title: "Medical Decision Support System in Development",
      subtitle: "This clinical calculator is being developed with rigorous attention to evidence-based medicine principles and current practice guidelines.",
      icon: Calculator
    },
    {
      title: "Clinical Tool Under Medical Review",
      subtitle: "Our clinical advisory board is conducting comprehensive review and validation of this medical decision support calculator.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Calculator Beta Testing",
      subtitle: "This diagnostic tool is undergoing final testing phases with medical professionals to ensure optimal clinical utility and accuracy.",
      icon: Calculator
    },
    {
      title: "Medical Algorithm Development in Progress",
      subtitle: "Our clinical informatics team is refining the algorithms and conducting validation studies for this evidence-based calculator.",
      icon: Calculator
    },
    {
      title: "Diagnostic Calculator Clinical Validation",
      subtitle: "This medical tool is undergoing rigorous clinical validation and quality assurance testing by our expert medical panel.",
      icon: Calculator
    },
    {
      title: "Clinical Decision Tool Under Construction",
      subtitle: "Our development team is finalizing the clinical algorithms and user interface design for this evidence-based medical calculator.",
      icon: Calculator
    },
    {
      title: "Medical Scoring System Quality Review",
      subtitle: "This clinical calculator is undergoing comprehensive quality review and validation studies to ensure adherence to medical best practices.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Tool Development Phase",
      subtitle: "Our medical informatics specialists are conducting final development and validation of this clinical decision support calculator.",
      icon: Calculator
    },
    {
      title: "Clinical Calculator Algorithm Refinement",
      subtitle: "This diagnostic tool is being refined based on current medical literature and expert clinical recommendations.",
      icon: Calculator
    },
    {
      title: "Medical Tool Validation Protocol Active",
      subtitle: "Our clinical team is executing comprehensive validation protocols for this evidence-based medical calculator.",
      icon: Calculator
    },
    {
      title: "Diagnostic System Development Ongoing",
      subtitle: "This clinical decision support tool is being developed with input from leading medical professionals and evidence-based research.",
      icon: Calculator
    },
    {
      title: "Clinical Calculator Medical Review Phase",
      subtitle: "Our medical advisory panel is conducting thorough review and validation of this diagnostic calculator.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Tool Quality Assurance",
      subtitle: "This medical calculator is undergoing rigorous quality assurance testing and clinical validation studies.",
      icon: Calculator
    },
    {
      title: "Medical Decision Support Under Development",
      subtitle: "Our clinical development team is finalizing the algorithms and conducting validation studies for this evidence-based tool.",
      icon: Calculator
    },
    {
      title: "Diagnostic Calculator Clinical Testing",
      subtitle: "This medical tool is currently in clinical testing phase with healthcare professionals to ensure optimal accuracy and usability.",
      icon: Calculator
    },
    {
      title: "Clinical Tool Algorithm Validation",
      subtitle: "Our medical informatics team is conducting comprehensive algorithm validation and quality assurance for this diagnostic calculator.",
      icon: Calculator
    },
    {
      title: "Medical Scoring Tool Under Review",
      subtitle: "This clinical calculator is undergoing peer review and validation by our expert medical advisory board.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Calculator Development Active",
      subtitle: "Our clinical team is actively developing and validating this medical decision support tool based on current evidence and guidelines.",
      icon: Calculator
    },
    {
      title: "Clinical Decision Tool Beta Phase",
      subtitle: "This diagnostic calculator is in beta testing phase with medical professionals to ensure clinical accuracy and optimal user experience.",
      icon: Calculator
    },
    {
      title: "Medical Algorithm Quality Control",
      subtitle: "Our development team is conducting final quality control measures and validation studies for this evidence-based clinical calculator.",
      icon: Calculator
    },
    {
      title: "Diagnostic Tool Clinical Validation Phase",
      subtitle: "This medical calculator is undergoing comprehensive clinical validation and expert review to ensure adherence to best practices.",
      icon: Calculator
    },
    {
      title: "Clinical Calculator Development Review",
      subtitle: "Our medical advisory panel is conducting thorough development review and validation of this evidence-based diagnostic tool.",
      icon: Calculator
    },
    {
      title: "Medical Decision Support Testing Phase",
      subtitle: "This clinical calculator is in active testing phase with healthcare professionals to validate accuracy and clinical utility.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Tool Medical Validation",
      subtitle: "Our clinical experts are conducting comprehensive medical validation and quality assurance for this diagnostic calculator.",
      icon: Calculator
    },
    {
      title: "Clinical Algorithm Expert Review",
      subtitle: "This medical calculator is undergoing expert clinical review and validation studies to ensure optimal diagnostic accuracy.",
      icon: Calculator
    },
    {
      title: "Diagnostic Calculator Quality Assessment",
      subtitle: "Our medical team is conducting comprehensive quality assessment and validation protocols for this evidence-based tool.",
      icon: Calculator
    },
    {
      title: "Medical Tool Clinical Development",
      subtitle: "This diagnostic calculator is in active clinical development phase with rigorous testing and validation by medical experts.",
      icon: Calculator
    },
    {
      title: "Clinical Decision Support Validation",
      subtitle: "Our development team is conducting final validation studies and quality assurance for this evidence-based medical calculator.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Calculator Expert Review",
      subtitle: "This clinical tool is undergoing comprehensive expert review and validation by our medical advisory board.",
      icon: Calculator
    },
    {
      title: "Medical Algorithm Development Phase",
      subtitle: "Our clinical informatics team is in active development phase, refining algorithms and conducting validation studies.",
      icon: Calculator
    },
    {
      title: "Diagnostic Tool Medical Testing",
      subtitle: "This clinical calculator is undergoing rigorous medical testing and validation with healthcare professionals.",
      icon: Calculator
    },
    {
      title: "Clinical Calculator Validation Protocol",
      subtitle: "Our medical team is executing comprehensive validation protocols and quality assurance for this evidence-based tool.",
      icon: Calculator
    },
    {
      title: "Medical Decision Tool Under Construction",
      subtitle: "This diagnostic calculator is being constructed with input from medical experts and evidence-based research.",
      icon: Calculator
    },
    {
      title: "Evidence-Based System Development",
      subtitle: "Our clinical development team is actively developing this medical decision support system based on current guidelines.",
      icon: Calculator
    },
    {
      title: "Clinical Tool Algorithm Development",
      subtitle: "This medical calculator's algorithms are being developed and validated by our clinical informatics specialists.",
      icon: Calculator
    },
    {
      title: "Diagnostic Calculator Medical Review",
      subtitle: "Our medical advisory panel is conducting comprehensive review and validation of this clinical decision support tool.",
      icon: Calculator
    },
    {
      title: "Medical Scoring System Under Development",
      subtitle: "This clinical scoring tool is being developed with rigorous attention to evidence-based medicine and validation studies.",
      icon: Calculator
    },
    {
      title: "Clinical Decision Support Launch Preparation",
      subtitle: "Our development team is preparing for launch of this evidence-based medical calculator following completion of validation studies.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Tool Clinical Testing",
      subtitle: "This diagnostic calculator is undergoing comprehensive clinical testing and validation with medical professionals.",
      icon: Calculator
    },
    {
      title: "Medical Calculator Expert Validation",
      subtitle: "Our clinical experts are conducting thorough validation and quality assurance for this evidence-based diagnostic tool.",
      icon: Calculator
    },
    {
      title: "Clinical Algorithm Medical Review",
      subtitle: "This medical calculator's algorithms are undergoing comprehensive medical review and validation by our expert panel.",
      icon: Calculator
    },
    {
      title: "Diagnostic Tool Development Protocol",
      subtitle: "Our clinical team is following rigorous development protocols and validation studies for this evidence-based calculator.",
      icon: Calculator
    },
    {
      title: "Medical Decision Support Under Testing",
      subtitle: "This clinical calculator is undergoing comprehensive testing and validation to ensure optimal accuracy and clinical utility.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Calculator Quality Review",
      subtitle: "Our medical advisory board is conducting thorough quality review and validation of this diagnostic tool.",
      icon: Calculator
    },
    {
      title: "Clinical Tool Validation Studies Active",
      subtitle: "This medical calculator is subject to active validation studies and quality assurance protocols by our clinical team.",
      icon: Calculator
    },
    {
      title: "Medical Algorithm Clinical Validation",
      subtitle: "Our clinical informatics team is conducting comprehensive validation of the algorithms for this evidence-based tool.",
      icon: Calculator
    },
    {
      title: "Diagnostic Calculator Expert Development",
      subtitle: "This clinical tool is being developed by medical experts with rigorous attention to evidence-based medicine principles.",
      icon: Calculator
    },
    {
      title: "Clinical Decision Tool Quality Assurance",
      subtitle: "Our development team is conducting comprehensive quality assurance and validation for this medical calculator.",
      icon: Calculator
    },
    {
      title: "Evidence-Based System Medical Review",
      subtitle: "This diagnostic calculator is undergoing thorough medical review and validation by our clinical advisory panel.",
      icon: Calculator
    },
    {
      title: "Medical Tool Development Validation",
      subtitle: "Our clinical team is conducting comprehensive development validation and quality assurance for this evidence-based calculator.",
      icon: Calculator
    },
    {
      title: "Clinical Calculator Algorithm Testing",
      subtitle: "This medical tool's algorithms are undergoing rigorous testing and validation by our clinical informatics specialists.",
      icon: Calculator
    },
    {
      title: "Diagnostic Tool Medical Development",
      subtitle: "Our medical development team is actively developing and validating this clinical decision support calculator.",
      icon: Calculator
    },
    {
      title: Juno-Based Calculator Clinical Review",
      subtitle: "This diagnostic tool is undergoing comprehensive clinical review and validation studies by medical experts.",
      icon: Calculator
    },
    {
      title: "Medical Decision Support Development",
      subtitle: "Our clinical team is in active development phase for this evidence-based medical calculator with rigorous validation protocols.",
      icon: Calculator
    },
    {
      title: "Clinical Tool Expert Validation",
      subtitle: "This medical calculator is undergoing expert validation and quality assurance by our clinical advisory board.",
      icon: Calculator
    },
    {
      title: "Diagnostic Calculator Medical Testing",
      subtitle: "Our medical team is conducting comprehensive testing and validation protocols for this evidence-based clinical tool.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Tool Development Review",
      subtitle: "This clinical calculator is undergoing thorough development review and validation by our medical experts.",
      icon: Calculator
    },
    {
      title: "Medical Algorithm Quality Validation",
      subtitle: "Our clinical informatics team is conducting comprehensive quality validation and testing for this diagnostic calculator.",
      icon: Calculator
    },
    {
      title: "Clinical Decision Tool Under Review",
      subtitle: "This medical calculator is under comprehensive review and validation by our clinical advisory panel.",
      icon: Calculator
    },
    {
      title: "Diagnostic System Clinical Development",
      subtitle: "Our medical development team is actively developing this clinical decision support system with rigorous validation studies.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Calculator Medical Validation",
      subtitle: "This diagnostic tool is undergoing comprehensive medical validation and quality assurance by our clinical experts.",
      icon: Calculator
    },
    {
      title: "Medical Tool Algorithm Validation",
      subtitle: "Our clinical team is conducting thorough algorithm validation and quality testing for this evidence-based calculator.",
      icon: Calculator
    },
    {
      title: "Clinical Calculator Development Testing",
      subtitle: "This medical tool is in active development testing phase with comprehensive validation by healthcare professionals.",
      icon: Calculator
    },
    {
      title: "Diagnostic Tool Quality Development",
      subtitle: "Our medical advisory board is overseeing quality development and validation protocols for this evidence-based calculator.",
      icon: Calculator
    },
    {
      title: "Evidence-Based System Under Construction",
      subtitle: "This clinical decision support system is under construction with rigorous medical validation and quality assurance protocols.",
      icon: Calculator
    },
    {
      title: "Medical Calculator Clinical Validation",
      subtitle: "Our clinical team is conducting comprehensive validation studies and quality assurance for this diagnostic calculator.",
      icon: Calculator
    },
    {
      title: "Clinical Decision Support Beta Testing",
      subtitle: "This evidence-based medical calculator is in beta testing phase with healthcare professionals for optimal validation.",
      icon: Calculator
    },
    {
      title: "Diagnostic Tool Medical Quality Review",
      subtitle: "Our medical experts are conducting thorough quality review and validation of this clinical calculator.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Calculator Development",
      subtitle: "This medical tool is in active development with comprehensive validation studies and quality assurance protocols.",
      icon: Calculator
    },
    {
      title: "Clinical Tool Medical Validation Phase",
      subtitle: "Our clinical advisory panel is conducting comprehensive medical validation for this evidence-based diagnostic calculator.",
      icon: Calculator
    },
    {
      title: "Medical Algorithm Development Review",
      subtitle: "This clinical calculator's algorithms are undergoing development review and validation by our medical informatics team.",
      icon: Calculator
    },
    {
      title: "Diagnostic Calculator Expert Testing",
      subtitle: "Our medical experts are conducting comprehensive testing and validation protocols for this evidence-based tool.",
      icon: Calculator
    },
    {
      title: "Clinical Decision Tool Validation Review",
      subtitle: "This medical calculator is undergoing validation review and quality assurance by our clinical development team.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Tool Medical Development",
      subtitle: "Our clinical team is actively developing this diagnostic calculator with rigorous medical validation and testing protocols.",
      icon: Calculator
    },
    {
      title: "Medical Calculator Quality Testing",
      subtitle: "This clinical tool is undergoing comprehensive quality testing and validation by our medical advisory board.",
      icon: Calculator
    },
    {
      title: "Clinical Algorithm Medical Validation",
      subtitle: "Our medical informatics specialists are conducting thorough validation and quality assurance for this evidence-based calculator.",
      icon: Calculator
    },
    {
      title: "Diagnostic Tool Development Validation",
      subtitle: "This clinical calculator is in development validation phase with comprehensive testing by healthcare professionals.",
      icon: Calculator
    },
    {
      title: "Evidence-Based System Quality Assurance",
      subtitle: "Our clinical team is conducting comprehensive quality assurance and validation studies for this medical decision support tool.",
      icon: Calculator
    },
    {
      title: "Medical Decision Support Under Validation",
      subtitle: "This diagnostic calculator is under comprehensive validation and quality review by our medical expert panel.",
      icon: Calculator
    },
    {
      title: "Clinical Calculator Medical Testing Phase",
      subtitle: "Our clinical development team is conducting comprehensive medical testing and validation for this evidence-based tool.",
      icon: Calculator
    },
    {
      title: "Diagnostic Tool Expert Development",
      subtitle: "This medical calculator is being developed by clinical experts with rigorous validation and quality assurance protocols.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Calculator Under Review",
      subtitle: "Our medical advisory board is conducting thorough review and validation of this clinical decision support calculator.",
      icon: Calculator
    },
    {
      title: "Medical Algorithm Clinical Testing",
      subtitle: "This diagnostic tool's algorithms are undergoing comprehensive clinical testing and validation by our medical team.",
      icon: Calculator
    },
    {
      title: "Clinical Tool Quality Validation",
      subtitle: "Our clinical experts are conducting comprehensive quality validation and testing protocols for this evidence-based calculator.",
      icon: Calculator
    },
    {
      title: "Diagnostic Calculator Medical Review Phase",
      subtitle: "This medical tool is in comprehensive medical review phase with validation studies by our clinical advisory panel.",
      icon: Calculator
    },
    {
      title: "Evidence-Based Tool Clinical Development",
      subtitle: "Our medical development team is actively developing this clinical calculator with rigorous validation and quality assurance.",
      icon: Calculator
    },
    {
      title: "Medical Decision Support Validation Studies",
      subtitle: "This diagnostic calculator is subject to comprehensive validation studies and quality testing by our clinical experts.",
      icon: Calculator
    },
    {
      title: "Clinical Calculator Algorithm Review",
      subtitle: "Our clinical informatics team is conducting thorough algorithm review and validation for this evidence-based medical tool.",
      icon: Calculator
    },
    {
      title: "Diagnostic Tool Medical Validation Protocol",
      subtitle: "This clinical calculator is following comprehensive medical validation protocols and quality assurance standards.",
      icon: Calculator
    },
    {
      title: "Evidence-Based System Development Phase",
      subtitle: "Our clinical team is in active development phase for this medical decision support system with rigorous validation studies.",
      icon: Calculator
    }
  ];

  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setCurrentMessage(messages[randomIndex]);
    setIsVisible(true);
  }, []);

  const IconComponent = currentMessage.icon;

  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full bg-gray-50 p-8">
      <div 
        className="text-center max-w-2xl mx-auto"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out'
        }}
      >
        <div 
          className="mb-6"
          style={{
            transform: isVisible ? 'scale(1)' : 'scale(0.8)',
            transition: 'transform 0.6s ease-out 0.2s'
          }}
        >
          <IconComponent className="w-16 h-16 text-teal-600 mx-auto mb-4" />
        </div>
        
        <h1 
          className="text-2xl font-bold text-gray-800 mb-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out 0.4s'
          }}
        >
          {currentMessage.title}
        </h1>
        
        <p 
          className="text-gray-600 mb-8 leading-relaxed text-base"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out 0.6s'
          }}
        >
          {currentMessage.subtitle}
        </p>
        
        <div 
          className="flex flex-col sm:flex-row gap-3 justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out 0.8s'
          }}
        >
          <button
            onClick={() => window.location.href = '/'}
            className="btn-primary flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-all duration-200 px-4 py-2 flex items-center justify-center gap-2 transform hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;