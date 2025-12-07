"use client";

import * as React from "react";

export function Footer() {
    return (
        <footer className="bg-white py-12 border-t border-gray-100">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-500 font-medium">
                    © {new Date().getFullYear()} Kazuya Masaki. All rights reserved.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                    Built with Next.js, Tailwind CSS, and AI Agents.
                </p>
            </div>
        </footer>
    );
}
