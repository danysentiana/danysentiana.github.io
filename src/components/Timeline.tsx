import { journeyData } from "@/data/journey";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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

export default function Timeline() {
    const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

    return (
        <section 
            id="timeline" 
            className="px-8 pb-32 md:pb-5 md:px-14 lg:px-40 xl:px-60 2xl:px-72 min-h-screen overflow-hidden"
        >
            <div className="container max-w-5xl mx-auto">
                <div className="flex flex-wrap">
                    <div className="w-full">
                        {/* Section Heading */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="flex flex-col text-center items-center"
                        >
                            <motion.h2 
                                className="text-4xl md:text-7xl font-bold text-neutral-950 dark:text-neutral-50 font-bebas"
                                variants={headingVariants}
                            >
                                Experience
                            </motion.h2>
                            <motion.div
                                className="w-20 h-1 bg-blue-500 dark:bg-yellow-400 mt-4 rounded-full origin-center"
                                variants={accentVariants}
                            />
                            <motion.p 
                                className="max-w-3xl mt-4 font-roboto text-lg md:text-xl text-gray-600 dark:text-gray-300 md:leading-relaxed md:tracking-wide text-justify"
                                variants={subtitleVariants}
                            >
                                Career and education timeline
                            </motion.p>
                        </motion.div>
                        
                        {/* Timeline */}
                        <div className="mt-16 space-y-8 relative">        
                            {/* Animated vertical line */}
                            <motion.div 
                                className="absolute inset-0 ml-5 -translate-x-px md:mx-auto md:translate-x-0 h-full w-0.5 bg-gradient-to-b from-transparent via-slate-300 to-transparent origin-top"
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                            />

                            {journeyData.map((item, idx) => {
                                const isExpanded = expandedCardId === item.id;

                                return (
                                    <motion.div 
                                        key={item.id} 
                                        initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                                    >
                                        {/* Icon circle - pop in */}
                                        <motion.div 
                                            className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border bg-neutral-100 dark:bg-neutral-900 group-[.is-active]:bg-emerald-500 text-neutral-800 dark:text-neutral-50 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: idx * 0.15 + 0.2 }}
                                        >
                                            <item.icon className="w-6 h-6" />
                                        </motion.div>

                                        {/* Card with hover lift */}
                                        <motion.div
                                            whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="w-[calc(100%-4rem)] md:w-[calc(50%-3.5rem)]"
                                        >
                                            <Card className="py-6 md:px-4 bg-neutral-100 dark:bg-neutral-900 shadow cursor-pointer">
                                                <CardContent className="flex flex-col">
                                                    <div className="flex flex-col items-start justify-between space-x-2 mb-1">
                                                        <div className="font-bold text-sm md:text-base">{item.companyOrSchool}</div>
                                                        <p className="text-xs text-primary-500 mt-1">{item.title}</p>
                                                        <p className="text-xs text-primary-500 mt-1">{item.date} | {item.type}</p>
                                                    </div>
                                                    
                                                    <div 
                                                        onClick={() => setExpandedCardId(isExpanded ? null : item.id)} 
                                                        className="mt-2 text-sm overflow-hidden"
                                                    >
                                                        <AnimatePresence mode="wait">
                                                            <motion.div
                                                                key={isExpanded ? "expanded" : "collapsed"}
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <p className={isExpanded ? "" : "line-clamp-2"}>
                                                                    {item.description}
                                                                </p>
                                                                <span className="text-xs text-blue-500 dark:text-yellow-400 mt-1 inline-block">
                                                                    {isExpanded ? "Show less" : "Read more..."}
                                                                </span>
                                                            </motion.div>
                                                        </AnimatePresence>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>   
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}