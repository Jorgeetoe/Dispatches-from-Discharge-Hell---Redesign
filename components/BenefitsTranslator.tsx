import React, { useState, useRef } from 'react';
import { analyzeBenefitsPolicy } from '../services/geminiService';
import { BenefitsAnalysis } from '../types';

const BenefitsTranslator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<BenefitsAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setAnalysis(null);
      const reader = new FileReader();
      reader.onload = () => setPdfPreviewUrl(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file || !pdfPreviewUrl) return;
    setIsLoading(true);
    try {
      const base64String = pdfPreviewUrl.split(',')[1];
      const result = await analyzeBenefitsPolicy(base64String);
      if (result) setAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-4">Benefits Translator</h2>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto">
          Upload your insurance policy PDF. Our AI agent will decode the "medical necessity" clauses and highlight potential denial traps.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8 mb-12">
        {!file ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-stone-300 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors p-12 text-center cursor-pointer group"
          >
             <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-stone-400 group-hover:text-rose-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
             </div>
             <h3 className="text-xl font-bold text-stone-800 mb-2">Upload Insurance Policy (PDF)</h3>
             <p className="text-stone-500 text-sm">Click to browse your files (Max 10MB)</p>
             <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
             <div className="flex-1">
                <div className="flex items-center justify-between mb-4 p-4 bg-stone-50 rounded-lg border border-stone-200">
                   <div className="flex items-center gap-3">
                      <svg className="w-8 h-8 text-rose-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0111.293 2.293L15.707 6.707A1 1 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" /></svg>
                      <span className="font-semibold text-stone-700 truncate">{file.name}</span>
                   </div>
                   <button onClick={() => { setFile(null); setAnalysis(null); }} className="text-stone-400 hover:text-stone-600">✕</button>
                </div>
                
                {pdfPreviewUrl && (
                  <div className="h-64 md:h-96 bg-stone-100 rounded-lg border border-stone-200 overflow-hidden mb-6">
                     <iframe src={pdfPreviewUrl} className="w-full h-full" title="PDF Preview" />
                  </div>
                )}

                {!analysis && (
                   <button 
                     onClick={handleAnalyze} 
                     disabled={isLoading}
                     className="w-full py-3 rounded-lg font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md transition-all flex justify-center items-center gap-2"
                   >
                     {isLoading ? 'Analyzing Document...' : 'Analyze Policy'}
                   </button>
                )}
             </div>
          </div>
        )}

        {analysis && (
           <div className="mt-12 space-y-8 animate-fade-in border-t border-stone-200 pt-12">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                 <h3 className="text-lg font-bold text-amber-800 mb-2">Executive Summary</h3>
                 <p className="text-amber-900 leading-relaxed">{analysis.summary}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                 <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                    <h3 className="font-serif font-bold text-xl mb-4 text-stone-900">Deductibles & Maximums</h3>
                    <p className="text-stone-600">{analysis.deductibles_and_maximums}</p>
                 </div>
                 <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
                    <h3 className="font-serif font-bold text-xl mb-4 text-rose-900">Red Flag Clauses</h3>
                    <ul className="list-disc pl-5 space-y-2 text-rose-800">
                       {analysis.red_flags.map((flag, i) => <li key={i}>{flag}</li>)}
                    </ul>
                 </div>
              </div>

              <div>
                 <h3 className="font-serif font-bold text-2xl mb-6 text-stone-900">Coverage Limits Breakdown</h3>
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-stone-200 border border-stone-200 rounded-lg overflow-hidden">
                       <thead className="bg-stone-100">
                          <tr>
                             <th className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Category</th>
                             <th className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Limit</th>
                             <th className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Explanation</th>
                          </tr>
                       </thead>
                       <tbody className="bg-white divide-y divide-stone-200">
                          {analysis.coverage_limits.map((item, idx) => (
                             <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">{item.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{item.limit}</td>
                                <td className="px-6 py-4 text-sm text-stone-600">{item.explanation}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
                 <h3 className="font-serif font-bold text-xl mb-3 text-blue-900">Case Manager's Advice</h3>
                 <p className="text-blue-800 italic text-lg">"{analysis.actionable_advice}"</p>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default BenefitsTranslator;