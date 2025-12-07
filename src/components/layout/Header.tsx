"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Menu } from "lucide-react";

import { useGame } from "@/context/GameContext";
import { Coins, Star } from "lucide-react";

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
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
                    <a href="#" className="text-2xl font-heading font-bold text-candy-pink tracking-tight z-50 relative">
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

                <div className="md:hidden z-50 relative">
                    <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <Menu className="w-6 h-6" />
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl p-6 pt-24 md:hidden flex flex-col gap-6 items-center"
                >
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-xl font-bold text-gray-800 hover:text-candy-pink"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                    {/* Mobile HUD */}
                    <div className="flex items-center gap-4 py-4 border-t border-gray-100 w-full justify-center">
                        <div className="bg-candy-blue text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-sm">
                            <Star className="w-3 h-3 fill-current" />
                            {level >= 5 ? "Lv.MAX" : `Lv.${level}`}
                        </div>
                        <div className="bg-candy-yellow text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-sm">
                            <Coins className="w-3 h-3 fill-current" />
                            {coins}
                        </div>
                    </div>
                    <Button
                        size="lg"
                        variant="primary"
                        className="w-full"
                        onClick={() => {
                            window.location.href = 'mailto:kazuyamasaki706@gmail.com';
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        Contact Me
                    </Button>
                </motion.div>
            )}
        </motion.header>
    );
}
