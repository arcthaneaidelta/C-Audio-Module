"use client";

import { Mic2, Globe, Share2, Users } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-20 px-8 border-t border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Mic2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Aura</span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            The next generation of AI-powered sales intelligence. Built for elite teams that demand performance.
          </p>
          <div className="flex gap-4">
            <Globe className="w-5 h-5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
            <Share2 className="w-5 h-5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
            <Users className="w-5 h-5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-slate-900">Product</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link href="#" className="hover:text-slate-900 transition-colors">Features</Link></li>
            <li><Link href="#" className="hover:text-slate-900 transition-colors">Integrations</Link></li>
            <li><Link href="#" className="hover:text-slate-900 transition-colors">Enterprise</Link></li>
            <li><Link href="#" className="hover:text-slate-900 transition-colors">Pricing</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-slate-900">Company</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link href="#" className="hover:text-slate-900 transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-slate-900 transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-slate-900 transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-slate-900 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-slate-900">Legal</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-slate-900 transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-slate-900 transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-50 flex flex-col md:row justify-between items-center gap-4">
        <p className="text-xs text-slate-400">
          © 2026 Aura AI Inc. All rights reserved.
        </p>
        <p className="text-xs text-slate-400">
          Designed for excellence.
        </p>
      </div>
    </footer>
  );
}
