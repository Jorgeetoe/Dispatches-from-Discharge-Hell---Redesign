import React, { useState } from 'react';
import Header from './components/Header';
import StoryFeed from './components/StoryFeed';
import ChecklistGenerator from './components/ChecklistGenerator';
import AboutMe from './components/AboutMe';
import SubmitStory from './components/SubmitStory';
import Archive from './components/Archive';
import NewsletterSignup from './components/NewsletterSignup';
import FAQ from './components/FAQ';
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
                Stories from understanding the differences and significant gaps between "safe and appropriate" discharges from catastrophic care. The Home of Last Resort Thought Concept and chronicles™. Where medical necessity meets administrative absurdity.
              </p>
            </div>
            <StoryFeed stories={MOCK_STORIES} onReadStory={handleReadStory} />
            <NewsletterSignup />
          </div>
        );

      case AppView.ARCHIVE:
        return <Archive onReadStory={handleReadStory} />;

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
            <article className="prose prose-stone prose-lg mx-auto mb-16">
              
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
          </div>
        );

      case AppView.CHECKLIST_GENERATOR:
        return <ChecklistGenerator />;
        
      case AppView.ABOUT:
        return <AboutMe />;

      case AppView.SUBMIT:
        return <SubmitStory />;
        
      case AppView.FAQ:
        return <FAQ />;

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
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm font-medium">
             <button onClick={() => setCurrentView(AppView.FAQ)} className="hover:text-white transition-colors">FAQ</button>
             <button onClick={() => setCurrentView(AppView.HOME)} className="hover:text-white transition-colors">Stories</button>
             <button onClick={() => setCurrentView(AppView.CHECKLIST_GENERATOR)} className="hover:text-white transition-colors">Checklist</button>
             <button onClick={() => setCurrentView(AppView.ABOUT)} className="hover:text-white transition-colors">About</button>
          </div>
          
          <div className="mb-8 bg-stone-800 rounded-lg p-6">
            <NewsletterSignup minimal={true} />
          </div>

          <div className="flex justify-center items-center gap-8 mb-8">
            <a 
              href="https://buymeacoffee.com/jorgearenivar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-[#FFDD00] transition-colors group"
              title="Buy Me a Coffee"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M20.216 6.415l-.132-.666c-.119-.596-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.098H4.643c-.386 0-.717.136-.957.262-.731.391-1.076 1.107-1.144 1.854l-.273 2.949c-.198 2.126.335 4.39 2.163 5.568 1.494.962 3.298 1.166 4.969 1.166h.016c.453 0 .866-.166 1.254-.367.437-.226.96-.499 1.571-.499.58 0 1.092.26 1.52.484.407.213.847.382 1.332.382h.013c1.67 0 3.474-.204 4.969-1.166 1.637-1.055 2.222-2.957 2.257-4.787l.088-2.613c.895-.418 1.517-1.42 1.487-2.646-.021-.861-.403-1.606-1.11-2.066l.019-.009zm-3.87 6.137c-.12.628-.485 1.139-1.029 1.488-1.077.694-2.45.84-3.693.84h-.011c-.139 0-.256-.051-.383-.117-.557-.289-1.36-.706-2.41-.706-1.078 0-1.895.426-2.457.717-.122.063-.235.106-.364.106h-.01c-1.242 0-2.615-.146-3.692-.84-1.039-.669-1.343-2.029-1.229-3.256l.273-2.936c.026-.289.135-.503.354-.618.106-.056.23-.082.355-.082h13.85c.061 0 .152.012.233.041.227.08.384.281.428.498l.132.666c.204 2.115.344 3.19.654 4.139zm2.427-4.22c.106.326.046.726-.226 1.029-.271.303-.701.442-1.066.42l-.083-.734-.055-1.551c.677.07 1.265.419 1.43 0.836z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/jorgearenivar/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors" title="LinkedIn">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://x.com/JorgeArenivar" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors" title="X (Twitter)">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.facebook.com/jorge.arenivar" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors" title="Facebook">
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
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