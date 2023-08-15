import React from "react";
import Chats from "../assets/chats/dummyChats";
import Message from "./Message";
import ChatInput from "./ChatInput";
import Colors from "@/assets/theme/colors";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  return (
    <div className="mx-auto flex w-4/5 rounded-tl-2xl bg-purple-50 z-50 fixed pt-4">
      <div className="flex-1 justify-center max-h-[calc(100vh-4rem)] items-center relative"> {/* Added "relative" class */}
        <div className="overflow-y-auto max-h-[calc(100vh-4rem)]">
          {Chats.map((e, index) => (
            <div key={index}>
              <Message isBot={e.bot} message={e.message} />
            </div>
          ))}
        </div>
        <div className="flex justify-center mb-10 z-10 sticky bottom-0">
          <ChatInput chatId={chatId} />
        </div>
        {/* Adding the purplish shade with a blurry effect */}
        <div className="absolute bottom-0 left-0 w-full h-52 bg-gradient-to-t from-[#463EDA] to-transparent " />
      </div>
    </div>
  );
}

export default Chat;
