"use client";

import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { BarChart3, LineChart, PieChart, TrendingUp, Users, Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Avg. Talk Ratio", value: "48%", change: "+5%", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Call Sentiment", value: "Positive", change: "+12%", icon: Target, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Avg. Duration", value: "24m 12s", change: "-2m", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
  { label: "Closing Rate", value: "32%", change: "+3%", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-50" },
];

export default function Analytics() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-sm font-bold text-slate-900">Performance Analytics</h1>
          <div className="flex gap-2">
             <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">Last 7 Days</button>
             <button className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-slate-100 rounded-md">Last 30 Days</button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg)}>
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-full",
                    stat.change.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  )}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Talk Ratio Graph Simulation */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.4 }}
               className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6"
             >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Talk Ratio Timeline</h3>
                    <p className="text-xs text-slate-400">Agent vs. Prospect talk time distribution</p>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-900" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase">Agent</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-accent-blue" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase">Prospect</span>
                     </div>
                  </div>
                </div>

                <div className="h-64 flex items-end gap-2 pt-4">
                   {[40, 55, 30, 45, 60, 35, 50, 42, 58, 45, 52, 48].map((val, i) => (
                     <div key={i} className="flex-1 flex flex-col gap-1 h-full justify-end">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${val}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                          className="w-full bg-slate-900 rounded-t-sm opacity-20 hover:opacity-100 transition-opacity"
                        />
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${100 - val}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                          className="w-full bg-accent-blue rounded-t-sm opacity-20 hover:opacity-100 transition-opacity"
                        />
                     </div>
                   ))}
                </div>
                <div className="flex justify-between px-2">
                   {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                     <span key={day} className="text-[10px] font-bold text-slate-400 uppercase">{day}</span>
                   ))}
                </div>
             </motion.div>

             {/* Top Keywords */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.5 }}
               className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6"
             >
                <h3 className="text-sm font-bold text-slate-900">Sentiment Heatmap</h3>
                <div className="space-y-4">
                   {[
                     { label: "Pricing / Cost", value: 85, color: "bg-emerald-500" },
                     { label: "Implementation", value: 64, color: "bg-blue-500" },
                     { label: "Security / SOC2", value: 42, color: "bg-purple-500" },
                     { label: "Integration", value: 28, color: "bg-amber-500" },
                     { label: "Competitor X", value: 12, color: "bg-red-500" },
                   ].map((item, i) => (
                     <div key={item.label} className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                           <span className="text-slate-600">{item.label}</span>
                           <span className="text-slate-900">{item.value}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${item.value}%` }}
                             transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                             className={cn("h-full rounded-full", item.color)}
                           />
                        </div>
                     </div>
                   ))}
                </div>
                <div className="pt-4 border-t border-slate-50">
                   <p className="text-xs text-slate-500 leading-relaxed italic">
                     "Sentiment regarding pricing has increased by 15% following the new ROI breakdown."
                   </p>
                </div>
             </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
