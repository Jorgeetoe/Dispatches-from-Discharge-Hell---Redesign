import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-6">About the Author</h1>
        <div className="w-24 h-1 bg-rose-600 mx-auto rounded-full"></div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
             <img 
               src="/jorge.png" 
               alt="Jorge Arenivar" 
               className="w-full md:w-48 rounded-lg shadow-md object-cover" 
             />
             <div>
                <p className="text-lg text-stone-700 leading-relaxed mb-6 font-serif">
                   My name is <strong className="text-stone-900">Jorge Arenivar</strong>. I have over 20 years of experience in neurorehabilitation: bedside nursing, brain/spinal cord injury care, post-acute care, marketing, and catastrophic case management.
                </p>
                <div className="bg-stone-100 p-4 rounded-lg border-l-4 border-rose-500 mb-6">
                   <p className="text-stone-800 font-medium italic">
                      "The Holy Trinity of Lived Experience: Clinical Care + Marketing + Case Management."
                   </p>
                </div>
                <p className="text-stone-600 leading-relaxed">
                   I currently work at a top rehabilitation hospital focusing on Disorders of Consciousness (DOC), spasticity, and SCI. I witness miracles, but I also witness the prior authorizations required to get them.
                </p>
             </div>
          </div>
      </div>

      <div className="prose prose-stone prose-lg mx-auto">
         <h2 className="font-serif text-stone-900">Why This Platform Exists</h2>
         <p>
            The absurdities I’ve witnessed would be amusing if they weren’t affecting real people with real futures in real time. This isn't just a blog. It's a survival guide. It's a place to be strategically honest about the gap between the "metropolitan medical miracle" and the reality of rural discharge.
         </p>

         <h3 className="font-serif text-stone-900">What This Is vs. Is Not</h3>
         <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
             <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h4 className="font-bold text-green-800 mb-3 uppercase tracking-wide text-sm">✅ What This Is</h4>
                <ul className="space-y-2 text-green-900">
                   <li className="flex items-start"><span className="mr-2">•</span> Strategically honest</li>
                   <li className="flex items-start"><span className="mr-2">•</span> A space where numbers grow significant</li>
                   <li className="flex items-start"><span className="mr-2">•</span> Preparation for the discharge scramble</li>
                </ul>
             </div>
             <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
                <h4 className="font-bold text-rose-800 mb-3 uppercase tracking-wide text-sm">❌ What This Isn't</h4>
                <ul className="space-y-2 text-rose-900">
                   <li className="flex items-start"><span className="mr-2">•</span> Just another sanitized blog</li>
                   <li className="flex items-start"><span className="mr-2">•</span> Negative for the sake of negativity</li>
                   <li className="flex items-start"><span className="mr-2">•</span> Medical advice</li>
                </ul>
             </div>
         </div>

         <blockquote className="border-l-4 border-stone-300 pl-4 italic text-stone-600 my-8">
            "Let’s acknowledge the reality of the situation and navigate through it together."
            <footer className="text-sm font-bold text-stone-400 mt-2">— J.A.</footer>
         </blockquote>
      </div>
    </div>
  );
};

export default AboutMe;