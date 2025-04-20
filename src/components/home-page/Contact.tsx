import { Button } from "@/components/ui/button";
import ContactModal from "@/components/CotactModal";

const Contact = () => {
    return (
        <section id="contact" className="w-full px-6 lg:px-40 2xl:px-80 my-32">
            <div className="flex flex-col gap-2 md:flex-row w-full justify-between container shadow border rounded-xl p-7 md:p-20 mx-auto bg-neutral-100 dark:bg-neutral-900">
                {/* Left - Text */}
                <div className="w-full md:basis-6/12 text-center md:text-start flex flex-col justify-center">
                    <h1 className="font-bebas text-4xl md:text-7xl font-bold mb-3">Contact Me</h1>
                    <p className="font-roboto text-base md:text-lg text-justify text-gray-600 dark:text-gray-300 max-w-3xl">
                        If you have any questions or would like to work together, please don't hesitate to contact me. I look forward to hearing from you!
                    </p>
                </div>
                <div className="w-full md:basis-6/12 flex items-center justify-center md:justify-end">
                    {/* <Button
                        asChild
                        variant="outline"
                        size="xxl"
                        className="font-roboto  rounded-full px-8 py-1 md:px-16 md:py-4 bg-neutral-950 text-md md:text-lg text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950 hover:bg-neutral-700 hover:text-neutral-50 dark:hover:bg-neutral-100 cursor-pointer"
                    >
                        <span>Send Message</span>
                    </Button> */}
                    <ContactModal />
                </div>
            </div>
            
        </section>
    )
}

export default Contact