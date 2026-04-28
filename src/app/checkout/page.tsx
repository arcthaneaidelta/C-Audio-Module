"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { Check, Shield, Zap, Star, CreditCard, Lock, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

const plans = [
  {
    name: "Starter",
    price: "$29",
    desc: "Perfect for individual sales reps.",
    features: ["50 hours recording / mo", "Real-time AI coaching", "Live transcription", "Basic analytics"],
    color: "bg-slate-50",
    border: "border-slate-200"
  },
  {
    name: "Pro",
    price: "$99",
    desc: "For high-performance sales teams.",
    features: ["Unlimited recording", "Advanced sentiment analysis", "CRM Integrations", "Priority C++ Engine", "Custom AI prompts"],
    color: "bg-slate-900",
    border: "border-slate-900",
    text: "text-white",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For large-scale organizations.",
    features: ["On-premise deployment", "SAML SSO / SCIM", "Dedicated account manager", "Custom API access", "White-label options"],
    color: "bg-white",
    border: "border-slate-200"
  }
];

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0f172a', '#3b82f6', '#0d9488']
      });
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-sm font-bold text-slate-900">Subscription & Billing</h1>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div 
                key="checkout"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-12"
              >
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-slate-900">Choose your plan</h2>
                  <p className="text-slate-500">Scale your sales engine with elite AI capabilities.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {plans.map((plan) => (
                    <motion.div
                      key={plan.name}
                      whileHover={{ y: -8 }}
                      className={cn(
                        "p-8 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col h-full",
                        plan.border,
                        plan.color,
                        selectedPlan === plan.name ? "ring-4 ring-slate-900/10" : ""
                      )}
                      onClick={() => setSelectedPlan(plan.name)}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent-teal text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                          Most Popular
                        </div>
                      )}
                      
                      <div className="mb-8">
                        <h3 className={cn("text-xl font-bold mb-2", plan.text)}>{plan.name}</h3>
                        <div className="flex items-baseline gap-1">
                          <span className={cn("text-4xl font-bold", plan.text)}>{plan.price}</span>
                          {plan.price !== "Custom" && <span className={cn("text-sm opacity-60", plan.text)}>/mo</span>}
                        </div>
                        <p className={cn("text-sm mt-4 leading-relaxed opacity-70", plan.text)}>{plan.desc}</p>
                      </div>

                      <ul className="space-y-4 mb-12 flex-1">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3">
                            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0", plan.name === "Pro" ? "bg-white/10" : "bg-slate-100")}>
                              <Check className={cn("w-3 h-3", plan.name === "Pro" ? "text-white" : "text-slate-900")} />
                            </div>
                            <span className={cn("text-sm opacity-80", plan.text)}>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button 
                        variant={plan.name === "Pro" ? "secondary" : "primary"}
                        className="w-full py-6 text-base font-bold"
                      >
                        {selectedPlan === plan.name ? "Selected" : "Select Plan"}
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {/* Checkout Summary */}
                <div className="max-w-2xl mx-auto pt-12">
                   <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6 shadow-sm">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-900">Checkout Summary</h3>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                          <Lock className="w-3.5 h-3.5" /> Secure Transaction
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                           <span className="text-slate-500">Plan: {selectedPlan}</span>
                           <span className="text-slate-900 font-bold">{plans.find(p => p.name === selectedPlan)?.price}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-slate-500">Billing frequency</span>
                           <span className="text-slate-900 font-bold">Monthly</span>
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                           <span className="text-base font-bold text-slate-900">Total today</span>
                           <span className="text-2xl font-bold text-slate-900">{plans.find(p => p.name === selectedPlan)?.price}</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full py-8 text-lg font-bold gap-3"
                        onClick={handleSubscribe}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            Confirm Subscription <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </Button>

                      <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
                        14-day money back guarantee • No hidden fees
                      </p>
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-8 h-full"
              >
                <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center relative">
                   <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                     className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20"
                   >
                     <Check className="w-8 h-8 text-white" />
                   </motion.div>
                   <motion.div 
                     animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="absolute inset-0 rounded-full border-2 border-emerald-500"
                   />
                </div>

                <div className="space-y-3">
                  <h2 className="text-4xl font-bold text-slate-900">Welcome to Aura Pro!</h2>
                  <p className="text-lg text-slate-500">Your high-performance sales engine is now fully active.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg w-full pt-8">
                   <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3 flex flex-col items-center">
                      <Zap className="w-6 h-6 text-amber-500" />
                      <h4 className="text-sm font-bold text-slate-900">Priority Engine</h4>
                      <p className="text-xs text-slate-500">C++ cores dedicated to your calls.</p>
                   </div>
                   <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3 flex flex-col items-center">
                      <Star className="w-6 h-6 text-accent-blue" />
                      <h4 className="text-sm font-bold text-slate-900">Premium Support</h4>
                      <p className="text-xs text-slate-500">24/7 dedicated account manager.</p>
                   </div>
                </div>

                <div className="pt-8">
                   <Button size="lg" className="px-12" onClick={() => window.location.href = '/dashboard'}>
                     Launch Dashboard
                   </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
