"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const messages = [
  "Initializing Audio Engine...",
  "Syncing Input Streams...",
  "Preparing AI Analysis...",
  "Calibrating Microphone...",
  "Ready."
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev < messages.length - 1) return prev + 1;
        clearInterval(messageInterval);
        return prev;
      });
    }, 1200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 0.5;
        clearInterval(progressInterval);
        return 100;
      });
    }, 30);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(onComplete, 800);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    >
      <div className="w-full max-w-md px-8 space-y-8">
        <div className="flex justify-center mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
             {/* Abstract Audio Waveform Icon */}
            <div className="flex items-center gap-1.5 h-12">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: [12, 48, 24, 40, 16][i],
                    opacity: [0.3, 1, 0.5, 0.8, 0.4]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    delay: i * 0.1 
                  }}
                  className="w-1.5 rounded-full bg-slate-900"
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <AnimatePresence mode="wait">
              <motion.p
                key={messages[index]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm font-medium text-slate-500 font-sans"
              >
                {messages[index]}
              </motion.p>
            </AnimatePresence>
            <span className="text-xs font-mono text-slate-400">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-slate-900"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
           <motion.div 
             animate={{ opacity: [0.2, 0.5, 0.2] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium"
           >
             System Status: Nominal
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
