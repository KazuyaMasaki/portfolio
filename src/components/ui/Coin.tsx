"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Coins } from "lucide-react";

export function Coin({ className }: { className?: string }) {
    const { addCoin } = useGame();
    const [collected, setCollected] = React.useState(false);

    const handleCollect = () => {
        if (!collected) {
            setCollected(true);
            addCoin();
            // Play sound effect here if desired
        }
    };

    return (
        <div className={className}>
            <AnimatePresence>
                {!collected && (
                    <motion.button
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 1.5, opacity: 0, y: -50 }}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        className="relative group cursor-pointer"
                        onMouseEnter={handleCollect}
                        onClick={handleCollect}
                    >
                        <div className="w-12 h-12 rounded-full bg-candy-yellow border-4 border-yellow-500 shadow-lg flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/20 to-white/40" />
                            <Coins className="w-6 h-6 text-yellow-800 fill-yellow-800" />
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-candy-yellow font-bold text-sm whitespace-nowrap pointer-events-none">
                            Get Coin!
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {collected && (
                    <motion.div
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        animate={{ opacity: 0, y: -50, scale: 1.5 }}
                        className="absolute pointer-events-none font-bold text-candy-yellow text-xl"
                    >
                        +1
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
