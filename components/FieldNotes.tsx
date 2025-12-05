import React, { useState, useMemo } from 'react';
import { fieldNotesData } from '../fieldNotesData';
import { FieldNoteEntry } from '../types';

const FieldNotes: React.FC = () => {
  const [filterType, setFilterType] = useState<'ALL' | 'COMMENTARY' | 'SOURCE'>('ALL');
  const [selectedSourceType, setSelectedSourceType] = useState<string>('All');

  // Get all entries and sort by date descending
  const allEntries: FieldNoteEntry[] = useMemo(() => {
    const entries = fieldNotesData.entries || [];
    return [...(entries as unknown as FieldNoteEntry[])].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  // Extract unique source types for the dropdown
  const sourceTypes = useMemo(() => {
    const types = new Set(allEntries.map(e => e.sourceType));
    return ['All', ...Array.from(types)];
  }, [allEntries]);

  // Filter logic
  const filteredEntries = useMemo(() => {
    return allEntries.filter(entry => {
      if (filterType === 'COMMENTARY') {
        return entry.jorgeCommentary.hasCommentary;
      }
      if (filterType === 'SOURCE') {
        return selectedSourceType === 'All' || entry.sourceType === selectedSourceType;
      }
      return true;
    });
  }, [filterType, selectedSourceType, allEntries]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-4">Field Notes</h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto font-serif">
          Healthcare commentary from across the web, translated through the catastrophic care lens.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => setFilterType('ALL')}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
            filterType === 'ALL'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
          }`}
        >
          All Entries
        </button>
        <button
          onClick={() => setFilterType('COMMENTARY')}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
            filterType === 'COMMENTARY'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
          }`}
        >
          With Jorge's Commentary
        </button>
        
        <div className="relative inline-block">
          <select
            value={filterType === 'SOURCE' ? selectedSourceType : 'Source'}
            onChange={(e) => {
              setFilterType('SOURCE');
              setSelectedSourceType(e.target.value);
            }}
            className={`appearance-none pl-4 pr-10 py-2 rounded-full font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer ${
              filterType === 'SOURCE'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
            }`}
          >
             {filterType !== 'SOURCE' && <option value="Source" disabled>By Source</option>}
             {sourceTypes.map(type => (
               <option key={type} value={type} className="text-stone-900 bg-white">
                 {type === 'All' && filterType !== 'SOURCE' ? 'By Source' : type}
               </option>
             ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
            <svg className={`h-4 w-4 ${filterType === 'SOURCE' ? 'text-white' : 'text-stone-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-8">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 text-stone-500 bg-stone-100 rounded-xl border border-stone-200 border-dashed">
            <p className="font-serif italic">No entries found for this filter.</p>
            <button onClick={() => setFilterType('ALL')} className="mt-4 text-rose-600 font-bold hover:underline">
               Reset Filters
            </button>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div 
              key={entry.id} 
              className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6 sm:p-8">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                     <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider rounded ${
                        entry.sourceType === 'Twitter' ? 'bg-sky-100 text-sky-700' :
                        entry.sourceType === 'News' ? 'bg-purple-100 text-purple-700' :
                        'bg-stone-100 text-stone-700'
                     }`}>
                        {entry.sourceType}
                     </span>
                     <span className="text-sm font-bold text-stone-900">
                        {entry.source}
                     </span>
                  </div>
                  <span className="text-sm font-medium text-stone-400">
                    {formatDate(entry.date)}
                  </span>
                </div>

                {/* Excerpt */}
                <div className="mb-6 relative">
                   <svg className="absolute -top-2 -left-2 w-8 h-8 text-stone-100 transform -scale-x-100" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21L14.017 18C14.017 16.082 15.435 14.861 16.374 14.861C17.129 14.861 17.002 15.003 17.696 14.861C19.125 14.568 19.994 13.539 20.019 12.029C20.024 11.758 19.805 11.539 19.534 11.539C19.332 11.539 19.155 11.638 19.049 11.802C18.496 12.656 17.202 12.656 16.597 12.656C15.011 12.656 13.714 11.362 13.714 9.775C13.714 8.188 15.011 6.894 16.597 6.894C18.184 6.894 19.48 8.188 19.48 9.775C19.48 10.15 19.553 10.511 19.684 10.849C19.742 10.998 19.919 11.057 20.05 10.963C20.409 10.707 20.988 10.22 20.988 9.444C20.988 6.994 18.995 5 16.545 5C14.095 5 12.102 6.994 12.102 9.444C12.102 11.028 12.981 12.428 14.288 13.189C13.688 13.826 13.166 14.566 12.75 15.385C12.441 15.996 12.87 16.711 13.555 16.711C13.766 16.711 13.961 16.611 14.084 16.441C14.39 16.015 14.777 15.632 15.228 15.313C15.42 15.177 15.65 15.313 15.65 15.549C15.65 15.549 15.65 15.549 15.65 15.549C15.65 15.549C15.65 16.924 14.996 18.146 14.017 21ZM5.545 21L5.545 18C5.545 16.082 6.963 14.861 7.902 14.861C8.657 14.861 8.53 15.003 9.224 14.861C10.653 14.568 11.522 13.539 11.547 12.029C11.552 11.758 11.333 11.539 11.062 11.539C10.86 11.539 10.683 11.638 10.577 11.802C10.024 12.656 8.73 12.656 8.125 12.656C6.539 12.656 5.242 11.362 5.242 9.775C5.242 8.188 6.539 6.894 8.125 6.894C9.711 6.894 11.008 8.188 11.008 9.775C11.008 10.15 11.081 10.511 11.212 10.849C11.27 10.998 11.447 11.057 11.578 10.963C11.937 10.707 12.516 10.22 12.516 9.444C12.516 6.994 10.523 5 8.073 5C5.623 5 3.63 6.994 3.63 9.444C3.63 11.028 4.509 12.428 5.816 13.189C5.216 13.826 4.694 14.566 4.278 15.385C3.969 15.996 4.398 16.711 5.083 16.711C5.294 16.711 5.489 16.611 5.612 16.441C5.918 16.015 6.305 15.632 6.756 15.313C6.948 15.177 7.178 15.313 7.178 15.549C7.178 15.549 7.178 15.549 7.178 15.549C7.178 16.924 6.524 18.146 5.545 21Z" />
                   </svg>
                   <p className="text-lg md:text-xl text-stone-700 font-serif leading-relaxed italic pl-6 border-l-2 border-stone-200">
                     "{entry.excerpt}"
                   </p>
                </div>

                <a 
                  href={entry.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-bold text-stone-500 hover:text-rose-600 transition-colors mb-6 group"
                >
                  Read full source 
                  <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                {/* Jorge's Take */}
                {entry.jorgeCommentary.hasCommentary && (
                  <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-lg mt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-rose-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        J
                      </div>
                      <h3 className="font-bold text-rose-700 text-sm tracking-wide">JORGE'S TAKE</h3>
                    </div>
                    
                    <p className="text-stone-800 leading-relaxed font-sans mb-3">
                       {entry.jorgeCommentary.text}
                    </p>

                    {entry.jorgeCommentary.relatedLinks && entry.jorgeCommentary.relatedLinks.length > 0 && (
                       <div className="flex items-center gap-2 mt-4 pt-4 border-t border-rose-100">
                          <span className="text-xs font-bold text-rose-400 uppercase">Related:</span>
                          {entry.jorgeCommentary.relatedLinks.map((link, idx) => (
                             <span key={idx} className="text-xs font-medium bg-white text-rose-600 px-2 py-1 rounded border border-rose-100">
                                {link}
                             </span>
                          ))}
                       </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Footer Note */}
      <div className="mt-12 text-center">
         <p className="text-stone-400 text-sm">
            Content curated weekly. Opinions are my own.
         </p>
      </div>
    </div>
  );
};

export default FieldNotes;