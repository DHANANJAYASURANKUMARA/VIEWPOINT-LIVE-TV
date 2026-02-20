"use client";

import React, { useState, useEffect } from "react";
import {
    Users as UsersIcon,
    Search,
    Activity,
    Clock,
    Heart,
    ChevronRight,
    Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getDbStats } from "@/lib/actions";

export default function UsersActivityPage() {
    const [stats, setStats] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    // Mocking user list based on favorites count since we don't have a dedicated users table yet
    // In a real app, this would query a 'users' table or aggregate 'favorites'
    const [users, setUsers] = useState([
        { id: "USR-001", name: "Institutional Node 01", location: "Singapore", activeSignals: 4, lastActive: "2 mins ago", status: "Active" },
        { id: "USR-002", name: "Institutional Node 02", location: "London", activeSignals: 12, lastActive: "15 mins ago", status: "Active" },
        { id: "USR-003", name: "Anonymous Uplink 88", location: "Global Proxy", activeSignals: 1, lastActive: "1 hour ago", status: "Idle" },
        { id: "USR-004", name: "Institutional Node 03", location: "New York", activeSignals: 7, lastActive: "5 mins ago", status: "Active" },
        { id: "USR-005", name: "Security Auditor 01", location: "Internal", activeSignals: 0, lastActive: "Just now", status: "Active" },
    ]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const res = await getDbStats();
        if (res.success) {
            setStats(res.stats);
        }
        setLoading(false);
    };

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 h-full p-10 space-y-10 overflow-y-auto custom-scrollbar relative">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                        User <span className="text-neon-cyan">Activity</span>
                    </h1>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Monitor Global Node Engagement</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-6 px-8 py-4 glass border border-white/5 rounded-2xl">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Total Engagements</span>
                            <span className="text-xl font-black text-white">{stats?.favorites || "..."}</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan">
                            <Heart size={18} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tactical Search & Filter */}
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative group flex-1 w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-neon-cyan transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="SCANNING FOR USER NODES..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-16 pr-8 text-[11px] font-bold text-white uppercase tracking-[0.2em] placeholder:text-slate-700 focus:outline-none focus:border-neon-cyan/50 transition-all"
                    />
                </div>
                <button className="px-8 py-5 glass border border-white/10 text-slate-500 rounded-[2rem] flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">
                    <Filter size={14} /> Filter Stream
                </button>
            </div>

            {/* Users Matrix */}
            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-30">
                        <div className="w-10 h-10 rounded-full border-2 border-neon-cyan border-t-transparent animate-spin mb-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Intercepting User Packets...</span>
                    </div>
                ) : (
                    <div className="glass border border-white/10 rounded-[3rem] overflow-hidden bg-white/5">
                        <div className="p-6 bg-white/[0.02] border-b border-white/5 flex items-center gap-4 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                            <span className="w-32">User ID</span>
                            <span className="flex-1">Identity Profile</span>
                            <span className="w-40 text-center">Global Sector</span>
                            <span className="w-32 text-center">Active Signals</span>
                            <span className="w-32 text-right">Last Sync</span>
                        </div>
                        <div className="divide-y divide-white/5">
                            {filtered.map((user) => (
                                <div key={user.id} className="p-8 flex items-center gap-4 hover:bg-white/[0.01] transition-colors group">
                                    <div className="w-32">
                                        <span className="text-[10px] font-mono text-neon-cyan font-bold">{user.id}</span>
                                    </div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                                            <UsersIcon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{user.name}</h4>
                                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Authorized Transmission Node</p>
                                        </div>
                                    </div>
                                    <div className="w-40 text-center">
                                        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{user.location}</span>
                                    </div>
                                    <div className="w-32 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${user.activeSignals > 0 ? "bg-emerald-500 animate-pulse" : "bg-slate-700"}`} />
                                            <span className="text-[11px] font-black text-white">{user.activeSignals}</span>
                                        </div>
                                    </div>
                                    <div className="w-32 text-right">
                                        <p className="text-[10px] font-black text-slate-500 uppercase flex items-center justify-end gap-2">
                                            <Clock size={10} /> {user.lastActive}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Intelligence Footer */}
            <div className="pt-10 flex items-center justify-between opacity-30">
                <div className="flex items-center gap-3">
                    <Activity size={12} className="text-neon-cyan" />
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">Network Saturation: 14%</span>
                </div>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">Institutional Integrity ACTIVE</span>
            </div>
        </div>
    );
}
