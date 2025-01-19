"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createProjectKey } from "@/actions/project";

const apiSchema = z.object({
  expire: z.number().min(1, "Minimum 1 day"),
  ratelimit: z.number().min(5, "Rate limit must be at least 5"),
  enabled: z.boolean()
});
type ApiSchema = z.infer<typeof apiSchema>;

export function ApiButton() {
  const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false); // First dialog state
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false); // Second dialog state
  const [apiKeyData, setApiKeyData] = useState(null); // State to store API key data

  const form = useForm<ApiSchema>({
    resolver: zodResolver(apiSchema),
  });

  const onSubmit: SubmitHandler<ApiSchema> = async (data) => {
    try {
      const validatedData = apiSchema.parse(data);
      const res = await createProjectKey({
        projectId: "27f0281c-716f-4f46-b1e8-c8661b5fc34b",
        expire: validatedData.expire,
        ratetLimit: validatedData.ratelimit,
        enabled: validatedData.enabled
      })
      console.log("Validated Data",res);
      toast.success(`API Created Succesfully!`);
    } catch (error) {
      console.error(error);
      toast.error(`Error in Creating api key! Please try again.`);
    }finally{
      setIsFirstDialogOpen(false)
    }
  };
  return (
    <>
      {/* First Dialog */}
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
              Make changes to your profile here. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 max-w-md mx-auto border p-6 rounded-lg shadow-md" >
              {/* Input Field 1 */}
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
              <FormField control={form.control} name="ratelimit" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Label htmlFor="lastName" className="w-1/3">
                        RateLimit Time
                      </Label>
                      <Input id="ratelimit" type="number" placeholder="eg: 12" className="flex-1" required {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))}/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField control={form.control} name="enabled" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enabled" className="flex items-center space-x-2">
                        <span>Key enabled</span>
                        <Switch
                          id="enabled"
                          checked={field.value}
                          onCheckedChange={field.onChange} // Correctly map to field.onChange
                        />
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <Button type="submit" className="w-full">
                {form.formState.isSubmitting ? "Checking..." : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Second Dialog */}
      <Dialog open={isSecondDialogOpen} onOpenChange={setIsSecondDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Key Created Successfully</DialogTitle>
          </DialogHeader>
          <div>
            <p>Your new API key:</p>
            <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(apiKeyData, null, 2)}</pre>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => setIsSecondDialogOpen(false)}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ApiButton;