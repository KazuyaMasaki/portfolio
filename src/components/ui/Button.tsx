"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const variants = {
            primary: "bg-candy-pink text-white border-b-4 border-pink-600 active:border-b-0 active:translate-y-1",
            secondary: "bg-candy-blue text-white border-b-4 border-blue-600 active:border-b-0 active:translate-y-1",
            outline: "bg-white text-gray-800 border-2 border-gray-200 hover:border-candy-pink hover:text-candy-pink",
            ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
        };

        const sizes = {
            sm: "px-3 py-1 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        return (
            <motion.button
                ref={ref}
                className={cn(
                    "rounded-full font-bold transition-colors duration-200 flex items-center justify-center gap-2",
                    variants[variant],
                    sizes[size],
                    className
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
