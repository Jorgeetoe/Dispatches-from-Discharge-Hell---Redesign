import React, { useState } from 'react';
import { generateChecklist } from '../services/geminiService';
import { ChecklistResponse } from '../types';

const ChecklistGenerator: React.FC = () => {
  const [condition, setCondition] = useState('');
  const [checklistType, setChecklistType] = useState<'discharge' | 'admission'>('discharge');
  const [checklist, setChecklist] = useState<ChecklistResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!condition.trim()) return;
    setIsLoading(true);
    setChecklist(null);
    try {
      const result = await generateChecklist(condition, checklistType);
      setChecklist(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-4">Discharge Safety Checklist</h2>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto">
          Don't leave the hospital unprepared. Generate a tailored checklist for your specific condition to ensure a safer transition home.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-6 sm:p-10 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          <div className="flex-grow w-full">
            <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">
              Medical Condition / Procedure
            </label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="e.g. Hip Replacement, Traumatic Brain Injury, Stroke"
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all text-lg"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>
          
          <div className="w-full md:w-auto flex flex-row gap-2 bg-stone-100 p-1 rounded-lg">
             <button
               onClick={() => setChecklistType('discharge')}
               className={`flex-1 md:flex-none px-6 py-3 rounded-md font-medium text-sm transition-all ${
                 checklistType === 'discharge' 
                   ? 'bg-white text-rose-600 shadow-sm' 
                   : 'text-stone-500 hover:text-stone-900'
               }`}
             >
               Discharge
             </button>
             <button
               onClick={() => setChecklistType('admission')}
               className={`flex-1 md:flex-none px-6 py-3 rounded-md font-medium text-sm transition-all ${
                 checklistType === 'admission' 
                   ? 'bg-white text-rose-600 shadow-sm' 
                   : 'text-stone-500 hover:text-stone-900'
               }`}
             >
               Admission
             </button>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !condition.trim()}
            className={`w-full md:w-auto px-8 py-3 rounded-lg font-bold text-white transition-all shadow-md whitespace-nowrap ${
              isLoading || !condition.trim()
                ? 'bg-stone-400 cursor-not-allowed'
                : 'bg-stone-900 hover:bg-stone-800 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? 'Generating...' : 'Generate Checklist'}
          </button>
        </div>
      </div>

      {checklist && (
        <div className="animate-fade-in bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
          <div className="bg-rose-600 px-8 py-6 text-white">
            <h3 className="text-2xl font-serif font-bold">{checklist.title}</h3>
          </div>
          <div className="p-8">
            <div className="grid gap-6">
              {checklist.items.map((item, index) => (
                <div key={index} className="flex items-start p-4 rounded-lg bg-stone-50 border border-stone-100 hover:border-rose-200 transition-colors">
                  <div className={`mt-1 flex-shrink-0 w-3 h-3 rounded-full ${
                    item.priority === 'High' ? 'bg-rose-500' : 
                    item.priority === 'Medium' ? 'bg-amber-400' : 'bg-green-400'
                  }`} />
                  <div className="ml-4">
                    <p className="text-stone-900 font-medium text-lg mb-1">{item.task}</p>
                    <div className="flex items-center gap-3">
                       <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{item.category}</span>
                       <span className={`text-xs px-2 py-0.5 rounded-full ${
                         item.priority === 'High' ? 'bg-rose-100 text-rose-700' : 
                         item.priority === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                       }`}>
                         {item.priority} Priority
                       </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
               <button onClick={() => window.print()} className="flex items-center text-stone-500 hover:text-stone-900 font-medium text-sm">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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