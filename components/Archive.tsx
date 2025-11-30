import React, { useState } from 'react';
import { MOCK_STORIES } from '../constants';
import StoryFeed from './StoryFeed';
import { Story } from '../types';

interface ArchiveProps {
  onReadStory: (story: Story) => void;
}

const Archive: React.FC<ArchiveProps> = ({ onReadStory }) => {
  const [selectedMechanism, setSelectedMechanism] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  const mechanisms = [...new Set(MOCK_STORIES.map(s => s.extractionMechanism))];
  const tiers = [...new Set(MOCK_STORIES.map(s => s.contentTier))];
  const layers = [...new Set(MOCK_STORIES.map(s => s.systemLayer))];

  const filtered = MOCK_STORIES.filter(story => 
    (!selectedMechanism || story.extractionMechanism === selectedMechanism) &&
    (!selectedTier || story.contentTier === selectedTier) &&
    (!selectedLayer || story.systemLayer === selectedLayer)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-4xl font-serif font-bold text-stone-900 mb-12">Archive</h1>

      {/* FILTERS */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        
        {/* Mechanism Filter */}
        <div>
          <h3 className="font-bold text-stone-700 text-sm uppercase tracking-wider mb-3">Extraction Mechanism</h3>
          <div className="space-y-2">
            <button 
              onClick={() => setSelectedMechanism(null)}
              className={`block text-sm text-left ${!selectedMechanism ? 'text-rose-600 font-bold' : 'text-stone-600 hover:text-stone-900'}`}
            >
              All
            </button>
            {mechanisms.map(mech => (
              <button 
                key={mech}
                onClick={() => setSelectedMechanism(mech)}
                className={`block text-sm text-left ${selectedMechanism === mech ? 'text-rose-600 font-bold' : 'text-stone-600 hover:text-stone-900'}`}
              >
                {mech}
              </button>
            ))}
          </div>
        </div>

        {/* Tier Filter */}
        <div>
          <h3 className="font-bold text-stone-700 text-sm uppercase tracking-wider mb-3">Content Tier</h3>
          <div className="space-y-2">
            <button 
              onClick={() => setSelectedTier(null)}
              className={`block text-sm text-left ${!selectedTier ? 'text-rose-600 font-bold' : 'text-stone-600 hover:text-stone-900'}`}
            >
              All
            </button>
            {tiers.map(tier => (
              <button 
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`block text-sm text-left ${selectedTier === tier ? 'text-rose-600 font-bold' : 'text-stone-600 hover:text-stone-900'}`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* System Layer Filter */}
        <div>
          <h3 className="font-bold text-stone-700 text-sm uppercase tracking-wider mb-3">System Layer</h3>
          <div className="space-y-2">
            <button 
              onClick={() => setSelectedLayer(null)}
              className={`block text-sm text-left ${!selectedLayer ? 'text-rose-600 font-bold' : 'text-stone-600 hover:text-stone-900'}`}
            >
              All
            </button>
            {layers.map(layer => (
              <button 
                key={layer}
                onClick={() => setSelectedLayer(layer)}
                className={`block text-sm text-left ${selectedLayer === layer ? 'text-rose-600 font-bold' : 'text-stone-600 hover:text-stone-900'}`}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* RESULTS */}
      <div className="mb-8 border-b border-stone-200 pb-4">
        <p className="text-stone-600 text-sm font-medium">{filtered.length} post{filtered.length !== 1 ? 's' : ''} found</p>
      </div>

      <StoryFeed stories={filtered} onReadStory={onReadStory} />
    </div>
  );
};

export default Archive;