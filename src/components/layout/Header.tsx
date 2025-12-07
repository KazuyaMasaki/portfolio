"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Menu } from "lucide-react";

import { useGame } from "@/context/GameContext";
import { Coins, Star } from "lucide-react";

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const { coins, level } = useGame();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Philosophy", href: "#philosophy" },
        { name: "Interests", href: "#interests" },
        { name: "Experience", href: "#experience" },
        { name: "Roadmap", href: "#roadmap" },
    ];

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <a href="#" className="text-2xl font-heading font-bold text-candy-pink tracking-tight">
                        Kazuya_Masaki<span className="text-gray-800">.Dev</span>
                    </a>

                    {/* HUD Elements */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="bg-candy-blue text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-sm border-b-2 border-blue-600">
                            <Star className="w-3 h-3 fill-current" />
                            {level >= 5 ? "Lv.MAX" : `Lv.${level}`}
                        </div>
                        <div id="coin-balance" className="bg-candy-yellow text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-sm border-b-2 border-yellow-600">
                            <Coins className="w-3 h-3 fill-current" />
                            {coins}
                        </div>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-gray-600 hover:text-candy-pink font-medium transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                    <Button size="sm" variant="primary" onClick={() => window.location.href = 'mailto:kazuyamasaki706@gmail.com'}>
                        Contact Me
                    </Button>
                </nav>

                <div className="md:hidden">
                    <Button variant="ghost" size="sm">
                        <Menu className="w-6 h-6" />
                    </Button>
                </div>
            </div>
        </motion.header>
    );
}
