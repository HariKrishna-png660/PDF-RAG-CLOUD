import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-16 text-center">
        <div className="relative">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-teal-200/50 dark:bg-teal-900/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-200/50 dark:bg-indigo-900/20 rounded-full blur-3xl"></div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white mb-6 relative">
            PDFs, but <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">Smarter</span>.
          </h1>
        </div>

        <p className="max-w-2xl text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          Chat with any document in seconds. Powered by <b>Gemini AI</b> for lightning-fast answers, 
          deep summaries, and intelligent insights. 100% Private. 100% Free.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/dashboard" 
            className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            Get Started Free
          </Link>
          <button className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-bold rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            View Demo
          </button>
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Answers</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">No more scrolling through pages. Ask anything and get an answer instantly.</p>
          </div>
          <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Private & Secure</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Your documents are processed securely and never used for training models.</p>
          </div>
          <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center text-rose-600 dark:text-rose-400 mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-3v6m5 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Multiple Files</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Switch between documents effortlessly and keep your research organized.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-100 dark:border-slate-900 text-center">
        <p className="text-sm text-slate-500">© 2026 PDF-RAG AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
}
