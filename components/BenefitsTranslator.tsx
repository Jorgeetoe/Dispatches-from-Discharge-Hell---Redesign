import React, { useState } from 'react';
import { analyzeBenefitsPolicy } from '../services/geminiService';
import { BenefitsAnalysis } from '../types';
import PdfUploader from './PdfUploader';

const BenefitsTranslator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<BenefitsAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (selectedFile: File, url: string) => {
    setFile(selectedFile);
    setPdfPreviewUrl(url);
    setAnalysis(null);
  };

  const handleClear = () => {
    setFile(null);
    setPdfPreviewUrl(null);
    setAnalysis(null);
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
        <PdfUploader 
          file={file} 
          previewUrl={pdfPreviewUrl} 
          onFileSelect={handleFileSelect} 
          onClear={handleClear} 
        />

        {file && !analysis && (
           <div className="mt-8">
               <button 
                 onClick={handleAnalyze} 
                 disabled={isLoading}
                 className="w-full py-4 rounded-xl font-bold text-lg text-white bg-rose-600 hover:bg-rose-700 shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2 transform hover:-translate-y-0.5"
               >
                 {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Policy...
                    </>
                 ) : (
                    'Analyze Policy'
                 )}
               </button>
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