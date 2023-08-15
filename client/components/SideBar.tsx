"use client";

import React from "react";
import NewChat from "./NewChat";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import ChatRow from "./ChatRow";
import Colors from "@/assets/theme/colors";

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
      className="flex flex-col h-full"
      style={{ backgroundColor: Colors.fgwhite }}
    >
      <div className="flex-1">
        <div>
          <NewChat />
          {/* {NewChat} */}
          <div>{/* Model Selection */}</div>
          {/* Mapping here */}
          <div className=" px-5 mt-5">
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
