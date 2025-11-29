import React, { useState } from 'react';
import { explainMedicalJargon } from '../services/geminiService';

const JargonBuster: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleExplain = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setExplanation('');
    
    try {
      const result = await explainMedicalJargon(inputText);
      setExplanation(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Medical Jargon Buster</h2>
        <p className="text-stone-600 text-lg">
          Paste a confusing sentence from your discharge papers, and our AI assistant will translate it into plain English.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-6 sm:p-8">
        <label htmlFor="jargon-input" className="block text-sm font-semibold text-stone-700 mb-2">
          Enter Medical Text
        </label>
        <textarea
          id="jargon-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="e.g., 'Patient is hemodynamically stable with no acute ischmic changes...'"
          className="w-full h-32 p-4 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all resize-none text-stone-800"
        />

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleExplain}
            disabled={isLoading || !inputText.trim()}
            className={`px-6 py-3 rounded-full font-semibold text-white transition-all shadow-md ${
              isLoading || !inputText.trim()
                ? 'bg-stone-400 cursor-not-allowed'
                : 'bg-rose-600 hover:bg-rose-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Translating...
              </span>
            ) : (
              'Translate to Plain English'
            )}
          </button>
        </div>

        {explanation && (
          <div className="mt-8 animate-fade-in">
            <div className="bg-stone-50 border-l-4 border-rose-500 p-6 rounded-r-lg">
              <h3 className="text-lg font-serif font-bold text-stone-900 mb-3">Simple Explanation</h3>
              <div className="prose prose-stone max-w-none text-stone-700 whitespace-pre-line">
                {explanation}
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-4 text-center">
              AI generated content can be inaccurate. Always consult with your healthcare provider for medical advice.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JargonBuster;
