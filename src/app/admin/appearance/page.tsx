"use client";

import React from "react";
import {
    Zap,
    Palette,
    Layout,
    Eye,
    EyeOff,
    RefreshCcw,
    Monitor,
    Type,
    Check,
    Shield,
    Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { useConfig } from "../../../components/ConfigContext";

export default function AppearancePage() {
    const { config, updateConfig, resetConfig } = useConfig();

    const colors = [
        { name: "Cyan", value: "#06b6d4" },
        { name: "Purple", value: "#a855f7" },
        { name: "Magenta", value: "#d946ef" },
        { name: "Emerald", value: "#10b981" },
        { name: "Amber", value: "#f59e0b" },
        { name: "Blue", value: "#3b82f6" },
        { name: "Red", value: "#ef4444" },
        { name: "White", value: "#ffffff" },
    ];

    const layoutSections = [
        { id: "showHero", label: "Hero Interface", icon: Monitor },
        { id: "showFeatures", label: "Tech Features", icon: Zap },
        { id: "showWhatsNew", label: "Sector Sitemap", icon: Layout },
        { id: "showFAQ", label: "Knowledge Base", icon: Type },
        { id: "maintenanceMode", label: "Maintenance Protocol", icon: Shield },
        { id: "adSenseActive", label: "Neural AdSense", icon: Activity },
    ];

    return (
        <div className="flex-1 h-full p-10 space-y-12 overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                        Appearance <span className="text-neon-magenta">HUD</span>
                    </h1>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Direct Aesthetic Manipulation</p>
                </div>
                <button
                    onClick={resetConfig}
                    className="flex items-center gap-3 px-8 py-4 glass border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all"
                >
                    <RefreshCcw size={16} /> Restore Defaults
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Color Matrix */}
                <div className="space-y-8">
                    <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3 px-4">
                        <Palette size={16} className="text-neon-cyan" /> Accent Modulation
                    </h3>
                    <div className="glass border border-white/10 rounded-[3rem] p-10 bg-white/5 space-y-10">
                        <div className="grid grid-cols-4 gap-4">
                            {colors.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => updateConfig({ accentColor: color.value })}
                                    className={`aspect-square rounded-2xl transition-all relative overflow-hidden group shadow-2xl ${config.accentColor === color.value
                                        ? "ring-4 ring-white/20 scale-105"
                                        : "hover:scale-105"
                                        }`}
                                    style={{ backgroundColor: color.value }}
                                >
                                    <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity" />
                                    {config.accentColor === color.value && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Check size={20} className={color.value === "#ffffff" ? "text-black" : "text-white"} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-6 pt-10 border-t border-white/5">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Universal Branding Node</label>
                                <div className="relative">
                                    <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                                    <input
                                        type="text"
                                        value={config.brandingText}
                                        onChange={(e) => updateConfig({ brandingText: e.target.value.toUpperCase() })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-neon-cyan/50 transition-all font-mono"
                                        placeholder="BRANDING TEXT"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Layout Architecture */}
                <div className="space-y-8">
                    <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3 px-4">
                        <Layout size={16} className="text-neon-purple" /> Sector Mapping
                    </h3>
                    <div className="glass border border-white/10 rounded-[3rem] p-10 bg-white/5 space-y-4">
                        {layoutSections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => updateConfig({ [section.id]: !config[section.id as keyof typeof config] })}
                                className={`w-full flex items-center justify-between p-6 rounded-3xl transition-all group ${config[section.id as keyof typeof config]
                                    ? "bg-white/10 border border-white/10"
                                    : "bg-black/20 border border-transparent opacity-40 hover:opacity-60"
                                    }`}
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`p-4 rounded-2xl transition-all ${config[section.id as keyof typeof config] ? "bg-neon-cyan/20 text-neon-cyan shadow-2xl" : "bg-white/5 text-slate-500"
                                        }`}>
                                        <section.icon size={22} />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-xs font-black text-white uppercase tracking-widest">{section.label}</h4>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">Global Visibility Node</p>
                                    </div>
                                </div>
                                <div className={`p-3 rounded-xl ${config[section.id as keyof typeof config] ? "text-neon-cyan" : "text-slate-700"
                                    }`}>
                                    {config[section.id as keyof typeof config] ? <Eye size={20} /> : <EyeOff size={20} />}
                                </div>
                            </button>
                        ))}

                        <div className="p-8 mt-6 bg-neon-purple/10 border border-neon-purple/20 rounded-3xl flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-neon-purple">
                                <Monitor size={24} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Live Transmission Preview</h4>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight leading-relaxed">Changes propagate to the consumer sector in real-time via neural pulse.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
