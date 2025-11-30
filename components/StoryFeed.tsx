import React from 'react';
import { Story } from '../types';

interface StoryFeedProps {
  stories: Story[];
  onReadStory: (story: Story) => void;
}

const StoryFeed: React.FC<StoryFeedProps> = ({ stories, onReadStory }) => {
  return (
    <div className="space-y-12">
      {stories.map((story) => (
        <article 
          key={story.id} 
          className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <div className="p-8 sm:p-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {story.tags.map(tag => (
                <span key={tag} className="inline-block px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h2 
              className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-3 cursor-pointer hover:text-rose-600 transition-colors"
              onClick={() => onReadStory(story)}
            >
              {story.title}
            </h2>
            <div className="flex items-center text-sm text-stone-500 mb-6 font-medium">
              <span>{story.date}</span>
              <span className="mx-2">•</span>
              <span>{story.readTime} min read</span>
            </div>
            <p className="text-stone-600 leading-relaxed mb-6 text-lg font-serif">
              {story.preview}
            </p>
            <button 
              onClick={() => onReadStory(story)}
              className="inline-flex items-center text-rose-600 font-bold hover:text-rose-700 transition-colors uppercase tracking-wide text-sm"
            >
              Read Full Dispatch
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default StoryFeed;