"use client"

import { Input } from "@/components/ui/input";
import { AI } from "@/lib/ai";
import { useActions, useUIState } from "ai/rsc";
import { useState } from "react";
import { ChatList } from "./chatList";
import { UserMessage } from "./message";

export default function Chatbox() {
 const [messages, setMessages] = useUIState<typeof AI>();
 const [value, setValue] = useState("");
 const { sendMessage } = useActions<typeof AI>();
 const handleSubmit = async() => {
   setMessages((currentMessages) => [
     ...currentMessages,
     {
       id: Date.now(),
       role: "user",
       display: <UserMessage>{value}</UserMessage>,
     },
   ]);
   const response = await sendMessage(value);
   setMessages((currentMessages) => [...currentMessages, response]);
 }

  return (
    <div>
      <ChatList messages={messages} />
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}