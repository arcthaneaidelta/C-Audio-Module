"use client";

import { motion } from "framer-motion";
import { Mic2, LayoutDashboard, LineChart, Settings, CreditCard, ChevronRight, LogOut, Headphones } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: LineChart, label: "Analytics", href: "/analytics" },
  { icon: CreditCard, label: "Billing", href: "/checkout" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Mic2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Aura</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                  isActive 
                    ? "bg-slate-100 text-slate-900" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-4 h-4", isActive ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600")} />
                  {item.label}
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-slate-400" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
           <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center">
                <Headphones className="w-4 h-4 text-accent-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">Sony WH-1000XM4</p>
                <p className="text-[10px] text-slate-500 truncate">Connected via C++ Engine</p>
              </div>
           </div>
           <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
             <div className="h-full bg-accent-teal w-full" />
           </div>
        </div>

        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors group">
          <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-500" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
