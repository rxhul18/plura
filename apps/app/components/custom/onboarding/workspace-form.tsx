"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function WorkspaceForm() {
  const handleSubmit= ()=>{

  }
  return (
    <form className="space-y-2 flex flex-col justify-center items-center " onSubmit={handleSubmit}>
    <p>create your workspace</p>
      <div className="space-y-2">
        <div className="relative">
          <Input
            className="peer ps-9"
            placeholder="hi@yourcompany.com"
            type="email"
            aria-label="Workspace"
            required
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Mail size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full">
       Create
      </Button>
    </form>
  );
}
