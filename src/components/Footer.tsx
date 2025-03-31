import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer className="w-full px-5 lg:px-40">
            <div className="container pt-4 pb-4 md:py-5 border-t shadow-sm bg-white dark:bg-neutral-50 text-neutral-950 dark:text-neutral-950 rounded-t-3xl flex flex-col gap-2 justify-center">
                <div className="flex justify-center gap-1">
                    <Button size={"icon"} variant={"outline"} className="rounded-full">
                        <FontAwesomeIcon icon={faGithub} size="1x"/>
                    </Button>
                    <Button size={"icon"} variant={"outline"} className="rounded-full">
                        <FontAwesomeIcon icon={faLinkedin} size="1x"/>
                    </Button>
                    <Button size={"icon"} variant={"outline"} className="rounded-full">
                        <FontAwesomeIcon icon={faInstagram} size="1x"/>
                    </Button>
                    <Button size={"icon"} variant={"outline"} className="rounded-full">
                        <FontAwesomeIcon icon={faEnvelope} size="1x"/>
                    </Button>
                    <Button size={"icon"} variant={"outline"} className="rounded-full">
                        <FontAwesomeIcon icon={faPhone} size="1x"/>
                    </Button>
                </div>
                <p className="text-center font-roboto text-sm">Dany Sentiana © { new Date().getFullYear() }</p>
            </div>
            
        </footer>
    )
}

export default Footer