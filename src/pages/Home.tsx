import Hero from "@/components/home-page/Hero";
import About from "@/components/home-page/About";
import Timeline from "@/components/Timeline";
import Stack from "@/components/home-page/Stack";
import Contact from "@/components/home-page/Contact";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

const Home = () => {
    return (
        <div className="relative">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <StarField count={60} />
            </div>
            <div className="relative z-10">
                <Hero />
                <About />
                <Timeline />
                <Stack />
                <Contact />
                <Footer />
            </div>
        </div>
    );
};
  
export default Home;
  