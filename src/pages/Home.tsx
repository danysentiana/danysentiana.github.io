import Hero from "@/components/home-page/Hero";
import About from "@/components/home-page/About";
import Timeline from "@/components/Timeline";
import Stack from "@/components/home-page/Stack";
import Contact from "@/components/home-page/Contact";
import Footer from "@/components/Footer";
import { Toaster } from '@/components/ui/sonner';

const Home = () => {
    return (
        <>
            <Toaster richColors position="bottom-right" />
            <Hero />
            <About />
            <Timeline />
            <Stack />
            <Contact />
            <Footer />
        </>
    );
};
  
export default Home;
  