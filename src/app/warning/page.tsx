"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Zap, ArrowLeft, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WarningPage() {
    const router = useRouter();

    useEffect(() => {
        // Prevent right-click on warning page too
        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        window.addEventListener("contextmenu", handleContextMenu);
        return () => window.removeEventListener("contextmenu", handleContextMenu);
    }, []);

    const handleBackToSafety = () => {
        router.push("/#hero");
    };

    return (
        <div className="fixed inset-0 bg-[#050505] flex items-center justify-center overflow-hidden z-[9999]">
            {/* Glitch Background Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 animate-pulse delay-75" />
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500/30 animate-pulse delay-150" />
                <div className="absolute top-0 right-0 w-1 h-full bg-red-600/30 animate-pulse delay-200" />

                {/* Random Grid Lines */}
                <div className="w-full h-full border-[0.5px] border-white/5 grid grid-cols-12 grid-rows-12">
                    {[...Array(144)].map((_, i) => (
                        <div key={i} className="border-[0.5px] border-white/5" />
                    ))}
                </div>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 max-w-2xl w-full px-10 text-center space-y-10"
            >
                {/* Central Icon */}
                <div className="flex justify-center">
                    <motion.div
                        animate={{
                            textShadow: [
                                "0 0 10px rgba(255,0,0,0.5)",
                                "0 0 20px rgba(255,0,0,0.8)",
                                "0 0 10px rgba(255,0,0,0.5)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-8 glass-dark border border-red-500/20 rounded-[3rem] relative group"
                    >
                        <ShieldAlert size={80} className="text-red-500 group-hover:scale-110 transition-transform duration-500" />
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
                            className="absolute inset-0 border-2 border-red-400/50 rounded-[3rem]"
                        />
                    </motion.div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter italic">
                        Access <span className="text-red-600">Restricted</span>
                    </h1>
                    <p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.5em]">Unauthorized Matrix Modification Detected</p>
                </div>

                <p className="text-slate-400 text-sm font-medium max-w-md mx-auto leading-relaxed border-l-2 border-red-600/30 pl-6 text-left italic">
                    The system has detected an attempt to access restricted development protocols.
                    <span className="block mt-2 text-red-500/70 font-bold uppercase text-[10px]">Security Lock Mechanism: ACTIVE</span>
                    <span className="block text-slate-500 font-bold uppercase text-[10px]">IP Tracing: INITIALIZED</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBackToSafety}
                        className="group relative px-10 py-5 bg-red-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-[0_20px_40px_rgba(220,38,38,0.2)] hover:bg-red-500 transition-all flex items-center gap-4 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <Lock size={16} />
                        BACK TO SAFE AREA
                    </motion.button>
                </div>

                {/* Footer Telemetry */}
                <div className="pt-20 flex items-center justify-center gap-10 opacity-30">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest italic">MATRIX PROTECTED</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-600">
                        <Zap size={12} />
                        <span className="text-[8px] font-black uppercase tracking-widest italic">THREAT LEVEL: HIGH</span>
                    </div>
                </div>
            </motion.div>

            {/* Background Grain/Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        </div>
    );
}
