import React, { useState } from 'react';
import { generateLinkedInPost } from '../services/geminiService';
import { LinkedInPostResponse } from '../types';

const LinkedInGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [generatedPost, setGeneratedPost] = useState<LinkedInPostResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setGeneratedPost(null);
    
    try {
      const result = await generateLinkedInPost(topic);
      setGeneratedPost(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">The "Last Resort" Post Generator</h2>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto">
          Need to vent about healthcare bureaucracy professionally? Generate a satirical LinkedIn post that exposes the absurdity of discharge hell.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-6 sm:p-8 mb-12">
        <div className="flex flex-col gap-4">
          <label className="block text-sm font-semibold text-stone-700">
            What's the discharge disaster du jour?
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Insurance denied rehab because patient 'plateaued' after 2 days"
              className="flex-1 px-5 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-lg"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading || !topic.trim()}
              className={`px-8 py-3 rounded-lg font-bold text-white text-lg shadow-md transition-all whitespace-nowrap ${
                isLoading || !topic.trim()
                  ? 'bg-stone-400 cursor-not-allowed'
                  : 'bg-stone-900 hover:bg-stone-800 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                   <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Consulting Horhe...
                </span>
              ) : (
                'Generate Post'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {generatedPost && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          {/* Post Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-stone-200 overflow-hidden">
               <div className="border-b border-stone-100 p-4 flex items-center space-x-3 bg-stone-50">
                  <div className="h-10 w-10 rounded-full bg-rose-600 flex items-center justify-center text-white font-bold">
                    LR
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-900">Nurse Case Manager</p>
                    <p className="text-xs text-stone-500">20+ years at Last Resort Rehab Hospital</p>
                  </div>
               </div>
               <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-900 mb-4">{generatedPost.headline}</h3>
                  <div className="prose prose-stone text-stone-700 whitespace-pre-line text-sm sm:text-base">
                    {generatedPost.content}
                  </div>
               </div>
               <div className="bg-stone-50 p-4 border-t border-stone-100 flex justify-end">
                 <button 
                   onClick={() => navigator.clipboard.writeText(`${generatedPost.headline}\n\n${generatedPost.content}`)}
                   className="text-sm font-semibold text-rose-600 hover:text-rose-700 flex items-center"
                 >
                   <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                   </svg>
                   Copy Text
                 </button>
               </div>
            </div>
          </div>

          {/* Graphic Description */}
          <div className="lg:col-span-1">
            <div className="bg-stone-900 text-stone-300 rounded-xl p-6 shadow-lg h-full border border-stone-700">
              <div className="flex items-center space-x-2 mb-4 text-rose-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h4 className="font-bold text-sm uppercase tracking-wider">Graphic Concept</h4>
              </div>
              <p className="text-sm italic leading-relaxed opacity-90">
                "{generatedPost.graphicDescription}"
              </p>
              <div className="mt-6 pt-6 border-t border-stone-700">
                 <p className="text-xs text-stone-500 uppercase font-bold tracking-widest mb-2">Style Guide</p>
                 <ul className="text-xs space-y-1">
                   <li>• Mad Magazine satire style</li>
                   <li>• Exaggerated caricatures</li>
                   <li>• Chaotic medical background</li>
                   <li>• Character: "Horhe" (Stressed, wild hair)</li>
                 </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedInGenerator;
