'use client'
import { db } from '@/firebase'
import { PlusIcon } from '@heroicons/react/20/solid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import React from 'react'

const NewChat = () => {
    const router = useRouter();
    const {data : session} = useSession();
    const createNewChat = async() =>{
        const doc = await addDoc(collection(db, "users", session?.user?.email!, "chats"), {
            userId : session?.user?.email!,
            createdAt : serverTimestamp(),
        });

        router.push(`/chat/${doc.id}`)
    };
  return (
    <div onClick={createNewChat} className='border-gray-700 border chatRow'>
        <PlusIcon className='h-4 w-4'/>
        <p>NewChat</p>
    </div>
  )
}

export default NewChat
