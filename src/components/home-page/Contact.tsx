import ContactModal from "@/components/ContactModal";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const headingVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: "easeOut", delay: 0.3 },
    },
};

const accentVariants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.5, ease: "easeOut", delay: 0.5 },
    },
};

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay: 0.6 },
    },
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut", delay: 0.8 },
    },
};

const Contact = () => {
    return (
        <section id="contact" className="w-full px-6 lg:px-40 2xl:px-80 my-32">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col gap-2 md:flex-row w-full justify-between container shadow border rounded-xl p-7 md:p-20 mx-auto bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden"
            >
                {/* Animated background glow */}
                <motion.div
                    className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20 dark:opacity-10 blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(circle, #3f4c6b, transparent)" }}
                    animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.35, 0.2],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-15 dark:opacity-10 blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(circle, #606c88, transparent)" }}
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                {/* Left - Text */}
                <div className="w-full md:basis-6/12 text-center md:text-start flex flex-col justify-center">
                    <motion.h1 
                        className="font-bebas text-4xl md:text-7xl font-bold mb-3"
                        variants={headingVariants}
                    >
                        Contact Me
                    </motion.h1>
                    <motion.div
                        className="w-16 h-1 bg-neutral-950 dark:bg-yellow-400 rounded-full origin-center md:origin-left mx-auto md:mx-0"
                        variants={accentVariants}
                    />
                    <motion.p 
                        className="font-roboto text-base md:text-lg text-justify text-gray-600 dark:text-gray-300 max-w-3xl mt-4"
                        variants={textVariants}
                    >
                        If you have any questions or would like to work together, please don't hesitate to contact me. I look forward to hearing from you!
                    </motion.p>
                </div>

                {/* Right - Button */}
                <motion.div 
                    className="w-full md:basis-6/12 flex items-center justify-center md:justify-end"
                    variants={buttonVariants}
                >
                    <motion.div
                        animate={{ 
                            boxShadow: [
                                "0 0 0 0 rgba(59, 130, 246, 0)",
                                "0 0 0 10px rgba(59, 130, 246, 0.1)",
                                "0 0 0 0 rgba(59, 130, 246, 0)",
                            ],
                        }}
                        transition={{ 
                            duration: 2.5, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: 1.5,
                        }}
                        className="rounded-full"
                    >
                        <ContactModal />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Contact