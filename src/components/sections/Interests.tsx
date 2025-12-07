"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { CoinBurst } from "@/components/ui/CoinBurst";
import { Heart, Lightbulb, Music, Book, Gamepad, Coffee, Smartphone, Brain } from "lucide-react";

export function Interests() {
    const hobbies = [
        "美味しいお店探し🍜🍔🍛",
        "スポーツ観戦🏇⚾️",
        "ゲーム🎮",
        "アプリ開発📱",
        "学習/創作の方法論の追究📝",
        "AIによる人生の改善⤴️",
        "読書📚",
        "音楽制作🎹"
    ];

    const interests = [
        "プログラミング/ソフトウェア開発",
        "UI/UX",
        "アニメーション/演出",
        "思考法/発想法",
        "読解法/文章法",
        "哲学",
        "数学（的思考法）",
        "論理学",
        "言語学/国語/日本語/英語",
        "マーケティング",
        "批評理論/物語論"
    ];

    return (
        <section id="interests" className="py-20 bg-gray-50 relative">
            <CoinBurst amount={800} targetLevel={3} />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        Personal <span className="text-candy-pink">Interests</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        私の活動の源泉となる興味と関心。
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Hobbies Column */}
                    <Card className="p-8 border-t-4 border-candy-yellow">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-candy-yellow/10 rounded-full text-candy-yellow">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800">Hobbies</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {hobbies.map((hobby, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="px-4 py-2 bg-white border border-gray-100 shadow-sm rounded-full text-gray-700 font-medium hover:scale-105 transition-transform cursor-default"
                                >
                                    {hobby}
                                </motion.span>
                            ))}
                        </div>
                    </Card>

                    {/* Interests Column */}
                    <Card className="p-8 border-t-4 border-candy-blue">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-candy-blue/10 rounded-full text-candy-blue">
                                <Lightbulb className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800">Interests</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {interests.map((item, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="px-4 py-2 bg-white border border-gray-100 shadow-sm rounded-full text-gray-700 font-medium hover:scale-105 transition-transform cursor-default"
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}
