import React from 'react'
import '../../index.css'

const Loading = () => {
  return (
    <div className=" bg-zinc-900 flex flex-col justify-center items-center min-h-screen">
      
      <div className="loader  "></div>
      <p className='font-orbitron text-white  text-[5vmax] uppercase animate-pulse'>Something great is loading</p>
    </div>

  )
}

export default Loading