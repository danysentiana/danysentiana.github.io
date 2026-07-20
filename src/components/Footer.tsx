import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
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

const socialLinks = [
    { name: "GitHub", icon: faGithub, url: "https://github.com/danysentiana", external: true },
    { name: "LinkedIn", icon: faLinkedin, url: "https://www.linkedin.com/in/danysentiana/", external: true },
    { name: "WhatsApp", icon: faWhatsapp, url: "https://wa.me/6285174378840", external: true },
    { name: "Email", icon: faEnvelope, url: "mailto:danysentiana1200@gmail.com" },
    { name: "Phone", icon: faPhone, url: "tel:+6285117326543" }
];

const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.08,
            delayChildren: 0.3,
        },
    },
};

const iconVariants = {
    hidden: { opacity: 0, scale: 0, y: 10 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
        },
    },
};

const dividerVariants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
};

const Footer = () => {
    const isTouch = useIsTouchDevice();

    const content = (
        <footer className="w-full px-5 lg:px-40 xl:px-72 flex justify-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="container flex flex-col justify-between items-center py-5 px-5 md:py-7 border shadow-md bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-neutral-50 rounded-t-3xl md:rounded-t-4xl gap-4"
            >
                {/* Main Row: Text Left | Icons Right */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Copyright - Left */}
                    <motion.p
                        className="text-center md:text-left font-roboto text-[12px] md:text-[16px] order-2 md:order-1"
                        variants={iconVariants}
                    >
                        This site was made with{" "}
                        <motion.span
                            className="inline-block"
                            animate={{
                                scale: [1, 1.3, 1],
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatDelay: 0.8,
                            }}
                        >
                            <FontAwesomeIcon icon={faHeart} size="1x" className="text-red-500" />
                        </motion.span>{" "}
                        by me, Dany Sentiana © {new Date().getFullYear()}
                    </motion.p>

                    {/* Social Icons - Right */}
                    <div className="flex justify-center gap-1.5 order-1 md:order-2">
                        {socialLinks.map((social) => (
                            <motion.div
                                key={social.name}
                                variants={iconVariants}
                                whileHover={{
                                    scale: 1.2,
                                    y: -3,
                                    transition: { type: "spring", stiffness: 400, damping: 15 }
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Button
                                    asChild
                                    size={"icon"}
                                    variant={"outline"}
                                    className="rounded-full dark:border-neutral-800 hover:bg-neutral-950 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-950 transition-colors duration-300"
                                >
                                    <Link
                                        to={social.url}
                                        target={social.external ? "_blank" : undefined}
                                        rel={social.external ? "noopener noreferrer" : undefined}
                                        aria-label={social.name}
                                    >
                                        <FontAwesomeIcon icon={social.icon} size="1x"/>
                                    </Link>
                                </Button>
                            </motion.div>
                        ))}

                        <motion.div
                            variants={iconVariants}
                            whileHover={{
                                scale: 1.2,
                                y: -3,
                                transition: { type: "spring", stiffness: 400, damping: 15 }
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isTouch ? (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button size={"icon"} variant={"outline"} className="rounded-full dark:border-neutral-800 hover:bg-neutral-950 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-950 cursor-pointer transition-colors duration-300">
                                            <FontAwesomeIcon icon={faLocationDot} size="1x"/>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent side="top" className="w-auto px-2 py-1 text-sm font-semibold rounded-md">
                                        <p>Depok, Indonesia</p>
                                    </PopoverContent>
                                </Popover>
                            ) : (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button size={"icon"} variant={"outline"} className="rounded-full dark:border-neutral-800 hover:bg-neutral-950 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-950 cursor-pointer transition-colors duration-300">
                                            <FontAwesomeIcon icon={faLocationDot} size="1x"/>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Depok, Indonesia</p>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Animated Divider - mobile only */}
                <motion.div
                    className="w-full h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent origin-center md:hidden"
                    variants={dividerVariants}
                />
            </motion.div>
        </footer>
    );

    if (isTouch) return content;

    return <TooltipProvider delayDuration={0}>{content}</TooltipProvider>;
}

export default Footer
