import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile-pic.jpeg";
import { Typewriter } from 'react-simple-typewriter';
import { ArrowDownToLine, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
            staggerChildren: 0.15,
            delayChildren: 1.2,
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
    return (
        <>
            <motion.section 
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
                            <span className="text-blue-500 dark:text-yellow-400">
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
                            className="flex justify-center lg:justify-start w-full mt-8 lg:mt-2 lg:pt-4"
                            variants={buttonContainerVariants}
                        >
                            <motion.div variants={buttonItemVariants}>
                                <Button asChild variant={"outline"} size={"xl"} className="font-roboto rounded-4xl px-11 py-4 flex items-center bg-neutral-950 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950 hover:bg-neutral-700 hover:text-neutral-50 dark:hover:bg-neutral-100">
                                    <Link to={"/projects"}> My Projects <ChevronRight className="w-6 h-6" /> </Link>
                                </Button>
                            </motion.div>

                            <motion.div variants={buttonItemVariants}>
                                <a href="/files/CV_DANY_SENTIANA.pdf" download>
                                    <Button variant="outline" size="xl" className="ml-2 font-roboto rounded-4xl px-11 py-4 flex items-center">
                                        Download CV <ArrowDownToLine className="w-6 h-6 ml-2" />
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
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <motion.img 
                                src={profileImage} 
                                alt="Profile" 
                                loading="lazy" 
                                decoding="async" 
                                className="w-full max-w-xs lg:max-w-md h-auto rounded-2xl"
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