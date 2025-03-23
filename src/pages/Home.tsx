const Home = () => {
    return (
        <>
            <section id="hero" className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white">
                Welcome to My Portfolio
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                I'm a full-stack developer specializing in React, TypeScript, and Node.js.
                </p>
                <a
                href="/projects"
                className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                View My Work
                </a>
            </section>

            <section id="about" className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 text-center">
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
  