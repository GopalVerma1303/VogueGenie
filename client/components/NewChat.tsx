"use client";
import { db } from "@/firebase";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import Colors from "@/assets/theme/colors";

const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/chat/${doc.id}`);
  };
  return (
    <div
      onClick={createNewChat}
      className=" p-2  m-3 justify-center items-center rounded-sm flex-1"
      style={{ backgroundColor: Colors.orange }}
    >
      <div className="text-white flex justify-center items-center hover:cursor-pointer">
        {/* <PlusIcon className="h-5 w-5 mx-2"/> */}
        <p className=" text-sm">NEW CHAT</p>
      </div>
    </div>
  );
};

export default NewChat;
