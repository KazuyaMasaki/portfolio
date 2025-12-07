"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { CoinBurst } from "@/components/ui/CoinBurst";
import confetti from "canvas-confetti";
import { Rocket, Globe, Users } from "lucide-react";

const goals = [
    {
        year: "2025",
        title: "UX Engineer",
        description: "エンジニアリングとデザインの架け橋となり、技術的な観点からユーザー体験を最大化する実装を提案・実現します。",
        icon: Rocket,
    },
    {
        year: "2026",
        title: "Lead Engineer",
        description: "技術的な意思決定を主導し、チーム全体のコード品質向上やアーキテクチャ設計を牽引。メンバーの技術的成長もサポートします。",
        icon: Globe,
    },
    {
        year: "2027+",
        title: "Tech Lead / EM",
        description: "ビジネスゴールとエンジニアリングを整合させ、組織全体の成果を最大化。技術戦略の策定やチームビルディングも担います。",
        icon: Users,
    },
];

export function Roadmap() {
    const handleConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        const interval: NodeJS.Timeout = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <section id="roadmap" className="py-20 bg-gray-50 relative">
            <CoinBurst amount={2000} targetLevel={5} />
            <motion.div onViewportEnter={handleConfetti} />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        Career <span className="text-candy-yellow">Roadmap</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        このような人材になることを目指します。
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {goals.map((goal, index) => (
                        <Card key={index} className="text-center">
                            <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-4 z-10 relative">
                                <goal.icon className="w-8 h-8 text-candy-blue" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{goal.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {goal.description}
                            </p>
                        </Card>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 md:p-12 bg-candy-blue/10 rounded-[3rem] text-center max-w-4xl mx-auto border-2 border-candy-blue/20"
                >
                    <h3 className="text-3xl font-heading font-bold mb-8 text-candy-blue">
                        Ready to build the future together?
                    </h3>

                    <a
                        href="mailto:kazuyamasaki706@gmail.com"
                        className="inline-block bg-candy-blue text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 mb-8"
                    >
                        Get in Touch
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
