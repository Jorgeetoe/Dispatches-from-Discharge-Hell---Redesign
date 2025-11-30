import React from 'react';

const SubmitStory: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
       <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-6">Share Your Dispatch</h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
          Your voice matters. By sharing your experience, you help expose the systemic issues in catastrophic care and empower others.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
         <div className="bg-rose-600 px-8 py-6">
            <h2 className="text-white font-bold text-xl flex items-center">
               <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
               </svg>
               Submission Guidelines
            </h2>
         </div>
         <div className="p-8">
            <div className="space-y-6 text-stone-700">
               <div>
                  <h3 className="font-bold text-stone-900 mb-2">The Narrative</h3>
                  <p>Focus on friction points: denials, discharge plans that made no sense, "medical necessity" arguments, or the gap between what was promised and what was delivered.</p>
               </div>
               <div>
                  <h3 className="font-bold text-stone-900 mb-2">Anonymity</h3>
                  <p>Change names, dates, and specific locations. We want the truth of the experience, not the liability of specific identification.</p>
               </div>
               <div>
                  <h3 className="font-bold text-stone-900 mb-2">Format</h3>
                  <p>500-1000 words preferred. You can send it as the body of an email or as an attachment.</p>
               </div>
            </div>

            <div className="mt-10 pt-8 border-t border-stone-100 text-center">
               <p className="font-medium text-stone-900 mb-6">Ready to share?</p>
               <a 
                 href="mailto:stories@dispatchesfromdischargehell.com?subject=Story Submission" 
                 className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-stone-900 rounded-full hover:bg-rose-600 hover:shadow-lg transform hover:-translate-y-1"
               >
                 <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
                 Email Your Story
               </a>
               <p className="text-sm text-stone-500 mt-4">
                  We review all submissions. If selected, we will contact you before publishing.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SubmitStory;