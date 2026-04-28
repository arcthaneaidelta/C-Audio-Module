"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { Mic, Speaker, Bell, Shield, User, Globe, Sliders, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("audio");

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-sm font-bold text-slate-900">Workspace Settings</h1>
        </header>

        <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
          <div className="flex gap-8 border-b border-slate-200">
             {["audio", "general", "privacy", "notifications"].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={cn(
                   "pb-4 text-xs font-bold uppercase tracking-widest transition-colors relative",
                   activeTab === tab ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                 )}
               >
                 {tab}
                 {activeTab === tab && (
                   <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
                 )}
               </button>
             ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">Audio Configuration</h3>
                <p className="text-xs text-slate-500">Configure your C++ Audio Engine parameters and device selection.</p>
             </div>

             <div className="md:col-span-2 space-y-6">
                {/* Device Selection */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                   <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Input Device (Microphone)</label>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:border-slate-300 transition-colors">
                           <div className="flex items-center gap-3">
                              <Mic className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium text-slate-900">Sony WH-1000XM4 (Bluetooth)</span>
                           </div>
                           <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Output Device (System)</label>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:border-slate-300 transition-colors">
                           <div className="flex items-center gap-3">
                              <Speaker className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium text-slate-900">System Default (WASAPI)</span>
                           </div>
                           <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                   </div>

                   <div className="space-y-6 pt-4 border-t border-slate-50">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                           <label className="text-[10px] font-bold text-slate-500 uppercase">Input Gain</label>
                           <span className="text-[10px] font-mono text-slate-900">+12dB</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full relative">
                           <div className="absolute left-0 top-0 bottom-0 bg-slate-900 rounded-full w-2/3" />
                           <div className="absolute left-2/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-900 rounded-full shadow-sm cursor-pointer" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                           <label className="text-[10px] font-bold text-slate-500 uppercase">Noise Suppression</label>
                           <span className="text-[10px] font-mono text-slate-900">Ultra</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full relative">
                           <div className="absolute left-0 top-0 bottom-0 bg-accent-teal rounded-full w-4/5" />
                           <div className="absolute left-4/5 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-accent-teal rounded-full shadow-sm cursor-pointer" />
                        </div>
                      </div>
                   </div>
                </div>

                {/* Toggles */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                   {[
                     { label: "High Fidelity Mode", desc: "Enable 48kHz / 24-bit audio capture", icon: Globe },
                     { label: "Hardware Acceleration", desc: "Use GPU for AI inference tasks", icon: Sliders },
                     { label: "Background Processing", desc: "Keep engine running when app is minimized", icon: Shield },
                   ].map((item, i) => (
                     <div key={item.label} className="flex items-center justify-between p-2">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                              <item.icon className="w-5 h-5 text-slate-400" />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-slate-900">{item.label}</p>
                              <p className="text-xs text-slate-500">{item.desc}</p>
                           </div>
                        </div>
                        <div className="w-10 h-5 bg-slate-900 rounded-full relative p-1 cursor-pointer">
                           <div className="w-3 h-3 bg-white rounded-full absolute right-1" />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="flex justify-end pt-8 gap-4">
             <Button variant="ghost">Reset Defaults</Button>
             <Button>Save Configuration</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
