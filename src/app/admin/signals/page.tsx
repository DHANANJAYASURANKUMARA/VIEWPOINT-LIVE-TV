"use client";

import React, { useState, useEffect } from "react";
import {
    Radio,
    Plus,
    Search,
    Edit2,
    Trash2,
    ShieldAlert,
    Link as LinkIcon,
    Calendar,
    ChevronRight,
    Play,
    Eye,
    EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Signal {
    id: string;
    name: string;
    url: string;
    category: string;
    status: "Live" | "Offline" | "Scheduled";
    masked: boolean;
    lastChecked: string;
}

export default function SignalControlPage() {
    const [signals, setSignals] = useState<Signal[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newSignal, setNewSignal] = useState({ name: "", url: "", category: "Entertainment" });

    useEffect(() => {
        // Load signals from a simulated state/localStorage
        const saved = localStorage.getItem("vpoint-signals");
        if (saved) {
            setSignals(JSON.parse(saved));
        } else {
            // Seed defaults if empty
            const defaults: Signal[] = [
                { id: "1", name: "ASIA TV", url: "https://stream.asiatvnet.com/1/live/master.m3u8", category: "Entertainment", status: "Live", masked: true, lastChecked: "2m ago" },
                { id: "2", name: "SKY SPORTS", url: "m3u8-placeholder", category: "Sports", status: "Live", masked: true, lastChecked: "5m ago" },
            ];
            setSignals(defaults);
        }
    }, []);

    const saveSignals = (updated: Signal[]) => {
        setSignals(updated);
        localStorage.setItem("vpoint-signals", JSON.stringify(updated));
    };

    const handleAddSignal = () => {
        const signal: Signal = {
            id: Date.now().toString(),
            name: newSignal.name.toUpperCase(),
            url: newSignal.url,
            category: newSignal.category,
            status: "Live",
            masked: true,
            lastChecked: "Just now"
        };
        saveSignals([...signals, signal]);
        setIsAddModalOpen(false);
        setNewSignal({ name: "", url: "", category: "Entertainment" });
    };

    const handleDeleteSignal = (id: string) => {
        saveSignals(signals.filter(s => s.id !== id));
    };

    const toggleMask = (id: string) => {
        saveSignals(signals.map(s => s.id === id ? { ...s, masked: !s.masked } : s));
    };

    return (
        <div className="flex-1 h-full p-10 space-y-10 overflow-y-auto custom-scrollbar relative">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                        Signal <span className="text-neon-purple">Control</span>
                    </h1>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Manage Global Transmission Matrix</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-white text-vpoint-dark rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-neon-purple hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all"
                >
                    <Plus size={16} /> Inject New Signal
                </button>
            </div>

            {/* Tactical Search */}
            <div className="relative group max-w-2xl">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-neon-purple transition-colors" size={18} />
                <input
                    type="text"
                    placeholder="SCANNING FOR SIGNALS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-16 pr-8 text-[11px] font-bold text-white uppercase tracking-[0.2em] placeholder:text-slate-700 focus:outline-none focus:border-neon-purple/50 transition-all"
                />
            </div>

            {/* Signal Grid */}
            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence>
                    {signals.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((signal) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            key={signal.id}
                            className="glass border border-white/10 rounded-[2.5rem] p-8 bg-white/5 flex flex-col lg:flex-row items-center justify-between gap-8 group hover:border-white/20 transition-all"
                        >
                            {/* Identity */}
                            <div className="flex items-center gap-6 w-full lg:w-auto">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${signal.status === "Live"
                                        ? "bg-neon-purple/10 border-neon-purple/30 text-neon-purple"
                                        : "bg-red-500/10 border-red-500/30 text-red-500"
                                    } shadow-2xl`}>
                                    <Radio size={24} className={signal.status === "Live" ? "animate-pulse" : ""} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-neon-purple transition-colors">{signal.name}</h3>
                                    <div className="flex items-center gap-4 mt-1">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{signal.category}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-800" />
                                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Stable Connection</span>
                                    </div>
                                </div>
                            </div>

                            {/* Signal Details */}
                            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
                                <div className="space-y-2">
                                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                                        <LinkIcon size={10} /> Stream Source
                                    </p>
                                    <p className="text-[10px] font-mono font-bold text-white truncate max-w-[200px] opacity-60">
                                        {signal.masked ? "••••••••••••••••••••••••••••" : signal.url}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                                        <Calendar size={10} /> Last Sync
                                    </p>
                                    <p className="text-[10px] font-bold text-white uppercase tracking-widest">{signal.lastChecked}</p>
                                </div>
                                <div className="space-y-2 hidden md:block">
                                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                                        <ShieldAlert size={10} /> Security Status
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">SRI Verified</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 w-full lg:w-auto border-t lg:border-t-0 border-white/5 pt-6 lg:pt-0">
                                <button
                                    onClick={() => toggleMask(signal.id)}
                                    className="p-4 rounded-xl glass-dark border border-white/10 text-slate-500 hover:text-white transition-all group/btn"
                                    title={signal.masked ? "Expose Link" : "Mask Link"}
                                >
                                    {signal.masked ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                <button className="p-4 rounded-xl glass-dark border border-white/10 text-slate-500 hover:text-white transition-all">
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDeleteSignal(signal.id)}
                                    className="p-4 rounded-xl glass-dark border border-white/10 text-red-500/50 hover:text-red-500 hover:border-red-500/30 transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Add Signal Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-2xl pointer-events-auto"
                        onClick={() => setIsAddModalOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="w-full max-w-xl glass border border-white/10 rounded-[3rem] p-10 relative z-10 pointer-events-auto bg-vpoint-dark"
                    >
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Inject <span className="text-neon-purple">Signal</span></h2>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Establish New Transmission Node</p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Signal Identity</label>
                                    <input
                                        type="text"
                                        placeholder="E.G. SKY SPORTS HD"
                                        value={newSignal.name}
                                        onChange={(e) => setNewSignal({ ...newSignal, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-xs font-bold text-white uppercase tracking-widest placeholder:text-slate-800 focus:outline-none focus:border-neon-purple/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Stream Source (M3U8)</label>
                                    <input
                                        type="text"
                                        placeholder="HTTPS://..."
                                        value={newSignal.url}
                                        onChange={(e) => setNewSignal({ ...newSignal, url: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-xs font-bold text-white tracking-widest placeholder:text-slate-800 focus:outline-none focus:border-neon-purple/50 transition-all font-mono"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Frequency Sector</label>
                                    <select
                                        value={newSignal.category}
                                        onChange={(e) => setNewSignal({ ...newSignal, category: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-neon-purple/50 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Entertainment" className="bg-vpoint-dark">Entertainment</option>
                                        <option value="Sports" className="bg-vpoint-dark">Sports</option>
                                        <option value="News" className="bg-vpoint-dark">News</option>
                                        <option value="Movies" className="bg-vpoint-dark">Movies</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-6 grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="py-5 glass-dark border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all"
                                >
                                    Abort
                                </button>
                                <button
                                    onClick={handleAddSignal}
                                    className="py-5 bg-white text-vpoint-dark rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-neon-purple hover:text-white transition-all shadow-2xl"
                                >
                                    Synchronize Signal
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
