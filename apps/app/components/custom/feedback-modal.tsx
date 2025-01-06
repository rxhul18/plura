/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Frown, Meh, MessageSquare, Smile } from 'lucide-react';
import { Textarea } from "../ui/textarea";


export function FeebackModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default"> <MessageSquare /> Feedback </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border">
        <DialogHeader className="!text-center w-full pt-5 pb-2">
          <DialogTitle className="text-3xl text-white">Leave feedback</DialogTitle>
          <DialogDescription>
            We'd love to hear what went well or how we can improve the product experience.
          </DialogDescription>
        </DialogHeader>
        <Textarea placeholder="Type your message here." className="border min-h-[120px]" />
        <div className="flex gap-2">
          <Button size="icon" variant="secondary" className="hover:bg-secondary"><Smile /></Button>
          <Button size="icon" variant="secondary" className="hover:bg-secondary"><Meh /></Button>
          <Button size="icon" variant="secondary" className="hover:bg-secondary"><Frown /></Button>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full bg-white text-black">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
