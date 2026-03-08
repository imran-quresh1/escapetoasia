import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-[85%] rounded-2xl px-4 py-2.5",
        isUser ? "bg-[#0F4C5C] text-white" : "bg-white text-[#5C4033] shadow-sm"
      )}>
        {message.content ? (
          isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : (
            <ReactMarkdown 
              className="text-sm prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              components={{
                p: ({ children }) => <p className="my-1 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="my-1 ml-4 list-disc">{children}</ul>,
                ol: ({ children }) => <ol className="my-1 ml-4 list-decimal">{children}</ol>,
                li: ({ children }) => <li className="my-0.5">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-[#0F4C5C]">{children}</strong>,
                a: ({ children, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" className="text-[#D4A574] hover:underline">
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )
        ) : (
          <div className="flex items-center gap-2 text-[#5C4033]/50">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span className="text-xs">Thinking...</span>
          </div>
        )}
      </div>
    </div>
  );
}