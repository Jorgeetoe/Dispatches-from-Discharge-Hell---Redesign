import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-6">About the Author</h1>
        <div className="w-24 h-1 bg-rose-600 mx-auto rounded-full"></div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
             <img 
               src="/jorge.png" 
               alt="Jorge Arenivar" 
               className="w-full md:w-56 rounded-lg shadow-md object-cover" 
             />
             <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4">Who I Am</h2>
                <p className="text-lg text-stone-700 leading-relaxed mb-4 font-serif">
                   My name is <strong className="text-stone-900">Jorge Arenivar</strong>. I'm a Registered Nurse, Certified Case Manager (RN, CCM, CRRN) with over 20 years in neurorehabilitation. My background spans bedside nursing, specialized brain and spinal cord injury care, post-acute care operations, program development, and catastrophic case management.
                </p>
                <p className="text-stone-700 leading-relaxed mb-4">
                  That combination gives me what I call the "holy trinity" of lived experience: I've been the clinician, the administrator, and the person standing between impossible families and impossible systems.
                </p>
                <p className="text-stone-700 leading-relaxed">
                  I work at one of the country's leading rehabilitation hospitals, where we specialize in Disorders of Consciousness, spasticity management, and complex spinal cord injuries. It's excellent work in a broken context.
                </p>
             </div>
          </div>
      </div>

      <div className="prose prose-stone prose-lg mx-auto max-w-none">
         
         <h2 className="font-serif text-stone-900 font-bold text-2xl mt-12 mb-6">What I Actually Do</h2>
         <p>
           I navigate gaps. But more importantly, I've learned to see the patterns. And now I'm documenting them.
         </p>
         <p>
           After 20 years managing the space between what should happen and what actually does, I recognized something: the gap isn't random. It's systematic. It's engineered. Insurance companies understand which families won't appeal denials. Hospitals understand which discharge delays they can justify. Equipment vendors understand which approvals get lost in processing. The system doesn't fail. It performs as designed.
         </p>
         <blockquote className="border-l-4 border-rose-500 pl-4 italic bg-stone-50 py-2 pr-2 my-6">
           The gap is the feature, not the bug. But the feature only works if it stays invisible.
         </blockquote>
         <p>
           Specifically, I operate in the space between what hospital discharge should be (timely, coordinated care) and what it actually is: delays, denials, and fragmented services. Between what insurance companies say they cover (like outpatient therapy) and what they'll actually pay for (often limited or denied). Between what families were promised during admission (full recovery support) and what's still possible on discharge day (often minimal or no coverage). Between clinical evidence supporting care and prior authorization committees that read denials from scripts, revealing systemic failures in translating evidence into coverage.
         </p>
         <p>
           Here's what I've learned: every discharge decision is a collision of competing interests, often leading to compromised patient outcomes. Hospital incentives, insurance incentives, family expectations, clinical reality, and system constraints don't align, risking patient safety and recovery. Someone wins. Someone loses. And the people bearing the cost usually aren't the ones making the decisions.
         </p>
         <p>
           Watch this happen enough times, and you see the pattern. It's not malice, it's institutional logic. The system functions because people like me translate between what should happen and what will actually happen. We make it work. But making it work requires moral compromises that nobody talks about, which helps the audience feel understanding and less judgmental of systemic flaws.
         </p>
         <p className="font-bold text-stone-900">
           This is what I want readers to understand: that gap isn't a bug, it's the feature that keeps the whole thing running, and recognizing this transparency builds trust and clarity for the audience.
         </p>

         <h2 className="font-serif text-stone-900 font-bold text-2xl mt-12 mb-6">Why This Platform Exists</h2>
         <p>
           I created Dispatches from Discharge Hell because the system depends on invisibility. On gaps that stay unnamed. On case managers absorbing contradictions without making them explicit. On families thinking their discharge plan is a choice when it's actually a constraint.
         </p>
         <p>
           I want to make the invisible visible. Not just "here's how to navigate the system," but "here's how the system is designed to work. Here's which decisions extract value from which populations. Here's how competing interests collide at every discharge decision. Here's who benefits when the gap stays hidden."
         </p>
         <p>
           That requires showing it multiple ways. Through case studies that expose what actually happened. Through comparisons that reveal the logic. Through mock forms that satirize the bureaucracy. Through resources that name what the system won't say. Through analysis that maps competing interests so you can see the architecture.
         </p>
         <p>
           Because the system only works if you think you're the problem. If you can see how it's engineered, you stop blaming yourself for getting trapped in it.
         </p>

         <h2 className="font-serif text-stone-900 font-bold text-2xl mt-12 mb-6">What You'll Find Here</h2>
         
         <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 mb-8">
           <h3 className="text-xl font-bold text-stone-900 mb-4">Multiple entry points for different readers:</h3>
           <ul className="list-disc pl-5 space-y-3">
             <li><strong>Families navigating discharge:</strong> Honest explanations of what your insurance actually covers. Discharge planning scenarios you'll recognize. Questions to ask when they tell you you're ready to go home. Resources that assume you're dealing with complexity and time pressure.</li>
             <li><strong>Clinicians in the system:</strong> Peer-to-peer review realities. How to speak insurance language while staying clinically honest. What you're actually documenting when you document in Epic. How to function inside contradictions without losing yourself.</li>
             <li><strong>Case managers doing this work:</strong> The fixer's manual. How to navigate impossible systems because someone has to. How competing interests actually operate. What moral compromises you're making and why. How to maintain professional integrity while accepting systemic constraints.</li>
             <li><strong>General public understanding healthcare:</strong> What catastrophic care actually costs. How insurance logic works. Why discharge happens when it does. The difference between what the system says and what it does.</li>
           </ul>
         </div>

         <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 mb-8">
           <h3 className="text-xl font-bold text-rose-900 mb-4">Multiple formats because different people need different evidence:</h3>
           <ul className="list-disc pl-5 space-y-2 text-rose-900">
             <li>Deep dives exposing systemic design.</li>
             <li>Comparisons revealing hidden logic.</li>
             <li>Case studies showing cascading failures.</li>
             <li>Mock forms satirizing bureaucratic absurdity.</li>
             <li>Checklists for families preparing for discharge.</li>
             <li>FAQs answering what the system won't say.</li>
             <li>Flowcharts showing how decisions actually get made.</li>
           </ul>
         </div>
         
         <p>Same underlying analysis. Different entry points. Same purpose: make visible what the system needs to keep hidden.</p>

         <h2 className="font-serif text-stone-900 font-bold text-2xl mt-12 mb-6">The Bigger Picture</h2>
         <p>
           I operate in the space between policy and practice. That space is where real decisions get made. It's also where most systemic failures hide.
         </p>
         <p>
           When the attending physicians I work with conduct a peer-to-peer review with an insurance medical director, they're not just defending a patient's care. They're navigating competing definitions of "medical necessity." They're translating clinical evidence into language the payer understands. They're managing the gap between what's right and what's possible.
         </p>
         <p>
           When I explain discharge options to a family, I'm not just presenting choices. I'm mapping their insurance coverage, the hospital's length-of-stay metrics, the hospital's empty beds, and the patient's actual needs, knowing these rarely align. I'm helping them understand which "choice" is actually an option and which is an illusion.
         </p>
         <p>
           When I document in Epic, I'm managing liability. When I try to negotiate with facilities, I'm solving problems that shouldn't exist. When I appeal denials, I'm carrying the weight of system failures and framing them in ways the system might acknowledge.
         </p>
         <p>
           What case managers actually do is manage the gap between policy and practice. We've always known this. We've just never documented it this explicitly.
         </p>
         <p>
           This platform documents what we do. Why we do it. What it costs. Who pays. And how the system depends on us staying quiet about how it works.
         </p>
         <p className="font-bold">That's the shift: from navigation in silence to documentation in daylight.</p>

         <h2 className="font-serif text-stone-900 font-bold text-2xl mt-12 mb-6">Tone and Approach</h2>
         <p>
           Dispatches is clinical and satirical. It draws from 20 years of bedside reality, administrative absurdity, and catastrophic case management. The humor is real. It's the same dark comedy that keeps front-line staff functional when they're navigating impossible situations. The analysis is credible, grounded in actual policy, actual denials, actual discharge scenarios.
         </p>
         <p>
           I'm not here to bash the system (though I will name its failures). I'm here to document how it actually works so you can navigate it effectively. That requires honesty. Sometimes brutal honesty. But honesty.
         </p>

         <h2 className="font-serif text-stone-900 font-bold text-2xl mt-12 mb-6">The Bottom Line</h2>
         <p>
           This is documentation from inside the gap. Not a survival guide, though it functions as that. Not an advocacy platform, though it does advocate. But deliberate exposure of how extraction actually works.
         </p>
         <p>
           The system needs the gap to stay invisible. You need to see it clearly.
         </p>
         <p className="font-bold text-xl text-stone-900">This is what clarity looks like.</p>

         <div className="mt-12 pt-8 border-t border-stone-200">
           <p className="font-serif font-bold text-stone-900 text-lg">Jorge Arenivar, RN, CCM, CRRN</p>
           <p className="text-stone-600">Neurorehabilitation Case Manager</p>
           <p className="text-stone-600">Last Resort Rehab Hospital</p>
           <p className="text-stone-500 italic mt-2">Documenting the space between what the system says and what it actually does</p>
         </div>
      </div>
    </div>
  );
};

export default AboutMe;