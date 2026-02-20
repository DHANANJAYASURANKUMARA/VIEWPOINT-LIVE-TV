"use client";

import React, { useState, useEffect } from "react";
import {
    Users,
    UserPlus,
    Shield,
    MoreVertical,
    Activity,
    Trash2,
    CheckCircle,
    XCircle,
    Search,
    ShieldCheck,
    Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getOperators, manageOperator, deleteOperator } from "@/lib/actions";

export default function OperatorManagementPage() {
    const [operators, setOperators] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentOperator, setCurrentOperator] = useState({ name: "", password: "", role: "Operator", status: "Active" });

    useEffect(() => {
        loadOperators();
    }, []);

    const loadOperators = async () => {
        setLoading(true);
        const data = await getOperators();
        setOperators(data);
        setLoading(false);
    };

    const handleSave = async () => {
        const res = await manageOperator(currentOperator);
        if (res.success) {
            setIsModalOpen(false);
            setCurrentOperator({ name: "", password: "", role: "Operator", status: "Active" });
            loadOperators();
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("TERMINATE OPERATOR ACCESS?")) {
            const res = await deleteOperator(id);
            if (res.success) loadOperators();
        }
    };

    const filtered = operators.filter(op =>
        op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 h-full p-10 space-y-10 overflow-y-auto custom-scrollbar relative">
            {/* HUD Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                        Operator <span className="text-neon-cyan">Management</span>
                    </h1>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Manage Institutional Personnel</p>
                </div>
                <button
                    onClick={() => {
                        setCurrentOperator({ name: "", password: "", role: "Operator", status: "Active" });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-3 px-8 py-4 bg-white text-vpoint-dark rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-neon-cyan hover:text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all"
                >
                    <UserPlus size={16} /> Provision Operator
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Nodes", val: operators.filter(o => o.status === "Active").length, color: "text-emerald-500", icon: <CheckCircle size={14} /> },
                    { label: "Lead Clearance", val: operators.filter(o => o.role === "Lead").length, color: "text-neon-purple", icon: <ShieldCheck size={14} /> },
                    { label: "Total Sessions", val: operators.length * 12, color: "text-neon-cyan", icon: <Activity size={14} /> }
                ].map((s, i) => (
                    <div key={i} className="glass border border-white/5 p-6 rounded-[2rem] bg-white/[0.02] flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                {s.icon} {s.label}
                            </p>
                            <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-30">
                            <Cpu size={16} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Tactical Filter */}
            <div className="relative group max-w-2xl">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-neon-cyan transition-colors" size={18} />
                <input
                    type="text"
                    placeholder="SCANNINING FOR PERSONNEL..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-16 pr-8 text-[11px] font-bold text-white uppercase tracking-[0.2em] placeholder:text-slate-700 focus:outline-none focus:border-neon-cyan/50 transition-all"
                />
            </div>

            {/* Operators List */}
            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-30">
                        <div className="w-10 h-10 rounded-full border-2 border-neon-cyan border-t-transparent animate-spin mb-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Acquiring Personnel Data...</span>
                    </div>
                ) : filtered.map((op) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={op.id}
                        className="glass border border-white/5 p-6 rounded-[2.5rem] bg-white/[0.01] hover:bg-white/[0.03] transition-all flex flex-col md:flex-row items-center justify-between gap-6 group"
                    >
                        <div className="flex items-center gap-5 w-full md:w-auto">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${op.status === "Active" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-red-500/10 border-red-500/20 text-red-500"
                                }`}>
                                <Users size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-white uppercase tracking-tighter group-hover:text-neon-cyan transition-colors">{op.name}</h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{op.role}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-800" />
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${op.status === "Active" ? "text-emerald-500" : "text-red-500"}`}>
                                        {op.status} Sector
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-2 gap-8 px-10">
                            <div>
                                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Clearance Level</p>
                                <div className="flex items-center gap-2">
                                    <Shield size={10} className={op.role === "Lead" ? "text-neon-purple" : "text-slate-700"} />
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Level {op.role === "Lead" ? "05" : "02"}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Last Handshake</p>
                                <p className="text-[10px] font-black text-white uppercase tracking-widest">{new Date(op.lastActive).toLocaleTimeString()}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-white/5">
                            <button
                                onClick={() => {
                                    setCurrentOperator(op);
                                    setIsModalOpen(true);
                                }}
                                className="p-4 rounded-xl glass-dark border border-white/10 text-slate-500 hover:text-white transition-all"
                            >
                                <Shield size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(op.id)}
                                className="p-4 rounded-xl glass-dark border border-white/10 text-red-500/50 hover:text-red-500 hover:border-red-500/30 transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Provisioning Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-3xl"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="w-full max-w-xl glass border border-white/10 rounded-[3rem] p-10 relative z-10 bg-vpoint-dark"
                        >
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Provision <span className="text-neon-cyan">Operator</span></h2>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Initialize Personnel Credentials</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Personnel ID</label>
                                        <input
                                            type="text"
                                            placeholder="E.G. COMMANDER ALPHA"
                                            value={currentOperator.name}
                                            onChange={(e) => setCurrentOperator({ ...currentOperator, name: e.target.value.toUpperCase() })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-xs font-bold text-white uppercase tracking-widest placeholder:text-slate-800 focus:outline-none focus:border-neon-cyan/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Key (Password)</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={currentOperator.password}
                                            onChange={(e) => setCurrentOperator({ ...currentOperator, password: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-xs font-bold text-white tracking-widest placeholder:text-slate-800 focus:outline-none focus:border-neon-cyan/50 transition-all"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Clearance</label>
                                            <select
                                                value={currentOperator.role}
                                                onChange={(e) => setCurrentOperator({ ...currentOperator, role: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-neon-cyan/50 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="Operator" className="bg-vpoint-dark text-white">Operator</option>
                                                <option value="Lead" className="bg-vpoint-dark text-white">Lead</option>
                                                <option value="Analyst" className="bg-vpoint-dark text-white">Analyst</option>
                                                <option value="Admin" className="bg-vpoint-dark text-white">Admin</option>
                                                <option value="Moderator" className="bg-vpoint-dark text-white">Moderator</option>
                                            </select>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Sector Status</label>
                                            <select
                                                value={currentOperator.status}
                                                onChange={(e) => setCurrentOperator({ ...currentOperator, status: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-neon-cyan/50 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="Active" className="bg-vpoint-dark text-white">Active</option>
                                                <option value="Suspended" className="bg-vpoint-dark text-white">Suspended</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="py-5 glass-dark border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all"
                                    >
                                        Abort
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="py-5 bg-white text-vpoint-dark rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-neon-cyan hover:text-white transition-all shadow-2xl"
                                    >
                                        Confirm Provision
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
