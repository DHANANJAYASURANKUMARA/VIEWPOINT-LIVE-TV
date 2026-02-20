"use client";

import React, { useState, useEffect } from "react";
import {
    Terminal, History, Search, Download, RefreshCw,
    Trash2, Filter, ShieldAlert, Shield, Activity,
    Users, Settings, Radio, Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getDbStats } from "@/lib/actions";
import { getAdminLogs, clearAdminLogs as purgeLogs } from "@/lib/adminAuth";
import { useConfig } from "@/components/ConfigContext";

const categoryColors: Record<string, string> = {
    AUTH: "border-amber-500/30 text-amber-500 bg-amber-500/5",
    OPERATOR: "border-neon-purple/30 text-neon-purple bg-neon-purple/5",
    USER: "border-neon-cyan/30 text-neon-cyan bg-neon-cyan/5",
    CONFIG: "border-emerald-500/30 text-emerald-500 bg-emerald-500/5",
    SIGNAL: "border-blue-400/30 text-blue-400 bg-blue-400/5",
    SYSTEM: "border-slate-500/30 text-slate-400 bg-slate-500/5",
};

const categoryIcons: Record<string, any> = {
    AUTH: Shield,
    OPERATOR: Users,
    USER: Users,
    CONFIG: Settings,
    SIGNAL: Radio,
    SYSTEM: Terminal,
};

