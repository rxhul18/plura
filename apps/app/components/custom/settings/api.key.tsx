"use client";

import { Button } from "@/components/ui/button";
import { Clipboard, ClipboardCheck, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ApiKey({ apiKey }: { apiKey: string }) {
  const [visible, setVisible] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      toast.success("APIKey Copied!!");
      setTimeout(() => setCopied(false), 1000);
    } catch (error) {
      toast.error("Failed to copy APIKey.");
    }
  };

  return (
    <div className="mt-4 flex items-center gap-1">
      <div
        className={
          "rounded-md bg-white dark:text-black px-4 py-2 text-sm font-medium border"
        }
      >
        <h2 className={`${!visible && "blur-[3px]"}`}>{apiKey}</h2>
      </div>
      <Button
        variant="default" // Replace with your preferred ShadCN button variant
        onClick={handleCopy}
        disabled={copied} // Disable the button temporarily after copy
        className="border"
      >
        {copied ? <ClipboardCheck /> : <Clipboard />}
      </Button>
      <Button
        onClick={() => setVisible(!visible)}
        className="border"
        variant="default"
      >
        {visible ? <Eye /> : <EyeOff />}
      </Button>
    </div>
  );
}
