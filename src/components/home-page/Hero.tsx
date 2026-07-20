import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile-pic.jpeg";
import { Typewriter } from 'react-simple-typewriter';
import { ArrowDownToLine, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Staggered container for text elements
const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

// Individual text line animation
const textItemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

// Button stagger animation
const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.3,
        },
    },
};

const buttonItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    // Parallax transforms
    const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <>
            <motion.section 
                ref={sectionRef}
                id="hero" 
                className="w-full px-14 lg:px-40 xl:px-60 2xl:px-72 md:flex md:mx-auto md:justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <div className="container bg-transparent py-28 lg:min-h-screen flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center lg:space-x-10">
                    <motion.div 
                        className="hero-text w-full text-left md:justify-items-center lg:justify-items-start"
                        variants={textContainerVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ y: textY }}
                    >
                        <motion.p 
                            className="text-3xl md:text-2xl lg:text-xl xl:text-2xl font-roboto text-neutral-800 dark:text-neutral-50 mb-2 mt-3"
                            variants={textItemVariants}
                        >
                            Hello, I'm Danys
                        </motion.p>

                        <motion.h1 
                            className="text-5xl md:text-8xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-neutral-950 dark:text-neutral-50 font-bebas font-semibold whitespace-nowrap"
                            variants={textItemVariants}
                        >
                            A Tech Enthusiast
                        </motion.h1>

                        <motion.h1 
                            className="text-5xl md:text-8xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-neutral-950 dark:text-neutral-50 font-bebas font-semibold whitespace-nowrap"
                            variants={textItemVariants}
                        >
                            Focusing on <br className="block md:hidden" />
                            <span className="text-neutral-950 dark:text-yellow-400">
                                <Typewriter
                                    words={[' Web', ' Back End']}
                                    loop={true}
                                    cursor
                                    cursorStyle="."
                                    typeSpeed={200}
                                    deleteSpeed={100}
                                    delaySpeed={1000}
                                />
                            </span>
                        </motion.h1>

                        <motion.div
                            className="flex flex-col sm:flex-row justify-center lg:justify-start w-full gap-3 sm:gap-4 mt-8 lg:mt-2 lg:pt-4"
                            variants={buttonContainerVariants}
                        >
                            <motion.div
                                variants={buttonItemVariants}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full sm:w-auto"
                            >
                                <Button asChild variant={"outline"} size={"xl"} className="group w-full sm:w-auto font-roboto rounded-4xl px-6 py-3 sm:px-8 lg:px-9 sm:py-3.5 text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 bg-neutral-950 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950 hover:bg-neutral-700 hover:text-neutral-50 dark:hover:bg-neutral-100 transition-colors duration-300">
                                    <Link to={"/projects"}>
                                        My Projects
                                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                                    </Link>
                                </Button>
                            </motion.div>

                            <motion.div
                                variants={buttonItemVariants}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full sm:w-auto"
                            >
                                <a href="/files/CV_DANY_SENTIANA.pdf" download className="group block">
                                    <Button variant="outline" size="xl" className="w-full sm:w-auto font-roboto rounded-4xl px-6 py-3 sm:px-8 lg:px-9 sm:py-3.5 text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2">
                                        Download CV
                                        <ArrowDownToLine className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-y-1" />
                                    </Button>
                                </a>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="flex justify-center lg:w-1/2"
                        initial={{ opacity: 0, scale: 0.8, x: 60 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                        style={{ y: imageY, scale: imageScale }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative"
                        >
                            {/* Glow behind image — Ash color scheme */}
                            {/* <motion.div
                                className="absolute inset-0 rounded-2xl blur-3xl opacity-10 md:opacity-30 dark:opacity-100 dark:md:opacity-20"
                                style={{
                                    background: "linear-gradient(135deg, #3f4c6b, #606c88)",
                                }}
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            /> */}
                            <motion.img 
                                src={profileImage} 
                                alt="Profile" 
                                loading="lazy" 
                                decoding="async" 
                                className="w-full max-w-xs lg:max-w-md h-auto rounded-2xl relative z-10"
                                animate={{ 
                                    y: [0, -8, 0],
                                }}
                                transition={{ 
                                    duration: 4, 
                                    repeat: Infinity, 
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </>
    )
}

export default Hero