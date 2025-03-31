import Hero from "@/components/home-page/Hero";

const Home = () => {
    return (
        <>
            <Hero />
            <section id="about" className="min-h-screen flex flex-col justify-center items-center bg-neutral-50 dark:bg-neutral-900 text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white">
                    About Me
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    I'm a full-stack developer specializing in React, TypeScript, and Node.js.
                </p>
            </section>
        </>
    );
};
  
export default Home;
  