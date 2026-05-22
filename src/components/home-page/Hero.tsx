import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile-pic.jpeg";
import { Typewriter } from 'react-simple-typewriter';
import { ArrowDownToLine, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <>
            <motion.section 
                id="hero" 
                className="w-full px-14 lg:px-40 xl:px-60 2xl:px-72 md:flex md:mx-auto md:justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <div className="container bg-transparent py-28 lg:min-h-screen flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center lg:space-x-10">
                    <div className="hero-text w-full text-left md:justify-items-center lg:justify-items-start">
                        <p className="text-3xl md:text-2xl lg:text-xl xl:text-2xl font-roboto text-neutral-800 dark:text-neutral-50 mb-2 mt-3">
                            Hello, I'm Danys
                        </p>

                        <h1 className="text-5xl md:text-8xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-neutral-950 dark:text-neutral-50 font-bebas font-semibold whitespace-nowrap">
                            A Tech Enthusiast
                        </h1>

                        <h1 className="text-5xl md:text-8xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-neutral-950 dark:text-neutral-50 font-bebas font-semibold whitespace-nowrap">
                            Focusing on <br className="block md:hidden" />
                            <span className="text-blue-500 dark:text-yellow-400">
                                <Typewriter
                                    words={[' Web', ' Back End']}
                                    loop={true}
                                    cursor
                                    cursorStyle="."
                                    typeSpeed={200} // Speed of typing
                                    deleteSpeed={100} // Speed of deleting
                                    delaySpeed={1000} // Delay before next word
                                />
                            </span>
                        </h1>

                        <div className="flex justify-center lg:justify-start w-full mt-8 lg:mt-2 lg:pt-4">
                            <Button asChild variant={"outline"} size={"xl"} className="font-roboto rounded-4xl px-11 py-4 flex items-center bg-neutral-950 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950 hover:bg-neutral-700 hover:text-neutral-50 dark:hover:bg-neutral-100">
                                <Link to={"/projects"}> My Projects <ChevronRight className="w-6 h-6" /> </Link>
                            </Button>

                            <a href="/files/CV_DANY_SENTIANA.pdf" download>
                                <Button variant="outline" size="xl" className="ml-2 font-roboto rounded-4xl px-11 py-4 flex items-center">
                                    Download CV <ArrowDownToLine className="w-6 h-6 ml-2" />
                                </Button>
                            </a>
                        </div>
                    </div>

                    <div className="flex justify-center lg:w-1/2">
                        <img src={profileImage} alt="Profile" loading="lazy" decoding="async" className="w-full max-w-xs lg:max-w-md h-auto rounded-2xl" />
                    </div>
                </div>
            </motion.section>
        </>
    )
}

export default Hero