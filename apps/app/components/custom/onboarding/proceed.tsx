"use client"
import { Button } from "@/components/ui/button";
import { AI } from "@/lib/ai";
import { useActions, useUIState } from "ai/rsc";

export default function Proceed() {
  const {sendMessage} = useActions<typeof AI>()
  const [messages, setMessages] = useUIState<typeof AI>();
  const handleClick = async() => {
     const response =await sendMessage("yes")
     setMessages((currentMessages) => [...currentMessages,response]);
     console.log("response",JSON.stringify(response.display))
  };
  return (
    <div className="flex flex-col ">
      <div>should we continue?</div>
      <div className="flex flex-row gap-2">
        <Button className="p-2" onClick={handleClick}>yes</Button>
        <Button className="p-2">no</Button>
      </div>
    </div>
  );
}