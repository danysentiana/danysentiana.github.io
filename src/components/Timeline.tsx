import { journeyData } from "@/data/journey";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Timeline() {
    const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

    return (
        <section 
            id="timeline" 
            className="px-8 pb-32 md:pb-5 md:px-14 lg:px-40 xl:px-60 2xl:px-72 min-h-screen"
        >
            <div className="container max-w-5xl mx-auto">
                <div className="flex flex-wrap">
                    <div className="w-full">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}  
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="flex flex-col text-center items-center"
                        >
                            <h2 className="text-4xl md:text-7xl font-bold text-neutral-950 dark:text-neutral-50 font-bebas">Experience</h2>
                            <p className="max-w-3xl mt-4 font-robotolg:text-xl text-gray-600 dark:text-gray-300 md:leading-relaxed md:tracking-wide text-justify">
                                Career and education timeline
                            </p>
                        </motion.div>
                        
                        <div className="mt-16 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">        
                        {journeyData.map((item, idx) => (
                            <motion.div 
                                key={item.id} 
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.2 }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                            >
                                <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border bg-neutral-100 dark:bg-neutral-900 group-[.is-active]:bg-emerald-500 text-neutral-800 dark:text-neutral-50 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                    <item.icon className="w-6 h-6" />
                                </div>

                                <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-3.5rem)] py-6 md:px-4 bg-neutral-100 dark:bg-neutral-900 shadow">
                                    <CardContent className="flex flex-col">
                                        <div className="flex flex-col items-start justify-between space-x-2 mb-1">
                                            <div className="font-bold text-sm md:text-base">{item.companyOrSchool}</div>
                                            <p className="text-xs text-primary-500 mt-1">{item.title}</p>
                                            <p className="text-xs text-primary-500 mt-1">{item.date} | {item.type}</p>
                                        </div>
                                        
                                        <p 
                                            onClick={() => setExpandedCardId(expandedCardId === item.id ? null : item.id)} 
                                            className={`mt-2 text-sm ${expandedCardId === item.id ? "" : "line-clamp-2"}`} 
                                        >
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>   
                        ))}

                        </div>

                    </div>

                </div>
            </div>

        </section>
    );
}
