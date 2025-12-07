"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Shield } from "lucide-react";

const experiences = [
    {
        role: "Frontend Engineer",
        period: "2023 - Present",
        project: "自社IPブラウザタイトル",
        description: "定常イベントリニューアル、機能改修などのフロントエンド部分を担当。レガシーなコードベースを読み解き、不具合を最小限に抑えながら改修を遂行。AIも活用し、業務効率化のためのツール開発や開発環境の整備も推進。",
    },
    {
        role: "Frontend Engineer",
        period: "2019 - 2023",
        project: "他社IPブラウザタイトル",
        description: "ゲームタイトル内の新規キャンペーン、新規機能開発などのフロントエンド部分を担当。動的な演出やゲームロジックの実装力で、それまで当タイトルでできなかった表現を実現。",
    },
];

import { CoinBurst } from "@/components/ui/CoinBurst";

export function Experience() {
    return (
        <section id="experience" className="py-20 bg-white relative">
            <CoinBurst amount={1200} targetLevel={4} />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        Professional <span className="text-candy-lime">Experience</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        6年間にわたる、最高のゲームUXへの挑戦。
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 hidden md:block" />
                        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 md:hidden" />

                        <div className="space-y-12">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: index * 0.2 }}
                                    className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 rounded-full bg-candy-lime border-4 border-white shadow-md -translate-x-1/2 z-10" />

                                    <div className="flex-1 ml-16 md:ml-0">
                                        <div className={`bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-candy-lime/30 transition-colors ${index % 2 === 0 ? "md:text-left" : "md:text-right"
                                            }`}>
                                            <div className={`flex items-center gap-2 mb-2 text-candy-lime font-bold ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                                                }`}>
                                                <Briefcase className="w-4 h-4" />
                                                <span>{exp.role}</span>
                                            </div>
                                            <div className={`flex items-center gap-2 mb-4 text-sm text-gray-400 ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                                                }`}>
                                                <Calendar className="w-3 h-3" />
                                                <span>{exp.period}</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{exp.project}</h3>
                                            <p className="text-gray-600 leading-relaxed text-justify" style={{ textJustify: "inter-character", lineBreak: "strict", wordBreak: "break-all" }}>{exp.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-12 p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-4 z-10 relative"
                    >
                        <Shield className="w-6 h-6 text-gray-400 shrink-0" />
                        <p className="text-sm text-gray-500">
                            詳細なプロジェクト名や具体的な数値は機密情報を含むため、面談にて補足させていただきます。
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
