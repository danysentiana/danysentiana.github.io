import TechStackIcons from "@/components/TechStackIcons";

const Stack = () => {
    return (
        <section 
            id="tech-stack" 
            className="w-full px-6 md:px-14 lg:px-40 xl:px-60 2xl:px-72 min-h-screen flex flex-col justify-center items-center"
        >
            <div className="text-center">
                <h2 className="text-4xl md:text-7xl font-bold text-neutral-950 dark:text-neutral-50 font-bebas">Tech Stack</h2>

                <p className="font-roboto mt-4 lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl md:leading-relaxed md:tracking-wide text-justify">
                    I have experience in full-stack development, building scalable and high-performance applications with modern technologies. I work with both front-end and back-end technologies. Below are the technologies I use in my workflow.
                </p>
            </div>
            <TechStackIcons />
        </section>
    )
}

export default Stack