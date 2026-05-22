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
        "Hello everyone, I am a recent graduate with a Bachelor's degree in Information System. My passion for coding and web development has driven me to become a web developer. As a beginner in this field, I am eager to learn and grow my skills.",
        "During my studies, I have learned various programming languages. I am constantly looking to expand my knowledge and expertise in web development, which has led me to explore the latest trends in the industry. I enjoy collaborating with other developers and designers to create innovative and engaging websites.",
        "In my free time, I enjoy working on personal coding projects and learning new coding languages. Thank you for visiting my portfolio website. I am excited about the opportunities to work with others in this industry and I am eager to apply my knowledge and skills to create high-quality websites."
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