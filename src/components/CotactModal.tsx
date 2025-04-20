import {
    Dialog,
    DialogContent,
    DialogDescription,
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
        <DialogContent className="md:max-w-md md:w-full">
          <DialogHeader>
            <DialogTitle>Send me a message</DialogTitle>
            <DialogDescription>I'll get back to you via email.</DialogDescription>
          </DialogHeader>
  
          <form className="space-y-4" onSubmit={handleSubmit}>
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
            <div className="flex justify-end items-end pt-4">
                <Button type="submit" className="" disabled={state.submitting}>
                    {state.submitting ? "Sending..." : "Send"}
                </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default ContactModal
  