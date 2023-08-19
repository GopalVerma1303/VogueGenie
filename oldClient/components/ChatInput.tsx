'use client';
import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import {toast} from "react-hot-toast"

type Props = {
  chatId: string;
};
function ChatInput({ chatId }: Props) {
    const [prompt, setPrompt] = useState("");
    const {data : session} = useSession();

    const model = "text-davinci-003";

    const sendMessage = async(e : FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(!prompt){
        return;
      }
      const input = prompt.trim();
      setPrompt("");
      const message: Message = {
        text: input,
        createdAt: serverTimestamp(),
        user: {
          _id : session?.user?.email!,
          name: session?.user?.name!,
          avatar: session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
        }
      }
      await addDoc(
        collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
        message
      );
      
    const notification = toast.loading("VogueGenie is thinking...");

    
    await fetch('/api/askQuestions',{
      method:"POST",
      headers:{
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        prompt: input, chatId, model, session,
      }),
    }).then(()=>{
        toast.success("VogueGenie has responded!", {
          id: notification,
        });
    });
  };
  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm ">
      <form onSubmit={sendMessage} className="flex space-x-5 p-5">
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
