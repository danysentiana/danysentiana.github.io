import ContactModal from "@/components/ContactModal";
import { motion } from "framer-motion";
const Contact = () => {
    return (
        <section id="contact" className="w-full px-6 lg:px-40 2xl:px-80 my-32">
            <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}  
                transition={{ duration: 1, ease: "easeInOut" }}
                className="flex flex-col gap-2 md:flex-row w-full justify-between container shadow border rounded-xl p-7 md:p-20 mx-auto bg-neutral-100 dark:bg-neutral-900"
            >
                {/* Left - Text */}
                <div className="w-full md:basis-6/12 text-center md:text-start flex flex-col justify-center">
                    <h1 className="font-bebas text-4xl md:text-7xl font-bold mb-3">Contact Me</h1>
                    <p className="font-roboto text-base md:text-lg text-justify text-gray-600 dark:text-gray-300 max-w-3xl">
                        If you have any questions or would like to work together, please don't hesitate to contact me. I look forward to hearing from you!
                    </p>
                </div>
                <div className="w-full md:basis-6/12 flex items-center justify-center md:justify-end">
                    <ContactModal />
                </div>
            </motion.div>
            
        </section>
    )
}

export default Contact