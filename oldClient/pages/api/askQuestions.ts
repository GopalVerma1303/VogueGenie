// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import query from '@/lib/queryApi';
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from "firebase-admin"
import { adminDb } from '@/firebaseAdmin';

type Data = {
  answer: string
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {prompt, chatId, model, session} = req.body;

    if(!prompt){
        res.status(400).json({answer : "Please enter prompt"});
        return;
    }
    if(!chatId){
        res.status(400).json({answer : "Please enter chatId"});
        return;
    }

    const response = await query(prompt, chatId, model);

    const message : Message = {
      text: response || "VogueGenie was unable to find answer",
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id : "VogueGenie",
        name : "VogueGenie",
        avatar: "genie.png"
      },
    };

    await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: 'John Doe' })
}
