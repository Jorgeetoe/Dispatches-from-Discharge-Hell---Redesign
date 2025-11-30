import React from 'react';

const SubmitStory: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-stone-900 mb-6">Share Your Dispatch</h2>
        <p className="text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
          Your voice matters. By sharing your experience, you help expose the systemic issues in catastrophic care and empower others to advocate for themselves.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        <div className="bg-gradient-to-r from-rose-600 to-rose-800 h-3 w-full"></div>
        <div className="p-8 sm:p-12">
          
          <div className="mb-10">
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Submission Guidelines</h3>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">1</div>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-lg">The Narrative</h4>
                  <p className="text-stone-600">Focus on the friction points: the insurance denial, the nonsensical discharge plan, or the "medical necessity" debate.</p>
                </div>
              </div>

              <div className="flex">
                 <div className="flex-shrink-0 mr-4">
                  <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">2</div>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-lg">Anonymity is Key</h4>
                  <p className="text-stone-600">Change names, dates, and specific facility locations. We want the truth of the experience, not the liability.</p>
                </div>
              </div>

              <div className="flex">
                 <div className="flex-shrink-0 mr-4">
                  <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">3</div>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-lg">Format</h4>
                  <p className="text-stone-600">Email is best. You can write it in the body or attach a document. 500-1000 words is the sweet spot.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 rounded-xl p-8 text-center border border-stone-100">
            <h3 className="text-xl font-bold text-stone-900 mb-2">Ready to contribute?</h3>
            <p className="text-stone-600 mb-6">
              Click below to draft your email.
            </p>
            
            <a 
              href="mailto:stories@dispatchesfromdischargehell.com?subject=Story Submission: [Insert Title]" 
              className="inline-flex items-center justify-center bg-stone-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-stone-800 transition-all shadow-lg transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Submit via Email
            </a>
            <p className="text-xs text-stone-400 mt-4">
              We review all submissions. If selected, we will contact you before publishing.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SubmitStory;