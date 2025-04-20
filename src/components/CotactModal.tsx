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
  
  const ContactModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({ name: "", message: "" })
    const [isSubmitting, setIsSubmitting] = useState(false)
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsSubmitting(true)
  
      try {
        const response = await fetch("https://formspree.io/f/meqwnkge", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            name: formData.name,
            message: formData.message,
            _captcha: "false",
          }),
        })
  
        if (response.ok) {
          toast.success("Message sent successfully!")
          setFormData({ name: "", message: "" })
          setIsOpen(false)
        } else {
          toast.error("Failed to send. Please try again.")
        }
      } catch (error) {
        toast.error("Something went wrong.")
      } finally {
        setIsSubmitting(false)
      }
    }
  
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
        <DialogContent className="md:max-w-md md:w-full md:max-w-lg">
          <DialogHeader>
            <DialogTitle>Send me a message</DialogTitle>
            <DialogDescription>I'll get back to you via email.</DialogDescription>
          </DialogHeader>
  
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <div className="flex justify-end items-end pt-4">
                <Button type="submit" className="" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send"}
                </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default ContactModal
  