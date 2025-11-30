import React, { useState } from 'react';
import { Story } from '../types';

interface FrameworkBreakdownProps {
  story: Story;
}

const FrameworkBreakdown: React.FC<FrameworkBreakdownProps> = ({ story }) => {
  const [showFramework, setShowFramework] = useState(false);

  return (
    <section className="mt-16 pt-12 border-t border-stone-200">
      <button 
        onClick={() => setShowFramework(!showFramework)}
        className="flex items-center justify-between w-full mb-6 group"
      >
        <h3 className="text-2xl font-serif font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
          About This Framework
        </h3>
        <svg className={`w-6 h-6 text-stone-400 transform transition-transform ${showFramework ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {showFramework && (
        <div className="animate-fade-in space-y-6 bg-stone-50 p-8 rounded-lg border border-stone-200">
          
          {/* METADATA DISPLAY */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded border border-stone-200">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Extraction Mechanism</div>
              <div className="text-sm font-semibold text-stone-900">{story.extractionMechanism}</div>
            </div>
            <div className="bg-white p-4 rounded border border-stone-200">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">System Layer</div>
              <div className="text-sm font-semibold text-stone-900">{story.systemLayer}</div>
            </div>
            <div className="bg-white p-4 rounded border border-stone-200">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Content Tier</div>
              <div className="text-sm font-semibold text-stone-900">{story.contentTier}</div>
            </div>
            <div className="bg-white p-4 rounded border border-stone-200">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Satirical Device</div>
              <div className="text-sm font-semibold text-stone-900">{story.satiricalDevice}</div>
            </div>
            <div className="bg-white p-4 rounded border border-stone-200">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Intended Reader</div>
              <div className="text-sm font-semibold text-stone-900">{story.intendedReader}</div>
            </div>
            <div className="bg-white p-4 rounded border border-stone-200">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Fixer Elements</div>
              <div className="text-sm font-semibold text-stone-900">{story.fixerElements.join(', ')}</div>
            </div>
          </div>

          {/* EXPLANATION */}
          <div className="bg-white p-6 rounded border border-stone-200">
            <p className="text-stone-700 leading-relaxed">
              This post exposes <strong>{story.extractionMechanism}</strong> within the <strong>{story.systemLayer}</strong>. 
              It examines the gap between stated mission and actual operations, identifies competing interests that maintain this gap, 
              and shows who bears the cost of this misalignment. The analysis is layered across {story.fixerElements.length} core elements 
              of the Fixer Diagnostic methodology.
            </p>
          </div>

        </div>
      )}
    </section>
  );
};

export default FrameworkBreakdown;