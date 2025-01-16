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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Unkey } from "@unkey/api";

export function ApiButton() {
  const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false); // First dialog state
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false); // Second dialog state
  const [apiKeyData, setApiKeyData] = useState(null); // State to store API key data
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const unkey = new Unkey({ rootKey: "api_2bPaGiPMLmSeUGZVCnWTPk4FKEfi" });

  const keyhandle = async () => {
    const res = await unkey.keys.create({
      apiId: "ws_3AammNhMJBfSDCdejg1UGa23he2v",
      prefix: "Mr",
      name: "Rahul"
    })
    console.log(res,"res"); 
  }
  // const handleCreateApiKey = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     // Simulating a POST request (replace this with your actual API call)
  //     const response = await fetch("/api/create-key", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: "Pedro Duarte",
  //         username: "@peduarte",
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to create API key");
  //     }

  //     const data = await response.json(); // Get API response data
  //     setApiKeyData(data); // Store the response data
  //     setIsFirstDialogOpen(false); // Close the first dialog
  //     setIsSecondDialogOpen(true); // Open the second dialog
  //   } catch (err) {
  //     setError(err.message); // Set the error state
  //   } finally {
  //     setIsLoading(false); // Stop the loading state
  //   }
  // };

  return (
    <>
      {/* First Dialog */}
      <Dialog open={isFirstDialogOpen} onOpenChange={setIsFirstDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="default" onClick={() => setIsFirstDialogOpen(true)}>
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" defaultValue="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={keyhandle} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create API"}
            </Button>
          </DialogFooter>
          {error && <p className="text-red-500 mt-2">{error}</p>}
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