"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";

const programs = [
    { time: "17:00", title: "PL: Liverpool vs Man City", channel: "Sky Sports", duration: "120 min", 进度: 75 },
    { time: "18:30", title: "Sports Center: Nightly", channel: "ESPN", duration: "60 min", 进度: 0 },
    { time: "19:00", title: "The Dark Knight", channel: "HBO Max", duration: "150 min", 进度: 0 },
    { time: "20:00", title: "Evening News", channel: "CNN", duration: "30 min", 进度: 0 },
    { time: "21:00", title: "Planet Earth III", channel: "Nat Geo", duration: "60 min", 进度: 0 },
];

export default function ProgramGuide() {
    return (
        <div className="glass rounded-2xl lg:rounded-[2.5rem] p-5 lg:p-8 border border-white/5 space-y-6 lg:space-y-8">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 lg:gap-4">
                    <div className="p-2 lg:p-3 bg-neon-cyan/10 rounded-xl lg:rounded-2xl border border-neon-cyan/20 text-neon-cyan flex-shrink-0">
                        <Calendar size={18} className="lg:w-5 lg:h-5" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-sm lg:text-xl font-black text-white tracking-widest uppercase mb-0.5 truncate">Program Guide</h3>
                        <p className="text-slate-600 text-[7px] lg:text-[9px] font-bold tracking-[0.2em] uppercase truncate">Daily Schedule</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-slate-600 text-[8px] lg:text-[10px] font-black uppercase tracking-widest flex-shrink-0">
                    <Clock size={12} className="lg:w-3.5 lg:h-3.5" />
                    <span>FEB 18</span>
                </div>
            </div>

            <div className="space-y-3 lg:space-y-4">
                {programs.map((prog, i) => (
                    <div
                        key={i}
                        className={`group relative p-4 lg:p-5 rounded-2xl lg:rounded-3xl transition-all duration-500 border premium-shimmer overflow-hidden ${prog.进度 > 0
                            ? "bg-white/5 border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.05)]"
                            : "bg-transparent border-white/5 hover:border-white/10"
                            }`}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 lg:gap-5 min-w-0">
                                <div className={`text-[9px] lg:text-[11px] font-black w-10 lg:w-14 text-center tracking-widest flex-shrink-0 ${prog.进度 > 0 ? "text-neon-cyan" : "text-slate-700"}`}>
                                    {prog.time}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-[10px] lg:text-sm text-white font-black truncate group-hover:text-neon-cyan transition-colors uppercase tracking-wide">
                                        {prog.title}
                                    </h4>
                                    <p className="text-[7px] lg:text-[10px] text-slate-600 font-bold uppercase tracking-[0.15em] mt-1 lg:mt-1.5 truncate">
                                        {prog.channel} • {prog.duration}
                                    </p>
                                </div>
                            </div>

                            {prog.进度 > 0 && (
                                <div className="flex items-center gap-1.5 px-2 py-1 lg:px-3 lg:py-1.5 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full flex-shrink-0">
                                    <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                                    <span className="text-[7px] lg:text-[9px] font-black text-neon-cyan uppercase tracking-widest hidden lg:inline">Watching Now</span>
                                </div>
                            )}
                        </div>

                        {prog.进度 > 0 && (
                            <div className="mt-3 lg:mt-5 h-[1px] lg:h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${prog.进度}%` }}
                                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button className="w-full py-3 lg:py-4 text-slate-600 text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em] hover:text-white hover:bg-white/5 rounded-xl lg:rounded-2xl transition-all">
                Full Neural Schedule
            </button>
        </div>
    );
}
