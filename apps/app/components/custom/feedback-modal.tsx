/* eslint-disable react/no-unescaped-entities */
'use client';
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
import { toast } from "sonner";
import { Profanity } from "profanity-validator";
import { Frown, Meh, MessageSquare, Smile } from 'lucide-react';
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

const profanity = new Profanity({
  customWords: ["saidev", "premium",'money'],
  heat: 0.8,
});

const profanityCheck = async (value: string) => {
  const result = await profanity.validateField(value);
  return result.isValid;
};

const postSchema = z.object({
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .refine(async (val) => await profanityCheck(val), {
      message: "Inappropriate content detected in description",
    })
});

type PostSchema = z.infer<typeof postSchema>;

export function FeebackModal() {

  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostSchema) => {
    try {
      const validatedData = await postSchema.parseAsync({ ...data });
      console.log("Validated data:", validatedData);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Validation error:", error);
      toast.error("Validation failed. Check form errors.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default"> <MessageSquare /> Feedback </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[480px] border">
        <DialogHeader className="!text-center w-full pt-5 pb-2">
          <DialogTitle className="text-2xl text-primary">Leave feedback</DialogTitle>
          <DialogDescription>
            We'd love to hear what went well or how we can improve the product experience.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-md mx-auto"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} placeholder="Can you ..." className="border min-h-[100px]"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        <div className="flex gap-2">
          <Button size="icon" variant="secondary" className="hover:bg-secondary"><Smile /></Button>
          <Button size="icon" variant="secondary" className="hover:bg-secondary"><Meh /></Button>
          <Button size="icon" variant="secondary" className="hover:bg-secondary"><Frown /></Button>
        </div>
            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? "Checking..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
