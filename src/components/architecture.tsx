"use client";

import { motion } from "framer-motion";
import { Cpu, Layers, HardDrive, Share2 } from "lucide-react";

export function Architecture() {
  return (
    <section id="architecture" className="py-24 px-8 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              Low-Latency <br />
              <span className="text-slate-500">System Architecture.</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Our unique hybrid architecture combines the flexibility of Electron 
              with the raw power of a C++ core. This allows us to process multi-channel 
              audio streams with virtually zero overhead.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-slate-200">
                <Cpu className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">C++ Audio Engine</h4>
                <p className="text-sm text-slate-500">Direct integration with CoreAudio and WASAPI for raw stream access.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-slate-200">
                <Layers className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Electron Bridge</h4>
                <p className="text-sm text-slate-500">High-speed N-API bindings for seamless communication between layers.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-slate-200">
                <HardDrive className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Local Neural Inference</h4>
                <p className="text-sm text-slate-500">On-device AI processing for privacy and maximum response speed.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 relative w-full max-w-lg aspect-square">
           <motion.div 
             initial={{ rotate: 0 }}
             animate={{ rotate: 360 }}
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 rounded-full border border-slate-200 border-dashed"
           />
           <div className="absolute inset-4 rounded-full border border-slate-200" />
           
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <motion.div 
                   animate={{ scale: [1, 1.1, 1] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="w-24 h-24 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl z-10 relative"
                >
                  <Cpu className="w-10 h-10 text-white" />
                </motion.div>
                
                {/* Orbiting Elements */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center"
                    initial={{ x: 0, y: 0 }}
                    animate={{ 
                      x: Math.cos(i * (2 * Math.PI / 3)) * 140 - 24,
                      y: Math.sin(i * (2 * Math.PI / 3)) * 140 - 24
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {i === 0 && <Share2 className="w-5 h-5 text-slate-400" />}
                    {i === 1 && <HardDrive className="w-5 h-5 text-slate-400" />}
                    {i === 2 && <Layers className="w-5 h-5 text-slate-400" />}
                  </motion.div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
