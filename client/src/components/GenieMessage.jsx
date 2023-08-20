import React from 'react'

function GenieMessage(props) {
    return (
        <div className='w-fit rounded-tr-2xl rounded-tl-2xl rounded-br-2xl  p-3  text-white'>
            <img
                className=' rounded-tr-2xl rounded-tl-2xl rounded-br-2xl '
                src={props.url}
                width={300}
                height={300}
                alt={form.prompt}
            />
        </div>
    )
}

export default GenieMessage