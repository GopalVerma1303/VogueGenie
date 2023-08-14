'use client'

import React from 'react'
import NewChat from './NewChat'
import { useSession, signOut } from 'next-auth/react'
import {useCollection} from "react-firebase-hooks/firestore"
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'
import ChatRow from './ChatRow'


const SideBar = () => {
  const {data: session} = useSession();
  const [chats, loading, error] = useCollection(
    session && query(collection(db, 'users', session.user?.email!, 'chats'), orderBy('createdAt', 'asc'))
  );
  return (
    <div className='flex flex-col h-screen p-2'>
      <div className='flex-1'>
        <div>
          <NewChat/>
          {/* {NewChat} */}
          <div>
             {/* Model Selection */}
          </div>
          {/* Mapping here */}
          {chats?.docs.map(chat =>(
            <ChatRow key = {chat.id} id = {chat.id} />
          ))}
        </div>

      </div>
      {session && (
        <img onClick={() => signOut()} src={session.user?.image!} alt="Profile Pic" 
        className='h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50'/>
      )}
    </div>
  )
}

export default SideBar
