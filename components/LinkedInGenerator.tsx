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
    <div className="animate-fade-in">
      <div className="max-w-[900px] mx-auto px-12 sm:px-24 py-16">
        
        <div className="text-7xl mb-6">⚡</div>
        <h1 className="text-4xl font-bold text-[#37352F] mb-4">LinkedIn Post Gen</h1>
        <p className="text-lg text-stone-600 mb-8">
           Vent about healthcare bureaucracy professionally. Generate a satirical post exposing the absurdity of discharge hell.
        </p>

        {/* Tool Container */}
        <div className="border border-[#E9E9E7] rounded-md p-6 bg-white shadow-sm">
           
           {/* Controls */}
           <div className="flex gap-2 mb-6">
              <input 
                 type="text" 
                 value={topic}
                 onChange={(e) => setTopic(e.target.value)}
                 placeholder="What's the discharge disaster du jour?"
                 className="flex-1 border border-[#E9E9E7] rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-stone-400"
                 onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <button 
                 onClick={handleGenerate}
                 disabled={isLoading || !topic}
                 className="bg-[#2EAADC] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#208AB5] disabled:opacity-50 whitespace-nowrap"
              >
                 {isLoading ? 'Thinking...' : 'Generate Post'}
              </button>
           </div>

           {/* Results */}
           {generatedPost && (
             <div className="animate-fade-in mt-8 space-y-8">
                
                {/* Post Content Block */}
                <div className="border border-[#E9E9E7] rounded-md overflow-hidden">
                   <div className="bg-[#F7F7F5] border-b border-[#E9E9E7] px-4 py-2 flex items-center gap-2">
                      <span className="text-lg">📝</span>
                      <span className="text-sm font-semibold text-stone-600">Generated Draft</span>
                   </div>
                   <div className="p-6">
                      <h3 className="text-lg font-bold mb-4">{generatedPost.headline}</h3>
                      <div className="whitespace-pre-line text-[#37352F] text-sm leading-relaxed">
                         {generatedPost.content}
                      </div>
                   </div>
                   <div className="bg-[#F7F7F5] border-t border-[#E9E9E7] px-4 py-2 text-right">
                      <button 
                         onClick={() => navigator.clipboard.writeText(`${generatedPost.headline}\n\n${generatedPost.content}`)}
                         className="text-xs font-medium text-stone-500 hover:text-stone-900"
                      >
                         📋 Copy to Clipboard
                      </button>
                   </div>
                </div>

                {/* Graphic Prompt Block */}
                <div className="p-4 bg-stone-50 border border-[#E9E9E7] rounded flex gap-4">
                   <div className="text-2xl">🎨</div>
                   <div>
                      <h4 className="font-bold text-sm text-stone-700 mb-1">Graphic Concept (Mad Magazine Style)</h4>
                      <p className="text-sm text-stone-600 italic">"{generatedPost.graphicDescription}"</p>
                   </div>
                </div>

             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default LinkedInGenerator;