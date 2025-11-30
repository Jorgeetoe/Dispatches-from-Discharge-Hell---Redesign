import React, { useRef } from 'react';

interface PdfUploaderProps {
  file: File | null;
  previewUrl: string | null;
  onFileSelect: (file: File, url: string) => void;
  onClear: () => void;
}

const PdfUploader: React.FC<PdfUploaderProps> = ({ file, previewUrl, onFileSelect, onClear }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        onFileSelect(selectedFile, reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  if (!file) {
    return (
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
         <input 
           type="file" 
           accept=".pdf" 
           onChange={handleFileChange} 
           className="hidden" 
           ref={fileInputRef} 
         />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg border border-stone-200">
         <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-md border border-stone-200 text-rose-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0111.293 2.293L15.707 6.707A1 1 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" /></svg>
            </div>
            <div>
                <p className="font-semibold text-stone-900 truncate max-w-xs sm:max-w-md">{file.name}</p>
                <p className="text-xs text-stone-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
         </div>
         <button 
           onClick={onClear} 
           className="text-stone-400 hover:text-rose-600 transition-colors p-2 rounded-full hover:bg-stone-200"
           aria-label="Remove file"
         >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
         </button>
      </div>
      
      {previewUrl && (
        <div className="h-96 bg-stone-100 rounded-lg border border-stone-200 overflow-hidden shadow-inner relative">
           <iframe src={previewUrl} className="w-full h-full" title="PDF Preview" />
        </div>
      )}
    </div>
  );
};

export default PdfUploader;