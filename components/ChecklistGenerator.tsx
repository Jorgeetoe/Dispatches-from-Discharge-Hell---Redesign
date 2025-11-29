import React, { useState } from 'react';
import { generateDischargeChecklist } from '../services/geminiService';
import { ChecklistResponse } from '../types';

const ChecklistGenerator: React.FC = () => {
  const [condition, setCondition] = useState('');
  const [checklist, setChecklist] = useState<ChecklistResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!condition.trim()) return;
    setIsLoading(true);
    setChecklist(null);
    
    try {
      const result = await generateDischargeChecklist(condition);
      setChecklist(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Discharge Checklist Generator</h2>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto">
          Don't leave the hospital without a plan. Enter your condition or procedure, and we'll generate a safety checklist of questions to ask and things to prepare.
        </p>
      </div>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12">
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g., Hip Replacement, Pneumonia, C-Section"
          className="flex-1 px-5 py-4 rounded-xl border border-stone-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-lg shadow-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading || !condition.trim()}
          className={`px-8 py-4 rounded-xl font-bold text-white text-lg shadow-md transition-all whitespace-nowrap ${
            isLoading || !condition.trim()
              ? 'bg-stone-400 cursor-not-allowed'
              : 'bg-teal-600 hover:bg-teal-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? 'Generating...' : 'Create Checklist'}
        </button>
      </div>

      {/* Results Section */}
      {checklist && (
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden animate-fade-in">
          <div className="bg-teal-600 px-6 py-6 sm:px-8">
            <h3 className="text-2xl font-serif font-bold text-white">
              {checklist.title}
            </h3>
          </div>
          <div className="p-6 sm:p-8">
            <div className="grid gap-6">
              {checklist.items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-4 rounded-lg bg-stone-50 border border-stone-100 hover:border-teal-200 transition-colors"
                >
                  <div className={`mt-1 h-5 w-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                    item.priority === 'High' ? 'border-rose-500' : 
                    item.priority === 'Medium' ? 'border-amber-500' : 'border-teal-500'
                  }`}>
                     <div className={`h-2.5 w-2.5 rounded-full ${
                        item.priority === 'High' ? 'bg-rose-500' : 
                        item.priority === 'Medium' ? 'bg-amber-500' : 'bg-teal-500'
                     }`}></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                      {item.category}
                    </p>
                    <p className="text-stone-800 font-medium text-lg">
                      {item.task}
                    </p>
                  </div>
                  <div className="ml-auto pl-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.priority === 'High' ? 'bg-rose-100 text-rose-800' :
                      item.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-teal-100 text-teal-800'
                    }`}>
                      {item.priority} Priority
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => window.print()} 
                className="text-stone-500 hover:text-stone-900 font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Checklist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistGenerator;
