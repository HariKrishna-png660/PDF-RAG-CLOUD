import FileUploadComponent from '../components/file-upload';
import ChatComponent from '../components/chat';

export default function Dashboard() {
  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar: File Upload */}
      <aside className="w-full md:w-[350px] lg:w-[400px] border-b md:border-b-0 md:border-r bg-white dark:bg-slate-900/50 backdrop-blur-sm p-8 flex flex-col justify-center shadow-xl z-20">
        <div className="max-w-xs mx-auto w-full">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">My Library</h2>
            <p className="text-sm text-slate-500">Upload your PDF documents to start a conversation with the AI.</p>
          </div>
          <FileUploadComponent />
          
          <div className="mt-12 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-2xl border border-teal-100 dark:border-teal-900/40">
            <h4 className="text-sm font-semibold text-teal-800 dark:text-teal-400 mb-1">Pro Tip</h4>
            <p className="text-xs text-teal-700/80 dark:text-teal-400/70 leading-relaxed">
              You can ask questions like &quot;What are the key takeaways?&quot; or &quot;Summarize the third chapter&quot; once the file is processed.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content: Chat */}
      <section className="flex-1 flex flex-col relative overflow-hidden bg-white dark:bg-slate-950">
        <ChatComponent />
      </section>
    </div>
  );
}
