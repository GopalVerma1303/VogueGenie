"use client";

import React from "react";
import NewChat from "./NewChat";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import ChatRow from "./ChatRow";
import Colors from "@/assets/theme/colors";
import MoreBtn from "./MoreBtn";

const SideBar = () => {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  return (
    <div
      className="flex flex-col h-full fixed top-18 left-2 w-72"
      // style={{ backgroundColor: Colors.fgwhite }}
    >
      <div className="flex-1">
        <div>
          <div className=" flex justify-center items-center ">
            <NewChat />
            <MoreBtn />
          </div>
          {/* {NewChat} */}
          <div>{/* Model Selection */}</div>
          {/* Mapping here */}
          <div className="ml-2 mt-4 overflow-y-auto flex-grow max-h-[calc(100vh-4rem)]">
            <p className=" text-white text-xs ml-4">Recent</p>
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
