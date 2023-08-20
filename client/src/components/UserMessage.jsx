import React from 'react'

function UserMessage(props) {
    return (
        <div className='w-fit rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl  p-3 border border-[#6469ff] text-[#6469ff]'>
            {props.message}
        </div>
    )
}

export default UserMessage