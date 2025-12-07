"use client";

import * as React from "react";

interface GameContextType {
    coins: number;
    addCoin: (amount?: number) => void;
    level: number;
    setLevel: (level: number) => void;
}

const GameContext = React.createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [coins, setCoins] = React.useState(0);
    const [level, setLevel] = React.useState(1);

    const addCoin = React.useCallback((amount: number = 1) => {
        setCoins((prev) => prev + amount);
    }, []);

    return (
        <GameContext.Provider value={{ coins, addCoin, level, setLevel }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = React.useContext(GameContext);
    if (context === undefined) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
}
