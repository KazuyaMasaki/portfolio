"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

const FloatingParticles = () => {
    // Generate random particles only once on mount
    const [particles, setParticles] = React.useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

    React.useEffect(() => {
        const newParticles = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 20 + 10,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    if (particles.length === 0) return null; // Avoid hydration mismatch by rendering nothing initially or use a fixed seed if needed.


    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-candy-yellow/20"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, 50, 0],
                        opacity: [0.2, 0.5, 0.2],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
};

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            <FloatingParticles />

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2
                    }}
                    className="mb-6 inline-block"
                >
                    <span className="px-4 py-2 rounded-full bg-candy-lime/20 text-candy-lime font-bold text-sm border-2 border-candy-lime/50 flex items-center gap-2 mx-auto w-fit">
                        <Sparkles className="w-4 h-4" />
                        AI-Native Frontend Engineer
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="text-5xl md:text-7xl font-heading font-bold text-gray-900 mb-6 leading-tight"
                >
                    Building the Future with <br />
                    <span className="text-candy-pink">AI</span> × <span className="text-candy-blue">Frontend</span> × <span className="text-candy-yellow">Game</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto"
                >
                    Not just coding. Orchestrating AI agents to build high-quality web & game experiences at warp speed.
                </motion.p>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4"
                >
                    <Button size="lg" className="w-full md:w-auto group">
                        View Projects
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button size="lg" variant="outline" className="w-full md:w-auto">
                        Read My Philosophy
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-16 text-sm text-gray-400"
                >
                    * This portfolio itself was built in collaboration with AI agents.
                </motion.div>
            </div>
        </section>
    );
}
