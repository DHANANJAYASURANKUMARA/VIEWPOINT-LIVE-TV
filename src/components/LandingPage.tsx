"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tv, Zap, Globe, ShieldCheck, Play, ArrowRight, Activity, Layers } from "lucide-react";

interface LandingPageProps {
    onLaunch: () => void;
}

export default function LandingPage({ onLaunch }: LandingPageProps) {
    return (
        <div className="relative min-h-screen w-full bg-vpoint-dark overflow-hidden selection:bg-neon-cyan/30">
            {/* Background layers */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,211,238,0.1)_0%,_transparent_50%)]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/viewpoint_hero_bg.png')] bg-cover bg-center opacity-30 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-vpoint-dark/50 via-vpoint-dark to-vpoint-dark" />

                {/* Neural grid effect */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
            </div>

            <main className="relative z-10 container mx-auto px-6 pt-32 pb-20">
                {/* Hero section */}
                <div className="max-w-4xl mx-auto text-center space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                            </span>
                            <span className="text-[10px] font-black text-neon-cyan uppercase tracking-[0.3em]">Neural Interface v2.0.4 Live</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                            Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">Streaming</span>
                        </h1>

                        <p className="mt-8 text-slate-400 text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed uppercase tracking-widest opacity-80">
                            Experience the next evolution of live television. Ultra-low latency, global signal coverage, and a hyper-fluid neural interface.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6"
                    >
                        <button
                            onClick={onLaunch}
                            className="group relative px-10 py-5 bg-white text-vpoint-dark rounded-full font-black uppercase tracking-[0.2em] transition-all hover:bg-neon-cyan hover:shadow-[0_0_50px_rgba(34,211,238,0.4)] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Start Transmission <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </span>
                        </button>

                        <button className="px-10 py-5 glass border border-white/10 rounded-full text-white font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
                            View Network Stats
                        </button>
                    </motion.div>
                </div>

                {/* Features layer */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Zap className="text-neon-cyan" size={24} />,
                            title: "Zero Lag",
                            desc: "Advanced predictive buffering engine ensures liquid-smooth playback even on unstable networks."
                        },
                        {
                            icon: <Globe className="text-neon-purple" size={24} />,
                            title: "Global Signals",
                            desc: "Direct access to premium entertainment, sports, and news transmissions from across the pulse."
                        },
                        {
                            icon: <Layers className="text-emerald-500" size={24} />,
                            title: "Neural HUD",
                            desc: "Real-time technical telemetry and signal verification embedded directly into your view."
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="p-8 lg:p-10 glass border border-white/5 rounded-[2.5rem] space-y-6 hover:border-white/20 transition-all group"
                        >
                            <div className="p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-widest">{feature.title}</h3>
                            <p className="text-slate-500 text-[11px] font-bold leading-relaxed uppercase tracking-widest">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Layer */}
                <div className="mt-20 pt-20 border-t border-white/5 flex flex-wrap items-center justify-around gap-12 opacity-40">
                    <div className="text-center">
                        <div className="text-2xl font-black text-white">250+</div>
                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Signals</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-black text-neon-cyan">99.9%</div>
                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Uptime</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-black text-white">4K HDR</div>
                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Resolution</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-black text-neon-purple">GLOBAL</div>
                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Availability</div>
                    </div>
                </div>
            </main>

            {/* Floating neural elements */}
            <div className="absolute bottom-10 left-10 flex items-center gap-4 text-slate-500 opacity-20">
                <Activity size={16} />
                <span className="text-[8px] font-black uppercase tracking-[0.4em]">Signal Stable</span>
            </div>
        </div>
    );
}
