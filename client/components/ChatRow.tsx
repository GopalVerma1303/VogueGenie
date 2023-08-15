'use client'
import Colors from '@/assets/theme/colors';
import { db } from '@/firebase';
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, deleteDoc, doc, orderBy, query} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { FaCross } from 'react-icons/fa';
import {XMarkIcon} from '@heroicons/react/24/outline';

type Props = {
    id : string;
}
function ChatRow({id}: Props) {
    const pathName = usePathname();
    const router = useRouter();
    const {data: session} = useSession();
    const [active, setActive] = useState(false);

    const [messages] = useCollection(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
    ) ;

    useEffect(() =>{
       if(!pathName){
        return;
       } 
       setActive(pathName.includes(id))
    }, [pathName]);

    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
        router.replace("/");
    }

  return (
    // <Link href = {`/chat/${id}`} className={`chatRow justify-center ${active && 'bg-gray-700/50'}`}>
    <Link href = {`/chat/${id}`} className={`chatRow justify-center}`} style={{backgroundColor: Colors.darkgray}}>
      <ChatBubbleLeftIcon className='w-4 h-4'/>
      <p className='flex-1 hidden md:inline-flex truncate'>
        {messages?.docs[messages?.docs.length - 1]?.data().text || 'New Chat'}
      </p>
      <XMarkIcon onClick={removeChat} className='h-4 w-4 hover:text-red-500'/>
    </Link>
  )
}

export default ChatRow
