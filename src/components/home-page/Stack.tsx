import TechStackIcons from "@/components/TechStackIcons";
import { motion } from "framer-motion";

const headingVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
    },
};

const accentVariants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.6, ease: "easeOut", delay: 0.5 },
    },
};

const Stack = () => {
    return (
        <section 
            id="tech-stack" 
            className="w-full px-6 md:px-14 lg:px-40 xl:px-60 2xl:px-72 min-h-screen flex flex-col justify-center items-center"
        >
            <motion.div 
                className="text-center max-w-5xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.h2 
                    className="text-4xl md:text-7xl font-bold text-neutral-950 dark:text-neutral-50 font-bebas"
                    variants={headingVariants}
                >
                    Tech Stack
                </motion.h2>

                <motion.div
                    className="w-20 h-1 bg-neutral-950 dark:bg-yellow-400 mx-auto mt-4 rounded-full origin-center"
                    variants={accentVariants}
                />

                <motion.p 
                    className="font-roboto mt-4 lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl md:leading-relaxed md:tracking-wide text-justify"
                    variants={subtitleVariants}
                >
                    I have experience in full-stack development, building scalable and high-performance applications with modern technologies. I work with both front-end and back-end technologies. Below are the technologies I use in my workflow.
                </motion.p>

                <TechStackIcons />
            </motion.div>
        </section>
    )
}

export default Stack