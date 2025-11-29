import React, { useState } from 'react';
import Header from './components/Header';
import StoryFeed from './components/StoryFeed';
import JargonBuster from './components/JargonBuster';
import ChecklistGenerator from './components/ChecklistGenerator';
import BenefitsTranslator from './components/BenefitsTranslator';
import { MOCK_STORIES } from './constants';
import { AppView, Story } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const handleReadStory = (story: Story) => {
    setSelectedStory(story);
    setCurrentView(AppView.STORY);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-16 text-center">
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 mb-6 tracking-tight">
                Dispatches from <span className="text-rose-600 italic">Discharge Hell</span>
              </h1>
              <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
                Stories from understanding the differences and significant gaps between "safe and appropriate" discharges from catastrophic care. The Home of Last Resort Thought Process and chronicles™.
              </p>
            </div>
            <StoryFeed stories={MOCK_STORIES} onReadStory={handleReadStory} />
          </div>
        );

      case AppView.STORY:
        if (!selectedStory) return null;
        return (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button 
              onClick={() => setCurrentView(AppView.HOME)}
              className="text-stone-500 hover:text-rose-600 font-medium mb-8 flex items-center transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Stories
            </button>
            <article className="prose prose-stone prose-lg mx-auto">
              <div className="flex items-center space-x-2 text-sm font-bold text-rose-600 uppercase tracking-wider mb-4">
                <span>{selectedStory.tags.join(', ')}</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 mb-6 leading-tight">
                {selectedStory.title}
              </h1>
              <div className="flex items-center text-base text-stone-500 font-medium mb-12 pb-8 border-b border-stone-200">
                <div className="h-10 w-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-400 font-bold text-xl mr-3">
                  {selectedStory.author[0]}
                </div>
                <div>
                  <div className="text-stone-900">{selectedStory.author}</div>
                  <div className="text-stone-400 font-normal">{selectedStory.date} • {selectedStory.readTime} min read</div>
                </div>
              </div>
              <div className="whitespace-pre-line text-stone-800 font-serif leading-loose">
                {selectedStory.content}
              </div>
            </article>
            
            {/* Call to action at bottom of story */}
            <div className="mt-16 bg-rose-50 p-8 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-rose-900 mb-2">Confused by your own paperwork?</h3>
              <p className="text-rose-800 mb-6">Use our AI tool to translate your discharge summary into plain English.</p>
              <button 
                onClick={() => setCurrentView(AppView.JARGON_BUSTER)}
                className="bg-rose-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-rose-700 transition-colors"
              >
                Try Jargon Buster
              </button>
            </div>
          </div>
        );

      case AppView.JARGON_BUSTER:
        return <JargonBuster />;

      case AppView.CHECKLIST_GENERATOR:
        return <ChecklistGenerator />;

      case AppView.BENEFITS_TRANSLATOR:
        return <BenefitsTranslator />;

      case AppView.SUBMIT:
        return (
          <div className="max-w-2xl mx-auto px-4 py-12 text-center">
             <div className="bg-white p-12 rounded-3xl shadow-xl border border-stone-100">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Share Your Dispatch</h2>
                <p className="text-stone-600 text-lg mb-8">
                  Your story could help someone else advocate for themselves. We are currently accepting submissions via email.
                </p>
                <a 
                  href="mailto:stories@dispatchesfromdischargehell.com" 
                  className="inline-block bg-stone-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-stone-800 transition-colors"
                >
                  Email Your Story
                </a>
             </div>
          </div>
        );
        
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header currentView={currentView} onChangeView={setCurrentView} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-serif text-2xl text-stone-100 font-bold mb-4">Dispatches from Discharge Hell</p>
          <div className="flex justify-center space-x-6 mb-8 text-sm font-medium">
             <button onClick={() => setCurrentView(AppView.HOME)} className="hover:text-white transition-colors">Stories</button>
             <button onClick={() => setCurrentView(AppView.JARGON_BUSTER)} className="hover:text-white transition-colors">Jargon Buster</button>
             <button onClick={() => setCurrentView(AppView.CHECKLIST_GENERATOR)} className="hover:text-white transition-colors">Checklist</button>
             <button onClick={() => setCurrentView(AppView.BENEFITS_TRANSLATOR)} className="hover:text-white transition-colors">Benefits Translator</button>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Dispatches from Discharge Hell. Not medical advice. In an emergency, call 911.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;