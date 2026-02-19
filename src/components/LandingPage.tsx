"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Tv, Zap, Globe, ShieldCheck, Play, ArrowRight,
    Activity, Layers, Users, Radio, Info, FileText,
    Mail, ExternalLink, Menu, X, ArrowUpRight,
    Sparkles, Shield, Cpu
} from "lucide-react";

interface LandingPageProps {
    onLaunch: () => void;
}

export default function LandingPage({ onLaunch }: LandingPageProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [viewerCount, setViewerCount] = useState(12405);
    const [activeSignals, setActiveSignals] = useState(258);

    // Simulate real-time data flow
    useEffect(() => {
        const interval = setInterval(() => {
            setViewerCount(prev => prev + Math.floor(Math.random() * 5) - 2);
            if (Math.random() > 0.8) {
                setActiveSignals(prev => prev + (Math.random() > 0.5 ? 1 : -1));
            }
        }, 3000);

        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);

        return () => {
            clearInterval(interval);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navLinks = [
        { name: "Live Pulse", href: "#live" },
        { name: "Intelligence", href: "#features" },
        { name: "Mission", href: "#about" },
        { name: "Support", href: "#contact" },
        { name: "Governance", href: "#legal" }
    ];

    return (
        <div className="relative min-h-screen w-full aurora-bg text-white/90 selection:bg-aurora-emerald/30 overflow-x-hidden">
            <div className="aurora-flowing opacity-30 top-[-20%] left-[-20%]" />
            <div className="aurora-flowing opacity-20 bottom-[-20%] right-[-20%] animation-delay-2000" />

            {/* Navbar (Keeping original structure as requested) */}
            <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? "py-4" : "py-8"}`}>
                <div className="container mx-auto px-6">
                    <div className={`relative glass border border-white/5 rounded-full px-8 py-4 flex items-center justify-between transition-all duration-500 ${scrolled ? "bg-aurora-midnight/80 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]" : "bg-transparent"}`}>
                        <div className="flex items-center gap-3">
                            <span className="text-xl font-bold text-white tracking-tighter uppercase">VIEWPOINT</span>
                        </div>
                        <div className="hidden lg:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <a key={link.name} href={link.href} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">
                                    {link.name}
                                </a>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={onLaunch} className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-white text-aurora-midnight rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-aurora-emerald transition-all">
                                Launch Station <ArrowRight size={14} />
                            </button>
                            <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 z-[90] bg-aurora-midnight glass-dark backdrop-blur-3xl flex flex-col items-center justify-center gap-8 p-10 lg:hidden"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-black uppercase tracking-[0.3em] text-white/50 hover:text-white transition-all"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={onLaunch}
                            className="w-full mt-10 px-10 py-5 bg-white text-aurora-midnight rounded-full font-black uppercase tracking-[0.2em]"
                        >
                            Start Transmission
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section id="live" className="relative pt-60 pb-32 px-6">
                <div className="container mx-auto text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="space-y-10">
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <div className="px-4 py-2 glass rounded-full flex items-center gap-3 border-white/10 bg-white/5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aurora-emerald opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-aurora-emerald"></span>
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{viewerCount.toLocaleString()} Active Streams</span>
                            </div>
                            <div className="px-4 py-2 glass rounded-full flex items-center gap-3 border-white/10 bg-white/5">
                                <Activity size={12} className="text-aurora-teal" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{activeSignals} Global Nodes</span>
                            </div>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter uppercase leading-[0.9] [text-wrap:balance]">
                            Midnight <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-emerald via-white to-aurora-purple">Aurora</span> Signal
                        </h1>

                        <p className="max-w-2xl mx-auto text-xs md:text-sm text-white/40 font-semibold uppercase tracking-[0.4em] leading-relaxed italic">
                            The atmosphere of live broadcasting reimagined. Liquid glass, ethereal signals, zero-latency.
                        </p>

                        <div className="pt-10">
                            <button onClick={onLaunch} className="group relative px-16 py-7 bg-white text-aurora-midnight rounded-full font-bold uppercase tracking-[0.3em] transition-all hover:bg-aurora-emerald hover:shadow-[0_0_100px_rgba(16,185,129,0.3)] scale-105 active:scale-95">
                                <span className="relative z-10 flex items-center gap-4">Connect To Station <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { icon: <Zap />, title: "300ms Lock", desc: "Instantaneous signal lock for a refined, lag-free experience across our global CDN mesh." },
                        { icon: <Shield />, title: "Quantum Shield", desc: "Advanced handshake protocols ensuring maximum stream privacy and neural data integrity." },
                        { icon: <Cpu />, title: "Aurora Engine", desc: "Proprietary upscaling technology for cinematic depth on every transmitted frame." }
                    ].map((f, i) => (
                        <div key={i} className="group p-12 glass rounded-[3rem] border-white/5 bg-white/5 hover:border-aurora-emerald/30 transition-all">
                            <div className="p-5 bg-aurora-emerald/10 rounded-2xl w-fit text-aurora-emerald mb-8 transition-transform group-hover:scale-110">
                                {f.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-5">{f.title}</h3>
                            <p className="text-[11px] font-semibold leading-relaxed uppercase tracking-[0.1em] text-white/30">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="py-32 bg-aurora-midnight/50 relative">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10 text-left">
                            <span className="text-[10px] font-bold text-aurora-emerald uppercase tracking-[0.5em]">The Origin Protocol</span>
                            <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-none">The Mission</h2>
                            <p className="text-sm font-medium leading-[2] text-white/50 uppercase tracking-[0.15em]">
                                VIEWPOINT was architected to bridge the ethereal gap between legacy broadcasting and the future of digital density. We believe that live television should be as fluid and expressive as the neural networks we use to access them. Our signal engineers work tirelessly to ensure cinematic excellence in every frame.
                            </p>
                            <div className="flex gap-10 opacity-30">
                                <div className="space-y-1">
                                    <div className="text-2xl font-mono">2026.02</div>
                                    <div className="text-[9px] font-bold uppercase tracking-widest">Initial Boot</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-2xl font-mono">150+</div>
                                    <div className="text-[9px] font-bold uppercase tracking-widest">Global Nodes</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square glass rounded-[4rem] border-white/10 flex items-center justify-center overflow-hidden group">
                            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-aurora-emerald to-transparent top-1/2 -translate-y-1/2 animate-scan" />
                            <Info size={120} className="text-white/5 group-hover:text-white/10 transition-colors" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section id="contact" className="py-32 container mx-auto px-6">
                <div className="glass rounded-[4rem] border-white/5 p-12 lg:p-24 bg-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-aurora-purple/5 blur-[100px] rounded-full" />
                    <div className="max-w-xl space-y-10 relative z-10">
                        <h2 className="text-5xl font-bold text-white uppercase tracking-tighter">Signal Support</h2>
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30 leading-loose">
                            Experience issues with your transmission? Our signal engineers are standing by 24/7 to ensure your connection remains atmospheric and stable across all nodes.
                        </p>
                        <div className="space-y-6">
                            <input type="text" placeholder="Neural ID / Email" className="w-full bg-aurora-midnight/50 border border-white/5 rounded-2xl px-8 py-5 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-aurora-emerald/30 placeholder:opacity-20" />
                            <textarea placeholder="Transmission Metrics / Inquiry" rows={4} className="w-full bg-aurora-midnight/50 border border-white/5 rounded-2xl px-8 py-5 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-aurora-emerald/30 placeholder:opacity-20 resize-none" />
                            <button className="px-12 py-5 bg-white text-aurora-midnight rounded-full font-bold uppercase tracking-[0.3em] hover:bg-aurora-emerald transition-all">Submit Handshake</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Legal Core - AdSense Proofing */}
            <section id="legal" className="py-32 bg-black/40">
                <div className="container mx-auto px-6 max-w-6xl space-y-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        {/* Terms of Entry */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-white uppercase tracking-[0.3em]">Terms of Entry</h3>
                            <div className="h-0.5 w-10 bg-aurora-emerald opacity-50" />
                            <p className="text-[10px] font-medium leading-relaxed uppercase tracking-[0.1em] text-white/30">
                                By accessing the VIEWPOINT TRANSMISSION STATION, you agree to adhere to our protocol standards. All signals transmitted via this interface are for personal refinement only. Unauthorized redistribution of neural signals is strictly monitored and may result in immediate handshake termination.
                            </p>
                        </div>
                        {/* Privacy Matrix */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-white uppercase tracking-[0.3em]">Privacy Matrix</h3>
                            <div className="h-0.5 w-10 bg-aurora-purple opacity-50" />
                            <p className="text-[10px] font-medium leading-relaxed uppercase tracking-[0.1em] text-white/30">
                                We operate on a ZERO-KNOWLEDGE protocol. Your viewing history and signal preferences stay local to your handshake data. We do not aggregate user statistics for external entities. All data encryption is performed using military-grade atmospheric algorithms.
                            </p>
                        </div>
                        {/* DMCA Protocol */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-white uppercase tracking-[0.3em]">DMCA Protocol</h3>
                            <div className="h-0.5 w-10 bg-aurora-teal opacity-50" />
                            <p className="text-[10px] font-medium leading-relaxed uppercase tracking-[0.1em] text-white/30">
                                VIEWPOINT acts as a signal gateway. If you believe a specific transmission via our interface infringes on your intellectual properties, please submit a formal neural request via our Contact Hub. We process all protocols within 48 planetary hours.
                            </p>
                        </div>
                        {/* Legal Disclaimer */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-white uppercase tracking-[0.3em]">Legal Disclaimer</h3>
                            <div className="h-0.5 w-10 bg-amber-500 opacity-50" />
                            <p className="text-[10px] font-medium leading-relaxed uppercase tracking-[0.1em] text-white/30">
                                All stats and tracking metrics displayed are part of the Atmospheric HUD experience. VIEWPOINT does not guarantee 100% signal continuity during extreme solar activity. Users are responsible for the stability of their own terminal hardware.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-24 px-6 border-t border-white/5">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="space-y-4 text-center md:text-left">
                            <span className="text-2xl font-bold text-white tracking-widest">VIEWPOINT</span>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.5em]">The Atmosphere of Live Transmission</p>
                        </div>
                        <div className="flex items-center gap-8 text-white/20">
                            <a href="#" className="text-[10px] font-bold hover:text-white transition-colors uppercase tracking-[0.3em]">Station Status</a>
                            <a href="#" className="text-[10px] font-bold hover:text-white transition-colors uppercase tracking-[0.3em]">Nodes Active</a>
                            <a href="#" className="text-[10px] font-bold hover:text-white transition-colors uppercase tracking-[0.3em]">Signal Health</a>
                        </div>
                        <div className="flex items-center gap-5">
                            <button className="p-3 glass rounded-xl border-white/5 text-white/20 hover:text-white transition-all"><Mail size={18} /></button>
                            <button className="p-3 glass rounded-xl border-white/5 text-white/20 hover:text-white transition-all"><ExternalLink size={18} /></button>
                        </div>
                    </div>
                    <div className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center gap-6 opacity-20">
                        <span className="text-[8px] font-bold uppercase tracking-[0.8em]">© 2026 Viewpoint Neural Systems • Handshake Encrypted</span>
                        <div className="flex gap-10 text-[8px] font-bold uppercase tracking-widest">
                            <span className="cursor-pointer hover:text-white transition-colors">TOS</span>
                            <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
                            <span className="cursor-pointer hover:text-white transition-colors">DMCA</span>
                            <span className="cursor-pointer hover:text-white transition-colors">Site Map</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
