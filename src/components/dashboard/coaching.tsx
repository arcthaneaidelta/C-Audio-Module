"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle2, BrainCircuit, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  { type: "tip", text: "Try asking an open-ended question about their current pain points.", icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-50" },
  { type: "intent", text: "Customer showing high buying intent. Discuss pricing tiers now.", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
  { type: "warning", text: "Prospect tone sounds hesitant. Emphasize reliability and support.", icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
  { type: "success", text: "Great rapport building! Keep this pacing for the rest of the call.", icon: CheckCircle2, color: "text-accent-blue", bg: "bg-accent-blue/10" },
];

export function CoachingPanel({ isCapturing }: { isCapturing: boolean }) {
  const [activeSuggestions, setActiveSuggestions] = useState<typeof SUGGESTIONS>([]);
  const [confidence, setConfidence] = useState(85);
  const [sentiment, setSentiment] = useState("Neutral");

  useEffect(() => {
    if (!isCapturing) {
      setActiveSuggestions([]);
      setConfidence(0);
      setSentiment("Inactive");
      return;
    }

    setConfidence(85);
    setSentiment("Positive");

    let index = 0;
    const interval = setInterval(() => {
      if (index < SUGGESTIONS.length) {
        setActiveSuggestions(prev => [SUGGESTIONS[index], ...prev].slice(0, 3));
        index++;
        setConfidence(prev => Math.min(98, prev + Math.random() * 5));
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isCapturing]);

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* AI Analysis Overview */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5"
      >
        <div className="flex items-center gap-2 mb-2">
          <BrainCircuit className="w-4 h-4 text-slate-900" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Aura Intelligence</h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Analysis Confidence</span>
              <span className="text-xs font-mono font-bold text-slate-900">{confidence}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-slate-900"
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">SENTIMENT</span>
                <span className={cn(
                  "text-xs font-bold",
                  sentiment === "Positive" ? "text-emerald-600" : "text-slate-400"
                )}>{sentiment}</span>
             </div>
             <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">TALK RATIO</span>
                <span className="text-xs font-bold text-slate-900">42 / 58</span>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Live Suggestions */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Live Suggestions</h3>
          </div>
          {isCapturing && (
            <span className="flex h-2 w-2 rounded-full bg-accent-teal animate-pulse" />
          )}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto">
          <AnimatePresence>
            {activeSuggestions.length === 0 && !isCapturing && (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-3 opacity-30">
                 <Lightbulb className="w-8 h-8 text-slate-300" />
                 <p className="text-xs font-medium text-slate-400">Suggestions will appear here during the call.</p>
              </div>
            )}
            
            {activeSuggestions.map((suggestion, i) => (
              <motion.div
                key={suggestion.text}
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "p-4 rounded-xl border flex gap-3 shadow-sm transition-all",
                  suggestion.bg,
                  "border-slate-100"
                )}
              >
                <div className={cn("w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm", suggestion.color)}>
                  <suggestion.icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                    {suggestion.type === "tip" ? "Suggestion" : suggestion.type}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {suggestion.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
         <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pro Tip</p>
         <p className="text-xs leading-relaxed text-slate-200">
           Mentioning "Integrations" now would increase closing probability by 24%.
         </p>
      </div>
    </div>
  );
}
