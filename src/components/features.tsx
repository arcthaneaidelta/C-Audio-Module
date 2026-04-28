"use client";

import { motion } from "framer-motion";
import { Mic2, MessageSquare, LineChart, ShieldCheck, Zap, Laptop } from "lucide-react";

const features = [
  {
    icon: Mic2,
    title: "Dual Audio Capture",
    description: "Capture both local microphone and system audio with zero-latency synchronization.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Transcription",
    description: "Live speaker separation and high-fidelity text streaming powered by deep learning.",
    color: "text-teal-500",
    bg: "bg-teal-50",
  },
  {
    icon: LineChart,
    title: "AI Coaching & Insights",
    description: "Receive instant feedback on tone, objection handling, and buying signals during calls.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: Zap,
    title: "High Performance Engine",
    description: "Built on C++ for minimal CPU usage and sub-100ms processing latency.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Laptop,
    title: "Cross-Platform Electron",
    description: "Seamless integration with Zoom, Microsoft Teams, and Google Meet via desktop app.",
    color: "text-slate-500",
    bg: "bg-slate-50",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description: "SOC2 Type II compliant with end-to-end encryption for all audio data.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">
            Engineered for Sales Excellence.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Everything you need to turn every call into a masterclass, 
            powered by state-of-the-art audio processing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
