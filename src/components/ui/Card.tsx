"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    "bg-white rounded-[2rem] p-6 shadow-lg border-2 border-gray-100",
                    "hover:border-candy-blue/30 hover:shadow-xl transition-colors",
                    className
                )}
                whileHover={{
                    y: -5,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);
Card.displayName = "Card";

export { Card };
