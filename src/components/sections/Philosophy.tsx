"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Zap, BookOpen, Bot, Heart, Lightbulb } from "lucide-react";

const features = [
    {
        icon: <Lightbulb className="w-8 h-8 text-candy-pink" />,
        title: "Pursue 'Why', not just 'How'",
        description: "「どう実装するか」だけでなく「なぜこの方法で実装するか」「なぜこのUIが必要か」まで考えて実装します。",
    },
    {
        icon: <BookOpen className="w-8 h-8 text-candy-blue" />,
        title: "Never Stop Learning",
        description: "新しい技術へのキャッチアップはもちろん、一つの技術を原理原則まで深掘りして学びます。学んだ内容は実践で業務に還元します。",
    },
    {
        icon: <Bot className="w-8 h-8 text-candy-yellow" />,
        title: "AI-Native Workflow",
        description: "開発のフロー、企画のフロー、学習のフロー全てをAIによって変革します。個人としてもAIの活用について追究します。",
    },
    {
        icon: <Heart className="w-8 h-8 text-candy-lime" />,
        title: "Passion × Technology",
        description: "自分の好きなものである「ゲーム」において、エンジニアリングという武器で新たな価値を生み出します。",
    },
];

import { CoinBurst } from "@/components/ui/CoinBurst";

export function Philosophy() {
    return (
        <section id="philosophy" className="py-20 bg-white relative overflow-hidden">
            <CoinBurst amount={500} targetLevel={2} />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        Engineering <span className="text-candy-blue">Philosophy</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        これらの哲学に基づき、ユーザーの「楽しみ」をフロントエンドの側面から最大化します。
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="flex flex-col items-center text-center">
                            <div className="mb-4 p-4 rounded-full bg-gray-50 border border-gray-100">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
