'use client'
import React from 'react'
import { signIn } from 'next-auth/react'
import Image from "next/image"

const Login = () => {
  return (
    <div className='bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center'>
     <Image 
     src="https://e0.pxfuel.com/wallpapers/351/656/desktop-wallpaper-transparent-aladdin-genie-png.jpg" width = {300} height = {300} alt = "logo" />
     <button onClick={() => signIn("google")} className='text-white font-bold text-3xl animate-pulse'>Sign In to Use VogueGenie</button>
    </div>
  )
}

export default Login
