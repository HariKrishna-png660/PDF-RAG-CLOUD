'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as React from 'react';

interface Doc {
  pageContent?: string;
  metdata?: {
    loc?: {
      pageNumber?: number;
    };
    source?: string;
  };
}
interface IMessage {
  role: 'assistant' | 'user';
  content?: string;
  documents?: Doc[];
}

const ChatComponent: React.FC = () => {
  const [message, setMessage] = React.useState<string>('');
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendChatMessage = async () => {
    const userMsg = message.trim();
    if (!userMsg) return;
    
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      console.log(`Sending message to: ${apiUrl}/chat?message=${userMsg}`);
      
      const res = await fetch(`${apiUrl}/chat?message=${userMsg}`);
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Chat request failed with status ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data?.message,
          documents: data?.docs,
        },
      ]);
    } catch (err) {
      console.error('Chat error details:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please check your connection and try again.',
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] bg-slate-50 dark:bg-slate-950">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <p className="text-lg">No messages yet. Start a conversation!</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-teal-600 text-white rounded-br-none' 
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-bl-none'
            }`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.documents && msg.documents.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                  <p className="font-semibold mb-1 uppercase tracking-wider">Sources:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {msg.documents.map((doc, i) => (
                      <li key={i}>Page {doc.metdata?.loc?.pageNumber || 'Unknown'}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t bg-white dark:bg-slate-900 shadow-lg">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything about your PDFs..."
            className="flex-1 h-12"
            onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
          />
          <Button 
            onClick={handleSendChatMessage} 
            disabled={!message.trim()}
            className="h-12 px-6 bg-teal-600 hover:bg-teal-700 text-white font-medium"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ChatComponent;
