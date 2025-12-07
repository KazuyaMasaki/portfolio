"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import Matter from "matter-js";

export function PhysicsHero() {
    const sceneRef = React.useRef<HTMLDivElement>(null);
    const engineRef = React.useRef<Matter.Engine | null>(null);
    const renderRef = React.useRef<Matter.Render | null>(null);
    const runnerRef = React.useRef<Matter.Runner | null>(null);

    React.useEffect(() => {
        if (!sceneRef.current) return;

        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events;

        // Create engine
        const engine = Engine.create();
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: "transparent",
                wireframes: false,
                pixelRatio: window.devicePixelRatio,
            },
        });
        renderRef.current = render;

        // Create bodies (Skills)
        // Create bodies (Skills)
        // Skills sorted by proficiency (Desc) as requested:
        // JavaScript, CSS, xslate, TypeScript, AI Agent, Unity, Vue, React, GSAP, C#, Animation
        const skills = [
            { label: "JavaScript", color: "#F7DF1E", radius: 55 },
            { label: "CSS", color: "#264DE4", radius: 52 },
            { label: "xslate", color: "#000000", radius: 50 },
            { label: "TypeScript", color: "#3178C6", radius: 48 },
            { label: "AI Agent", color: "#FF69B4", radius: 46 },
            { label: "Unity", color: "#808080", radius: 44 },
            { label: "Vue", color: "#4FC08D", radius: 42 },
            { label: "React", color: "#61DAFB", radius: 40 },
            { label: "GSAP", color: "#88CE02", radius: 38 },
            { label: "C#", color: "#9B4F96", radius: 36 },
            { label: "Animation", color: "#FF5733", radius: 34 },
        ];

        const bodies = skills.map((skill) => {
            const x = Math.random() * (window.innerWidth - 100) + 50;
            const y = Math.random() * -500 - 50; // Start above screen
            return Bodies.circle(x, y, skill.radius, {
                restitution: 0.9, // Bouncy
                friction: 0.005,
                density: 0.04,
                render: {
                    fillStyle: skill.color,
                    strokeStyle: "#ffffff",
                    lineWidth: 3,
                },
                label: skill.label,
            });
        });

        // Create walls
        const wallOptions = { isStatic: true, render: { visible: false } };
        const ground = Bodies.rectangle(
            window.innerWidth / 2,
            window.innerHeight + 50,
            window.innerWidth,
            100,
            wallOptions
        );
        const leftWall = Bodies.rectangle(
            -50,
            window.innerHeight / 2,
            100,
            window.innerHeight,
            wallOptions
        );
        const rightWall = Bodies.rectangle(
            window.innerWidth + 50,
            window.innerHeight / 2,
            100,
            window.innerHeight,
            wallOptions
        );

        Composite.add(engine.world, [...bodies, ground, leftWall, rightWall]);

        // Add mouse control
        const mouse = Mouse.create(render.canvas);

        // Disable mouse wheel capture to allow scrolling
        // @ts-expect-error - Matter.js types might not include this internal property
        mouse.element.removeEventListener("wheel", mouse.mousewheel);
        // @ts-expect-error - Matter.js types might not include this internal property
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        });
        Composite.add(engine.world, mouseConstraint);

        // Keep the mouse in sync with rendering
        render.mouse = mouse;

        // Run the engine
        Render.run(render);
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        // Interaction Feedback & Auto-movement
        Events.on(runner, "beforeUpdate", () => {
            const time = engine.timing.timestamp;

            // Auto-movement: Randomly push bodies slightly
            if (Math.floor(time) % 2000 < 20) { // Every ~2 seconds
                bodies.forEach((body) => {
                    if (Math.random() > 0.7) {
                        Matter.Body.applyForce(body, body.position, {
                            x: (Math.random() - 0.5) * 0.005,
                            y: -0.005 * Math.random(),
                        });
                    }
                });
            }

            // Respawn logic: If balls fall out of world (due to resize/scroll bugs), reset them
            const bottomLimit = window.innerHeight + 200;
            bodies.forEach((body) => {
                if (body.position.y > bottomLimit) {
                    Matter.Body.setPosition(body, {
                        x: Math.random() * (window.innerWidth - 100) + 50,
                        y: -50 - Math.random() * 200
                    });
                    Matter.Body.setVelocity(body, { x: 0, y: 0 });
                }
            });
        });

        // Change cursor on hover
        Events.on(mouseConstraint, "mousemove", (event) => {
            const mousePosition = event.mouse.position;
            const hoveredBody = Matter.Query.point(bodies, mousePosition)[0];
            if (hoveredBody) {
                render.canvas.style.cursor = "grab";
            } else {
                render.canvas.style.cursor = "default";
            }
        });

        Events.on(mouseConstraint, "startdrag", () => {
            render.canvas.style.cursor = "grabbing";
        });

        Events.on(mouseConstraint, "enddrag", () => {
            render.canvas.style.cursor = "grab";
        });

        // Custom rendering for text labels
        Events.on(render, "afterRender", () => {
            const context = render.context;
            context.font = "bold 14px 'M PLUS Rounded 1c', sans-serif";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "#ffffff";

            bodies.forEach((body, index) => {
                const { x, y } = body.position;
                context.save();
                context.translate(x, y);
                context.rotate(body.angle);
                context.fillText(skills[index].label, 0, 0);
                context.restore();
            });
        });

        // Handle resize
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                render.canvas.width = window.innerWidth;
                render.canvas.height = window.innerHeight;

                // Reposition walls
                Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + 50 });
                Matter.Body.setVertices(ground, Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100).vertices);

                Matter.Body.setPosition(rightWall, { x: window.innerWidth + 50, y: window.innerHeight / 2 });
                Matter.Body.setPosition(leftWall, { x: -50, y: window.innerHeight / 2 });

                // Also update wall dimensions if needed (height)
                Matter.Body.setVertices(rightWall, Matter.Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight).vertices);
                Matter.Body.setVertices(leftWall, Matter.Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight).vertices);

            }, 300); // Throttle resize
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            Composite.clear(engine.world, false);
            Engine.clear(engine);
        };
    }, []);

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Physics Canvas Container */}
            <div ref={sceneRef} className="absolute inset-0 z-0 touch-pan-y" style={{ touchAction: "pan-y" }} />

            {/* Overlay Content */}
            <div className="container mx-auto px-4 z-10 text-center pointer-events-none">
                <div className="w-full flex justify-center mb-4 pointer-events-none">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="text-4xl md:text-6xl font-heading font-bold text-gray-900 leading-tight drop-shadow-sm bg-white/30 backdrop-blur-sm rounded-3xl p-4 inline-block"
                    >
                        Building the Future with <br />
                        <span className="text-candy-pink">AI</span> × <span className="text-candy-blue">Frontend</span> × <span className="text-candy-yellow">Game</span>
                    </motion.h1>
                </div>

                <div className="w-full flex justify-center mb-6 pointer-events-auto">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2
                        }}
                        className="inline-block"
                    >
                        <span className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-candy-lime font-bold text-sm border-2 border-candy-lime/50 flex items-center gap-2 mx-auto w-fit shadow-sm">
                            <Sparkles className="w-4 h-4" />
                            AI-Native Frontend Engineer
                        </span>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="text-lg md:text-xl text-gray-700 mb-8 max-w-4xl mx-auto font-medium bg-white/30 backdrop-blur-sm rounded-xl p-4 leading-relaxed"
                >
                    コードを書くプログラマーから、UXを創造するエンジニアへ。<br className="hidden md:block" />
                    AIエージェントを操り、圧倒的なスピードでユーザーにWebとゲームの新しい体験を届けます。
                </motion.p>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4 pointer-events-auto"
                >
                    <Button size="lg" className="w-full md:w-auto group shadow-lg" onClick={() => document.getElementById('interests')?.scrollIntoView({ behavior: 'smooth' })}>
                        View Interests
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button size="lg" variant="outline" className="w-full md:w-auto bg-white/80 backdrop-blur-sm shadow-lg">
                        Read My Philosophy
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-6 flex flex-col items-center gap-2"
                >
                    <p className="text-sm text-gray-500 font-bold bg-white/50 backdrop-blur-sm rounded-full px-4 py-1 animate-bounce">
                        👇 Drag & Drop the Skills! 👇
                    </p>
                    <p className="text-xs text-gray-400">
                        * This portfolio itself was built in collaboration with AI agents.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
