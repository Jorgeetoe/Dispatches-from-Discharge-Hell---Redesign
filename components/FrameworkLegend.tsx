import React, { useState } from 'react';

const SECTIONS = [
  {
    id: 'mechanisms',
    title: '8 Extraction Mechanisms',
    description: 'Specific ways value is extracted or risk is shifted in the healthcare system.',
    items: [
      { name: 'Information Asymmetry', desc: 'One party has critical information the other doesn\'t; decisions happen with incomplete understanding.' },
      { name: 'Hospital Incentive Misalignment', desc: 'Hospital\'s financial optimization creates decisions that don\'t serve patient outcome.' },
      { name: 'Vendor/Payer Externalization', desc: 'Third parties\' constraints (vendor timelines, payer approvals) are treated as patient constraints.' },
      { name: 'Regulatory Capture', desc: 'Regulations meant to protect patients are used to protect industry instead.' },
      { name: 'Caregiver Labor Exploitation', desc: 'Care system depends on unpaid family labor without acknowledging or supporting it.' },
      { name: 'Physician Constraint', desc: 'Clinician authority and judgment are constrained by institutional requirements and insurance criteria.' },
      { name: 'Pharmaceutical/Device Extraction', desc: 'Equipment and medication companies extract value through pricing, delays, and supply constraints.' },
      { name: 'Systemic Coordination Failure', desc: 'Systems that should coordinate don\'t; gap becomes patient/family responsibility.' }
    ]
  },
  {
    id: 'diagnostic',
    title: 'Fixer Diagnostic (5 Elements)',
    description: 'The core lenses we use to analyze every broken healthcare scenario.',
    items: [
      { name: 'The Gap', desc: 'Promise vs. reality; what should happen vs. what actually does.' },
      { name: 'Competing Interests', desc: 'Who wants what; whose interest wins; what gets prioritized.' },
      { name: 'Hidden Information', desc: 'What\'s obscured; where it\'s hidden; why; what would change if visible.' },
      { name: 'Moral Compromise', desc: 'What clinicians/staff are forced to normalize; what contradicts professional values.' },
      { name: 'Cost Bearer', desc: 'Who pays—usually populations without power to refuse.' }
    ]
  },
  {
    id: 'layers',
    title: 'System Layers',
    description: 'The operational levels where these mechanisms take place.',
    items: [
      { name: 'Hospital', desc: 'Acute care incentives (LOS, census, margin, readmission penalties).' },
      { name: 'Post-Acute', desc: 'SNF/IRF/LTAC incentives (occupancy, acuity mix, insurance mix).' },
      { name: 'Insurance', desc: 'Payer logic (denial rate, prior auth delays, medical necessity criteria).' },
      { name: 'Equipment/Vendor', desc: 'Supply chain and approval delays.' },
      { name: 'Regulatory', desc: 'Rules meant for safety that get captured for industry protection.' },
      { name: 'Workforce', desc: 'Staff moral compromise, clinician constraint, caregiver exploitation.' }
    ]
  },
  {
    id: 'tiers',
    title: 'Content Tiers',
    description: 'How we package these insights for different depths of understanding.',
    items: [
      { name: 'Tier 1: Deep Dive', desc: '1200-1500 words. Blog posts, case studies. Full Fixer Diagnostic exposed across sections.' },
      { name: 'Tier 2: Manifestation', desc: '300-1000 words. Comparative lists, mock forms, FAQs, checklists. One extraction mechanism focused.' },
      { name: 'Tier 3: Resources', desc: '100-600 words. Quick-hits, glossaries, flowcharts. One insight with maximum accessibility.' }
    ]
  }
];

const FrameworkLegend: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedSection(prev => prev === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-6">How We Analyze Healthcare</h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
          Dispatches uses the Fixer Diagnostic framework to expose systemic extraction across healthcare's six layers.
        </p>
      </div>

      <div className="space-y-4 mb-16">
        {SECTIONS.map((section) => {
          const isExpanded = expandedSection === section.id;
          return (
            <div key={section.id} className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
              <button
                onClick={() => toggleItem(section.id)}
                className="w-full text-left px-6 py-4 flex items-center justify-between bg-white hover:bg-stone-50 transition-colors"
              >
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">{section.title}</h3>
                  <p className="text-sm text-stone-500 mt-1">{section.description}</p>
                </div>
                <div className={`text-stone-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {isExpanded && (
                <div className="bg-stone-50 border-t border-stone-100 divide-y divide-stone-200 animate-fade-in">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="px-6 py-4">
                      <h4 className="font-bold text-stone-800 mb-1">{item.name}</h4>
                      <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-rose-50 border border-rose-100 rounded-lg p-8 text-center">
        <h3 className="font-serif font-bold text-xl text-rose-900 mb-3">How to use this</h3>
        <p className="text-rose-800">
          When reading our Dispatches, use this legend to decode the tags and analysis boxes. Understanding these mechanisms helps you spot them in your own healthcare encounters.
        </p>
      </div>
    </div>
  );
};

export default FrameworkLegend;