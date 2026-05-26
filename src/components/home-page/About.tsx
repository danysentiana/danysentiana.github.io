import { motion } from "framer-motion"

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

const paragraphContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.4,
        },
    },
};

const paragraphChunkVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const About = () => {
    const paragraphs = [
        "Hello everyone, I hold a Bachelor's degree in Information Systems and have over 2 years of professional experience as a web developer. What started as a passion for coding has grown into a career where I continuously sharpen my skills and deliver meaningful digital solutions.",
        "Over the years, I've worked with various programming languages and modern web technologies. I enjoy collaborating with other developers and designers to build innovative, high-quality websites. Currently, I'm exploring agentic AI and integrating AI-powered tools into my workflow to stay ahead of the curve and boost productivity.",
        "Beyond work, I love taking on personal projects and experimenting with new technologies. Thank you for visiting my portfolio — I'm excited about the opportunities ahead and always open to collaborating on impactful projects."
    ];

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
                    className="w-20 h-1 bg-blue-500 dark:bg-yellow-400 mx-auto mt-4 rounded-full origin-center"
                    variants={accentVariants}
                />

                <motion.div 
                    className="font-roboto mt-6 lg:text-xl text-neutral-600 dark:text-gray-300 md:leading-relaxed md:tracking-wide text-justify space-y-4"
                    variants={paragraphContainerVariants}
                >
                    {paragraphs.map((text, index) => (
                        <motion.p key={index} variants={paragraphChunkVariants}>
                            {text}
                        </motion.p>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}

export default About