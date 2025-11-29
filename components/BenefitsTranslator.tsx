import React, { useState, useRef } from 'react';
import { analyzeBenefitsPolicy } from '../services/geminiService';
import { BenefitsAnalysis } from '../types';

const BenefitsTranslator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<BenefitsAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setError(null);
      setAnalysis(null);

      // Read file for preview
      const reader = new FileReader();
      reader.onload = () => {
        setPdfPreviewUrl(reader.result as string);
      };
      reader.onerror = () => {
        setError("Error reading file for preview.");
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPdfPreviewUrl(null);
    setAnalysis(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!file || !pdfPreviewUrl) return;

    setIsLoading(true);
    setError(null);

    try {
      // Extract base64 from the data URL we already read
      const base64String = pdfPreviewUrl.split(',')[1];
      const result = await analyzeBenefitsPolicy(base64String);
      if (result) {
        setAnalysis(result);
        // Scroll to analysis
        setTimeout(() => {
          document.getElementById('analysis-results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setError("Could not analyze the document. Please ensure it is a clear, valid PDF.");
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred during analysis.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Catastrophic Care Benefits Translator</h2>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto">
          Insurance documents are designed to be confusing. Upload your benefits PDF to view it and have our AI case manager decode the fine print, highlight red flags, and explain your catastrophic care coverage in plain English.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8 mb-12">
        {/* File Uploader Area */}
        {!file && (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center border-2 border-dashed border-stone-300 rounded-xl p-10 bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer group"
          >
            <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform duration-200">
              <svg className="w-10 h-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-stone-900">Click to upload PDF</p>
            <p className="text-sm text-stone-500 mt-2">Maximum file size: 10MB</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
        )}

        {/* Selected File & Preview */}
        {file && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6 bg-stone-50 p-4 rounded-lg border border-stone-200">
              <div className="flex items-center space-x-3">
                <div className="bg-rose-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-stone-900 truncate max-w-xs sm:max-w-md">{file.name}</p>
                  <p className="text-xs text-stone-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                onClick={handleRemoveFile}
                className="text-stone-400 hover:text-rose-600 transition-colors p-2"
                title="Remove file"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* PDF Reader / Preview */}
            {pdfPreviewUrl && (
              <div className="mb-8 border border-stone-200 rounded-xl overflow-hidden shadow-inner bg-stone-100">
                <div className="bg-stone-800 px-4 py-2 flex justify-between items-center">
                   <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">Document Viewer</span>
                </div>
                <iframe 
                  src={pdfPreviewUrl} 
                  className="w-full h-[500px] sm:h-[600px] bg-white" 
                  title="PDF Preview"
                />
              </div>
            )}

            {/* Action Buttons */}
            {!analysis && (
              <div className="flex justify-center">
                <button
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white text-lg shadow-md transition-all flex items-center justify-center ${
                    isLoading
                      ? 'bg-stone-400 cursor-not-allowed'
                      : 'bg-teal-600 hover:bg-teal-700 hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {isLoading ? (
                    <>
                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Policy...
                    </>
                  ) : (
                    <>
                      Translate Benefits
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-center font-medium flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
      </div>

      {analysis && (
        <div id="analysis-results" className="space-y-8 animate-fade-in scroll-mt-20">
          {/* Executive Summary */}
          <div className="bg-white rounded-2xl shadow-lg border-l-8 border-teal-500 p-8">
            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">Executive Summary</h3>
            <p className="text-lg text-stone-700 leading-relaxed">{analysis.summary}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Financials */}
            <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-6">
              <h4 className="text-lg font-bold text-stone-900 mb-3 flex items-center">
                <span className="bg-stone-100 p-2 rounded-lg mr-3">💰</span>
                Deductibles & Maximums
              </h4>
              <p className="text-stone-600 leading-relaxed">{analysis.deductibles_and_maximums}</p>
            </div>

            {/* Red Flags */}
            <div className="bg-rose-50 rounded-2xl shadow-md border border-rose-100 p-6">
              <h4 className="text-lg font-bold text-rose-900 mb-3 flex items-center">
                <span className="bg-white p-2 rounded-lg mr-3">🚩</span>
                Red Flags & Exclusions
              </h4>
              <ul className="space-y-3">
                {analysis.red_flags.map((flag, idx) => (
                  <li key={idx} className="flex items-start text-rose-800 text-sm">
                    <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detailed Limits */}
          <div className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden">
            <div className="bg-stone-900 px-6 py-4 flex items-center">
              <svg className="w-5 h-5 text-teal-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <h3 className="text-xl font-bold text-white">Coverage Limits Explained</h3>
            </div>
            <div className="divide-y divide-stone-100">
              {analysis.coverage_limits.map((item, idx) => (
                <div key={idx} className="p-6 hover:bg-stone-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                    <h5 className="text-lg font-bold text-teal-700">{item.category}</h5>
                    <span className="text-xs font-semibold bg-stone-100 text-stone-600 px-3 py-1 rounded-full mt-2 sm:mt-0 w-fit">
                      Limit: {item.limit}
                    </span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">{item.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Advice */}
          <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-teal-100 rounded-full opacity-50"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-teal-100 rounded-full opacity-50"></div>
            
            <h4 className="text-xl font-serif font-bold text-teal-900 mb-4 relative z-10">Case Manager's Advice</h4>
            <div className="relative z-10">
               <svg className="w-8 h-8 text-teal-200 mx-auto mb-2 transform -scale-x-100" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.017 16 8.017 15.1046 8.017 14V6C8.017 4.89543 8.91243 4 10.017 4H19.017C20.1216 4 21.017 4.89543 21.017 6V14C21.017 15.1046 20.1216 16 19.017 16H16.3719L14.017 21Z" /></svg>
               <p className="text-teal-800 text-lg italic font-medium">"{analysis.actionable_advice}"</p>
            </div>
          </div>
          
          <div className="text-center text-xs text-stone-400 mt-8">
            Disclaimer: This tool provides an AI-generated summary for informational purposes only. It is not legal or professional insurance advice. Always verify details with your provider.
          </div>
        </div>
      )}
    </div>
  );
};

export default BenefitsTranslator;
