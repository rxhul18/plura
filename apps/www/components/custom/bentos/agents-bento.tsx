import React from 'react'

export default function AgentsBento() {
  return (
    <div className='grid grid-cols-2 md:grid-rows-2 items-center justify-center border-y-2 mx-20'>
      <div className='flex items-center justify-center md:border-r-2 h-full w-full'>
        <h1>Agent 1</h1>
        <p>Agent 1 description</p>  
      </div>

      <div className='flex items-center justify-center h-full w-full'>
        <h1>Agent 1</h1>
        <p>Agent 1 description</p>  
      </div>
    </div>
  )
}
