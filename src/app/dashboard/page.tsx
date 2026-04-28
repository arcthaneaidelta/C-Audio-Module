"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { AudioEngineControl } from "@/components/dashboard/audio-engine";
import { TranscriptionPanel } from "@/components/dashboard/transcription";
import { CoachingPanel } from "@/components/dashboard/coaching";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [isCapturing, setIsCapturing] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-bold text-slate-900">Live Call Session</h1>
            <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-emerald-50 text-[10px] font-bold text-emerald-600 uppercase tracking-wider border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Engine Online
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-xs text-slate-400 font-medium">
               Session ID: <span className="text-slate-600">AURA-9821-X</span>
             </div>
             <div className="h-4 w-px bg-slate-200" />
             <div className="text-xs text-slate-400 font-medium">
               Latency: <span className="text-accent-teal">12ms</span>
             </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden p-6 gap-6">
          <div className="flex-1 flex flex-col gap-6">
             <AudioEngineControl 
               isCapturing={isCapturing} 
               onToggle={() => setIsCapturing(!isCapturing)} 
             />
             <TranscriptionPanel isCapturing={isCapturing} />
          </div>
          
          <aside className="w-80 flex flex-col gap-6">
             <CoachingPanel isCapturing={isCapturing} />
          </aside>
        </div>
      </main>
    </div>
  );
}
