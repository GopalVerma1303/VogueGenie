import React from 'react'
import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'
const page = () => {
  return (
    <div className='text-white flex flex-col items-center h-screen justify-center px-2'>
        <h1 className='text-5xl font-bold mb-20'>VogueGenie</h1>
        <div className='flex space-x-2 text-center'>
            <div>
                <div className='flex flex-col items-center justify-center mb-5'>
                <SunIcon className="h-8 w-8" />
                    <h2>Examples</h2>
                </div>
                <div className='space-y-2'>
                    <p className='infoText'>"Tell about recent trends"</p>
                    <p className='infoText'>"Give me all the options"</p>
                    <p className='infoText'>"Daddy! Where are my pants?"</p>
                </div>
            </div>

            <div>
                <div className='flex flex-col items-center justify-center mb-5'>
                <BoltIcon className="h-8 w-8" />
                    <h2>Capabilities</h2>
                </div>
                <div className='space-y-2'>
                    <p className='infoText'>"Tell about recent trends"</p>
                    <p className='infoText'>"Give me all the options"</p>
                    <p className='infoText'>"Daddy! Where are my pants?"</p>
                </div>
            </div>

            <div>
                <div className='flex flex-col items-center justify-center mb-5'>
                <ExclamationTriangleIcon className="h-8 w-8" />
                    <h2>Limitations</h2>
                </div>
                <div className='space-y-2'>
                    <p className='infoText'>"Tell about recent trends"</p>
                    <p className='infoText'>"Give me all the options"</p>
                    <p className='infoText'>"Daddy! Where are my pants?"</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page
