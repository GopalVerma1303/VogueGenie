"use client";
import Colors from "@/assets/theme/colors";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type Props = {
  chatId: string;
};
function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  return (
    <div
      className="rounded-sm text-sm w-3/4 shadow-lg absolute bottom-10"
      style={{ backgroundColor: Colors.fgwhite }}
    >
      <form className="flex space-x-5 p-5 justify-center items-center h-14">
        <input
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          type="text"
          placeholder="Enter a prompt here"
        />
        <button
          disabled={!prompt || !session}
          className="bg-[#463EDA] hover:opacity-50 text-white font-bold px-2 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          type="submit"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </form>
      <div></div>
    </div>
  );
}

export default ChatInput;
