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
        <article key={story.id} className="flex flex-col group cursor-pointer" onClick={() => onReadStory(story)}>
          <div className="flex items-center space-x-2 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-2">
            <span>{story.tags[0]}</span>
            <span className="text-stone-300">•</span>
            <span>{story.readTime} min read</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-3 group-hover:text-rose-700 transition-colors">
            {story.title}
          </h2>
          <p className="text-stone-600 leading-relaxed mb-4 text-lg">
            {story.preview}
          </p>
          <div className="flex items-center text-sm text-stone-500 font-medium">
            <span>By {story.author}</span>
            <span className="mx-2 text-stone-300">|</span>
            <span>{story.date}</span>
          </div>
          <div className="w-full h-px bg-stone-200 mt-12 group-last:hidden"></div>
        </article>
      ))}
    </div>
  );
};

export default StoryFeed;
