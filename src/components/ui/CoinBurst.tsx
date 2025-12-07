"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { Coins } from "lucide-react";

export function CoinBurst({ amount = 500, targetLevel }: { amount?: number; targetLevel?: number }) {
    const { addCoin, setLevel } = useGame();
    const [isTriggered, setIsTriggered] = React.useState(false);
    const [coins, setCoins] = React.useState<{ id: number; x: number; y: number; tx: number; ty: number; burstX: number; burstY: number }[]>([]);
    const [floatingTextPos, setFloatingTextPos] = React.useState<{ x: number; y: number } | null>(null);
    const ref = React.useRef<HTMLDivElement>(null);

    // Trigger burst when in view
    const handleInView = () => {
        if (isTriggered || !ref.current) return;
        setIsTriggered(true);

        // Level Up
        if (targetLevel) {
            setLevel(targetLevel);
        }

        const originRect = ref.current.getBoundingClientRect();
        const targetElement = document.getElementById("coin-balance");

        let targetX = 0;
        let targetY = 0;

        if (targetElement) {
            const targetRect = targetElement.getBoundingClientRect();
            targetX = targetRect.left + targetRect.width / 2;
            targetY = targetRect.top + targetRect.height / 2;
        } else {
            // Fallback if header not found (e.g. mobile hidden?)
            targetX = window.innerWidth - 50;
            targetY = 30;
        }

        // Origin center
        const startX = originRect.left + originRect.width / 2;
        const startY = originRect.top + originRect.height / 2;

        // Store origin for floating text
        setFloatingTextPos({ x: originRect.left, y: originRect.top });

        // Create multiple coins for animation
        const newCoins = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: startX + (Math.random() - 0.5) * 100, // Random spread start X
            y: startY + (Math.random() - 0.5) * 100, // Random spread start Y
            tx: targetX,
            ty: targetY,
            // Pre-calculate random burst offsets
            burstX: (Math.random() - 0.5) * 200,
            burstY: (Math.random() - 0.5) * 200,
        }));
        setCoins(newCoins);

        // Add actual coins to context after animation starts
        setTimeout(() => {
            addCoin(amount);
        }, 1200);

        // Cleanup coins after animation
        setTimeout(() => {
            setCoins([]);
        }, 2000);
    };

    return (
        <>
            {/* Trigger Element */}
            <motion.div
                ref={ref}
                onViewportEnter={handleInView}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-1 h-1"
            />

            {/* Flying Coins (Portal to Body to avoid overflow clipping) */}
            {isTriggered && typeof document !== "undefined" && createPortal(
                <AnimatePresence>
                    {coins.map((coin) => (
                        <motion.div
                            key={coin.id}
                            initial={{ opacity: 1, x: coin.x, y: coin.y, scale: 0 }}
                            animate={{
                                opacity: [1, 1, 1, 0],
                                x: [coin.x, coin.x + coin.burstX, coin.tx, coin.tx],
                                y: [coin.y, coin.y + coin.burstY, coin.ty, coin.ty],
                                scale: [0, 1.2, 0.8, 0.3],
                                rotate: [0, 180, 720, 720]
                            }}
                            transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.4, 0.9, 1] }}
                            className="fixed top-0 left-0 z-[9999] pointer-events-none"
                        >
                            <Coins className="w-8 h-8 text-candy-yellow fill-yellow-400 drop-shadow-md" />
                        </motion.div>
                    ))}

                    {/* Floating Text at Origin */}
                    {floatingTextPos && (
                        <motion.div
                            initial={{ opacity: 0, y: floatingTextPos.y, x: floatingTextPos.x, scale: 0.5 }}
                            animate={{ opacity: 1, y: floatingTextPos.y - 100, scale: 1.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="fixed z-[9999] text-4xl font-bold text-candy-yellow drop-shadow-lg whitespace-nowrap pointer-events-none"
                            style={{
                                left: floatingTextPos.x,
                                top: floatingTextPos.y
                            }}
                        >
                            +{amount}
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
