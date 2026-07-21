import { motion } from "framer-motion"
import { Terminal, TypingAnimation, AnimatedSpan, TerminalCursor } from "@/components/ui/terminal"

const headingVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

const accentVariants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.6, ease: "easeOut", delay: 0.5 },
    },
};

const About = () => {
    return (
        <section
            id="about"
            className="w-full px-6 md:px-14 lg:px-40 xl:px-60 2xl:px-72 min-h-screen flex justify-center items-center relative overflow-hidden"
        >
            {/* Floating gradient decorations */}
            <motion.div
                className="absolute top-20 -left-20 w-72 h-72 rounded-full opacity-20 dark:opacity-10 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #3f4c6b, transparent)" }}
                animate={{ 
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 -right-20 w-96 h-96 rounded-full opacity-15 dark:opacity-10 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #606c88, transparent)" }}
                animate={{ 
                    x: [0, -25, 0],
                    y: [0, 25, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div 
                className="text-center max-w-5xl relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.h2 
                    className="text-4xl md:text-7xl font-bold text-neutral-950 dark:text-neutral-50 font-bebas"
                    variants={headingVariants}
                >
                    About Me
                </motion.h2>

                <motion.div
                    className="w-20 h-1 bg-neutral-950 dark:bg-yellow-400 mx-auto mt-4 rounded-full origin-center"
                    variants={accentVariants}
                />

                <motion.div
                    className="mt-8 max-w-3xl mx-auto text-left"
                    variants={accentVariants}
                >
                    <Terminal>
                        <div>
                            <span className="text-green-400">$</span>{" "}
                            <TypingAnimation delay={150} duration={28}>whoami</TypingAnimation>
                        </div>
                        <AnimatedSpan delay={450} className="text-neutral-300">
                            Dany Sentiana — Back End-leaning Full-Stack Developer based in Depok, Indonesia
                        </AnimatedSpan>

                        <div>
                            <span className="text-green-400">$</span>{" "}
                            <TypingAnimation delay={950} duration={22}>cat about.txt</TypingAnimation>
                        </div>
                        <AnimatedSpan delay={1400} className="text-neutral-300">
                            Bachelor's degree in Information Systems, 2+ years professional experience
                            building web applications. Started as a passion for coding, grew into a
                            career of continuous learning.
                        </AnimatedSpan>

                        <div>
                            <span className="text-green-400">$</span>{" "}
                            <TypingAnimation delay={1900} duration={22}>cat currently.txt</TypingAnimation>
                        </div>
                        <AnimatedSpan delay={2450} className="text-neutral-300">
                            Exploring agentic AI, integrating AI-powered tools into my workflow to stay
                            ahead of the curve and boost productivity.
                        </AnimatedSpan>

                        <div>
                            <span className="text-green-400">$</span>{" "}
                            <TypingAnimation delay={2950} duration={25}>echo $STATUS</TypingAnimation>
                        </div>
                        <AnimatedSpan delay={3400} className="text-neutral-300">
                            Open to collaborating on impactful projects. Thanks for stopping by 👋
                            <TerminalCursor delay={3400} />
                        </AnimatedSpan>
                    </Terminal>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default About