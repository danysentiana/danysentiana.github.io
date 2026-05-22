import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Textarea } from "@/components/ui/textarea"
  import { useState } from "react"
  import { toast } from "sonner"
  import { useForm, ValidationError } from '@formspree/react';
  import { useEffect } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  
  const formFieldVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.15 + i * 0.08 },
    }),
  };

  const ContactModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [state, handleSubmit] = useForm("meqwnkge");

    useEffect(() => {
        if (state.succeeded) {
            toast.success("Message sent successfully!")
            setIsOpen(false)
        }
    }, [state.succeeded])

    useEffect(() => {
        if (state.errors) {
            toast.error("Please fill out all fields.")
        }
    }, [state.errors])
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button
                asChild
                variant="outline"
                size="xxl"
                className="font-roboto rounded-full px-8 py-1 md:px-16 md:py-4 bg-neutral-950 text-md md:text-lg text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950 hover:bg-neutral-700 hover:text-neutral-50 dark:hover:bg-neutral-100 cursor-pointer"
            >
                <span>Send Message</span>
            </Button>
        </DialogTrigger>
        <AnimatePresence>
          {isOpen && (
            <DialogContent className="md:max-w-md md:w-full">
              <DialogHeader>
                <DialogTitle>Send me a message</DialogTitle>
              </DialogHeader>
      
              <form className="space-y-4 pt-3" onSubmit={handleSubmit}>
                <motion.div
                  custom={0}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                  />
                  <ValidationError 
                    field="name"
                    prefix="Name"
                    errors={state.errors}
                  />
                </motion.div>

                <motion.div
                  custom={1}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    required
                  />
                  <ValidationError 
                    field="message"
                    prefix="Message"
                    errors={state.errors}
                  />
                </motion.div>

                <motion.div
                  custom={2}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-end items-end pt-4"
                >
                  <Button type="submit" className="" disabled={state.submitting}>
                      {state.submitting ? "Sending..." : "Send"}
                  </Button>
                </motion.div>
              </form>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    )
  }
  
  export default ContactModal