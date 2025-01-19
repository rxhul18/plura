"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createProjectKey } from "@/actions/project";

const apiSchema = z.object({
  expire: z.number().min(1, "Minimum 1 day"),
});
type ApiSchema = z.infer<typeof apiSchema>;

export function ApiButton() {
  const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false); // First dialog state

  const form = useForm<ApiSchema>({
    resolver: zodResolver(apiSchema),
  });

  const onSubmit: SubmitHandler<ApiSchema> = async (data) => {
    try {
      const validatedData = await apiSchema.parseAsync(data);
      await createProjectKey({
        projectId: "27f0281c-716f-4f46-b1e8-c8661b5fc34b",
        expire: validatedData.expire
      })
      toast.success(`API Created Succesfully!`);
    } catch (error) {
      console.error(error);
      toast.error(`Error in Creating api key! Please try again.`);
    }finally{
      setIsFirstDialogOpen(false);
    }
  };
  return (
    <div>
      <Dialog open={isFirstDialogOpen} onOpenChange={setIsFirstDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="bg-primary hover:bg-primary text-white dark:text-black mt-5" onClick={() => setIsFirstDialogOpen(true)}>
            Create API Key
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Secret Key</DialogTitle>
            <DialogDescription>
              Make your api key here. Click to create .
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 max-w-md mx-auto border p-6 rounded-lg shadow-md" >
              <FormField control={form.control} name="expire" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Label htmlFor="firstName" className="w-1/3">
                        Exipres in day
                      </Label>
                      <Input id="expire" type="number" placeholder="eg: 69" className="flex-1" required {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))}/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <Button type="submit" className="w-full">
                {form.formState.isSubmitting ? "Creating..." : "Create API Key"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ApiButton;