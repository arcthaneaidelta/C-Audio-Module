"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import { Mic2 } from "lucide-react";

export function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 premium-glass"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
          <Mic2 className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">Aura</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link href="#features" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Features</Link>
        <Link href="#architecture" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Architecture</Link>
        <Link href="/analytics" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Analytics</Link>
        <Link href="/settings" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Settings</Link>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">Log in</Button>
        <Link href="/dashboard">
          <Button size="sm">Launch Demo</Button>
        </Link>
      </div>
    </motion.nav>
  );
}
