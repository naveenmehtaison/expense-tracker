import React from 'react'

const DeleteModal = ({setShowDelModal,DeleteHandler}) => {
    
  return (
    <div className='absolute bg-slate-600 z-10   top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 h-auto rounded-lg mx-[30%] p-6'>
        <h1 className='font-semibold text-2xl'>Are you Sure You want to delete this file?</h1>
        <div className='flex flex-row gap-10 m-3'>
        <button className='bg-red-500 p-2 rounded-md' onClick={()=>{DeleteHandler()}}>Delete</button>
        <button className='bg-yellow-400 p-2 rounded-md' onClick={()=>{setShowDelModal(false)}}>Cancel</button>
        </div>

    </div>
  )
}

export default DeleteModal