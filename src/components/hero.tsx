"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Play, Shield, Zap, Cpu } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-8 flex flex-col items-center text-center overflow-hidden grid-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 mb-4">
          <span className="flex h-2 w-2 rounded-full bg-accent-teal" />
          Powered by C++ Audio Engine
        </div>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900">
          The Real-Time <br />
          <span className="text-slate-500">AI Sales Coach.</span>
        </h1>

        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Aura monitors your calls in real-time, providing instant coaching, 
          sentiment analysis, and live transcriptions using our proprietary 
          low-latency audio engine.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Start Free Demo <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
            <Play className="w-4 h-4 fill-current" /> Watch Preview
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-20 relative w-full max-w-5xl aspect-[16/9] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden shadow-slate-200/50"
      >
        <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
           {/* Mock Dashboard Preview */}
           <div className="w-full h-full p-8 flex gap-6">
              <div className="w-1/3 space-y-6">
                <div className="h-32 bg-white rounded-xl border border-slate-100 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="h-2 w-16 bg-slate-100 rounded" />
                    <div className="h-2 w-8 bg-accent-blue/20 rounded" />
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {[40, 70, 45, 90, 65, 30, 80, 55, 20, 60].map((height, i) => (
                      <div key={i} className="flex-1 bg-slate-100 rounded-t-sm" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
                <div className="h-64 bg-white rounded-xl border border-slate-100 p-4 space-y-4">
                   <div className="h-3 w-32 bg-slate-100 rounded" />
                   <div className="space-y-2">
                      <div className="h-2 w-full bg-slate-50 rounded" />
                      <div className="h-2 w-3/4 bg-slate-50 rounded" />
                      <div className="h-2 w-1/2 bg-slate-50 rounded" />
                   </div>
                   <div className="h-32 w-full bg-slate-50 rounded-lg flex items-center justify-center text-xs text-slate-300">
                     AI Insights Loading...
                   </div>
                </div>
              </div>
              <div className="flex-1 bg-white rounded-xl border border-slate-100 p-6 flex flex-col gap-6">
                <div className="h-4 w-48 bg-slate-100 rounded" />
                <div className="flex-1 space-y-6">
                   <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-slate-100" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/4 bg-slate-100 rounded" />
                        <div className="h-3 w-full bg-slate-50 rounded" />
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-slate-900" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/4 bg-slate-900/10 rounded" />
                        <div className="h-3 w-3/4 bg-slate-900/5 rounded" />
                      </div>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent-purple/5 rounded-full blur-3xl" />
    </section>
  );
}
