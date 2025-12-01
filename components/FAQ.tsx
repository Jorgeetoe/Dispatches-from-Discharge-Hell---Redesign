import React from 'react';

const FAQ: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h1>
        <p className="text-xl text-stone-600 mb-12">
          Questions about Dispatches, the framework, and how to use these resources.
        </p>
      </div>

      <div className="bg-stone-50 border border-stone-200 rounded-lg p-8 text-center">
        <p className="text-stone-500 text-lg">
          FAQ content coming soon. Questions? Email us or check back later.
        </p>
      </div>
    </div>
  );
};

export default FAQ;