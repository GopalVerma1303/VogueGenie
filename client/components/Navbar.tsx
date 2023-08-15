"use client";
import Colors from "@/assets/theme/colors";
import Link from "next/link";
import React from "react";
import aladdinGenieImageSrc from "../assets/images/logo.png";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

function Navbar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  return (
    <div>
      <nav
        className=" w-full fixed top-0 right-0 left-0 z-10"
        style={{ backgroundColor: Colors.darkpurple }}
      >
        <div className=" justify-between mx-auto  md:items-center md:flex md:px-8 ">
          <div>
            <div className=" flex flex-row items-center justify-center py-3 px-8">
              <Link href="/" className=" flex justify-center items-center">
                <Image
                  src={aladdinGenieImageSrc}
                  width={80}
                  height={80}
                  alt="logo"
                />
                <div className="-ml-2">
                  <p className=" text-xl  text-white font-bold">VogueGenie</p>
                  <p
                    className=" text-xs font-extralight"
                    style={{ color: Colors.yellow }}
                  >
                    AI Fashion Genie✨
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div>
            {session && (
              <div className="flex justify-center items-center w-full">
                <div>
                  <p className="text-white text-right font-bold">{session.user?.name!}</p>
                  <p className="text-white text-xs font-extralight text-right">
                    {session.user?.email!}
                  </p>
                </div>
                <img
                  onClick={() => signOut()}
                  src={session.user?.image!}
                  alt="Profile Pic"
                  className="h-10 w-10 ml-2 hover:cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
