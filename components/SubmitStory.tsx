import React from 'react';

const SubmitStory: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
       <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-6">Share Your Dispatch</h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
          Your voice matters. By sharing your experience, you help expose the systemic issues in catastrophic care.
        </p>
      </div>

      {/* Confidential File Folder Style Container */}
      <div className="relative bg-[#F3F2EE] rounded-lg shadow-xl border border-stone-300 overflow-hidden">
         {/* Tab of the folder */}
         <div className="absolute top-0 left-0 w-48 h-8 bg-[#E6E4DD] border-r border-b border-stone-300 rounded-br-lg flex items-center justify-center">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Confidential</span>
         </div>

         {/* "Stamp" */}
         <div className="absolute top-6 right-6 border-4 border-rose-800/20 text-rose-800/20 px-4 py-2 rounded transform rotate-[-12deg] pointer-events-none select-none">
            <span className="text-2xl font-black uppercase tracking-widest">Open Case</span>
         </div>

         <div className="px-8 pt-16 pb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8 pb-4 border-b-2 border-stone-300">
               Submission Protocol
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
               <div className="bg-white p-6 rounded shadow-sm border border-stone-200">
                  <h3 className="font-bold text-stone-900 mb-2 flex items-center">
                    <span className="bg-stone-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">1</span>
                    The Narrative
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">Focus on friction points: denials, discharge plans that made no sense, "medical necessity" arguments, or the gap between what was promised and what was delivered.</p>
               </div>
               <div className="bg-white p-6 rounded shadow-sm border border-stone-200">
                  <h3 className="font-bold text-stone-900 mb-2 flex items-center">
                    <span className="bg-stone-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">2</span>
                    Anonymity
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">Change names, dates, and specific locations. We want the truth of the experience, not the liability of specific identification.</p>
               </div>
            </div>

            <div className="bg-stone-800 text-stone-300 p-6 rounded-lg mb-10 text-sm">
               <p className="font-mono mb-2 text-stone-400">STATUS: ACCEPTING SUBMISSIONS</p>
               <p>We review all submissions personally. If your story is selected for publication, we will contact you to discuss the editing process to ensure it fits the "Dispatches" framework.</p>
            </div>

            <div className="text-center">
               <a 
                 href="mailto:stories@dispatchesfromdischargehell.com?subject=Story Submission" 
                 className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-rose-700 rounded-md hover:bg-rose-800 hover:shadow-lg transform hover:-translate-y-1"
               >
                 <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
                 Encrypt & Send via Email
               </a>
            </div>
         </div>
         
         {/* Footer pattern */}
         <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZjVZjVlZjQiLz4KPHBhdGggZD0iTTEgM0gyVjJIMUMxbTEgMEgyVjFIMUMxIiBmaWxsPSIjZTZlNGRkIi8+Cjwvc3ZnPg==')] h-4 w-full border-t border-stone-300"></div>
      </div>
    </div>
  );
};

export default SubmitStory;