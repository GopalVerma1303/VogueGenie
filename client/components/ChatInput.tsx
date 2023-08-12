'use client';
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type Props = {
  chatId: string;
};
function ChatInput({ chatId }: Props) {
    const [prompt, setPrompt] = useState("");
    const {data : session} = useSession();
  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm ">
      <form className="flex space-x-5 p-5">
        <input className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
        disabled = {!session}
        value = {prompt} onChange={(e) => {setPrompt(e.target.value)}} type="text" placeholder="Type your message here....."/>
        <button disabled = {!prompt || !session} className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed" type = "submit">
            <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
        </button>
      </form>
      <div>

      </div>
    </div>
  );
}

export default ChatInput;