export default function SystemControlPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [dbStatus, setDbStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterCat, setFilterCat] = useState("ALL");
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const { config, updateConfig } = useConfig();

    useEffect(() => {
        const auth = localStorage.getItem("vpoint-admin-auth");
        if (auth) {
            try { const p = JSON.parse(auth); setIsSuperAdmin(!!p.isSuperAdmin); } catch { }
        }
        loadAll();
    }, []);

    const loadAll = async () => {
        setLoading(true);
        const [logData, statsData] = await Promise.all([getAdminLogs(), getDbStats()]);
        setLogs(logData);
        if (statsData.success) setDbStatus(statsData.stats);
        setLoading(false);
    };

    const handlePurge = async () => {
        if (!isSuperAdmin) return;
        await purgeLogs();
        setLogs([]);
    };

    const exportLogs = () => {
        const csv = ["Time,Operator,Action,Target,Detail,Category",
            ...logs.map(l => `"${new Date(l.createdAt).toLocaleString()}","${l.operatorName}","${l.action}","${l.target || ""}","${l.detail || ""}","${l.category}"`)
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = "admin_logs.csv"; a.click();
        URL.revokeObjectURL(url);
    };

    const filtered = logs.filter(l => {
        const matchSearch = !search || l.action?.toLowerCase().includes(search.toLowerCase()) ||
            l.operatorName?.toLowerCase().includes(search.toLowerCase()) ||
            l.target?.toLowerCase().includes(search.toLowerCase()) ||
            l.detail?.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCat === "ALL" || l.category === filterCat;
        return matchSearch && matchCat;
    });

    const categories = ["ALL", "AUTH", "OPERATOR", "USER", "CONFIG", "SIGNAL", "SYSTEM"];

    return (
        <div className="flex-1 h-full p-10 space-y-10 overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                        Master <span className="text-amber-500">Logs</span>
                    </h1>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Full Admin Activity & Change Audit Trail</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={loadAll} className="p-4 glass border border-white/10 rounded-2xl text-slate-500 hover:text-neon-cyan transition-colors">
                        <RefreshCw size={16} />
                    </button>
                    <button onClick={exportLogs} className="flex items-center gap-2 px-6 py-4 glass border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all">
                        <Download size={14} /> Export CSV
                    </button>
                    {isSuperAdmin && (
                        <button onClick={handlePurge} className="flex items-center gap-2 px-6 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500/20 transition-all">
                            <Trash2 size={14} /> Purge Logs
                        </button>
                    )}
                </div>
            </div>

            {/* DB + System Status */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { label: "Channels", value: dbStatus?.channels ?? "..." },
                    { label: "Operators", value: dbStatus?.operators ?? "..." },
                    { label: "Users", value: dbStatus?.users ?? "..." },
                    { label: "Favorites", value: dbStatus?.favorites ?? "..." },
                    { label: "Log Entries", value: logs.length },
                ].map(s => (
                    <div key={s.label} className="glass border border-white/10 rounded-[2rem] p-5 flex items-center justify-between">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{s.label}</span>
                        <span className="text-xl font-black text-white">{s.value}</span>
                    </div>
                ))}
            </div>

            {/* Platform Toggles (Global Config) */}
            <div className="glass border border-white/10 rounded-[2.5rem] p-8 bg-white/5 space-y-6">
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                    <Settings size={16} className="text-amber-500" /> Global Config Toggles
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        { key: "maintenanceMode", label: "Maintenance Mode", danger: true },
                        { key: "adSenseActive", label: "Neural AdSense" },
                        { key: "showHero", label: "Hero Interface" },
                        { key: "showFeatures", label: "Tech Features" },
                        { key: "showWhatsNew", label: "Sector Sitemap" },
                        { key: "showFAQ", label: "Knowledge Base" },
                    ].map(toggle => (
                        <button
                            key={toggle.key}
                            onClick={() => updateConfig({ [toggle.key]: !(config as any)[toggle.key] })}
                            className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
                        >
                            <span className={`text-[9px] font-black uppercase tracking-widest ${toggle.danger && (config as any)[toggle.key] ? "text-red-400" : "text-white"}`}>{toggle.label}</span>
                            <div className={`w-10 h-5 rounded-full relative transition-colors ${(config as any)[toggle.key] ? (toggle.danger ? "bg-red-500/80" : "bg-emerald-500/80") : "bg-white/10"}`}>
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${(config as any)[toggle.key] ? "right-1" : "left-1 bg-slate-700"}`} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Search & Category Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={15} />
                    <input type="text" placeholder="FILTER LOGS..." value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-4 pl-12 pr-6 text-[10px] font-bold text-white uppercase tracking-widest placeholder:text-slate-700 focus:outline-none focus:border-amber-500/50 transition-all" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setFilterCat(cat)} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filterCat === cat ? "bg-amber-500 text-vpoint-dark" : "glass border border-white/10 text-slate-500 hover:text-white"}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Logs Table */}
            <div className="glass border border-white/10 rounded-[3rem] overflow-hidden bg-white/5">
                <div className="p-5 bg-white/[0.02] border-b border-white/5 grid grid-cols-12 gap-3 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                    <span className="col-span-2">Category</span>
                    <span className="col-span-2">Operator</span>
                    <span className="col-span-2">Action</span>
                    <span className="col-span-2">Target</span>
                    <span className="col-span-3">Detail</span>
                    <span className="col-span-1 text-right">Time</span>
                </div>
                {loading ? (
                    <div className="flex items-center justify-center py-16 opacity-30">
                        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 opacity-30">
                        <History size={32} className="mb-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">No Log Entries</span>
                    </div>
                ) : filtered.map(log => {
                    const CatIcon = categoryIcons[log.category] || Terminal;
                    const catClass = categoryColors[log.category] || categoryColors.SYSTEM;
                    return (
                        <div key={log.id} className="p-5 grid grid-cols-12 gap-3 items-center border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <div className="col-span-2">
                                <span className={`px-2 py-1 rounded-md text-[8px] font-black border flex items-center gap-1.5 w-fit ${catClass}`}>
                                    <CatIcon size={9} /> {log.category}
                                </span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-[10px] font-bold text-white">{log.operatorName}</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-[9px] font-mono text-amber-400">{log.action}</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-[9px] text-slate-400">{log.target || "—"}</span>
                            </div>
                            <div className="col-span-3">
                                <span className="text-[9px] text-slate-500 truncate block">{log.detail || "—"}</span>
                            </div>
                            <div className="col-span-1 text-right">
                                <span className="text-[9px] font-mono text-slate-600">{new Date(log.createdAt).toLocaleTimeString()}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
