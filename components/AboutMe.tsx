import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        {/* Hero Header */}
        <div className="bg-stone-900 text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">About Me</h1>
            <p className="text-xl sm:text-2xl font-serif italic text-stone-300">
              Introducing “Dispatches from Discharge Hell: A Candid Perspective on Catastrophic Rehabilitation.”
            </p>
          </div>
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-rose-600 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-teal-600 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="p-8 sm:p-12 space-y-12">
          {/* Who I Am */}
          <section>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="aspect-square bg-stone-100 rounded-xl overflow-hidden shadow-inner flex items-center justify-center border border-stone-200">
                   {/* Placeholder for Headshot - using initials for now */}
                   <div className="text-8xl font-serif font-bold text-stone-300">JA</div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6 flex items-center">
                  <span className="bg-rose-100 p-2 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  Who I Am
                </h2>
                <div className="prose prose-stone prose-lg text-stone-700">
                  <p>
                    My name is <strong>Jorge Arenivar</strong>, and I have over 20 years of experience in neurorehabilitation. This includes bedside nursing, specialized care for brain and spinal cord injuries, post-acute care, marketing for brain injury programs, and catastrophic case management. I like to refer to this combination as the “holy trinity” of lived experience. Throughout my career, I have been fortunate to witness incredible recoveries; however, I have also learned that many of these “miracles” often require prior authorization from insurance companies.
                  </p>
                  <p className="mt-4">
                    Currently, I work at one of the top rehabilitation hospitals in the country, where the focus is on programs related to Disorders of Consciousness (DOC), spasticity management, and spinal cord injuries. Our hospital is renowned for its excellence, and with that reputation comes high expectations from patients, families, and insurance payers.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-stone-200" />

          {/* Why This Platform Exists */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Why This Platform Exists</h2>
            <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-teal-500 italic text-stone-700 text-lg leading-relaxed">
              "The absurdities I’ve witnessed would be amusing if they weren’t affecting real people with real futures in real time."
            </div>
            <p className="mt-6 text-lg text-stone-700 leading-relaxed">
              I’ve watched this field evolve, stall, reinvent itself, and repeatedly stumble over the same systemic obstacles. What finally compelled me to speak up? Living it every day. Sharing stories with colleagues who validated the chaos, and then reading journal articles that skirt around the problem. These articles sanitize the struggle and ignore the fact that this system is failing those it is meant to serve. That’s why I created <em>Dispatches from Discharge Hell</em>, a platform grounded in truth, enhanced by humor, and supported by professional credibility.
            </p>
          </section>

          {/* What This Is (And Isn't) */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
              <h3 className="text-xl font-bold text-rose-900 mb-3">What This Is</h3>
              <p className="text-rose-800">
                It’s about being strategically honest. It’s about giving families the truth before the discharge scramble, perhaps even before admission. It is a space where numbers grow significant and the gap between promise and reality is exposed.
              </p>
            </div>
            <div className="bg-stone-100 p-6 rounded-xl border border-stone-200">
               <h3 className="text-xl font-bold text-stone-900 mb-3">What This Isn't</h3>
               <p className="text-stone-700">
                 This isn’t about being negative. It is not just another sanitized blog. It explores harsh realities, systemic barriers, and critiques institutional absurdities with wit and precision—providing clarity, credibility, and catharsis.
               </p>
            </div>
          </section>

          {/* Tone and Style */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Tone and Style</h2>
            <p className="text-lg text-stone-700 leading-relaxed">
              The tone of this piece is a mix of clinical and satirical, drawing from personal experience and tailored for those who have seen behind the scenes. Inspired by dark comedy and the gallows humor that helps keep front-line staff sane, <em>Dispatches from Discharge Hell</em> is more than just a blog. It serves as a survival guide, a call to action, and a nod to every clinician who has had to conduct a peer-to-peer review on a Friday at 4:45 PM.
            </p>
          </section>

          {/* What You'll Discover Here */}
          <section className="bg-stone-900 text-stone-300 p-8 sm:p-10 rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-serif font-bold text-white mb-6">What You’ll Discover Here</h2>
              <ul className="space-y-4">
                {[
                  "Firsthand insights from the front lines of neuro rehabilitation and case management.",
                  "Witty commentary on systemic dysfunctions, accompanied by real policy implications.",
                  "Resources for patients, families, and professionals navigating complex catastrophic care.",
                  "Honest discussions aimed at informing, empowering, and entertaining readers.",
                  "In-depth analysis of discharge planning, benefit design, and the challenges posed by payers."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* The Bigger Why */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">The Bigger Why</h2>
            <p className="text-lg text-stone-700 leading-relaxed mb-6">
              This is more than just a platform; it’s a turning point. It marks the beginning of a conversation that openly addresses the issues often left unspoken. For every patient who has been redirected, every family that has been misled about “realistic expectations,” and every clinician who has perfected the balance between compassion and billing codes, this space is for you.
            </p>
            <div className="text-center mt-12">
               <p className="font-serif italic text-2xl text-stone-900 mb-4">
                 "Welcome to Dispatches from Discharge Hell. Let’s acknowledge the reality of the situation and navigate through it together."
               </p>
               <p className="font-bold text-lg text-rose-600">— Jorge Arenivar</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
