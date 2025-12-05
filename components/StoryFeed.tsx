import React from 'react';
import { Story } from '../types';

interface StoryFeedProps {
  stories: Story[];
  onReadStory: (story: Story) => void;
}

const StoryFeed: React.FC<StoryFeedProps> = ({ stories, onReadStory }) => {
  return (
    <div className="grid gap-8">
      {stories.map((story) => (
        <article 
          key={story.id} 
          onClick={() => onReadStory(story)}
          className="group relative bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-xl hover:border-rose-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer flex flex-col md:flex-row"
        >
           {/* Image Section - Only renders if imageUrl exists */}
           {story.imageUrl && (
             <div className="w-full md:w-2/5 h-56 md:h-auto relative overflow-hidden flex-shrink-0 bg-stone-100">
                <img 
                  src={story.imageUrl} 
                  alt={story.imageAlt || story.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
                
                {/* Floating Category Badge on Image */}
                <div className="absolute top-4 left-4 z-10">
                   <span className="inline-flex items-center px-3 py-1 bg-white/95 backdrop-blur-sm text-stone-800 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm border border-stone-100">
                      {story.extractionMechanism}
                   </span>
                </div>
             </div>
           )}

          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Metadata Badges (if no image, show mechanism here, else show others) */}
              <div className="flex flex-wrap gap-2 mb-4">
                {!story.imageUrl && (
                  <span className="inline-flex items-center px-2.5 py-1 bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-wider rounded border border-stone-200">
                    {story.extractionMechanism}
                  </span>
                )}
                <span className="inline-flex items-center px-2.5 py-1 bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider rounded border border-rose-100">
                  {story.contentTier}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded border border-amber-100">
                  {story.satiricalDevice}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-3 group-hover:text-rose-600 transition-colors leading-tight">
                {story.title}
              </h2>

              {/* Meta */}
              <div className="flex flex-wrap items-center text-sm text-stone-500 mb-4 font-medium gap-y-1">
                <span className="flex items-center">
                   <svg className="w-4 h-4 mr-1.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                   {story.date}
                </span>
                <span className="mx-2 hidden sm:inline text-stone-300">•</span>
                <span className="flex items-center">
                   <svg className="w-4 h-4 mr-1.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   {story.readTime} min read
                </span>
              </div>

              {/* Preview */}
              <p className="text-stone-600 leading-relaxed mb-6 text-base sm:text-lg font-serif line-clamp-3">
                {story.preview}
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between mt-auto pt-5 border-t border-stone-100">
               <span className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center">
                  <span className="w-2 h-2 rounded-full bg-stone-300 mr-2"></span>
                  {story.systemLayer}
               </span>
               <span 
                 className="inline-flex items-center text-rose-600 font-bold group-hover:translate-x-1 transition-transform uppercase tracking-wide text-sm"
               >
                 Read Dispatch
                 <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                 </svg>
               </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default StoryFeed;