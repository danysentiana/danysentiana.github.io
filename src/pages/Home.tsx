import Hero from "@/components/home-page/Hero";
import About from "@/components/home-page/About";
import Stack from "@/components/home-page/Stack";
import Footer from "@/components/Footer";

// const Home = ({navigate}: { navigate: (path: string) => void}) => {
const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Stack />
            {/* <button onClick={() => navigate("/projects")}>Go to Projects</button> */}
            <Footer />
        </>
    );
};
  
export default Home;
  