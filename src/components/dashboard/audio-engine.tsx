"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Speaker, Play, Square, Settings2, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function AudioEngineControl({ isCapturing, onToggle }: { isCapturing: boolean, onToggle: () => void }) {
  const [micLevel, setMicLevel] = useState<number[]>(Array(40).fill(10));
  const [sysLevel, setSysLevel] = useState<number[]>(Array(40).fill(10));
  const [isReinitializing, setIsReinitializing] = useState(false);

  useEffect(() => {
    if (!isCapturing) return;

    const interval = setInterval(() => {
      setMicLevel(prev => [...prev.slice(1), 10 + Math.random() * 60]);
      setSysLevel(prev => [...prev.slice(1), 10 + Math.random() * 40]);
    }, 80);

    return () => clearInterval(interval);
  }, [isCapturing]);

  const handleDeviceSwitch = () => {
    setIsReinitializing(true);
    setTimeout(() => setIsReinitializing(false), 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 relative overflow-hidden"
    >
      <AnimatePresence>
        {isReinitializing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-4"
          >
            <RefreshCcw className="w-8 h-8 text-slate-900 animate-spin" />
            <p className="text-sm font-bold text-slate-900">Reinitializing Audio Engine...</p>
            <p className="text-xs text-slate-500">Connecting to WASAPI Backend</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-900">Audio Stream Control</h3>
          <p className="text-xs text-slate-500">C++ Core v2.4.1 (Stable)</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDeviceSwitch}
            className="gap-2 text-[10px] uppercase tracking-wider font-bold"
          >
            <Settings2 className="w-3.5 h-3.5" /> Configure
          </Button>
          <Button 
            variant={isCapturing ? "secondary" : "primary"} 
            size="sm" 
            onClick={onToggle}
            className="gap-2 w-32"
          >
            {isCapturing ? (
              <><Square className="w-3.5 h-3.5 fill-current" /> Stop Capture</>
            ) : (
              <><Play className="w-3.5 h-3.5 fill-current" /> Start Session</>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Agent Mic */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center">
                <Mic className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <span className="text-xs font-bold text-slate-700">Microphone (Agent)</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">INPUT_01</span>
          </div>
          <div className="h-16 bg-slate-50 rounded-xl border border-slate-100 flex items-center px-4 gap-1 overflow-hidden">
            {micLevel.map((level, i) => (
              <motion.div
                key={i}
                animate={{ height: isCapturing ? `${level}%` : "10%" }}
                className={cn(
                  "flex-1 rounded-full transition-colors",
                  isCapturing ? "bg-slate-900" : "bg-slate-200"
                )}
              />
            ))}
          </div>
        </div>

        {/* System Audio */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center">
                <Speaker className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <span className="text-xs font-bold text-slate-700">System Audio (Prospect)</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">OUTPUT_01</span>
          </div>
          <div className="h-16 bg-slate-50 rounded-xl border border-slate-100 flex items-center px-4 gap-1 overflow-hidden">
            {sysLevel.map((level, i) => (
              <motion.div
                key={i}
                animate={{ height: isCapturing ? `${level}%` : "10%" }}
                className={cn(
                  "flex-1 rounded-full transition-colors",
                  isCapturing ? "bg-accent-blue" : "bg-slate-200"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
