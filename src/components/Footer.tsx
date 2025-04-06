import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faLocationDot, faHeart } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const socialLinks = [
    { name: "GitHub", icon: faGithub, url: "https://github.com", external: true },
    { name: "LinkedIn", icon: faLinkedin, url: "https://linkedin.com", external: true },
    { name: "Instagram", icon: faInstagram, url: "https://instagram.com", external: true },
    { name: "Email", icon: faEnvelope, url: "mailto:example@email.com" },
    { name: "Phone", icon: faPhone, url: "tel:+1234567890" }
];

const Footer = () => {
    return (
        <footer className="w-full px-5 lg:px-40">
            <div className="container flex flex-col-reverse md:flex-row justify-between items-center py-4 px-5 md:py-5 border-t shadow-sm bg-white dark:bg-neutral-50 text-neutral-950 dark:text-neutral-950 rounded-t-3xl gap-3">
                <p className="text-center font-roboto text-[12px] md:text-sm">This web was made with <FontAwesomeIcon icon={faHeart} size="1x" className="text-red-500" /> by me, Dany Sentiana © { new Date().getFullYear() }</p>

                <div className="flex justify-center gap-1">
                    {socialLinks.map((social) => (
                        <Button 
                            key={social.name} 
                            asChild 
                            size={"icon"} 
                            variant={"outline"} 
                            className="rounded-full dark:border-neutral-200 hover:text-neutral-600"
                        >
                            {/* <Link 
                                to={social.url} 
                                target={social.external ? "_blank" : undefined} 
                                rel={social.external ? "noopener noreferrer" : undefined} 
                                aria-label={social.name}
                            >
                                <FontAwesomeIcon icon={social.icon} size="1x"/>
                            </Link> */}
                        </Button>
                    ))}
                    
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size={"icon"} variant={"outline"} className="rounded-full dark:border-neutral-200 hover:text-neutral-600">
                                    <FontAwesomeIcon icon={faLocationDot} size="1x"/>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Depok, Indonesia</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </footer>
    )
}

export default Footer