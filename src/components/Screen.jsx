import React from 'react'

const Screen = (props) => {
    return (
        <div className='w-full min-h-screen'>
            <div className='w-full min-h-screen  bg-[#96bbff30] rounded-3xl p-10'>
                {props.children}
            </div>
        </div>
    )
}

export default Screen