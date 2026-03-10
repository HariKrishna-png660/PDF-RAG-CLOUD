'use client';
import * as React from 'react';
import { Upload } from 'lucide-react';

const FileUploadComponent: React.FC = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadStatus, setUploadStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const handleFileUploadButtonClick = () => {
    const el = document.createElement('input');
    el.setAttribute('type', 'file');
    el.setAttribute('accept', 'application/pdf');
    el.addEventListener('change', async () => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
        if (file) {
          setIsUploading(true);
          setUploadStatus('idle');
          const formData = new FormData();
          formData.append('pdf', file);

          try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            console.log(`Attempting upload to: ${apiUrl}/upload/pdf`);
            
            const response = await fetch(`${apiUrl}/upload/pdf`, {
              method: 'POST',
              body: formData,
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
            }

            setUploadStatus('success');
            console.log('File uploaded successfully');
          } catch (err) {
            setUploadStatus('error');
            console.error('Upload error details:', err);
          } finally {
            setIsUploading(false);
          }
        }
      }
    });
    el.click();
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        onClick={handleFileUploadButtonClick}
        className={`relative group cursor-pointer border-2 border-dashed rounded-3xl p-10 transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
          isUploading 
            ? 'border-teal-400 bg-teal-50/10' 
            : uploadStatus === 'success'
            ? 'border-green-400 bg-green-50/10'
            : 'border-slate-300 dark:border-slate-700 hover:border-teal-500 hover:bg-teal-500/5'
        }`}
      >
        <div className={`p-4 rounded-2xl transition-colors duration-300 ${
          uploadStatus === 'success' ? 'bg-green-100 text-green-600' : 'bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white'
        }`}>
          <Upload className={isUploading ? 'animate-bounce' : ''} size={32} />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {isUploading ? 'Uploading...' : uploadStatus === 'success' ? 'Upload Complete!' : 'Upload PDF'}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {isUploading ? 'Please wait while we process your file' : 'Click to browse or drag and drop'}
          </p>
        </div>

        {uploadStatus === 'success' && (
          <div className="absolute top-4 right-4 text-green-500 animate-in zoom-in duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
        )}
      </div>
      
      {uploadStatus === 'error' && (
        <p className="text-red-500 text-center text-sm mt-3 animate-in fade-in">
          Failed to upload. Please try again.
        </p>
      )}
    </div>
  );
};

export default FileUploadComponent;
