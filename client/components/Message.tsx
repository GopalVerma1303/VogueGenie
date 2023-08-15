import { DocumentData } from "@firebase/firestore";
import aladdinGenieImageSrc from "../assets/images/genie.png";
import personAvatar from "../assets/images/avatar.jpg";
import Image from "next/image";
import React from "react";
type Props = {
  isBot: Boolean;
  message: String;
  // message: DocumentData
};
function Message({ isBot, message }: Props) {
  return (
    <div className={`py-5   ${!isBot && "bg-white"}`}>
      <div className="flex space-x-5 max-w-5xl mx-auto items-start">
        {isBot ? (
          <div className=" w-10 h-10">
            <Image src={aladdinGenieImageSrc} alt="logo" className=" h-full w-full" />
          </div>
        ) : (
          <div className=" w-10 h-10">
            <Image src={personAvatar} alt="logo" className=" h-full w-full" />
          </div>
        )}
        <div className=" flex-1">
          <p className=" text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
