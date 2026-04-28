"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Headphones, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_CONVERSATION = [
  { speaker: "agent", text: "Hello, this is David from Aura. How are you doing today?" },
  { speaker: "prospect", text: "Hi David, I'm doing well. I was just looking at your website." },
  { speaker: "agent", text: "That's great to hear! Was there anything specifically that caught your eye?" },
  { speaker: "prospect", text: "Actually, I'm curious about the real-time coaching part. How fast is the feedback?" },
  { speaker: "agent", text: "Excellent question. Since we use a C++ backend, the latency is under 100ms. It's essentially instant." },
  { speaker: "prospect", text: "That sounds impressive. We currently have issues with lag on our current platform." },
  { speaker: "agent", text: "I understand. Reliability is key in high-stakes sales. Let me show you how we handle that." }
];

export function TranscriptionPanel({ isCapturing }: { isCapturing: boolean }) {
  const [messages, setMessages] = useState<{ speaker: string, text: string, time: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCapturing) {
      setMessages([]);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < MOCK_CONVERSATION.length) {
        setMessages(prev => [...prev, { 
          ...MOCK_CONVERSATION[currentIndex], 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
        }]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isCapturing]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex-1 bg-white rounded-2xl border border-slate-200 flex flex-col overflow-hidden"
    >
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Live Transcription</span>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
              <span className="text-[10px] font-bold text-slate-600">Agent</span>
           </div>
           <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent-blue" />
              <span className="text-[10px] font-bold text-slate-600">Prospect</span>
           </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.length === 0 && !isCapturing && (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-4">
               <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center">
                 <Headphones className="w-6 h-6" />
               </div>
               <p className="text-sm font-medium">Waiting for session to start...</p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.speaker === "agent" ? "" : "ml-auto flex-row-reverse"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border",
                msg.speaker === "agent" ? "bg-slate-900 border-slate-900" : "bg-white border-slate-200"
              )}>
                {msg.speaker === "agent" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Headphones className="w-4 h-4 text-accent-blue" />
                )}
              </div>
              <div className="space-y-1.5">
                <div className={cn(
                  "flex items-center gap-2",
                  msg.speaker === "agent" ? "" : "flex-row-reverse"
                )}>
                  <span className="text-[10px] font-bold text-slate-900 uppercase">
                    {msg.speaker === "agent" ? "You" : "Prospect"}
                  </span>
                  <span className="text-[10px] text-slate-400">{msg.time}</span>
                </div>
                <div className={cn(
                  "p-3 rounded-2xl text-sm leading-relaxed",
                  msg.speaker === "agent" 
                    ? "bg-slate-100 text-slate-900 rounded-tl-none" 
                    : "bg-accent-blue/5 text-slate-900 border border-accent-blue/10 rounded-tr-none"
                )}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isCapturing && (
        <div className="p-3 border-t border-slate-100 flex items-center gap-2">
           <div className="flex gap-1">
             {[0,1,2].map(i => (
               <motion.div 
                 key={i}
                 animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                 transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                 className="w-1 h-1 rounded-full bg-slate-400"
               />
             ))}
           </div>
           <span className="text-[10px] font-medium text-slate-400 italic">Processing audio...</span>
        </div>
      )}
    </motion.div>
  );
}
