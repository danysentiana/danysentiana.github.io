import { allTechIcons } from "@/data/techIcons";
import { motion } from "framer-motion";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

import useIsTouchDevice from "@/hooks/useIsTouchDevice";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.6,
        },
    },
};

const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
        },
    },
};

const TechStackIcons = () => {
    const isTouch = useIsTouchDevice();
    
    const content = (
        <motion.div 
            className="mt-8 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-9 gap-6 border rounded-2xl p-6 shadow bg-neutral-100 dark:bg-neutral-900"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {allTechIcons.map((icon) => (
                <motion.div 
                    key={icon.title} 
                    className="flex justify-center items-center align-middle place-items-center content-center"
                    variants={iconVariants}
                    whileHover={{ 
                        scale: 1.2, 
                        y: -4,
                        transition: { type: "spring", stiffness: 300, damping: 15 }
                    }}
                >
                    {isTouch ? (
                        <Popover>
                            <PopoverTrigger>
                                <svg 
                                    className="w-10 h-10 md:w-12 md:h-12"
                                    viewBox="0 0 24 24" 
                                    fill="none"
                                >
                                    <path 
                                        d={icon.path} 
                                        fill={`#${icon.hex}`} 
                                        className="dark:fill-neutral-50" 
                                    />
                                </svg>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto px-2 py-1 text-sm font-semibold rounded-md">
                                {icon.title}
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <Tooltip>
                            <TooltipTrigger>
                                <svg 
                                    className="w-10 h-10 md:w-12 md:h-12"
                                    viewBox="0 0 24 24" 
                                    fill="none"
                                >
                                    <path 
                                        d={icon.path} 
                                        fill={`#${icon.hex}`} 
                                        className="dark:fill-neutral-50" 
                                    />
                                </svg>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-sm font-semibold">{icon.title}</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </motion.div>
            ))}
        </motion.div>
    );
    
    if (isTouch) return content;
    
    return <TooltipProvider delayDuration={0}>{content}</TooltipProvider>;
};

export default TechStackIcons;